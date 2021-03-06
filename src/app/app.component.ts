import { Component, OnInit } from '@angular/core';
import { ServiceWorkerService } from './services/service-worker.service';

export const SECTION_HOME = 'home';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  constructor(private serviceWorkerService: ServiceWorkerService) {
  }
  currentSection = 'home';
  ngOnInit() {
    this.serviceWorkerService.install();
  }

  onSectionChange(newSection: string) {
    this.currentSection = newSection;
  }

  scrollTo(section: string) {
    document.querySelector('#' + section)?.scrollIntoView();
  }
}
