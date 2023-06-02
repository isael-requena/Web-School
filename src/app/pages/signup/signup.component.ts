import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserInterface } from '../../interfaces/User';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  //Al presionar enter
  @HostListener('keydown.enter', ['$event'])
  Enter(event: KeyboardEvent) {
    if (this.signUpForm.touched && this.signUpForm.valid) {
      // this.login();
    }
  }
  public signUpForm: FormGroup;
  public showPassword: boolean = false;
  public hasAuthError: boolean = false;
  public formStepCount: number = 1;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    const userExample: UserInterface = {
      "username": "Juanito Alimaña 2",
      "email": "juanitoalimaña2@gmail.com",
      "password": "123456",
      "role": 0,
      "create_time": "2023-06-01",
      "school_year": "5to",
      "section": "U"
    }
    this.signUpForm = this.fb.group({
        'username': [null, Validators.required],
        'email': [null, Validators.compose([
          Validators.required,
          Validators.email,
        ])],
        'password': [null, Validators.compose([
          Validators.required,
          Validators.minLength(6),
        ])],
        'role': [null, Validators.required],
        'school_year': [null, Validators.required],
        'section': [null, Validators.required],
      });
  }

  ngOnInit(): void {
  }

  public signUp(event: Event) {
    event.preventDefault();
    console.log(this.signUpForm.value)
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  nextStep() {
    if ( this.formStepCount <= 3) this.formStepCount++;
  }

  prevStep() {
    if ( this.formStepCount > 1) this.formStepCount--;
  }

}
