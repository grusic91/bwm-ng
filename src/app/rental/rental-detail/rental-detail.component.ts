import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Rental } from '../shared/rental.model';
import { RentalService } from '../shared/rental.service';

@Component({
    selector: 'rental-detail',
    templateUrl: './rental-detail.component.html',
    styleUrls: ['./rental-detail.component.scss']
})

export class RentalDetailComponent implements OnInit {
    rental: Rental;
    // dependecy injection
    constructor(
        private route: ActivatedRoute,
        private rentalService: RentalService){}

    ngOnInit(): any {
        // asing rentalId from url params
        this.route.params.subscribe((params) => {
            const rentalId = params.rentalId;
            this.rentalService.getRentalById(rentalId)
            .subscribe(rental => {
                this.rental = rental;
            });
        });
    }
}
