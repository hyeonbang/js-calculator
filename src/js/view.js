import { Calculator } from "./calculator.js";

export class View {
    $selectors;
    prevDigit;
    results;
    finalSign;
    operatorType;
    calculator;

    constructor() {
        this.$selectors = {
            total: document.querySelector('#total'),
            modifiers: document.querySelector('.modifiers'),
            operations: document.querySelector('.operations'),
            digits: document.querySelector('.digits')
        }
        this.prevDigit = 0;
        this.results = [];
        this.finalSign = '=';
        this.calculator = new Calculator();
        this.operatorType = Object.keys(this.calculator.operation);
        this.setEventListeners();
    }

    setEventListeners() {
        this.$selectors.modifiers.addEventListener('click', () => this.reset());
        this.$selectors.digits.addEventListener('click', e => this.insertDigit(e));
        this.$selectors.operations.addEventListener('click', e => this.insertOperator(e));
    }

    reset() {
        this.changeResult(0);
        this.prevDigit = 0;
        this.results = [];
    }

    validateOperator = () => {
        return this.results.some(row => this.operatorType.includes(row));
    }

    insertDigit(e) {
        if (!this.prevDigit) this.changeResult(0);
        if (this.prevDigit.toString().length > 2) return alert('숫자는 한번에 최대 3자리 수까지 입력할 수 있습니다.');

        this.changeResult(Number(this.$selectors.total.innerText + e.target.innerText))
        this.prevDigit = this.$selectors.total.innerText;
    }

    insertOperator(e) {
        this.results.push(+this.prevDigit);
        if (e.target.innerText === this.finalSign) return this.operate();

        // 바로 직전 입력값이 연산자라면 해당 연산자를 제거하고 현재 입력한 연산자로 교체함
        if (this.operatorType.includes(this.results[this.results.length - 1])) this.results.pop();
        this.results.push(e.target.innerText);
        this.prevDigit = 0;
    }

    operate() {
        if (!this.validateOperator()) return alert('연산을 입력해주세요.');
        this.prevDigit = this.changeResult(this.calculator.calculate(this.results));
        this.results = [];
    }

    changeResult(value) {
        this.$selectors.total.innerText = value;
        return value;
    }
}