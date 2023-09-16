//----------- DECLARATIONS DES VARIABLES ----------------- //
//Valeurs dés
let dice1Value = 0; let dice2Value = 0; let dice3Value = 0; let dice4Value = 0; let dice5Value = 0;
let dicesValues = [];
//Sélection des dés
let dice1Selected = false; let dice2Selected = false; let dice3Selected = false; let dice4Selected = false; let dice5Selected = false;
let dicesSelected = [dice1Selected, dice2Selected, dice3Selected, dice4Selected, dice5Selected];
//Valeurs des dés séletionnés 
let dice1SelectedValue = 0; let dice2SelectedValue = 0; let dice3SelectedValue = 0; let dice4SelectedValue = 0; let dice5SelectedValue = 0;
let dicesSelectedValues = [];
//Images des dés joués
const dice1ThrowedImg = document.querySelector(".game__field__zone1__dice1 > img");
const dice2ThrowedImg = document.querySelector(".game__field__zone1__dice2 > img");
const dice3ThrowedImg = document.querySelector(".game__field__zone1__dice3 > img");
const dice4ThrowedImg = document.querySelector(".game__field__zone2__dice4 > img");
const dice5ThrowedImg = document.querySelector(".game__field__zone2__dice5 > img");
//Images des dés sélectionnés
const dice1SelectedImg = document.querySelector(".game__selection__zone__dices__dice1 > img");
const dice2SelectedImg = document.querySelector(".game__selection__zone__dices__dice2 > img");
const dice3SelectedImg = document.querySelector(".game__selection__zone__dices__dice3 > img");
const dice4SelectedImg = document.querySelector(".game__selection__zone__dices__dice4 > img");
const dice5SelectedImg = document.querySelector(".game__selection__zone__dices__dice5 > img");
//Players scores
let player1ScoreFill = {Ones:false, Twos:false, Threes:false, Fours:false, Fives:false, Sixes:false, Brelan:false, Smallsuite:false, Bigsuite:false, Full:false, Carre:false, Yam:false};
let player1ScoreValues = {Ones:0, Twos:0, Threes:0, Fours:0, Fives:0, Sixes:0, Brelan:0, Smallsuite:0, Bigsuite:0, Full:0, Carre:0, Yam:0};
let player2ScoreFill = {Ones:false, Twos:false, Threes:false, Fours:false, Fives:false, Sixes:false, Brelan:false, Smallsuite:false, Bigsuite:false, Full:false, Carre:false, Yam:false};
let player2ScoreValues = {Ones:0, Twos:0, Threes:0, Fours:0, Fives:0, Sixes:0, Brelan:0, Smallsuite:0, Bigsuite:0, Full:0, Carre:0, Yam:0};
//Compteurs
let throwNumber = 0;
let player1Turn = true;
//Inputs
let crossInputsPlayer1 = document.querySelectorAll("[class*='checkboxp1__cross']");
let selectInputsPlayer1 = document.querySelectorAll("[class*='checkboxp1__select']");
let crossInputsPlayer2 = document.querySelectorAll("[class*='checkboxp2__cross']");
let selectInputsPlayer2 = document.querySelectorAll("[class*='checkboxp2__select']");


/*----------- DECLARATION DES FONCTIONS ----------------- */
//Fonction Lancer les dés
function throw_dices() {
    dicesValues.length = 0;
    for (let i = 0; i < 5; i++) { //Renvoi un nombre aléatoire pour chaque dé
        if (dicesSelected[i] === false) {
            dicesValues[i] = Math.floor(Math.random() * 6 + 1);
        }
        else {
            dicesValues[i] = 0;
        }
    }
    //dicesValues=[6,6,2,6,5]; //Test : simuler un lancer particulier

    throwNumber++; //Incrémente le nombre de lancer (max 3)
    return dicesValues;
}

//Teste la fin du tour (5 dés sélectionnés)
function testing_end_round() {
    if (dicesSelected.every(diceSelected => diceSelected === true)) { //Condition fin du tour
        console.log("Fin du tour !");
        document.querySelector("#button__throw").style.display = "none"; //On retire le bouton Throw
        throwNumber = 0;

        console.log("player1Turn = ", player1Turn);

        calcul_score_round(); //On appelle la fonction pour calculer le score du tour

        console.log("player1turn = " , player1Turn);
        if (player1Turn === true){ // Sélection du joueur en cours
            crossInputsPlayer1.forEach(function(crossInputsPlayer1){ //Parcours chaque crossInputs pour les afficher
                crossInputsPlayer1.style.display = "flex";
            })
        }
        else if (player1Turn === false) {
            crossInputsPlayer2.forEach(function(crossInputsPlayer2){
                crossInputsPlayer2.style.display = "flex";
            })
        }
    }
    else { 
        console.log("Manche en cours");
    };
}

//Calcule les scores en fin de tour
function calcul_score_round() {
    //Compteur de dés pour calcul des scores
    let counter = 0; //Comparer les dés entre eux
    let counterValues = []; //On sauvarger les valeurs des dés égaux

    for (let i=0 ; i <5 ; i++) { //Double boucle pour comparer tous les dés entre eux
        for (let j=i+1 ; j < 5; j++) {
            if (dicesSelectedValues[i] === dicesSelectedValues[j]) {
                counter++;
                counterValues.push(dicesSelectedValues[i]);
            }
        }
    }

    //Yam
    if (counter === 10) { //5 dés égaux donne un counter = 10
        console.log("YAM !");
        if (player1Turn === true){
            document.querySelector(".checkboxp1__select__yam").style.display = "flex"; //On affiche les selectInputs correspondants
            document.querySelector(".checkboxp1__select__carre").style.display = "flex";
            document.querySelector(".checkboxp1__select__brelan").style.display = "flex";
        }
        else {
            document.querySelector(".checkboxp2__select__yam").style.display = "flex"; //On affiche les selectInputs correspondants
            document.querySelector(".checkboxp2__select__carre").style.display = "flex";
            document.querySelector(".checkboxp2__select__brelan").style.display = "flex";
        }
        testing_number(counterValues[0]); //Teste les counterValuers pour afficher les selectInputs correspondants
        //Reset les valeurs
        counter = 0; 
        counterValues.length = 0; 
    }
    //Carré
    else if (counter === 6) { //4 dés égaux donne un counter = 6
        console.log("CARRE !");
        if (player1Turn === true){
            document.querySelector(".checkboxp1__select__carre").style.display = "flex"; //On affiche les selectInputs correspondants
            document.querySelector(".checkboxp1__select__brelan").style.display = "flex";
        }
        else {
            document.querySelector(".checkboxp2__select__carre").style.display = "flex"; //On affiche les selectInputs correspondants
            document.querySelector(".checkboxp2__select__brelan").style.display = "flex";
        }
        testing_number(counterValues[0]); //Teste les counterValuers pour afficher les selectInputs correspondants
        //Reset les valeurs
        counter = 0;
        counterValues.length = 0;
    }
    //Full
    else if (counter === 4) { //3 dés égaux + 2 égaux donneront counter = 4
        console.log("FULL !");
        if (player1Turn === true){
            document.querySelector(".checkboxp1__select__full").style.display = "flex"; //On affiche les selectInputs correspondants
            document.querySelector(".checkboxp1__select__brelan").style.display = "flex";
        }
        else {
            document.querySelector(".checkboxp2__select__full").style.display = "flex"; //On affiche les selectInputs correspondants
            document.querySelector(".checkboxp2__select__brelan").style.display = "flex";
        }
        testing_number(Math.max(...counterValues)); //Teste les counterValuers pour afficher les selectInputs du full
        testing_number(Math.min(...counterValues));
        //Reset les valeurs
        counter = 0;
        counterValues.length = 0;
    }
    //Brelan
    else if (counter == 3) { //3 dés égaux donne un counter = 3
        console.log("BRELAN !");
        if (player1Turn === true){
            document.querySelector(".checkboxp1__select__brelan").style.display = "flex"; //On affiche les selectInputs correspondants
        }
        else {
            document.querySelector(".checkboxp2__select__brelan").style.display = "flex"; //On affiche les selectInputs correspondants
        }
        for (i = 1 ; i < 7 ; i++) {
            testing_number(i); //^ A maj ? N'afficher que le valeurs des dés présents ?
        }
        //Reset les valeurs
        counter = 0; 
        counterValues.length = 0;
    }
    //Grande suite
    else if (counter === 0 && Math.min(...dicesSelectedValues) === 2 && Math.max(...dicesSelectedValues) === 6 ) {
        console.log("BIG SUITE !");
        if (player1Turn === true){
            document.querySelector(".checkboxp1__select__bigsuite").style.display = "flex"; //On affiche les selectInputs correspondants
        }
        else {
            document.querySelector(".checkboxp2__select__bigsuite").style.display = "flex"; //On affiche les selectInputs correspondants 
        }
        
        for (i = 2 ; i < 7 ; i++) {
            testing_number(i); //Afficher tous les nombres de la suite
        }
        //Reset les valeurs
        counter = 0;
        counterValues.length = 0;
    }
    //Petite suite
    else if (counter === 0 && Math.min(...dicesSelectedValues) === 1 && Math.max(...dicesSelectedValues) === 5 ) {
        console.log("SMALL SUITE !");
        if (player1Turn === true){
            document.querySelector(".checkboxp1__select__smallsuite").style.display = "flex"; //On affiche les selectInputs correspondants
        }
        else {
            document.querySelector(".checkboxp2__select__smallsuite").style.display = "flex"; //On affiche les selectInputs correspondants
        }
        
        for (i = 1 ; i < 6 ; i++) {
            testing_number(i); //Afficher tous les nombres de la suite
        }
        //Reset les valeurs
        counter = 0;
        counterValues.length = 0;
    }
    //Pas de main
    else {
        console.log("QUEDAL !"); 
        for (i = 1 ; i < 7 ; i++) {
            testing_number(i);
        }
        //Reset les valeurs
        counter = 0;
        counterValues.length = 0;
    }
}

