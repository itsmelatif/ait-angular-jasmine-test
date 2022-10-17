import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DummyDataUsers } from 'src/app/test-data/dummy_data_users_response';
import { MatDialogComponent } from './mat-dialog.component';

describe('MatDialogComponent', () => {
  let component: MatDialogComponent;
  let fixture: ComponentFixture<MatDialogComponent>;
  let de: DebugElement
  let postData = DummyDataUsers.post
  const matDialogSpy: jasmine.SpyObj<MatDialogRef<any>> = jasmine.createSpyObj("MatDialogRef", ["open", "close"]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatDialogComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule

      ],
      providers: [
        { provide: MatDialogRef, useValue: matDialogSpy },
        { provide: MAT_DIALOG_DATA,  useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
  });

  it('case #1: should create a user form group element', () => {
    const inputElements = de.queryAll(By.css('.userform'));
    expect(inputElements.length).toEqual(5)
  });

  it('case #2: should create a button add ', () => {
    const buttonAdd = de.query(By.css('#add'));
    expect(buttonAdd).toBeTruthy();
  });

  it('case #3: should create a button cancel ', () => {
    const buttonCancel = de.query(By.css('#cancel'));
    expect(buttonCancel).toBeTruthy();
  });

  it('case #4: should form invalid when empty', () => {
    expect(component.userForm.valid).toBeFalsy();
  });

  it('case #5: should email field validity', () => {
    let email = component.userForm.controls['email'];
    email.setValue("test");
    expect(email.hasError('email')).toBeTruthy();
  });

  it('case #6: submit and emit data', () => {
    const buttonSubmit = de.query(By.css('#add'));
    spyOn(component, 'onSubmit');

    buttonSubmit.nativeElement.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(1);

    component.userForm.patchValue(postData);
    component.onSaveUser.subscribe(res => {
      expect(res).toEqual(postData)
    })

  });

  it('case #7: close dialog after button click cancel', () => {
    const buttonCancel = de.query(By.css('#cancel'));
    buttonCancel.nativeElement.click();
    expect(matDialogSpy.close).toHaveBeenCalled();
  })
});
