import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hryvnia'
})
export class HryvniaPipe implements PipeTransform {

  transform(value: any, sb: string, curs: number): any {
  if (!sb){
    return value
  }
   if(!value){
return ''
   }
   if(!curs){
     curs = 1
   }
   else{
    return value*curs +  `${sb}`
   } 
  
  }

}
