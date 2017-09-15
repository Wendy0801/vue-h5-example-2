import Vue from 'vue'

Vue.filter('substr_format', (val, len, add = null) => {
    var returnVal = '';
    val = val || '' ;
    var subValue = val.substring(0, len);
    returnVal = add ? `${subValue}${add}` : subValue;
    return returnVal;
}); 