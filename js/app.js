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



  const Player = class Player {

    constructor(symbole) {
      this.symbole = symbole;
    }
  
  }
  




  const Game = class Game {
  
    #arrayCase = [];
    #counterVictoriesJ1 = 0;
    #counterVictoriesJ2 = 0;
    #player1 = new Player(`<i class="fa fa-times fa-3x"></i>`);
    #player2 = new Player(`<i class="fa fa-circle fa-3x"></i>`);
    #game = true;
  
    constructor() {
      this.currentTurn = 0;
      this.winner = 0;
    }
  
    startOrRestartGame() {
  
      let btnRestart = document.querySelector('.btn');
      
      btnRestart.addEventListener('click', function() {
  
        let boardCases = document.querySelectorAll('.case');
  
        boardCases.forEach(boardCase => {
          boardCase.innerHTML = '';
        });
        
        // let alert = document.querySelector('.alert-step');
        // alert.innerHTML = `Le joueur ${game.#game % 2 === 0  ? '1' : '2'} doit jouer !`;
  
        game.#game = true;
        game.winner = 0;
        console.log(game.winner);
        game.displayStepOfGame();
      })
  
      let boardCases = document.querySelectorAll('.case');
  
      boardCases.forEach(boardCase => {
        this.#arrayCase.push(new Case(boardCase));
      });
      this.#arrayCase.forEach(boardCase => {
        boardCase.addSymboleInCase();
      });
    }
  
    ifAllCasesAreBusy() {
      let boardCases = document.querySelectorAll('.case');
      let count = 0;
      for (const nodeCase of boardCases) {
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
       let alert = document.querySelector('.alert-step');
  
       console.log(this.winner);
       if (this.winner === 1) {
        alert.innerHTML = 'Le joueur 1 a gagné !!!';
       } else if (this.winner === 2) {
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
      //vérifier le player (paire / impaire)
      //lancer les écouteurs avec le bon player (pair ou impair)
      let alertBusy = document.querySelector('.alert-busy');
      if (this.#game) {
        if (!theCase.innerHTML[0]) {
          if (this.currentTurn % 2 === 0) {
            theCase.innerHTML = this.#player1.symbole;
          } else {
            theCase.innerHTML = this.#player2.symbole;
          }
          this.currentTurn++;
          this.verifyIfEnd();
          this.displayStepOfGame();
          alertBusy.style.display = 'none';
        } else {
          alertBusy.style.display = 'block';
        }
      }
    }
  
    verifyIfEnd() {
      let boardCases = document.querySelectorAll('.case');
      let caseJ1 = [];
      let caseJ2 = [];
      
      for (const nodeCase of boardCases) {
        if (nodeCase.innerHTML === this.#player1.symbole) {
          caseJ1.push(nodeCase.dataset.location);
        } else if (nodeCase.innerHTML === this.#player2.symbole) {
          caseJ2.push(nodeCase.dataset.location);
        }
      }
      if (caseJ1.includes('A1') && caseJ1.includes('B1') && caseJ1.includes('C1') || caseJ1.includes('A2') && caseJ1.includes('B2') && caseJ1.includes('C2') || caseJ1.includes('A3') && caseJ1.includes('B3') && caseJ1.includes('C3') || caseJ1.includes('A1') && caseJ1.includes('A2') && caseJ1.includes('A3') || caseJ1.includes('B1') && caseJ1.includes('B2') && caseJ1.includes('B3') || caseJ1.includes('C1') && caseJ1.includes('C2') && caseJ1.includes('C3') || caseJ1.includes('A1') && caseJ1.includes('B2') && caseJ1.includes('C3') || caseJ1.includes('A3') && caseJ1.includes('B2') && caseJ1.includes('C1')) {
        this.#counterVictoriesJ1++;
        this.displayVictories();
        this.#game = false;
        this.winner = 1;
        
      } else if (caseJ2.includes('A1') && caseJ2.includes('B1') && caseJ2.includes('C1') || caseJ2.includes('A2') && caseJ2.includes('B2') && caseJ2.includes('C2') || caseJ2.includes('A3') && caseJ2.includes('B3') && caseJ2.includes('C3') || caseJ2.includes('A1') && caseJ2.includes('A2') && caseJ2.includes('A3') || caseJ2.includes('B1') && caseJ2.includes('B2') && caseJ2.includes('B3') || caseJ2.includes('C1') && caseJ2.includes('C2') && caseJ2.includes('C3') || caseJ2.includes('A1') && caseJ2.includes('B2') && caseJ2.includes('C3') || caseJ2.includes('A3') && caseJ2.includes('B2') && caseJ2.includes('C1')) {
        this.#counterVictoriesJ2++;
        this.displayVictories();
        this.#game = false;
        this.winner = 2;
      }
    }
  
    displayVictories() {
      let victories1 = document.querySelector('.victories-1');
      let victories2 = document.querySelector('.victories-2');
  
      victories1.innerHTML = this.#counterVictoriesJ1;
      console.log(this.#counterVictoriesJ1);
      console.log(this.#counterVictoriesJ2);
      victories2.innerHTML = this.#counterVictoriesJ2;
    }
  }

const game = new Game();

game.startOrRestartGame();
