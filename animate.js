function toggleDropdown() {
  const dropdownButton = document.querySelector(".dropdown button");
  const dropdownMenu = document.getElementById("dropdownMenu");

  dropdownMenu.classList.toggle("show");
  dropdownButton.classList.toggle("active");
}

window.onclick = function (event) {
  if (!event.target.closest(".dropdown")) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    const dropdownButton = document.querySelector(".dropdown button");

    for (let i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
        dropdownButton.classList.remove("active");
      }
    }
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const progressBars = document.querySelectorAll(".progress-bar");
  progressBars.forEach((bar) => {
    const targetPercentage = parseInt(bar.getAttribute("data-target"));
    bar.style.width = targetPercentage + "%";
  });
});

const imageArray = [
  "images/ad/anpi.png",
  "images/ad/aporo.png",
  "images/ad/contena.png",
  "images/ad/kota.png",
  "images/ad/marbo.png",
  "images/ad/niltushi.png",
  "images/ad/nitorin.png",
  "images/ad/riltuchi.png",
];

function createPopup() {
  const popupContainer = document.getElementById("popupContainer");

  const popup = document.createElement("div");
  popup.className = "popup";

  const closeButton = document.createElement("button");
  closeButton.className = "close-button";
  closeButton.innerHTML = "✕";

  const randomIndex = Math.floor(Math.random() * imageArray.length);
  const imgSrc = imageArray[randomIndex];

  const img = document.createElement("img");
  img.src = imgSrc;
  img.alt = "Popup Image";

  popup.appendChild(closeButton);
  popup.appendChild(img);

  popupContainer.appendChild(popup);

  const popupWidth = 300;
  const popupHeight = 500;

  popup.style.top = Math.random() * (window.innerHeight - popupHeight) + "px";
  popup.style.left = Math.random() * (window.innerWidth - popupWidth) + "px";

  popup.style.display = "block";

  closeButton.addEventListener("click", () => {
    if (Math.random() < 0.2) {
      showJumpScare();
    }
    popupContainer.removeChild(popup);
  });
}

function showJumpScare() {
  const jumpScareOverlay = document.getElementById("jumpScare");
  jumpScareOverlay.style.display = "flex";

  setTimeout(() => {
    jumpScareOverlay.style.display = "none";
  }, 2000);
}

window.addEventListener("load", () => {
  for (let i = 0; i < 8; i++) {
    createPopup();
  }
});
