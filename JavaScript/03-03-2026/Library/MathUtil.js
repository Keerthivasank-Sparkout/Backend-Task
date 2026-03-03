class MathUtils {
    static add(a, b) {
        return a + b;
    }
    static subtract(a, b) {
        return a - b;
    }
    static multiply(a, b) {
        return a * b;
    }
    static divide(a, b) {
        if (b === 0) {
            return "Cannot divide by zero";
        }
        return a / b;
    }
    static modulus(a, b) {
        return a % b;
    }
    static power = (base, exponent) => base ** exponent;
    static square = (num) => num * num;
    static cube = (num) => num * num * num;
    static factorial = (num) => {
        if (num < 0) return "Factorial not defined for negative numbers";
        let result = 1;
        for (let i = 1; i <= num; i++) {
            result *= i;
        }
        return result;
    };
    static isPrime = (num) => {
        if (num <= 1) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false;
        }
        return true;
    };
}
module.exports = MathUtils;