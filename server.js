//console.log('Hier komt je server voor Sprint 12.')

// opzetten van de webserver 

// Importeer het npm pakket express uit de node_modules map
import express from 'express'
// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from './helpers/fetch-json.js'
// Stel het basis endpoint in
const apiUrl = 'https://fdnd-agency.directus.app/items/'
// Maak een nieuwe express app aan
const app = express()
// Stel ejs in als template engine
app.set('view engine', 'ejs')
// Stel de map met ejs templates in
app.set('views', './views')
// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static('public'))
// Zorg dat werken met request data makkelijker wordt 
app.use(express.urlencoded({extended: true}))


// Maak een GET route voor de index (index.ejs)
app.get('/', function(request, response) {
    // Haal gegevens van alle endpoints uit de directus API op
    Promise.all([
        fetchJson(apiUrl + 'plus_box'),
        fetchJson(apiUrl + 'plus_recipes')
    ]).then(([boxData, recipeData]) => {
        // console.log(recipeData)

        // Render index.ejs uit de views map en geef de opgehaalde data mee als variabele
        response.render('index', {
            box: boxData.data,
            recipes: recipeData.data
        })
    })
})

// Maak een GET route voor de detailpagina (recipe.ejs)
app.get('/recipe/:id', function(request, response) {
    // const recipeId = request.params.id
    // Haal gegevens van alle endpoints uit de directus API op
    Promise.all([
        fetchJson(apiUrl + 'plus_recipes/' + request.params.id),
        fetchJson(apiUrl + 'plus_ingredients')
    ]).then(([recipeData, ingredientData]) => {
        console.log(recipeData)
        // console.log(ingredientData)

        // Render recipe.ejs uit de views map en geef de opgehaalde data mee als variabele
        response.render('recipe', {
            recipe: recipeData.data,
            ingredients: ingredientData.data
        })
    })
})

// maak een POST route voor de detailpagina (recipe.ejs)


// start de webserver

// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8000)
// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
    // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})

// // Import the required modules
// import express from 'express'
// import fetchJson from './helpers/fetch-json.js'

// // Create a new Express application
// const app = express()

// // Set the base URL for the API
// const apiUrl = 'https://fdnd-agency.directus.app/items/'

// // Set up the Express application
// app.set('view engine', 'ejs')
// app.set('views', './views')
// app.use(express.static('public'))
// app.use(express.urlencoded({extended: true}))

// // Define the GET route for the index page
// app.get('/', function(request, response) {
//     Promise.all([
//         fetchJson(apiUrl + 'plus_box'),
//         fetchJson(apiUrl + 'plus_recipes')
//     ]).then(([mealsData, recipeData]) => {
//         response.render('index', {
//             box: mealsData.data,
//             recipes: recipeData.data,
//             ingredients: recipeData.data.ingredients

//             })
//             })
//             })
            
//             // Define the GET route for the recipe detail page
//             app.get('/recipe/:id', function(request, response) {
//                 Promise.all([
//                     fetchJson(apiUrl + 'plus_recipes/' + request.params.id),
//                     fetchJson(apiUrl + 'plus_ingredients')
//                     ]).then(([recipeData, ingredientData]) => {
//         console.log(recipeData)
//         response.render('recipe', {
//             recipes: recipeData.data,
//             ingredients: ingredientData.data
//         })
//     })
// })

// // Set the port for the application
// app.set('port', process.env.PORT || 8000)

// // Start the application
// app.listen(app.get('port'), function () {
//     console.log(`Application started on http://localhost:${app.get('port')}`)
// })