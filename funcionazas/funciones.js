// Variables absurdas en español
const primeroescogidos = []; // Array del jugador 1
const segundoescogidos = []; // Array para jugador 2
const maximo = 3; // Máximo de personajes

let comoestamos = '1jugador'; // '1jugador' o 'pvp'
let aquienletoca = 'jugador1'; // 'jugador1' o 'jugador2'

// Elementos del DOM con nombres absurdos
const todoslosguapos = document.querySelectorAll('.personajeguapo');
const contadordepersonajes = document.getElementById('contadorpersonajes');
const botondecomienzo = document.getElementById('botoncomenzar');
const botondelimpieza = document.getElementById('botonlimpiar');
const elpopup = document.getElementById('mensajito');
const botonjugador = document.getElementById('botonjugador');
const botonpvp = document.getElementById('botonpvp');
const cajitadelboton = document.getElementById('dondevaerboton');
const botonseleccionjugador2 = document.getElementById('butonazojugador2');
const textodelcontador = document.getElementById('textocontador');
const cajondelospersonajes = document.getElementById('contenedordepersonajes');

// Función para inicializar eventos de los personajes
function empezarlosevento() {
    todoslosguapos.forEach(personajeguapo => {
        personajeguapo.addEventListener('click', () => {
            const posicion = parseInt(personajeguapo.dataset.indice);
            
            if (comoestamos === 'pvp') {
                if (aquienletoca === 'jugador1') {
                    palprimero(posicion, personajeguapo);
                } else {
                    palsegundo(posicion, personajeguapo);
                }
            } else {
                palprimero(posicion, personajeguapo);
            }
        });
    });
}

// Función para seleccionar personaje del jugador 1
function palprimero(posicion, personajeguapo) {
    const indiceenarray = primeroescogidos.indexOf(posicion);
    
    if (indiceenarray === -1) {
        // Si no está seleccionado y no hemos alcanzado el máximo
        if (primeroescogidos.length < maximo) {
            primeroescogidos.push(posicion);
            personajeguapo.classList.add('seleccionado');
        } else {
            // Si ya hay 3 seleccionados, mostrar mensaje
            elpopup.textContent = "¡Jugador 1 ya tiene 3 personajes! Deselecciona uno si quieres cambiar.";
            elpopup.classList.add('activo');
            
            setTimeout(() => {
                elpopup.classList.remove('activo');
            }, 3000);
            return;
        }
    } else {
        // Si ya está seleccionado, lo quitamos
        primeroescogidos.splice(indiceenarray, 1);
        personajeguapo.classList.remove('seleccionado');
    }
    
    diosmioesuncontador();
}

// Función para seleccionar personaje del jugador 2
function palsegundo(posicion, personajeguapo) {
    const indiceenarray = segundoescogidos.indexOf(posicion);
    
    if (indiceenarray === -1) {
        // Si no está seleccionado y no hemos alcanzado el máximo
        if (segundoescogidos.length < maximo) {
            segundoescogidos.push(posicion);
            personajeguapo.classList.add('seleccionadojugador2');
        } else {
            // Si ya hay 3 seleccionados, mostrar mensaje
            elpopup.textContent = "¡Jugador 2 ya tiene 3 personajes! Deselecciona uno si quieres cambiar.";
            elpopup.classList.add('activo');
            
            setTimeout(() => {
                elpopup.classList.remove('activo');
            }, 3000);
            return;
        }
    } else {
        // Si ya está seleccionado, lo quitamos
        segundoescogidos.splice(indiceenarray, 1);
        personajeguapo.classList.remove('seleccionadojugador2');
    }
    
    diosmioesuncontador();
}

