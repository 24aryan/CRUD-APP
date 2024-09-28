
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const connection = require('./config/db'); 
const userRoutes = require('./routes/userRoutes'); 

const app = express();
 

// Middleware
app.use(express.urlencoded({ extended: true })); 
app.use(bodyParser.json()); 
app.set('view engine', 'ejs'); 


app.use('/users', userRoutes); 

app.get('/', (req, res) => {
    res.redirect('/users'); 
});


const PORT =  3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); 
});
