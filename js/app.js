


const Case = class Case {

  constructor(BoardCase) {
    this.case = BoardCase; // Nœud HTML de la case
  }
 
  addSymboleInCase() { // Méthode qui ajoute un événement sur la case

    this.case.addEventListener('click', () => {
      game.gameTurn(this.case);
    });

  }
}



const Player = class Player {
    constructor(symbole) {
      this.symbole = symbole;
    };
}




const Game = class Game {

  #arrayCase = []; // Array qui va contenir tout les nœud des cases
  #counterVictoriesJ1 = 0; 
  #counterVictoriesJ2 = 0;

  #player1 = new Player(`<i class="fa fa-times fa-3x"></i>`); // Instanciation d'un joueur avec le symbole X en paramètre
  #player2 = new Player(`<i class="fa fa-circle fa-3x"></i>`); // Instanciation d'un second joueur avec le symbole X en paramètre

  #game = true; // rend la pârtie active

  #winner = 0;

  constructor() {
    this.currentTurn = 0;
  }

  startGame() { // Methode qui initialise la game

    let boardCases = document.querySelectorAll('.case'); // Selection de toute les cases

    boardCases.forEach(boardCase => {
      this.#arrayCase.push(new Case(boardCase)); // Initialise un objet Case pour chaque cases et les met dans un tableau
    });

    this.#arrayCase.forEach(boardCase => {
      boardCase.addSymboleInCase(); // Met un écouteur d'évènement 'click' sur chaque case
    });

  }


  buttonRestart() {

    let btnRestart = document.querySelector('.btn'); // Selection du bouton restart
    
    btnRestart.addEventListener('click', function() {

      let boardCases = document.querySelectorAll('.case'); // Selection de toute les cases

      boardCases.forEach(boardCase => {
        boardCase.innerHTML = ''; // Enlève les symboles dans chaque case
      });
      
      game.#game = true; // rend la pârtie active

      game.#winner = 0; // Reset la variable qui contient le gagnant actuel
      
      game.displayStepOfGame(); // Affiche qui doit jouer
    })

  }

  // Cette methode Vérifie si toute les case sont utilisé
  ifAllCasesAreBusy() {
    let boardCases = document.querySelectorAll('.case'); // selection de toute les cases

    let count = 0; // variable qui nous sert a compter le nombre de case utilisée

    for (const nodeCase of boardCases) { // Boucle qui parcourt les cases
      if (nodeCase.innerHTML[0] != undefined) {
        count++;
      }; 
    };

    if (count === 9) {
      return true;
    };
  }

  //method qui affiche à l'utilisateur qui doit jouer
  displayStepOfGame() {

     let alert = document.querySelector('.alert-step'); // Selection de la div où le tour sera affiché

     if (this.#winner === 1) {
      alert.innerHTML = 'Le joueur 1 a gagné !!!';
     } else if (this.#winner === 2) {
      alert.innerHTML = 'Le joueur 2 a gagné !!!';
     } else if (this.ifAllCasesAreBusy()) { 
      alert.innerHTML = 'La partie est nulle, comme vous.';
     } else if (this.currentTurn % 2 === 0) {
        alert.innerHTML = 'Le joueur 1 doit jouer !';
     } else if (this.currentTurn % 2 != 0) {
        alert.innerHTML = 'Le joueur 2 doit jouer !';
     }
  }
  

  gameTurn(theCase) {

    let alertBusy = document.querySelector('.alert-busy'); // Selection de la div contenant le message d'alerte

    if (this.#game) { // Vérifie si la partie est active

      if (!theCase.innerHTML[0]) { // Vérifie si la case contient déjà un symbole a l'interieur

        if (this.currentTurn % 2 === 0) { // Choisie le tour du joueur en fonction d'une variable qui est incrémenté a chaque tours
          theCase.innerHTML = this.#player1.symbole;
        } else {
          theCase.innerHTML = this.#player2.symbole;
        }
        this.currentTurn++;

        this.verifyIfEnd(); 
        this.displayStepOfGame();

        alertBusy.style.display = 'none'; // Enlève le message d'erreur si il est affiché
      } else {
        alertBusy.style.display = 'block'; // affiche le message qui signifie que la case est occupée
      };
    };
  }


  // Methode qui va permettre de récupérer la position des cases des joueurs
  getPositionOfPlayerCases() {

    let boardCases = document.querySelectorAll('.case'); // Selection de toutes les cases

    let caseJ1 = []; // Variable qui va contenir les position des cases du joueur 1
    let caseJ2 = []; // Variable qui va contenir les position des cases du joueur 2
    
    for (const nodeCase of boardCases) { 
      if (nodeCase.innerHTML === this.#player1.symbole) {
        caseJ1.push(nodeCase.dataset.location);
      } else if (nodeCase.innerHTML === this.#player2.symbole) {
        caseJ2.push(nodeCase.dataset.location);
      }
    }

    return [caseJ1, caseJ2]
  }



  verifyIfEnd() {

    let caseJ1 = this.getPositionOfPlayerCases()[0];
    let caseJ2 = this.getPositionOfPlayerCases()[1];

    // verifie si le joueur 1 a gagné
    if (caseJ1.includes('A1') && caseJ1.includes('B1') && caseJ1.includes('C1') || caseJ1.includes('A2') && caseJ1.includes('B2') && caseJ1.includes('C2') || caseJ1.includes('A3') && caseJ1.includes('B3') && caseJ1.includes('C3') || caseJ1.includes('A1') && caseJ1.includes('A2') && caseJ1.includes('A3') || caseJ1.includes('B1') && caseJ1.includes('B2') && caseJ1.includes('B3') || caseJ1.includes('C1') && caseJ1.includes('C2') && caseJ1.includes('C3') || caseJ1.includes('A1') && caseJ1.includes('B2') && caseJ1.includes('C3') || caseJ1.includes('A3') && caseJ1.includes('B2') && caseJ1.includes('C1')) {

      this.#counterVictoriesJ1++; // incrémente le tableau des scores 

      this.displayVictories(); // affiche que le joueur 1 a gagné 

      this.#game = false; // Désactive la partie

      this.#winner = 1;

    // verifie si le joueur 2 a gagné
    } else if (caseJ2.includes('A1') && caseJ2.includes('B1') && caseJ2.includes('C1') || caseJ2.includes('A2') && caseJ2.includes('B2') && caseJ2.includes('C2') || caseJ2.includes('A3') && caseJ2.includes('B3') && caseJ2.includes('C3') || caseJ2.includes('A1') && caseJ2.includes('A2') && caseJ2.includes('A3') || caseJ2.includes('B1') && caseJ2.includes('B2') && caseJ2.includes('B3') || caseJ2.includes('C1') && caseJ2.includes('C2') && caseJ2.includes('C3') || caseJ2.includes('A1') && caseJ2.includes('B2') && caseJ2.includes('C3') || caseJ2.includes('A3') && caseJ2.includes('B2') && caseJ2.includes('C1')) {

      this.#counterVictoriesJ2++; // incrémente le tableau des scores

      this.displayVictories(); // affiche que le joueur 2 a gagné

      this.#game = false; // Désactive la partie

      this.#winner = 2; 
    }

  }

  displayVictories() {

    let victories1 = document.querySelector('.victories-1'); // selection du tableau de victoire 
    let victories2 = document.querySelector('.victories-2');

    victories1.innerHTML = this.#counterVictoriesJ1; // affichage des scores
    victories2.innerHTML = this.#counterVictoriesJ2;
  }
}


const game = new Game();

game.startGame();
game.buttonRestart();