//Teste la valeur de dés dans les combinaisons pendant le calcul des scores
function testing_number(param) {
    if (player1Turn === true) {
        switch(param) { //Détermine quelle est la valeur des dés et affiche la case correspondante
            case 1 : document.querySelector(".checkboxp1__select__1").style.display = "flex"; break;
            case 2 : document.querySelector(".checkboxp1__select__2").style.display = "flex"; break;
            case 3 : document.querySelector(".checkboxp1__select__3").style.display = "flex"; break;
            case 4 : document.querySelector(".checkboxp1__select__4").style.display = "flex"; break;
            case 5 : document.querySelector(".checkboxp1__select__5").style.display = "flex"; break;
            case 6 : document.querySelector(".checkboxp1__select__6").style.display = "flex"; break;
        }
    }
    else {
        switch(param) { //Détermine quelle est la valeur des dés et affiche la case correspondante
            case 1 : document.querySelector(".checkboxp2__select__1").style.display = "flex"; break;
            case 2 : document.querySelector(".checkboxp2__select__2").style.display = "flex"; break;
            case 3 : document.querySelector(".checkboxp2__select__3").style.display = "flex"; break;
            case 4 : document.querySelector(".checkboxp2__select__4").style.display = "flex"; break;
            case 5 : document.querySelector(".checkboxp2__select__5").style.display = "flex"; break;
            case 6 : document.querySelector(".checkboxp2__select__6").style.display = "flex"; break;
        }   
    }
}

//Reset avant le prochain tour 
function reset_round() {
    dicesSelectedValues.length = 0; /*Contrôle*/ console.log("dicesSelectedValuesEnd = " , dicesSelectedValues); 
    dicesSelected=[false,false,false,false,false]; //Déselectionne tous les dés
    throwNumber = 0; /*Contrôle*/ console.log("throw number " , throwNumber);

    document.querySelector("#button__throw").style.display = "flex";
    dice1SelectedImg.style.display = "none";
    dice2SelectedImg.style.display = "none";
    dice3SelectedImg.style.display = "none";
    dice4SelectedImg.style.display = "none";
    dice5SelectedImg.style.display = "none";

    crossInputsPlayer1.forEach(function(crossInputsPlayer1){
        crossInputsPlayer1.style.display = "none";
    })
    selectInputsPlayer1.forEach(function(selectInputsPlayer1){
        selectInputsPlayer1.style.display = "none";
    })
    crossInputsPlayer2.forEach(function(crossInputsPlayer2){
        crossInputsPlayer2.style.display = "none";
    })
    selectInputsPlayer2.forEach(function(selectInputsPlayer2){
        selectInputsPlayer2.style.display = "none";
    })

    player1Turn = player1Turn ? false : true; // Switche vers l'autre valeur booléenne à chaque fin de tour
    console.log("player1Turn newTurn = ", player1Turn);
}

//Teste la fin de la partie après chaque tour
function testing_end_game() {
    if (Object.values(player2ScoreFill).every(value => value === true)) { //teste si toutes les valeurs de l'objet sont égales à true
        console.log("Fin de la partie");
        throwNumber = 0;
        document.querySelector("#button__throw").style.display = "none";
        calcul_score_game();

        document.querySelector(".game__end > h3").style.display = "flex";
        document.querySelector(".game__end > input").style.display = "flex";
        document.getElementById("audio_win").play();

    }
    else {console.log("Partie en cours");}
}

//Calcule les scores en fin de partie
function calcul_score_game() {
    //Player 1
    let scoreBonusPlayer1 = player1ScoreValues.Ones + player1ScoreValues.Twos + player1ScoreValues.Threes + player1ScoreValues.Fours + player1ScoreValues.Fives + player1ScoreValues.Sixes;
    if (scoreBonusPlayer1 >= 63) { //Teste si bonus pour player1
        document.querySelector(".player1__score__board__line__bonusvalue").innerText = 35;
        scoreBonusPlayer1 += 35;
    }
    else {
        document.querySelector(".player1__score__board__line__bonusvalue").innerText = 0;
    }
    
    let scorePlayer1 = scoreBonusPlayer1 + player1ScoreValues.Brelan + player1ScoreValues.Smallsuite + player1ScoreValues.Bigsuite + player1ScoreValues.Full + player1ScoreValues.Carre + player1ScoreValues.Yam ;
    document.querySelector(".player1__score__board__line__totalvalue").innerText = scorePlayer1;
    console.log("scoreBonusp1 = " , scoreBonusPlayer1);
    console.log("scoreTotalp1 = " , scorePlayer1);


    //Player2
    let scoreBonusPlayer2 = player2ScoreValues.Ones + player2ScoreValues.Twos + player2ScoreValues.Threes + player2ScoreValues.Fours + player2ScoreValues.Fives + player2ScoreValues.Sixes;
    if (scoreBonusPlayer2 >= 63) { //Teste si bonus pour player2
        scoreBonusPlayer2 += 35;
        document.querySelector(".player2__score__board__line__bonusvalue").innerText = 35;
    }
    else {
        document.querySelector(".player2__score__board__line__bonusvalue").innerText = 0;
    }
    let scorePlayer2 = scoreBonusPlayer2 + player2ScoreValues.Brelan + player2ScoreValues.Smallsuite + player2ScoreValues.Bigsuite + player2ScoreValues.Full + player2ScoreValues.Carre + player2ScoreValues.Yam ;
    document.querySelector(".player2__score__board__line__totalvalue").innerText = scorePlayer2;

    //Comparaison et donne le gagnant
    if (scorePlayer1 > scorePlayer2) {
        console.log("PLAYER 1 WINS !");
        document.querySelector(".game__end > h3").innerText = "Player 1 wins !";
    }
    else if (scorePlayer1 < scorePlayer2) {
        console.log("PLAYER 2 WINS !"); 
        document.querySelector(".game__end > h3").innerText = "Player 2 wins !";
    }
    else {
        console.log("MATCH NUL !");
        document.querySelector(".game__end > h3").innerText = "Tie ! No winner";
    }
}

