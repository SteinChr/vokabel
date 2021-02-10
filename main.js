let input = [];
let allVocab = [];
let currentVocab = 0;
let numberOfPreviousVocab = 0;
let correctVocab = 0;
let correct = true;
let totalVocab = 0;
let controlLanguage = 1;
let vocabLanguage = 1;

document.getElementById("userInput").value = '';

//load vocab
fetch('vokabel.txt')
    .then(response => response.text())
    .then((data) => {
        input = data.split('\r\n');
        allVocab = input.map(i => i.split(',,'));
        totalVocab = allVocab.length;
        document.getElementById("points").innerHTML += totalVocab;
        getNewVocab();
    });

//select a new vocab
function getNewVocab() {
    correct = true;
    currentVocab = Math.floor(Math.random() * allVocab.length);
    document.getElementById("deutschesVokabel").innerHTML = allVocab[currentVocab][vocabLanguage];
}

//check the users input
function checkVocab() {
    if (allVocab.length != 0) {
        if (document.getElementById("userInput").value == allVocab[currentVocab][0]) {
            document.getElementById("richtigFalsch").classList.remove("wrong");
            document.getElementById("richtigFalsch").classList.add("correct");
            if (correct == true) {
                correctVocab++;
            }
            numberOfPreviousVocab++;
            if (controlLanguage == 1) {
                document.getElementById("richtigFalsch").innerHTML = "Richtig";
                document.getElementById("points").innerHTML = 'Richtig: ' + correctVocab + '/' + numberOfPreviousVocab + ', Gesamt: ' + totalVocab;
            } else if (controlLanguage == 2) {
                document.getElementById("richtigFalsch").innerHTML = "Correct";
                document.getElementById("points").innerHTML = 'Correct: ' + correctVocab + '/' + numberOfPreviousVocab + ', Total: ' + totalVocab;
            } else if (controlLanguage == 3) {
                document.getElementById("richtigFalsch").innerHTML = "Correcto";
                document.getElementById("points").innerHTML = 'Correcto: ' + correctVocab + '/' + numberOfPreviousVocab + ', Total: ' + totalVocab;
            }
            document.getElementById("userInput").value = '';
            allVocab.splice(currentVocab, 1);

            //check if all vocabs have been studied
            if (allVocab.length == 0) {
                showResult(controlLanguage);
            } else {
                document.getElementById("loesung").innerHTML = '';
                getNewVocab();
            }
        } else {
            if (controlLanguage == 1) {
                document.getElementById("richtigFalsch").innerHTML = "Falsch";
            } else if (controlLanguage == 2) {
                document.getElementById("richtigFalsch").innerHTML = "Wrong";
            } else if (controlLanguage == 3) {
                document.getElementById("richtigFalsch").innerHTML = "Falso";
            }
            document.getElementById("richtigFalsch").classList.remove("correct");
            document.getElementById("richtigFalsch").classList.add("wrong");
            document.getElementById("loesung").innerHTML = allVocab[currentVocab][0];
            correct = false;
        }
    }
}

//show result
function showResult(language) {
    let correctPercent = correctVocab / totalVocab * 100;
    if (correctPercent >= 80) {
        if (language == 1) {
            document.getElementById("loesung").innerHTML = 'Bravo,';
        } else if (language == 2) {
            document.getElementById("loesung").innerHTML = 'Great,';
        } else if (language == 3) {
            document.getElementById("loesung").innerHTML = '¡Bravo,';
        }
        document.getElementById("loesung").classList.add("correct");
    } else if (correctPercent < 80 && correctPercent >= 60) {
        if (language == 1) {
            document.getElementById("loesung").innerHTML = 'Ganz gut,';
        } else if (language == 2) {
            document.getElementById("loesung").innerHTML = 'Pretty good,';
        } else if (language == 3) {
            document.getElementById("loesung").innerHTML = '¡Bien,';
        }
        document.getElementById("loesung").classList.add("middle-good");
    } else if (correctPercent < 60 && correctPercent >= 40) {
        if (language == 1) {
            document.getElementById("loesung").innerHTML = 'Naja,';
        } else if (language == 2) {
            document.getElementById("loesung").innerHTML = 'Well,';
        } else if (language == 3) {
            document.getElementById("loesung").innerHTML = '¡Pues,';
        }
        document.getElementById("loesung").classList.add("middle-bad");
    } else if (correctPercent < 40) {
        if (language == 1) {
            document.getElementById("loesung").innerHTML = 'Diese Vokabel solltest du nocheinmal wiederholen,';
        } else if (language == 2) {
            document.getElementById("loesung").innerHTML = 'You should revise these vocabulary again,';
        } else if (language == 3) {
            document.getElementById("loesung").innerHTML = '¡Tienes que repetir estas vocabularios otra vez,';
        }
        document.getElementById("loesung").classList.add("wrong");
    }

    if (language == 1) {
        document.getElementById("loesung").innerHTML += ' du hattest ' + correctVocab + ' von ' + totalVocab + ' Vokabel richtig! (' + +correctPercent.toFixed(2) + '%)';
    } else if (language == 2) {
        document.getElementById("loesung").innerHTML += ' you had ' + correctVocab + ' of ' + totalVocab + ' vocabulary correct! (' + +correctPercent.toFixed(2) + '%)';
    } else if (language == 3) {
        document.getElementById("loesung").innerHTML += ' tuviste ' + correctVocab + ' de ' + totalVocab + ' vocabulario correcto! (' + +correctPercent.toFixed(2) + '%)';
    }

    document.getElementById("loesung").classList.add("result");

    document.getElementById("points").classList.add("hide");
    document.getElementById("deutschesVokabel").classList.add("hide");
    document.getElementById("userInput").classList.add("hide");
    document.getElementById("button").classList.add("hide");
    document.getElementById("richtigFalsch").classList.add("hide");
}

