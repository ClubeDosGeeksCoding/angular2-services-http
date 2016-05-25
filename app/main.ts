import { bootstrap }    from 'angular2/platform/browser';
import 'rxjs/Rx';
import { HTTP_PROVIDERS } from 'angular2/http';
import { AppComponent } from './app.component';

bootstrap(AppComponent, [HTTP_PROVIDERS]);