//Reset pour la prochaine partie (rematch)
function reset_game(){ //la fonction reset_round reset déjà la plupart des paramètres.
    Object.keys(player1ScoreFill).forEach(key => player1ScoreFill[key] = false); //Vide les objets Player1 et Player2
    Object.keys(player1ScoreValues).forEach(key => player1ScoreValues[key] = 0);
    Object.keys(player2ScoreFill).forEach(key => player2ScoreFill[key] = false); 
    Object.keys(player2ScoreValues).forEach(key => player2ScoreValues[key] = 0);

    selectInputsPlayer1.forEach(function(selectInputsPlayer1){ //Réactive les selectInputs & crossInputs
        selectInputsPlayer1.disabled = false;
        selectInputsPlayer1.checked = false;
    })
    crossInputsPlayer1.forEach(function(crossInputsPlayer1){
        crossInputsPlayer1.disabled = false;
        crossInputsPlayer1.checked = false;
    })
    selectInputsPlayer2.forEach(function(selectInputsPlayer2){ //Réactive les selectInputs & crossInputs
        selectInputsPlayer2.disabled = false;
        selectInputsPlayer2.checked = false;
    })
    crossInputsPlayer2.forEach(function(crossInputsPlayer2){
        crossInputsPlayer2.disabled = false;
        crossInputsPlayer2.checked = false;
    })
    //^Faire une boucle ?
    //Scores Player1
    document.querySelector(".player1__score__board__line__1value").innerHTML = "<p>  </p>";
    document.querySelector(".player1__score__board__line__2value").innerHTML = "<p>  </p>";
    document.querySelector(".player1__score__board__line__3value").innerHTML = "<p>  </p>";
    document.querySelector(".player1__score__board__line__4value").innerHTML = "<p>  </p>";
    document.querySelector(".player1__score__board__line__5value").innerHTML = "<p>  </p>";
    document.querySelector(".player1__score__board__line__6value").innerHTML = "<p>  </p>";
    document.querySelector(".player1__score__board__line__brelanvalue").innerHTML = "<p>  </p>";
    document.querySelector(".player1__score__board__line__smallsuitevalue").innerHTML = "<p>  </p>";
    document.querySelector(".player1__score__board__line__bigsuitevalue").innerHTML = "<p>  </p>";
    document.querySelector(".player1__score__board__line__fullvalue").innerHTML = "<p>  </p>";
    document.querySelector(".player1__score__board__line__carrevalue").innerHTML = "<p>  </p>";
    document.querySelector(".player1__score__board__line__yamvalue").innerHTML = "<p>  </p>";
    document.querySelector(".player1__score__board__line__bonusvalue").innerHTML = "<p>  </p>";
    document.querySelector(".player1__score__board__line__totalvalue").innerHTML = "<p>  </p>";
    //Scores Player2
    document.querySelector(".player2__score__board__line__1value").innerHTML = "<p>  </p>";
    document.querySelector(".player2__score__board__line__2value").innerHTML = "<p>  </p>";
    document.querySelector(".player2__score__board__line__3value").innerHTML = "<p>  </p>";
    document.querySelector(".player2__score__board__line__4value").innerHTML = "<p>  </p>";
    document.querySelector(".player2__score__board__line__5value").innerHTML = "<p>  </p>";
    document.querySelector(".player2__score__board__line__6value").innerHTML = "<p>  </p>";
    document.querySelector(".player2__score__board__line__brelanvalue").innerHTML = "<p>  </p>";
    document.querySelector(".player2__score__board__line__smallsuitevalue").innerHTML = "<p>  </p>";
    document.querySelector(".player2__score__board__line__bigsuitevalue").innerHTML = "<p>  </p>";
    document.querySelector(".player2__score__board__line__fullvalue").innerHTML = "<p>  </p>";
    document.querySelector(".player2__score__board__line__carrevalue").innerHTML = "<p>  </p>";
    document.querySelector(".player2__score__board__line__yamvalue").innerHTML = "<p>  </p>";
    document.querySelector(".player2__score__board__line__bonusvalue").innerHTML = "<p>  </p>";
    document.querySelector(".player2__score__board__line__totalvalue").innerHTML = "<p>  </p>";

    document.querySelector("#button__throw").style.display = "flex";
}

//^Ajouter une fonction pour reset la sélection des dés en cours ??

/*---------------- EVENEMENTS ----------------- */

//Evenement GameZone : Clic pour lancer les dés
document.querySelector(".game__throw").addEventListener("click", function (e) {
    e.stopPropagation();
    e.preventDefault();

    throw_dices();
    dice1Value = dicesValues[0];
    dice2Value = dicesValues[1];
    dice3Value = dicesValues[2];
    dice4Value = dicesValues[3];
    dice5Value = dicesValues[4];
    
    //Chargement des images de dés joués
    //On les masque 1 seconde pour simuler un relancer
    dice1ThrowedImg.src = ""; 
    dice2ThrowedImg.src = "";
    dice3ThrowedImg.src = "";
    dice4ThrowedImg.src = "";
    dice5ThrowedImg.src = "";
    document.getElementById("audio_mix_throw").play(); //On lance le bruit
    //On affiche les images 1 seconde plus tard
    setTimeout(function(){
        dice1ThrowedImg.src = "Images/Dice-val" + dice1Value + ".png"; dice1ThrowedImg.title = "Dé de " + dice1Value;
        dice2ThrowedImg.src = "Images/Dice-val" + dice2Value + ".png"; dice2ThrowedImg.title = "Dé de " + dice1Value;
        dice3ThrowedImg.src = "Images/Dice-val" + dice3Value + ".png"; dice3ThrowedImg.title = "Dé de " + dice1Value;
        dice4ThrowedImg.src = "Images/Dice-val" + dice4Value + ".png"; dice4ThrowedImg.title = "Dé de " + dice1Value;
        dice5ThrowedImg.src = "Images/Dice-val" + dice5Value + ".png"; dice5ThrowedImg.title = "Dé de " + dice1Value;

    },1500);
    
    //Affichage des dés et du bouton throw
    if (throwNumber ===1) { //Premier lancer --> on affiche tout les dés
        dice1ThrowedImg.style.display = "flex";
        dice2ThrowedImg.style.display = "flex";
        dice3ThrowedImg.style.display = "flex";
        dice4ThrowedImg.style.display = "flex";
        dice5ThrowedImg.style.display = "flex";
    }
    else if (throwNumber === 3) { //3ème lancer --> on masque le bouton throw
        document.querySelector("#button__throw").style.display = "none";
    }
    /* Contrôle des valeurs */console.log("ThrowNumber = " , throwNumber);
    /* Contrôle des valeurs */ console.log("dicesValues = ", dicesValues);
})

