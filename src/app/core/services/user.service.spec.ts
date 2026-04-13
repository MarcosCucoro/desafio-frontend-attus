import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { UserData } from '../models/userData';
import { firstValueFrom } from 'rxjs';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000';

  const mockUser: UserData = {
    id: '1',
    name: 'João Silva',
    email: 'joao@example.com',
    cpf: '12345678909',
    phone: '11999999999',
    phoneType: 0,
  };

  const mockUsers: UserData[] = [
    mockUser,
    {
      id: '2',
      name: 'Maria Santos',
      email: 'maria@example.com',
      cpf: '98765432100',
      phone: '11988888888',
      phoneType: 1,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), UserService],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getUsers', () => {
    it('should fetch all users', async () => {
      const promise = firstValueFrom(service.getUsers());

      const req = httpMock.expectOne(`${apiUrl}/users`);
      expect(req.request.method).toBe('GET');
      req.flush(mockUsers);

      const users = await promise;
      expect(users.length).toBe(2);
      expect(users).toEqual(mockUsers);
    });

    it('should handle empty user list', async () => {
      const promise = firstValueFrom(service.getUsers());

      const req = httpMock.expectOne(`${apiUrl}/users`);
      req.flush([]);

      const users = await promise;
      expect(users.length).toBe(0);
    });
  });

  describe('getUserById', () => {
    it('should fetch a user by id', async () => {
      const promise = firstValueFrom(service.getUserById('1'));

      const req = httpMock.expectOne(`${apiUrl}/users/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockUser);

      const user = await promise;
      expect(user).toEqual(mockUser);
      expect(user.id).toBe('1');
    });

    it('should handle different user IDs', async () => {
      const userId = '999';
      const promise = firstValueFrom(service.getUserById(userId));

      const req = httpMock.expectOne(`${apiUrl}/users/${userId}`);
      req.flush({ ...mockUser, id: userId });

      const user = await promise;
      expect(user.id).toBe(userId);
    });
  });

  describe('postNewUser', () => {
    it('should create a new user', async () => {
      const newUser = { ...mockUser, id: '3' };
      const promise = firstValueFrom(service.postNewUser(newUser));

      const req = httpMock.expectOne(`${apiUrl}/users`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newUser);
      req.flush(newUser);

      const user = await promise;
      expect(user).toEqual(newUser);
      expect(user.id).toBe('3');
    });

    it('should send correct user data in POST request', async () => {
      const userToCreate: UserData = { ...mockUser, id: '4' };
      const promise = firstValueFrom(service.postNewUser(userToCreate));

      const req = httpMock.expectOne(`${apiUrl}/users`);
      expect(req.request.body.name).toBe(userToCreate.name);
      expect(req.request.body.email).toBe(userToCreate.email);
      req.flush(userToCreate);

      await promise;
    });
  });

  describe('updateUser', () => {
    it('should update an existing user', async () => {
      const updatedUser = { ...mockUser, name: 'João Silva Atualizado' };
      const promise = firstValueFrom(service.updateUser(updatedUser));

      const req = httpMock.expectOne(`${apiUrl}/users/1`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(updatedUser);
      req.flush(updatedUser);

      const user = await promise;
      expect(user.name).toBe('João Silva Atualizado');
    });

    it('should send the correct user ID in the URL', async () => {
      const userId = '5';
      const userToUpdate = { ...mockUser, id: userId };
      const promise = firstValueFrom(service.updateUser(userToUpdate));

      const req = httpMock.expectOne(`${apiUrl}/users/${userId}`);
      expect(req.request.method).toBe('PUT');
      req.flush(userToUpdate);

      await promise;
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const promise = firstValueFrom(service.deleteUser('1'));

      const req = httpMock.expectOne(`${apiUrl}/users/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush(mockUser);

      await promise;
    });

    it('should handle deletion of different user IDs', async () => {
      const userId = '10';
      const promise = firstValueFrom(service.deleteUser(userId));

      const req = httpMock.expectOne(`${apiUrl}/users/${userId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush({});

      await promise;
    });
  });

  describe('Signal Management', () => {
    it('should update refresh signal', () => {
      const initialValue = service.refresh$();
      service.notifyRefresh();
      expect(service.refresh$()).toBe(initialValue + 1);
    });

    it('should increment refresh signal multiple times', () => {
      const initialValue = service.refresh$();
      service.notifyRefresh();
      service.notifyRefresh();
      service.notifyRefresh();
      expect(service.refresh$()).toBe(initialValue + 3);
    });

    it('should set search signal', () => {
      service.setSearch('test search');
      expect(service.search$()).toBe('test search');
    });

    it('should update search signal', () => {
      service.setSearch('first search');
      expect(service.search$()).toBe('first search');

      service.setSearch('second search');
      expect(service.search$()).toBe('second search');
    });
  });
});
