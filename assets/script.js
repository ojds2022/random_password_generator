const genPassword = () => {

    const genPasswordBtn = document.getElementById('gen_password_btn'); // button that starts the password creation process
    const genPasswordBtnSec = document.getElementById('gen_password_btn_sec');
    const finishGenBtn = document.getElementById('finish_gen_btn'); // button that completes the password creation process
    const password = document.getElementById('secure_password'); // section where the password appears 
    const passwordParam = document.getElementById('password_parameters_section'); // section where password parameters are contained
    const checkboxes = document.querySelectorAll('#fieldset input[type="checkbox"]'); // checkboxs in the password parameteres sec
    const sliderInput = document.getElementById('user_number_input'); // slider in the password parameter sec
    const value = document.getElementById('value'); // area where slider value is dynamically displayed
    let checkboxArray = []; // empty array that gets populated with the checkbox values that are selected

    // sets the textContent of the value var to the value of the sliderInput var
    value.textContent = sliderInput.value;
    sliderInput.addEventListener('input', (e) => { // adds and eventListener to the slider and dynamically changes the textContent of the value var
        value.textContent = e.target.value;
    });
    

    // gathers all the ids of the checked checkboxs and pushes them into the empty checkboxArray array
    function getCheckboxValues () {
        checkboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                checkboxArray.push(checkbox.id);
            }
        });
        // takes the newly populated array and passes it to the generateRandomPassword func
        generateRandomPassword(checkboxArray);
    }

    // takes in the user's password parameter selections and generates a password
    function generateRandomPassword(data) {
        const letters = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const specialChar = '!@#$%<>^&*()-_=+\|{}[]';
        let characters = '';
        const userNumberInput = value.textContent;  // var that holds the number that a user chooses for their password length
        
        for (let i = 0; i < userNumberInput; i++) {
            // Generates all characters based on selected checkboxes
            data.forEach((checkboxId) => {
                if (checkboxId === 'lower_case') {
                    characters += letters;
                } else if (checkboxId === 'upper_case') {
                    characters += letters.toUpperCase();
                } else if (checkboxId === 'numbers') {
                    characters += numbers;
                } else if (checkboxId === 'special_char') {
                    characters += specialChar;
                }
            });
        }
    
        // Shuffles the characters
        const shuffledCharacters = shuffleString(characters);
    
        // Takes the number of characters based on the user's input value
        const result = shuffledCharacters.slice(0, userNumberInput);
    
        // Makes the password parameters sec disappear after user clicks 'finish generation'
        passwordParam.style.display = 'none';

        // Passes the final result to the postPassword func
        postPassword(result);
    }

    // Function to shuffle a string
    function shuffleString(str) {
        const array = str.split('');
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array.join('');
    }
    
    // Takes in the final result of the generateRandomPassword
    function postPassword(data) {
        password.innerHTML = `${data}`;
    }

    // Reveals the password parameter sec and removes the gen password btn
    genPasswordBtn.addEventListener('click', () => {
        passwordParam.style.display = 'block';
        //genPasswordBtn.style.display = 'none';
    });

    // Triggers the
    finishGenBtn.addEventListener('click', () => {
        getCheckboxValues();
    });

}

genPassword();