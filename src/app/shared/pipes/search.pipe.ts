import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(users: any, name:string): any {
   if(!name){
     return users
   }
   if (!users){
     return []
   }
   return users.filter(use=> use.name.toLowerCase().indexOf(name.toLowerCase())!=-1)
  }

}
