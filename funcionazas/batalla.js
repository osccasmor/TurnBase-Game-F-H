// Datos completos de todos los personajes disponibles
const todoslospersonajes = [
    { 
        id: 0, 
        nombre: 'Cahara', 
        gifidleJ1: './resources/character_animation/cahara/idle_cahara.gif',
        gifataqueJ1: './resources/character_animation/cahara/attack_cahara.gif',
        imagenJ2: './resources/enemys/PvP/cahara.png',
        caritamenu: './resources/ingame_characters/cahara_ingame.png',
        color: '#8B7355'
    },
    { 
        id: 1, 
        nombre: "D'arce", 
        gifidleJ1: './resources/character_animation/dearce/idle_dearce.gif',
        gifataqueJ1: './resources/character_animation/dearce/attack_dearce.gif',
        imagenJ2: './resources/enemys/PvP/dearce.png',
        caritamenu: './resources/ingame_characters/dearce_ingame.png',
        color: '#A08060'
    },
    { 
        id: 2, 
        nombre: 'Enki', 
        gifidleJ1: './resources/character_animation/enki/idle_enki.gif',
        gifataqueJ1: './resources/character_animation/enki/attack_enki.gif',
        imagenJ2: './resources/enemys/PvP/enki.png',
        caritamenu: './resources/ingame_characters/enki_ingame.png',
        color: '#6B5344'
    },
    { 
        id: 3, 
        nombre: "Le'garde", 
        gifidleJ1: './resources/character_animation/legarde/idle_legarde.gif',
        gifataqueJ1: './resources/character_animation/legarde/attack_legarde.gif',
        imagenJ2: './resources/enemys/PvP/Legarde.png',
        caritamenu: './resources/ingame_characters/legarde_ingame.png',
        color: '#9B8365'
    },
    { 
        id: 4, 
        nombre: 'Ragnvaldr', 
        gifidleJ1: './resources/character_animation/ragnvaldr/idle_ragnvaldr.gif',
        gifataqueJ1: './resources/character_animation/ragnvaldr/attack_ragnvaldr.gif',
        imagenJ2: './resources/enemys/PvP/outlander.png',
        caritamenu: './resources/ingame_characters/ragnvaldr_ingame.png',
        color: '#7B6355'
    }
];

// Variables de estado de la batalla
let turnoActual = 1;
let modoJuego = 'pvp';

// Arrays para los personajes seleccionados con vida individual
let equipoJ1 = []; // Cada personaje tiene: {datos, vidaActual, estaVivo}
let equipoJ2 = []; // Cada personaje tiene: {datos, vidaActual, estaVivo}
let personajeActivoJ1 = 0;
let personajeActivoJ2 = 0;

function cargarDatosMenu() {
    const datosGuardados = localStorage.getItem('configuracionPelea');
    
    if (datosGuardados) {
        const config = JSON.parse(datosGuardados);
        
        modoJuego = config.modo;
        
        equipoJ1 = config.jugador1.map(id => {
            const basePersonaje = todoslospersonajes.find(p => p.id === id) || todoslospersonajes[0];
            return {
                ...basePersonaje,
                vidaActual: 100,
                estaVivo: true
            };
        });
        
        if (config.modo === 'pvp') {
            equipoJ2 = config.jugador2.map(id => {
                const basePersonaje = todoslospersonajes.find(p => p.id === id) || todoslospersonajes[0];
                return {
                    ...basePersonaje,
                    vidaActual: 100,
                    estaVivo: true
                };
            });
        } else {
            equipoJ2 = config.jugador1.map(id => {
                const basePersonaje = todoslospersonajes.find(p => p.id === id) || todoslospersonajes[0];
                return {
                    ...basePersonaje,
                    vidaActual: 100,
                    estaVivo: true
                };
            });
        }
        
        turnoActual = config.turnoInicial === 'jugador1' ? 1 : 2;
        
        localStorage.removeItem('configuracionPelea');
        
        return true;
    }
    
    // Personajes por defecto
    equipoJ1 = [0, 1, 2].map(id => ({
        ...todoslospersonajes[id],
        vidaActual: 100,
        estaVivo: true
    }));
    
    equipoJ2 = [3, 4, 0].map(id => ({
        ...todoslospersonajes[id],
        vidaActual: 100,
        estaVivo: true
    }));
    
    modoJuego = 'pvp';
    
    return false;
}