// Función para actualizar el contador y el estado del botón
function diosmioesuncontador() {
    if (comoestamos === 'pvp') {
        if (aquienletoca === 'jugador1') {
            contadordepersonajes.textContent = primeroescogidos.length;
            textodelcontador.textContent = "Jugador 1 - Personajes seleccionados:";
            textodelcontador.classList.remove('modojugador2');
            
            // Mostrar botón del jugador 2 si el jugador 1 ya seleccionó 3
            if (primeroescogidos.length === maximo) {
                cajitadelboton.style.display = 'block';
                botondecomienzo.disabled = true;
                elpopup.textContent = "Echa pa ya que ya has terminado dale ar 'Selección Jugador 2'.";
                elpopup.classList.add('activo');
                elpopup.style.backgroundColor = "rgba(0, 90, 10, 0.3)";
                elpopup.style.borderColor = "#0a5a0a";
            } else {
                cajitadelboton.style.display = 'none';
                botondecomienzo.disabled = true;
                
                if (primeroescogidos.length > 0) {
                    elpopup.textContent = `Jugador 1: ${primeroescogidos.length} de ${maximo} personajes.`;
                    elpopup.classList.add('activo');
                } else {
                    elpopup.textContent = "Escoge 3 nene";
                    elpopup.classList.add('activo');
                }
            }
        } else {
            contadordepersonajes.textContent = segundoescogidos.length;
            textodelcontador.textContent = "La trupe del 2";
            textodelcontador.classList.add('modojugador2');
            
            if (segundoescogidos.length === maximo) {
                botondecomienzo.disabled = false;
                elpopup.textContent = "Ea tos listos pos palante";
                elpopup.classList.add('activo');
                elpopup.style.backgroundColor = "rgba(90, 60, 0, 0.3)";
                elpopup.style.borderColor = "#8b5a00";
            } else {
                botondecomienzo.disabled = true;
                
                if (segundoescogidos.length > 0) {
                    elpopup.textContent = `Jugador 2: ${segundoescogidos.length} de ${maximo} personajes.`;
                    elpopup.classList.add('activo');
                } else {
                    elpopup.textContent = "Quillo 2 coje a tus tres";
                    elpopup.classList.add('activo');
                }
            }
        }
    } else {
        // Modo 1 jugador
        contadordepersonajes.textContent = primeroescogidos.length;
        textodelcontador.textContent = "Personajes seleccionados:";
        textodelcontador.classList.remove('modojugador2');
        
        if (primeroescogidos.length === maximo) {
            elpopup.textContent = "Ea ya tienes los tres a funcionar";
            elpopup.classList.add('activo');
            elpopup.style.backgroundColor = "rgba(0, 90, 10, 0.3)";
            elpopup.style.borderColor = "#0a5a0a";
            botondecomienzo.disabled = false;
        } else {
            elpopup.style.backgroundColor = "";
            elpopup.style.borderColor = "";
            botondecomienzo.disabled = true;
            
            if (primeroescogidos.length > 0) {
                elpopup.textContent = `Seleccionados ${primeroescogidos.length} de ${maximo} personajes. ¡Necesitas ${maximo - primeroescogidos.length} más!`;
                elpopup.classList.add('activo');
            } else {
                elpopup.textContent = "¡Selecciona 3 personajes para continuar!";
                elpopup.classList.add('activo');
            }
        }
    }
}

// Función para cambiar al modo jugador 2
function cambiardeajugador2() {
    if (primeroescogidos.length === maximo) {
        aquienletoca = 'jugador2';
        cajondelospersonajes.classList.add('modojugador2');
        cajitadelboton.style.display = 'none';
        
        // Resetear selecciones visuales del jugador 2
        todoslosguapos.forEach(personaje => {
            personaje.classList.remove('seleccionadojugador2');
        });
        
        // Limpiar array del jugador 2
        segundoescogidos.length = 0;
        
        // Actualizar interfaz
        diosmioesuncontador();
        
        elpopup.textContent = "2 escoje 3 ya nene.(pueden ser los mismos que el del 1)";
        elpopup.classList.add('activo');
        elpopup.style.backgroundColor = "rgba(42, 90, 139, 0.3)";
        elpopup.style.borderColor = "#2a5a8b";
    }
}

