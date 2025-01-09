import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from 'src/app/interfaces/contact';
import { ContactService } from 'src/app/services/contact-service/contact.service';
@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss'],
})
export class ContactsListComponent implements OnInit {
  public contacts: Contact[] = [];
  searchQuery = '';

  constructor(private contactService: ContactService, private router: Router) {}

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();

    this.contactService.contacts$.subscribe((contacts) => {
      this.contacts = contacts;
    });
  }

  navigateToAddContact(): void {
    this.router.navigate(['/contacts/form']);
  }

  onSearchChange(newValue: string) {
    this.contacts = this.contactService.searchContacts(newValue);
  }

  onDelete(id: string): void {
    this.contactService.deleteContact(id);
    this.contacts = this.contactService.getContacts();
  }
}
