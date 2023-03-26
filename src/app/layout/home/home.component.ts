import { Component } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    sideBarOpen = false;

    sideBarToggler() {
        console.log(this.sideBarOpen)
        this.sideBarOpen = !this.sideBarOpen
    }
}
