const express = require('express')
const app = express()
const cors = require('cors')
const Routes = require('./Routes/allRouter');
const Connect = require('./utils/db');


app.use(cors());

app.use(express.json());

app.use(cors());

app.use('/', Routes)

const PORT = process.env.PORT || 3000;

Connect().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})

module.exports = app;