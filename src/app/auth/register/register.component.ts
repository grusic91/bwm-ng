import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegisterForm } from '../shared/register-form.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerFormData: RegisterForm;
  emailIdPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor() { }

  ngOnInit(): void {
    this.registerFormData = new RegisterForm();
  }

  register(form: NgForm): any {
    this.validateInputs(form);

    if (form.invalid) { return; }
  }

  validateInputs(form: NgForm): any {
    // get array of keys
    Object.keys(form.controls).forEach(controlName => {
      form.controls[controlName].markAsDirty();
    });
  }
}
