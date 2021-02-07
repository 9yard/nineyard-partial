import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { OnboardingService } from "src/app/services/onboarding.service";

import { Application } from "./../../../models/application.model";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
  applicationsSelected: number = 0;
  applications: Application[] = [
    // {
    //   name: "Priceyard",
    //   description: "Amazon & walmart advanced repricing",
    //   price: 200,
    //   icon: "/assets/images/application-icons/priceyard-icon.svg",
    // },
    {
      name: "Shipyard",
      description: "All in one FBA shipment solution",
      price: 200,
      icon: "/assets/images/application-icons/shipyard-icon.svg",
    },
  ];
  constructor(
    private onboardingService: OnboardingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.onboardingService.UpdateOnboardingStep(3).subscribe();
  }

  toggleApplication(index) {
    if (this.applications[index].isSelected) {
      this.applications[index].isSelected = false;
      this.applicationsSelected--;
    } else {
      this.applications[index].isSelected = true;
      this.applicationsSelected++;
    }
  }

  goNext() {
    const applications = this.applications
      .filter((app) => app.isSelected)
      .map((app) => app.name);
    this.onboardingService.SaveProductsSelected(applications).subscribe(() => {
      this.onboardingService.price = this.applications
        .filter((app) => app.isSelected)
        .map((app) => app.price)
        .reduce((a, b) => a + b, 0);

      this.router.navigate(["/onboarding/billing"]);
    });
  }

  goPrevious() {
    this.router.navigate(["/onboarding/terms"]);
  }
}
