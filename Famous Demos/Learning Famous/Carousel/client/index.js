
var FamousEngine = require('famous/core/FamousEngine');

FamousEngine.init();

// App Code
var Carousel = require('./Carousel');
var imageData = require('./data');
var carousel = new Carousel('body', { pageData: imageData });