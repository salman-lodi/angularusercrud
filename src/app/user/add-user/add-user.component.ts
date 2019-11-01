import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "../../service/api.service";
import { pick } from "lodash";
@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.css"]
})
export class AddUserComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) {}

  addForm: FormGroup;
  departmentForm: FormGroup;
  departments: any;
  showDepartment: boolean = false;
  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [],
      password: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      phone: ["", Validators.required],
      department: ["", Validators.required]
    });
    this.departmentForm = this.formBuilder.group({
      name: ["", Validators.required]
    });

    this.apiService.getDepartments().subscribe(data => {
      let result = data.result;
      this.departments = result;
    });
  }

  onSubmit() {
    this.apiService.createUser(this.addForm.value).subscribe(data => {
      this.router.navigate(["list-user"]);
    });
  }

  submitDepartment() {
    this.apiService
      .createDepartment(this.departmentForm.value)
      .subscribe(data => {
        this.departments.push(this.departmentForm.value);
        this.showDepartment = false;
      });
  }

  toggleAddDepartment() {
    this.showDepartment = !this.showDepartment;
  }
}
