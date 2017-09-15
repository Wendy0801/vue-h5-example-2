import Vue from 'vue' 

Vue.filter('price_format', (number,digit=2) => {
    // number = parseFloat(number)||0;
    // return number.toFixed(digit)
    var powNum = Math.pow(10,parseInt(digit))
    number = parseInt(number*powNum);
    return number/powNum;
}); 

Vue.filter('flow_format', number => {
    number = Math.ceil(number)||0;
    return number;
}); 