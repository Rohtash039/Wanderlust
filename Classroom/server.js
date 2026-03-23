const express = require('express');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.listen(3000, () =>{
    console.log('server is listening the port 3000');
})

app.use(session({secret: 'mysecretcode', resave: false, saveUninitialized: true}));
app.use(flash());

app.get('/reqcount', (req, res)=> {
    if(req.session.count) req.session.count++;
    else req.session.count = 1;
    res.send(`session is loaded by ${req.session.count} times`);
})


app.get('/test', (req, res) => {
    res.send('test successfully');
})

app.get('/register', (req, res) =>{
    let {name = 'anonymous'} = req.query;
    req.session.name = name;
    if(name==='anonymous') req.flash('error', 'user not registerd');
    else req.flash('success', 'user registerd successfully!');
    res.redirect('/hello');
})

app.get('/hello', (req, res) =>{
    res.locals.successMsg = req.flash('success');
    res.locals.errorMsg = req.flash('error');
    res.render('page.ejs', {name: req.session.name});
})


