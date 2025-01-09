import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact-service/contact.service';
import { Contact } from 'src/app/interfaces/contact';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent implements OnInit {
  userForm!: FormGroup;
  isEditMode = false;

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const contact = id
      ? this.contactService.getContacts().find((c) => c.id === id)
      : undefined;

    this.isEditMode = !!contact;
    this.initializeForm(contact);
  }

  initializeForm(contact?: Contact): void {
    this.userForm = this.fb.group({
      firstName: [
        contact?.firstName || '',
        [
          Validators.required,
          Validators.minLength(2),
		  Validators.maxLength(10),
          Validators.pattern('^[a-zA-Zа-яА-Я]+$'),
        ],
      ],
      lastName: [
        contact?.lastName || '',
        [
          Validators.required,
          Validators.minLength(2),
		  Validators.maxLength(10),
          Validators.pattern('^[a-zA-Zа-яА-Я]+$'),
        ],
      ],
      phoneNumber: [
        contact?.phoneNumber || '',
        [Validators.required, Validators.pattern('^\\+?\\d{10,15}$')],
      ],
      birthDate: [contact?.birthDate || '', Validators.required],
      email: [contact?.email || '', [Validators.required, Validators.email]],
      address: [contact?.address || '', Validators.required],
    });
  }

  onSubmit(): void {
    const formData = this.userForm.value;

    if (this.isEditMode) {
      this.contactService.updateContact({
        ...formData,
        id: this.route.snapshot.paramMap.get('id'),
      });
    } else {
      const newContact = { ...formData, id: this.generateId() };
      this.contactService.addContact(newContact);
    }

    this.router.navigate(['/contacts']);
  }

  onCancel(): void {
    this.router.navigate(['/contacts']);
  }

  private generateId(): string {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
}
