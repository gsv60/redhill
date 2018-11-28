export default function YTPlayer(triggerElement, modalId) {
  if (!triggerElement) return;
  if (!modalId) return;
  const ytId = triggerElement.dataset.ytid;
  if (typeof ytId === "undefined") return;
  window.isYoutubeAPILoaded = false;
  fetchYoutubeAPI();

  triggerElement.addEventListener("click", showModal);


  function fetchYoutubeAPI () {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    window.player = {};
    window.onYouTubeIframeAPIReady = () => {
      window.isYoutubeAPILoaded = true;
    };
  }

  function showModal() {
    if (!window.isYoutubeAPILoaded) return;
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
    // Create video player
    const video = document.createElement("div");
    video.classList.add('modal__video');
    video.id = "ytvideo";
    modal.appendChild(video);
    const player = new YT.Player("ytvideo", {
      height: "100%",
      width: "100%",
      videoId: ytId,
      events: {}
    });
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
