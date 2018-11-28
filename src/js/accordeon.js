export default function Accordeon(elem) {
    const targetId = elem.dataset.accordeonTarget;
    const target = document.getElementById(targetId);
    elem.addEventListener("click", () => {
        target.classList.toggle("hidden");
    });
} 