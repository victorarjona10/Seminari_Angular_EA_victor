import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';
import { User } from '../models/user.model';
import { firstValueFrom } from 'rxjs';
import { Component, inject,EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-colaboradores',
  imports: [CommonModule],
  templateUrl: './colaboradores.component.html',
  styleUrl: './colaboradores.component.css',
  standalone: true
})
export class ColaboradoresComponent {
  users: User [];
  nom: string;

  constructor() {
    this.users = [];
    this.nom = 'Toni';
  }

  //Para poder usar los servicios que son get de usuario/usuarios
  userService = inject(UserService);

  async obtenerUsuarios() {
    try {
      const users = await firstValueFrom(this.userService.getUsers()); //firstValueFrom para convertir el Observable devuelto por getUsers en una Promise y luego usamos await para esperar a que la Promise se resuelva
      this.users = users || []; // Asegúrate de que siempre se asigne un array
      console.log(this.users); // Puedes ver los datos en la consola
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      this.users = []; // Asigna un array vacío en caso de error
    }
  }

  trackByUserId(index: number, user: any): number {
    return user.id;
  }

  @Output() changeNameEvent = new EventEmitter<string>();
  changeName(Name: string){
    this.changeNameEvent.emit(Name);
  }

}
