const express = require('express');
const app = express()

const mongoose = require('mongoose');





app.get('/',(req,res)=>{
  res.send('naber');
});

const PORT = process.env.PORT | 5000;
app.listen(PORT);
