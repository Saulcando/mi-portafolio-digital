// Base de datos de las carpetas con su contenido
const carpetasData = [
    {
        titulo: "00. Información General",
        items: ["Portada.", "Datos personales del estudiante.", "Nombre de la asignatura.", "Nombre de la docente.", "Nivel académico.", "Período académico.", "Índice general del portafolio."]
    },
    {
        titulo: "01. Talleres Pedagógicos Grupales",
        items: ["Título de la actividad.", "Fecha de realización.", "Integrantes del grupo.", "Objetivo del taller.", "Desarrollo de las actividades.", "Conclusiones.", "Evidencias de participación cuando corresponda."]
    },
    {
        titulo: "02. Lecciones y Evaluaciones",
        items: ["Lecciones escritas.", "Pruebas de conocimientos.", "Evaluaciones individuales.", "Evaluaciones grupales.", "Correcciones realizadas."]
    },
    {
        titulo: "03. Cuaderno de Teoría y Apuntes",
        items: ["Conceptos fundamentales de Física Térmica.", "Definiciones y leyes estudiadas.", "Ejemplos desarrollados.", "Fórmulas y su interpretación física.", "Esquemas, diagramas y organizadores gráficos.", "Observaciones y notas personales."]
    },
    {
        titulo: "04. Guías de Laboratorio",
        items: ["Guías proporcionadas para las prácticas experimentales (completas)."]
    },
    {
        titulo: "05. Informes de Laboratorio",
        items: ["Informes elaborados después de cada práctica experimental."]
    },
    {
        titulo: "06. Actividades de Investigación",
        items: ["Título.", "Objetivo.", "Desarrollo del tema.", "Imágenes o gráficos relacionados.", "Análisis crítico.", "Conclusiones.", "Referencias bibliográficas en formato APA.", "Infografías, pósteres académicos o presentaciones."]
    },
    {
        titulo: "07. Proyecto de Investigación Formativa",
        items: ["Evidencias relacionadas con el proyecto de investigación formativa."]
    },
    {
        titulo: "08. Recursos Digitales y Simulaciones",
        items: ["Laboratorios virtuales.", "Actividades digitales.", "Breve explicación sobre los aprendizajes alcanzados."]
    },
    {
        titulo: "09. Reflexiones y Mejora del Aprendizaje",
        items: ["¿Qué conocimientos nuevos adquirí?", "¿Qué dificultades encontré?", "¿Cómo superé esas dificultades?", "¿Qué aprendí durante las prácticas de laboratorio?", "¿Cómo puedo aplicar estos conocimientos en mi futura labor docente?", "¿Qué aspectos debo fortalecer?"]
    }
];

// Función para abrir el libro
function abrirLibro() {
    const libroCerrado = document.getElementById('libroCerrado');
    const libroAbierto = document.getElementById('libroAbierto');
    
    libroCerrado.classList.add('oculto');
    
    setTimeout(() => {
        libroAbierto.classList.remove('oculto');
        libroAbierto.classList.add('activo');
    }, 400);
}

// Función para cerrar el libro
function cerrarLibro() {
    const libroCerrado = document.getElementById('libroCerrado');
    const libroAbierto = document.getElementById('libroAbierto');
    
    libroAbierto.classList.remove('activo');
    libroAbierto.classList.add('oculto');
    
    setTimeout(() => {
        libroCerrado.classList.remove('oculto');
        // Reiniciar a la página de bienvenida
        mostrarBienvenida();
    }, 400);
}

// Función para mostrar el contenido de una carpeta
function mostrarCarpeta(index) {
    const contenedor = document.getElementById('contenidoDinamico');
    const carpeta = carpetasData[index];
    
    let html = `<div class="contenido-dinamico">
                    <h2>${carpeta.titulo}</h2>
                    <ul>`;
    
    carpeta.items.forEach(item => {
        html += `<li>${item}</li>`;
    });
    
    html += `</ul></div>`;
    
    contenedor.innerHTML = html;
    
    // Efecto de sonido de página
    playPageSound();
}

// Función para mostrar la bienvenida por defecto
function mostrarBienvenida() {
    const contenedor = document.getElementById('contenidoDinamico');
    contenedor.innerHTML = `
        <div class="bienvenida-libro">
            <i class="fa-solid fa-hand-pointer"></i>
            <h3>Selecciona una carpeta del índice</h3>
            <p>Haz clic en cualquier elemento de la página izquierda para visualizar las evidencias requeridas.</p>
        </div>
    `;
}

// Función para hacer editables los datos (doble clic)
function editarTexto(elemento) {
    const textoActual = elemento.innerText;
    const nuevoTexto = prompt("Edita este dato:", textoActual);
    
    if (nuevoTexto !== null && nuevoTexto.trim() !== "") {
        elemento.innerText = nuevoTexto;
    }
}

// Efecto de sonido de pasar página (Web Audio API)
function playPageSound() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        
        // Simular sonido de hoja de papel con ruido blanco filtrado
        const bufferSize = ctx.sampleRate * 0.1; // 0.1 segundos
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 1000;
        filter.Q.value = 0.5;
        
        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        
        noise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        noise.start();
    } catch (e) {
        // Ignorar si el navegador bloquea el audio
    }
}