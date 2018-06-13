const app = require('express');
const mongoose = require('mongoose');





app.get('/',(req,res)=>{
  res.send(send:'naber');
});

const PORT = process.env.PORT | 5000;
app.listen(PORT);
