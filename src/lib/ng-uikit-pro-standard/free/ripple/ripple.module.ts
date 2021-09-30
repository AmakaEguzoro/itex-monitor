import { NgModule, ModuleWithProviders  } from '@angular/core';
import { RippleDirective } from './ripple-effect.directive';

@NgModule({
  declarations: [RippleDirective],
  exports: [RippleDirective]
})

export class RippleModule {
  public static forRoot(): ModuleWithProviders<RippleModule> {
    return {ngModule: RippleModule, providers: []};
  }
}
