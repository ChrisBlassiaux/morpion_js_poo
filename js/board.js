const Player = class Player {

  constructor(symbole) {
    this.symbole = symbole;
  }

}













const Case = class Case {

  constructor(BoardCase) {
    this.case = BoardCase;
  }

  addSymboleInCase(player) {
    this.case.addEventListener('click', () => { 
      this.case.innerHTML = player.symbole;
    });
  }

}










const Board = class Board {

  constructor() {
    this.cases = document.querySelectorAll('.case');
  }

  //ici : methode avec boucle sur cases => Case

}










const Game = class Game {

  constructor() {
   
  }

  startGame() {
    const player1 = new Player('X');
    const player2 = new Player('O');

    const boardCase = new Case(document.querySelector('.case'));
    // const board = new Board();
    boardCase.addSymboleInCase(player1);
  }

  verifyIfEnd() {
    BoardCase.addSymboleInCase(player1);
    //egality ? 
    //win ?
  }

  restartGame() {
  }

}

const game = new Game();

game.startGame()

