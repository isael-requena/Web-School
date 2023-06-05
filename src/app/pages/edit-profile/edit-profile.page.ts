import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserInterface } from '../../interfaces/User';
import { AuthService } from '../../services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  formProfileUser: FormGroup;
  user: UserInterface
  public isTeacher: boolean = false;

  constructor(
    private fb: FormBuilder,
    public auth: AuthService,
    public navCtl: NavController
  ) {
    this.user = auth.getAuth()
    this.formProfileUser = this.fb.group({
      fullName: [this.user?.username],
      email: [this.user?.email],
      role: [this.user?.role === 1 ? 'Estudiante' : 'Profesor'],
      school_year: [this.user?.school_year],
      section: [this.user?.section]
    })
    this.isTeacher = this.user.role === 2 ? true : false;
  }

  ngOnInit() {
  }

  //GETTERS
  get fullName() { return this.formProfileUser.get('fullName'); }
  get email() { return this.formProfileUser.get('email'); }
  get role() { return this.formProfileUser.get('role'); };
  get school_year() { return this.formProfileUser.get('school_year'); };
  get section() { return this.formProfileUser.get('section'); };

  getBack() {
    this.navCtl.back()
  }

}
