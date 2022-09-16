const express = require('express')
const app = express()

const mongoose = require('mongoose')
const Youtube = require('./models/Youtube')

app.use(
    express.urlencoded({
        extended:true
    })
)

app.use(express.json())

//rotas
app.post('/youtube', async(req, res) => {
    const {tittle, time, user} = req.body
    const youtube = {
        tittle,
        time,
        user
    }

    try {
        await Youtube.create(youtube)
        res.status(201).json({message:'Added youtube'})
    } catch (error) {
        res.status(500).json({error:error})
    }
})

app.get('/youtube', async (req, res) => {
    try {
        const youtubes =  await Youtube.find()
        res.status(200).json(youtubes)
    } catch (error) {
        res.status(500).json({erro:error})
    }
})

app.get('/youtube/:id', async(req, res) => {
    const id = req.params.id
    try {
        const youtube = await Youtube.findOne({_id:id})
            if(!youtube) {
                res.status(422).json({message:'Youtube not found!'})
                return
            }
        res.status(200).json(youtube)
    } catch (error) {
        res.status(500).json({erro:error})
    }
})

app.patch('/youtube/:id', async(req, res) => {
    const id = req.params.id
    const {tittle, time, user} = req.body
    const youtube = {
        tittle,
        time,
        user
    }

    try {
        const updateYoutube = await Youtube.updateOne({_id:id}, youtube)
            if (updateYoutube.matchedCount === 0) {
                res.status(422).json({message:'Youtube not found'})
                return
            } 
            res.status(200).json(youtube)
    } catch (error) {
        res.status(500).json({erro:error})
    }
})

app.delete('/youtube/:id', async(req, res) => {
    const id = req.params.id
    const youtube = await Youtube.findOne({_id:id})
    
        if(!youtube) {
            res.status(422).json({message:'Youtube not found!'})
            return
        }

        try {
            await Youtube.deleteOne({_id:id})
            res.status(404).json({message:'Deleted Youtube!'})
        } catch(error) {
            res.status(500).json({erro:error})
        }
})

mongoose.connect('mongodb+srv://lucas:aula8banco@google.rqcrwyx.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log('Connected')
    app.listen(3000)
})
.catch((err) => console.log(err))