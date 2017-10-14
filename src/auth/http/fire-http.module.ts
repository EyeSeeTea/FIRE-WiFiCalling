import { NgModule, ModuleWithProviders } from '@angular/core';
import { FireHttp } from './fire-http';
import { SecureStorage } from '@ionic-native/secure-storage';
import { AuthService } from '../services/auth.service';
import { HttpClientModule, HttpHandler } from "@angular/common/http";

export function fireHttpFactory(handler: HttpHandler, secureStorage: SecureStorage) {
  return new FireHttp(handler, secureStorage);
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
        SecureStorage,
        AuthService,
        {
          provide: FireHttp,
          useFactory: fireHttpFactory,
          deps: [HttpHandler, SecureStorage]
        }
      ]
    };
  }
}
