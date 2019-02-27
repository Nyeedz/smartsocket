import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService } from "../services/authentication/authentication.service";
import { AlertService } from "../services/alert/alert.service";
import { first } from "rxjs/operators";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  loading: boolean = false;
  returnUrl: string;

  error_messages = {
    unique: [
      {
        type: "required",
        message: "E-mail ou telefone obrigatório"
      }
    ],
    password: [
      {
        type: "required",
        message: "Senha obrigatória"
      }
    ]
  };

  constructor(
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    if (this.authenticationService.currentUserValue)
      this.router.navigate(["/"]);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      password: new FormControl("", Validators.required),
      unique: new FormControl("", Validators.required)
    });

    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    this.loading = true;

    this.authenticationService
      .login(this.loginForm.value.unique, this.loginForm.value.password)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate([this.returnUrl]);
          this.loading = false;
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        }
      );
    this.loading = false;
  }
}
