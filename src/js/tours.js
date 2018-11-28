export default function Pick(selector) {
  const elements = [...document.querySelectorAll(selector)];
  const state = getStateFromLocalStorage();
  elements.forEach(el => {
    const id = el.dataset.pickId;
    if (!id) return;
    const input = el.querySelector("input[type=checkbox]");
    if (!input) return;
    const title = el.querySelector("h3").textContent || "";
    const url = el.querySelector("a") ? el.querySelector("a").href : "#";
    input.addEventListener("change", () => {
      state[id] = input.checked ? { title, url } : null;
      setStateToLocalStorage(state);
      render(state);
    });
  });
  render(state);

  function render(state) {
    elements.forEach(el => {
      const id = el.dataset.pickId;
      if (!id) return;
      const input = el.querySelector("input[type=checkbox]");
      if (!input) return;
      input.checked = !!state[id];
    });
    const list = document.querySelector(".js-render-pick");
    if (!list) return;
    list.innerHTML = "";
    state.forEach(item => {
      if (!item) return;
      const link = document.createElement("a");
      link.href = item.url;
      link.textContent = item.title;
      list.appendChild(link);
    });
    if (list.children.length === 0) {
      list.previousElementSibling.style.display = "none";
    } else {
      list.previousElementSibling.style.display = "";
    }
  }
  function getStateFromLocalStorage() {
    const state = JSON.parse(localStorage.getItem("picked"));
    return state || [];
  }
  function setStateToLocalStorage(state) {
    localStorage.setItem("picked", JSON.stringify(state));
  }
}
