let seconde = 0;
function displayDateTime() {
  const event = new Date();
  let time = event.toLocaleTimeString("fr-FR");
  document.getElementById("time").innerText = " Il est " +time;
  setInterval(displayDateTime, 1000);
}

function displaycrementSeconds() {
  seconde = seconde + 1;
  document.getElementById("phrase2").innerText = "vous etes sur la page depuis ";
  document.getElementById("seconde").innerText = seconde + "s";
}


function main() {
  setInterval(displaycrementSeconds,1000);
  displayDateTime();
}
main();
