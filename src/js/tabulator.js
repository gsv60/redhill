export default function Tabulator(app) {
  const tabButtons = [...document.querySelectorAll(".js-tab-button")].map(
    button => {
      const tabTarget = button.dataset.tabTarget;
      if (typeof tabTarget === "undefined") return;
      button.addEventListener("click", () => showTab(tabTarget));
      return button;
    }
  );
  if (tabButtons.length <= 1) return;
  showTab(tabButtons[0].dataset.tabTarget);  
  function showTab(target) {
    [...document.querySelectorAll(".js-tab")].forEach(tab => {
      if (tab.id === target) {
        tab.style.display = "";
      } else {
        tab.style.display = "none";
      }
    });
    [...document.querySelectorAll(".js-tab-button")].forEach(button => {
      if (button.dataset.tabTarget === target) {
        button.classList.add('js-tab-button--active');
      } else {
        button.classList.remove('js-tab-button--active');
      }
    });
  }
}
