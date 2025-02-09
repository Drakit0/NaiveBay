sidebarToggle = () => {
    const sidebar = document.getElementById("main-page__sidebar")
    const overlay = document.getElementById("main-page__overlay")

    sidebar.classList.toggle("main-page__sidebar--active")
    overlay.classList.toggle("main-page__overlay--active")
}