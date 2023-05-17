import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { CongratulationModalComponent } from '../congratulation-modal/congratulation-modal.component';


@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {
  // Define the game board properties
  gridSize = 10; // The size of the game board (10x10)
  currentPlayer = 1; // The current player (1 or 2)
  playerPositions = [1, 1]; // The positions of the two players
  winningSquare = 100; // The square number to win the game
  diceValue: number = 1; // Current dice value
  @ViewChild(CongratulationModalComponent)
  congratulationModal!: CongratulationModalComponent;

  // Define ladder positions
  ladders: { start: number, end: number }[] = [ 
    { start: 2, end: 38 },
    { start: 8, end: 31 },
    { start: 21, end:42 },
    { start: 46, end: 84 },
    { start: 51, end: 67 },
    { start: 71, end: 91 },
    { start: 80, end: 99 }
  ];

  // Define snake positions
  snakes: { start: number, end: number }[] = [ 
    { start: 33, end: 5},
    { start: 63, end: 16 },
    { start: 54, end: 34 },
    { start: 93, end: 74 },
    { start: 97, end: 61 }
  ];

  ngOnInit() {
  }

  // Simulate rolling the dice and move the current player accordingly
  rollDice() {
    this.diceValue = Math.floor(Math.random() * 6) + 1; 
    // Generate a random dice value between 1 and 6
    this.movePlayer(this.diceValue);
  }
 
  nextPlayer(){
    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1; 
  }
  movePlayer(steps: number) {
    const currentPlayerPosition = this.playerPositions[this.currentPlayer - 1];
    const newPosition = currentPlayerPosition + steps;

    // Check if the new position exceeds the winning square
    if (newPosition > this.winningSquare) {
      this.nextPlayer();
      return; // Do not move the player
    }

    // Update the player position
    this.playerPositions[this.currentPlayer - 1] = this.getNewPositionAfterSnakeOrLadder(newPosition);

    // Check if the game is won
    if (newPosition === this.winningSquare) {
      console.log('Player ' + this.currentPlayer + ' wins!');
      this.congratulationModal.openModal(this.currentPlayer);
      // Open the congratulation modal
      // Perform any necessary actions when the game is won
    }

    // Switch to the next player
    this.nextPlayer(); 
  }

  getSquares(): number[] {
    const squares = [100,99,98,97,96,95,94,93,92,91,81,82,83,84,85,86,87,88,89,90,80,79,78,77,76,75,74,73,72,71,61,62,63,64,65,66,67,68,69,70,60,59,58,57,56,55,54,53,52,51,41,42,43,44,45,46,47,48,49,50,40,39,38,37,36,35,34,33,32,31,21,22,23,24,25,26,27,28,29,30,20,19,18,17,16,15,14,13,12,11,1,2,3,4,5,6,7,8,9,10];
    
    return squares;
  }

  getNewPositionAfterSnakeOrLadder(position: number): number {
    // Check if the new position has a ladder or snake
    for (const ladder of this.ladders) {
      if (position === ladder.start) {
        return ladder.end; // Climb the ladder
      }
    }

    for (const snake of this.snakes) {
      if (position === snake.start) {
        return snake.end; // Slide down the snake
      }
    }

    return position; // No ladder or snake at the position
  }
}
