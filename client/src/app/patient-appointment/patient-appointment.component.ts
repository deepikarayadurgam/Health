import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-patient-appointment',
  templateUrl: './patient-appointment.component.html',
  styleUrls: ['./patient-appointment.component.scss']
})
export class PatientAppointmentComponent implements OnInit {
  
  appointmentList: any[] = [];

  constructor(public httpService: HttpService) {
    // Initializes the HttpService dependency
  }

  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments() {
    // Retrieves userId from localStorage
    const userIdString = localStorage.getItem('userId');
    const userId = userIdString ? parseInt(userIdString, 10) : null;

    if (userId !== null && !isNaN(userId)) {
      // Calls httpService.getAppointmentByPatient() with the userId
      this.httpService.getAppointmentByPatient(userId).subscribe(
        data => {
          // Assigns the retrieved appointments to appointmentList
          this.appointmentList = data;
          // Logs the appointment list to the console
          console.log(this.appointmentList);
        },
        error => {
          console.error('Error fetching appointments:', error);
        }
      );
    } else {
      console.error('User ID not found or invalid in localStorage.');
    }
  }
}




















// import { Component, OnInit } from '@angular/core';
// import { HttpService } from './http.service';
// import { AuthService } from './auth.service';

// @Component({
//   selector: 'app-patient-appointment',
//   templateUrl: './patient-appointment.component.html',
//   styleUrls: ['./patient-appointment.component.css']
// })
// export class PatientAppointmentComponent implements OnInit {
//   appointmentList: any[] = [];
//   errorMessage: string;

//   constructor(
//     public httpService: HttpService,
//     private authService: AuthService
//   ) {}

//   ngOnInit(): void {
//     this.getAppointments();
//   }

//   getAppointments() {
//     const patientId = this.authService.getUserId();

//     if (patientId !== null) {
//       this.httpService.getAppointmentByPatient(patientId).subscribe(
//         data => {
//           this.appointmentList = data;
//           console.log(this.appointmentList);
//         },
//         error => {
//           console.error('Error fetching appointments:', error);
//           this.errorMessage = 'Failed to load appointments. Please try again later.';
//         }
//       );
//     } else {
//       console.error('User ID not found or invalid.');
//       this.errorMessage = 'You are not logged in. Please log in to view your appointments.';
//     }
//   }
// }
