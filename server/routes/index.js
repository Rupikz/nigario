import express from 'express';


const index = express.Router('/');

index.get('/', (req, res) => {
  res.render('../../client/index.js');
});

export default index;
