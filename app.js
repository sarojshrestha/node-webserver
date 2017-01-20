const express = require('express');
const hbs = require('hbs');
const app=express();
const fs = require('fs');

const port = process.env.port | 3000;

app.set('view engine','hbs');
hbs.registerPartials(__dirname + '/views/partial')
app.use(express.static(__dirname+'/views'));
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear()
});

hbs.registerHelper('fullName', (person)=>{
    return person.firstName + ' ' + person.lastName;
});

app.use((req, res, next)=>{
var url = `${new Date().toString()} : ${req.path} ${req.method}`;
fs.appendFile('server.log',url + '\n',(err)=>{
    if(err) throw err;
});
console.log(url)

next();
});

app.get('/', (req, res)=>{
    res.render('index.hbs',{
        page:'Top page',
        author:{
            firstName: 'Saroj',lastName:'Shrestha'
        },
        body:'I Love handlebars',
        comments:[
        {
            author:{firstName:'AAA',lastName:'BBB'},
            body:'Me too'
        }
        ]

    });
})

app.listen(port, ()=>{
    console.log('Server Started')
})