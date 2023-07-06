function stringTimeToSeconds(timeString) {
    let parts = timeString.split(':');
    let h = parseInt(parts[0]);
    let m = parseInt(parts[1]);
    let s = parseInt(parts[2]);

    let timeInSecond = h * 3600 + m * 60 + s;
    return timeInSecond;
}

function secondsToTimeString(seconds) {
    let h = Math.floor(seconds / 3600);
    let m = Math.floor((seconds % 3600) / 60);
    let s = seconds % 60;

    //arrondir les secondes à l'unité
    s = Math.round(s);
    if (s === 60) {
        m += 1;
        s = 0;
    }
    

    let timeString = `${padZero(h)}:${padZero(m)}:${padZero(s)}`;
    return timeString;
}

function padZero(num) {
    return num.toString().padStart(2, '0');
}

function doStats() {
    let i = 0;
    let j = 0;
    
    var reg = /^\d+$/; // reg pour vérifier si c'est un numéro
    
    var laps = {};
    
    for (i = 0; i < times.length; i++) {    // pour chaque ligne, donc chaque coureur
        let currentNum = "";                // numéro du coureur en cours, pour l'instant vide
        let totalInSeconds = 0;             // temps total, cumule de tous les tours
        let count = 0;                      // nombre de tours
    
        for (let j = 0; j < times[i].length; j++) {     // pour chaque colonne, donc chaque tour de chaque coureur
            if (reg.test(times[i][j])) {                // si c'est un numéro
                currentNum = times[i][j];               // on le stocke dans current_num
            } else {                                    // sinon, c'est les éléments suivants, des temps au tour
    
                // on additionne les temps au tour pour le temps moyen
                let timeInSeconds = stringTimeToSeconds(times[i][j]);   // on convertit le temps qu'on a en secondes
                if (timeInSeconds > 0) {                                // si le temps est n'est pas nul
                    totalInSeconds += timeInSeconds;                    // on l'ajoute au temps total
                    count++;                                            // on incrémente le nombre de tours
                }
    
                // on stocke le meilleur temps
                if (timeInSeconds > 0 && (laps[currentNum] == undefined || timeInSeconds < laps[currentNum].bestLapInSeconds)) {
                    laps[currentNum] = {
                        num: currentNum,
                        bestLapInSeconds: timeInSeconds,
                        bestLapInString: times[i][j],
                        lapNumber: j,             // j- par de 0, donc on peut garder j
                        averageLapInSeconds: 0,
                        averageLapInString: "",
                        lapCount: 0
                    };
                }
            }
        }
    
        if (count > 0) {
            let averageInSeconds = totalInSeconds / count
            laps[currentNum] = {
                num: currentNum,
                bestLapInSeconds: laps[currentNum].bestLapInSeconds,
                bestLapInString: laps[currentNum].bestLapInString,
                lapNumber: laps[currentNum].lapNumber,
                averageLapInSeconds: averageInSeconds,
                averageLapInString: secondsToTimeString(averageInSeconds),
                lapCount: count
            };
        }
    }
    
    var lap = Object.values(laps);
    return lap;
}

function sortByAverageLap(a, b) {
    lap.sort(function(a, b) {
        return a.averageLapInSeconds - b.averageLapInSeconds;
    });
}

function sortByBestLap(a, b) {
    lap.sort(function(a, b) {
        return a.bestLapInSeconds - b.bestLapInSeconds;
    });
}

function addTimesToHTMLTable() {
    // récupérer le tableau HTML
    let table = document.getElementById("table");

    // Réinitialiser toutes les lignes, sauf la première
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    // pour chaque courreur, on ajoute une ligne au tableau
    for (let i = 0; i < lap.length; i++) {
        // créer une nouvelle ligne, avec <tr>
        let row = table.insertRow();
        // créer une nouvelle cellule, avec <td>
        let cell = row.insertCell();
        cell.innerHTML = i+1 + ".";
        // ajouter le numéro du coureur dans la première cellule
        cell = row.insertCell();
        cell.innerHTML = lap[i].num;
        // ajouter le meileur temps dans la deuxième cellule
        cell = row.insertCell();
        cell.innerHTML = lap[i].bestLapInString;
        // ajouter le numéro du meilleur tour dans la troisième cellule
        cell = row.insertCell();
        cell.innerHTML = lap[i].lapNumber;
        // ajouter le temps moyen dans la quatrième cellule
        cell = row.insertCell();
        cell.innerHTML = lap[i].averageLapInString;
        // ajouter le nombre de tours dans la cinquième cellule
        cell = row.insertCell();
        cell.innerHTML = lap[i].lapCount;

        // ajouter la ligne au tableau
        table.appendChild(row);
    }
}

function consoleLogBestLaps () {
    console.log("Classement des meilleurs temps :");
    for (let i = 0; i < bestLap.length; i++) {
        console.log((i + 1) + ". " + bestLap[i].num + " / " + bestLap[i].bestLapInString);
    }
}


function consoleLogAverageLaps () {
    console.log("Classement des temps moyens :");
    for (let i = 0; i < averageLap.length; i++) {
        console.log((i + 1) + ". " + averageLap[i].num + " / " + averageLap[i].averageLapInString);
    }
}

function changeSortBy(current_div) {
    changeLegend(current_div);

    if (current_div == averageLap) {
        sortByAverageLap();
    } else {
        sortByBestLap();
    }

    addTimesToHTMLTable();
}

function changeLegend(div) {
    // Supprimer la classe "selected" de tous les éléments <th>
    const thElements = document.querySelectorAll('th');
    thElements.forEach(function(th) {
        th.classList.remove('selected');
    });

    // Ajouter la classe "selected" à la div sur laquelle vous avez cliqué
    div.classList.add('selected');
}


let lap = doStats();
sortByBestLap();
addTimesToHTMLTable();