const express = require('express');
const app = express();
const cors = require('cors');

const db = require('./models');
db.sequelize.authenticate().then(() => console.log('Connection has been established successfully.')).catch(error => console.error('Unable to connect to the database:', error));

db.sequelize.sync({force: true}).then(() => {
    require('./seed')(db);
    console.log('Database synchronized.');
})

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

requrire('./routes')(app);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT} at http://localhost:${PORT}`));