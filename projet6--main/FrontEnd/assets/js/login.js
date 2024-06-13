





const loginForm = document.querySelector(".login__form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitButton = document.getElementById("submit");

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showValidationError(input, showMessage, message = "Ce champ est requis") {
    input.classList.add("error-input");
    if (showMessage) {
        const errorDiv = input.parentElement.querySelector(".loginEmail__error");
        errorDiv.textContent = message;
    }
}

function hideValidationError(input, hideMessage) {
    input.classList.remove("error-input");
    if (hideMessage) {
        const errorDiv = input.parentElement.querySelector(".loginEmail__error");
        errorDiv.textContent = "";
    }
}

function checkLoginFormValidity(emailInput, passwordInput) {
    if (emailInput.value.trim() === "") {
        showValidationError(emailInput, true);
    } else if (!validateEmail(emailInput.value.trim())) {
        showValidationError(emailInput, true, "Format incorrect");
    } else {
        hideValidationError(emailInput, true);
    }

    if (passwordInput.value === "") {
        showValidationError(passwordInput, true);
    } else {
        hideValidationError(passwordInput, true);
    }
}

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    checkLoginFormValidity(emailInput, passwordInput);



    if (!emailInput.classList.contains("error-input") && !passwordInput.classList.contains("error-input")) {
        const credentials = {
            email: emailInput.value,
            password: passwordInput.value
        };

        try {
            const response = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                body: JSON.stringify(credentials),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Erreur d'authentification");
            }

            const data = await response.json();
           
            localStorage.setItem("token", data.token);
            window.location.href = "index.html";
        } catch (error) {
            console.error("Erreur d'authentification: " + error);
            alert("Les informations utilisateur/mot de passe ne sont pas correctes.");
        }
    }
});
















/*onst loginForm = document.querySelector("#login form");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(loginForm);
  const credentials = {
    email: formData.get("email"),
    password: formData.get("password"),
  }; 
 
  const emailInput = document.querySelector('#email');
  const passwordInput = document.querySelector('#password');
  const submitButton = document.querySelector('#login-submit');

});


  
  emailInput.addEventListener('input', function () {
      hideValidationError(emailInput, false);
      if (emailInput.value.trim() === '') {
          showValidationError(emailInput, false);
      } else if (!validateEmail(emailInput.value.trim())) {
          showValidationError(emailInput, false, 'Format incorrect');
      } else {
          hideValidationError(emailInput, false);
      }
  });
  
  passwordInput.addEventListener('input', function () {
      if (passwordInput.value === '') {
          showValidationError(passwordInput, false);
      } else {
          hideValidationError(passwordInput, false);
      }
  });
  
  submitButton.addEventListener('click', async (e) => {
      checkLoginFormValidity(emailInput, passwordInput);
      
      e.preventDefault();
  
      if(!emailInput.classList.contains("error-input") && !passwordInput.classList.contains("error-input")){
          
          var email = emailInput.value;
          var password = passwordInput.value;
      
          if(!validateEmail(email)) {
              showValidationError(emailInput, false, 'Format incorrect');
              return;
          }
      
          var data = {
              email: email,
              password: password
          }};

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur d'authentification");
      }
      return response.json();
    })
    .then((data) => {
      // Store the token in local storage
      localStorage.setItem("token", data.token);

      // Redirect to the homepage
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Erreur d'authentification: " + error);
      alert("Les informations utilisateur/mot de passe ne sont pas correctes.");
    });
});
*/
