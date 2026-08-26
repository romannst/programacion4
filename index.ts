import { AccountStatusEnum } from "./AccountStatus";
import { RoleEnum } from "./Role";
import { UserProfile } from "./UserProfile";
import { Order } from "./Order";
import { OrderProcessor } from "./OrderProcessor";

let defaultRoles: RoleEnum[] = [RoleEnum.Administrador, RoleEnum.Editor];

let userProfile: UserProfile = new UserProfile(
    101,
    "alex_dev",
    "alex@ejemplo.com",
    "https://alex.dev",
    AccountStatusEnum.Activo,
    true
);

let sampleOrders: Order[] = [
    new Order(1, 100, "VERANO10"),
    new Order(2, 250),
];

const processor = new OrderProcessor();

processor.processOrders(userProfile, sampleOrders, (total: number, message: string): void => {
    console.log(`${userProfile.username}: ${message}. Total: ${total}`);
});