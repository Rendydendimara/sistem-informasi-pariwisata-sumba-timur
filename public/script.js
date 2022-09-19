document.addEventListener('DOMContentLoaded', function () {
  new Splide('#image-carousel', {
    heightRatio: 0.8, cover: true, autoScroll: {
      speed: 2,
    },
  }).mount(window.splide.Extensions);
});
// new Splide('#image-carousel').mount();