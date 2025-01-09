import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsListComponent } from 'src/app/components/contacts-list/contacts-list.component';
import { ContactDetailComponent } from 'src/app/components/contact-detail/contact-detail.component';
import { ContactFormComponent } from 'src/app/components/contact-form/contact-form.component';

const routes: Routes = [
	{ path: 'contacts', component: ContactsListComponent },
	{ path: 'contacts/form', component: ContactFormComponent }, 
	{ path: 'contacts/form/:id', component: ContactFormComponent },
	{ path: 'contacts/:id', component: ContactDetailComponent }, 
	{ path: '', redirectTo: '/contacts', pathMatch: 'full' },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
