const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")
hamburger.addEventListener('click', function (ev) {
  hamburger.classList.toggle('active')
  navMenu.classList.toggle('active')
})
const main = document.querySelector('main')
const root = document.querySelector(':root')

document.getElementById('lmp').addEventListener('click', function () {

  if (main.dataset.theme === 'dark') {

    // LIGHT MODE PROFISSIONAL
    root.style.setProperty('--bg-color2', '#f8f9fa')
    root.style.setProperty('--bg-color1', '#ffffff')
    root.style.setProperty('--font-color', '#1a1a1a')
    root.style.setProperty('--border-color', '#e5e7eb')

    main.dataset.theme = 'light'

  } else {

    // DARK MODE (mantive o seu)
    root.style.setProperty('--bg-color2', '#302e2e')
    root.style.setProperty('--bg-color1', '#191919')
    root.style.setProperty('--font-color', '#f1f5f9')
    root.style.setProperty('--border-color', '#ffff')

    main.dataset.theme = 'dark'
  }

})



