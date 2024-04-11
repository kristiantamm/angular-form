import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from '../message/message.component';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  imports: [ReactiveFormsModule, CommonModule, MessageComponent]
})
export class FormComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder) {}

  submitted = false;
  reset = false;

  ngOnInit() {
    this.form = this.fb.group({
      message:[''],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      workExperience: ['', [Validators.required, experienceValidator()]]
    });
  }

  submitForm() {
    this.submitted = true;
    this.reset = false;
    if (this.form.valid) {
      // Send data somewhere
      console.log("Form submitted successfully!");
    } else {
      console.log("Form is not valid. Please check input fields");
    }
  }

  resetForm() {
    this.form.reset();
    this.form.markAsPristine();
    this.reset = true
    this.submitted = false;
    console.log("Form has been reset");
  }
}

export function experienceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value === null || value === '') {
      return { required: true };
    }

    if (isNaN(value)) {
      return { validNumeric: true };
    }

    // Check for at most one decimal place
    const hasOneDecimalPlace = /^[0-9]+(\.[0-9])?$/.test(value);
    return hasOneDecimalPlace ? null : { validDecimal: true };
  };
}