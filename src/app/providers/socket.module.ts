import { NgModule,ModuleWithProviders  } from '@angular/core';
import { SocketService } from './socket.service';
@NgModule({
})
export class SocketModule {
  static forRoot(): ModuleWithProviders<SocketModule> {
    return {
      ngModule: SocketModule,
      providers: [ SocketService]
    }
  }
}