import express from 'express';

const index = express.Router('/');

index.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

export default index;
