const express = require('express');
const cors = require('cors');
const post = require('./routes/post.js');
const put = require('./routes/put.js');
const get = require('./routes/get.js');
const delete_ = require('./routes/delete.js');

const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {

    if(req.method == 'POST') {
        app.use('/api/insert/', post);
    } else if (req.method == 'PUT') {
        app.use('/api/update/', put);
    } else if (req.method == 'GET') {
        app.use('/api/get/', get)
    } else if (req.method == 'DELETE') {
        app.use('/api/delete/', delete_);
    }
    next();
});

const port = 3000;
app.listen(port, () => console.log(`A utilizar a porta : ${port}`));
