let navOpen = true;
const navbar = document.querySelector('nav')
function toggleNav() {
    navOpen = !navOpen;
    navOpen ? navbar.classList.remove('closed') : navbar.classList.add('closed') 
}