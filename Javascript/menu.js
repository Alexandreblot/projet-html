function displayDateTime() {
  const event = new Date();
  let time = event.toLocaleTimeString("fr-FR");
  document.getElementById("time").innerText = time;
  setInterval(displayDateTime, 1000);
}

displayDateTime();