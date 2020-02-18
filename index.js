const express = require('express')
const app = express()
const fetch = require('node-fetch')
require('dotenv').config()
const logger = require('morgan')
const path = require('path')
const port = process.env.PORT || 3000


app.use(logger('dev'))



app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'Public')))


app.get('/movies',(req,res)=>{
    
    const url = 'https://api.themoviedb.org/3/movie/now_playing?api_key=';
    const urlEnd = '&language=en-US&page=1';
    const apiKey = process.env.API_KEY
    const img = 'https://image.tmdb.org/t/p/w500';
    fetch(url+apiKey+urlEnd)
        .then((movies) => movies.json())
        .then((movies) => {
            
            
            console.log(movies.results)
            const all = movies.results 
            res.render('movies', { all,img})
        })
        .catch((err) => console.log(err))
});

app.get('/random', (req, res) => {
    const url = 'https://randomuser.me/api/?results=20';

    fetch(url)
        .then((res) => res.json())
        .then((users) => {
            const allUsers = users.results.sort((a, b) => (a.name.last > b.name.last) ? 1 : ((b.name.last > a.name.last) ? -1 : 0))
            res.render('random', { allUsers });
        })
        .catch((err) => console.log(err));
});



























app.listen(port,()=>{
    console.log(`listening on ${port}`)
})
