import { useEffect, useRef, useState } from 'react'
import './App.css'

const SERVER_URL = 'http://localhost:3000'

function App() {
  const socketRef = useRef(null)
  const [name, setName] = useState('Guest')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [status, setStatus] = useState('Connecting...')
  const [socketId, setSocketId] = useState('')

  useEffect(() => {
    const script = document.createElement('script')
    script.src = `${SERVER_URL}/socket.io/socket.io.js`
    script.async = true

    script.onload = () => {
      const socket = window.io(SERVER_URL)
      socketRef.current = socket

      socket.on('connect', () => {
        setStatus('Connected')
        setSocketId(socket.id)
      })

      socket.on('disconnect', () => {
        setStatus('Disconnected')
        setSocketId('')
      })

      socket.on('server-message', (data) => {
        addNotice(data.text, data.time)
      })

      socket.on('chat-message', (data) => {
        setMessages((currentMessages) => [
          ...currentMessages,
          { ...data, type: 'message', isMine: data.id === socket.id },
        ])
      })

      socket.on('user-joined', (data) => {
        addNotice(`User joined: ${data.id}`, data.time)
      })

      socket.on('user-left', (data) => {
        addNotice(`User left: ${data.id}`, data.time)
      })
    }

    script.onerror = () => {
      setStatus('Server not reachable')
    }

    document.body.appendChild(script)

    return () => {
      socketRef.current?.disconnect()
      script.remove()
    }
  }, [])

  const addNotice = (text, time) => {
    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: crypto.randomUUID(),
        text,
        sender: 'System',
        time,
        type: 'notice',
      },
    ])
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const trimmedMessage = message.trim()
    if (!trimmedMessage || !socketRef.current?.connected) return

    socketRef.current.emit('chat-message', {
      sender: name.trim() || 'Guest',
      text: trimmedMessage,
    })
    setMessage('')
  }

  return (
    <main className="app-shell">
      <section className="chat-panel">
        <header className="chat-header">
          <div>
            <p className="eyebrow">Socket.IO test</p>
            <h1>Simple Message App</h1>
          </div>
          <div className={`status ${status === 'Connected' ? 'online' : ''}`}>
            <span></span>
            {status}
          </div>
        </header>

        <div className="connection-info">
          <span>Server: {SERVER_URL}</span>
          <span>Socket ID: {socketId || 'Waiting...'}</span>
        </div>

        <div className="messages" aria-live="polite">
          {messages.length === 0 ? (
            <p className="empty-state">Start the backend, open two browser tabs, and send a message.</p>
          ) : (
            messages.map((item) =>
              item.type === 'notice' ? (
                <div className="notice" key={item.id}>
                  {item.text} <span>{item.time}</span>
                </div>
              ) : (
                <article
                  className={`message ${item.isMine ? 'mine' : ''}`}
                  key={`${item.id}-${item.time}-${item.text}`}
                >
                  <div className="message-meta">
                    <strong>{item.sender}</strong>
                    <span>{item.time}</span>
                  </div>
                  <p>{item.text}</p>
                </article>
              ),
            )
          )}
        </div>

        <form className="composer" onSubmit={handleSubmit}>
          <input
            aria-label="Your name"
            onChange={(event) => setName(event.target.value)}
            placeholder="Name"
            value={name}
          />
          <input
            aria-label="Message"
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Type message..."
            value={message}
          />
          <button disabled={status !== 'Connected'} type="submit">
            Send
          </button>
        </form>
      </section>
    </main>
  )
}

export default App