// Función para limpiar todas las selecciones
function limpialasfuckingselecciones() {
    // Quitar selecciones de ambos jugadores
    todoslosguapos.forEach(personaje => {
        personaje.classList.remove('seleccionado');
        personaje.classList.remove('seleccionadojugador2');
    });
    
    // Vaciar arrays de seleccionados
    primeroescogidos.length = 0;
    segundoescogidos.length = 0;
    
    // Si estamos en modo PvP y es turno del jugador 2, volver al jugador 1
    if (comoestamos === 'pvp' && aquienletoca === 'jugador2') {
        aquienletoca = 'jugador1';
        cajondelospersonajes.classList.remove('modojugador2');
        cajitadelboton.style.display = 'none';
    }
    
    // Actualizar contador
    diosmioesuncontador();
    
    // Mensaje de confirmación
    elpopup.textContent = "Se ha limpiado la selección. Elige de nuevo";
    elpopup.classList.add('activo');
    
    // Ocultar mensaje después de 2 segundos
    setTimeout(() => {
        elpopup.classList.remove('activo');
    }, 2000);
}

// Función para comenzar la batalla
function redireccionpapelear() {
    if (comoestamos === '1jugador') {
        if (primeroescogidos.length === maximo) {
            const configuracionPelea = {  
                modo: '1jugador',
                jugador1: primeroescogidos.slice(),
                jugador2: [],
                turnoInicial: 'jugador1'
            };
            
            localStorage.setItem('configuracionPelea', JSON.stringify(configuracionPelea));
            window.location.href = 'batalla.html';
        }
    } else if (comoestamos === 'pvp') {
        if (primeroescogidos.length === maximo && segundoescogidos.length === maximo) {
            const configuracionPelea = {  
                modo: 'pvp',
                jugador1: primeroescogidos.slice(),
                jugador2: segundoescogidos.slice(),
                turnoInicial: 'jugador1'
            };
            
            localStorage.setItem('configuracionPelea', JSON.stringify(configuracionPelea));
            window.location.href = 'batalla.html';
        }
    }
}
// Función para cambiar modo de juego
function cambiarelmode() {
    if (comoestamos === '1jugador') {
        comoestamos = 'pvp';
        botonjugador.classList.remove('activo');
        botonpvp.classList.add('activo');
        aquienletoca = 'jugador1';
        cajondelospersonajes.classList.remove('modojugador2');
        
        // Limpiar selecciones anteriores
        limpialasfuckingselecciones();
        
        elpopup.textContent = "Modo PvP activado - Quillo 1, pilla tus 3 personajes";
        elpopup.classList.add('activo');
        elpopup.style.backgroundColor = "rgba(42, 90, 139, 0.3)";
        elpopup.style.borderColor = "#2a5a8b";
        
    } else {
        comoestamos = '1jugador';
        botonjugador.classList.add('activo');
        botonpvp.classList.remove('activo');
        aquienletoca = 'jugador1';
        cajondelospersonajes.classList.remove('modojugador2');
        cajitadelboton.style.display = 'none';
        
        // Limpiar selección del jugador 2
        segundoescogidos.length = 0;
        todoslosguapos.forEach(personaje => {
            personaje.classList.remove('seleccionadojugador2');
        });
        
        // Actualizar interfaz
        diosmioesuncontador();
        
        elpopup.textContent = "Modo 1 Jugador - Batalla conta IA";
        elpopup.classList.add('activo');
    }
    
    setTimeout(() => {
        elpopup.classList.remove('activo');
        elpopup.style.backgroundColor = "";
        elpopup.style.borderColor = "";
    }, 3000);
}

// Inicializar la página
document.addEventListener('DOMContentLoaded', () => {
    empezarlosevento();
    diosmioesuncontador();
    
    // Eventos para los botones
    botondecomienzo.addEventListener('click', redireccionpapelear);
    botondelimpieza.addEventListener('click', limpialasfuckingselecciones);
    botonseleccionjugador2.addEventListener('click', cambiardeajugador2);
    
    // Eventos para los botones de modo de juego
    botonjugador.addEventListener('click', cambiarelmode);
    botonpvp.addEventListener('click', cambiarelmode);
    
    // Mensaje inicial
    setTimeout(() => {
        elpopup.textContent = "Selecciona 3 personajes para tu equipo... Elige sabiamente";
        elpopup.classList.add('activo');
        
        setTimeout(() => {
            elpopup.classList.remove('activo');
        }, 4000);
    }, 1000);
});