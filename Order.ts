export class Order {
    id: number;
    total: number;
    discountCode?: string;

    constructor(id: number, total: number, discountCode?: string) {
        this.id = id;
        this.total = total;
        this.discountCode = discountCode;
    }
}