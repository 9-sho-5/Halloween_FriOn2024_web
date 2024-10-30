function toggleDropdown() {
  const dropdownButton = document.querySelector(".dropdown button");
  const dropdownMenu = document.getElementById("dropdownMenu");

  dropdownMenu.classList.toggle("show");
  dropdownButton.classList.toggle("active");
}

function selectTeam(teamName) {
  const dropdownButtonText = document.querySelector(".dropdown .button-text");
  dropdownButtonText.textContent = teamName; // 選択したチーム名に変更
  toggleDropdown(); // ドロップダウンを閉じる
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
