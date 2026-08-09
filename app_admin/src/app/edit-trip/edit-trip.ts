import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TripDataService } from '../services/trip-data';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.html',
  styleUrl: './edit-trip.css',
  providers: [TripDataService]
})
export class EditTripComponent implements OnInit {
  public editForm!: FormGroup;
  tripCode: string = '';
  submitted = false;
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private tripService: TripDataService
  ) { }

  ngOnInit(): void {
    // Grab the tripCode from the URL
    this.tripCode = this.route.snapshot.paramMap.get('tripCode') || '';

    // Initialize the form
    this.editForm = this.formBuilder.group({
      _id: [],
      code: [this.tripCode, Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });

    // Fetch the trip data from the database and populate the form
    if (this.tripCode) {
      this.tripService.getTrip(this.tripCode).subscribe({
        next: (value: any) => {
          this.editForm.patchValue(value);
          if (!value) {
            this.message = 'No Trip Retrieved!';
          }
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      });
    }
  }

  public onSubmit() {
    this.submitted = true;
    if (this.editForm.valid) {
      this.tripService.updateTrip(this.editForm.value).subscribe({
        next: (data: any) => {
          console.log(data);
          this.router.navigate(['']);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      });
    }
  }

  get f() { return this.editForm.controls; }
}