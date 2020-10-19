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


const Game = class Game {
  
  #arrayCase = [];
  #player1 = new Player(`<i class="fa fa-times fa-3x"></i>`);
  #player2 = new Player(`<i class="fa fa-circle fa-3x"></i>`);

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
    if (!theCase.innerHTML[1]) {
      if (this.currentTurn % 2 === 0) {
        theCase.innerHTML = this.#player1.symbole;
      } else {
        theCase.innerHTML = this.#player2.symbole;
      }
      this.currentTurn++;
      this.verifyIfEnd();
    }
  }

  verifyIfEnd() {
    //si 
    let boardCases = document.querySelectorAll('.case')
    let caseJ1 = [];
    let caseJ2 = [];
    
    for (const nodeCase of boardCases) {
      if (nodeCase.innerHTML === this.#player1.symbole) {
        caseJ1.push(nodeCase.dataset.location);
      } else if (nodeCase.innerHTML === this.#player2.symbole) {
        caseJ2.push(nodeCase.dataset.location);
      }
    }

    // console.log(caseJ1, caseJ2);
  
    if (caseJ1.includes('A1') && caseJ1.includes('B1') && caseJ1.includes('C1') || caseJ1.includes('A2') && caseJ1.includes('B2') && caseJ1.includes('C2') || caseJ1.includes('A3') && caseJ1.includes('B3') && caseJ1.includes('C3') || caseJ1.includes('A1') && caseJ1.includes('A2') && caseJ1.includes('A3') || caseJ1.includes('B1') && caseJ1.includes('B2') && caseJ1.includes('B3') || caseJ1.includes('C1') && caseJ1.includes('C2') && caseJ1.includes('C3') || caseJ1.includes('A1') && caseJ1.includes('B2') && caseJ1.includes('C3') || caseJ1.includes('A3') && caseJ1.includes('B2') && caseJ1.includes('C1')) {
      console.log('j1');
    } else if (caseJ2.includes('A1') && caseJ2.includes('B1') && caseJ2.includes('C1') || caseJ2.includes('A2') && caseJ2.includes('B2') && caseJ2.includes('C2') || caseJ2.includes('A3') && caseJ2.includes('B3') && caseJ2.includes('C3') || caseJ2.includes('A1') && caseJ2.includes('A2') && caseJ2.includes('A3') || caseJ2.includes('B1') && caseJ2.includes('B2') && caseJ2.includes('B3') || caseJ2.includes('C1') && caseJ2.includes('C2') && caseJ2.includes('C3') || caseJ2.includes('A1') && caseJ2.includes('B2') && caseJ2.includes('C3') || caseJ2.includes('A3') && caseJ2.includes('B2') && caseJ2.includes('C1')) {
      console.log('j2');
    }
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