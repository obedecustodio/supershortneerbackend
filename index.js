const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose')
const ShortUrl = require('./model')

   

app.use(cors())
app.use(express.json())    


mongoose
    .connect('mongodb+srv://lastkingas09:FXSnJmJA2QcAdnZf@cluster0.p7b59nb.mongodb.net/?retryWrites=true&w=majority', {  
    useNewUrlParser: true,
    useUnifiedTopology: true  
})
.then(()=>{
        console.log("conectamos ao Mongo")
        app.listen(process.env.PORT || 5000)
        console.log('connected at 5000')
    }) 
.catch((err) => console.log(err)) 
  

app.get('/', async (req, res) =>{
    res.json('oi')
})
app.get('/urls', async (req, res) =>{  
    const shortUrls = await ShortUrl.find()
    res.json(shortUrls)
})


app.post('/url', async (req, res) =>{

    console.log('on post')
    await ShortUrl.create({ longurl: req.body.long})  

    console.log(req.body.long)
    
    res.json('ok')
}) 

 app.get('/url/:short', async (req, res)=>{
    const shortUrl = await ShortUrl.findOne({shorturl: req.params.short})

    if(shortUrl == null) res.sendStatus(404) 
      
    res.redirect(shortUrl.longurl)
  })  