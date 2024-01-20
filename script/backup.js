let isAnimating = false; // Flag para verificar se a animação está em andamento
let isPointOpen = false; // Flag para verificar se um ponto está aberto
let modalAberto = false;
let header = document.querySelector(".header");
let modal = document.querySelector(".modal");
let closeModal = document.querySelector('.close')

const screenWidth =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

function toggleZoom(event, element) {
  if (screenWidth <= 426) {
    let infoBox = element.querySelector(".infoBox");
    modalAberto = true;
    setTimeout(function () {
      infoBox.style.display = "flex";
      infoBox.classList.add("infoBox");
      infoBox.classList.add("mobileInfoBox");
      header.style.opacity = 0;
    }, 500); // Delay da aparência da infoBox por 500ms
    setTimeout(function () {
      closeModal.style.display = 'block'
      infoBox.style.opacity = 1;
      console.log('foi auqi');
    }, 600); // Delay da aparência da infoBox por 500ms}
  }

if (isAnimating || isPointOpen) {
  zoomOut(event);
  return;
}

isAnimating = true;
isPointOpen = true;

event.stopPropagation(); // Impede a propagação do evento para o elemento pai (mapContainer)
let mapContainer = document.getElementById("mapContainer");
let infoBox = element.querySelector(".infoBox");

if (screenWidth > 426) {
  mapContainer.style.transform = "scale(1.5)";
}


// Calcula a posição do ponto clicado
let pointRect = element.getBoundingClientRect();
let containerRect = mapContainer.getBoundingClientRect();
let xOffset =
  pointRect.left -
  containerRect.left -
  containerRect.width / 2 +
  pointRect.width / 2;
let yOffset =
  pointRect.top -
  containerRect.top -
  containerRect.height / 2 +
  pointRect.height / 2;


// Anima o deslocamento até o ponto
if (screenWidth > 426) {
mapContainer.style.transition = "transform 0.5s ease-in-out";
mapContainer.style.transform = `scale(1.2) translate(${-xOffset}px, ${-yOffset}px)`;
}
// Mostra infoBox com delay
setTimeout(function () {
  infoBox.style.display = "flex";
  header.style.opacity = 0;
  mapContainer.style.transition = ""; // Remove a transição para permitir um deslocamento suave
  isAnimating = false; // A animação está concluída
}, 500); // Delay da aparência da infoBox por 500ms
setTimeout(function () {
  infoBox.style.opacity = 1;
}, 600); // Delay da aparência da infoBox por 500ms
}

function zoomOut(event) {
  if(screenWidth<= 426) {
    let infoBoxes = document.querySelectorAll(".infoBox");
    modalAberto = false;
    infoBoxes.forEach(function (box, index) {
      setTimeout(function () {
        box.style.display = "none";
        header.style.opacity = 1;
      }, 500); // Delay da aparência da infoBox por 500ms
      setTimeout(function () {
        closeModal.style.display = 'none'
        box.style.opacity = 0;
      }, 600); // Delay da aparência da infoBox por 500ms};
    })
   } 
  if (isAnimating) return;

  isAnimating = true;
  isPointOpen = false;

  event.stopPropagation(); // Impede a propagação do evento para o elemento pai (mapContainer)
  let mapContainer = document.getElementById("mapContainer");
  let infoBoxes = document.querySelectorAll(".infoBox");

  // Anima o zoom-out
  mapContainer.style.transition = "transform 0.5s ease-in-out";
  mapContainer.style.transform = "scale(1) translate(0, 0)";

  // Oculta infoBoxes com delay
  infoBoxes.forEach(function (box, index) {
    setTimeout(function () {
      box.style.display = "none";
      box.style.opacity = 0;
      header.style.opacity = 1;
      mapContainer.style.transition = ""; // Remove a transição para permitir um deslocamento suave
      isAnimating = false; // A animação está concluída
    }, index * 100);
  });
}
