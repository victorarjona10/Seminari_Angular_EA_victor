import { Component, OnInit, inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true
})
export class RegisterComponent implements OnInit {
  FormularioRegister: FormGroup;

  authService = inject(AuthService);
   @Output() exportRegisteredIn = new EventEmitter<boolean>();

  constructor(private form: FormBuilder){
    this.FormularioRegister = this.form.group({
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.minLength(2), Validators.min(1)]], 
      name: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  ngOnInit(): void {
    this.FormularioRegister = this.form.group({
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.minLength(2)]], 
      name: ['', [Validators.required, Validators.minLength(2)]]
    });
  }
  hasError(controlName: string, errorName: string): boolean {
    return this.FormularioRegister.controls[controlName].hasError(errorName);
  }

  register(): void {
    if (this.FormularioRegister.valid) {

      const user = this.FormularioRegister.value;
      
      this.authService.registerUser(user).subscribe({
        next: (response) => {
        this.exportRegisteredIn.emit(true);
          console.log('User registered', response);
      }, 
      error: (error) => {
        console.error('Error en el register:', error);
        alert('Error en el register, verifica tus credenciales');
      }
    });
    } else {
      this.FormularioRegister.markAllAsTouched();
    }
  }
}