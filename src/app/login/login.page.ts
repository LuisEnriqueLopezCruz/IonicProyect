import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  loginForm: FormGroup;
  constructor(private authService: AuthenticationService,
    private toastController: ToastController,private router: Router,
    private formBuilder: FormBuilder) {
      this.loginForm = this.formBuilder.group({
        username: ['', [Validators.required, Validators.minLength(3)]],  
        password: ['', [Validators.required]]
      });
     }

  ngOnInit() {
  }

  login() {
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;
    this.authService.login(username, password).subscribe({
      next: async (success) => {
        if (success) {
          const toast = await this.toastController.create({
            message: 'Inicio de sesión exitoso',
            duration: 2000
          });
          toast.present();
          this.router.navigate(['/pageinitier']);  
        } else {
          const toast = await this.toastController.create({
            message: 'Credenciales incorrectas',
            duration: 2000
          });
          toast.present();
        }
      },
      error: async () => {
        const toast = await this.toastController.create({
          message: 'Error en el sistema de inicio de sesión',
          duration: 2000
        });
        toast.present();
      }
    });
  }

}
