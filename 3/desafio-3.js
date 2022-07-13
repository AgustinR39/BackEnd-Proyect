const express = require('express');
const app = express();
const fs = require('fs')

class Contenedor { 
    constructor(archivo) {
        this.archivo = archivo;
    }

    async save(objSave) {
        try {
            await fs.promises.access(this.archivo, fs.constants.F_OK);

            const respuesta = await fs.promises.readFile(this.archivo, 'utf-8');
            const datosObj = JSON.parse(respuesta);
            objSave.id = datosObj.length + 1;
            datosObj.push(objSave);
            await fs.promises.writeFile(this.archivo, JSON.stringify(datosObj));
            return console.log(objSave.id);
        } catch {
            objSave.id = 1;
            const arrObj = [objSave]; await fs.promises.appendFile(this.archivo, JSON.stringify(arrObj));
            return console.log(objSave.id);
        }
    }

    async getAll() {
        try {
            const respuesta = await fs.promises.readFile(this.archivo, 'utf-8');
            const datos = await JSON.parse(respuesta);
            return console.log(datos);
        } catch (error) {
            console.log(`Error de lectura. ${error}`);
        }
    }
}

const contenedor1 = new Contenedor('productos.txt');

const producto1 = {
    nombre: 'Renegados',
    precio: 2300,
    imagen: 'https://www.tematika.com/media/catalog/Ilhsa/Imagenes/646015.jpg'
}
const producto2 = {
    nombre: 'Insignia',
    precio: 1800,
    imagen: 'https://contentv2.tap-commerce.com/cover/large/9789876126687_1.jpg?id_com=1113'
}
const producto3 = {
    nombre: 'El Instituto',
    precio: 2500,
    imagen: 'https://contentv2.tap-commerce.com/cover/large/9789506445096_1.jpg?id_com=1113'
}

setTimeout(() => {contenedor1.save(producto1)}, 200);
setTimeout(() => {contenedor1.save(producto2)}, 500);
setTimeout(() => {contenedor1.save(producto3)}, 800);
setTimeout(() => {contenedor1.getAll()}, 1200);

const miArray = [producto1, producto2, producto3];
var arrayRandom = Math.floor(Math.random()*miArray.length);
var miArrayRandom = miArray[arrayRandom];

app.get('/', (req, res) => {
    res.send(`Hola gente!`)
})

app.get('/productos', (req, res) => {
    res.send(miArray)
})

app.get('/productosRandom', (req, res) => {
    res.send(miArrayRandom)
})

const server = app.listen(8080, () => {
    console.log('Server is running on port 8080');
})
server.on("error", error => console.log(error));