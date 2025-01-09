import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ContactsListComponent } from './components/contacts-list/contacts-list.component';
import { ContactDetailComponent } from './components/contact-detail/contact-detail.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { AppRoutingModule } from './app-routing.module';
import { ContactService } from 'src/app/services/contact-service/contact.service';
import { SharedModule } from './shared/shared.module';
import { ContactListItemComponent } from './components/contacts-list/contact-list-item/contact-list-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
  declarations: [
    AppComponent,
    ContactsListComponent,
    ContactDetailComponent,
    ContactFormComponent,
    ContactListItemComponent,
  ],
  imports: [
	AlertModule.forRoot(),
    BrowserModule,
    SharedModule,
    MatIconModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [ContactService],
  bootstrap: [AppComponent],
})
export class AppModule {}
