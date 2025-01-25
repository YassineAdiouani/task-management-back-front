const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());

const corsOptions = {
    origin: (origin, callback) => {
        callback(null, true);
    },
    credentials: true,
};

app.use(cors(corsOptions));

require('./src/database/initMongoDB');

const tasks_route = require('./src/routes/tasks.route');

app.use('/api/tasks', tasks_route);

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        }
    });
});

app.listen(3000, () => {
    console.log('Server URL http://localhost:3000');
});
