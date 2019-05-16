import { Routes } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
export const appRoutes: Routes =[
    {
        path:'',
        component: HomeComponent
    },
    {
        path:'navigation',
        component: NavigationComponent
    },
    {
        path:'about',
        component: AboutComponent
    },
    {
        path:'contact',
        component: ContactComponent
    }
    

]