import { UserProfile } from './UserProfile';
import { Order } from './Order';
import { ProcessCallback } from './ProcessCallback';
import { AccountStatusEnum } from './AccountStatus';

export class OrderProcessor {
    private calculateDiscount(price: number, discountCode?: string, applyTax?: boolean): number {
        if (discountCode === "VERANO10") {
            price *= 0.9;
        }
        return applyTax ? price * 1.21 : price;
    }
    
    public processOrders(user: UserProfile, orders: Order[], callback: ProcessCallback): void {
        if (user.status !== AccountStatusEnum.Activo) {
            callback(0, "Usuario no activo");
            return;
        }
    
        let totalAmount = orders.reduce((sum, order) => {
            let finalPrice = this.calculateDiscount(order.total, order.discountCode, user.isPremium);
            return sum + finalPrice;
        }, 0);
    
        callback(totalAmount, "Procesado correctamente");
    }
}