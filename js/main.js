function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var n = 20;
var data = d3.range(n);

var width = 600;
var height = 180;

var x = d3.scale.linear()
    .domain([1, n - 2])
    .range([0, width]);

var y = d3.scale.linear()
    .domain([0, 100])
    .range([height, 0]);

var line = d3.svg.area()
    .interpolate("basis")
    .x(function (d, i) {
        return x(i);
    })
    .y0(height)
    .y1(function (d, i) {
        return y(d);
    });

var svg = d3.select(".content-wrapper").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + 20 + ")");

var path = svg.append("g")
    .attr("clip-path", "url(#clip)")
    .append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", line);

tick();

function tick() {
    var randomInt = getRandomInt(10, 90);
    data.push(randomInt);
    path
        .attr("d", line)
        .attr("transform", null)
        .transition()
        .duration(500)
        .ease("linear")
        .attr("transform", "translate(" + x(0) + ",0)")
        .each("end", tick);
    data.shift();
}
