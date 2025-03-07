import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { firstValueFrom } from 'rxjs';
import { ColaboradoresComponent } from "../colaboradores/colaboradores.component";
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-usuario',
  imports: [CommonModule, ColaboradoresComponent],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css',
  standalone: true
})
export class UsuarioComponent {

  foto: string;
  mostrardata: boolean;
  
  usuario: User = {
    id: 1,
    name: "Toni",
    age: 40,
    email: "toni.oller@gmail.com",
  };
  
  constructor() {      
    this.foto = "https://github.com/tonioller.png";
    this.mostrardata = false;
  }

  mostrardatos(){
    this.mostrardata = true;
  }

  getName(Name: string){
    this.usuario.name = Name;
  }

}
