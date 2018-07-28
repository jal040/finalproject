import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ClarityModule } from '@clr/angular';
import { ROUTING } from "./app.routing";
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { HomeComponent } from "./home/home.component";
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

import { UserService } from './user.service';
import { StockApiDataService } from './stock-api-data.service';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        RegistrationComponent,
        LoginComponent,
        LogoutComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        HttpClientModule,
        ClarityModule,
        ROUTING,
        ChartsModule
    ],
    providers: [UserService, StockApiDataService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
