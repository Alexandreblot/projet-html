function modal(event) {
const url = event.currentTarget.getAttribute("href");
if (url.startsWith("#gojira")){
    document.getElementById("modal-gojira").classList.remove("hidden");
}
if(url.startsWith("#musique")){
    document.getElementById("modal-musique").classList.remove("hidden");
}
if (url.startsWith("#guitariste")){
    document.getElementById("modal-guitariste").classList.remove("hidden");
}
if (url.startsWith("#guitariste2") || url.startsWith("#gojira2") || url.startsWith("#musique2")) {
  document.getElementById("modal-guitariste").classList.add("hidden");
  document.getElementById("modal-gojira").classList.add("hidden");
  document.getElementById("modal-musique").classList.add("hidden");
}
}
