import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../../models/user.model";

@Injectable({
  providedIn: "root"
})
export class UserService {
  public apiUrl: string = "http://localhost:3000/v1";
  jwt = JSON.parse(localStorage.getItem("jwt"));
  headers = {
    Authorization: `${this.jwt}`
  };

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<User[]>(`${this.apiUrl}/user`, {
      headers: this.headers
    });
  }

  getById(id: Number) {
    return this.http.get(`${this.apiUrl}/user/${id}`, {
      headers: this.headers
    });
  }

  register(user: User) {
    return this.http.post(`${this.apiUrl}/user`, user);
  }

  update(user: User) {
    return this.http.put(`${this.apiUrl}/user/${user.id}`, user, {
      headers: this.headers
    });
  }

  delete(id: any) {
    return this.http.delete(`${this.apiUrl}/user/${id}`, {
      headers: this.headers
    });
  }
}
