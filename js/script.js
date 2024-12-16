// Cerrar modal con tecla ESC
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

// Función para cerrar el modal
function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}

// Cerrar modal al hacer clic fuera de él
window.onclick = function (event) {
  const modal = document.getElementById('modal');
  if (event.target === modal) {
    closeModal();
  }
};
//Array
const images = [
  { title: "Prevención", src: "/img/vacunas1.jpg", description: "Vacunas", modalText: "-Paquete de vacunación", modalText1: "-Protección contra pulgas y garrapatas"},
  { title: "Cirugia", src: "/img/cirugia.jpg", description: "Cirugía suave.", modalText: "-Esterilización", modalText1: "-Castraciones"},
  { title: "Laboratorio", src: "/img/labo.jpg", description: "Diagnósticos", modalText: "-Análisis de sangre y prueba de orina.", modalText1: "-Examen Fecal"},
  { title: "Odontologia", src: "/img/mordida.jpg", description: "Limpieza de Dientes", modalText: "-Diagnóstico y corrección de defectos dentales congénitos", modalText1: "-Tratamientos de eliminación de sarro"},
];

function loadPortfolio() {
  const portfolioGrid = document.getElementById('portfolio-grid');
  images.forEach(image => {
    const item = document.createElement('div');
    item.className = 'portfolio-item';
    item.onclick = () => openModal(image.title, image.src, image.description, image.modalText, image.modalText1);

    const img = document.createElement('img'); //Crea elemento
    img.src = image.src;                       //Asigna
    img.alt = image.title;

    const title = document.createElement('h3');
    title.textContent = image.title;

    const description = document.createElement('p');
    description.textContent = image.description;

    item.appendChild(img);
    item.appendChild(title);
    item.appendChild(description);
    portfolioGrid.appendChild(item);
  });
}


function openModal(title, src, description, modalText, modalText1) {
  const modal = document.getElementById('modal');
  document.getElementById('modal-title').textContent = title; //Asigna
  document.getElementById('modal-image').src = src;
  document.getElementById('modal-description').textContent = description;
  document.getElementById('modal-text').textContent = modalText; 
  document.getElementById('modal-text1').textContent = modalText1; 
  modal.style.display = 'flex';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}
// portafolio - DOOM - llama
document.addEventListener('DOMContentLoaded', loadPortfolio);

