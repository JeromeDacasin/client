
export default class CurrencyFormat {
    constructor(number) {
        this.number = number;
    }

    pesoSign() {
        this.number = `₱\u00A0${this.number.getValue().toFixed(2)}`;
        return this;
    }

    numberFormat() {
        
        this.number = typeof(this.number) === 'string' ? this.number.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") 
            : this.number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        
        return this;
    }

    toString() {
        return this.number;
    }
}





// export const pesoSign = number => {
//     return `₱\u00A0${number.getValue().toFixed(2)}`;
// }

// export const numbersByCommas = number => {

//     if (typeof(number) === 'string') {
//         return number.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
//     } 

//     return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

// }