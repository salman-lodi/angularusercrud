import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../model/user.model";
import { Observable } from "rxjs/index";
import { ApiResponse } from "../model/api.response";

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}
  baseUrl: string = "http://localhost:3000";

  login(loginPayload): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      "http://localhost:3000/" + "token/generate-token",
      loginPayload
    );
  }

  getUsers(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + "/users/");
  }

  getUserById(id: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + "/users/" + id);
  }

  createUser(user: User): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + "/users/", user);
  }

  updateUser(user: User): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(
      this.baseUrl + "/users/" + user._id,
      user
    );
  }

  deleteUser(id: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.baseUrl + "/users/" + id);
  }

  createDepartment(department: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      this.baseUrl + "/department/",
      department
    );
  }

  getDepartments(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.baseUrl + "/department/");
  }
}