function actualizarCaritas() {
    const contenedorJ1 = document.querySelector('.aquivanlascaritas1');
    const contenedorJ2 = document.querySelector('.aquivanlascaritas2');
    
    if (contenedorJ1) contenedorJ1.innerHTML = '';
    if (contenedorJ2) contenedorJ2.innerHTML = '';
    
    // Caritas del Jugador 1
    if (contenedorJ1 && equipoJ1.length > 0) {
        equipoJ1.forEach((personaje, index) => {
            const carita = document.createElement('div');
            carita.className = `caritapersonajs ${index === personajeActivoJ1 ? 'selected' : ''}`;
            
            if (!personaje.estaVivo) {
                carita.classList.add('muerto');
            }
            
            carita.dataset.indice = index;
            carita.title = `${personaje.nombre} (${personaje.vidaActual} HP)`;
            
            const img = document.createElement('img');
            img.src = personaje.caritamenu;
            img.alt = personaje.nombre;
            
            if (!personaje.estaVivo) {
                img.style.filter = 'grayscale(100%) brightness(0.5)';
            }
            
            carita.appendChild(img);
            
            carita.addEventListener('click', () => {
                if (turnoActual === 1 && personaje.estaVivo) {
                    personajeActivoJ1 = index;
                    actualizarPersonajes();
                    actualizarBarrasVida();
                    
                    contenedorJ1.querySelectorAll('.caritapersonajs').forEach(c => {
                        c.classList.remove('selected');
                    });
                    carita.classList.add('selected');
                }
            });
            
            contenedorJ1.appendChild(carita);
        });
    }
    
    // Caritas del Jugador 2
    if (contenedorJ2 && equipoJ2.length > 0) {
        equipoJ2.forEach((personaje, index) => {
            const carita = document.createElement('div');
            carita.className = `caritapersonajs ${index === personajeActivoJ2 ? 'selected' : ''}`;
            
            if (!personaje.estaVivo) {
                carita.classList.add('muerto');
            }
            
            carita.dataset.indice = index;
            carita.title = `${personaje.nombre} (${personaje.vidaActual} HP)`;
            
            const img = document.createElement('img');
            img.src = personaje.caritamenu;
            img.alt = personaje.nombre;
            
            if (!personaje.estaVivo) {
                img.style.filter = 'grayscale(100%) brightness(0.5)';
            }
            
            carita.appendChild(img);
            
            if (modoJuego === 'pvp') {
                carita.addEventListener('click', () => {
                    if (turnoActual === 2 && personaje.estaVivo) {
                        personajeActivoJ2 = index;
                        actualizarPersonajes();
                        actualizarBarrasVida();
                        
                        contenedorJ2.querySelectorAll('.caritapersonajs').forEach(c => {
                            c.classList.remove('selected');
                        });
                        carita.classList.add('selected');
                    }
                });
            }
            
            contenedorJ2.appendChild(carita);
        });
    }
}

function actualizarPersonajes() {
    const imgJ1 = document.getElementById('imgJugador1');
    const imgJ2 = document.getElementById('gifJugador2');
    
    // Jugador 1
    if (imgJ1 && equipoJ1[personajeActivoJ1]) {
        const personaje = equipoJ1[personajeActivoJ1];
        if (personaje.estaVivo) {
            imgJ1.src = personaje.gifidleJ1;
            imgJ1.alt = personaje.nombre;
            imgJ1.style.filter = 'brightness(1)';
        } else {
            imgJ1.src = personaje.gifidleJ1;
            imgJ1.style.filter = 'grayscale(100%) brightness(0.5)';
        }
    }
    
    // Jugador 2
    if (imgJ2 && equipoJ2[personajeActivoJ2]) {
        const personaje = equipoJ2[personajeActivoJ2];
        if (personaje.estaVivo) {
            imgJ2.src = personaje.imagenJ2;
            imgJ2.alt = personaje.nombre;
            imgJ2.style.filter = 'brightness(1)';
        } else {
            imgJ2.src = personaje.imagenJ2;
            imgJ2.style.filter = 'grayscale(100%) brightness(0.5)';
        }
    }
}

