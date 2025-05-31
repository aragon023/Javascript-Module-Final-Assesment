const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

let menuOpen = false;

hamburger.addEventListener('click', () => {
  if (!menuOpen) {
    navLinks.classList.add('active');
    menuOpen = true;
  } else {
    navLinks.classList.remove('active');
    menuOpen = false;
  }
});