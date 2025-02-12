import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[focusable]',
})
export class Focusable {
  elementRef = inject(ElementRef<HTMLElement>);

  focus() {
    this.elementRef.nativeElement.focus();
  }
}
