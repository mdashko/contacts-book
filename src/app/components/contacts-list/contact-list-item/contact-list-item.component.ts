import { Component, Input } from '@angular/core';
import { Contact } from 'src/app/interfaces/contact';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact-service/contact.service';

@Component({
  selector: 'app-contact-list-item',
  templateUrl: './contact-list-item.component.html',
  styleUrls: ['./contact-list-item.component.scss'],
})
export class ContactListItemComponent {
  @Input() contact!: Contact;

  constructor(private router: Router, private contactService: ContactService) {}

  navigateToContactDetails(id: string) {
    this.router.navigate(['/contacts', id]);
  }

  navigateToEditForm(id: string) {
    this.router.navigate(['/contacts/form', id]);
  }

  onDeleteContact(id: string) {
    this.contactService.deleteContact(id);
  }

  capitalize(val: string) {
    return val.charAt(0).toUpperCase() + val.slice(1);
  }
}
