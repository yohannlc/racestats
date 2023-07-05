

function stringTimeToSeconds(timeString) {
    console.log(timeString);
    let parts = timeString.split(':');
    let h = parseInt(parts[0]);
    let m = parseInt(parts[1]);
    let s = parseInt(parts[2]);
  
    let timeInSecond = h * 3600 + m * 60 + s;
    return timeInSecond;
}

let i = 0;
let j = 0;

var reg = /^\d+$/;

var convertedTimes = [];
var averages = {};

for (i = 0; i < times.length; i++) {
    let current_num = "";
    let totalSeconds = 0;
    let count = 0;

    for (let j = 0; j < times[i].length; j++) {
        if (reg.test(times[i][j])) {
            current_num = times[i][j];
        } else {
            let timeInSeconds = stringTimeToSeconds(times[i][j]);
            if (timeInSeconds > 0) {
                totalSeconds += timeInSeconds;
                count++;
            }
        }
    }
  
    if (count > 0) {
        let averageSeconds = totalSeconds / count;
        averages[current_num] = {
            num: current_num,
            averageSeconds: averageSeconds
        };
    }
}

var averageTimes = Object.values(averages);

// Sort the average times in ascending order
averageTimes.sort(function(a, b) {
    return a.averageSeconds - b.averageSeconds;
});

convertedTimes.sort(function(a, b) {
    return a.timeInSeconds - b.timeInSeconds;
});

// console.log("Classement des meilleurs temps :");
// for (let i = 0; i < convertedTimes.length; i++) {
//     console.log((i + 1) + ". " + convertedTimes[i].num + " / " + convertedTimes[i].timeString);
// }

function secondsToTimeString(seconds) {
    let h = Math.floor(seconds / 3600);
    let m = Math.floor((seconds % 3600) / 60);
    let s = seconds % 60;

    let timeString = `${padZero(h)}:${padZero(m)}:${padZero(s)}`;
    return timeString;
}

function padZero(num) {
    return num.toString().padStart(2, '0');
}

// ...

console.log("Classement des moyennes des temps :");
for (let i = 0; i < averageTimes.length; i++) {
    let averageSeconds = averageTimes[i].averageSeconds;
    let averageTimeString = secondsToTimeString(averageSeconds);

    console.log((i + 1) + ". " + averageTimes[i].num + " / " + averageTimeString);
}
