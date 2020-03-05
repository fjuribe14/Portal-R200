const main = document.querySelector(".main-container"),
  navbar = document.querySelector(".navbar"),
  sidenav = document.querySelector(".sidenav"),
  messages = document.querySelector(".alert"),
  footer = document.querySelector('footer');

main.style.marginTop = navbar.clientHeight + "px";
main.style.marginBottom = footer.clientHeight + "px";
messages.style.marginTop = navbar.clientHeight + "px";
