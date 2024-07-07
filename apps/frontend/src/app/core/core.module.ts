import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NgbCollapse} from '@ng-bootstrap/ng-bootstrap';

import {NavbarComponent} from './navbar/navbar.component';

@NgModule({
  declarations: [
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    NgbCollapse,
  ],
  exports: [
    NavbarComponent,
  ],
})
export class CoreModule {
}
