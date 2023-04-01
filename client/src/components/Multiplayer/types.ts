export class HangmanPlayer {
  public name: string;
  public points: number;
  public currentTurn: boolean;
  public ready: boolean;

  constructor(name: string, points = 0, ready = false) {
    this.name = name;
    this.points = points;
    this.currentTurn = false;
    this.ready = ready;
  }
}
