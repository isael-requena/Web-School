import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserInterface } from '../../interfaces/User';

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
    try {
      this.hasAuthError = false;
      event?.preventDefault()
      const data: {email:string, password: string} = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value
      }
      this.auth.login(data).then((Res: any) => {
        console.log(Res)
        if (Res.message || !Res) {
          console.log('USUARIO INVALIDO')
          this.hasAuthError = true;
        }
        else this.router.navigate(['/home'])
      })
    } catch (error) {
      this.hasAuthError = true
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

  goToSignUp() {
    console.log('login to signup func')
    this.router.navigate(['/signup'])
  }
}
