import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  public name = "Bridgelabz";
  public fruits = ["Apple", "Grapes", "Manggo"];
  public color = "black";
  public displayName = "true";
  disabled = true;


  constructor() { }

  ngOnInit(): void {
  }

  enableBox(){
    this.disabled= false;
  }

}
