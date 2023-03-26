import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Output() toggleSide: EventEmitter<any> = new EventEmitter();
  @Input() sideBarOpen: boolean = false;

  toggleSidenav() {
    this.toggleSide.emit();
  }
}
