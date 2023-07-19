import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PATH } from 'src/app/app.constant';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  postRegis(payload: any) {
    const url = `${environment.baseUrl}${PATH.REGISTRATION}`;
    return this.http.post(url, payload, {
      headers: this.headers,
    }).pipe(catchError(this.error));
  }

  postLogin(payload: any) {
    const url = `${environment.baseUrl}${PATH.LOGIN}`;
    return this.http.post(url, payload, {
      headers: this.headers,
    }).pipe(catchError(this.error));
  }

  getAllProfiles() {
    let localUserData:any = localStorage.getItem('userDetails');
    let parsedData = JSON.parse(localUserData);    
    const url = `${environment.baseUrl}${PATH.PROFILES}?ClientID=${parsedData.id}&userid=${parsedData.id}`;
    return this.http.get(url, {
      headers: {userToken:parsedData.token},
    }).pipe(catchError(this.error));
  }

  getAllrestaurant() {
    let localUserData:any = localStorage.getItem('userDetails');
    let parsedData = JSON.parse(localUserData); 
    const url = `${environment.baseUrl}${PATH.RESTAURANT}?PickupAvailable=1&AreaName=Kuwait&page=1&pagelimit=10`;
    return this.http.get(url, {
      headers: {userToken:parsedData.token},
    }).pipe(catchError(this.error));
  }

  error(error: HttpErrorResponse) {
    if (typeof error == 'string') {
      return throwError(error);
    } else {
      let errorMessage = {};
      if (error.error instanceof ErrorEvent) {
        errorMessage = error.error;
      } else {
        errorMessage = { code: error.status, message: error.error };
      }
      return throwError(errorMessage);
    }
  }
}
