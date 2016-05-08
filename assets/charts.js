/**
 * Created by Milan on 6.5.2016.
 */
/**
 * Created by Milan on 25.4.2016.
 */
google.charts.load('current', {'packages': ['corechart']});



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

function drawChart(result) {
    var joinedArr = [];
    joinedArr[0] = ['', ''];
    for (var i = 0; i < result.xAxis.values.length; i ++) {
        joinedArr[i+1] = [result.xAxis.values[i], result.yAxis.values[i]];
    }
    var data = google.visualization.arrayToDataTable(joinedArr);
    var options = {
        title: 'Line Chart',
        curveType: 'function',
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
    var chart = new google.visualization.LineChart(document.getElementById('chart'));
    chart.draw(data, options);
}

function loadChart() {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET","http://localhost:8080/graphData/" + xAxis.value + "/" + yAxis.value, true);
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            result = xmlhttp.responseText;
            drawChart(JSON.parse(result));
        }
    }
    xmlhttp.send();
}