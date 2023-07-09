const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const port = 3000;

// Where we will keep books
let books = [];

app.use(cors());


//  Configuring body parser middlewaare
// What the body-parser middleware will be doing is grabbing the 
// HTTP body, decoding the information, and appending it to the req.body. From there, we can easily retrieve the information from the form - in our case, a book's information.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());



// Server side
app.post('/book', (req, res) => {
    const book = req.body;

    // Output the book to the console for debugging
    console.log(book);
    books.push(book);

    res.send('Book is added to the database');
});


app.get('/', (req, res) => {
    // res.send("Hello World, from express");
    res.json(books);
});


// Client side
app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))