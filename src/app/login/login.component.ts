import { CommonModule } from '@angular/common';
import { Component, inject,EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true
})
export class LoginComponent {

  formularioLogin: FormGroup;
  authService = inject(AuthService);
  @Output() loggedin = new EventEmitter<string>();

  constructor(private form: FormBuilder){
    this.formularioLogin = this.form.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]], 
    });
  }

  hasError(controlName:string, errorType:string){
    return this.formularioLogin.get(controlName)?.hasError(errorType) && this.formularioLogin.get(controlName)?.touched;  
  }

  login(){
    if (this.formularioLogin.invalid) {
      this.formularioLogin.markAllAsTouched();
      return;
    }

    const loginData = this.formularioLogin.value;

    this.authService.login(loginData).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);
        alert('Inicio de sesión exitoso');
      },
      error: (error) => {
        console.error('Error en el login:', error);
        alert('Error en el login, verifica tus credenciales');
      }
    });
  }
}
