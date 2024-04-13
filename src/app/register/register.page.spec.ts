import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterPage } from './register.page';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '../services/authentication.service';
import { ToastController } from '@ionic/angular';
import { of, throwError } from 'rxjs';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let authService: jasmine.SpyObj<AuthenticationService>;
  let toastController: jasmine.SpyObj<ToastController>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthenticationService', ['register']);
    const toastControllerSpy = jasmine.createSpyObj('ToastController', ['create']);

    await TestBed.configureTestingModule({
      declarations: [ RegisterPage ],
      imports: [ ReactiveFormsModule, RouterTestingModule ],
      providers: [
        FormBuilder,
        { provide: AuthenticationService, useValue: authServiceSpy },
        { provide: ToastController, useValue: toastControllerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthenticationService) as jasmine.SpyObj<AuthenticationService>;
    toastController = TestBed.inject(ToastController) as jasmine.SpyObj<ToastController>;
    fixture.detectChanges();
  });

  it('crea el formulario con tres campos', () => {
    expect(component.registerForm.contains('username')).toBeTrue();
    expect(component.registerForm.contains('password')).toBeTrue();
    expect(component.registerForm.contains('email')).toBeTrue();
  });

  it('username debe ser obligatorio', () => {
    const control = component.registerForm.get('username');
    control.setValue('');
    expect(control.valid).toBeFalse();
  });

  it('se debe registrar un usuario exitosamente', async () => {
    authService.register.and.returnValue(of({}));
    toastController.create.and.resolveTo({
      present: jasmine.createSpy()
    } as any);  

    component.register();

    expect(authService.register).toHaveBeenCalledWith('user', 'pass');
    expect(toastController.create).toHaveBeenCalledTimes(1);
    expect(toastController.create.calls.mostRecent().args[0].message).toEqual('Registro exitoso');
  });

  it('maneja errores en el registro', async () => {
    authService.register.and.returnValue(throwError(() => new Error('Error en el registro')));
    toastController.create.and.resolveTo({
      present: jasmine.createSpy()
    } as any); 

    component.register();

    expect(authService.register).toHaveBeenCalledWith('user', 'pass');
    expect(toastController.create).toHaveBeenCalledTimes(1);
    expect(toastController.create.calls.mostRecent().args[0].message).toEqual('Error en el registro');
  });
});
