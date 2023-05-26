import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FeatureComponent } from './feature/feature.component';
import { PageLayoutComponent } from './page-layout/page-layout.component';
import { RouterModule } from '@angular/router';

const routes = [
  {path: '', component: PageLayoutComponent, children: [
    {path: 'landing-page', component: HomeComponent}
  ]}
]
@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,FooterComponent, FeatureComponent, PageLayoutComponent
  ],
  imports: [
    CommonModule,RouterModule.forChild(routes)
  ],
  exports: []
})
export class PageLayoutModule { }
