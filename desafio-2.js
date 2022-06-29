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

    async getById(id) {
        try {
            const respuesta = await fs.promises.readFile(this.archivo, 'utf-8');
            const datos = JSON.parse(respuesta);
            const resultado = datos.findIndex((elemento) => elemento.id == id);
            if (respuesta > 0) {
                return console.log(datos[resultado]);
            } else {
                return console.log(null)
            }
        } catch (error) {
            console.log(`Error de lectura. ${error}`);
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

    async deleteById(id) {
        try {
            const respuesta = await fs.promises.readFile(this.archivo, 'utf-8');
            const datos = await JSON.parse(respuesta);
            const objEliminado = datos.splice((id - 1), 1);
            if (objEliminado.length > 0) {
                await fs.promises.writeFile(this.archivo, JSON.stringify(JSON.stringify(datos)));
                return console.log('Este objeto fue eliminado:\n', objEliminado);
            } else {
                console.log('Objeto inexistente');
            }
        } catch (error) {
            console.log(`Error de lectura. ${error}`);
        }
    }

    // async deleteAll() {
    //     try {
    //         await fs.promises.writeFile(this.archivo, '');
    //         return console.log(`Se han eliminado todos los datos del archivo ${this.archivo}`);
    //     } catch (error) {
    //         console.log(`Error de lectura. ${error}`);
    //     }
    // }
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

setTimeout(() => {contenedor1.save(producto1)}, 500);
setTimeout(() => {contenedor1.save(producto2)}, 1000);
setTimeout(() => {contenedor1.save(producto3)}, 1500);
setTimeout(() => {contenedor1.getById(1)}, 2000);
setTimeout(() => {contenedor1.getAll()}, 2500);
setTimeout(() => {contenedor1.deleteById(2)}, 3000);
// setTimeout(() => {contenedor1.deleteAll()}, 5000);