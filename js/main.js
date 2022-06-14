class Usuario {
    constructor (nombre, apellido, libros, mascotas) {
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }

    // getFullName() {
    //     console.log(this.nombre)
    // }
}

const usuario1 = new Usuario('Agustín', 'Ronchi', [{nombre: 'Renegados', autor: 'Marissa Meyer'}, {nombre: 'Mentes Poderosas', autor: 'Alexandra Bracken'}],['Loro'])

function miUsuario() {
    
    getFullName();
    countMascotas();
    getBooksName();
}

function getFullName() {
    console.log(usuario1.nombre + ' ' + usuario1.apellido);
}

function addMascota() {
    let newMascota = prompt('Ingrese su nueva mascota.');
    if(newMascota.length > 0) {
        usuario1.mascotas.push(newMascota);
    }
}

function countMascotas() {
    console.log(usuario1.mascotas.length);
}

function addBook() {
    let newLibro = prompt('Ingrese el nombre de un libro.');
    let newAutor = prompt('Ingrese el nombre del autor del libro.');
    if ((newLibro.length > 0) && (newAutor.length > 0)){
        usuario1.libros.push({nombre: newLibro, autor: newAutor});
    }
}

function getBooksName() {
    for (const name of usuario1.libros) {
        console.log(name.nombre)
    }

}

addMascota();
addBook();
miUsuario();

