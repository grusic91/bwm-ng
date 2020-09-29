import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { RentalListingComponent } from './rental-listing/rental-listing.component';
import { RentalComponent } from './rental.component';

const routes: Routes = [
    {
        path: 'rentals',
        component: RentalComponent,
        children: [
            {path: '', component: RentalListingComponent},
            {path: ':rentalId', component: RentalDetailComponent}
        ]
    }
];

@NgModule({
  declarations: [
    RentalComponent,
    RentalDetailComponent,
    RentalListingComponent
  ],
  imports: [
    RouterModule.forChild(routes)
  ],
  providers: [],
  bootstrap: [RentalComponent]
})
export class RentalModule {
}
