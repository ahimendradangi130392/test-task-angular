import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { ConfirmPasswordValidator } from "./confirm-password.validator";
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'eci-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private usersevice: UserService,
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private authService: AuthService,
    private notification: NotificationService,
    private localStorage: LocalStorageService,
    private router: Router
  ) {

  }
  isSignUp = false;
  form: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  registerForm: FormGroup;

  error: any
  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        first_name: ["", Validators.required],
        last_name: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        password: ["", Validators.required],
        confirmPassword: ["", Validators.required]
      },
      {
        validator: ConfirmPasswordValidator("password", "confirmPassword")
      }
    );
    if (this.localStorage.get('token')) {
      this.router.navigateByUrl('/user-profile');
      this.usersevice.user$.next(this.localStorage.get('user'));
    }
  }

  employees: [];

  submit() {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe(res => {
        if (res) {
          this.localStorage.set('token', res.access_token);
          this.localStorage.set('user', res.user);
          this.usersevice.user$.next(res.user);
          this.router.navigateByUrl('/user-profile');
          this.notification.showInfo('Logged in successfully')
        }
      }, error => {
        if (error?.error?.email) {
          this.notification.showWarn(error?.error?.email[0])
        } else if (error?.error?.password) {
          this.notification.showWarn(error?.error?.password[0])
        } else{
          this.notification.showError('Something went wrong !!')
        }
      })
    }
  }

  signUp(event): void {
    this.isSignUp = event;
  }


  signUpSubmit(): void {
    if (this.registerForm.invalid) return;
    this.usersevice.register(this.registerForm.value).subscribe((res) => {
      if (res) {
        this.toastrService.success(res.message);
        this.isSignUp = false;
      }
    },error=>{
      console.log(error);
      this.notification.showError('Something went wrong !!')
    })
  }
}
