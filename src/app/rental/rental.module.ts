import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { RentalService } from './shared/rental.service';
import { FirstUpperLetterPipe, UppercasePipe } from '../shared/pipes/uppercase.pipe';
import { BwmNgIfDirective, HighlightDirective, BwmNgForDirective } from '../shared/directives/custom.directive';

import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { RentalListingComponent } from './rental-listing/rental-listing.component';
import { RentalComponent } from './rental.component';
import { RentalCardComponent } from '../shared/rental-card/rental-card.component';

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
    RentalListingComponent,
    RentalCardComponent,
    UppercasePipe,
    FirstUpperLetterPipe,
    HighlightDirective,
    BwmNgIfDirective,
    BwmNgForDirective
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    HttpClientModule
  ],
  providers: [
    RentalService
  ],
  bootstrap: [RentalComponent]
})
export class RentalModule { }