//Evenement GameZone : Clic pour sélectionner les dés pendant 3 tours (x5 clics)
    //Sélection dé n°1
    document.querySelector(".game__field__zone1__dice1").addEventListener("click", function (e) {
        e.stopPropagation();
        e.preventDefault();

        dice1Selected = true;
        dicesSelected[0] = true;    /*Contrôle*/ console.log("dicesSelected : ", dicesSelected);
        dice1SelectedValue = dice1Value;
        dicesSelectedValues[0] = dice1Value;  /*Contrôle*/ console.log("dicesSelectedValues : ", dicesSelectedValues);

        //Chargement de l'image du dé joué
        dice1SelectedImg.src = "Images/Dice-val" + dice1Value + "-select.png"; dice1SelectedImg.title = "Dé n°1 sélect ";
        dice1SelectedImg.style.display = "flex";
        dice1ThrowedImg.style.display = "none";

        testing_end_round(); //Teste la fin de la manche ()
    })
    //Sélection dé n°2
    document.querySelector(".game__field__zone1__dice2").addEventListener("click", function (e) {
        e.stopPropagation();
        e.preventDefault();

        dice2Selected = true;
        dicesSelected[1] = true;    /*Contrôle*/ console.log("dicesSelected : ", dicesSelected);
        dice2SelectedValue = dice2Value;
        dicesSelectedValues[1] = dice2Value;  /*Contrôle*/ console.log("dicesSelectedValues : ", dicesSelectedValues);

        //Chargement de l'image du dé joué
        dice2SelectedImg.src = "Images/Dice-val" + dice2Value + "-select.png"; dice2SelectedImg.title = "Dé n°1 sélect ";
        dice2SelectedImg.style.display = "flex";
        dice2ThrowedImg.style.display = "none";

        testing_end_round()
    })
    //Sélection dé n°3
    document.querySelector(".game__field__zone1__dice3").addEventListener("click", function (e) {
        e.stopPropagation();
        e.preventDefault();

        dice3Selected = true;
        dicesSelected[2] = true;    /*Contrôle*/ console.log("dicesSelected : ", dicesSelected);
        dice3SelectedValue = dice3Value;
        dicesSelectedValues[2] = dice3Value;  /*Contrôle*/ console.log("dicesSelectedValues : ", dicesSelectedValues);

        //Chargement de l'image du dé joué
        dice3SelectedImg.src = "Images/Dice-val" + dice3Value + "-select.png"; dice3SelectedImg.title = "Dé n°3 sélect ";
        dice3SelectedImg.style.display = "flex";
        dice3ThrowedImg.style.display = "none";

        testing_end_round()
    })
    //Sélection dé n°4
    document.querySelector(".game__field__zone2__dice4").addEventListener("click", function (e) {
        e.stopPropagation();
        e.preventDefault();

        dice4Selected = true;
        dicesSelected[3] = true;   /*Contrôle*/ console.log("dicesSelected : ", dicesSelected);
        dice4SelectedValue = dice4Value;
        dicesSelectedValues[3] = dice4Value;  /*Contrôle*/ console.log("dicesSelectedValues : ", dicesSelectedValues);

        //Chargement de l'image du dé joué
        dice4SelectedImg.src = "Images/Dice-val" + dice4Value + "-select.png"; dice4SelectedImg.title = "Dé n°4 sélect ";
        dice4SelectedImg.style.display = "flex";
        dice4ThrowedImg.style.display = "none";

        testing_end_round()
    })
    //Sélection dé n°5
    document.querySelector(".game__field__zone2__dice5").addEventListener("click", function (e) {
        e.stopPropagation();
        e.preventDefault();

        dice5Selected = true;
        dicesSelected[4] = true;    /*Contrôle*/ console.log("dicesSelected : ", dicesSelected);
        dice5SelectedValue = dice5Value;
        dicesSelectedValues[4] = dice5Value;  /*Contrôle*/ console.log("dicesSelectedValues : ", dicesSelectedValues);

        //Chargement de l'image du dé joué
        dice5SelectedImg.src = "Images/Dice-val" + dice5Value + "-select.png"; dice5SelectedImg.title = "Dé n°5 sélect ";
        dice5SelectedImg.style.display = "flex";
        dice5ThrowedImg.style.display = "none";

        testing_end_round()
    })

