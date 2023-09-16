
/*----------- Variables & constantes ----------------- */
const handsArray = ["rock" , "paper" , "scissors"];
let userScore = 0;
let iaScore = 0;
let winGame = "";
let userHand = "";
let iaHand = "";
let userChoice = document.querySelector(".user__board__play__img > img");
let iaChoice = document.querySelector(".IA__board__play__img > img")
let userPlayedArray = [];
let iaPlayedArray = [];
let winsArray = [];
let iaModeValue = "Random";


// Définir le mode de l'IA
let iaMode = document.querySelector("#mode"); //On sélectionne le formulaire #mode
iaMode.addEventListener("change" , (event) => { //On écoute un évènement "change" pour lequel on récupère la valeur target
        iaModeValue = event.target.value;
        console.log("Changement de mode de l'IA : " , iaModeValue);
        reset();
})

// Fonctions des deux modes de l'IA : 
function random() {

        let handsIndex = Math.floor(Math.random()*handsArray.length);
        iaHand = handsArray[handsIndex];
        return iaHand;
        }

function expert() {
        
        if (userPlayedArray.length == 0) {
                iaHand = "paper"; // l'IA commence par papier car c'est le signe le moins joué
        }

        else if (userPlayedArray[0] == userPlayedArray[1] ) {  // L'utilisateur ne joue jamais 3 fois la même main.
                switch (userPlayedArray[0]) {
                        case "rock" : iaHand = "scissors";
                        break
                        case "paper" : iaHand = "rock";
                        break
                        case "scissors" : iaHand = "paper";
                        break
                }
        }
        else if (winsArray[0] == "User") { // Si l'utilisateur gagne, il va rejouer le même signe
                switch (userPlayedArray[0]) {
                        case "rock" : iaHand = "paper";
                        break
                        case "paper" : iaHand = "scissors";
                        break
                        case "scissors" : iaHand = "rock";
                        break
                } 
        }
        else if (winsArray[0] == "IA") { // Si l'utilisateur perd, il va prendre le signe qui l'a battu.
                switch (iaPlayedArray[0]) {
                        case "rock" : iaHand = "paper";
                        break
                        case "paper" : iaHand = "scissors";
                        break
                        case "scissors" : iaHand = "rock";
                        break
                }  
        }
        else {random()};
}

function reset() {
        iaScore = 0;
        userScore = 0;
        winGame = 0;
        userPlayedArray.length = 0;
        iaPlayedArray.length = 0;
        winsArray.length = 0;
        document.querySelector(".user__title__score__variable").innerText = 0;
        document.querySelector(".IA__title__score__variable").innerText = 0;
        document.querySelector(".result").style.display = "none";
        userChoice.src = "";
        userChoice.title = "";
        iaChoice.src = "";
        iaChoice.title = "";
        document.querySelector(".user__board__play").style.border = "none";
        document.querySelector(".IA__board__play").style.border = "none";
}

// CHOIX DE LA MAIN UTILISATEUR - Déclenchement de l'évènement

