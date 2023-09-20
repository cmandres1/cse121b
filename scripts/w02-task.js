/* W02-Task - Profile Home Page */

/* Step 1 - Setup type tasks - no code required */

/* Step 2 - Variables */
let fullName = "Andres Cabada Mendoza";
let currentYear = "2023"; 
let profilePicture = 'images/placeholder.png';

/* Step 3 - Element Variables */
const nameElement = document.getElementById('name');
const yearElement = document.querySelector('#year');
const imageElement = document.getElementsByTagName('img')[0];
const foodElement = document.getElementById('food');

/* Step 4 - Adding Content */
nameElement.innerHTML = `<strong> ${fullName} </strong>`;
yearElement.textContent = `${currentYear}`;
imageElement.setAttribute('src', profilePicture);
imageElement.setAttribute('alt',`Profile image of ${fullName}`);

/* Step 5 - Array */
let favoriteFood = ['Hamburgers', 'Pizza', 'Tacos', 'Mexican food'];
foodElement.innerHTML += `<br>${favoriteFood}`;
let favFood = 'Chocolate Cake';
favoriteFood.push(favFood);
foodElement.innerHTML += `<br>${favoriteFood}`;
favoriteFood.shift();
foodElement.innerHTML += `<br>${favoriteFood}`;
favoriteFood.pop();
foodElement.innerHTML += `<br>${favoriteFood}`;




