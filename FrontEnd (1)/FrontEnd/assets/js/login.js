const API = "http://localhost:5678/api";
const USER_NOT_FOUND =
  "L'email n'est pas répertorié parmi les utilisateurs. Veuillez Créer un compte.";
const NOT_AUTHORIZED = "Mot de passe incorrect.";

const setSubmitListener = async () => {
  const submitButton = document.querySelector(".connect-button");

  submitButton.addEventListener("click", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const response = await fetch(API + "/users/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: '{ "email": "' + email + '", "password": "' + password + '"}',
    });

    if (response.status) {
      const validResponse = await response.json();
      localStorage.setItem("token", validResponse.token);
      window.location.href = "./index.html";
    }
  });
};

const displayErrorMessage = async (message) => {
  const messageElement = document.querySelector(".error-message");

  if (messageElement === null) {
    const messageElement = document.createElement("p");
    messageElement.classList.add("error-message");

    const form = document.querySelector(".login-form");
    const emailField = document.querySelector("label");
    messageElement.innerHTML = message;
    form.insertBefore(messageElement, emailField);
  } else {
    messageElement.innerHTML = message;
  }
};

const initLogin = () => {
  setSubmitListener();
};

initLogin();
