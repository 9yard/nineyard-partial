const navRoutes: navRoute[] = [
  {
    name: "Shipping",
    url: ["shipyard"],
    iconUrl: "assets/images/application-icons/shipyard-icon.svg",
    permissions: "isShipyard",
    children: [
      {
        name: "SKU List",
        url: ["/shipyard/sku-list"],
      },
      {
        name: "Shipments",
        url: ["/shipyard/shipments"],
      },
    ],
  },
  {
    name: "Pricing",
    url: ["priceyard"],
    iconUrl: "assets/images/application-icons/priceyard-icon.svg",
    permissions: "isPriceyard",
    children: [
      {
        name: "SKU List",
        url: ["/priceyard/sku-list"],
      },
      {
        name: "models",
        url: ["/priceyard/models"],
      },
      {
        name: "History",
        url: ["/priceyard/history"],
      },
    ],
  },
  {
    name: "Settings",
    url: ["settings"],
    iconUrl: "assets/images/application-icons/settings-icon-v2.svg",
    children: [
      {
        name: "Account",
        url: ["/settings/account"],
      },
      {
        name: "Integrations",
        url: ["/settings/integrations"],
      },
      {
        name: "Billing",
        url: ["/settings/billing"],
      },
      {
        name: "System Settings",
        url: ["/settings/system-settings"],
      },
    ],
  },
];

export default navRoutes;

export interface navRoute {
  name: string;
  url: string[];
  iconUrl?: string;
  children?: navRoute[];
  permissions?: string;
}
