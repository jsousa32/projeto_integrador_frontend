import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/model/loginModel';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { StorageService } from 'src/app/services/storage.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
    @Output() toggleSide: EventEmitter<any> = new EventEmitter();
    @Input() sideBarOpen: boolean = false;
    user!: LoginUser;

    constructor(
        private session: StorageService,
        private router: Router,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.search();
    }

    search() {
        this.user = this.session.getStorage('user');
    }

    toggleSidenav() {
        this.toggleSide.emit();
    }

    logout() {
        localStorage.clear();
        this.router.navigateByUrl('/login');
    }

    editProfile() {
        this.dialog.open(ProfileComponent, {
            disableClose: false,
            maxWidth: 600,
            maxHeight: 800,
            data: this.user,
        });
    }
}
