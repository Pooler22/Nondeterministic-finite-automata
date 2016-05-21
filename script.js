var correct = false;
var currentState = "10";
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

function handleFileSelect(evt) {
    var files = evt.target.files;
    for (var i = 0, f; f = files[i]; i++) {
        var reader = new FileReader();
        reader.onload = (function(theFile) {
            return function(e) {
                result = e.target.result;
                var span = document.createElement('span');
                span.innerHTML += '<p>' + 'input file: ' + result + '</p>';

                result = result.split('#');
                span.innerHTML += '<p>' + 'splited: ' + result + '</p>';

                result.forEach(check);

                span.innerHTML += '<p>' + out + '</p>';

                document.getElementById('list').insertBefore(span, null);
            };
        })(f);
        reader.readAsText(f);
    }
}

function check(series) {
    series = series.trim();
    for (var j = 0; j < series.length; j++) {
        var needRepeat = goToState(series[j]);
        if (needRepeat) {
            j--;
        }
    }

    if (correct) {
        out += '<p>' + " Repeat in: " + series + '</p>';
        correct = false;
    } else {
        out += '<p>' + " Without repetition in: " + series + '</p>';
    }
    currentState = "10";
    out = '<p>' + out + '</p>';
}

function goToState(series) {
    out += "<li>Current state: " + currentState + ", series: " + series + "-> ";
    switch (currentState) {
        case "10":
            currentState = tab[10][series].split(',')[1];
            break;
        case "11":
            //currentState = tab[11][series];
            correct = true;
            break;
        default:
            if (currentState == series) {
                currentState = tab[series][series];
            } else {
                currentState = tab[10][series].split(',')[0];
                out += ", new state: " + currentState + "</li>";
                return true;
            }
    }
    out += ", new state: " + currentState + "</li>";
    return false;
}

document.getElementById('files').addEventListener('change', handleFileSelect, false);
