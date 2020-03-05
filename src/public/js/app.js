const main = document.querySelector(".main-container"),
  navbar = document.querySelector(".navbar"),
  sidenav = document.querySelector(".sidenav"),
  messages = document.querySelector(".alert");

main.style.marginTop = navbar.clientHeight + "px";
messages.style.marginTop = navbar.clientHeight + "px";
