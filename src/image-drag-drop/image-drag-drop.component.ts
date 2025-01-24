import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../service/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-image-drag-drop',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './image-drag-drop.component.html',
  styleUrl: './image-drag-drop.component.scss',
})
export class ImageDragDropComponent implements OnInit {
  form: FormGroup;
  files: File[] = [];
  userId: any;
  userData: any;
  images: any[] = [];

  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
      addresses: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.addAddress();
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.getUserById();
    }
  }

  get addresses(): FormArray {
    return this.form.get('addresses') as FormArray;
  }

  getUserById(): void {
    this.service.getUserById(this.userId).subscribe(
      (data) => {
        this.userData = data.user;
        this.form.patchValue({
          firstName: this.userData.firstName,
          lastName: this.userData.lastName,
          mobileNumber: this.userData.mobile,
        });

        this.files = this.userData.imageUrls;
        this.images = this.userData.imageUrls;

        if (this.userData.addresses && this.userData.addresses.length) {
          const addressFormGroups = this.userData.addresses.map(
            (address: any) =>
              this.fb.group({
                city: [address.city || ''],
                state: [address.state || ''],
                country: [address.country || ''],
              })
          );
          this.addresses.clear();
          addressFormGroups.forEach((group: any) => this.addresses.push(group));
        }
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  addAddress() {
    const addressGroup = this.fb.group({
      city: [''],
      state: [''],
      country: [''],
    });
    this.addresses.push(addressGroup);
  }

  removeAddress(index: number) {
    this.addresses.removeAt(index);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer?.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        this.files.push(files[i]);
      }
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onFileSelect(event: any) {
    const selectedFiles = event.target.files;
    for (let i = 0; i < selectedFiles.length; i++) {
      this.files.push(selectedFiles[i]);
    }
  }

  removeFile(index: number) {
    this.files.splice(index, 1);
  }

  submit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const formData = new FormData();

      for (const file of this.files) {
        formData.append('images', file);
      }
      formData.append('firstName', this.form.value.firstName);
      formData.append('lastName', this.form.value.lastName);
      formData.append('mobile', this.form.value.mobileNumber);
      formData.append('addresses', JSON.stringify(this.form.value.addresses));
      if (!this.userId) {
        this.service.createUser(formData).subscribe(
          (response) => {
            if (response) {
              alert(`User created successfully`);
            }
          },
          (error) => {
            console.error('Error:', error);
          }
        );
      }

      if (this.userId) {
        this.files = [...this.images];

        for (const file of this.files) {
          formData.append('images', file);
        }
        this.service.updateUser(formData, this.userId).subscribe(
          (response) => {
            if (response) {
              alert(`User Updated successfully`);
            }
          },
          (error) => {
            console.error('Error:', error);
          }
        );
      }
    }
  }
}
