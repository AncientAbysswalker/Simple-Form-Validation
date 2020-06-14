"use strict";
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const validation_pairs = [
    [username, () => checkValidUsername(username)],
    [email, () => checkValidEmail(email)],
    [password, () => checkValidPassword(password)],
    [password2, () => checkPasswordsMatch(password, password2)],
];
const registered_users = ["registered", "wilhelm", "username"];
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = "form-entry error";
    const small = formControl.querySelector("small");
    small.innerText = message;
}
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = "form-entry success";
    const small = formControl.querySelector("small");
    small.innerText = "Error Message";
}
function showReset(input) {
    const formControl = input.parentElement;
    formControl.className = "form-entry";
    const small = formControl.querySelector("small");
    small.innerText = "Error Message";
}
var checkValidUsername = (input) => {
    const re = /^([a-zA-Z0-9_.-]+)$/;
    if (!registered_users.includes(input.value)) {
        if (re.test(input.value.trim())) {
            showSuccess(input);
            return true;
        }
        else {
            showError(input, "May only contain alphanumerics");
            return false;
        }
    }
    else {
        showError(input, input.value + " is already taken");
        return false;
    }
};
var checkValidEmail = (input) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    input.value = input.value.toLocaleLowerCase();
    if (re.test(input.value.trim())) {
        showSuccess(input);
        return true;
    }
    else {
        showError(input, "Email is not valid");
        return false;
    }
};
var checkValidPassword = (input) => {
    const re = /^(?=.*\d)(?!.*\s)(?=.*[A-Z]).{6,}$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
        return true;
    }
    else {
        showError(input, `Password must contain:
      • at least 6 characters
      • at least one capital letter
      • at least one number
      • at least one special character`);
        return false;
    }
};
var checkPasswordsMatch = (input1, input2) => {
    if (input1.value !== input2.value) {
        showError(input2, "Passwords do not match");
        return false;
    }
    else {
        showSuccess(input2);
        return true;
    }
};
var checkEmptyField = (input) => {
    return !input.value.trim();
};
var checkFields = (input_arr) => {
    let valid_form = true;
    input_arr.forEach(([input, validate]) => {
        if (checkEmptyField(input)) {
            showError(input, "This is a required field");
            valid_form = false;
        }
        else {
            if (!validate()) {
                valid_form = false;
            }
        }
    });
    return valid_form;
};
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (checkFields(validation_pairs)) {
        console.log("Submit Form");
    }
});
email.addEventListener("focusout", function (e) {
    e.preventDefault();
    if (checkEmptyField(email)) {
        showReset(email);
    }
    else {
        checkValidEmail(email);
    }
});
username.addEventListener("focusout", function (e) {
    e.preventDefault();
    if (checkEmptyField(username)) {
        showReset(username);
    }
    else {
        checkValidUsername(username);
    }
});
password.addEventListener("focusout", function (e) {
    e.preventDefault();
    if (checkEmptyField(password)) {
        showReset(password);
    }
    else {
        checkValidPassword(password);
        if (checkEmptyField(password2)) {
            showReset(password2);
        }
        else {
            checkPasswordsMatch(password, password2);
        }
    }
});
password2.addEventListener("focusout", function (e) {
    e.preventDefault();
    if (checkEmptyField(password2)) {
        showReset(password2);
    }
    else {
        checkPasswordsMatch(password, password2);
    }
});
//# sourceMappingURL=form.js.map