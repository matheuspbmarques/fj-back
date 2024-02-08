/**
 * Verificador de formato do telefone
 * @param {string} value O telefone que será verificado
 * @returns {boolean}
 */
function phone(value){
    return /\([0-9]{2}\) {1}9{0,1}[0-9]{4}-{1}[0-9]{4}/
    .test(value)
}

module.exports = {
    phone
}