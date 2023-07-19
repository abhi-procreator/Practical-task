import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../shared/service/http.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  regisForm!: FormGroup;
  submitted = false;
  Name: any;
  constructor(private fb: FormBuilder,
    private httpService: HttpService, private router: Router) { }

  ngOnInit(): void {
    this.initializeRegisForm();
  }

  initializeRegisForm() {
    this.regisForm = this.fb.group({
      Name: ['', Validators.compose([Validators.required])],
      Email: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      phone_number: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      Password: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      confirm_password: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      Country: ['', Validators.compose([Validators.required])],
      UserName: ['', Validators.compose([Validators.required])],
    });
  }

  get f() { return this.regisForm.controls; }

  register() {
    this.submitted = true;
    if (this.regisForm.invalid) {
      return;

    }
    this.httpService.postRegis(this.regisForm.value).subscribe((res: any) => {
      console.log(res);
    });
  }
}

