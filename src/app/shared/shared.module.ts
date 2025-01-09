import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { CustomButtonComponent } from './custom-button/custom-button.component';
import { CustomInputComponent } from './custom-input/custom-input.component';

@NgModule({
  declarations: [CustomButtonComponent, CustomInputComponent],
  imports: [CommonModule],
  exports: [CustomButtonComponent, CustomInputComponent]
})
export class SharedModule { }