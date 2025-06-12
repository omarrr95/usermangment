import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  private isHomePageSubject = new BehaviorSubject<boolean>(false);
  isHomePage$ = this.isHomePageSubject.asObservable();

  setIsHomePage(value: boolean): void {
    this.isHomePageSubject.next(value);
  }
}
