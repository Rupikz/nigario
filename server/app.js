import express from 'express';
import Server from 'socket.io';
import path from 'path';
import config from './config/config';
import index from './routes/index';

const app = express();
const io = new Server();

app.use(express.static(path.resolve(__dirname, '../public')));
app.use('/', index);

app.listen(config.PORT, () => {
  console.log('server has been started..', config.PORT);
});
