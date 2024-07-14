//Loading Screen
$(document).ready(function(){
    loaderFadeOut();
})
//loading Screen:
function loaderFadeIn(){
    $('.loader').addClass('d-flex')
    
    $(".loader").fadeIn(300)
    $('body').css({overflow: 'hidden'})
}
function loaderFadeOut(){
    $(".loader").fadeOut(300,function() {
        $('.loader').removeClass('d-flex')
        $('body').css({overflow: 'visible'})
       })
}
//Side Nav Animate
let navInnerWidth =$('.nav-tab').innerWidth(); 
function closeSideNav(){
    $('#side-nav').animate({left:-navInnerWidth},500);
    $('#closeBtn').removeClass('fa-x');
    $('#closeBtn').addClass('fa-align-justify');

    $(".links ul li").animate({top: 300}, 500)
}

function openSideNav(){
    $('#side-nav').animate({left:0},500);
    $('#closeBtn').removeClass('fa-align-justify')
    $('#closeBtn').addClass('fa-x');

    for (let i = 0; i < 5; i++) {
        $(".links ul li").eq(i).animate({top: 0}, (i+5)*100)
    }
}

$("#side-nav i.open-close-icon").on('click',function(){
    if ($("#side-nav").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
})

//Default Side Nav
$('#side-nav').css({left: -navInnerWidth}),$('#closeBtn').removeClass('fa-x'),$('#closeBtn').addClass('fa-align-justify');

let getMeals ={};
let arrayOfArea=[];



//Default Meals 
function displayMeals() {
    arrayOfArea = getMeals.meals.slice(0,20);
    let cartona ='';
    for(let i=0; i<arrayOfArea.length; i++){
        cartona += `
            <div id="meal" class="meal col-lg-3 col-md-6 col-sm-12 ">
            <div class="position-relative overflow-hidden rounded-2 ">
                <img class="w-100 " src="${arrayOfArea[i].strMealThumb}" alt="${arrayOfArea[i].strMeal +' '+ 'image'}">
                <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                <h3>${arrayOfArea[i].strMeal}</h3>
                </div>
            </div>
            </div>
        `
    }   
     $('#meal,#meal3,#area1,#meal5').html(`${cartona}`);
}

(async function () {
    let meals= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s`);
    getMeals =await meals.json();
    console.log(getMeals);

    displayMeals()
})();  



//Get Details of Meals
$('#meal,#meal2,#meal3,#area1,#meal5').on('click',function(e){
    closeSideNav();
    loaderFadeIn();

    //Name Of Meal
    let mealName = e.target.innerText;

    let getMeal={};
    (async function(){
        let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
        getMeal = await respone.json();
        console.log(getMeal);

//To show Meals Ingredients:
        let ingredients = '';
        for (let i = 0; i < 25; i++) {
        if (getMeal.meals[0][`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${getMeal.meals[0][`strMeasure${i}`]} ${getMeal.meals[0][`strIngredient${i}`]}</li>`
        }
        }

        let allTags = getMeal.meals[0].strTags?.split(",");
        if (!allTags) allTags = [];

        let tagsStr = '';
        for (let i = 0; i < allTags.length; i++) {
            tagsStr += `
            <li class="alert alert-danger m-2 p-1">${allTags[i]}</li>`
        }

     let cartona = `
    <div class="col-lg-4 col-sm-12">
    <img class="w-100 rounded-3" src="${getMeal.meals[0].strMealThumb}" alt="">
    <h2>${getMeal.meals[0].strMeal}</h2>
    </div>
    <div class="col-lg-8 col-sm-12">
    <h2>instructions</h2>
    <p>${getMeal.meals[0].strInstructions}</p>
    <h3>
    <span class="fw-bolder">Area : </span>
    ${getMeal.meals[0].strArea}
    </h3>
    <h3>
    <span class="fw-bolder">Category : </span>
    ${getMeal.meals[0].strCategory}
    </h3>
    <h3> 
    Recipes : 
    </h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${ingredients}
        </ul>
    <h3> 
    Tags : 
    </h3>
    <ul class="list-unstyled d-flex g-3 flex-wrap">
        ${tagsStr}
    </ul>
    <a target="_blank" href="${getMeal.meals[0].strSource}" class="btn btn-success">Source</a>
    <a target="_blank" href="${getMeal.meals[0].strYoutube}" class="btn btn-danger">Youtube</a>
    </div>
     `
     $('#rowOfIngred').html(`${cartona}`);
     $('#homeSecIngred').removeClass('hidden');
     $('.contactSec,.clickOnIngredientSec,#homeSection,#searchSection,.categoriesSec,.clickOnArea,.clickOnCategory,.areaSection,.ingredientSec').addClass('hidden');

     loaderFadeOut();
    })();    
});

$('#search').on('click',function(){
    closeSideNav();
    loaderFadeIn();

    $('#searchSection').removeClass('hidden');
    $('.contactSec,.clickOnIngredientSec,#homeSecIngred,#homeSection,.clickOnArea,.categoriesSec,.clickOnCategory,.ingredientSec').addClass('hidden');
    loaderFadeOut();
});

//categories Section
let getCategory={};
function displayCategories(){
    let cartona='';

    for(let i=0; i<getCategory.categories.length; i++){
        cartona += `
        
        <div class="col-lg-3 col-sm-12 col-md-6">
          <div id="categoriesSec" class="position-relative overflow-hidden rounded-2 ">
              <img class="w-100 " src="${getCategory.categories[i].strCategoryThumb}" alt="${getCategory.categories[i].strCategory +' '+' image'}">
              <div class="category-layer position-absolute d-flex flex-column justify-content-center align-items-center text-center text-black p-2">
              <h3>${getCategory.categories[i].strCategory}</h3>
              <p>${getCategory.categories[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
              </div>
          </div>
          </div>
        `
    }   
     $('#inner').html(`${cartona}`); 
}
//click on category section
$('#categories').on('click',function(){
    closeSideNav();
    loaderFadeIn();

    $('.categoriesSec').removeClass('hidden');
    $('.contactSec,.clickOnIngredientSec,.ingredientSec,#homeSecIngred,#homeSection,.clickOnArea,#searchSection,.clickOnCategory,.areaSection').addClass('hidden');

    (async function(){
        let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
        getCategory = await respone.json();
        console.log(getCategory);

        displayCategories();
    })();

    loaderFadeOut();
})

$('#inner').on('click',function(e){
    let nameOfCategory = e.target.parentElement.firstElementChild.innerText;

    closeSideNav();
    loaderFadeIn();

    $('.clickOnCategory').removeClass('hidden');
    $('.contactSec,.clickOnIngredientSec,.ingredientSec,#homeSecIngred,#homeSection,#searchSection,.clickOnArea,.categoriesSec,.areaSection').addClass('hidden');

    (async function(){
        let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${nameOfCategory}`);
        getMeals = await respone.json();
        console.log(getMeals);
       
        if(getMeals.meals!= null){
            displayMeals()
        }else{
            $('.categoriesSec').removeClass('hidden');
            $('.contactSec,.clickOnIngredientSec,.ingredientSec,#homeSecIngred,#homeSection,.clickOnArea,#searchSection,.clickOnCategory,.areaSection').addClass('hidden');
            (async function(){
                let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
                getCategory = await respone.json();
                console.log(getCategory);
        
                displayCategories();
            })();
        
        
        }
    })();
    loaderFadeOut();
})

