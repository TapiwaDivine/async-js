// Async with Call Backs
const second = () => {
    setTimeout(() => {
        console.log('Async Hey there')
    }, 2000)
}
const first = () =>{
    console.log('Hey there!')
    second();
    console.log('the end')
}
first();


// callback hell
 function getRecipe () {
     setTimeout(() => {
         const recipeID = [523, 883, 432, 974]
         console.log(recipeID);

         setTimeout(id =>{
             const recipe = {
                 title: 'Fresh Tomato Pasta',
                 publisher: 'Jonas'
             }
             console.log(`${id}: ${recipe.title}`)

             setTimeout(publisher =>{
                const recipe2 = {
                    title: 'Italian Pizza',
                    publisher: 'Jonas'
                }
                console.log(recipe2);
             }, 1500, recipe.publisher)
         }, 1000, recipeID[2])
     }, 1500)
 }
 getRecipe()

 // Using PROMISES to make async functions 
const getIDs = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve([523, 883, 432, 974]);
    }, 1500);
});
const getRecipe = recID => {
    return new Promise((resolve, reject) => {
        setTimeout( ID => {
            const recipe = {title: 'Fresh Tomato Pasta', publisher: 'Jonas'}
            resolve(`${ID}: ${recipe.title}`);
        }, 1500, recID)
    })
}
const getRelated = publisher => {
    return new Promise((resolve, reject) => {
        setTimeout(pub => {
            const recipe = {
                title: 'Italian Pizza',
                publisher: 'Jonas'
            }
            resolve(`${pub}: ${recipe.title}`);
        }, 1500, publisher)
    })
}
// consuming the functions
getIDs
.then(IDs => {
    console.log(IDs)
    return getRecipe(IDs[2]);
})
.then(recipe => {
    console.log(recipe);
    return getRelated('Jonas')
})
.then(recipe => {
    console.log(recipe)
})
.catch(error => {
    console.log('error!!')
})

// consuming Promises with Async Await
async function getRecipeAW(){
    const IDs = await getIDs;
    console.log(IDs)
    const recipe = await getRecipe(IDs[2]);
    console.log(recipe)
    const related = await getRelated('Jonas');
    console.log(related)

    return recipe;
}
getRecipeAW().then(result => console.log(`${result} is the best ever`))

// Making AJAX calls to API with fetch and callbacks
function getWeather(woeid){
    fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`)
    .then(result => {
        console.log(result)
        return result.json()
    })
    .then(data => {
        const today = data.consolidated_weather[0]
        console.log(`Temperatures in ${data.title} will stays between ${today.min_temp} and ${today.max_temp}`);
    })
    .catch(error => console.log(error))
};
getWeather(2487956);
getWeather(44418);

//Making AJAX call with Async Await and fetch
async function getWeatherAW(woeid){
    try{
        const result = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`);
        const data = await result.json();
        const tomorrow = data.consolidated_weather[1];
        console.log(`Temperatures tomorrow in ${data.title} will stays between ${tomorrow.min_temp} and ${tomorrow.max_temp}`);
        return data;
    }catch(error){
        console.log(error)
    } 
}
getWeatherAW(2487956);
// getting data from async await call
let dataLondon;
getWeatherAW(44418).then(data => {
    dataLondon = data;
    console.log(dataLondon);
});

