import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;

  editableFields: { [key: string]: boolean } = {
    nome: false,
    email: false,
    senha: false,
    telefone: false
  };

  constructor(private fb: FormBuilder) {}

  toggleEdit(field: string) {
    this.editableFields[field] = !this.editableFields[field];
  }

  saveProfile() {
    console.log('Profile saved:', this.profileForm.value);
    // Here you can call your API to save the form
  }

  triggerPhotoUpload() {
    const fileInput = document.getElementById('uploadPhoto') as HTMLInputElement;
    fileInput?.click();
  }

  onPhotoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log('Selected file:', file.name);
      // You can implement photo upload logic here
    }
  }
}
