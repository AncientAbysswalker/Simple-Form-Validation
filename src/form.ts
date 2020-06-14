// Types
type ValidationPair = [HTMLInputElement, InputValidation];

// Interfaces
interface InputValidation {
  (...input: HTMLInputElement[]): boolean;
}

// Form elements
const form = document.getElementById("form")! as HTMLElement;
const username = document.getElementById("username")! as HTMLInputElement;
const email = document.getElementById("email")! as HTMLInputElement;
const password = document.getElementById("password")! as HTMLInputElement;
const password2 = document.getElementById("password2")! as HTMLInputElement;

// Array of validation pairs to validate at form submission
const validation_pairs: ValidationPair[] = [
  [username, () => checkValidUsername(username)],
  [email, () => checkValidEmail(email)],
  [password, () => checkValidPassword(password)],
  [password2, () => checkPasswordsMatch(password, password2)],
];

// Fun extra for users that are already registered!
const registered_users = ["registered", "wilhelm", "username"];

// Show input error message
function showError(input: HTMLInputElement, message: string) {
  const formControl = input.parentElement;

  formControl.className = "form-entry error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// Show success outline
function showSuccess(input: HTMLInputElement) {
  const formControl = input.parentElement;
  formControl.className = "form-entry success";
  const small = formControl.querySelector("small");
  small.innerText = "Error Message";
}

// Show success outline
function showReset(input: HTMLInputElement) {
  const formControl = input.parentElement;
  formControl.className = "form-entry";
  const small = formControl.querySelector("small");
  small.innerText = "Error Message";
}

// Check username is valid
var checkValidUsername: InputValidation = (input: HTMLInputElement) => {
  const re = /^([a-zA-Z0-9_.-]+)$/; // Only alphanumerics (also secretly -._)

  // Check if unregistered
  if (!registered_users.includes(input.value)) {
    if (re.test(input.value.trim())) {
      showSuccess(input);
      return true;
    } else {
      showError(input, "May only contain alphanumerics");
      return false;
    }
  } else {
    showError(input, input.value + " is already taken");
    return false;
  }
};

// Check email is valid
var checkValidEmail: InputValidation = (input: HTMLInputElement) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // Make email all lower case
  input.value = input.value.toLocaleLowerCase();

  if (re.test(input.value.trim())) {
    showSuccess(input);
    return true;
  } else {
    showError(input, "Email is not valid");
    return false;
  }
};

// Check password is valid
var checkValidPassword: InputValidation = (input: HTMLInputElement) => {
  const re = /^(?=.*\d)(?!.*\s)(?=.*[A-Z]).{6,}$/; // 6 or more characters, one number, one special, one uppercase

  if (re.test(input.value.trim())) {
    showSuccess(input);
    return true;
  } else {
    showError(
      input,
      `Password must contain:
      • at least 6 characters
      • at least one capital letter
      • at least one number
      • at least one special character`
    );
    return false;
  }
};

// Check passwords match
var checkPasswordsMatch: InputValidation = (
  input1: HTMLInputElement,
  input2: HTMLInputElement
) => {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match");
    return false;
  } else {
    showSuccess(input2);
    return true;
  }
};

// Return whether the field is empty
var checkEmptyField: InputValidation = (input: HTMLInputElement) => {
  return !input.value.trim();
};

// Check required fields
var checkFields = (input_arr: ValidationPair[]) => {
  let valid_form = true;

  input_arr.forEach(([input, validate]) => {
    if (checkEmptyField(input)) {
      showError(input, "This is a required field");
      valid_form = false;
    } else {
      if (!validate()) {
        valid_form = false;
      }
    }
  });

  return valid_form;
};

// Get fieldname
function getFieldName(input: HTMLInputElement) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Submission of form
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (checkFields(validation_pairs)) {
    console.log("Submit Form");
  }
});

// On email entry, check validity
email.addEventListener("focusout", function (e) {
  e.preventDefault();

  if (checkEmptyField(email)) {
    showReset(email);
  } else {
    checkValidEmail(email);
  }
});

// On email entry, check validity
username.addEventListener("focusout", function (e) {
  e.preventDefault();

  if (checkEmptyField(username)) {
    showReset(username);
  } else {
    checkValidUsername(username);
  }
});

// On password entry, check validity
password.addEventListener("focusout", function (e) {
  e.preventDefault();

  if (checkEmptyField(password)) {
    showReset(password);
  } else {
    checkValidPassword(password);

    // Check if password 2 matches (just in case entered first)
    if (checkEmptyField(password2)) {
      showReset(password2);
    } else {
      checkPasswordsMatch(password, password2);
    }
  }
});

// On password confrim entry, check match
password2.addEventListener("focusout", function (e) {
  e.preventDefault();

  if (checkEmptyField(password2)) {
    showReset(password2);
  } else {
    checkPasswordsMatch(password, password2);
  }
});
