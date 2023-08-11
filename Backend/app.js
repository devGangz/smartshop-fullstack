// Khai báo thư viện express
const express = require("express");
// Khai báo thư viện Mongoose
const mongoose = require('mongoose');
// Khai báo cho router User; Car
const { productRouter } = require("./app/routes/productRouter");
const { productTypeRouter } = require("./app/routes/productTypeRouter");
const { voucherRouter } = require('./app/routes/voucherRouter')
const { orderRouter } = require('./app/routes/orderOrder')

// Khai báo app
const app = express();
// Khai báo middlerware này để chạy body
app.use(express.json());
// Khai báo port
const port = 8080;

// Kết nối đến MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/CRUD_Shop24H')
    .then(() => console.log('MongDB was Connected!'));


var cors = require('cors')

app.use(cors())

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


// module.exports = function (app) {
//     app.use(
//         '/api',
//         createProxyMiddleware({
//             target: 'http://localhost:8000',
//             changeOrigin: true,
//         })
//     );
// };

// Mapping Router
app.use('/', productRouter)
app.use('/', productTypeRouter)
app.use('/', voucherRouter)
app.use('/', orderRouter)
// Khởi động app 
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})