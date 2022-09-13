// variables
const formulario = document.querySelector('#formulario')
const listaNotas = document.querySelector('#lista-tweets')
let notas = []

//eventlisteer
eventos()

function eventos() {

    formulario.addEventListener('submit', agregarNotas)
    document.addEventListener('DOMContentLoaded' ,()=>{
        notas = JSON.parse(localStorage.getItem('notas')) || []

        crearHTML()
    })
    
}


// funciones 
function agregarNotas(e) {
    e.preventDefault()

    //textarea
    const nota = document.querySelector('#tweet').value

    if(nota === '') {
        mostarError('no puede ir vacio')
        return //evita que se ejecute mas codigo
    }

    const tweetObj = {
        id: Date.now(),
        nota
    }

    // add en el array
    notas =[...notas, tweetObj]
    
    // una vez agregado se crea el html
    crearHTML()
    
    // reiniciar form
    formulario.reset()
}

// mostar mensaje de error 
function mostarError(error){
    const mensajeError = document.createElement('p')
    mensajeError.textContent = error
    mensajeError.classList.add('error')

    // agregando al html
    const contenido = document.querySelector('#contenido')
    contenido.appendChild(mensajeError)


    // elimina la alerta despues de 3 seg
    setTimeout(() => {
        mensajeError.remove()
    }, 3000);

}

// muestra un listado de notas
function crearHTML() {

    limpiarHTML()
    
    if(notas.length > 0 ) {
        notas.forEach(nota => {
            // btn para borrar
            const btnBorrar = document.createElement('a')
            btnBorrar.classList.add('borrar-tweet')
            btnBorrar.textContent = 'X'

            // funcion para eliminar
            btnBorrar.onclick = () => {
                borrarNotas(nota.id)
            }

            // crear el html
            const li = document.createElement('li')
            li.innerHTML = nota.nota
            listaNotas.appendChild(li)
            li.appendChild(btnBorrar)
        })
    }

    storage()
}

function storage() {
    localStorage.setItem('notas', JSON.stringify(notas))
}

//elimina notas
function borrarNotas(id) {
    notas = notas.filter(notas => notas.id !== id)

    crearHTML()

}


 // limpiar HTML
function limpiarHTML() {
    while(listaNotas.firstChild){
       listaNotas.removeChild(listaNotas.firstChild)
   }
}