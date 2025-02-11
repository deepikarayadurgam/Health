




import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public serverName = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getDoctors(): Observable<any> {
    return this.http.get(`${this.serverName}/api/patient/doctors`, { headers: this.getAuthHeaders() });
  }

  ScheduleAppointment(appointmentData: any): Observable<any> {
    const { patientId, doctorId } = appointmentData;
    console.log("Hiii");
    return this.http.post(
      `${this.serverName}/api/patient/appointment?patientId=${patientId}&doctorId=${doctorId}`,
      appointmentData,
      { headers: this.getAuthHeaders() }
    );
  }

  registerPatient(patientData: any): Observable<any> {
    return this.http.post(
      `${this.serverName}/api/patient/register`,
      patientData,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  registerDoctors(doctorData: any): Observable<any> {
    return this.http.post(
      `${this.serverName}/api/doctors/register`,
      doctorData,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  registerReceptionist(receptionistData: any): Observable<any> {
    return this.http.post(
      `${this.serverName}/api/receptionist/register`,
      receptionistData,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }

  ScheduleAppointmentByReceptionist(appointmentData: any): Observable<any> {
    const { patientId, doctorId } = appointmentData;
    return this.http.post(
      `${this.serverName}/api/receptionist/appointment?patientId=${patientId}&doctorId=${doctorId}`,
      appointmentData,
      { headers: this.getAuthHeaders() }
    );
  }

  getAllAppointments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.serverName}/api/receptionist/appointments`, { headers: this.getAuthHeaders() });
  }

  reScheduleAppointment(appointmentId: number, updatedAppointment: any): Observable<any> {
    return this.http.put(
      `${this.serverName}/api/receptionist/appointment-reschedule/${appointmentId}`,
      updatedAppointment,
      { headers: this.getAuthHeaders() }
    );
  }

  getAppointmentByPatient(patientId: number): Observable<any> {
    return this.http.get(`${this.serverName}/api/patient/appointments?patientId=${patientId}`, { headers: this.getAuthHeaders() });
  }

  updateDoctorAvailability(doctorId: number, availability: string): Observable<any> {
    return this.http.post(
      `${this.serverName}/api/doctor/availability?doctorId=${doctorId}&availability=${availability}`,
      {},
      { headers: this.getAuthHeaders() }
    );
  }

  getAppointmentByDoctor(doctorId: number): Observable<any> {
    return this.http.get(`${this.serverName}/api/doctor/appointments?doctorId=${doctorId}`, { headers: this.getAuthHeaders() });
  }

  Login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(
      `${this.serverName}/api/user/login`,
      credentials,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }
}












































































































// import { Injectable } from '@angular/core';
// import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from '../environments/environment.development';
// import { AuthService } from './auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class HttpService {
//   //Just ensure that the endpoints (serverName and API paths) match your backend configuration.
//   public serverName=environment.apiUrl;
 
//  //todo:
//   // http.service.ts
//   constructor(private http:HttpClient){}
// getDoctors(): Observable<any> {
//   return this.http.get(`${this.serverName}/doctors`);
// }

// ScheduleAppointment(appointmentData: any): Observable<any> {
//   return this.http.post(`${this.serverName}/appointments`, appointmentData);
// }
// // http.service.ts
// registerPatient(patientData: any): Observable<any> {
//   return this.http.post(`${this.serverName}/api/patient/register`, patientData);
// }

// registerDoctors(doctorData: any): Observable<any> {
//   return this.http.post(`${this.serverName}/doctors/register`, doctorData);
// }

// registerReceptionist(receptionistData: any): Observable<any> {
//   return this.http.post(`${this.serverName}/receptionist/register`, receptionistData);
// }

// ScheduleAppointmentByReceptionist(appointmentData: any): Observable<any> {
//   return this.http.post(`${this.serverName}/appointments/receptionist`, appointmentData);
// }

// // http.service.ts
// getAllAppointments(): Observable<any[]> {
//   return this.http.get<any[]>(`${this.serverName}/appointments`);
// }

// reScheduleAppointment(appointmentId: number, updatedAppointment: any): Observable<any> {
//   return this.http.put(`${this.serverName}/appointments/${appointmentId}`, updatedAppointment);
// }

// // http.service.ts
// getAppointmentByPatient(patientId: number): Observable<any> {
//   return this.http.get(`${this.serverName}/appointments/patient/${patientId}`);
// }

// // http.service.ts
// updateDoctorAvailability(doctorId: number, availability: string): Observable<any> {
//   return this.http.put(`${this.serverName}/doctors/${doctorId}/availability`, { availability });
// }

// // http.service.ts
// getAppointmentByDoctor(doctorId: number): Observable<any> {
//   return this.http.get(`${this.serverName}/appointments/doctor/${doctorId}`);
// }

//   // http.service.ts
// Login(credentials: { username: string; password: string }): Observable<any> {
//   return this.http.post(`${this.serverName}/login`, credentials);
// }

  
// }
