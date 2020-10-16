const Player = class Player {

  constructor(symbole) {
    this.symbole = symbole;
  }

}













const Case = class Case {

  constructor(BoardCase) {
    this.case = BoardCase;
  }

  addSymboleInCase() {
    this.case.addEventListener('click', () => {
      game.gameTurn(this.case);
    });
  }

}










// const Board = class Board {

//   constructor() {
//     this.cases = document.querySelectorAll('.case');
//   }

//   //ici : methode avec boucle sur cases => Case

// }










const Game = class Game {
  
  #arrayCase = [];
  #player1 = new Player('X');
  #player2 = new Player('O');

  constructor() {
    this.currentTurn = 0;
  }

  startGame() {
    let boardCases = document.querySelectorAll('.case');

    boardCases.forEach(boardCase => {
      this.#arrayCase.push(new Case(boardCase));
    });
    this.#arrayCase.forEach(boardCase => {
      boardCase.addSymboleInCase(this.#player1, this.#player2);
    });
  }

  whoShouldPLay() {
    //method qui affiche à l'utilisateur qui doit jouer 
  }

  gameTurn(theCase) {
    //vérifier le player (paire / impaire)
    //lancer les écouteurs avec le bon player (pair ou impair)
    if (this.currentTurn % 2 === 0) {
      theCase.innerHTML = this.#player1.symbole;
    } else {
      theCase.innerHTML = this.#player2.symbole;
    }
    this.currentTurn++;

    this.verifyIfEnd();
  }

  verifyIfEnd() {
    //si 
    let boardCases = document.querySelectorAll('.case')
    let caseJ1 = [];
    let caseJ2 = [];
    
    for (const nodeCase of boardCases) {
      if (nodeCase.innerHTML === "X") {
        caseJ1.push(nodeCase.dataset.location);
      } else if (nodeCase.innerHTML === "O") {
        caseJ2.push(nodeCase.dataset.location);
      }
    }

    // console.log(caseJ1, caseJ2);
  
    // if (condition) {
      // Faire une condition qui teste si les combinaisons existent => includes && && && || && && && || 
    // }
    //boucler gameturn, et si end, finir !

    // BoardCase.addSymboleInCase(player1);


    //egality ? 
    //win ?
  }

  restartGame() {
  }

}

const game = new Game();

game.startGame();




//ne pas oublier

// Peut-on changer le symbole d'une case après le clic