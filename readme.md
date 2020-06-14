# Simple Form Validation

## Working Demo

A working demo can be found live here:

https://ancientabysswalker.github.io/Simple-Form-Validation/

## Implementation

Simple form validation implemented on an HTML form using TypeScript.

Code validates both on entering text into fields and again at submission. The code checks:

- All fields must have text
- Username must not be already claimed (currently just a const array or usernames)
- Email must be of valid format
- Passwored must contain at least 6 characters, one capital, one number, and one special character
- Password confirmation must match
