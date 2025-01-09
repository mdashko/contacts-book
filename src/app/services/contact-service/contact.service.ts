import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Contact } from 'src/app/interfaces/contact';
import { DataService } from '../data-service/data.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contactsKey = 'contacts';

  private contactsSubject = new BehaviorSubject<Contact[]>(
    this.readFromStorage()
  );
  contacts$ = this.contactsSubject.asObservable();

  constructor(private dataService: DataService) {}

  private readFromStorage(): Contact[] {
    const contacts = localStorage.getItem(this.contactsKey);
    return contacts ? JSON.parse(contacts) : [];
  }

  private writeToStorage(contacts: Contact[]): void {
    localStorage.setItem(this.contactsKey, JSON.stringify(contacts));
  }

  getContacts(): Contact[] {
    const contacts = this.readFromStorage();

    if (!contacts.length) {
      this.populateList();
      return this.readFromStorage();
    }
    return contacts;
  }

  addContact(contact: Contact): void {
    const contacts = this.getContacts();
    if (contacts.some((c) => c.id === contact.id)) {
      throw new Error('A contact with this ID already exists.');
    }
    contacts.push(contact);
    this.writeToStorage(contacts);
    this.contactsSubject.next(contacts);
  }

  populateList(): void {
    this.dataService.getData().subscribe((data) => {
      const contacts = data;
      this.writeToStorage(contacts);
      this.contactsSubject.next(contacts);
    });
  }

  updateContact(updatedContact: Contact): void {
    const contacts = this.getContacts();
    const index = contacts.findIndex((c) => c.id === updatedContact.id);
    if (index !== -1) {
      contacts[index] = updatedContact;
      this.writeToStorage(contacts);
      this.contactsSubject.next(contacts);
    }
  }

  deleteContact(id: string): void {
    const contacts = this.getContacts().filter((c) => c.id !== id);
    this.writeToStorage(contacts);
    this.contactsSubject.next(contacts);
  }

  searchContacts(query: string): Contact[] {
    if (!query.trim()) {
      return this.getContacts();
    }
    const contacts = this.getContacts();
    return contacts.filter(
      (contact) =>
        contact.firstName.toLowerCase().includes(query.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(query.toLowerCase()) ||
        contact.phoneNumber.includes(query)
    );
  }
}
