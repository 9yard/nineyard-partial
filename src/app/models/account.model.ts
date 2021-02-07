export interface AccountByType {
    name: string;
    sort: number;
    type: AccountType;
}

export enum AccountType {
    Amazon = "amazon",
    Walmart = "walmart",
    Ebay = "ebay",
    NewEgg = "newegg",
    Wish = "wish"
}