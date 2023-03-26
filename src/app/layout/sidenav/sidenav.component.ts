import { Component, EventEmitter, Output } from '@angular/core';
import { sideData } from './side-data';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
    @Output() toggleSidebar: EventEmitter<any> = new EventEmitter();

    sideData = sideData;

    toggleSide() {
        this.toggleSidebar.emit();
    }
}
