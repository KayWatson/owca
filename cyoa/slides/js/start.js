﻿
Slides.start = new Slide();

Slides.start.Load = function () {
    
};

Slides.start.Unload = function() {
 
};

Slides.start.Show = function () {
    return $("figure").fadeIn().promise();
};

Slides.start.Hide = function () {
    return $("figure").fadeOut().promise();
};

