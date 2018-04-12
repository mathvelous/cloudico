const express =     require('express');
const bodyParser =  require('body-parser')
const mysql =       require('mysql')
const Twig =        require('twig')
const bcrypt =      require('bcrypt')
const session =     require('express-session')
const app =         express();

/* CREATION DU SERVER */
const server = require('http').createServer(app);

/* variable globales */
var port = 1337;

/* ROAD TO ASSETS DIRECTORY */
app.use(session({ secret: 'this-is-a-secret-token'}));

app.use('/css', express.static('assets/css'));
app.use('/js', express.static('assets/js'));
app.use('/images', express.static('assets/images'));
app.use('/fonts', express.static('assets/fonts'));

//config bodyParser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.set('views',  __dirname + '/views')

//Routes
app.get('/', function (req, res) {
    res.render('index.twig');
})
app.get('/cloud-words', function (req, res) {
    res.render('cloud_words.twig');
})
app.get('/search', function (req, res) {
    res.render('search.twig');
})
app.get('/definition', function (req, res) {
    res.render('definition.twig');
})
app.get('/profile', function (req, res) {
    res.render('profile.twig');
})
app.get('/community', function (req, res) {
    res.render('community.twig');
})
app.get('/add-word', function (req, res) {
    res.render('add_word.twig');
})
app.get('/cloud-talk', function (req, res) {
    res.render('cloud_talk.twig');
})
app.get('/demandes-add', function (req, res) {
    res.render('demandes_add.twig');
})
app.get('/demandes-modify', function (req, res) {
    res.render('demandes_modify.twig');
})
app.get('/demandes-delete', function (req, res) {
    res.render('demandes_delete.twig');
})
app.get('/vald-word', function (req, res) {
    res.render('vald_word.twig');
})
app.get('/vald-modification', function (req, res) {
    res.render('vald_modification.twig');
})
app.get('/vald-delete', function (req, res) {
    res.render('vald_delete.twig');
})


server.listen(port);
console.log("application live on port " + port);