import { EL_GAMAL_P, EL_GAMAL_G, getRandomNumber } from '../constants/algorithm'
import bigInt from 'big-integer'

const getCryptoResult = (_message, _key, _isCoding) => {
    let message = Array.from(_message).map(item => item.charCodeAt())
    let x, y, k, newMessage = []
    let codeMessage = ''
    const size = message.length
    if (_isCoding) {
        x = Math.floor(getRandomNumber(2, EL_GAMAL_P))
        y = Math.pow(EL_GAMAL_G, x) % EL_GAMAL_P
        for (let i = 0; i < size; i++) {
            k = Math.floor(getRandomNumber(2, EL_GAMAL_P))
            const a = Math.pow(EL_GAMAL_G, k) % EL_GAMAL_P
            const b = bigInt(y).pow(k).multiply(message[i]).mod(EL_GAMAL_P)
            newMessage.push(a)
            newMessage.push(b.toJSNumber())
        }
    }
    else {
        for (let i = 0; i < size; i+=2) {
            const m = bigInt(message[i+1]).multiply(bigInt(message[i]).pow(EL_GAMAL_P-1-_key)).mod(EL_GAMAL_P)
            newMessage.push(m)
        }
    }
    codeMessage = newMessage.map(item => String.fromCharCode(item)).join('')
    return { codeMessage, publicKey: y, privateKey: x }
}

export {
    getCryptoResult,
}

