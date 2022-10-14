import express from 'express'
import request from 'request'
let app = express();
let port = process.env.PORT||7800;

app.use(express.static(__dirname+'/public'))
app.set('views','./src/views');
app.set('view engine','ejs')

app.get('/weather',(req,res)=>{
    let city = req.query.city?req.query.city:'delhi'
    let url = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`;
    //calling API
    request(url,(err,apiResponce)=>{
        if(err) throw err;
        const data = JSON.parse(apiResponce.body);
        //res.send(data)
        res.render('index',{title:'Weather App',result:data})

    })

})
app.listen(port,(err)=>{
    if(err) throw err;
    console.log(`Listening on port ${port}`)
})
//let express = require('express');
