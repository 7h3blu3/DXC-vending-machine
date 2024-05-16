import { Component, EventEmitter, Output } from '@angular/core';
import { VendingService } from '../../services/vending/vending.service';

@Component({
  selector: 'app-coin-insert',
  templateUrl: './coin-insert.component.html',
  styleUrls: ['./coin-insert.component.css']
})
export class CoinInsertComponent {
  @Output() coinInserted = new EventEmitter<number>();

  constructor(private vendingService: VendingService) {}

  insertCoin(coin: number) {
    if (this.isAcceptedCoin(coin)) {
      this.coinInserted.emit(coin);
      this.vendingService.insertCoin(coin);
    } else {
      alert('Invalid coin denomination. Accepted coins are 0.10, 0.20, 0.50, and 1.00 BGN.');
    }
  }

  isAcceptedCoin(coin: number): boolean {
    const acceptedCoins = [0.10, 0.20, 0.50, 1.00];
    return acceptedCoins.includes(coin);
  }
}
