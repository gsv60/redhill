import Swiper from "swiper";
import mapStyles from "./mapstyles.json";
import Tabulator from "./tabulator.js";
import YTPlayer from "./ytplayer.js";
import Chapters from "./chapters.js";
import Gallery from "./gallery.js";
import Pick from "./tours.js";
import Sticky from "./sticky.js";
import Accordeon from "./accordeon.js";

window.app = {};

document.addEventListener("DOMContentLoaded", () => {
  // Breakpoint matcher
  const isMobile = window.matchMedia("(max-width: 660px)");
  // Menu
  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".menu");
  const closeMenu = menu.querySelector(".menu__close");
  if (burger && menu) {
    burger.addEventListener("click", () => {
      menu.style.display = "block";
      setTimeout(() => menu.classList.add("menu--active"), 50);
    });
    closeMenu.addEventListener("click", () => {
      menu.classList.remove("menu--active");
      setTimeout(() => (menu.style.display = ""), 300);
    });
  }

  // Home schedule slider
  let mainColumnWidth = 1520;
  let w = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  if (w <= 1660) mainColumnWidth = 1232;
  if (w <= 1400) mainColumnWidth = 1136;
  if (w <= 1180) mainColumnWidth = 944;
  let mainPadding = Math.round(w / 2 - mainColumnWidth / 2);
  if (w <= 1020) mainPadding = 40;
  if (w <= 660) mainPadding = 24;
  let gap = 16;
  if (w <= 1020 && w > 660) gap = 24;
  app.scheduleSlider = new Swiper(".h-schedule__slider", {
    slidesPerView: "auto",
    spaceBetween: gap,
    slidesOffsetBefore: mainPadding,
    slidesOffsetAfter: mainPadding
  });

  // Persons slider
  if (w <= 1180) {
    const personsSlider = document.querySelector(".h-persons__list");
    app.personsSlider = new Swiper(personsSlider, {
      slidesPerView: "auto",
      slidesOffsetBefore: mainPadding,
      slidesOffsetAfter: mainPadding
    });
  }

  // Monuments slider
  if (document.querySelector(".h-monuments__slider")) {
    app.monumentsSlider = new Swiper(".h-monuments__slider", {
      slidesPerView: 1,
      navigation: {
        nextEl: ".h-monuments__next",
        prevEl: ".h-monuments__prev"
      }
    });
    const monumentsMarker = document.querySelector(".h-monuments__marker");
    const monumentsLength = app.monumentsSlider.slides.length;
    monumentsMarker.style.width = `${100 / monumentsLength}%`;
    const monumentsDataItems = [
      ...document.querySelectorAll(".h-monuments__data-item")
    ];
    const handleMonumentsChange = () => {
      const activeIndex = app.monumentsSlider.activeIndex;
      monumentsMarker.style.transform = `translateX(${activeIndex * 100}%)`;
      monumentsDataItems.forEach((item, index) => {
        if (index === activeIndex) {
          item.classList.add("h-monuments__data-item--active");
        } else {
          item.classList.remove("h-monuments__data-item--active");
        }
      });
    };
    handleMonumentsChange();
    app.monumentsSlider.on("slideChange", handleMonumentsChange);
  }

  // Single monument slider
  if (document.querySelector(".monument__gallery")) {
    app.singleMonumentSlider = new Swiper(".monument__gallery", {
      slidesPerView: 1,
      navigation: {
        nextEl: ".monuments__next",
        prevEl: ".monuments__prev"
      }
    });
    if (
      app.singleMonumentSlider.slides.length <= 1 &&
      document.querySelector(".gallery-pages")
    ) {
      document.querySelector(".gallery-pages").style.display = "none";
    }
    const handleSingleMonumentChange = () => {
      const activeIndex = app.singleMonumentSlider.activeIndex;
      const len = app.singleMonumentSlider.slides.length;
      const indexEl = document.querySelector(".gallery-numbers");
      indexEl.textContent = `0${activeIndex + 1} / 0${len}`;
    };
    handleSingleMonumentChange();
    app.singleMonumentSlider.on("slideChange", handleSingleMonumentChange);
  }
  // Schedule slider
  app.scheduleSlider = new Swiper(".schedule__slider", {
    slidesPerView: "auto",
    spaceBetween: 16,
    breakpoints: {
      660: {
        slidesPerView: 1,
        spaceBetween: 24
      }
    }
  });

  // Tabs
  Tabulator(app);

  // Homepage map
  if (document.querySelector(".h-contacts__map")) {
    window.initMap = () => {
      const pinUrl = "http://redhill.tw1.ru/pin.svg";
      const mapEl = document.querySelector(".h-contacts__map");
      const initCoord = { lat: 55.375659, lng: 86.071935 };
      window.gmap = new google.maps.Map(mapEl, {
        zoom: 14,
        center: initCoord,
        disableDefaultUI: true,
        styles: mapStyles
      });
      const icon = {
        url: pinUrl,
        scaledSize: new google.maps.Size(32, 32),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(25, 50)
      };
      window.gmarker = new google.maps.Marker({
        position: initCoord,
        map: gmap,
        icon: icon
      });
    };
  }
  // Excursion slider
  if (document.querySelector(".excursion__gallery") && isMobile.matches) {
    app.singleMonumentSlider = new Swiper(".excursion__gallery", {
      slidesPerView: 1
    });
  }
  // Exposition slider
  if (document.querySelector(".exposition__list") && isMobile.matches) {
    app.singleMonumentSlider = new Swiper(".exposition__list", {
      slidesPerView: 1
    });
  }
  // Foundations slider
  if (document.querySelector(".foundations__list") && isMobile.matches) {
    app.singleMonumentSlider = new Swiper(".foundations__list", {
      slidesPerView: 1
    });
  }
  // Person slider
  if (document.querySelector(".per-persons__list") && isMobile.matches) {
    app.singleMonumentSlider = new Swiper(".per-persons__list", {
      slidesPerView: "auto"
    });
  }

  // Media gallery
  [...document.querySelectorAll(".media__card")].forEach(card =>
    YTPlayer(card, "YTModal")
  );
  // Chapters navigation
  if (document.querySelector(".long")) {
    Chapters(document.querySelector(".header__chapters"), "chapters");
  }
  Gallery("gallery-modal");
  Pick(".js-pick");
  Sticky(document.querySelector(".header__chapters"), 80);
  [...document.querySelectorAll(".js-accordeon")].forEach(elem =>
    Accordeon(elem));
  if (document.querySelector(".header__chapters")) {
    Sticky(document.querySelector(".header__goback"), 112);
  } else {
    Sticky(document.querySelector(".header__goback"), 80);
  }
  // Load Google maps
  if (document.querySelector(".h-contacts__map")) {
    const mapScript = document.createElement("script");
    mapScript.type = "text/javascript";
    mapScript.src =
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBVJDl4RhSuUBdX8hmNF8cirZ9gQMW54pY&callback=initMap";
    document.body.appendChild(mapScript);
  }
});
