// Using validator library to check for valid email, password
const Validator = require("validator");

// Using isEmpty library to check if the value is empty
const isEmpty = require("is-empty");

module.exports = validatePostInput = data => {
   //console.log(data);
   let errors = {};

   let { title, body } = data;
   console.log(title, body);
   // Converting empty fields to empty string as validator function works only with strings
   title = !isEmpty(title) ? title : "";
   body = !isEmpty(body) ? body : "";

   if (Validator.isEmpty(title)) {
      errors.title = "Title is required";
   }
   if (Validator.isEmpty(body)) {
      errors.body = "Description is required";
   }

   return {
      errors,
      isValid: isEmpty(errors)
   };
};