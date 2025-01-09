import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/interfaces/contact';
import { ContactService } from 'src/app/services/contact-service/contact.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss'],
})
export class ContactDetailComponent implements OnInit {
  contact!: Contact;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    const contact = this.contactService.getContacts().find((c) => c.id === id);
    if (contact) {
      this.contact = contact;
    }
  }

  navigateToEditForm(id: string) {
    this.router.navigate(['/contacts/form', id]);
  }

  onCancel(): void {
    this.router.navigate(['/contacts']);
  }
}
