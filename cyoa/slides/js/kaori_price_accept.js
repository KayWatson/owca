﻿


if (!String.prototype.supplant) {
    String.prototype.supplant = function (o) {
        return this.replace(
            /\{([^{}]*)\}/g,
            function (a, b) {
                var r = o[b];
                return typeof r === 'string' || typeof r === 'number' ? r : a;
            }
        );
    };
}


function LoadSvg(svg, url) {
    var d = $.Deferred();

    svg.load(url, function () {
        d.resolve();
    });

    return d.promise();
}


Slides.kaori_price_nuclear = new Slide();


Slides.kaori_price_nuclear.Load = function () {

    var d = $.Deferred();

    $("#svgcontainer").svg(function (svg) {

        Slides.kaori_price_nuclear.svg = svg;

        var svgsToLoad = [];

        svgsToLoad.push(LoadSvg(svg, "/slides/resources/price_person.svg"));
        svgsToLoad.push(LoadSvg(svg, "/slides/resources/price_smoke.svg"));

        $.when.apply($, svgsToLoad).done(function () {
            d.resolve();
        });
    });

    return d.promise();
};

Slides.kaori_price_nuclear.Unload = function () {
};

Slides.kaori_price_nuclear.Show = function () {

    var smokey = $("g#smoke");

    var smokeyPromises = [];

    for (var i = 0; i < 100; i++) {

        var c = smokey.clone();

        c.attr("opacity", "1");
        c.attr("transform", "translate(310,230)");

        c.appendTo($("svg"));

        var rX = (Math.random() * 620);
        var rY = (Math.random() * 460);

        var transform = "translate({x},{y}) rotate({r}) scale({sX},{sY})".supplant({ x: rX, y: rY, r: 360 * Math.random(), sX: 1, sY: 1 });


        var promise = c.animate({ svgTransform: transform, svgOpacity: "0" }, 1000 * ((Math.random() * 5) + 2)).promise();

        smokeyPromises.push(promise);
    }


    Slides.kaori_price_nuclear.svg.remove($("g#smoke")[0]);

    $.when.apply($, smokeyPromises).then(function () {
        var missile = $("g#missile01");

        for (var i = 0; i < 1000; i++) {
            var c = missile.clone();

            var start = "translate({x},{y}) rotate(45)".supplant({ x: 400 + Math.random() * 800, y: 400 + Math.random() * 400 });

            c.attr("transform", start);

            c.appendTo($("svg"));

            c.animate({ svgTransform: "translate({x},{y}) rotate({r})".supplant({ x: -500 + Math.random() * 400, y: -500 + Math.random() * 400, r: 25 + Math.random() * 40 }) }, 3000 + (Math.random() * 6000));
        }
        Slides.kaori_price_nuclear.svg.remove($("g#missile01")[0]);

    });

};

Slides.kaori_price_nuclear.Hide = function () {
    return $("figure").fadeOut().promise();
};

