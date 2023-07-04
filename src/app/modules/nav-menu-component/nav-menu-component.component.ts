import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-nav-menu-component',
  templateUrl: './nav-menu-component.component.html',
  styleUrls: ['./nav-menu-component.component.scss']
})
export class NavMenuComponentComponent implements OnInit {
  public userData:object;
  constructor(
    private userService : UserService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.userData = this.localStorageService.get('user');
    console.log(this.userData,'ikkkkkkkkk');
    
  }
  clickHandler() {

  }

  logout() {
    this.userService.logOut();
  }
}
