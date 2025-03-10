import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.model';
@Pipe({
  name: 'nombre'
})
export class NombrePipe implements PipeTransform {

  transform(value: User[], query: string): unknown {
    if (query === '' || query === undefined) {
      return value;
    }
    return value.filter((user) => user.name.toLowerCase().indexOf(query) != -1);
  }

}
