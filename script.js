// Portfolio: if an image exists at a tile's data-src (e.g. assets/portfolio/brand-identity.jpg),
// swap the placeholder for the real image. No build step, no config.
document.querySelectorAll('.piece[data-src]').forEach(function (piece) {
  var src = piece.getAttribute('data-src');
  if (!src) return;
  var img = new Image();
  img.onload = function () {
    img.alt = piece.getAttribute('data-alt') || '';
    img.loading = 'lazy';
    img.decoding = 'async';
    var frame = piece.querySelector('.piece__frame');
    frame.innerHTML = '';
    frame.appendChild(img);
    piece.classList.add('is-loaded');
  };
  img.src = src;
});

var y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();
