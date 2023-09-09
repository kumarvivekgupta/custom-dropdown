import {
    Component,
    OnInit,
    Input,
    forwardRef,
    HostListener,
  } from '@angular/core';
  import {
    NG_VALUE_ACCESSOR,
    ControlValueAccessor,
    FormControl,
  } from '@angular/forms';
  import { Observable, of } from 'rxjs';
  
  export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DropDownComponent),
    multi: true,
  };
  
  enum DropdownMouseState {
    inside,
    outside,
  }
  
  @Component({
    selector: 'dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  })
  export class DropDownComponent implements OnInit, ControlValueAccessor {
    showMenu: boolean;
    isDisabled: boolean;
    selectedItem: IDropdownItem|any;
    propagateChange = (_: any) => {};
  
    state: DropdownMouseState;
  
    @Input()
    data?: Array<IDropdownItem> ;
  
    @Input('async-data')
    asyncData?: Observable<Array<IDropdownItem>>;
  
    @Input()
    width: string='';
  
    @Input('label-text')
    label: string='';
  
    @HostListener('document:click') clickedOutside() {
      if (this.state == DropdownMouseState.outside) {
        this.showMenu = false; // hide the dropdown...
      }
    }
  
    constructor() {
      this.showMenu = false;
      this.isDisabled = false;
      this.state = DropdownMouseState.outside;
    }
  
    ngOnInit() {
      if (this.asyncData !== undefined) {
        this.asyncData.subscribe((data) => {
          this.data = data;
        });
      }
    }
  
    valueChange(item: IDropdownItem) {
      this.selectedItem = item;
      this.propagateChange(item.Value);
      this.showMenu = false;
    }
  
    get value(): any {
      return this.selectedItem.Value;
    }
  
    set value(v: any) {
      if (v !== this.selectedItem.Value) {
        let value = this.data?.find((w) => w.Value);
        this.selectedItem = v;
      }
    }
  
    instanceOfIDropdownItem(object: any): object is IDropdownItem {
      return object.Value !== undefined;
    }
  
    public Clear() {
      this.selectedItem = null;
      this.value = null;
    }
  
    /* Implament ControlValueAccessor */
    writeValue(value: any): void {
      if (value == null) {
        this.selectedItem = null;
      } else if (this.instanceOfIDropdownItem(value)) {
        this.selectedItem = value;
      } else {
        let item = this.data?.find((w) => w.Value == value);
        this.selectedItem = item;
      }
    }
  
    registerOnChange(fn: any): void {
      this.propagateChange = fn;
    }
  
    registerOnTouched(fn: any): void {}
  
    setDisabledState?(isDisabled: boolean): void {
      this.isDisabled = isDisabled;
    }
  }
  
  export interface IDropdownItem {
    /**
     * The text that will show to the user.
     */
    DisplayValue: string;
    /**
     * The value used in the .ts file/backend...
     */
    Value: any;
  }
  