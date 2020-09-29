import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'rental-detail',
    templateUrl: './rental-detail.component.html',
    styleUrls: ['./rental-detail.component.scss']
})

export class RentalDetailComponent {
    title = 'This is from Rental Detail';
    public rentalId = '';

    // dependecy injection
    constructor(private route: ActivatedRoute) {}
    
    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.rentalId = params['rentalId']
        })
    }
}
