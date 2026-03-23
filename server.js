//API FRAMEWORK
const express = require('express');
const cors = require('cors');
//ENVIRONMENT VARIABLES
require ('dotenv').config();
//DATABASE CONNECTION
const db=require('./config/db.js');
//ROUTES
const routes = require('./routes/index.js');


//UTILIZATION OF EXPRESS
const app = express();


//MOMENT
const moment = require('moment');
const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')} ${req.originalUrl} - ${moment().format()}` );
    next();
}
app.use(logger);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/api', routes)


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})
