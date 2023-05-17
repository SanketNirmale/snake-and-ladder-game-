import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-congratulation-modal',
  templateUrl: './congratulation-modal.component.html',
  styleUrls: ['./congratulation-modal.component.css']
})
export class CongratulationModalComponent {
  @Input()
  winner!: number; // The winner player number
  showModal = false;

  constructor() { }

  ngOnInit() {
  }

  openModal(playerNumber: number) {
    this.winner = playerNumber;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
