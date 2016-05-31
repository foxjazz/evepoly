import {enableProdMode}  from '@angular/core';
import {bootstrap}       from '@angular/platform-browser-dynamic'
//import {JSONP_PROVIDERS} from '@angular/http';
import {AppComponent}    from './app/app.component'
import { HTTP_PROVIDERS  } from '@angular/http';
enableProdMode();

bootstrap(AppComponent, [HTTP_PROVIDERS]);