// L'utilisateur joue Rock
document.querySelector(".user__board__select__rock")
        .addEventListener("click" , function(event) {

                event.stopPropagation();
                event.preventDefault();

                document.getElementById("audio_hand").play(); // Joue l'audio "audio_hand"

                // Main de l'utilisateur
                userHand = "rock";
                console.log("User plays : " , userHand);
                userChoice.src = "Images/rock_big.png"; // Chargement de l'image de la main jouée
                userChoice.title = "User plays rock !";
                
                // Main de l'IA
                // Random
                if (iaModeValue === "Random") {
                        console.log("Mode Random");
                        random();
                        console.log("IA plays : " , iaHand);
                        iaChoice.src = "Images/" + iaHand + "_big.png"; // Chargement de l'image de la main jouée random
                        iaChoice.title = "IA plays " + iaHand + " !";
                }

                //Expert
                else {
                        console.log("Mode Expert");
                        expert();
                        userPlayedArray.unshift(userHand); // Historique des mains jouées par le user
                        iaPlayedArray.unshift(iaHand); // Historique des mains jouées par l'IA'
                        console.log("IA plays : " , iaHand);
                        console.log("userPlayedArray : " , userPlayedArray);
                        console.log("iaPlayedArray : " , iaPlayedArray);

                        iaChoice.src = "Images/" + iaHand + "_big.png"; // Chargement de l'image de la main jouée par l'IA
                        iaChoice.title = "IA plays " + iaHand + " !";
                }
                
                // Le duel et la maj des scores
                if (iaHand === userHand) {
                        userScore = userScore;
                        iaScore = iaScore;
                        winGame = "Egalité";
                        document.querySelector(".user__board__play").style.border = "solid 10px black";
                        document.querySelector(".IA__board__play").style.border = "solid 10px black";
                }
                else if (iaHand === "paper") {
                        ++iaScore;
                        winGame = "IA";
                        document.querySelector(".user__board__play").style.border = "solid 10px red";
                        document.querySelector(".IA__board__play").style.border = "solid 10px blue";
                }
                else {
                        ++userScore;
                        winGame = "User";
                        document.querySelector(".user__board__play").style.border = "solid 10px blue";
                        document.querySelector(".IA__board__play").style.border = "solid 10px red";
                }
                
                winsArray.unshift(winGame); // Historique des mains gagnantes
                console.log("winsArray : " , winsArray)

                document.querySelector(".user__title__score__variable").innerText = userScore;
                document.querySelector(".IA__title__score__variable").innerText = iaScore;

                //Conditions de fin de partie
                if (userScore == 3) {
                        document.querySelector(".result__text__variable").innerText = "USER ";
                        document.querySelector(".result").style.display = "flex";
                        document.getElementById("audio_win").play(); // Joue l'audio "audio_win"
                }

                else if (iaScore == 3) {
                        document.querySelector(".result__text__variable").innerText = "IA ";
                        document.querySelector(".result").style.display = "flex";
                        document.getElementById("audio_lose").play(); // Joue l'audio "audio_lose"
                }
        });

// L'utilisateur joue Paper
document.querySelector(".user__board__select__paper")
        .addEventListener("click" , function(event) {

                event.stopPropagation();
                event.preventDefault();

                document.getElementById("audio_hand").play(); // Joue l'audio "audio_hand"
            
                // Main de l'utilisateur
                userHand = "paper";
                console.log("User plays : " , userHand);
                userChoice.src = "Images/paper_big.png";
                userChoice.title = "User plays paper !";

                // Main de l'IA
                // Random
                if (iaModeValue === "Random") {
                        console.log("Mode Random");
                        random();
                        console.log("IA plays : " , iaHand);
                        iaChoice.src = "Images/" + iaHand + "_big.png"; // Chargement de l'image de la main jouée random
                        iaChoice.title = "IA plays " + iaHand + " !";
                }

                //Expert
                else {
                        console.log("Mode Expert");
                        expert();
                        userPlayedArray.unshift(userHand); // Historique des mains jouées par le user
                        iaPlayedArray.unshift(iaHand); // Historique des mains jouées par l'IA'
                        console.log("IA plays : " , iaHand);
                        console.log("userPlayedArray : " , userPlayedArray);
                        console.log("iaPlayedArray : " , iaPlayedArray);

                        iaChoice.src = "Images/" + iaHand + "_big.png"; // Chargement de l'image de la main jouée par l'IA
                        iaChoice.title = "IA plays " + iaHand + " !";
                }

                // Le duel et maj des scores
                if (iaHand === userHand) {
                        userScore = userScore;
                        iaScore = iaScore;
                        winGame = "Egalité";
                        document.querySelector(".user__board__play").style.border = "solid 10px black";
                        document.querySelector(".IA__board__play").style.border = "solid 10px black";
                }
                else if (iaHand === "scissors") {
                        ++iaScore;
                        winGame = "IA";
                        document.querySelector(".user__board__play").style.border = "solid 10px red";
                        document.querySelector(".IA__board__play").style.border = "solid 10px blue";
                }
                else {
                        ++userScore;
                        winGame = "User";
                        document.querySelector(".user__board__play").style.border = "solid 10px blue";
                        document.querySelector(".IA__board__play").style.border = "solid 10px red";
                }

                winsArray.unshift(winGame); // Historique des mains gagnantes
                console.log("winsArray : " , winsArray)
                
                document.querySelector(".user__title__score__variable").innerText = userScore;
                document.querySelector(".IA__title__score__variable").innerText = iaScore;

                // Condition de fin de partie
                if (userScore == 3) {
                        document.querySelector(".result__text__variable").innerText = "USER ";
                        document.querySelector(".result").style.display = "flex";
                        document.getElementById("audio_win").play(); // Joue l'audio "audio_win"
                }

                else if (iaScore == 3) {
                        document.querySelector(".result__text__variable").innerText = "IA ";
                        document.querySelector(".result").style.display = "flex";
                        document.getElementById("audio_lose").play(); // Joue l'audio "audio_lose"
                }
        });

