import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-receptionist-schedule-appointments',
  templateUrl: './receptionist-schedule-appointments.component.html',
  styleUrls: ['./receptionist-schedule-appointments.component.scss'],
  providers: [DatePipe] 
  
})
export class ReceptionistScheduleAppointmentsComponent implements OnInit {
  
  itemForm: FormGroup;
  formModel: any = {};
  responseMessage: any;
  isAdded: boolean = false;

  constructor(
    public httpService: HttpService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {
    // Initializes the form controls
    this.itemForm = this.formBuilder.group({
      patientId: ['', Validators.required],
      doctorId: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Initialization logic can be added here if needed
  }

  onSubmit() {
    if (this.itemForm.valid) {
      // Retrieves form values
      const patientId = this.itemForm.controls['patientId'].value;
      const doctorId = this.itemForm.controls['doctorId'].value;
      const timeInput = this.itemForm.controls['time'].value; // ISO format from datetime-local input

      // Formats the time input using DatePipe to 'yyyy-MM-dd HH:mm:ss' format
      const formattedTime = this.datePipe.transform(timeInput, 'yyyy-MM-dd HH:mm:ss');

      // Prepares the appointment data
      const appointmentData = {
        patientId: patientId,
        doctorId: doctorId,
        time: formattedTime
      };

      // Calls HttpService to schedule the appointment
      this.httpService.ScheduleAppointmentByReceptionist(appointmentData).subscribe(
        response => {
          this.responseMessage = 'Appointment scheduled successfully!';
          this.itemForm.reset();
          this.isAdded = false;
        },
        error => {
          console.error('Error scheduling appointment:', error);
        }
      );
    } else {
      console.log('Form is invalid');
      // Optionally, you can display validation errors here
    }
  }

}
