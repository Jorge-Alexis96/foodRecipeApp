let searchBtn = document.getElementById("searchBtn");
let mealList = document.getElementById("meal");
let mealDetailsContent = document.querySelector(".meal-details-content");
let recipeCloseBtn = document.getElementById("recipeCloseBtn");

// eventos list

searchBtn.onclick = () => {
  getMealList();
};

mealList.onclick = (e) => {
  getMealRecipe(e);
};

recipeCloseBtn.onclick = () => {
  mealDetailsContent.parentElement.classList.remove('showRecipe')
}

// funciones

const getMealList = () => {
  let searchInputTxt = document.getElementById("search-input").value.trim();
  fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`
  )
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `
                    <div class="meal-item" data-id="${meal.idMeal}">
                      <div class="meal-img">
                      <img src="${meal.strMealThumb}" alt="food" />
                      </div>
                      <div class="meal-name">
                      <h3>${meal.strMeal}</h3>
                      <a href="#" class="recipe-btn">Get Recipe</a>
                      </div>
                    </div>
                  `;
        });
      } else {
        html = "Lo sentimos elemento no encontrado";
      }
      mealList.innerHTML = html;
    });
};

const getMealRecipe = (e) => {
  e.preventDefault();
  if (e.target.classList.contains("recipe-btn")) {
    let mealItem = e.target.parentElement.parentElement;
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
    )
      .then((response) => response.json())
      .then((data) => mealRecipeModal(data.meals));
  }
};

const mealRecipeModal = (meal) => {
  meal = meal[0];
  let html = `
                <h2 class="recipe-title">${meal.strMeal}</h2>
                <p class="recipe-category">${meal.strCategory}</p>
                <div class="recipe-instruct">
                  <h3>Instructions:</h3>
                  <p>
                    ${meal.strInstructions}
                  </p>
                </div>
                <div class="recipe-meal-img">
                  <img src="${meal.strMealThumb}" alt="">
                </div>
                <div class="recipe-link">
                  <a href="${meal.strYoutube}" target="_blank">what video</a>
                </div>
              `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe')
};
