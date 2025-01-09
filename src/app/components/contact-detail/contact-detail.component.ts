import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact-service/contact.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss'],
})
export class ContactDetailComponent implements OnInit {
  contact: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.contact = this.contactService.getContacts().find((c) => c.id === id);
    console.log(this.contact);
  }

  navigateToEditForm(id: string) {
    this.router.navigate(['/contacts/form', id]);
  }

  onCancel(): void {
    this.router.navigate(['/contacts']);
  }
}
