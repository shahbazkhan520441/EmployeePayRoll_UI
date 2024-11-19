import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { DataService } from 'src/app/service/data-service';
import { HttpService } from '../../service/http.service';

@Component({
  selector: 'app-home-page',
  template: '<app-add-user [employeeData]="employee"></app-add-user>',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public employeeCount: number = 0; 
  public employeeDetails: Employee[] = [];

  constructor(private httpService: HttpService,
              private router: Router,
              private dataService: DataService
              ) { }

  ngOnInit(): void {
    this.httpService.getEmployeeData().subscribe(data => {
      this.employeeDetails = data.data;
      this.employeeCount = this.employeeDetails.length;
      console.log(this.employeeDetails);
    });
  }

  remove(id: number): void {
    const isConfirmed = confirm("Are you sure you want to delete this data?");
    console.log(isConfirmed)
  
    if(isConfirmed){
     
      console.log(id)
    this.httpService.deleteEmployeeData(id).subscribe(response => {
      console.log(response);
      this.ngOnInit();

      // alert("Data deleted successfully!");
    });

    }
    else{
      alert("Delete operation canceled.");
    }
   
  }

  update(employee: Employee): void {
    this.dataService.changeEmployee(employee);
    console.log(employee.employeeid)
    console.log(employee.startDate)
    console.log(employee.employeeid)
    this.router.navigateByUrl('/add-user/'+employee.employeeid);
    this.ngOnInit();
    // console.log(employee.employeeid)
    // this.httpService.updateEmployeData(employee.employeeid, employee).subscribe(response => {
    //   console.log(response);
    //  
    // });
  }

}
