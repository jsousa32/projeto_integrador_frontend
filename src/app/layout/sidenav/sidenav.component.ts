import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginUser } from 'src/app/model/loginModel';
import { StorageService } from 'src/app/services/storage.service';
import { sideData } from './side-data';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
    @Output() toggleSidebar: EventEmitter<any> = new EventEmitter();
    user!: LoginUser;

    sideData = sideData;

    constructor(private session: StorageService) {}

    ngOnInit(): void {
        this.user = this.session.getStorage('user');
    }

    toggleSide() {
        this.toggleSidebar.emit();
    }
}
