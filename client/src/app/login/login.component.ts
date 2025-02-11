import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  itemForm: FormGroup;
  formModel: any = {};
  showError: boolean = false;
  errorMessage: any;

  constructor(
    public router: Router,
    public httpService: HttpService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.itemForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onLogin() {
    if (this.itemForm.valid) {
      const loginDetails = this.itemForm.value;
      this.httpService.Login(loginDetails).subscribe(
        (response: any) => {
          this.authService.saveToken(response.token);
          this.authService.SetRole(response.role);
          this.router.navigate(['/dashboard']); // Navigate to the dashboard or any other route
        },
        (error) => {
          this.showError = true;
          this.errorMessage = 'Invalid username or password';
        }
      );
    } else {
      this.showError = true;
      this.errorMessage = 'Please fill in all required fields';
    }
  }

  registration() {
    this.router.navigate(['/register']);
  }
}



















































// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { HttpService } from '../../services/http.service';
// import { AuthService } from '../../services/auth.service';



// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent //todo: complete missing code..
// {
//   itemForm!: FormGroup;
//   formModel: any = {};
//   showError: boolean = false;
//   errorMessage: any;

//   constructor(
//     public router: Router,
//     public httpService: HttpService,
//     private formBuilder: FormBuilder,
//     private authService: AuthService
//   ) {
//     // Initializes itemForm with form controls for username and password, both marked as required
//     this.itemForm = this.formBuilder.group({
//       username: ['', Validators.required],
//       password: ['', Validators.required]
//     });
//   }

//   ngOnInit(): void {
//     // Currently empty
//   }

//   onLogin() {
//     // Checks if the form is valid
//     if (this.itemForm.valid) {
//       const username = this.itemForm.controls['username'].value;
//       const password = this.itemForm.controls['password'].value;

//       // Calls httpService.Login() with form values
//       this.httpService.Login({ username, password }).subscribe(
//         response => {
//           // On success

//           // Assuming response contains role, token, and userId
//           const { role, token, userId } = response;

//           // Saves the role, token, and userId using AuthService
//           this.authService.saveToken(token);
//           this.authService.saveUserId(userId);
//           this.authService.SetRole(role);

//           // Navigates to the /dashboard route
//           this.router.navigate(['/dashboard']).then(() => {
//             // Refreshes the page after a short delay
//             setTimeout(() => {
//               window.location.reload();
//             }, 500);
//           });

//         },
//         error => {
//           // On failure
//           this.showError = true;
//           this.errorMessage = 'Invalid username or password';
//           console.error('Login error:', error);
//         }
//       );

//     } else {
//       // Form is invalid
//       this.showError = true;
//       this.errorMessage = 'Please fill in all required fields';
//     }
//   }

//   registration() {
//     // Redirects to the /registration route
//     this.router.navigate(['/registration']);
//   }
// }

