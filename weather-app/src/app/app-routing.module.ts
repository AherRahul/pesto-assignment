import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CityPageComponent } from "./city-page/city-page.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";

const routes: Routes = [
  {
    path: "",
    component: LandingPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
