require('dotenv').config();

const express = require('express');

const { sequelize } = require('./models');


const server = express();


(async function() {
    try {
        await sequelize.authenticate();

        console.log('Database running...');

        server.listen(
            +process.env.PORT,
            () => {
                console.log('Server running in PORT:', process.env.PORT);
            }
        );
    }
    catch(err) {
        console.log('Error connecting to database. Error:', err)
    }
})();
