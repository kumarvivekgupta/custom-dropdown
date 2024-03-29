import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DropDownAnimation } from './animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [DropDownAnimation]
})
export class AppComponent {
  title = 'custom-dropdown';
  isOpen = false;
  selectedOption:number;


  optionList:any[]=[];

  constructor() {
    this.selectedOption=0;
  }

 

  ngOnInit() {
    this.optionList.push({ DisplayValue: 'Option 1', Value: 1 });
    this.optionList.push({ DisplayValue: 'Option 2', Value: 2 });
    this.optionList.push({ DisplayValue: 'Option 3', Value: 3 });
    this.optionList.push({ DisplayValue: 'Option 4', Value: 4 });
    this.optionList.push({ DisplayValue: 'Option 5', Value: 5 });
    this.optionList.push({ DisplayValue: 'Option 6', Value: 6 });
    this.optionList.push({ DisplayValue: 'Option 7', Value: 7 });
    this.optionList.push({ DisplayValue: 'Option 8', Value: 8 });
    this.optionList.push({ DisplayValue: 'Option 9', Value: 9 });

  }
  onSelection(i:number){
    this.selectedOption=i;
    this.isOpen=false;
    
  }
}
