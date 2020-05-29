// captura DIV padre, botones e input
let cartaContainer = document.querySelector('.header-cards');
let botonDraw = document.getElementById('draw');
let botonSort = document.getElementById('sort');
let inputQty = document.getElementById('cards-num-input')

// array con pintas y cartas
let pintas = ["\u2660", "\u2663", "\u2665", "\u2666"];
let cartas = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

//inicializa array vacio para posterior ordenamiento
let arrayCartas = [];


//genera pinta random dado un array
function pintaRandom(arr) {
    let numeroRandom = Math.floor(Math.random() * arr.length);
    return arr[numeroRandom];
}

//genera carta random dado un array
function cartaRandom(arr) {
    let numeroRandom = Math.floor(Math.random() * arr.length);
    return arr[numeroRandom];
}



//se preocupa de definir la carta
function dibujaCarta(pinta, carta) {
    let top = document.createElement("div");
    let topContent = document.createTextNode(pinta);
    let center = document.createElement("div");
    let centerContent = document.createTextNode(carta);
    let bottom = document.createElement("div");
    let bottomContent = document.createTextNode(pinta);

    top.appendChild(topContent);
    center.appendChild(centerContent);
    bottom.appendChild(bottomContent);

    let content = document.createElement("div")
    content.appendChild(top)
    content.appendChild(center)
    content.appendChild(bottom)
    content.classList.add("card");

    if (pinta == "\u2665" || pinta == "\u2666") {
        top.classList.add('rojotop')
        center.classList.add('cartaroja')
        bottom.classList.add('rojobottom')
    } else if (pinta == "\u2660" || pinta == "\u2663") {
        top.classList.add('negrotop')
        center.classList.add('cartanegra')
        bottom.classList.add('negrobottom')
    }
    return content

}



function mainDraw(input) {


    // itera numero de veces que esta definido en el input del usuario
    for (let i = 0; i < input; i++) {
        //call a funciones que devuelve string con pinta y numero de carta
        let pinta = pintaRandom(pintas);
        let carta = cartaRandom(cartas);

        //se dedica a imprimir la carta a pantalla las veces que loopee el FOR, de acuerdo al input del usuario
        let contenidoCarta = dibujaCarta(pinta, carta)
        cartaContainer.appendChild(contenidoCarta)


        //se dedica a mapear el arrayCartas para poder ser procesado por la funcion selectSort
        if (carta === "A") { arrayCartas.push([1, pinta, carta]) }
        else if (carta === "2") { arrayCartas.push([2, pinta, carta]) }
        else if (carta === "3") { arrayCartas.push([3, pinta, carta]) }
        else if (carta === "4") { arrayCartas.push([4, pinta, carta]) }
        else if (carta === "5") { arrayCartas.push([5, pinta, carta]) }
        else if (carta === "6") { arrayCartas.push([6, pinta, carta]) }
        else if (carta === "7") { arrayCartas.push([7, pinta, carta]) }
        else if (carta === "8") { arrayCartas.push([8, pinta, carta]) }
        else if (carta === "9") { arrayCartas.push([9, pinta, carta]) }
        else if (carta === "10") { arrayCartas.push([10, pinta, carta]) }
        else if (carta === "J") { arrayCartas.push([11, pinta, carta]) }
        else if (carta === "Q") { arrayCartas.push([12, pinta, carta]) }
        else if (carta === "K") { arrayCartas.push([13, pinta, carta]) }
    }
}



//escucha el click en el boton draw y pinta las cartas en el Header, y mapea al array Cartas
botonDraw.addEventListener('click', function () {

    // limpia las cartas generadas
    document.getElementById('lista').innerHTML = ""
    arrayCartas = []

    if (inputQty.value === "") { return alert('Debe ingresar un valor') }
    // captura cantidad ingresada en input
    mainDraw(inputQty.value)

});

let mainContainer = document.querySelector('#main-container')


function imprimePasos(counter) {

    let stepContainer = document.createElement("div");
    let contador = document.createElement('div')
    contador.innerHTML = counter
    stepContainer.classList.add('step')
    contador.classList.add('step-number')
    stepContainer.appendChild(contador)



    for (let i = 0; i < arrayCartas.length; i++) {
        let contenidoCarta = dibujaCarta(arrayCartas[i][1], arrayCartas[i][2])

        stepContainer.appendChild(contenidoCarta)

    }

    mainContainer.appendChild(stepContainer)


}



/* // algoritmo de ordenamiento que recibe array
function selectSort(arr) {
    let min = 0;
    let j = 0
    while (min < arr.length - 1) {
        for (let i = min + 1; i <= arr.length -1; i++) {
            if (arr[min][0] > arr[i][0]) {
                let aux = arr[min];
                arr[min] = arr[i];
                arr[i] = aux;
            }
            imprimePasos(j)
            j++
        }
        min++;
    }
    console.log(arr)

    return arr;
}; */

let selectSort = (arr) => {
    let len = arr.length;
    let contador = 0
    for (let i = 0; i < len; i++) {
        let min = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[min][0] > arr[j][0]) {
                min = j;
            }

            imprimePasos(contador)
            contador++
        }
        if (min !== i) {
            let tmp = arr[i];
            arr[i] = arr[min];
            arr[min] = tmp;
        }
    }
    return arr;
}



//se dedica a escuchar el boton sort, para ordenar arrayCartas y pintarlas en pantalla
botonSort.addEventListener('click', function () {

    //reinicia pantalla al hacer click en sort buton
    document.querySelector('#main-container').innerHTML = ""

    //llama a funcion para ordenar array
    selectSort(arrayCartas)
})
