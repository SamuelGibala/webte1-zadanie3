labelArray = [];
gradesArray = new Array(7);
cakeLabels = ["A","B","C","D","E","FX","FN"];
let currentWidth = screen.width;

for (let i = 0; i < 7; i++) {
    gradesArray[i] = new Array(0);
}


function loadXMLDoc() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            myFunction(xhttp);
            plotFirst();
            plotCakeYear(0,'pieGraph1');
            plotCakeYear(1,'pieGraph2');
            plotCakeYear(2,'pieGraph3');
            plotCakeYear(3,'pieGraph4');
            plotCakeYear(4,'pieGraph5');
            plotCakeYear(5,'pieGraph6');
            plotLineData('diffGraph');
        }
    };
    xhttp.open("GET", "./xml/grades.xml", true);
    xhttp.send();
}

function myFunction(xml) {
    const xmlDoc = xml.responseXML;
    const num = xmlDoc.getElementsByTagName("zaznam");
    const label = xmlDoc.getElementsByTagName("rok");
    const Agrade = xmlDoc.getElementsByTagName("A");
    const Bgrade = xmlDoc.getElementsByTagName("B");
    const Cgrade = xmlDoc.getElementsByTagName("C");
    const Dgrade = xmlDoc.getElementsByTagName("D");
    const Egrade = xmlDoc.getElementsByTagName("E");
    const FXgrade = xmlDoc.getElementsByTagName("FX");
    const FNgrade = xmlDoc.getElementsByTagName("FN");


    for (let i = 0; i <num.length; i++) {

        labelArray.push(label[i].childNodes[0].nodeValue);
        gradesArray[0].push(parseInt(Agrade[i].childNodes[0].nodeValue));
        gradesArray[1].push(parseInt(Bgrade[i].childNodes[0].nodeValue));
        gradesArray[2].push(parseInt(Cgrade[i].childNodes[0].nodeValue));
        gradesArray[3].push(parseInt(Dgrade[i].childNodes[0].nodeValue));
        gradesArray[4].push(parseInt(Egrade[i].childNodes[0].nodeValue));
        gradesArray[5].push(parseInt(FXgrade[i].childNodes[0].nodeValue));
        gradesArray[6].push(parseInt(FNgrade[i].childNodes[0].nodeValue));

    }

}


function plotFirst(){
    if (screen.width>320)
        plotVertical();
    else
        plotHorizontal();
}




function plot(){

    if (currentWidth>280 && screen.width<280){
        plotHorizontal();
    }
    if (currentWidth<280 && screen.width>280){
        plotVertical()
    }

}

function plotHorizontal(){

    var layout = {
        barmode: 'group',
        title:'Graf hodnotenia <br> predmetu WEBTE1',
    };
    Plotly.newPlot('barGraph', null, layout)

    var trace1 = {
        y: labelArray,
        x: gradesArray[0],
        name: 'A',
        type: 'bar',
        orientation: 'h'
    };

    var trace2 = {
        y: labelArray,
        x: gradesArray[1],
        name: 'B',
        type: 'bar',
        orientation: 'h'
    };

    var trace3 = {
        y: labelArray,
        x: gradesArray[2],
        name: 'C',
        type: 'bar',
        orientation: 'h'
    };

    var trace4 = {
        y: labelArray,
        x: gradesArray[3],
        name: 'D',
        type: 'bar',
        orientation: 'h'
    };

    var trace5 = {
        y: labelArray,
        x: gradesArray[4],
        name: 'E',
        type: 'bar',
        orientation: 'h'
    };

    var trace6 = {
        y: labelArray,
        x: gradesArray[5],
        name: 'FX',
        type: 'bar',
        orientation: 'h'
    };

    var trace7 = {
        y: labelArray,
        x: gradesArray[6],
        name: 'FN',
        type: 'bar',
        orientation: 'h'
    };

    var data = [trace1, trace2,trace3,trace4,trace5, trace6, trace7];
    var config = {responsive: true}

    Plotly.newPlot('barGraph', data, layout,config);
}

function plotVertical(){

    var layout = {
        barmode: 'group',
        title:'Graf hodnotenia <br> predmetu WEBTE1',
    };
    Plotly.newPlot('barGraph', null, layout)

    var trace1 = {
        x: labelArray,
        y: gradesArray[0],
        name: 'A',
        type: 'bar',
        orientation: 'v'
    };

    var trace2 = {
        x: labelArray,
        y: gradesArray[1],
        name: 'B',
        type: 'bar',
        orientation: 'v'
    };

    var trace3 = {
        x: labelArray,
        y: gradesArray[2],
        name: 'C',
        type: 'bar',
        orientation: 'v'
    };

    var trace4 = {
        x: labelArray,
        y: gradesArray[3],
        name: 'D',
        type: 'bar',
        orientation: 'v'
    };

    var trace5 = {
        x: labelArray,
        y: gradesArray[4],
        name: 'E',
        type: 'bar',
        orientation: 'v'
    };

    var trace6 = {
        x: labelArray,
        y: gradesArray[5],
        name: 'FX',
        type: 'bar',
        orientation: 'v'
    };

    var trace7 = {
        x: labelArray,
        y: gradesArray[6],
        name: 'FN',
        type: 'bar',
        orientation: 'v'
    };

    var data = [trace1, trace2,trace3,trace4,trace5, trace6, trace7];
    var config = {responsive: true}

    Plotly.newPlot('barGraph', data, layout,config);
}

function plotCakeYear(year,place){
    let cakearr = Array(7);
    for (let i = 0; i < 7; i++) {
        cakearr[i]= gradesArray[i][year]
    }
    let title = 'Rozloženie známok v <br>' + labelArray[year];
    plotCake(cakearr,cakeLabels,place,title)
}

function plotCake(values, labels, place,title){
    var data = [{
        values: values,
        labels: labels,
        type: 'pie'
    }];


    var layout = {
        margin:{
            autoexpand: true
        },
        autosize:true,
        title: title,
    };

    var config = {responsive: true}

    Plotly.newPlot(place, data, layout,config);

}

function plotLineData(place){
    let dataArr = Array(6);
    for (let i = 0; i < 6; i++) {
        dataArr[i] = 0;
        for (let j = 0; j < 7; j++) {
            dataArr[i]+=gradesArray[j][i];
        }
    }

    plotLine(place,labelArray,dataArr);
}

function plotLine(place,xvals,yvals){

    var trace1 = {
        x: xvals,
        y: yvals,
        name: 'počet žiakov',
        type: 'scatter'
    };


    var data = [trace1];

    var layout = {
        title:'Vývoj počtu <br> žiakov',
        showlegend: true,
        legend: {
            x: 1,
            xanchor: 'right',
            y: 1
        }
    }
    var config = {responsive: true}

    Plotly.newPlot(place, data, layout,config);
}

loadXMLDoc();

window.addEventListener('resize', function() {
    plot();
    currentWidth = screen.width;
}, true);
