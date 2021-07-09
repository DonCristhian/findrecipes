const searchBtn = document.getElementById('search-btn'),
      mealList = document.getElementById('meal'),
      mealDetails = document.querySelector('.meal-details'),
      mealDetailsContent = document.querySelector('.meal-details-content'),
      recipeCloseBtn = document.getElementById('recipe-close-btn'),
      background = document.getElementById('background');
let mealImg;



const APIUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';

// event Listeners


document.addEventListener('DOMContentLoaded', function(){
    let APIUrlIniti = APIUrl + 'cheese';
    getMealList(APIUrlIniti);
})

searchBtn.addEventListener('click', function(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    let APIUrlSearch = APIUrl + searchInputTxt;
    getMealList(APIUrlSearch);
});
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', closeMealDetails);
background.addEventListener('click', closeMealDetails);



// get meal list that matches with the ingredients

function getMealList(_APIUrl){
    
    fetch(_APIUrl)
    .then(response => response.json())
    .then(data => {
        let html = '';
        mealList.classList.remove('notFound');
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class="meal-item" data-id="${meal.idMeal}">
                        <div class="meal-img">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                        </div>
                        <div class="meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href="#" class="recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            })
        }else {
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }
        
        mealList.innerHTML = html;

        mealImg = document.querySelectorAll('.meal-img');
    })
}


// get recipe of the meal list

function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.closest(".meal-item");
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}

// create a modal 

function mealRecipeModal(meal){
    background.classList.add("showBackground");
    meal = meal[0];
    let html = `
        <h2 class="recipe-title">${meal.strMeal}</h2>
        <p class="recipe-category">${meal.strCategory}</p>
        <div class="recipe-instruct">
            <h3>Instructions: </h3>
            <p>${meal.strInstructions}</p>
            <p>This meal is from: <br> ${meal.strArea}</p>
        </div>
        <div class="recipe-meal-img">
            <img src="${meal.strMealThumb}" alt="any">
        </div>
        <div class="recipe-link">
            <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
        </div>
    `;

    mealDetailsContent.innerHTML = html;
    mealDetails.classList.add("showRecipe");

}

// Close meal details menu
function closeMealDetails(){
    mealDetails.classList.remove("showRecipe");
    background.classList.remove("showBackground");
}