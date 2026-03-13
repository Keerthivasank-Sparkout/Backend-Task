const fs = require('fs');
const http = require('http');
const EventEmitter = require('events');

const eventEmitter = new EventEmitter();

eventEmitter.on('fileCreated', (name) => {
  console.log(`Event: File "${name}" was created`);
});

eventEmitter.on('fileDeleted', (name) => {
  console.log(`Event: File "${name}" was deleted`);
});

const command = process.argv[2];
const fileName = process.argv[3];
const content = process.argv[4];

if (command === 'create') {
  fs.writeFileSync(fileName, content || '');
  console.log('File created');
  eventEmitter.emit('fileCreated', fileName);
}

if (command === 'delete') {
  fs.unlinkSync(fileName);
  console.log('File deleted');
  eventEmitter.emit('fileDeleted', fileName);
}

if (command === 'read') {
  const data = fs.readFileSync(fileName, 'utf8');
  console.log(data);
}
const server = http.createServer((req, res) => {

  let path = '.' + req.url;

  if (path === './') {
    path = './index.html';
  }

  fs.readFile(path, (err, data) => {
    if (err) {
      res.writeHead(404, {'Content-Type':'text/plain'});
      res.end('File not found');
    } else {
      res.writeHead(200, {'Content-Type':'text/html'});
      res.end(data);
    }
  });

});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});