dataX = [];
dataFun = [];
dataFun[0] = [];
dataFun[1] = [];

outputFun = [];
outputFun[0] = [];
outputFun[1] = [];

graphDiv = document.getElementById('myDiv');
inputSin = document.getElementById('sinus');
inputCos = document.getElementById('cosinus');
amplitude = 1;
stopButton = document.getElementById('stop');

if (typeof (EventSource)!== "undefined"){
    var source = new EventSource("http://old.iolab.sk/evaluation/sse/sse.php");

    source.addEventListener("message",function (e) {
        var data = JSON.parse(e.data);


        if (data.x === 0) {
            dataX.length = 0;
            dataFun[0].length = 0;
            dataFun[1].length = 0;
            dataX[0] = 0;
            dataFun[0][0] = parseFloat(data.y1);
            dataFun[1][0] = parseFloat(data.y2);



        } else {
            dataX.push(parseInt(data.x));
            dataFun[0].push(parseFloat(data.y1));
            dataFun[1].push(parseFloat(data.y2));
        }
        plot();
    })
}

function makeOutput(){

    outputFun[0].length = 0;
    outputFun[1].length = 0;
    for (let i = 0; i < dataFun[0].length; i++) {
       outputFun[0][i] = dataFun[0][i] * amplitude;
       outputFun[1][i] = dataFun[1][i] * amplitude;
    }

}

function plot(){

    makeOutput();
    if(inputSin.checked && inputCos.checked) {
        plotBoth(outputFun);
    }else if(inputSin.checked && !inputCos.checked) {
        plotOne(outputFun,0);
    }else if (!inputSin.checked && inputCos.checked){
        plotOne(outputFun,1);
    }else {
        Plotly.newPlot(graphDiv, null,);
    }
}

function plotBoth(dataFun){


    var trace1 = {
        x: dataX,
        y: dataFun[0],
        type: 'scatter',
        name: 'Sínus'
    };

    var trace2 = {
        x: dataX,
        y: dataFun[1],
        type: 'scatter',
        name: 'Kosínus'
    };

    var layout = {
        title:'Zašumený Sínus a Kosínus '
    }

    var data = [trace1, trace2];

    Plotly.newPlot(graphDiv, data,layout);
}

function plotOne(dataFun,fun){


    var trace1 = {
        x: dataX,
        y: dataFun[fun],
        name: ((fun===0) ? 'Sínus' : 'Kosínus'),
        type: 'scatter'
    };

    var data = [trace1];

    var layout = {
        title:'Zašumený ' + ((fun===0) ? 'Sínus' : 'Kosínus'),
        showlegend: true
    }

    Plotly.newPlot(graphDiv, data,layout);
}


stopButton.addEventListener("click", function (){source.close()})

inputSin.onchange = function (){
    plot()
}

inputCos.onchange = function (){
    plot()
}

function setChartAmplitude(value){
    amplitude = value;
    plot();
}
