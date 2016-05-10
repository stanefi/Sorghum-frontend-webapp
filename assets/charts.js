/**
 * Created by Milan on 6.5.2016.
 */
google.charts.load('current', {'packages': ['corechart']});


// Get html elements and assign them functionalities
var xAxis = document.xAxisForm.xAxis;
var yAxis = document.yAxisForm.yAxis;
for(var i = 0; i < xAxis.length; i++) {
    xAxis[i].onclick = function() {
        loadChart();
    };
}
for(var i = 0; i < yAxis.length; i++) {
    yAxis[i].onclick = function() {
        loadChart();
    };
}

/**
 *
 * @param result Object containing two other objects
 *  each containing an array of data for the x/y axis
 *  and its description to be rendered on the plot
 */
function drawChart(result) {
    // Create a 2d array containing data for each axis
    var joinedArr = [];
    joinedArr[0] = [result.xAxis.name, result.yAxis.name];
    for (var i = 0; i < result.xAxis.values.length; i ++) {
        joinedArr[i+1] = [result.xAxis.values[i], result.yAxis.values[i]];
    }
    var data = google.visualization.arrayToDataTable(joinedArr);

    var options = {
        title: 'Scatter Chart',
        //curveType: 'function', // for line charts
        pointSize: 4,
        legend: 'none',
        width: 500,
        height: 400,
        hAxis: {
            title: result.xAxis.name
        },
        vAxis: {
            title: result.yAxis.name
        }
    };
    document.getElementById('chart').style.visibility = 'hidden';
    var chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}

/**
 * Queries the database using AJAX
 * TODO When deployed change the url
 */
function loadChart() {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET","http://localhost:8080/graphData/" + xAxis.value + "/" + yAxis.value, true);
    // AJAX callback
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            result = xmlhttp.responseText;
            drawChart(JSON.parse(result));
        }
    }
    xmlhttp.send();
}