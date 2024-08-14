// step one
const search = document.getElementById("search");
const sumbit = document.getElementById("sumbit");
const resultHeading = document.getElementById("result-heading");
const mealsEl = document.getElementById("meals");
const single_mealEl = document.getElementById("single-meal-container");
const ingredients = document.getElementsByClassName("ingredients");
//step one end
// step two
function findMeal(e) {
  e.preventDefault();
  const item = search.value;
  //   console.log(item);
  if (item.trim()) {
    // alert("data is present");
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`)
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        resultHeading.innerHTML = `search result ${item}`;
        if (data.meals === null) {
          resultHeading.innerHTML = `Oops ${item}`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) => `<div class="card meal img" style="width: 18rem">
  <div id="contain">
    <img src="${meal.strMealThumb}" class="card-img-top food-image" alt="${meal.strMeal}" />
    <div class="card-body meal-info" data-mealId="${meal.idMeal}">
      <p class="card-text">
        <h3>${meal.strMeal}</h3>
      </p>
    </div>
  </div>
</div>`
            )
            .join("");
        }
      });
    search.value = "";
  } else {
    alert("please enter name");
  }
}
// step four
function getsingleItemId(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`).then(
    (res) =>
      res.json().then((data) => {
        //console.log(data)
        const meal = data.meals[0];
        console.log(meal);
        addmealToDom(meal);
      })
  );
}
function addmealToDom(meal) {
  //single data loop
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  // console.log(ingredients);
  single_mealEl.innerHTML = `<div class="wrap animate pop">
	<div class="overlay">
		<div class="overlay-content animate slide-left delay-2">
			<h1 class="animate slide-left pop delay-4" id="text-shadow">${meal.strMeal}</h1>
			<p class="animate slide-left pop delay-5" style="color: white; margin-bottom: 2.5rem;">${
        meal.strArea
      }: <em>${meal.strMeal}</em></p>
		</div>
		<div class="image-content animate slide delay-5" style="background-image: url(${
      meal.strMealThumb
    })"></div>
		<div class="dots animate">
			<div class="dot animate slide-up delay-6"></div>
			<div class="dot animate slide-up delay-7"></div>
			<div class="dot animate slide-up delay-8"></div>
		</div>
	</div>
	<div class="text">
		<p><img class="inset" src="${meal.strMealThumb}" alt="" />${
    meal.strCategory
      ? `
      <p>${meal.strCategory}</p>
      `
      : ""
  } ${
    meal.strArea
      ? `
      <p>${meal.strArea}</p>
      `
      : ""
  }</p>
		<p>${meal.strArea}</p>

		<p><ul>
        ${ingredients
          .map(
            (ing) => `
        <li>${ing}</li>
        `
          )
          .join("")}
      </ul></p>
	</div>
</div>
`;
}
//step four end
// submit.addEventListener("submit", findMeal);
//step two end
sumbit.addEventListener("submit", findMeal);

mealsEl.addEventListener("click", (e) => {
  const mealInfo = e.composedPath().find((single_item) => {
    if (single_item.classList) {
      return single_item.classList.contains("meal-info");
    } else {
      return false;
    }
  });
  console.log(mealInfo);
  //step three
  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-mealId");
    //console.log(mealID);
    getsingleItemId(mealID);
  }
});
