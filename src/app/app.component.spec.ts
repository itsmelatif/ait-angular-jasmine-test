import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatDialogComponent } from './components/mat-dialog/mat-dialog.component';
import { UserService } from './services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { DummyDataUsers } from './test-data/dummy_data_users_response';

describe('AppComponent', () => {
  let de: DebugElement
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let fakeUserService: UserService;
  let dialog: MatDialog;
  let listData = DummyDataUsers.list;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatInputModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        ReactiveFormsModule,
        FormsModule,
      ],
      providers: [
        { provide: UserService, useValue: fakeUserService },
        {
          provide : MAT_DIALOG_DATA,
          useValue : {}
        }
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    dialog = TestBed.get(MatDialog);
  });

  it('case #1 : should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('case #2 : should render register button', () => {
    const buttonAdd = de.query(By.css('#register'));
    expect(buttonAdd).toBeTruthy();
  });

  it('case #3: should show user registration form dialog when register button clicked', () => {
    spyOn(component, 'getUsers')
    fixture.detectChanges();

    const buttonAdd = de.query(By.css('#register'));
    spyOn(component, 'onCreateUser');
    buttonAdd.nativeElement.click();
    expect(component.onCreateUser).toHaveBeenCalledTimes(1);
    fixture.detectChanges();

    dialog.open(MatDialogComponent);
    fixture.detectChanges();

    const popUpHeader = document.getElementsByTagName('h1')[0] as HTMLHeadElement;
    expect(popUpHeader.innerText).toBe('Register New User');
  });

  it('case #4: should load data from https://jsonplaceholder.typicode.com/users, so it can bind to user-list component', () => {
    spyOn(component, 'getUsers')
    expect(component.getUsers).toBeTruthy()
  });

  it('case #5: should render user-list component', () => {
    spyOn(component, 'getUsers')
    fixture.detectChanges();

    const userList = de.query(By.css('app-user-list'));
    expect(userList).toBeTruthy();

    component.users = listData;
    fixture.detectChanges();
    expect(userList.properties['users']).toBe(listData);

  });

  it('case #6: should store data to localStorage when "Add" button in user-registration-form dialog clicked', () => {
    // done in modal dialog
  });

  it('case #7: should close user-registration-form when "Close" button in user-registration-form dialog clicked', () => {
    // done in modal dialog
  });
});
