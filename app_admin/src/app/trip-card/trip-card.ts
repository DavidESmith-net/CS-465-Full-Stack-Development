import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data';
import { AuthenticationService } from '../services/authentication';


@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css',
  providers: [TripDataService]
})
export class TripCardComponent implements OnInit {
  @Input('trip') trip: any;
  
 constructor(
    private router: Router,
    private tripService: TripDataService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  public editTrip(trip: any): void {
    this.router.navigate(['edit-trip', trip.code]);
  }

  public isLoggedIn(): boolean {
  return this.authenticationService.isLoggedIn();
}

  public deleteTrip(trip: any): void {
    if (confirm('Are you sure you want to delete ' + trip.name + '?')) {
      this.tripService.deleteTrip(trip.code).subscribe({
        next: (data: any) => {
          console.log('Trip deleted');
          window.location.reload();
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      });
    }
  }
}