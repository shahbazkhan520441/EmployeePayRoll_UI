import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  
  private baseUrl: string = "http://localhost:8080/api/v1/employeepayrollservice/";

  constructor(private httpClient: HttpClient) {

  }

  getEmployeeData(): Observable<any> {
    return this.httpClient.get(this.baseUrl + "employees");
  }

  getEmployeeById(id : number): Observable<any> {
    return this.httpClient.get(this.baseUrl + "employees/"+id);
  }

  addEmployee(body: any): Observable<any> {
    console.log(body)
    return this.httpClient.post(this.baseUrl + "add/employees", body);
  }

  deleteEmployeeData(id: number): Observable<any> {
    console.log(id)
    return this.httpClient.delete(this.baseUrl + "delete/employees/"+ id);
  }

  updateEmployeData(id: number, body: any): Observable<any> {
    console.log(body)
    return this.httpClient.put(this.baseUrl + "update/employees/"+ id, body);
  }
}
