/* --- f) REGISTRO DEL SERVICE WORKER --- */
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
    .then(() => console.log('Service Worker Registrado'));
}

/* --- a) MODO CLARO / OSCURO --- */
const btnTheme = document.getElementById('btn-theme');
btnTheme.addEventListener('click', () => {
    const htmlEl = document.documentElement;
    if (htmlEl.getAttribute('data-theme') === 'light') {
        htmlEl.setAttribute('data-theme', 'dark');
        btnTheme.textContent = '☀️ Cambiar a Modo Claro';
    } else {
        htmlEl.setAttribute('data-theme', 'light');
        btnTheme.textContent = '🌙 Cambiar a Modo Oscuro';
    }
});

/* --- b) WEB SPEECH API (Lectura de Norma) --- */
document.getElementById('btn-voz').addEventListener('click', () => {
    const norma = "Norma de seguridad industrial: Es obligatorio el uso de casco, botas con punta de acero y lentes protectores en todas las áreas operativas de la planta.";
    const voz = new SpeechSynthesisUtterance(norma);
    voz.lang = 'es-ES';
    window.speechSynthesis.speak(voz);
});

/* --- c) VALIDACIÓN DE FORMULARIO JS --- */
document.getElementById('form-incidente').addEventListener('submit', (e) => {
    e.preventDefault(); // Evita que la página recargue
    
    const area = document.getElementById('area').value.trim();
    const incidente = document.getElementById('incidente').value.trim();

    if (area === "" || incidente === "") {
        alert("⚠️ Error: Los campos 'Área' e 'Incidente' no pueden estar vacíos.");
    } else {
        alert(`✅ Éxito: Reporte de incidente en el área de '${area}' enviado al departamento de seguridad.`);
        e.target.reset(); // Limpia los campos
    }
});

/* --- d) GEOLOCALIZACIÓN API --- */
document.getElementById('btn-geo').addEventListener('click', () => {
    const resultado = document.getElementById('resultado-geo');
    
    if (!navigator.geolocation) {
        resultado.textContent = "Tu navegador no soporta geolocalización.";
        return;
    }

    resultado.textContent = "Ubicando...";

    navigator.geolocation.getCurrentPosition(
        (posicion) => {
            const lat = posicion.coords.latitude;
            const lon = posicion.coords.longitude;
            resultado.innerHTML = `<strong>Latitud:</strong> ${lat.toFixed(6)} <br> <strong>Longitud:</strong> ${lon.toFixed(6)}`;
        },
        (error) => {
            resultado.textContent = "Error al obtener la ubicación. Asegúrate de dar permisos.";
        }
    );
});

/* --- e) CANVAS (Dibujo dinámico del Primer Nombre) --- */
const canvas = document.getElementById('canvas-nombre');
const ctx = canvas.getContext('2d');
let xPos = -100; // Inicia fuera del canvas

function animarNombre() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.font = 'bold 30px Arial';
    ctx.fillStyle = '#e67e22';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // IMPORTANTE: Cambia "TU NOMBRE" por tu primer nombre real
    ctx.fillText('Juan', xPos, canvas.height / 2);
    
    xPos += 2; // Velocidad de movimiento
    if (xPos > canvas.width + 100) {
        xPos = -100; // Reinicia la posición si sale de la pantalla
    }
    
    requestAnimationFrame(animarNombre);
}
animarNombre();

/* SIMULACIÓN DE SALIDA */
document.getElementById('btn-salir').addEventListener('click', () => {
    if(confirm("¿Seguro que deseas salir del sistema?")) {
        document.body.innerHTML = "<h2 style='text-align:center; margin-top:20%; color:var(--text-color);'>Has salido del sistema de Seguridad Industrial de forma segura.</h2>";
    }
});