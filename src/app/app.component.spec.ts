import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FullWidthCenteredContentComponent } from './components/full-width-centered-content/full-width-centered-content.component';
import { StoreModule } from '@ngrx/store';
import { REDUCER_TOKEN, metaReducers, reducerProvider } from './store/reducers';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot(REDUCER_TOKEN, {
          metaReducers,
          runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true,
          }
        }),
      ],
      declarations: [
        AppComponent, HomeComponent, FullWidthCenteredContentComponent
      ],
      providers: [reducerProvider]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });
  describe('Property currentSelection', () => {
    it('should have as initial value "home"', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.debugElement.componentInstance;
      expect(component.currentSection).toBe('home');
    });
  });
  describe('Function onSectionChange', () => {
    it('should assign private variable currentSection the value passed', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.debugElement.componentInstance;
      component.onSectionChange('contact-us');
      fixture.detectChanges();
      expect(component.currentSection).toBe('contact-us');
    });
  });
  describe('Function scrollTo', () => {
    it('should scroll the document to the section with the passed id', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const component = fixture.debugElement.componentInstance;
      const homeElement = document.createElement('home');
      homeElement.setAttribute('id', 'home');
      document.querySelector('body')?.append(homeElement);
      const spyObj = spyOn(document, 'querySelector').and.returnValue(jasmine.createSpyObj({ scrollIntoView: () => true }));
      component.scrollTo('home');
      fixture.detectChanges();
      expect(spyObj).toHaveBeenCalled();
    });
  });
});
