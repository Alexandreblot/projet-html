document.addEventListener("DOMContentLoaded", function () {
  const phoneElements = document.querySelectorAll(".phone-number");
  const confirmationSection = document.getElementById("confirmation-section");
  const copiedNumberSpan = document.getElementById("copied-number");
  const inputField = document.getElementById("phone-input");
  const validateButton = document.getElementById("validate-button");
  const ringtone = document.getElementById("ringtone");

  phoneElements.forEach(el => {
    el.addEventListener("copy", () => {
      const number = el.dataset.number;
      copiedNumberSpan.textContent = number;
      confirmationSection.style.display = "block";
      inputField.value = "";
    });
  });

  validateButton.addEventListener("click", () => {
    const enteredNumber = inputField.value.trim();
    const expectedNumber = copiedNumberSpan.textContent;

    if (enteredNumber === expectedNumber) {
      console.log(`vous appelez ce numéro : ${enteredNumber}`);
      ringtone.play();

      setTimeout(() => {
        ringtone.pause();
        ringtone.currentTime = 0;
      }, 5000);
    } else {
      alert("Le numéro saisi ne correspond pas.");
    }
  });
});
