// const cloudinary = require('cloudinary').v2;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('../server/config/dbConfig');
const userRoutes = require('./routes/userRoutes');
const productCategoryRoutes = require('./routes/productCategoryRoutes');
const productRoutes = require('./routes/productRoutes');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
const fileUpload= require('express-fileupload')



// app.use(bodyParser.json());
app.use(fileUpload({
  useTempFiles:true
}))
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use('/api/users', userRoutes);
app.use('/api/product-categories', productCategoryRoutes);
app.use('/api/products', productRoutes);


// sequelize.sync({ force: false })
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

