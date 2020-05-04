import express from 'express';
import path from 'path';
import config from './config/config.js';
import index from './routes/index.js';

const app = express();

app.use(express.static(path.resolve(path.dirname(new URL(import.meta.url).pathname), '../public')));

app.use('/', index);

app.listen(config.PORT, () => {
  console.log('server has been started..', config.PORT);
  
});
