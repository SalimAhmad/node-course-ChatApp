// we're using path to make it easier to go from one directory to another instead of exiting one then going to another
const path = require('path');
const express = require('express');

// so instead of going into server, then going out of it, then going to public, we go straight to public folder
const publicPath = path.join(__dirname, '../public'); // ...6-ChatApp/public
const port = process.env.PORT || 3000;
var app = express();

app.use(express.static(publicPath));

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})