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

//Connection mysql
var connexion = function () {
    return mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "cloudico"
    });
}

/* ROAD TO ASSETS DIRECTORY */
app.use(session({ secret: 'this-is-a-secret-token', cookie: { maxAge: 14 * 24 * 3600000 }}))

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
    var user = null
    if (req.session.someAttribute != undefined) {
        user = req.session.someAttribute
    }
    res.render('index.twig', {
        user: user
    })
})
app.get('/cloud-words', function (req, res) {
    var user = null
    if (req.session.someAttribute != undefined) {
        user = req.session.someAttribute
    }
    res.render('cloud_words.twig',{
        user: user
    });
})
app.get('/search', function (req, res) {
    var user = null
    if (req.session.someAttribute != undefined) {
        user = req.session.someAttribute
    }
    var co = connexion()
    co.connect()
    co.query("SELECT * FROM `word` WHERE name LIKE '"+ req.query.q +"%'", function (error, results, fields) {
        if (error) return console.log(error)
        if (results.length > 0){
            var words = results
            res.render('search.twig', {
                user: user,
                words: words
            });
        }else{
            res.render('search.twig', {
                user: user,
                error: 'Aucun résultat'
            });
        }
    })
})
app.get('/definition', function (req, res) {
    var user = null
    if (req.session.someAttribute != undefined) {
        user = req.session.someAttribute
    }
    console.log(req.query.q)
    var co = connexion()
    co.connect()
    co.query("SELECT * FROM `word` WHERE id = "+ req.query.q, function (error, results, fields) {
        if (error) return console.log(error)
        if (results.length > 0){
            console.log('toto')
            var word = results[0]
            res.render('definition.twig', {
                user: user,
                word: word
            });
        }else{
            res.redirect('/');
        }
    })
})
app.get('/profile', function (req, res) {
    var user = null
    if (req.session.someAttribute != undefined) {
        user = req.session.someAttribute
    }
    res.render('profile.twig', {
        user: user
    });
})
app.get('/community', function (req, res) {
    var user = null
    if (req.session.someAttribute != undefined) {
        user = req.session.someAttribute
    }
    res.render('community.twig', {
        user: user
    });
})
app.get('/add-word', function (req, res) {
    var user = null
    if (req.session.someAttribute != undefined) {
        user = req.session.someAttribute
    }
    res.render('add_word.twig', {
        user: user
    });
})
app.get('/cloud-talk', function (req, res) {
    var user = null
    if (req.session.someAttribute != undefined) {
        user = req.session.someAttribute
    }
    res.render('cloud_talk.twig', {
        user: user
    });
})
app.get('/demandes-add', function (req, res) {
    var user = null
    if (req.session.someAttribute != undefined) {
        user = req.session.someAttribute
    }
    res.render('demandes_add.twig', {
        user: user
    });
})
app.get('/demandes-modify', function (req, res) {
    var user = null
    if (req.session.someAttribute != undefined) {
        user = req.session.someAttribute
    }
    res.render('demandes_modify.twig', {
        user: user
    });
})
app.get('/demandes-delete', function (req, res) {
    var user = null
    if (req.session.someAttribute != undefined) {
        user = req.session.someAttribute
    }
    res.render('demandes_delete.twig', {
        user: user
    });
})
app.get('/vald-word', function (req, res) {
    var user = null
    if (req.session.someAttribute != undefined) {
        user = req.session.someAttribute
    }
    res.render('vald_word.twig', {
        user: user
    });
})
app.get('/vald-modification', function (req, res) {
    var user = null
    if (req.session.someAttribute != undefined) {
        user = req.session.someAttribute
    }
    res.render('vald_modification.twig', {
        user: user
    });
})
app.get('/vald-delete', function (req, res) {
    var user = null
    if (req.session.someAttribute != undefined) {
        user = req.session.someAttribute
    }
    res.render('vald_delete.twig', {
        user: user
    });
})

app.post('/register', function (req, res) {
    var co = connexion()
    co.connect()
    co.query("INSERT INTO user (name, email, password) VALUES ('" + req.body.name + "','" + req.body.email + "','" + bcrypt.hashSync(req.body.password, 10) + "')" , function (error, results, fields){
        if (error){
            return console.log('error in server ', error)
        }
        res.send({msg: 'ok'})
    })
})
app.post('/login', function (req, res) {
    var co = connexion();
    co.connect();
    co.query("select * from user where email like '" + req.body.email + "';", function (error, results, fields) {
        if (error) return console.log(error);
        if (results.length > 0) {
            bcrypt.compare(req.body.password, results[0].password).then(function (password) {
                if (password === true) {
                    var sessData = req.session;
                    sessData.someAttribute = results[0].id;
                    res.send({msg:'connected'})
                } else {
                    res.render('index.twig', {checkPassword: password})
                }
            })
        } else {
            res.render('index.twig')
        }
    })
})


server.listen(port);
console.log("application live on port " + port);