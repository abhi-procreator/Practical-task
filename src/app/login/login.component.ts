import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../shared/service/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder,
    private httpService: HttpService,
    private router:Router) { }

  ngOnInit(): void {
    this.initializeLoginForm();
  }

  initializeLoginForm() {
    this.loginForm = this.fb.group({
      phone_number: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    });
  }

  get f() { return this.loginForm.controls; }

  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.httpService.postLogin(this.loginForm.value).subscribe((res: any) => {
      console.log(res);
      let obj = {
        token:res.token,
        id:res.user.client_id
      }
      localStorage.setItem('userDetails',JSON.stringify(obj))
      this.router.navigate(['/dashboard']);
    });
  }
}
