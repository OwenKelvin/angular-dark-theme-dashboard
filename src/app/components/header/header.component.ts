import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { Observable } from 'rxjs';
import { selectShowMenu } from 'src/app/store/selectors/menu-toggle.selector';
import { hideMenu, showMenu } from 'src/app/store/actions/menu-toggle.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})

export class HeaderComponent implements OnInit {
  isMenuClosed$: Observable<boolean>;
  isMenuClosed: boolean;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.isMenuClosed = true;
    this.isMenuClosed$ = this.store.select(selectShowMenu);

    this.isMenuClosed$.subscribe(isMenuClosed => {
      this.isMenuClosed = isMenuClosed;
      console.log(this.isMenuClosed);
    });
  }
  toggleMenu(): void {
    if (this.isMenuClosed) {
      this.store.dispatch(hideMenu());
    } else {
      this.store.dispatch(showMenu());
    }
  }
}
