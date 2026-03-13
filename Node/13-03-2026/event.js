const EventEmitter = require('events')

const emitter = new EventEmitter()

emitter.on('messageHit',function(){
    console.log('message from emitter class....')
})

emitter.emit('messageHit') // this messageHit is trigger then call the emitter on method to excute