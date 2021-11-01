"use strict";

const sendBtn = document.querySelector("#send-message");
const form = document.querySelector("form");
const warnung = document.querySelector(".warnung");

let inputCheck = true;

const checkinputFields = () => {
  if (form.elements["betreff"].value === "") {
    warnung.style.display = "block";
    warnung.innerHTML = "Bitte geben Sie einen Betreff ein!<br>";
    return (inputCheck = false);
  }
  if (form.elements["email"].value === "") {
    warnung.style.display = "block";
    warnung.innerHTML = "Bitte geben Sie eine Emailadresse ein<br>";
    return (inputCheck = false);
  }
  if (form.elements["name"].value === "") {
    warnung.style.display = "block";
    warnung.innerHTML =
      "Bitte geben Sie einen Namen für den Ansprechpartner ein!<br>";
    return (inputCheck = false);
  }
  if (form.elements["nachricht"].value === "") {
    warnung.style.display = "block";
    warnung.innerHTML = "Bitte geben Sie eine Nachricht ein!<br>";
    return (inputCheck = false);
  }
  inputCheck = true;
};

const sendEmail = () => {
  Email.send({
    Host: "smtp.mailtrap.io",
    Username: "64a406c2ebb465",
    Password: "889c28be3ac4dc",
    To: "moretimeproduction@googlemail.com",
    From: form.elements["email"].value,
    Subject: form.elements["betreff"].value,
    Body:
      "<strong>Name:</strong> " +
      form.elements["name"].value +
      "<br><br>" +
      "<strong>Email:</strong> " +
      form.elements["email"].value +
      "<br><br>" +
      "<strong>Nachricht:</strong>" +
      "<br><br>" +
      form.elements["nachricht"].value,
  })
    .then((msg) => console.log(msg))
    .then((e) => (location.href = "./thanks.html"));
};

sendBtn.addEventListener("click", () => {
  checkinputFields();
  if (inputCheck === true) sendEmail();
});
