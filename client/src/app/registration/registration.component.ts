import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
})
export class RegistrationComponent implements OnInit//todo: complete missing code..
{
  itemForm: FormGroup;
  formModel: any = { role: null, email: '', password: '', username: '' };
  showMessage: boolean = false;
  responseMessage: any;

  constructor(
    public router: Router,
    private bookService: HttpService,
    private formBuilder: FormBuilder
  ) {
    this.itemForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['', Validators.required],
      specialty: [''],
      availability: ['']
    });
  }

  ngOnInit(): void {
    this.onRoleChange();
  }

  onRoleChange() {
    this.itemForm.get('role')?.valueChanges.subscribe(role => {
      const specialtyControl = this.itemForm.get('specialty');
      const availabilityControl = this.itemForm.get('availability');

      if (role === 'DOCTOR') {
        specialtyControl?.setValidators([Validators.required]);
        availabilityControl?.setValidators([Validators.required]);
      } else {
        specialtyControl?.clearValidators();
        availabilityControl?.clearValidators();
      }

      specialtyControl?.updateValueAndValidity();
      availabilityControl?.updateValueAndValidity();
    });
  }

  onRegister() {
    if (this.itemForm.valid) {
      const formData = this.itemForm.value;
      const role = formData.role;

      if (role === 'PATIENT') {
        this.bookService.registerPatient(formData).subscribe(
          response => {
            this.showMessage = true;
            this.responseMessage = 'Registration successful! Please log in.';
            this.itemForm.reset();
            this.router.navigate(['/login']);
          },
          error => {
            console.error('Error registering patient:', error);
          }
        );
      } else if (role === 'DOCTOR') {
        this.bookService.registerDoctors(formData).subscribe(
          response => {
            this.showMessage = true;
            this.responseMessage = 'Registration successful! Please log in.';
            this.itemForm.reset();
            this.router.navigate(['/login']);
          },
          error => {
            console.error('Error registering doctor:', error);
          }
        );
      } else if (role === 'RECEPTIONIST') {
        this.bookService.registerReceptionist(formData).subscribe(
          response => {
            this.showMessage = true;
            this.responseMessage = 'Registration successful! Please log in.';
            this.itemForm.reset();
            this.router.navigate(['/login']);
          },
          error => {
            console.error('Error registering receptionist:', error);
          }
        );
      } else {
        console.error('Invalid role selected.');
      }
    } else {
      console.log('Form is invalid.');
    }
  }
}
