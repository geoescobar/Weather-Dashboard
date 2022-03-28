// variables 
// var historyDropdown = document.getElementById('history-dropdown');
// var mainSearch = document.getElementById('search-bar');
// var headerTitle = document.getElementById('welcome-title');
var navBar = document.getElementById('nav');
var startSearch = document.getElementById('home-page-search');
var mainDash = document.getElementById('mainDashboard');
var dayOne = document.getElementById('dayOne');
var dayTwo = document.getElementById('dayTwo');
var dayThree = document.getElementById('dayThree');
var dayFour = document.getElementById('dayFour');
var dayFive = document.getElementById('dayFive');

// adding styles 
navBar.style.display = 'none';
mainDash.style.display = 'none';
dayOne.style.display = 'none';
dayTwo.style.display = 'none';
dayThree.style.display = 'none';
dayFour.style.display = 'none';
dayFive.style.display = 'none';
startSearch.style.display = 'block';

//changing from beginning search into main dashboard
function loadDashboard() {
    startSearch.addEventListener('submit', function(event) {
        startSearch.style.display = 'none';
        navBar.style.display = 'block';
        mainDash.style.display = 'block';
        dayOne.style.display = 'block';
        dayTwo.style.display = 'block';
        dayThree.style.display = 'block';
        dayFour.style.display = 'block';
        dayFive.style.display = 'block';
    });
   
}

// invoking function
loadDashboard();