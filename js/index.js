let index = 0;
const images = document.querySelectorAll('.carousel-images img');
const totalImages = images.length;

function moveCarousel() {
    index++;
    if (index >= totalImages) {
        index = 0;
    }
    const newTransformValue = -index * 100;
    document.querySelector('.carousel-images').style.transform = `translateX(${newTransformValue}%)`;
}

setInterval(moveCarousel, 3000);

// Mensaje de bienvenida
function showWelcomeMessage() {
    const messageDiv = document.createElement('navbar');
    messageDiv.className = 'welcome-message'; 
    messageDiv.textContent = '¡Bienvenido a Pet-Shop!';
  
    document.body.appendChild(messageDiv);
  
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        setTimeout(() => document.body.removeChild(messageDiv), 500);
    }, 2000);
}
  
window.addEventListener('load', showWelcomeMessage);
  
// Animación de los servicios
function animateServices() {
    const services = document.querySelectorAll('.nuestros-servicios_card');
    let i = 0;
  
    function animate() {
        if (i < services.length) {
            services[i].style.opacity = 1;
            i++;
        }
  
        if (i < services.length) {
            requestAnimationFrame(animate);
        }
    }
  
    animate();
}
  
window.addEventListener('load', animateServices);
  
// Control de video (Reproducir/Pausar)
const video = document.getElementById('presentationVideo');
video.addEventListener('click', () => {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
});
  
// Cambio de color del header al hacer scroll
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.backgroundColor = '#914b46';
    } else {
        header.style.backgroundColor = 'transparent';
    }
});
  
// Botón de volver al inicio
const button = document.createElement('button');
button.textContent = 'Volver al inicio';
button.className = 'button-back-to-top'; // Usar la clase CSS
document.body.appendChild(button);

button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});