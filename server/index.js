require('dotenv').config();

const cors = require('cors');
const express = require('express');

const { sequelize } = require('./models');


const server = express();


server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());

/**
 * WebApp Routes
 */
server.use('/', require('./routes'));

/**
 * API Endpoints
 */
server.use('/api', require('./routes/api'));


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
