import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FeatureComponent } from './feature/feature.component';
import { PageLayoutComponent } from './page-layout/page-layout.component';
import { RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { SignTemplatesComponent } from './sign-templates/sign-templates.component';
import { SingleProductDetailsComponent } from './single-product-details/single-product-details.component';
import { AboutSingleProductDetailsComponent } from './about-single-product-details/about-single-product-details.component';
import { WhyTotoSignComponent } from './why-toto-sign/why-toto-sign.component';


const routes = [
  {path: '', component: PageLayoutComponent, children: [
    {path: 'landing-page', component: HomeComponent},
    {path: 'product', component: ProductComponent},
    {path: 'sign-templates', component: SignTemplatesComponent},
    {path: 'single-product-details', component: SingleProductDetailsComponent},
    {path: 'about-sign-product', component: AboutSingleProductDetailsComponent},
    {path: 'why-totosign', component: WhyTotoSignComponent},
  ]}
];
@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,FooterComponent, FeatureComponent, PageLayoutComponent, ProductComponent, SignTemplatesComponent, SingleProductDetailsComponent, AboutSingleProductDetailsComponent, WhyTotoSignComponent
  ],
  imports: [
    CommonModule,RouterModule.forChild(routes)
  ],
  exports: []
})
export class PageLayoutModule { }