// L'utilisateur joue Scissors
document.querySelector(".user__board__select__scissors")
        .addEventListener("click" , function(event) {

                event.stopPropagation();
                event.preventDefault();

                document.getElementById("audio_hand").play(); // Joue l'audio "audio_hand"
        
                userHand = "scissors";
                console.log("User plays : " , userHand);

                // Main de l'utilisateur
                userChoice.src = "Images/scissors_big.png";
                userChoice.title = "User plays scissors !";

                // Main de l'IA
                // Random
                if (iaModeValue === "Random") {
                        console.log("Mode Random");
                        random();
                        console.log("IA plays : " , iaHand);
                        iaChoice.src = "Images/" + iaHand + "_big.png"; // Chargement de l'image de la main jouée random
                        iaChoice.title = "IA plays " + iaHand + " !";
                }

                //Expert
                else {
                        console.log("Mode Expert");
                        expert();
                        userPlayedArray.unshift(userHand); // Historique des mains jouées par le user
                        iaPlayedArray.unshift(iaHand); // Historique des mains jouées par l'IA'
                        console.log("IA plays : " , iaHand);
                        console.log("userPlayedArray : " , userPlayedArray);
                        console.log("iaPlayedArray : " , iaPlayedArray);

                        iaChoice.src = "Images/" + iaHand + "_big.png"; // Chargement de l'image de la main jouée par l'IA
                        iaChoice.title = "IA plays " + iaHand + " !";
                }

                // Le duel et maj des scores
                if (iaHand === userHand) {
                        userScore = userScore;
                        iaScore = iaScore;
                        winGame = "Egalité";
                        document.querySelector(".user__board__play").style.border = "solid 10px black";
                        document.querySelector(".IA__board__play").style.border = "solid 10px black";
                }
                else if (iaHand === "rock") {
                        ++iaScore;
                        winGame = "IA";
                        document.querySelector(".user__board__play").style.border = "solid 10px red";
                        document.querySelector(".IA__board__play").style.border = "solid 10px blue";
                }
                else {
                        ++userScore;
                        winGame = "User";
                        document.querySelector(".user__board__play").style.border = "solid 10px blue";
                        document.querySelector(".IA__board__play").style.border = "solid 10px red";
                }

                winsArray.unshift(winGame); // Historique des mains gagnantes
                console.log("winsArray : " , winsArray)
                
                document.querySelector(".user__title__score__variable").innerText = userScore;
                document.querySelector(".IA__title__score__variable").innerText = iaScore;

                // Conditions de fin de partie
                if (userScore == 3) {
                        document.querySelector(".result__text__variable").innerText = "USER ";
                        document.querySelector(".result").style.display = "flex";
                        document.getElementById("audio_win").play(); // Joue l'audio "audio_win"
                }

                else if (iaScore == 3) {
                        document.querySelector(".result__text__variable").innerText = "IA ";
                        document.querySelector(".result").style.display = "flex";
                        document.getElementById("audio_lose").play(); // Joue l'audio "audio_lose"
                }
        });

// Reset des scores
        document.querySelector(".result")
                .addEventListener("click" , function(event) {
        
                        event.stopPropagation();
                        event.preventDefault();
                        reset();
                })