// Created Constructor to save user data in object
function UserDataConstructor(firstName, lastName, email, password, number, country) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.number = number;
    this.country = country;
}
// Created constructor method
UserDataConstructor.prototype.getFullName = function () {
    return `${this.firstName} ${this.lastName}`;
};


// window.open(``,``,`width=200,height=200,top=200,left=550`)

// Sign Up form submission
window.addEventListener(`DOMContentLoaded`, () => {
    let createAccountForm = document.querySelector(`#create-account-form`);
    let welComeBox = document.querySelector(`#welcome-box`);
    if (createAccountForm) {
        createAccountForm.addEventListener(`submit`, (event) => {
            let firstName = document.querySelector(`#first-name`).value;
            let lastName = document.querySelector(`#last-name`).value;
            let email = document.querySelector(`#email`).value;
            let password = document.querySelector(`#password`).value;
            let number = document.querySelector(`#number`).value;
            let country = document.querySelector(`#country`).value;

            let addUser = new UserDataConstructor(firstName, lastName, email, password, number, country);

            if ('User' in localStorage) {
                let userData = JSON.parse(localStorage.getItem(`User`));
                userData.push(addUser);
                localStorage.setItem(`User`, JSON.stringify(userData));
            } else {
                let userData = [addUser];
                localStorage.setItem(`User`, JSON.stringify(userData));
            }

            event.target.style.display = `none`;
            document.getElementById(
                `welcome-text`
            ).innerText = `Welcome ${addUser.getFullName()}! Your account has been created successfully.`;
            welComeBox.style.display = `flex`;
            event.preventDefault();
        });
    }
});

// move to dashboard function
window.addEventListener(`DOMContentLoaded`, () => {
    let accountCreatedBtn = document.querySelector(`#show-dashboard-btn`);
    if (accountCreatedBtn) {
        accountCreatedBtn.addEventListener(`click`, () => {
            window.location.href = `dashboard.html`;
        });
    }
});

// Sign In form submission
window.addEventListener(`DOMContentLoaded`, () => {
    let signInForm = document.querySelector(`#signIn-form`);
    if (signInForm) {
        signInForm.addEventListener(`submit`, (event) => {
            let signInEmail = document.querySelector(`#signIn-email`).value;
            let signInPassword = document.querySelector(`#signIn-password`).value;
            let flag = false;
            for (let i = 0; i < JSON.parse(localStorage.getItem(`User`)).length; i++) {
                if (
                    JSON.parse(localStorage.getItem(`User`))[i].email == signInEmail &&
                    JSON.parse(localStorage.getItem(`User`))[i].password == signInPassword
                ) {
                    console.log(`user exists`);
                    window.location.href = `dashboard.html`;
                    flag = true;
                    break;
                } else {
                    console.log(`user not exists`);
                }
            }
            if (flag === false) {
                let warningText = document.querySelector(`#warn-text`);
                warningText.style.display = `block`;
                event.target.children[4].disabled = true;
                event.target.children[3].value = ``;
                event.target.children[3].addEventListener(`focus`, () => {
                    event.target.children[4].disabled = false;
                    let warningText = document.querySelector(`#warn-text`);
                    warningText.style.display = `none`;
                });
            }
            event.preventDefault();
        });
    }
});

// Product purchase function
// window.addEventListener(`DOMContentLoaded`, () => {
//     let buyBtn = document.querySelector(`#buy-btn`)
//     if (buyBtn) {
//         buyBtn.addEventListener(`click`, () => {

//         })
//     }
// })
