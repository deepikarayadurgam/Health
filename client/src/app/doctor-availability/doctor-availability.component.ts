import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-doctor-availability',
  templateUrl: './doctor-availability.component.html',
  styleUrls: ['./doctor-availability.component.scss']
})
export class DoctorAvailabilityComponent //todo: complete missing code..
{
  itemForm: FormGroup;
  formModel: any = {};
  responseMessage: any;
  isAdded: boolean = false;

  constructor(public httpService: HttpService, private formBuilder: FormBuilder) {
    
    this.itemForm = this.formBuilder.group({
      doctorId: ['', Validators.required],
      availability: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    
  }

  onSubmit() {
    
    const userIdString = localStorage.getItem('userId');
    const doctorId = userIdString ? parseInt(userIdString, 10) : null;

    if (doctorId !== null && !isNaN(doctorId)) {
      // Sets the doctorId form control value to the parsed userId
      this.itemForm.controls['doctorId'].setValue(doctorId);
      const availability = this.itemForm.controls['availability'].value;

      // Calls httpService.updateDoctorAvailability with doctorId and availability
      this.httpService.updateDoctorAvailability(doctorId, availability).subscribe(
        response => {
          // Updates responseMessage upon successful submission
          this.responseMessage = 'Availability updated successfully!';
          // Resets the form
          this.itemForm.reset();
          this.isAdded = false;
        },
        error => {
          console.error('Error updating availability:', error);
        }
      );
    } else {
      console.error('User ID not found or invalid.');
    }
  }
}














// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { HttpService } from './http.service';
// import { AuthService } from './auth.service';

// @Component({
//   selector: 'app-doctor-availability',
//   templateUrl: './doctor-availability.component.html',
//   styleUrls: ['./doctor-availability.component.css']
// })
// export class DoctorAvailabilityComponent implements OnInit {
//   itemForm: FormGroup;
//   formModel: any = {};
//   responseMessage: any;
//   isAdded: boolean = false;

//   constructor(
//     public httpService: HttpService,
//     private formBuilder: FormBuilder,
//     private authService: AuthService
//   ) {
//     this.itemForm = this.formBuilder.group({
//       doctorId: ['', Validators.required],
//       availability: ['', Validators.required]
//     });
//   }

//   ngOnInit(): void {
//     // Currently empty
//   }

//   onSubmit() {
//     const doctorId = this.authService.getUserId();

//     if (doctorId !== null) {
//       this.itemForm.controls['doctorId'].setValue(doctorId);
//       const availability = this.itemForm.controls['availability'].value;

//       this.httpService.updateDoctorAvailability(doctorId, availability).subscribe(
//         response => {
//           this.responseMessage = 'Availability updated successfully!';
//           this.itemForm.reset();
//           this.isAdded = false;
//         },
//         error => {
//           console.error('Error updating availability:', error);
//         }
//       );
//     } else {
//       console.error('User ID not found or invalid.');
//     }
//   }
// }
