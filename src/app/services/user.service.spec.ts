import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DummyDataUsers } from '../test-data/dummy_data_users_response';
import { AppConstant } from '../constant/app-constant';

describe('UserService', () => {

  let fakeUserService: UserService;
  let httpController: HttpTestingController;

  let endPoint = AppConstant.END_POINT;
  let keyResponse = DummyDataUsers.key_response;
  let dummyDataUsers = DummyDataUsers.list;
  let postData = DummyDataUsers.post;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    fakeUserService = TestBed.inject(UserService);
    httpController = TestBed.inject(HttpTestingController);
  })

  it('case #1 : should call getUsers() and show results', () => {
    fakeUserService.getUsers().subscribe(res => {
      expect(res).toEqual(dummyDataUsers);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${endPoint}users.json`
    });

    req.flush(dummyDataUsers);
  })

  it('case #2: should call saveUsers() and send parameters', () => {
    fakeUserService.saveUser(postData).subscribe(res => {
      expect(res).toEqual(keyResponse);
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${endPoint}users.json`
    });

    req.flush(keyResponse);
  });
});