//Evenement Player1 : Clic pour sélectionner la main après les 3 tours (12 clics possibles)
    //Sélection Yam
    document.querySelector(".checkboxp1__select__yam").addEventListener("click", function(e) {
        e.stopPropagation();
        //Calcul et inscription du score
        player1ScoreFill.Yam = true; 
        player1ScoreValues.Yam = 50; 
        document.querySelector(".player1__score__board__line__yamvalue > p").innerText = player1ScoreValues.Yam;
        //Désactive la main pour les prochains tours
        document.querySelector(".checkboxp1__select__yam").disabled = true;
        document.querySelector(".checkboxp1__cross__yam").disabled = true;
        //Reset pour prochain tour
        reset_round();
        testing_end_game();
    })
    //Sélection Carré
    document.querySelector(".checkboxp1__select__carre").addEventListener("click", function(e) {
        e.stopPropagation();
        //Calcul et inscription du score
        player1ScoreFill.Carre = true; 
        player1ScoreValues.Carre = 40; 
        document.querySelector(".player1__score__board__line__carrevalue > p").innerText = player1ScoreValues.Carre;
        //Désactive la main pour les prochains tours
        document.querySelector(".checkboxp1__select__carre").disabled = true;
        document.querySelector(".checkboxp1__cross__carre").disabled = true;
        //Reset pour prochain tour
        reset_round();
        testing_end_game();
    })
    //Sélection Full
    document.querySelector(".checkboxp1__select__full").addEventListener("click", function(e) {
        e.stopPropagation();
        //Calcul et inscription du score
        player1ScoreFill.Full = true; 
        player1ScoreValues.Full = 30; 
        document.querySelector(".player1__score__board__line__fullvalue > p").innerText = player1ScoreValues.Full;
        //Désactive la main pour les prochains tours
        document.querySelector(".checkboxp1__select__full").disabled = true;
        document.querySelector(".checkboxp1__cross__full").disabled = true;
        //Reset pour prochain tour
        reset_round();
        testing_end_game();
    })
    //Sélection BigSuite
    document.querySelector(".checkboxp1__select__bigsuite").addEventListener("click", function(e) {
        e.stopPropagation();
        //Calcul et inscription du score
        player1ScoreFill.Bigsuite = true; 
        player1ScoreValues.Bigsuite = 25; 
        document.querySelector(".player1__score__board__line__bigsuitevalue > p").innerText = player1ScoreValues.Bigsuite;
        //Désactive la main pour les prochains tours
        document.querySelector(".checkboxp1__select__bigsuite").disabled = true;
        document.querySelector(".checkboxp1__cross__bigsuite").disabled = true;
        //Reset pour prochain tour
        reset_round();
        testing_end_game();
    })
    //Sélection SmallSuite
    document.querySelector(".checkboxp1__select__smallsuite").addEventListener("click", function(e) {
        e.stopPropagation();
        //Calcul et inscription du score
        player1ScoreFill.Smallsuite = true; 
        player1ScoreValues.Smallsuite = 25; 
        document.querySelector(".player1__score__board__line__smallsuitevalue > p").innerText = player1ScoreValues.Smallsuite;
        //Désactive la main pour les prochains tours
        document.querySelector(".checkboxp1__select__smallsuite").disabled = true;
        document.querySelector(".checkboxp1__cross__smallsuite").disabled = true;
        //Reset pour prochain tour
        reset_round();
        testing_end_game();
    })
    //Sélection Brelan
    document.querySelector(".checkboxp1__select__brelan").addEventListener("click", function(e) {
        e.stopPropagation();
        //Calcul et inscription du score
        player1ScoreFill.Brelan = true; 
        //Boucle pour calculer la somme de tous les dés
        let brelanCounter = 0;
        for (i=0;i<5;i++) {
            brelanCounter += dicesSelectedValues[i];
        }
        player1ScoreValues.Brelan = brelanCounter; 
        document.querySelector(".player1__score__board__line__brelanvalue > p").innerText = player1ScoreValues.Brelan;
        //Désactive la main pour les prochains tours
        document.querySelector(".checkboxp1__select__brelan").disabled = true;
        document.querySelector(".checkboxp1__cross__brelan").disabled = true;
        //Reset pour prochain tour
        reset_round();
        testing_end_game();
    })
    //Sélection Sixes
    document.querySelector(".checkboxp1__select__6").addEventListener("click", function(e) {
        e.stopPropagation();
        //Calcul et inscription du score
        player1ScoreFill.Sixes = true; 
        //Boucle pour calculer le nombre de dés valeur 6
        let sixesCounter = 0;
        for (i=0;i<5;i++) {
            if (dicesSelectedValues[i] === 6) {
                sixesCounter++;
            }
        }
        player1ScoreValues.Sixes = sixesCounter * 6; 
        document.querySelector(".player1__score__board__line__6value > p").innerText = player1ScoreValues.Sixes;
        //Désactive la main pour les prochains tours
        document.querySelector(".checkboxp1__select__6").disabled = true;
        document.querySelector(".checkboxp1__cross__6").disabled = true;
        //Reset pour prochain tour
        reset_round();
        testing_end_game();
    })
    //Sélection Fives
    document.querySelector(".checkboxp1__select__5").addEventListener("click", function(e) {
        e.stopPropagation();
        //Calcul et inscription du score
        player1ScoreFill.Fives = true; 
        //Boucle pour calculer le nombre de dés valeur 6
        let fivesCounter = 0;
        for (i=0;i<5;i++) {
            if (dicesSelectedValues[i] === 5) {
                fivesCounter++;
            }
        }
        player1ScoreValues.Fives = fivesCounter * 5; 
        document.querySelector(".player1__score__board__line__5value > p").innerText = player1ScoreValues.Fives;
        //Désactive la main pour les prochains tours
        document.querySelector(".checkboxp1__select__5").disabled = true;
        document.querySelector(".checkboxp1__cross__5").disabled = true;
        //Reset pour prochain tour
        reset_round();
        testing_end_game();
    })
    //Sélection Fours
    document.querySelector(".checkboxp1__select__4").addEventListener("click", function(e) {
        e.stopPropagation();
        //Calcul et inscription du score
        player1ScoreFill.Fours = true; 
        //Boucle pour calculer le nombre de dés valeur 6
        let foursCounter = 0;
        for (i=0;i<5;i++) {
            if (dicesSelectedValues[i] === 4) {
                foursCounter++;
            }
        }
        player1ScoreValues.Fours = foursCounter * 4; 
        document.querySelector(".player1__score__board__line__4value > p").innerText = player1ScoreValues.Fours;
        //Désactive la main pour les prochains tours
        document.querySelector(".checkboxp1__select__4").disabled = true;
        document.querySelector(".checkboxp1__cross__4").disabled = true;
        //Reset pour prochain tour
        reset_round();
        testing_end_game();
    })
    //Sélection Threes
    document.querySelector(".checkboxp1__select__3").addEventListener("click", function(e) {
        e.stopPropagation();
        //Calcul et inscription du score
        player1ScoreFill.Threes = true; 
        //Boucle pour calculer le nombre de dés valeur 6
        let threesCounter = 0;
        for (i=0;i<5;i++) {
            if (dicesSelectedValues[i] === 3) {
                threesCounter++;
            }
        }
        player1ScoreValues.Threes = threesCounter * 3; 
        document.querySelector(".player1__score__board__line__3value > p").innerText = player1ScoreValues.Threes;
        //Désactive la main pour les prochains tours
        document.querySelector(".checkboxp1__select__3").disabled = true;
        document.querySelector(".checkboxp1__cross__3").disabled = true;
        //Reset pour prochain tour
        reset_round();
        testing_end_game();
    })
    //Sélection Twos
    document.querySelector(".checkboxp1__select__2").addEventListener("click", function(e) {
        e.stopPropagation();
        //Calcul et inscription du score
        player1ScoreFill.Twos = true; 
        //Boucle pour calculer le nombre de dés valeur 6
        let twosCounter = 0;
        for (i=0;i<5;i++) {
            if (dicesSelectedValues[i] === 2) {
                twosCounter++;
            }
        }
        player1ScoreValues.Twos = twosCounter * 2; 
        document.querySelector(".player1__score__board__line__2value > p").innerText = player1ScoreValues.Twos;
        //Désactive la main pour les prochains tours
        document.querySelector(".checkboxp1__select__2").disabled = true;
        document.querySelector(".checkboxp1__cross__2").disabled = true;
        //Reset pour prochain tour
        reset_round();
        testing_end_game();
    })
    //Sélection Ones
    document.querySelector(".checkboxp1__select__1").addEventListener("click", function(e) {
        e.stopPropagation();
        //Calcul et inscription du score
        player1ScoreFill.Ones = true; 
        //Boucle pour calculer le nombre de dés valeur 6
        let onesCounter = 0;
        for (i=0;i<5;i++) {
            if (dicesSelectedValues[i] === 1) {
                onesCounter++;
            }
        }
        player1ScoreValues.Ones = onesCounter; 
        document.querySelector(".player1__score__board__line__1value > p").innerText = player1ScoreValues.Ones;
        //Désactive la main pour les prochains tours
        document.querySelector(".checkboxp1__select__1").disabled = true;
        document.querySelector(".checkboxp1__cross__1").disabled = true;
        //Reset pour prochain tour
        reset_round();
        testing_end_game();
    })

    //Evenement Player1 : Clic pour barrer une main après les 3 tours (12 clics possibles)
    //Cross Yam
    document.querySelector(".checkboxp1__cross__yam").addEventListener("click", function(e) {
        e.stopPropagation();
        //Calcul et inscription du score
        player1ScoreFill.Yam = true; 
        player1ScoreValues.Yam = 0; 
        document.querySelector(".player1__score__board__line__yamvalue > p").innerText = player1ScoreValues.Yam;
        //Désactive la main pour les prochains tours
        document.querySelector(".checkboxp1__cross__yam").disabled = true;
        document.querySelector(".checkboxp1__select__yam").disabled = true;
        //Reset pour prochain tour
        reset_round();
        testing_end_game();
    })
    //Cross Carré
    document.querySelector(".checkboxp1__cross__carre").addEventListener("click", function(e) {
        e.stopPropagation();
        //Calcul et inscription du score
        player1ScoreFill.Carre = true; 
        player1ScoreValues.Carre = 0; 
        document.querySelector(".player1__score__board__line__carrevalue > p").innerText = player1ScoreValues.Carre;
        //Désactive la main pour les prochains tours
        document.querySelector(".checkboxp1__cross__carre").disabled = true;
        document.querySelector(".checkboxp1__select__carre").disabled = true;
        //Reset pour prochain tour
        reset_round();
        testing_end_game();
    })
    //Cross Full
    document.querySelector(".checkboxp1__cross__full").addEventListener("click", function(e) {
        e.stopPropagation();
        //Calcul et inscription du score
        player1ScoreFill.Full = true; 
        player1ScoreValues.Full = 0; 
        document.querySelector(".player1__score__board__line__fullvalue > p").innerText = player1ScoreValues.Full;
        //Désactive la main pour les prochains tours
        document.querySelector(".checkboxp1__cross__full").disabled = true;
        document.querySelector(".checkboxp1__select__full").disabled = true;
        //Reset pour prochain tour
        reset_round();
        testing_end_game();
    })
    //Cross BigSuite
    document.querySelector(".checkboxp1__cross__bigsuite").addEventListener("click", function(e) {
        e.stopPropagation();
        //Calcul et inscription du score
        player1ScoreFill.Bigsuite = true; 
        player1ScoreValues.Bigsuite = 0; 
        document.querySelector(".player1__score__board__line__bigsuitevalue > p").innerText = player1ScoreValues.Bigsuite;
        //Désactive la main pour les prochains tours
        document.querySelector(".checkboxp1__cross__bigsuite").disabled = true;
        document.querySelector(".checkboxp1__select__bigsuite").disabled = true;
        //Reset pour prochain tour
        reset_round();
        testing_end_game();
    })
    //Cross SmallSuite
    document.querySelector(".checkboxp1__cross__smallsuite").addEventListener("click", function(e) {
        e.stopPropagation();
        //Calcul et inscription du score
        player1ScoreFill.Smallsuite = true; 
        player1ScoreValues.Smallsuite = 0; 
        document.querySelector(".player1__score__board__line__smallsuitevalue > p").innerText = player1ScoreValues.Smallsuite;
        //Désactive la main pour les prochains tours
        document.querySelector(".checkboxp1__cross__smallsuite").disabled = true;
        document.querySelector(".checkboxp1__select__smallsuite").disabled = true;
        //Reset pour prochain tour
        reset_round();
        testing_end_game();
    })
    //Cross Brelan
    document.querySelector(".checkboxp1__cross__brelan").addEventListener("click", function(e) {
        e.stopPropagation();
        //Calcul et inscription du score
        player1ScoreFill.Brelan = true; 
        player1ScoreValues.Brelan = 0; 
        document.querySelector(".player1__score__board__line__brelanvalue > p").innerText = player1ScoreValues.Brelan;
        //Désactive la main pour les prochains tours
        document.querySelector(".checkboxp1__cross__brelan").disabled = true;
        document.querySelector(".checkboxp1__select__brelan").disabled = true;
        //Reset pour prochain tour
        reset_round();
        testing_end_game();
    })
    //Cross Sixes
    document.querySelector(".checkboxp1__cross__6").addEventListener("click", function(e) {
        e.stopPropagation();
        //Calcul et inscription du score
        player1ScoreFill.Sixes = true; 
        player1ScoreValues.Sixes = 0; 
        document.querySelector(".player1__score__board__line__6value > p").innerText = player1ScoreValues.Sixes;
        //Désactive la main pour les prochains tours
        document.querySelector(".checkboxp1__cross__6").disabled = true;
        document.querySelector(".checkboxp1__select__6").disabled = true;
        //Reset pour prochain tour
        reset_round();
        testing_end_game();
    })
    //Cross Fives
    document.querySelector(".checkboxp1__cross__5").addEventListener("click", function(e) {
        e.stopPropagation();
        //Calcul et inscription du score
        player1ScoreFill.Fives = true; 
        player1ScoreValues.Fives = 0; 
        document.querySelector(".player1__score__board__line__5value > p").innerText = player1ScoreValues.Fives;
        //Désactive la main pour les prochains tours
        document.querySelector(".checkboxp1__cross__5").disabled = true;
        document.querySelector(".checkboxp1__select__5").disabled = true;
        //Reset pour prochain tour
        reset_round();
        testing_end_game();
    })
    //Cross Fours
    document.querySelector(".checkboxp1__cross__4").addEventListener("click", function(e) {
        e.stopPropagation();
        //Calcul et inscription du score
        player1ScoreFill.Fours = true; 
        player1ScoreValues.Fours = 0; 
        document.querySelector(".player1__score__board__line__4value > p").innerText = player1ScoreValues.Fours;
        //Désactive la main pour les prochains tours
        document.querySelector(".checkboxp1__cross__4").disabled = true;
        document.querySelector(".checkboxp1__select__4").disabled = true;
        //Reset pour prochain tour
        reset_round();
        testing_end_game();
    })
    //Cross Threes
    document.querySelector(".checkboxp1__cross__3").addEventListener("click", function(e) {
        e.stopPropagation();
        //Calcul et inscription du score
        player1ScoreFill.Threes = true; 
        player1ScoreValues.Threes = 0; 
        document.querySelector(".player1__score__board__line__3value > p").innerText = player1ScoreValues.Threes;
        //Désactive la main pour les prochains tours
        document.querySelector(".checkboxp1__cross__3").disabled = true;
        document.querySelector(".checkboxp1__select__3").disabled = true;
        //Reset pour prochain tour
        reset_round();
        testing_end_game();
    })
    //Cross Twos
    document.querySelector(".checkboxp1__cross__2").addEventListener("click", function(e) {
        e.stopPropagation();
        //Calcul et inscription du score
        player1ScoreFill.Twos = true; 
        player1ScoreValues.Twos = 0; 
        document.querySelector(".player1__score__board__line__2value > p").innerText = player1ScoreValues.Twos;
        //Désactive la main pour les prochains tours
        document.querySelector(".checkboxp1__cross__2").disabled = true;
        document.querySelector(".checkboxp1__select__2").disabled = true;
        //Reset pour prochain tour
        reset_round();
        testing_end_game();
    })
    //Cross Ones
    document.querySelector(".checkboxp1__cross__1").addEventListener("click", function(e) {
        e.stopPropagation();
        //Calcul et inscription du score
        player1ScoreFill.Ones = true;
        player1ScoreValues.Ones = 0; 
        document.querySelector(".player1__score__board__line__1value > p").innerText = player1ScoreValues.Ones;
        //Désactive la main pour les prochains tours
        document.querySelector(".checkboxp1__cross__1").disabled = true;
        document.querySelector(".checkboxp1__select__1").disabled = true;
        //Reset pour prochain tour
        reset_round();
        testing_end_game();
    })

