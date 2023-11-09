// Assignment Code
let generateBtn = document.querySelector("#generate");

const characterLists = {
  lowerCase: "abcdefghijklmnopqrstuvwxyz",
  upperCase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numeric: "0123456789",
  special: "!@#$%^&*()_-=+[]{};:'`~,<.>/?|"
};

// Function to check if the user inputs are valid. Return valid input
function checkUserInput(promtPar, numCheck) {
  let inputTemp = prompt(promtPar);

  return numCheck ? 
    (inputTemp >= 8 && inputTemp <= 128 ? inputTemp 
      : (alert('Please input a valid number!'), checkUserInput(promtPar, numCheck)))

    : (inputTemp.toLowerCase() === 'yes' ? true 
      : inputTemp.toLowerCase() === 'no' ? false
      : (alert("Please answer with 'Yes' or 'No'"), checkUserInput(promtPar, numCheck)));
}

// Function to get user input. Return input as object
function getUserInput() {
  let tempObj = {};
  tempObj.length = checkUserInput("Password Length (8 - 128): ", true);
  tempObj.lowerCase = checkUserInput("Include Lowercase?  Yes/No", false);
  tempObj.upperCase = checkUserInput("Include Uppercase?  Yes/No", false);
  tempObj.numeric = checkUserInput("Include Numbers?  Yes/No", false);
  tempObj.special = checkUserInput("Special Characters?  Yes/No", false);

  // If user picked all 'no' then generating a password is not possible.
  // Alert the user and have them pick again.
  if (!tempObj.lowerCase && !tempObj.upperCase && !tempObj.numeric && !tempObj.special) {
    alert('No possible Password with the options picked!');
    tempObj = getUserInput();
  }
  // return a valid user input
  return tempObj;
}

// Function to generate a valid password according to the user input. Return a valid password string
function generatePassword() {
  const userInput = getUserInput();
  let tempPassword = '';

  // Loop for each of the password characters
  for (let i = 0; i < userInput.length; i++) {
    let isValid = false;

    while (!isValid) {
      // Get random number between 1- 4
      let randomNum = Math.floor(Math.random() * 4) + 1;
      // Pick what type the current password character is going to be
      let randomChoice = randomNum === 1 ? 'lowerCase'
        : randomNum === 2 ? 'upperCase'
        : randomNum === 3 ? 'numeric'
        : 'special';
      // If the choice is valid (picked by user) i.e. true
      // If not valid loop and pick again
      if (userInput[randomChoice]) {
        // Get the list with that type of characters
        let pickedList = characterLists[randomChoice];
        // Randomly pick one character from that list
        let pickedChar = pickedList[Math.floor(Math.random() * pickedList.length)];
        // Add that character to the password string
        tempPassword += String(pickedChar);
        // End the loop
        isValid = true;
      }
    }
  }

  return tempPassword;
}

// Write password to the #password input
function writePassword() {
  const password = generatePassword();
  const passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);