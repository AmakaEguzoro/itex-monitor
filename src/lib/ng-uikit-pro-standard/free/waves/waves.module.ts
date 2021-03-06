import { NgModule, ModuleWithProviders  } from '@angular/core';
import { WavesDirective } from './waves-effect.directive';

@NgModule({
  declarations: [WavesDirective],
  exports: [WavesDirective]
})

export class WavesModule {
  public static forRoot(): ModuleWithProviders<WavesModule> {
    return {ngModule: WavesModule, providers: []};
  }
}
