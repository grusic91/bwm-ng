import { Component, Input } from '@angular/core';
import { Rental } from 'src/app/rental/shared/rental.model';

@Component({
  selector: 'app-rental-card',
  templateUrl: './rental-card.component.html',
  styleUrls: ['./rental-card.component.scss']
})
export class RentalCardComponent {
  @Input() rental: Rental;
}
