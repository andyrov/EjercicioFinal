window.addEventListener("load", function () {


    let formulario = document.querySelector("form.register");
    let campoNombre = document.querySelector("#name");
    let campoEmail = document.querySelector("#email");
    let campoPassword = document.querySelector("#password");
    let campoConfirmPassword = document.querySelector("#confirm_password");


    formulario.addEventListener("submit", function (e) {

        if (campoNombre.value == "") {
            e.preventDefault();
        };

        if (campoEmail.value == "") {
            e.preventDefault();
        };

        if (campoPassword.value == "") {
            e.preventDefault();
        };

        if (campoConfirmPassword.value == "") {
            e.preventDefault();
        } else if (campoPassword.value !== campoConfirmPassword.value) {
            e.preventDefault();
        };


    });

    let nameError = document.querySelector("#nameError");
    let emailError = document.querySelector("#emailError");
    let passwordError = document.querySelector("#passwordError");
    let confirmPasswordError = document.querySelector("#confirmPasswordError");

    campoNombre.addEventListener("blur", function () {
        if (campoNombre.value == "") {
                    nameError.innerHTML = "El nombre no puede estar vacio"
        } else {
            nameError.innerHTML = ""
        };
    });
    campoEmail.addEventListener("blur", function () {
        if (campoEmail.value == "") {
                    emailError.innerHTML = "El email no puede estar vacio"
        } else {
            emailError.innerHTML = ""
        }
    });
    campoPassword.addEventListener("blur", function () {
        if (campoPassword.value == "" || campoPassword.value.length < 8) {
                    passwordError.innerHTML = "La contraseña debe tener al menos 8 caracteres"
        } else {
            passwordError.innerHTML = ""
        }
    });
    campoConfirmPassword.addEventListener("blur", function () {
        if (campoConfirmPassword.value == "") {
                    confirmPasswordError.innerHTML = "El campo confirmar contraseña no puede estar vacio"
        } else if (campoConfirmPassword.value !== campoPassword.value) {
            confirmPasswordError.innerHTML = "Las contraseñas no coinciden"
        } else {
            confirmPasswordError.innerHTML = ""
        }
    });
})