//Evenement Player2 : Clic pour sélectionner la main après les 3 tours (12 clics possibles)
    //Sélection Yam
    document.querySelector(".checkboxp2__select__yam").addEventListener("click", function(e) {
        e.stopPropagation();
        //Calcul et inscription du score
        player2ScoreFill.Yam = true; 
        player2ScoreValues.Yam = 50; 
        document.querySelector(".player2__score__board__line__yamvalue > p").innerText = player2ScoreValues.Yam;
        //Désactive la main pour les prochains tours
        document.querySelector(".checkboxp2__select__yam").disabled = true;
        document.querySelector(".checkboxp2__cross__yam").disabled = true;
        //Reset pour prochain tour
        reset_round();
        testing_end_game();
    })
    //Sélection Carré
    document.querySelector(".checkboxp2__select__carre").addEventListener("click", function(e) {
        e.stopPropagation();
        //Calcul et inscription du score
        player2ScoreFill.Carre = true; 
        player2ScoreValues.Carre = 40; 
        document.querySelector(".player2__score__board__line__carrevalue > p").innerText = player2ScoreValues.Carre;
        //Désactive la main pour les prochains tours
        document.querySelector(".checkboxp2__select__carre").disabled = true;
        document.querySelector(".checkboxp2__cross__carre").disabled = true;
        //Reset pour prochain tour
        reset_round();
        testing_end_game();
    })
    //Sélection Full
    document.querySelector(".checkboxp2__select__full").addEventListener("click", function(e) {
        e.stopPropagation();
        //Calcul et inscription du score
        player2ScoreFill.Full = true; 
        player2ScoreValues.Full = 30; 
        document.querySelector(".player2__score__board__line__fullvalue > p").innerText = player2ScoreValues.Full;
        //Désactive la main pour les prochains tours
        document.querySelector(".checkboxp2__select__full").disabled = true;
        document.querySelector(".checkboxp2__cross__full").disabled = true;
        //Reset pour prochain tour
        reset_round();
        testing_end_game();
    })
    //Sélection BigSuite
    document.querySelector(".checkboxp2__select__bigsuite").addEventListener("click", function(e) {
        e.stopPropagation();
        //Calcul et inscription du score
        player2ScoreFill.Bigsuite = true; 
        player2ScoreValues.Bigsuite = 25; 
        document.querySelector(".player2__score__board__line__bigsuitevalue > p").innerText = player2ScoreValues.Bigsuite;
        //Désactive la main pour les prochains tours
        document.querySelector(".checkboxp2__select__bigsuite").disabled = true;
        document.querySelector(".checkboxp2__cross__bigsuite").disabled = true;
        //Reset pour prochain tour
        reset_round();
        testing_end_game();
    })
    //Sélection SmallSuite
    document.querySelector(".checkboxp2__select__smallsuite").addEventListener("click", function(e) {
        e.stopPropagation();
        //Calcul et inscription du score
        player2ScoreFill.Smallsuite = true; 
        player2ScoreValues.Smallsuite = 25; 
        document.querySelector(".player2__score__board__line__smallsuitevalue > p").innerText = player2ScoreValues.Smallsuite;
        //Désactive la main pour les prochains tours
        document.querySelector(".checkboxp2__select__smallsuite").disabled = true;
        document.querySelector(".checkboxp2__cross__smallsuite").disabled = true;
        //Reset pour prochain tour
        reset_round();
        testing_end_game();
    })
    //Sélection Brelan
    document.querySelector(".checkboxp2__select__brelan").addEventListener("click", function(e) {
        e.stopPropagation();
        //Calcul et inscription du score
        player2ScoreFill.Brelan = true; 
        //Boucle pour calculer la somme de tous les dés
        let brelanCounter = 0;
        for (i=0;i<5;i++) {
            brelanCounter += dicesSelectedValues[i];
        }
        player2ScoreValues.Brelan = brelanCounter; 
        document.querySelector(".player2__score__board__line__brelanvalue > p").innerText = player2ScoreValues.Brelan;
        //Désactive la main pour les prochains tours
        document.querySelector(".checkboxp2__select__brelan").disabled = true;
        document.querySelector(".checkboxp2__cross__brelan").disabled = true;
        //Reset pour prochain tour
        reset_round();
        testing_end_game();
    })
    //Sélection Sixes
    document.querySelector(".checkboxp2__select__6").addEventListener("click", function(e) {
        e.stopPropagation();
        //Calcul et inscription du score
        player2ScoreFill.Sixes = true; 
        //Boucle pour calculer le nombre de dés valeur 6
        let sixesCounter = 0;
        for (i=0;i<5;i++) {
            if (dicesSelectedValues[i] === 6) {
                sixesCounter++;
            }
        }
        player2ScoreValues.Sixes = sixesCounter * 6; 
        document.querySelector(".player2__score__board__line__6value > p").innerText = player2ScoreValues.Sixes;
        //Désactive la main pour les prochains tours
        document.querySelector(".checkboxp2__select__6").disabled = true;
        document.querySelector(".checkboxp2__cross__6").disabled = true;
        //Reset pour prochain tour
        reset_round();
        testing_end_game();
    })
    //Sélection Fives
    document.querySelector(".checkboxp2__select__5").addEventListener("click", function(e) {
        e.stopPropagation();
        //Calcul et inscription du score
        player2ScoreFill.Fives = true; 
        //Boucle pour calculer le nombre de dés valeur 6
        let fivesCounter = 0;
        for (i=0;i<5;i++) {
            if (dicesSelectedValues[i] === 5) {
                fivesCounter++;
            }
        }
        player2ScoreValues.Fives = fivesCounter * 5; 
        document.querySelector(".player2__score__board__line__5value > p").innerText = player2ScoreValues.Fives;
        //Désactive la main pour les prochains tours
        document.querySelector(".checkboxp2__select__5").disabled = true;
        document.querySelector(".checkboxp2__cross__5").disabled = true;
        //Reset pour prochain tour
        reset_round();
        testing_end_game();
    })
    //Sélection Fours
    document.querySelector(".checkboxp2__select__4").addEventListener("click", function(e) {
        e.stopPropagation();
        //Calcul et inscription du score
        player2ScoreFill.Fours = true; 
        //Boucle pour calculer le nombre de dés valeur 6
        let foursCounter = 0;
        for (i=0;i<5;i++) {
            if (dicesSelectedValues[i] === 4) {
                foursCounter++;
            }
        }
        player2ScoreValues.Fours = foursCounter * 4; 
        document.querySelector(".player2__score__board__line__4value > p").innerText = player2ScoreValues.Fours;
        //Désactive la main pour les prochains tours
        document.querySelector(".checkboxp2__select__4").disabled = true;
        document.querySelector(".checkboxp2__cross__4").disabled = true;
        //Reset pour prochain tour
        reset_round();
        testing_end_game();
    })
    //Sélection Threes
    document.querySelector(".checkboxp2__select__3").addEventListener("click", function(e) {
        e.stopPropagation();
        //Calcul et inscription du score
        player2ScoreFill.Threes = true; 
        //Boucle pour calculer le nombre de dés valeur 6
        let threesCounter = 0;
        for (i=0;i<5;i++) {
            if (dicesSelectedValues[i] === 3) {
                threesCounter++;
            }
        }
        player2ScoreValues.Threes = threesCounter * 3; 
        document.querySelector(".player2__score__board__line__3value > p").innerText = player2ScoreValues.Threes;
        //Désactive la main pour les prochains tours
        document.querySelector(".checkboxp2__select__3").disabled = true;
        document.querySelector(".checkboxp2__cross__3").disabled = true;
        //Reset pour prochain tour
        reset_round();
        testing_end_game();
    })
    //Sélection Twos
    document.querySelector(".checkboxp2__select__2").addEventListener("click", function(e) {
        e.stopPropagation();
        //Calcul et inscription du score
        player2ScoreFill.Twos = true; 
        //Boucle pour calculer le nombre de dés valeur 6
        let twosCounter = 0;
        for (i=0;i<5;i++) {
            if (dicesSelectedValues[i] === 2) {
                twosCounter++;
            }
        }
        player2ScoreValues.Twos = twosCounter * 2; 
        document.querySelector(".player2__score__board__line__2value > p").innerText = player2ScoreValues.Twos;
        //Désactive la main pour les prochains tours
        document.querySelector(".checkboxp2__select__2").disabled = true;
        document.querySelector(".checkboxp2__cross__2").disabled = true;
        //Reset pour prochain tour
        reset_round();
        testing_end_game();
    })
    //Sélection Ones
    document.querySelector(".checkboxp2__select__1").addEventListener("click", function(e) {
        e.stopPropagation();
        //Calcul et inscription du score
        player2ScoreFill.Ones = true; 
        //Boucle pour calculer le nombre de dés valeur 6
        let onesCounter = 0;
        for (i=0;i<5;i++) {
            if (dicesSelectedValues[i] === 1) {
                onesCounter++;
            }
        }
        player2ScoreValues.Ones = onesCounter; 
        document.querySelector(".player2__score__board__line__1value > p").innerText = player1ScoreValues.Ones;
        //Désactive la main pour les prochains tours
        document.querySelector(".checkboxp2__select__1").disabled = true;
        document.querySelector(".checkboxp2__cross__1").disabled = true;
        //Reset pour prochain tour
        reset_round();
        testing_end_game();
    })

