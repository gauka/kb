import { WINDOWS_1251 } from '../constants/alphabet'
import { BBS_M, getBBS_X0 } from '../constants/algorithm'

const getLastBit = (number) => number % 2
    
const getRandomArbitrary = (n) => {
    let result = ''
    let x = getBBS_X0()
    for (let i = 0; i < n; i++) {
        result += getLastBit(x).toString()
        x = Math.pow(x,2) % BBS_M
    }
    return result
}

const getRandomKey = (_message) => {
    let key = []
    for (let i = 0; i < _message.length; i++) {
        let index = parseInt(getRandomArbitrary(6), 2)
        key.push(WINDOWS_1251[index])
    }
    return key
}

const getCryptoResult = (_message, _isCoding, _key) => {
    let message = _message
    const key = !_isCoding ? Array.from(_key) : getRandomKey(message)
    let codeMessage = ''
    for (let i = 0; i < _message.length; i++) {
        let index = WINDOWS_1251.indexOf(message[i]) ^ WINDOWS_1251.indexOf(key[i])
        codeMessage += WINDOWS_1251[index]
    }
    return { codeMessage, key }
}

export {
    getCryptoResult,
}

