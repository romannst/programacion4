import { AccountStatusEnum } from "./AccountStatus";

export class UserProfile {
    id: number;
    username: string;
    email: string;
    website: string | undefined;
    status: AccountStatusEnum;
    isPremium: boolean;

    constructor(id: number, username: string, email: string, website: string | undefined, status: AccountStatusEnum, isPremium: boolean) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.website = website;
        this.status = status;
        this.isPremium = isPremium;
    }
}