//react on enter key
document.addEventListener('keyup', k => {
    if (k.keyCode === 13) {
        checkVocab();
    }
});

//change vocabulary language
function changeVocabLanguage(newLanguage) {
    vocabLanguage = newLanguage;
    document.getElementById("deutschesVokabel").innerHTML = allVocab[currentVocab][newLanguage];
    Array.from(document.getElementsByClassName("flaggen")).forEach(
        function (element, index, array) {
            element.classList.remove("flagge-ausgewaehlt-vokabel");
        }
    );
    document.getElementById("flagge-vokabel-" + newLanguage.toString()).classList.add("flagge-ausgewaehlt-vokabel");

}

//change control language
function changeControlLanguage(newLanguage) {
    controlLanguage = newLanguage;
    Array.from(document.getElementsByClassName("flaggen")).forEach(
        function (element, index, array) {
            element.classList.remove("flagge-ausgewaehlt-steuerung");
        }
    );
    document.getElementById("flagge-steuerung-" + newLanguage.toString()).classList.add("flagge-ausgewaehlt-steuerung");

    //change Text
    if (newLanguage == 1) {
        document.getElementById("ueberschrift").innerHTML = "Vokabeltrainer";
        document.getElementById("vokabelName").innerHTML = "Vokabel: Spanisch: Naturaleza y medio ambiente";
        document.getElementById("points").innerHTML = 'Richtig: ' + correctVocab + '/' + numberOfPreviousVocab + ', Gesamt: ' + totalVocab;
        document.getElementById("button").innerHTML = "Überprüfen";
        document.getElementById("flaggen-beschriftung-steuerung").innerHTML = "Steuerung";
        document.getElementById("flaggen-beschriftung-vokabel").innerHTML = "Vokabel";
        document.getElementById("einstellungen").innerHTML = "Einstellungen";
    } else if (newLanguage == 2) {
        document.getElementById("ueberschrift").innerHTML = "Vocabulary Trainer";
        document.getElementById("vokabelName").innerHTML = "Vocabluary: Spanish: Naturaleza y medio ambiente";
        document.getElementById("points").innerHTML = 'Correct: ' + correctVocab + '/' + numberOfPreviousVocab + ', Total: ' + totalVocab;
        document.getElementById("button").innerHTML = "Check";
        document.getElementById("flaggen-beschriftung-steuerung").innerHTML = "Control";
        document.getElementById("flaggen-beschriftung-vokabel").innerHTML = "Vocabluary";
        document.getElementById("einstellungen").innerHTML = "Settings";
    } else if (newLanguage == 3) {
        document.getElementById("ueberschrift").innerHTML = "Entrenador de Vocabulario";
        document.getElementById("vokabelName").innerHTML = "Vocabulario: Español: Naturaleza y medio ambiente";
        document.getElementById("points").innerHTML = 'Correcto: ' + correctVocab + '/' + numberOfPreviousVocab + ', Total: ' + totalVocab;
        document.getElementById("button").innerHTML = "Cheque";
        document.getElementById("flaggen-beschriftung-steuerung").innerHTML = "Navegación";
        document.getElementById("flaggen-beschriftung-vokabel").innerHTML = "Vocabulario";
        document.getElementById("einstellungen").innerHTML = "Ajustes";
    }

    if (document.getElementById("richtigFalsch").innerHTML == "Richtig" ||
        document.getElementById("richtigFalsch").innerHTML == "Correct" ||
        document.getElementById("richtigFalsch").innerHTML == "Correcto") {
        if (newLanguage == 1) {
            document.getElementById("richtigFalsch").innerHTML = "Richtig";
        } else if (newLanguage == 2) {
            document.getElementById("richtigFalsch").innerHTML = "Correct";
        } else if (newLanguage == 3) {
            document.getElementById("richtigFalsch").innerHTML = "Correcto";
        }
    } else if (document.getElementById("richtigFalsch").innerHTML == "Falsch" ||
        document.getElementById("richtigFalsch").innerHTML == "Wrong" ||
        document.getElementById("richtigFalsch").innerHTML == "Falso") {
        if (newLanguage == 1) {
            document.getElementById("richtigFalsch").innerHTML = "Falsch";
        } else if (newLanguage == 2) {
            document.getElementById("richtigFalsch").innerHTML = "Wrong";
        } else if (newLanguage == 3) {
            document.getElementById("richtigFalsch").innerHTML = "Falso";
        }
    }

    if (allVocab.length == 0) {
        showResult(newLanguage);
    }

    //adjust position of settings
    if (newLanguage == 1) {
        document.getElementById("flaggen-div").classList.add("flaggen-div-deutsch");
        document.getElementById("flaggen-div").classList.remove("flaggen-div-englisch");
        document.getElementById("flaggen-div").classList.remove("flaggen-div-spanisch");
    } else if (newLanguage == 2) {
        document.getElementById("flaggen-div").classList.remove("flaggen-div-deutsch");
        document.getElementById("flaggen-div").classList.add("flaggen-div-englisch");
        document.getElementById("flaggen-div").classList.remove("flaggen-div-spanisch");
    } else if (newLanguage == 3) {
        document.getElementById("flaggen-div").classList.remove("flaggen-div-deutsch");
        document.getElementById("flaggen-div").classList.remove("flaggen-div-englisch");
        document.getElementById("flaggen-div").classList.add("flaggen-div-spanisch");
    }
}