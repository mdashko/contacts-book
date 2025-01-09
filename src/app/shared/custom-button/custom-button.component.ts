import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss']
})
export class CustomButtonComponent {
  @Input() label: string = ''; 
  @Input() type: 'primary' | 'secondary' = 'primary'; 
  @Input() disabled: boolean = false; 
  @Output() clickEvent = new EventEmitter<void>(); 

  onClick(): void {
    if (!this.disabled) {
      this.clickEvent.emit(); 
    }
  }
}
