import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { of, throwError } from 'rxjs';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let authServiceSpy: jasmine.SpyObj<AuthenticationService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let toastCtrlSpy: jasmine.SpyObj<ToastController>;
  let toastSpy;

  beforeEach(waitForAsync(() => {
    authServiceSpy = jasmine.createSpyObj('AuthenticationService', ['login']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    toastCtrlSpy = jasmine.createSpyObj('ToastController', ['create']);
    toastSpy = jasmine.createSpyObj('Toast', ['present']);

    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [ ReactiveFormsModule ],
      providers: [
        FormBuilder,
        { provide: AuthenticationService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ToastController, useValue: toastCtrlSpy }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    toastCtrlSpy.create.and.resolveTo(toastSpy);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Navega correctamente', async () => {
    authServiceSpy.login.and.returnValue(of(true));
    await component.login();
    expect(toastSpy.present).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/pageinitier']);
  });

  it('Entro ala sistema', async () => {
    authServiceSpy.login.and.returnValue(of(false));
    await component.login();
    expect(toastSpy.present).toHaveBeenCalled();
    expect(toastCtrlSpy.create).toHaveBeenCalledWith(jasmine.objectContaining({
      message: 'Credenciales incorrectas',
      duration: 2000
    }));
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('login errors', async () => {
    authServiceSpy.login.and.returnValue(throwError(() => new Error('login failed')));
    await component.login();
    expect(toastSpy.present).toHaveBeenCalled();
    expect(toastCtrlSpy.create).toHaveBeenCalledWith(jasmine.objectContaining({
      message: 'Error en el sistema de inicio de sesión',
      duration: 2000
    }));
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});
