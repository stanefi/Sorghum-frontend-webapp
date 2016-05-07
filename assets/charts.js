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
        //console.log(this.value)
        loadChart(xAxis, yAxis);
    };
}
for(var i = 0; i < yAxis.length; i++) {
    yAxis[i].onclick = function() {
        //console.log(this.value)
        loadChart(xAxis, yAxis);
    };
}

function drawChart(result) {
    var joinedArr = [];
    joinedArr[0] = ['One', 'Nothing yet'];
    for (var i = 0; i < result.xAxis.values.length; i ++) {
        joinedArr[i+1] = [result.xAxis.values[i], result.yAxis.values[i]];
    }
    var data = google.visualization.arrayToDataTable(joinedArr);
    var options = {
        title: 'Line Chart',
        curveType: 'function',
        legend: { position: 'bottom' },
        width: 500,
        height: 400
    };
    var chart = new google.visualization.LineChart(document.getElementById('chart'));
    chart.draw(data, options);



    //// Create the data table.
    //var data = new google.visualization.DataTable();
    //data.addColumn('string', 'Topping');
    //data.addColumn('number', 'Slices');
    //data.addRows([
    //    ['Mushrooms', 3],
    //    ['Onions', 1],
    //    ['Olives', 1],
    //    ['Zucchini', 1],
    //    ['Pepperoni', 2]
    //]);
    //
    //// Set chart options
    //var options = {
    //    'title': 'How Much Pizza I Ate Last Night',
    //    'width': 400,
    //    'height': 300
    //};
    //
    //// Instantiate and draw our chart, passing in some options.
    //var chart = new google.visualization.PieChart(document.getElementById('chart'));
    //chart.draw(data, options);
}

function loadChart(xAxis, yAxis) {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET","http://localhost:8080/graphData/" + xAxis.value + "/" + yAxis.value, true);
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            result = xmlhttp.responseText;
            console.log(result);
            drawChart(JSON.parse(result));
            //// Load the Visualization API and the corechart package.
            //google.charts.load('current', {'packages': ['corechart']});
            //
            //// Set a callback to run when the Google Visualization API is loaded.
            //google.charts.setOnLoadCallback(drawChart);
            //
            //// Callback that creates and populates a data table,
            //// instantiates the pie chart, passes in the data and
            //// draws it.

        }
    }
    xmlhttp.send();
}