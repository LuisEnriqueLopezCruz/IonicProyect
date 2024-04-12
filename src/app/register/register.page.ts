import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  username: string;
  password: string;
  email: string;
  constructor(private formBuilder: FormBuilder,private authService: AuthenticationService, private toastController: ToastController, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }


  register() {
    const username = this.registerForm.get('username').value;
    const password = this.registerForm.get('password').value;
    const email = this.registerForm.get('email').value;
    this.authService.register(username, password).subscribe({
      next: async () => {
        const toast = await this.toastController.create({
          message: 'Registro exitoso',
          duration: 2000
        });
        toast.present();
        this.router.navigate(['/login']);
      },
      error: async () => {
        const toast = await this.toastController.create({
          message: 'Error en el registro',
          duration: 2000
        });
        toast.present();
      }
    });
  }
}
