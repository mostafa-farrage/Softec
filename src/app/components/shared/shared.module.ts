import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './layout/layout.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PricePipe } from 'src/app/pipes/price.pipe';
import { LocalizationService } from '../../service/localization.service';
import { MaxLengthPipe } from 'src/app/pipes/max-length.pipe';
import { MaxLengthDotPipe } from 'src/app/pipes/max-length-dot.pipe';
import { AuthGuardService } from 'src/app/guards/auth-guard.service ';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { LoadingComponent } from './component/loading/loading.component';
import { NgControlComponent } from './component/ng-control/ng-control.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SimplePaginationComponent } from './component/simple-pagination/index/simple-pagination.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

// ui elements components
const uiElementsComponents = [
  SimplePaginationComponent,
  NgControlComponent,
  LoadingComponent,
];

// shared components
const sharedComponents = [
  LayoutComponent,
  SideMenuComponent,
];

// shared pipe

const sharedPipe =[
  MaxLengthPipe,
  MaxLengthDotPipe,
  PricePipe,
]

;

@NgModule({
  declarations: [
    ...sharedComponents,
    ...uiElementsComponents,
    ...sharedPipe
   ],
  imports: [
    CommonModule, FormsModule, RouterModule, ModalModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateModule,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }, isolate: true
    }),
  ],
  providers: [AuthGuardService, DatePipe],
  exports: [
    FormsModule, ReactiveFormsModule, RouterModule, ModalModule, HttpClientModule,
    TranslateModule, 
    ...sharedComponents,
    ...uiElementsComponents,
    ...sharedPipe
  ]
})
export class SharedModule {
  constructor(private translate: TranslateService, private localizationService: LocalizationService) {
    this.translate.use(localizationService.getLanguage());
    localizationService.setLanguage(localizationService.getLanguage())
  }
}