function actualizarBarrasVida() {
    const barraJ1 = document.getElementById('vidader1');
    const barraJ2 = document.getElementById('vidader2');
    
    // Jugador 1
    if (barraJ1 && equipoJ1[personajeActivoJ1]) {
        const personaje = equipoJ1[personajeActivoJ1];
        const porcentaje = personaje.estaVivo ? personaje.vidaActual : 0;
        barraJ1.style.width = `${porcentaje}%`;
        barraJ1.textContent = personaje.estaVivo ? `${personaje.vidaActual}/100` : 'MUERTO';
        
        if (personaje.vidaActual < 30) {
            barraJ1.style.background = 'linear-gradient(to right, #ff3333, #cc0000, #990000)';
        } else if (personaje.vidaActual < 60) {
            barraJ1.style.background = 'linear-gradient(to right, #ff9900, #cc6600, #994400)';
        } else {
            barraJ1.style.background = 'linear-gradient(to right, #ff0000, #cc0000, #990000)';
        }
    }
    
    // Jugador 2
    if (barraJ2 && equipoJ2[personajeActivoJ2]) {
        const personaje = equipoJ2[personajeActivoJ2];
        const porcentaje = personaje.estaVivo ? personaje.vidaActual : 0;
        barraJ2.style.width = `${porcentaje}%`;
        barraJ2.textContent = personaje.estaVivo ? `${personaje.vidaActual}/100` : 'MUERTO';
        
        if (personaje.vidaActual < 30) {
            barraJ2.style.background = 'linear-gradient(to right, #3366ff, #0044cc, #002288)';
        } else if (personaje.vidaActual < 60) {
            barraJ2.style.background = 'linear-gradient(to right, #6699ff, #3366cc, #004488)';
        } else {
            barraJ2.style.background = 'linear-gradient(to right, #2a5a8b, #1a3a6b, #0a1a3a)';
        }
    }
}

function encontrarSiguienteVivo(equipo, indiceActual) {
    for (let i = 0; i < equipo.length; i++) {
        if (i !== indiceActual && equipo[i].estaVivo) {
            return i;
        }
    }
    return -1;
}

function equipoDerrotado(equipo) {
    return !equipo.some(personaje => personaje.estaVivo);
}

