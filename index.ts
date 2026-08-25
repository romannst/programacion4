import { AccountStatusEnum } from "./AccountStatus";
import { RoleEnum } from "./Role";
import { UserProfile } from "./UserProfile";
import { Order } from "./Order";
import { ProcessCallback } from "./ProcessCallback";

// type ProcessCallback = (total: number, message: string) => void;

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

function calculateDiscount(price: number, discountCode?: string, applyTax?: boolean): number {
    if (discountCode === "VERANO10") {
        price *= 0.9;
    }
    return applyTax ? price * 1.21 : price;
}

function processOrders(user: UserProfile, orders: Order[], callback: ProcessCallback): void {
    if (user.status !== AccountStatusEnum.Activo) {
        callback(0, "Usuario no activo");
        return;
    }

    let totalAmount = orders.reduce((sum, order) => {
        let finalPrice = calculateDiscount(order.total, order.discountCode, user.isPremium);
        return sum + finalPrice;
    }, 0);

    callback(totalAmount, "Procesado correctamente");
}

processOrders(userProfile, sampleOrders, (total: number, message: string): void => {
    console.log(`${userProfile.username}: ${message}. Total: ${total}`);
});
