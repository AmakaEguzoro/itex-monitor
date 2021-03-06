import { NgModule, ModuleWithProviders, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[mdbToastContainer]',
  exportAs: 'mdb-toast-container',
})
export class ToastContainerDirective {
  constructor(private el: ElementRef) {}
  getContainerElement(): HTMLElement {
    return this.el.nativeElement;
  }
}

@NgModule({
  exports: [ToastContainerDirective],
  declarations: [ToastContainerDirective],
})
export class ToastContainerModule {
  static forRoot(): ModuleWithProviders<ToastContainerModule> {
    return {
      ngModule: ToastContainerModule,
      providers: []
    };
  }
}
