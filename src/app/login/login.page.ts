import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

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

  constructor(public formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      password: new FormControl("", Validators.required),
      unique: new FormControl("", Validators.required)
    });
  }

  ngOnInit() {}

  login() {
    console.log("unique", this.loginForm.value.unique);
    console.log("senha", this.loginForm.value.password);
  }
}
