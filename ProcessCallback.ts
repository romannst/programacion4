// type ProcessCallback = (total: number, message: string) => void;

export class ProcessCallback {
    total: number;
    message: string

    constructor(total: number, message: string) {
        this.total = total;
        this.message = message;
    }
}