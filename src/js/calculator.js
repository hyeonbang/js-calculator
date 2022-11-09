export class Calculator {
    operation;

    constructor() {
        this.operation = {
            '+': (a, b) => a + b,
            '-': (a, b) => a - b,
            'X': (a, b) => a * b,
            '/': (a, b) => Math.floor(a / b),
        };
    }

    calculate = (result) => {
        let value = result.shift();
        while (result.length > 0) {
            let operator = result.shift();
            let digit = result.shift();

            value = this.operation?.[operator](value, digit);
        }

        return value;
    }
}