import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { FireHttp } from './fire-http';
import { SecureStorage } from '@ionic-native/secure-storage';
import { AuthService } from "../services/auth.service";

export function fireHttpFactory(backend: XHRBackend, defaultOptions: RequestOptions, secureStorage: SecureStorage) {
  return new FireHttp(backend, defaultOptions, secureStorage);
}

@NgModule({
  imports: [
    HttpModule
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
          deps: [XHRBackend, RequestOptions, SecureStorage]
        }
      ]
    };
  }
}
