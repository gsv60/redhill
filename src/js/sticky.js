const gap = 12;

export default function Sticky (element, threshold = 0) {
  if (!element) return;
  let isFixed = window.scrollY > threshold;
  let savedOffset = 0;
  document.addEventListener('scroll',() => {
    if (window.scrollY > element.offsetTop - threshold - gap && !isFixed) {
      savedOffset = element.offsetTop;
      element.style.position = "fixed";
      element.style.top = `${threshold}px`;
      isFixed = true;
    }
    if (window.scrollY <= savedOffset - threshold - gap && isFixed) {
      element.style.position = "";
      element.style.top = "";
      isFixed = false;
    }
  });
}
