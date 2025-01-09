import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss']
})
export class CustomInputComponent {
  @Input() placeholder: string = 'Enter contact name'; 
  @Input() value: string = ''; 
  @Input() disabled: boolean = false; 
  @Output() valueChange = new EventEmitter<string>(); 

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.valueChange.emit(target.value);
  }
}