//display All areas
let getArea={};

function displayAllArea(){
    let cartona ='';

    for(let i=0; i< getArea.meals.length;i++){
        cartona += `
        <div class="col-lg-3 col-sm-12 col-md-6 text-center">
            <i class="fa-solid fa-house-laptop fa-4x"></i>
            <h3>${getArea.meals[i].strArea}</h3>
        </div>`}
    $('#areaSection').html(cartona)
}

//click on Area section
$('#area').on('click',function(){
    closeSideNav();
    loaderFadeIn();

    $('.areaSection').removeClass('hidden');
    $('.contactSec,.clickOnIngredientSec,.ingredientSec,#homeSecIngred,#homeSection,#searchSection,.clickOnArea,.categoriesSec,.clickOnCategory').addClass('hidden');

    (async function(){
        let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
        getArea = await respone.json();
        console.log(getArea);

        displayAllArea();
    })();
    loaderFadeOut();
})

//click on specific Area
$('#areaSection').on('click',function(e){
    let NameOfArea = $(e.target).parent().children();
    console.log(NameOfArea[1].innerText);
    

    closeSideNav();
    loaderFadeIn();

    $('.clickOnArea').removeClass('hidden');
    $('.contactSec,.clickOnIngredientSec,.ingredientSec,#homeSecIngred,#homeSection,#searchSection,.areaSection,.categoriesSec,.clickOnCategory').addClass('hidden');

    (async function(){
        let meals= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${NameOfArea[1].innerText}`);
        getMeals =await meals.json();
        console.log(getMeals);

        if(getMeals.meals!= null){
            displayMeals()
        }else{
            $('.areaSection').removeClass('hidden');
            $('.contactSec,.clickOnIngredientSec,.ingredientSec,#homeSecIngred,#homeSection,#searchSection,.clickOnArea,.categoriesSec,.clickOnCategory').addClass('hidden');
            (async function(){
                let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
                getArea = await respone.json();
                console.log(getArea);
        
                displayAllArea();
            })();
        
        }
        
    })();
    loaderFadeOut();
});


//Ingredients Section
let getIngred={};
let arraySlice = [];

function desplayIngredients(){
    let cartona = '';
    for(let i=0; i<arraySlice.length; i++){
        cartona += `
            <div  class="col-lg-3 col-sm-12 col-md-6">
            <div  class="ingredientContent rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${arraySlice[i].strIngredient}</h3>
                <p>${arraySlice[i].strDescription? arraySlice[i].strDescription.split(" ").slice(0,20).join(" "): []}</p>
            </div>
            </div>
        `}   
     $('#ingredSec').html(`${cartona}`); 
    
}
//click on Ingredients section
$('#ingredients').on('click',function(){
    closeSideNav();
    loaderFadeIn();

    $('.ingredientSec').removeClass('hidden');
    $('.contactSec,.clickOnIngredientSec,.areaSection,#homeSecIngred,#homeSection,#searchSection,.clickOnArea,.categoriesSec,.clickOnCategory').addClass('hidden');

    (async function(){
        let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
        getIngred = await respone.json();
        console.log(getIngred);
        arraySlice =getIngred.meals.slice(0,20);
        console.log(arraySlice);
        
        desplayIngredients();
    })();
    loaderFadeOut();
})

$('#ingredSec').on('click',function(e){
    
    
    let nameOfmeal = $(e.target).parent().children();
    console.log(nameOfmeal[1].innerText);
    closeSideNav();
    loaderFadeIn();

    $('.clickOnIngredientSec').removeClass('hidden');
    $('.contactSec,.ingredientSec,.areaSection,#homeSecIngred,#homeSection,#searchSection,.clickOnArea,.categoriesSec,.clickOnCategory').addClass('hidden');

    (async function(){
        let meals= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${nameOfmeal[1].innerText}`);
        getMeals =await meals.json();
        console.log(getMeals);
    
        if(getMeals.meals!= null){
            displayMeals()
        }else{
            $('.ingredientSec').removeClass('hidden');
            $('.contactSec,.clickOnIngredientSec,.areaSection,#homeSecIngred,#homeSection,#searchSection,.clickOnArea,.categoriesSec,.clickOnCategory').addClass('hidden');
            (async function(){
                let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
                getIngred = await respone.json();
                console.log(getIngred);
                arraySlice =getIngred.meals.slice(0,20);
                console.log(arraySlice);
                
                desplayIngredients();
            })();
        
        }
       // getMeals.meals != null ? displayMeals() : $('#meal5').html(' ');


    })()
    loaderFadeOut()
})

$('#contact').on('click',function(){
    closeSideNav();
    loaderFadeIn();

    $('.contactSec').removeClass('hidden');
    $('.ingredientSec,.clickOnIngredientSec,.areaSection,#homeSecIngred,#homeSection,#searchSection,.clickOnArea,.categoriesSec,.clickOnCategory').addClass('hidden');

    loaderFadeOut()

})
