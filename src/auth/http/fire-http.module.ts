import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule, HttpHandler } from "@angular/common/http";
import { FireHttp } from './fire-http';
import { AuthService } from '../services/auth.service';

export function fireHttpFactory(handler: HttpHandler) {
  return new FireHttp(handler);
}

@NgModule({
  imports: [
    HttpClientModule
  ]
})
export class FireHttpModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FireHttpModule,
      providers: [
        AuthService,
        {
          provide: FireHttp,
          useFactory: fireHttpFactory,
          deps: [HttpHandler]
        }
      ]
    };
  }
}
