'use strict';
var correct = false;
var currentState = "10";
var tablicaZdan;
var input = "";
var currentStates = [];
var out = "";
var tab = [
    ["11", "-", "-", "-", "-", "-", "-", "-", "-", "-"], //q0
    ["-", "11", "-", "-", "-", "-", "-", "-", "-", "-"], //q1
    ["-", "-", "11", "-", "-", "-", "-", "-", "-", "-"], //q2
    ["-", "-", "-", "11", "-", "-", "-", "-", "-", "-"], //q3
    ["-", "-", "-", "-", "11", "-", "-", "-", "-", "-"], //q4
    ["-", "-", "-", "-", "-", "11", "-", "-", "-", "-"], //q5
    ["-", "-", "-", "-", "-", "-", "11", "-", "-", "-"], //q6
    ["-", "-", "-", "-", "-", "-", "-", "11", "-", "-"], //q7
    ["-", "-", "-", "-", "-", "-", "-", "-", "11", "-"], //q8
    ["-", "-", "-", "-", "-", "-", "-", "-", "-", "11"], //q9
    ["10,0", "10,1", "10,2", "10,3", "10,4", "10,5", "10,6", "10,7", "10,8", "10,9"], //q10 - poczatkowy
    ["11", "11", "11", "11", "11", "11", "11", "11", "11", "11"] //q11 - akteptacyjny
];

var span = document.createElement('span');


function handleFileSelect(evt) {
    var files = evt.target.files;
    for (var i = 0, f; f = files[i]; i++) {
        var reader = new FileReader();
        reader.onload = ((theFile) => {
            return (e) => {
                var result = e.target.result;
                span.innerHTML += '<p>' + 'Snput file: ' + result + '</p>';

                result = result.split('#');
                span.innerHTML += '<p>' + 'Splited: ' + result + '</p>';

                check(result);

                span.innerHTML += '<p>' + out + '</p>';

                document.getElementById('list').insertBefore(span, null);
            };
        })(f);
        reader.readAsText(f);
    }
}


function check(series) {
    for (var s = 0; s < series.length; s++) { // sprawdzenie serii
        if (!isNaN(parseInt(series[s]))) {
            out += '<p>' + 'Checked: ' + series[s];
            console.log('Read series: ' + series[s]);

            var znalezionoPowtorzenie = false;
            currentStates = [];
            currentStates.push(10);

            for (var c in series[s].trim()) { // sprawdzenie znaku
                console.log('Read number: ' + series[s][c]);
                var tmpcurrentStates = currentStates;
                currentStates = [];
                for (var l in tmpcurrentStates) { // sprawdzenie stanow
                    console.log("Current state: " + tmpcurrentStates);
                    console.log(parseInt(tmpcurrentStates[l]) + ' ' + series[s][c]);

                    if (tab[parseInt(tmpcurrentStates[l])][series[s][c]] != "-") {
                        var b = tab[parseInt(tmpcurrentStates[l])][series[s][c]].split(',').map(Number);
                        console.log("TEST " + b);
                        for (var m in b) {
                            currentStates.push(b[m]);
                        }
                    }
                    if (tmpcurrentStates[l] == 11) {
                        znalezionoPowtorzenie = true;
                    }
                    currentStates.push(10);
                }
            }

            if (znalezionoPowtorzenie) {
                out += ' with repetition' + '</p>';
            } else {
                out += ' without repetition' + '</p>';

            }
        }
    }
}
span.innerHTML += '<p>' + out + '</p>';
document.getElementById('files').addEventListener('change', handleFileSelect, false);
