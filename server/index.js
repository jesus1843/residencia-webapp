require('dotenv').config();

const express = require('express');


const server = express();


server.listen(
    +process.env.PORT,
    () => {
        console.log('Server running in PORT:', process.env.PORT);
    }
);
