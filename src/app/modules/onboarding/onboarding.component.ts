import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-onboarding",
  templateUrl: "./onboarding.component.html",
  styleUrls: ["./onboarding.component.scss"],
})
export class OnboardingComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
    this.router.navigate(["login"]);
  }
}
