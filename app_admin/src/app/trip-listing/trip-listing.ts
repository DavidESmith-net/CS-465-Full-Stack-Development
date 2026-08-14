import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCardComponent } from '../trip-card/trip-card';
import { TripDataService } from '../services/trip-data';
import { AuthenticationService } from '../services/authentication';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css',
  providers: [TripDataService]
})
export class TripListingComponent implements OnInit {
  trips: Array<any> = [];
  message: string = '';

 constructor(
    private tripDataService: TripDataService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { 
    console.log('trip-listing constructor');
  }

public addTrip(): void {
  this.router.navigate(['add-trip']);
}

  private getTrips(): void {
    console.log('Inside TripListingComponent#getTrips');
    this.message = 'Searching for trips';
    
    this.tripDataService.getTrips()
      .subscribe({
        next: (value: any) => {
          this.trips = value;
          if(value.length > 0) {
            this.message = 'There are ' + value.length + ' trips available.';
          } else {
            this.message = 'There were no trips retrieved from the database';
          }
          console.log(this.message);
          
         
          this.cdr.detectChanges(); 
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      });
  }

  public isLoggedIn(): boolean {
  return this.authenticationService.isLoggedIn();
}

  ngOnInit(): void {
    console.log('ngOnInit');
    this.getTrips();
  }
}