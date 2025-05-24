
function displayDateTime() {
  const event = new Date();
  let time = event.toLocaleTimeString("fr-FR");
  document.getElementById("time").innerText = " Il est " + time;
  console.log("Il est ");
}

function displaycrementSeconds() {
  let seconde = 0;
  document.getElementById("phrase2").innerText ="vous etes sur la page depuis ";
  document.getElementById("seconde").innerText = seconde + "s";
  stopfonction = setInterval(function () {
    document.getElementById("seconde").innerText = seconde + "s";
    seconde++;
  }, 1000);
  seconde++;
}

function main() {
  displaycrementSeconds();
  setInterval(displayDateTime, 1000);
}
main();