function atacar() {
    const textoTurno = document.getElementById('turnodeahora');
    const botonAtacar = document.getElementById('botonAtacar');
    const imgJ1 = document.getElementById('imgJugador1');
    const imgJ2 = document.getElementById('gifJugador2');
    
    if (turnoActual === 1) {
        // JUGADOR 1 ATACA A JUGADOR 2
        const atacante = equipoJ1[personajeActivoJ1];
        const defensor = equipoJ2[personajeActivoJ2];
        
        if (!atacante.estaVivo || !defensor.estaVivo) return;
        
        // Daño aleatorio 15-25
        const daño = 15 + Math.floor(Math.random() * 11);
        defensor.vidaActual = Math.max(0, defensor.vidaActual - daño);
        
        if (defensor.vidaActual <= 0) {
            defensor.estaVivo = false;
            defensor.vidaActual = 0;
            
            const siguiente = encontrarSiguienteVivo(equipoJ2, personajeActivoJ2);
            if (siguiente !== -1) {
                personajeActivoJ2 = siguiente;
            }
        }
        
        if (imgJ1 && atacante.gifataqueJ1) {
            const gifIdleOriginal = imgJ1.src;
            // FORZAR LA CARGA DEL GIF DE ATAQUE
            const imgAtaque = new Image();
            imgAtaque.onload = function() {
                imgJ1.src = atacante.gifataqueJ1 + '?t=' + Date.now();
                
                setTimeout(() => {
                    if (atacante.estaVivo) {
                        // Crear otra imagen para forzar recarga del idle
                        const imgIdle = new Image();
                        imgIdle.onload = function() {
                            imgJ1.src = atacante.gifidleJ1 + '?t=' + Date.now();
                        };
                        imgIdle.src = atacante.gifidleJ1 + '?t=' + Date.now();
                    }
                }, 800);
            };
            
            // Cargar el GIF de ataque con timestamp
            imgAtaque.src = atacante.gifataqueJ1 + '?t=' + Date.now();
        }
        
        turnoActual = 2;
        
    } else {
        // JUGADOR 2 ATACA A JUGADOR 1
        const atacante = equipoJ2[personajeActivoJ2];
        const defensor = equipoJ1[personajeActivoJ1];
        
        if (!atacante.estaVivo || !defensor.estaVivo) return;
        
        // Daño aleatorio 15-25
        const daño = 15 + Math.floor(Math.random() * 11);
        defensor.vidaActual = Math.max(0, defensor.vidaActual - daño);
        
        if (defensor.vidaActual <= 0) {
            defensor.estaVivo = false;
            defensor.vidaActual = 0;
            
            const siguiente = encontrarSiguienteVivo(equipoJ1, personajeActivoJ1);
            if (siguiente !== -1) {
                personajeActivoJ1 = siguiente;
            }
        }
        
        // Efecto visual para J2
        if (imgJ2) {
            imgJ2.style.filter = 'brightness(1.5) sepia(1)';
            
            setTimeout(() => {
                if (atacante.estaVivo) {
                    imgJ2.style.filter = 'brightness(1)';
                }
            }, 300);
        }
        
        turnoActual = 1;
    }
    
    // Actualizar interfaz
    textoTurno.textContent = turnoActual;
    actualizarBarrasVida();
    actualizarCaritas();
    actualizarPersonajes();
    
    // Verificar si algún equipo está completamente derrotado
    const j1Derrotado = equipoDerrotado(equipoJ1);
    const j2Derrotado = equipoDerrotado(equipoJ2);
    
    if (j1Derrotado || j2Derrotado) {
        botonAtacar.disabled = true;
        botonAtacar.textContent = '¡NO SE PILEEN!';
        botonAtacar.style.background = 'linear-gradient(to bottom, #333, #000)';
        
        setTimeout(() => {
            if (j1Derrotado) {
                const personajesVivos = equipoJ2.filter(p => p.estaVivo).map(p => p.nombre);
                alert(`Gana el equipo 2\n\nSiguen vivos: ${personajesVivos.join(', ')}`);
            } else {
                const personajesVivos = equipoJ1.filter(p => p.estaVivo).map(p => p.nombre);
                alert(`Gana el equipo 1\n\nSiguen vivos: ${personajesVivos.join(', ')}`);
            }
        }, 600);
    }
}


function reiniciarBatalla() {
    if (confirm('¿Reiniciar la batalla?')) {
        equipoJ1.forEach(personaje => {
            personaje.vidaActual = 100;
            personaje.estaVivo = true;
        });
        
        equipoJ2.forEach(personaje => {
            personaje.vidaActual = 100;
            personaje.estaVivo = true;
        });
        
        personajeActivoJ1 = 0;
        personajeActivoJ2 = 0;
        turnoActual = 1;
        
        document.getElementById('turnodeahora').textContent = '1';
        document.getElementById('botonAtacar').disabled = false;
        document.getElementById('botonAtacar').textContent = 'Atack';
        document.getElementById('botonAtacar').style.background = '';
        
        actualizarBarrasVida();
        actualizarCaritas();
        actualizarPersonajes();
    }
}


document.addEventListener('DOMContentLoaded', function() {
    cargarDatosMenu();
    actualizarCaritas();
    actualizarPersonajes();
    actualizarBarrasVida();
    
    const botonAtacar = document.getElementById('botonAtacar');
    if (botonAtacar) {
        botonAtacar.addEventListener('click', atacar);
    }
    
    const botonVolver = document.getElementById('botonVolver');
    const botonReiniciar = document.getElementById('botonReiniciar');
    
    if (botonVolver) {
        botonVolver.addEventListener('click', () => {
            if (confirm('¿Volver al menú principal? Se perderá el progreso de la batalla.')) {
                window.location.href = './index.html';
            }
        });
    }
    
    if (botonReiniciar) {
        botonReiniciar.addEventListener('click', reiniciarBatalla);
    }
});