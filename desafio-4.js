const express = require('express')
const app = express()
const { Router } = require('express')

const productoLibros = Router()

app.use('/api', productoLibros)

productoLibros.use(express.json())
productoLibros.use(express.urlencoded({extend: true}))

app.use(express.static('public'));
// app.use(express.static('files'));

// ----------------- libros -----------------------------------
const libros = []

productoLibros.get('/productos', (req, res) => {
    if (libros == []) {
        res.send({ error: "Producto no encontrado"})
    } else {
        res.json(libros)
    }
})

productoLibros.get('/productos/:pos', (req, res) => {
    const { pos } = req.params
    res.send({ buscada: libros[parseInt(pos) - 1] })
})

productoLibros.post('/productos', (req, res) => {
    libros.push(req.body)
    res.json(req.body)
})

productoLibros.put('/productos/:pos', (req, res) => {
    const { libro } = req.body
    const { pos } = req.params
    const libroAnt = libros[parseInt(pos) - 1]
    libros[parseInt(pos) - 1] = libro
    res.send({ actualizada: libro, anterior: libroAnt })
})

productoLibros.delete('/productos/:pos', (req, res) => {
    const { pos } = req.params
    const libro = libros.splice(parseInt(pos) - 1, 1)
    res.send({ borrada: libro })
})

// ------------------- Server listen ---------------------------------
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))