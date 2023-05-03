let navOpen = true;
const navbar = document.querySelector('nav')

function toggleNav() {
    navOpen = !navOpen;

    if (navOpen)
    {
        navbar.classList.remove('closed')
    }
    else {
        navbar.classList.add('closed')
    }
}