//Evenement Player1 : Clic pour barrer une main après les 3 tours (12 clics possibles)
    //Cross Yam
    document.querySelector(".checkboxp2__cross__yam").addEventListener("click", function(e) {
        e.stopPropagation();
        //Calcul et inscription du score
        player2ScoreFill.Yam = true; 
        player2ScoreValues.Yam = 0; 
        document.querySelector(".player2__score__board__line__yamvalue > p").innerText = player2ScoreValues.Yam;
        //Désactive la main pour les prochains tours
        document.querySelector(".checkboxp2__cross__yam").disabled = true;
        document.querySelector(".checkboxp2__select__yam").disabled = true;
        //Reset pour prochain tour
        reset_round();
        testing_end_game();
    })
    //Cross Carré
    document.querySelector(".checkboxp2__cross__carre").addEventListener("click", function(e) {
        e.stopPropagation();
        //Calcul et inscription du score
        player2ScoreFill.Carre = true; 
        player2ScoreValues.Carre = 0; 
        document.querySelector(".player2__score__board__line__carrevalue > p").innerText = player2ScoreValues.Carre;
        //Désactive la main pour les prochains tours
        document.querySelector(".checkboxp2__cross__carre").disabled = true;
        document.querySelector(".checkboxp2__select__carre").disabled = true;
        //Reset pour prochain tour
        reset_round();
        testing_end_game();
    })
    //Cross Full
    document.querySelector(".checkboxp2__cross__full").addEventListener("click", function(e) {
        e.stopPropagation();
        //Calcul et inscription du score
        player2ScoreFill.Full = true; 
        player2ScoreValues.Full = 0; 
        document.querySelector(".player2__score__board__line__fullvalue > p").innerText = player2ScoreValues.Full;
        //Désactive la main pour les prochains tours
        document.querySelector(".checkboxp2__cross__full").disabled = true;
        document.querySelector(".checkboxp2__select__full").disabled = true;
        //Reset pour prochain tour
        reset_round();
        testing_end_game();
    })
    //Cross BigSuite
    document.querySelector(".checkboxp2__cross__bigsuite").addEventListener("click", function(e) {
        e.stopPropagation();
        //Calcul et inscription du score
        player2ScoreFill.Bigsuite = true; 
        player2ScoreValues.Bigsuite = 0; 
        document.querySelector(".player2__score__board__line__bigsuitevalue > p").innerText = player2ScoreValues.Bigsuite;
        //Désactive la main pour les prochains tours
        document.querySelector(".checkboxp2__cross__bigsuite").disabled = true;
        document.querySelector(".checkboxp2__select__bigsuite").disabled = true;
        //Reset pour prochain tour
        reset_round();
        testing_end_game();
    })
    //Cross SmallSuite
    document.querySelector(".checkboxp2__cross__smallsuite").addEventListener("click", function(e) {
        e.stopPropagation();
        //Calcul et inscription du score
        player2ScoreFill.Smallsuite = true; 
        player2ScoreValues.Smallsuite = 0; 
        document.querySelector(".player2__score__board__line__smallsuitevalue > p").innerText = player2ScoreValues.Smallsuite;
        //Désactive la main pour les prochains tours
        document.querySelector(".checkboxp2__cross__smallsuite").disabled = true;
        document.querySelector(".checkboxp2__select__smallsuite").disabled = true;
        //Reset pour prochain tour
        reset_round();
        testing_end_game();
    })
    //Cross Brelan
    document.querySelector(".checkboxp2__cross__brelan").addEventListener("click", function(e) {
        e.stopPropagation();
        //Calcul et inscription du score
        player2ScoreFill.Brelan = true; 
        player2ScoreValues.Brelan = 0; 
        document.querySelector(".player2__score__board__line__brelanvalue > p").innerText = player2ScoreValues.Brelan;
        //Désactive la main pour les prochains tours
        document.querySelector(".checkboxp2__cross__brelan").disabled = true;
        document.querySelector(".checkboxp2__select__brelan").disabled = true;
        //Reset pour prochain tour
        reset_round();
        testing_end_game();
    })
    //Cross Sixes
    document.querySelector(".checkboxp2__cross__6").addEventListener("click", function(e) {
        e.stopPropagation();
        //Calcul et inscription du score
        player2ScoreFill.Sixes = true; 
        player2ScoreValues.Sixes = 0; 
        document.querySelector(".player2__score__board__line__6value > p").innerText = player2ScoreValues.Sixes;
        //Désactive la main pour les prochains tours
        document.querySelector(".checkboxp2__cross__6").disabled = true;
        document.querySelector(".checkboxp2__select__6").disabled = true;
        //Reset pour prochain tour
        reset_round();
        testing_end_game();
    })
    //Cross Fives
    document.querySelector(".checkboxp2__cross__5").addEventListener("click", function(e) {
        e.stopPropagation();
        //Calcul et inscription du score
        player2ScoreFill.Fives = true; 
        player2ScoreValues.Fives = 0; 
        document.querySelector(".player2__score__board__line__5value > p").innerText = player2ScoreValues.Fives;
        //Désactive la main pour les prochains tours
        document.querySelector(".checkboxp2__cross__5").disabled = true;
        document.querySelector(".checkboxp2__select__5").disabled = true;
        //Reset pour prochain tour
        reset_round();
        testing_end_game();
    })
    //Cross Fours
    document.querySelector(".checkboxp2__cross__4").addEventListener("click", function(e) {
        e.stopPropagation();
        //Calcul et inscription du score
        player2ScoreFill.Fours = true; 
        player2ScoreValues.Fours = 0; 
        document.querySelector(".player2__score__board__line__4value > p").innerText = player2ScoreValues.Fours;
        //Désactive la main pour les prochains tours
        document.querySelector(".checkboxp2__cross__4").disabled = true;
        document.querySelector(".checkboxp2__select__4").disabled = true;
        //Reset pour prochain tour
        reset_round();
        testing_end_game();
    })
    //Cross Threes
    document.querySelector(".checkboxp2__cross__3").addEventListener("click", function(e) {
        e.stopPropagation();
        //Calcul et inscription du score
        player2ScoreFill.Threes = true; 
        player2ScoreValues.Threes = 0; 
        document.querySelector(".player2__score__board__line__3value > p").innerText = player2ScoreValues.Threes;
        //Désactive la main pour les prochains tours
        document.querySelector(".checkboxp2__cross__3").disabled = true;
        document.querySelector(".checkboxp2__select__3").disabled = true;
        //Reset pour prochain tour
        reset_round();
        testing_end_game();
    })
    //Cross Twos
    document.querySelector(".checkboxp2__cross__2").addEventListener("click", function(e) {
        e.stopPropagation();
        //Calcul et inscription du score
        player2ScoreFill.Twos = true; 
        player2ScoreValues.Twos = 0; 
        document.querySelector(".player2__score__board__line__2value > p").innerText = player2ScoreValues.Twos;
        //Désactive la main pour les prochains tours
        document.querySelector(".checkboxp2__cross__2").disabled = true;
        document.querySelector(".checkboxp2__select__2").disabled = true;
        //Reset pour prochain tour
        reset_round();
        testing_end_game();
    })
    //Cross Ones
    document.querySelector(".checkboxp2__cross__1").addEventListener("click", function(e) {
        e.stopPropagation();
        //Calcul et inscription du score
        player2ScoreFill.Ones = true;
        player2ScoreValues.Ones = 0; 
        document.querySelector(".player2__score__board__line__1value > p").innerText = player2ScoreValues.Ones;
        //Désactive la main pour les prochains tours
        document.querySelector(".checkboxp2__cross__1").disabled = true;
        document.querySelector(".checkboxp2__select__1").disabled = true;
        //Reset pour prochain tour
        reset_round();
        testing_end_game();
    })

//Evenement : Clic pour refaire une partie (rematch)
    document.querySelector(".game__end__button").addEventListener("click", function(e) {
        e.stopPropagation();
        reset_game();
    })



