import mongo from './mongo';
import server from './server.js';

mongo.connect();
const port = process.env.PORT | 5000;

server.start({ port }, () => {
  console.log(`The server is up on port ${port}!`);
});
