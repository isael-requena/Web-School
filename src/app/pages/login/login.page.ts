import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  //Al presionar enter
  @HostListener('keydown.enter', ['$event'])
  Enter(event: KeyboardEvent) {
    if (this.loginForm.get('email')?.value && this.loginForm.get('password')?.value) {
      this.login();
    }
  }
  public loginForm: FormGroup;
  public showPassword: boolean = false;
  public hasAuthError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      'email': [null, Validators.compose([
        Validators.required,
        Validators.email,
      ])],
      'password': [null, Validators.compose([
        Validators.required,
        Validators.minLength(4),
      ])]
      });
  }

  ngOnInit() {
  }

  login(event?: Event) {
    this.hasAuthError = false;
    event?.preventDefault()
    const data: {email:string, password: string} = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    }
    const user = this.auth.dummyLogin(data)
    if (user) this.router.navigate(['/home'])
    else {
      this.hasAuthError = true;
    }
  }

  handleShowPassword() {
    this.showPassword = !this.showPassword
  }

  closeModal() {
    if(this.hasAuthError) {
      this.hasAuthError = false;
    }
  }
}
