let entregado = [];
let caja = [];
let imagenes = [];
imagenes[100000] = './img/billetede 100.png';
imagenes[50000] = './img/billetede 50.png';
imagenes[20000] = './img/billetede 20.png';
imagenes[10000] = './img/billetede 10.png';

caja.push(new Billete(100000, 3));
caja.push(new Billete(50000, 3));
caja.push(new Billete(20000, 3));
caja.push(new Billete(10000, 3));

let saldo = 0;
for (let billete of caja) {
    saldo += billete.valor * billete.cantidad;
}

let dinero = 0;
let division = 0;
let papeles = 0;
let dineroSinModificar = document.getElementById('valorIngresado');

let boton = document.getElementById('escupe');
boton.addEventListener('click', entregarDinero);

let btnReset = document.getElementById('reset');
btnReset.addEventListener('click', resetearPage);

let parrafoResultado = document.getElementById('resultado');
let saldoTitulo = document.getElementById('saldo');
saldoTitulo.innerHTML = 'Saldo del cajero: $' + saldo;

function entregarDinero() {

    let inputDinero = document.getElementById('valorIngresado');
    dinero = parseInt(inputDinero.value);
    let contador = 0;
    if (dinero >= 10000) {
        for (let billete of caja) {
            if (dinero > 0) {
                division = Math.floor(dinero / billete.valor);

                if (division > billete.cantidad) {
                    papeles = billete.cantidad;
                } else {
                    papeles = division;
                }
                entregado.push(new Billete(billete.valor, papeles));
                dinero -= (papeles * billete.valor);
            } else {
                break;
            }
        }
    } else {
        parrafoResultado.innerHTML = 'Minimo 10k papi.';
    }
    if (dinero > 0 && contador >= 0) {
        let msg = 'Al parecer no sabes leer y haz colocado un valor que no es múltiplo de 10, o superas mi cantidad de plata bro.';
        parrafoResultado.innerHTML = msg + '<br>';
    } else if (dinero == 0) {
        mostrarEntregados();
    }
}
function mostrarEntregados() {
    console.log('esto queda en caja ');
    console.log(caja);
    console.log('------------------');
    console.log('esto queda en entregados ');
    console.log(entregado);
    console.log('------------------');
    let billeteCien = 0;
    let billeteCincuenta = 0;
    let billeteVeinte = 0;
    let billeteDiez = 0;
    for (let index = 0; index < entregado.length; index++) {
        if(entregado[index].valor == 100000){
            billeteCien++;
        }else if(entregado[index].valor == 50000){
            billeteCincuenta++;
        }else if(entregado[index].valor == 20000){
            billeteVeinte++;
        }else if(entregado[index].valor == 10000){
            billeteDiez++;
        }
    }
    console.log('Total de billetes de 100: '+billeteCien)
    console.log('Total de billetes de 50: '+billeteCincuenta)
    console.log('Total de billetes de 20: '+billeteVeinte)
    console.log('Total de billetes de 10: '+billeteDiez)

    let expresion;
    if (dineroSinModificar.value >= 1000000) {
        expresion = dineroSinModificar.value;
    } else {
        expresion = (dineroSinModificar.value / 1000).toFixed(3);
    }
    parrafoResultado.innerHTML = 'Aquí tienes tus ' + expresion + ' lukas: <br>';
    for (let bEntregado of entregado) {
        if (bEntregado.cantidad > 0) {
            for (let i = 0; i < bEntregado.cantidad; i++) {
                parrafoResultado.innerHTML += "<img class='img-billete' src='" + (bEntregado.imagen.src) + "' />"
            }
        }
    }
}
function resetearPage() {
    location.reload();
}