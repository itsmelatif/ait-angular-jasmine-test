import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render register button', () => {
    // TODO: write unit test that expect register button has show in app
  });

  it('should show user registration form dialog when register button clicked', () => {
    // TODO: write unit test that expect user registration form rendered at dialog when register button clicked
  });

  it('should load data from https://jsonplaceholder.typicode.com/users, so it can bind to user-list component', () => {
    // TODO: write unit test that expect all data fetched from URL and store to localStorage
  });

  it('should render user-list component', () => {
    // TODO: write unit test that expect user-list component has show in app with data provided from https://jsonplaceholder.typicode.com/users
  });

  it('should store data to localStorage when "Add" button in user-registration-form dialog clicked', () => {
    // TODO: write unit test that expect entried data to append to localStorage, then close the dialog
  });

  it('should close user-registration-form when "Close" button in user-registration-form dialog clicked', () => {
    // TODO: write unit test that expect user-registration-form dialog closed when button clicked
  });
});
