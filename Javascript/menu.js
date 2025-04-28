function displayDateTime() {
  let tmp = get2DContext("temps");
  const event = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let date = event.toLocaleDateString("fr-FR", options);
  let time = event.toLocaleTimeString("fr-FR");
  document.getElementById("date").innerText = date;
  document.getElementById("time").innerText = time;
}

displayDateTime();
