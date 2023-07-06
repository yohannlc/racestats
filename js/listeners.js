// Sélectionner l'élément avec la classe "average-lap"
const averageLap = document.querySelector('.average-lap');

// Ajouter un gestionnaire d'événement onClick
averageLap.addEventListener('click', function() {
    changeSortBy(averageLap);
});

// Sélectionner l'élément avec les classes "best-lap" et "selected"
const bestLap = document.querySelector('.best-lap.selected');

// Ajouter un gestionnaire d'événement onClick
bestLap.addEventListener('click', function() {
    changeSortBy(bestLap);
});

// Sélectionner l'élément avec les classes "best-lap" et "selected"
const num = document.querySelector('.dossard');

// Ajouter un gestionnaire d'événement onClick
num.addEventListener('click', function() {
    changeSortBy(num);
});
