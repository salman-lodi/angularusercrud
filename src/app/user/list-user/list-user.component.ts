import { Component, OnInit, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../../model/user.model";
import { ApiService } from "../../service/api.service";

@Component({
  selector: "app-list-user",
  templateUrl: "./list-user.component.html",
  styleUrls: ["./list-user.component.css"]
})
export class ListUserComponent implements OnInit {
  users: User[];

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    if (!window.localStorage.getItem("token")) {
      this.router.navigate(["login"]);
      return;
    }
    this.apiService.getUsers().subscribe(data => {
      this.users = data.result;
      console.log(this.users);
    });
  }

  deleteUser(user: User): void {
    if (confirm("Are you sure you want to delete this?")) {
      this.apiService.deleteUser(user._id).subscribe(data => {
        this.users = this.users.filter(u => u !== user);
      });
    }
  }

  editUser(user: User): void {
    let id = user._id;
    window.localStorage.removeItem("editUserId");
    window.localStorage.setItem("editUserId", id);
    this.router.navigate(["edit-user"]);
  }

  addUser(): void {
    this.router.navigate(["add-user"]);
  }
}
