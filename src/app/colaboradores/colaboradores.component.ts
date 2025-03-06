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

  @Input() usuario: User = new User();

  constructor() {
    this.users = [];
    this.nom = 'Toni';
  }

  //Para poder usar los servicios que son get de usuario/usuarios
  userService = inject(UserService);

  async obtenerUsuarios() {

    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    });     
    this.users.push(this.usuario);
    console.log(this.users); // Puedes ver los datos en la consola
    }

  trackByUserId(index: number, user: any): number {
    return user.id;
  }

  @Output() changeNameEvent = new EventEmitter<string>();
  changeName(Name: string){
    this.changeNameEvent.emit(Name);
  }

  deleteUser(i: number) {
    console.log("delete User ",i);
    this.users.splice(i, 1);
  }

}
