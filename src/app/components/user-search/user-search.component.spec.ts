import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSearchComponent } from './user-search.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { DummyDataUsers } from 'src/app/test-data/dummy_data_users_response';
import { first } from 'rxjs';
import { DebugElement, ElementRef } from '@angular/core';

describe('UserSearchComponent', () => {
  let component: UserSearchComponent;
  let fixture: ComponentFixture<UserSearchComponent>;
  let search = DummyDataUsers.search;
  let input: ElementRef;
  let de: DebugElement;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatInputModule,
        MatFormFieldModule,
        BrowserAnimationsModule
      ],
      declarations: [ UserSearchComponent ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSearchComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    input = de.query(By.css('input'));
    fixture.detectChanges();
  });

  it('case #1 : should create component', () => {
    expect(component).toBeTruthy();
  });

  it('case #2: should create search label', () => {
    const searchLabel = de.query(By.css('#search_label')).nativeElement.innerText;
    expect(searchLabel).toMatch('Search User');
  });

  it('case #3 : should create search input', () => {
      const searchInput = de.query(By.css('mat-form-field#search input')).nativeElement;
      expect(searchInput).toBeTruthy();
  });

  it('case #4 : should emit string after keyup event', () => {
    spyOn(component.filter, 'emit').and.callThrough();

    let event = new KeyboardEvent('keyup');
    input.nativeElement.dispatchEvent(event);

    expect(component.filter.emit).toHaveBeenCalled();
  })
});
