let cartona2 ;
function displayMealss() {
    
    cartona2='';
    for(let i=0; i<getMeals.meals.length; i++){
        cartona2 += `
            <div id="meal" class="meal col-lg-3 col-md-6 col-sm-12 ">
            <div class="position-relative overflow-hidden rounded-2 ">
                <img class="w-100 " src="${getMeals.meals[i].strMealThumb}" alt="${getMeals.meals[i].strMeal +' '+ 'image'}">
                <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                <h3>${getMeals.meals[i].strMeal}</h3>
                </div>
                </div>
            </div>   `
    }   
    $('#meal2').html(`${cartona2}`);
}

$('#searchByName').on('input',function(){
    closeSideNav();

    (async function(){
        loaderFadeIn()
        let searchByName = $('#searchByName').val();

        let searchOfMeal = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchByName}`);
        getMeals= await searchOfMeal.json();

        if(getMeals.meals != null){
           displayMealss(getMeals.meals);
        }else{
            getMeals.meals= [];
            $('#meal2').html(' ');  
        };

        if(searchByName==''){
            $('#meal2').html(' ');
        }
        console.log(getMeals);
        loaderFadeOut()
    })();
});

$('#searchByLetter').on('input',function(e){ 
    closeSideNav();

    let searchByLetter = $('#searchByLetter').val();
    let lenOfChar= $(e.target).val().length;

    let inputRegex = /^[a-zA-z]{1}$/;

    if(searchByLetter.match(inputRegex) && lenOfChar==1){
        
        (async function(){
            loaderFadeIn()   
            let searchOfMeal = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchByLetter}`);
            getMeals= await searchOfMeal.json();    

            if(getMeals.meals != null){
                displayMealss(getMeals.meals);
             }else{
                getMeals.meals= [];
                $('#meal2').html(' ');  
             };
             if(searchByLetter==''){
                 $('#meal2').html(' ');
             }
             loaderFadeOut()
        })();
    }else{
        loaderFadeIn()   
        if(getMeals.meals != null){
            displayMealss(getMeals.meals);
         }else{
            getMeals.meals= [];
            $('#meal2').html(' ');  
         };
 
         if(searchByLetter==''){
            $('#meal2').html(' ');
         }
         loaderFadeOut()
    }

});