function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

$(function () {
    var n = 20,
        random = d3.random.normal(0, .2),
        data = d3.range(n);

    var margin = {top: 5, right: 0, bottom: 10, left: 40},
        width = 600 ,
        height = 180 ;

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
        .y(function (d, i) {
            return y(d);
        });

    var svg = d3.select(".content-wrapper").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("defs").append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", width)
        .attr("height", height);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + y(0) + ")")
        .call(d3.svg.axis().scale(x).orient("bottom"));

    svg.append("g")
        .attr("class", "y axis")
        .call(d3.svg.axis().scale(y).orient("left"));

    var path = svg.append("g")
        .attr("clip-path", "url(#clip)")
        .append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line);

    tick();

    function tick() {
        var randomInt = getRandomInt(10, 50);
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
});