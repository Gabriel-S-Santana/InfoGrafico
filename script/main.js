const tamanhoTela =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

var isAnimating = false; // Flag para verificar se a animação está em andamento
var isPointOpen = false; // Flag para verificar se um ponto está aberto
let header = document.querySelector(".header");
console.log(header.style.lineHeight);
let fechaModal = document.querySelectorAll(".fechaModal");

if (tamanhoTela > 430) {
  fechaModal.forEach(function (btn) {
    btn.style.display = 'none'
  })
}

function toggleZoom(event, element) {

  if (tamanhoTela > 430) {

    if (isAnimating || isPointOpen) {
      zoomOut(event);
      return;
    }

    isAnimating = true;
    isPointOpen = true;

    event.stopPropagation(); // Impede a propagação do evento para o elemento pai (mapContainer)
    var mapContainer = document.querySelector(".mapContainer");
    var infoBox = element.querySelector(".infoBox");

    mapContainer.style.transform = "scale(1.5)";

    // Calcula a posição do ponto clicado
    var pointRect = element.getBoundingClientRect();
    var containerRect = mapContainer.getBoundingClientRect();
    var xOffset =
      pointRect.left -
      containerRect.left -
      containerRect.width / 2 +
      pointRect.width / 2;
    var yOffset =
      pointRect.top -
      containerRect.top -
      containerRect.height / 2 +
      pointRect.height / 2;

    // Anima o deslocamento até o ponto
    mapContainer.style.transition = "transform 0.5s ease-in-out";
    mapContainer.style.transform = `scale(1.2) translate(${-xOffset}px, ${-yOffset}px)`;

    // Mostra infoBox com delay
    setTimeout(function () {
      infoBox.style.display = "block";
      header.style.opacity = 0;
      mapContainer.style.transition = ""; // Remove a transição para permitir um deslocamento suave
      isAnimating = false; // A animação está concluída
    }, 200); // Delay da aparência da infoBox por 500ms
    setTimeout(function () {
      infoBox.style.opacity = 1;
    }, 300); // Delay da aparência da infoBox por 500ms
  }
  else if (tamanhoTela <=430) {

    if (isAnimating || isPointOpen) {
      zoomOut(event);
      return;
    }
    isAnimating = true;
    isPointOpen = true;
    infoBox = element.querySelector('.infoBox');

    setTimeout(
      engrandece(infoBox), 100);
    setTimeout(function () {
      isAnimating = false
      infoBox.style.opacity = 1
    }, 300)


    function engrandece(elemento) {
      elemento.classList.add('mobileInfoBox')
    }
  }
}

  function zoomOut(event) {
    if (tamanhoTela >430) {
      if (isAnimating) return;

    isAnimating = true;
    isPointOpen = false;

    event.stopPropagation(); // Impede a propagação do evento para o elemento pai (mapContainer)
    var mapContainer = document.querySelector(".mapContainer");
    var infoBoxes = document.querySelectorAll(".infoBox");

    // Anima o zoom-out
    mapContainer.style.transition = "transform 0.5s ease-in-out";
    mapContainer.style.transform = "scale(1) translate(0, 0)";

    // Oculta infoBoxes com delay
    infoBoxes.forEach(function (box, index) {
      setTimeout(function () {
        box.style.opacity = 0;
      }, 100)

      setTimeout(function () {
        header.style.opacity = 1;
        mapContainer.style.transition = ""; // Remove a transição para permitir um deslocamento suave
        box.style.display = "none";
        isAnimating = false; // A animação está concluída
      }, 500);
      
    });
  }

  else if (tamanhoTela <=430) {
    if (isAnimating) return;

    isAnimating = true;
    isPointOpen = false;
    var infoBoxes = document.querySelectorAll(".infoBox");
    infoBoxes.forEach( function (elemento) {
      setTimeout (function () {
        elemento.style.opacity = 0;
      }, 200)
      isAnimating = false;
      diminui(elemento);
      
    })

    function diminui(elemento) {
      setTimeout ( function () {
        elemento.classList.remove('mobileInfoBox');
      }, 300)
      
    }
  }
}


    