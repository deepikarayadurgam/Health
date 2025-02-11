import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-schedule-appointment',
  templateUrl: './schedule-appointment.component.html',
  styleUrls: ['./schedule-appointment.component.scss']
})
export class ScheduleAppointmentComponent implements OnInit//todo: complete missing code..
{
  doctorList: any[] = [];
  itemForm: FormGroup;
  formModel: any = {};
  responseMessage: any;
  isAdded: boolean = false;

  constructor(
    public httpService: HttpService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private authService: AuthService
  ) {
    this.itemForm = this.formBuilder.group({
      doctorId: ['', [Validators.required]],
      patientId: ['', [Validators.required]],
      date: [''],
      time: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients() {
    this.httpService.getDoctors().subscribe(
      data => {
        this.doctorList = data;
      },
      error => {
        console.error('Error fetching doctors:', error);
      }
    );
  }

  addAppointment(val: any) {
    const patientId = this.authService.getUserId();

    if (patientId !== null) {
      this.itemForm.controls['doctorId'].setValue(val.id);
      this.itemForm.controls['patientId'].setValue(patientId);
      this.isAdded = true;
    } else {
      console.error('User ID not found.');
    }
  }

  onSubmit() {
    const date = this.itemForm.controls['date'].value;
    const time = this.itemForm.controls['time'].value;
    const dateTimeString = this.datePipe.transform(`${date}T${time}`, 'yyyy-MM-ddTHH:mm:ss');
    this.itemForm.controls['time'].setValue(dateTimeString);
  
    if (this.itemForm.valid) {
      this.httpService.ScheduleAppointment(this.itemForm.value).subscribe(
        response => {
          this.responseMessage = 'Appointment scheduled successfully!';
          this.itemForm.reset();
          this.isAdded = false;
        },
        error => {
          console.error('Error scheduling appointment:', error);
        }
      );
    }
  }
  

  

  // onSubmit() {
  //   const date = this.itemForm.controls['date'].value;
  //   const time = this.itemForm.controls['time'].value;
  //   const dateTimeString = this.datePipe.transform(`${date}T${time}`, 'yyyy-MM-ddTHH:mm:ss');

  //   this.itemForm.controls['time'].setValue(dateTimeString);

  //   this.httpService.ScheduleAppointment(this.itemForm.value).subscribe(
  //     response => {
  //       this.responseMessage = 'Appointment scheduled successfully!';
  //       this.itemForm.reset();
  //       this.isAdded = false;
  //     },
  //     error => {
  //       console.error('Error scheduling appointment:', error);
  //     }
  //   );
  // }
}


