// imports
import express from 'express'
import fetchJson from './helpers/fetch-json.js'

// variabelen
const app = express();

// opzet project
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.set('port', process.env.PORT || 8009)

app.listen(app.get('port'), function () {
 console.log(`Application started on http://localhost:${app.get('port')}`)
})

// GET route naar index pagina