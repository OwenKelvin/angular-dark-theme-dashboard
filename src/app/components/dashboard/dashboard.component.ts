import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducers';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  exampleForm: FormGroup;
  triggerValidation: boolean;
  constructor(private store: Store<AppState>, private fb: FormBuilder) { }

  ngOnInit() {
    this.exampleForm = this.fb.group({
      phone: ['']
    });
    this.exampleForm.get('phone').valueChanges.subscribe(item => console.log(this.exampleForm.get('phone')));
  }

}
