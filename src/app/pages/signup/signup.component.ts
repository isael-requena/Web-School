import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserInterface } from '../../interfaces/User';

import { AuthService } from '../../services/auth.service';
import { DateFormatService } from '../../services/date-format.service';
import { NavController } from '@ionic/angular';
import Swal from 'sweetalert2'

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
    private router: Router,
    public dateFormat: DateFormatService,
    public navCtrl: NavController
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
        'create_time': [dateFormat.formatDate(new Date())],
        'school_year': [null, Validators.required],
        'section': [null, Validators.required],
      });
  }

  ngOnInit(): void {
  }

  public signUp(event?: Event) {
    event?.preventDefault();
    const AUTH_USER: UserInterface = {
      username: this.signUpForm.get('username')?.value.toUpperCase(),
      email: this.signUpForm.get('email')?.value.trim().toUpperCase(),
      password: this.signUpForm.get('password')?.value,
      role: this.signUpForm.get('role')?.value,
      school_year: this.signUpForm.get('school_year')?.value,
      section: this.signUpForm.get('section')?.value,
      create_time: this.signUpForm.get('create_time')?.value,
    }
    this.auth.signUp(AUTH_USER).then((Res:any) => {
      console.log(Res)
      if (Res && Res.id && !Res.message) {

        Swal.fire({
          icon: 'success',
          title: 'Registrado correctamente',
          showConfirmButton: false,
          timer: 2500
        }).then(() => {
          this.navCtrl.navigateForward(['/home']);
        })

      } else {

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Lo sentimos, intente de nuevo más tarde.',
          showConfirmButton: false,
          timer: 2500
        })

      }
    })
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

  selectRole(value: number) {
    this.signUpForm.get('role')?.setValue(value)
    if (this.signUpForm.get('role')?.value === 2) this.signUp();
    else if (this.signUpForm.get('role')?.value === 1) this.nextStep()
  }

  validateNextStep():boolean {
    return (
      (this.formStepCount === 1 && (this.signUpForm.get('username')?.valid && this.signUpForm.get('email')?.valid && this.signUpForm.get('password')?.valid)) ||
      (this.formStepCount === 2 && this.signUpForm.get('role')?.valid) ||
      (this.formStepCount === 3 && (this.signUpForm.get('school_year')?.valid && this.signUpForm.get('section')?.valid))
    )
  }

}
