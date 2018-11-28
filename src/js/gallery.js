export default function Gallery(modalId) {
  if (!modalId) return;
  [...document.getElementsByTagName('img')].forEach((img) => {
    const url = img.dataset.fullImage;
    if (!url) return;
    img.addEventListener('click', () => showModalImage(url));
    img.style.cursor = "pointer";
  });


  function showModalImage(url) {
    // Get or create modal window
    let modal = document.getElementById(modalId);
    if (!modal) {
      modal = document.createElement("div");
      modal.classList.add("modal");
      modal.classList.add("modal--hidden");
      document.body.appendChild(modal);
    }
    // Remove all child nodes in modal
    while (modal.firstChild) {
      modal.removeChild(modal.firstChild)
    }
    // Create image
    const image = document.createElement("img");
    image.src = url;
    image.classList.add('modal__image');
    modal.appendChild(image);
    // Show modal
    modal.classList.remove("modal--hidden");
    // Add event listener for closing
    modal.addEventListener("click", e => {
      if (e.target === modal) {
        modal.classList.add("modal--hidden");
        player.pauseVideo();
        modal.parentElement.removeChild(modal);
      }
    });
  }
}
