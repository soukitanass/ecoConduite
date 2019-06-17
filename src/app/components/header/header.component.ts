import { Component} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor() { }

  ngOnInit() {
  }

  toggleSidebar(){
    document.getElementById("sidebar").classList.toggle('active');
    }
}
