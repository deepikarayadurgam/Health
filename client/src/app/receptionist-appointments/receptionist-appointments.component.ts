
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-receptionist-appointments',
  templateUrl: './receptionist-appointments.component.html',
  styleUrls: ['./receptionist-appointments.component.scss'],
  providers: [DatePipe]
})
export class ReceptionistAppointmentsComponent implements OnInit {
  itemForm: FormGroup;
  formModel: any = {};
  responseMessage: any;
  appointmentList: any[] = [];
  isAdded: boolean = false;

  constructor(
    public httpService: HttpService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {
    // Initialize the form with necessary controls
    this.itemForm = this.formBuilder.group({
      id: ['', Validators.required], // Appointment ID
      // patientId: ['', Validators.required],
      // doctorId: ['', Validators.required],
      time: ['', Validators.required] // Date and time of the appointment
    });
  }

  ngOnInit(): void {
    // Load appointments when the component is initialized
    this.getAppointments();
  }

  getAppointments() {
    // Fetch all appointments from the server
    this.httpService.getAllAppointments().subscribe(
      data => {
        this.appointmentList = data;
        console.log(this.appointmentList);
      },
      error => {
        console.error('Error fetching appointments:', error);
      }
    );
  }

  editAppointment(appointment: any) {
    // Prepares the form for editing an appointment
    this.itemForm.controls['id'].setValue(appointment.id);
    // this.itemForm.controls['patientId'].setValue(appointment.patientId);
    // this.itemForm.controls['doctorId'].setValue(appointment.doctorId);

    // Format the existing time to 'yyyy-MM-ddTHH:mm' for datetime-local input
    const formattedTime = this.datePipe.transform(appointment.time, 'yyyy-MM-ddTHH:mm');
    this.itemForm.controls['time'].setValue(formattedTime);
    this.isAdded = true;
  }

  onSubmit() {
    if (this.itemForm.valid) {
      // Retrieves form values
      const appointmentId = this.itemForm.controls['id'].value;
      // const patientId = this.itemForm.controls['patientId'].value;
      // const doctorId = this.itemForm.controls['doctorId'].value;
      const timeInput = this.itemForm.controls['time'].value; // ISO format from datetime-local input

      // Formats the time input using DatePipe to 'yyyy-MM-dd HH:mm:ss' format
      const formattedTime = this.datePipe.transform(timeInput, 'yyyy-MM-dd HH:mm:ss');

      // Prepares the updated appointment data
      const updatedAppointment = {
        id: appointmentId,
        // patientId: patientId,
        // doctorId: doctorId,
        time: formattedTime
      };

      // Calls HttpService to reschedule the appointment
      this.httpService.reScheduleAppointment(appointmentId, updatedAppointment).subscribe(
        response => {
          this.responseMessage = 'Appointment rescheduled successfully!';
          this.itemForm.reset();
          this.isAdded = false;

          // Reload the list of appointments
          this.getAppointments();
        },
        error => {
          console.error('Error rescheduling appointment:', error);
        }
      );
    } else {
      console.log('Form is invalid');
      // Optionally, you can display validation errors here
    }
  }
}
