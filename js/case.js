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

export { Case };