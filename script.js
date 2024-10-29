
window.addEventListener('load', function() {
    let loadTime = performance.now();
    document.getElementById('load-time').textContent = loadTime.toFixed(2);
});


const currentPath = document.location.pathname.replace('/', '');
document.querySelectorAll('.menu li a').forEach(link => {
  if (link.getAttribute('href') === currentPath) {
    link.parentElement.classList.add('active');
  }
});