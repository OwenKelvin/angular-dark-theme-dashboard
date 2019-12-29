import { Component } from '@angular/core';

export const SECTION_HOME = 'home';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  currentSection = 'home';

  onSectionChange(newSection: string) {
    this.currentSection = newSection;
  }

  scrollTo(section) {
    document.querySelector('#' + section)
      .scrollIntoView();
  }
}
