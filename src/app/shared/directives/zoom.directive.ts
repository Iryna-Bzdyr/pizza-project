import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appZoom]'
})
export class ZoomDirective {

  constructor(private el:ElementRef) {
    // el.nativeElement.style.fontSize = '30px'

   }
@HostListener('mouseover') onMouseOver(){
  this.setFontSize(20)
}
@HostListener('mouseout') onMouseOut(){
  this.setFontSize(14)
}
setFontSize(size:number):void{
  this.el.nativeElement.style.fontSize = `${size}px` 

}
}
