import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store/reducers';
import { selectShowMenu } from 'src/app/store/selectors/menu-toggle.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less']
})
export class LayoutComponent implements OnInit {
  isMenuOpen$: Observable<boolean>;

  constructor(private store: Store<fromStore.AppState>) { }

  ngOnInit() {
    this.isMenuOpen$ = this.store.select(selectShowMenu);
  }

}
