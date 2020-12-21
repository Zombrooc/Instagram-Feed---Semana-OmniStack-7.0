const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const likeController = require('./controller/likeController');
const postController = require('./controller/postController');

const routes = express.Router();
const upload = multer(uploadConfig);

routes.post('/posts', upload.single('image'), postController.store);
routes.get('/posts', postController.index);

routes.post('/posts/:id/like', likeController.store);

module.exports = routes;
