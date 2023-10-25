import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  constructor(public formBuilder:FormBuilder, public loadingCtrl: LoadingController, public authService: AuthenticationService, public router:Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fullName :['', [Validators.required]],
      email :['',[
      Validators.required,
      Validators.email,
      Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
    ]],
      password: ['',[
      Validators.required,
      Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}")
      ]]
    })
  }

  get errorControl() {
    return this.registerForm?.controls;
}

async signUp() {
  const loading = await this.loadingCtrl.create();
  await loading.present();
  if(this.registerForm?.valid) {
    const user = await this.authService.registerUser(this.registerForm.value.email, this.registerForm.value.password).catch((error) => {
      console.log(error);
      loading.dismiss()

    })

    if(user){
      loading.dismiss()
      this.router.navigate(['/home'])
    }else {
      console.log("provide correct values");

    }
  }
}

}
