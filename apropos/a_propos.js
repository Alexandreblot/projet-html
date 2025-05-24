function modal(event) {
const url = event.currentTarget.getAttribute("href");
if (url.startsWith("#gojira")){
    document.getElementById("modal-gojira").classList.remove("hidden");
    const p = document.querySelector("#modal-gojira .modal-content p");
    p.textContent = truncateText(p.textContent);
}
if(url.startsWith("#musique")){
    document.getElementById("modal-musique").classList.remove("hidden");
    const p = document.querySelector("#modal-musique .modal-content p");
    p.textContent = truncateText(p.textContent);
}
if (url.startsWith("#guitariste")){
    document.getElementById("modal-guitariste").classList.remove("hidden");
    const p = document.querySelector("#modal-guitariste .modal-content p");
    p.textContent = truncateText(p.textContent);
}
if (url.startsWith("#guitariste2") || url.startsWith("#gojira2") || url.startsWith("#musique2")) {
  document.getElementById("modal-guitariste").classList.add("hidden");
  document.getElementById("modal-gojira").classList.add("hidden");
  document.getElementById("modal-musique").classList.add("hidden");
}
}

function truncateText(s) {
    if (s.length > 150) {
        return s.substring(0, 150) + "...";
    }
    return s;
}