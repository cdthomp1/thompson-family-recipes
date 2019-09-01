export default class LoginController {
   constructor() {}

   init() {
      
      console.log('loginController.init()');
     

      /* THIS IS A DEBUGGING FIX! ********************************************************************************* */
      let deleteButton = document.getElementById('delete_data_btn');
      deleteButton.addEventListener('click', () => {
         localStorage.clear();
      })

      let signoutButton = document.getElementById('signoutBtn');
      console.log(signoutButton);
      signoutButton.addEventListener('click', () => {
         firebase.auth().signOut()
      })
   }

   setPageListeners() {
      this.forgotPasswordBtn.addEventListener('touchend', () => {
         // do nothing for now...
      })
      this.loginBtn.addEventListener('touchend', async () => {
         this.emailWarning.innerHTML = null;
         this.passwordWarning.innerHTML = null;
         this.showLoadCircle();
         const email = this.emailInput.value;
         const password = this.passwordInput.value;
         const isSuccess = await this.loginUserEmail(email, password);
         if (!isSuccess) {
            this.hideLoadCircle();
            this.passwordWarning.innerHTML = "* Incorrect email or password"
         }
      })
      this.signupBtn.addEventListener('touchend', async () => {
         this.emailWarning.innerHTML = null;
         this.passwordWarning.innerHTML = null;
         // eventually, this will just be a separate ui
         const email = this.emailInput.value;
         const password = this.passwordInput.value;
         const isValidEmail = this.validateEmail(email);
         const isValidPassword = this.validatePassword(password);
         if (!isValidEmail) {
            this.displayEmailWarning("* Please enter a valid email")
         }
         if (isValidPassword !== "ok") {
            // warn about password
            this.displayPasswordWarning(isValidPassword);
         }
         if (isValidEmail && isValidPassword === "ok") {
            this.showLoadCircle();
            let isValid = await this.registerNewUserEmail(email, password);
            if (!isValid) {
               this.hideLoadCircle();
               this.displayEmailWarning(`* The email "${email}" is already registered`)
            }
         }
      })
   }




   /* LOGIC METHODS */

   validateEmail(email) {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailPattern.test(email);
   }

   validatePassword(password) {
      if (password.length < 6) {
         return ("too_short");
      } else if (password.length > 50) {
         return ("too_long");
      } else if (password.search(/\d/) == -1) {
         return ("no_num");
      } else if (password.search(/[a-zA-Z]/) == -1) {
         return ("no_letter");
      } else if (password.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) != -1) {
         return ("bad_char");
      }
      return ("ok");
   }

   displayEmailWarning(message) {
      this.emailWarning.innerHTML = message;
   }

   displayPasswordWarning(warning) {
      if (warning === "too_short") {
         this.passwordWarning.innerHTML = "* Password must be 8 or more characters"
      } else if (warning === "too_long") {
         this.passwordWarning.innerHTML = "* Password is too long"
      } else if (warning === "no_num") {
         this.passwordWarning.innerHTML = "* Password must contain a number"
      } else if (warning === "no_letter") {
         this.passwordWarning.innerHTML = "* Password must contain a letter"
      } else if (warning === "bad_char") {
         this.passwordWarning.innerHTML = "* Password contains an invalid character"
      } else {
         this.passwordWarning.innerHTML = null;
      }
   }

   loginUserEmail(email, password) {
      // if user login success, return true
      return firebase.auth().signInWithEmailAndPassword(email, password)
         .then(function () {
            return true;
         })
         .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log(errorCode, errorMessage);
            return false;
         });
      // else return false
   }

   registerNewUserEmail(email, password) {
      return firebase.auth().createUserWithEmailAndPassword(email, password)
         .then(function () {
            return true;
         })
         .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log(errorCode, errorMessage);
            return false;
         });
   }

}