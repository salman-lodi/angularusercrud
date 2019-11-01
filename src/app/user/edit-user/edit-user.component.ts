import { Component, OnInit, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";
import { User } from "../../model/user.model";
import { ApiService } from "../../service/api.service";
import { pick } from "lodash";
@Component({
  selector: "app-edit-user",
  templateUrl: "./edit-user.component.html",
  styleUrls: ["./edit-user.component.css"]
})
export class EditUserComponent implements OnInit {
  user: User;
  editForm: FormGroup;
  departments: any = [];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    let userId = window.localStorage.getItem("editUserId");
    if (!userId) {
      alert("Invalid action.");
      this.router.navigate(["list-user"]);
      return;
    }
    this.editForm = this.formBuilder.group({
      _id: [],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      phone: ["", Validators.required],
      department: ["", Validators.required]
    });
    this.apiService.getUserById(userId).subscribe(data => {
      let result = pick(data.result, [
        "_id",
        "firstName",
        "lastName",
        "email",
        "phone",
        "department"
      ]);
      console.log(result);
      this.editForm.setValue(result);
    });
    this.apiService.getDepartments().subscribe(data => {
      let result = data.result;
      this.departments = result;
    });
  }

  onSubmit() {
    this.apiService
      .updateUser(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.status) {
            alert("User updated successfully.");
            this.router.navigate(["list-user"]);
          } else {
            alert(data.message);
          }
        },
        error => {
          alert(error);
        }
      );
  }
}
