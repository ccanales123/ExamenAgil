
const express = require('express');
const mongoose = require('mongoose');


const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(require('./routes/usuario'));

mongoose.connect('mongodb://localhost:27017/Examen', (err, res) => {
    if (err) throw err;
    console.log('Base de datos conectada');

});

//Configuracions de PUG 
app.set('view engine', 'pug')

app.get('/',(req,res)=>{
    res.render('index',{})
})

app.listen(3000, () => {
    console.log('Escuchando puerto: ', 3000);
});