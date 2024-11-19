import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { DataService } from 'src/app/service/data-service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  public employee: Employee = new Employee();
  employeeFormGroup: FormGroup;

  departments: Array<any> = [
    { id: 1, name: 'HR', value: 'HR', checked: false },
    { id: 2, name: 'Sales', value: 'Sales', checked: false },
    { id: 3, name: 'Finance', value: 'Finance', checked: false },
    { id: 4, name: 'Engineer', value: 'Engineer', checked: false },
    { id: 5, name: 'Other', value: 'Other', checked: false }
  ];

  profiles = [
    { id: 'image1', src: '../assets/profile-images/Ellipse -1.png', alt: 'Profile 1' },
    { id: 'image2', src: '../assets/profile-images/Ellipse -2.png', alt: 'Profile 2' },
    { id: 'image3', src: '../assets/profile-images/Ellipse -3.png', alt: 'Profile 3' },
    { id: 'image4', src: '../assets/profile-images/Ellipse -4.png', alt: 'Profile 4' },
    { id: 'image5', src: '../assets/profile-images/Ellipse -5.png', alt: 'Profile 5' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    // Initialize the form group
    this.employeeFormGroup = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.pattern('^[A-Z][a-zA-Z\\s]{2,}$')]),
      profilePic: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      departments: this.formBuilder.array([], [Validators.required]),
      salary: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      notes: new FormControl('', [Validators.required])
    });
  }


  ngOnInit(): void {

 

    if (this.activatedRoute.snapshot.params['id'] != undefined) {
      this.dataService.currentEmployee.subscribe(employee => {
        if(Object.keys(employee).length !== 0) {
          console.log(employee);
          this.employeeFormGroup.get('name')?.setValue(employee.name);
          this.employeeFormGroup.get('profilePic')?.setValue(employee.profilePic);
          this.employeeFormGroup.get('gender')?.setValue(employee.gender);
          this.employeeFormGroup.get('salary')?.setValue(employee.salary);
          this.employeeFormGroup.get('startDate')?.setValue(employee.startDate);
          this.employeeFormGroup.get('notes')?.setValue(employee.notes);
          // const departments: FormArray = this.employeeFormGroup.get('departments') as FormArray;
          // // departments.clear();
          // employee.departments.forEach(departmentElement => {
            
          //   for (let index = 0; index < this.departments.length; index++) {
          //     console.log(this.departments[index].name === departmentElement)
          //     if(this.departments[index].name === departmentElement) {
          //       this.departments[index].checked = true;
          //       departments.push(new FormControl(this.departments[index].value));
          //     }
          //   }
          // })
      //           const departments: FormArray = this.employeeFormGroup.get('departments') as FormArray;
      // employee.departments.forEach(dept => {
      //   const matched = this.departments.find(d => d.name === dept);
      //   if (matched) {
      //     matched.checked = true;
      //     departments.push(new FormControl(matched.value));
      //   }
      // })

      // Assuming `employeeFormGroup` is a FormGroup and has a FormArray named 'departments'.
const department: FormArray = this.employeeFormGroup.get('departments') as FormArray;

// Reset the departments FormArray to ensure no duplicates.
department.clear();

// Iterate through the employee's departments array.
employee.departments.forEach((dept: string) => {
  // Find the matching department in the available departments list.
  const matched = this.departments.find(d => d.name === dept);

  if (matched) {
    // Mark the department as checked.
    matched.checked = true;

    // Add the value to the FormArray.
    department.push(new FormControl(matched.value));
  }
});


        }
      });
    }
  }

  
  /**
   * On change event for checkbox. In this we can select multiple checkobox 
   * for department and store is as an array.
   * @param event 
   */
   onCheckboxChange(event: MatCheckboxChange) {
    const department: FormArray = this.employeeFormGroup.get('departments') as FormArray;
    department.clear();
    if (event.checked) {
      department.push(new FormControl(event.source.value));
    } else {
      const index = department.controls.findIndex(x => x.value === event.source.value);
      department.removeAt(index);
    }
  }

  // /**
  //  * To read Salary value from slider
  //  */
  //  salary: number = 400000;
  //  updateSetting(event:any) {
  //    this.salary = event.value;
  //  }
 
   formatLabel(value: number) {
     if (value >= 1000) {
       return Math.round(value / 1000) + 'k';
     }
     return value;
   }

  onSubmit(){
    console.log(this.employeeFormGroup.value)
    console.log(this.employeeFormGroup.invalid)

    if(!this.employeeFormGroup.invalid){
      console.log(this.employeeFormGroup.invalid)
      if(this.employeeFormGroup.get('profilePic')?.untouched) {
        this.snackBar.open('Select the Profile Pic', '', {duration: 4000, verticalPosition: 'top'});
      }
      if(this.employeeFormGroup.get('gender')?.untouched) {
        this.snackBar.open('Select the Gender', '', {duration: 4000, verticalPosition: 'top'});
      }
      if(this.employeeFormGroup.get('department')?.value.length == 0) {
            this.snackBar.open('Deparment needs to be filled!', '', {duration: 4000, verticalPosition: 'top'});
      }
    } else{
      console.log('in else lock')
      this.employee = this.employeeFormGroup.value;
      if(this.activatedRoute.snapshot.params['id'] != undefined){
        console.log(this.activatedRoute.snapshot.params['id'])
        console.log(this.employee)
        this.httpService.updateEmployeData(this.activatedRoute.snapshot.params['id'], this.employee).subscribe(response => {
          console.log(response);
          this.ngOnInit();
          this.router.navigateByUrl("/home-page");
          this.snackBar.open('Updated Successfully!', 'OK', {duration: 4000, verticalPosition: 'top'});
        });
      }else {
           
        this.employee.startDate = this.formatDate(this.employee.startDate);

       console.log( this.employee)
        this.httpService.addEmployee(this.employee).subscribe(response => {
          console.log(response);
          this.router.navigateByUrl("/home-page");
          this.snackBar.open('Employee Added Successfully!', 'OK', {duration: 4000, verticalPosition: 'top'});
        });
      }
    }
  }

  /**
   * Formats a date to 'YYYY-MM-DD'.
   * @param date Date to format
   * @returns Formatted date string
   */
  formatDate(date: any): string {
    if (date) {
      const formattedDate = new Date(date);
      const day = String(formattedDate.getDate()).padStart(2, '0');
      const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
      const year = formattedDate.getFullYear();
      return `${year}-${month}-${day}`;
    }
    return '';
  }
}
