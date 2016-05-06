/**
 * Created by Milan on 6.5.2016.
 */
/**
 * Created by Milan on 25.4.2016.
 */

var xAxis = document.xAxisForm.xAxis;
var yAxis = document.yAxisForm.yAxis;
var prev = null;
for(var i = 0; i < xAxis.length; i++) {
    xAxis[i].onclick = function() {
        (prev)? console.log(prev.value):null;
        if(this !== prev) {
            prev = this;
        }
        console.log(this.value)
    };
}


function loadChart() {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET","http://localhost:8080/graphData/" + "0/" + "1", true);
    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4 && xmlhttp.status==200){
            string=xmlhttp.responseText;
            console.log(string);
        }
    }
    xmlhttp.send();


    /*
    // Load the Visualization API and the corechart package.
    google.charts.load('current', {'packages':['corechart']});

    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(drawChart);

    // Callback that creates and populates a data table,
    // instantiates the pie chart, passes in the data and
    // draws it.
    function drawChart() {

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows([
            ['Mushrooms', 3],
            ['Onions', 1],
            ['Olives', 1],
            ['Zucchini', 1],
            ['Pepperoni', 2]
        ]);

        // Set chart options
        var options = {'title':'How Much Pizza I Ate Last Night',
            'width':400,
            'height':300};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart'));
        chart.draw(data, options);
    }
    */
}