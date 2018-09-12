import { ALPHABET_SET_RUSSIAN } from '../constants/alphabet'
import { getRandomNumber, RSA_CONSTANTS, gcdEuclidExtended, toBinaryFromAlphabet } from '../constants/algorithm'
import bigInt from 'big-integer'

const getCryptoResult = (_message, _publicKey, _isCoding) => {
    let message = _message.toUpperCase()
    let codeMessage = parseInt(Array.from(message).reduce((accumulator, symbol) => {
        return accumulator + toBinaryFromAlphabet(ALPHABET_SET_RUSSIAN.indexOf(symbol), 5)
    }, ''), 2)
    let d, e
    if (_isCoding) {
        d = Math.floor(getRandomNumber(2, RSA_CONSTANTS.eiler))
        while (gcdEuclidExtended(d, RSA_CONSTANTS.eiler).gcd !== 1) {
            d = Math.floor(getRandomNumber(2, RSA_CONSTANTS.eiler))
        }
        e = gcdEuclidExtended(d, RSA_CONSTANTS.eiler).x + RSA_CONSTANTS.eiler
        codeMessage = bigInt(codeMessage).modPow(d, RSA_CONSTANTS.n).toString()
        console.log(Number(codeMessage).toString(2))
    }
    else {
        e = _publicKey.e
        codeMessage = bigInt(codeMessage).modPow(e, RSA_CONSTANTS.n).toString()
    }
    return { codeMessage, publicKey: { d, n: RSA_CONSTANTS.n }, privateKey: { e, n: RSA_CONSTANTS.n } }
}

export {
    getCryptoResult,
}
