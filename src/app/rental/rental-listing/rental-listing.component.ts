import { Component } from '@angular/core';

@Component({
    selector: 'rental-listing',
    templateUrl: './rental-listing.component.html',
    styleUrls: ['./rental-listing.component.scss']
})

export class RentalListingComponent {
    listing = 'Rental Listing Component!';
}
