export default function Chapters(triggerElement, modalId) {
  if (!triggerElement) return;

  // Collect chapters from page
  const chapters = [...document.querySelectorAll(".long__sect h2")];
  if (chapters.length === 0) return;

  // Create modal
  let modal = document.getElementById(modalId);
  if (!modal) {
    modal = document.createElement("div");
    modal.id = modalId;
    modal.classList.add("chapters");
    modal.classList.add("chapters--hidden");
    document.body.appendChild(modal);
  }

  // Create links
  chapters.forEach((chapter, i) => {
    if (!chapter.textContent) return;
    const link = document.createElement("a");
    if (!chapter.id) chapter.id = `chapter${i}`;
    link.href = `#${chapter.id}`;
    link.classList.add("chapters__link");
    link.textContent = chapter.textContent;
    modal.appendChild(link);
    link.addEventListener('click',(e) => {
      e.preventDefault();
      modal.classList.add('chapters--hidden');
      window.scrollTo(0, chapter.offsetTop - 100);
    });
  });

  // Event listeners
  triggerElement.addEventListener("click", () =>
    modal.classList.remove("chapters--hidden")
  );
  modal.addEventListener("click", e => {
    if (e.target === modal) modal.classList.add("chapters--hidden");
  });
}
