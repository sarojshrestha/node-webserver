const express = require('express');
const hbs = require('hbs');
const app=express();

app.set('view engine','hbs');
hbs.registerPartials(__dirname + '/views/partial')
app.use(express.static(__dirname+'/views'));
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear()
});

hbs.registerHelper('fullName', (person)=>{
    return person.firstName + ' ' + person.lastName;
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

app.listen(3000, ()=>{
    console.log('Server Started')
})