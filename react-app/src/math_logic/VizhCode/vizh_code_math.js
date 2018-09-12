import { ALPHABET_SET_RUSSIAN } from '../constants/alphabet'

const arrayRotateToLeft = (array, offset) => {
    if (offset === 0) return array
    let result = []
    for (let i = 0; i < array.length; i++) {
        if (i + offset < array.length) result.push(array[i + offset])
        else result.push(array[i + offset - array.length])
    }
    return result
}

const matrixRotateToLeft = (matrix, offset) => {
    if (offset === 0) return matrix
    for (let i = 0; i < matrix.length; i++) {
        matrix[i] = arrayRotateToLeft(matrix[i], offset).slice(0)
        if (offset !== matrix.length)
            offset++
        else
            offset = 1
    }
    return matrix
}

const getCryptoResult = (_message, _key, _offset) => {
    let offset = Number(_offset)
    let message = _message.toUpperCase()
    let key = getFormattedKey(_key.toUpperCase(), message)
    let codeMessage = ''
    const cryptoMatrix = matrixRotateToLeft(ALPHABET_SET_RUSSIAN.map(() => ALPHABET_SET_RUSSIAN.slice(0)), offset)
    let keyIndex = 0
    Array.from(message).forEach((symbol) =>
        symbol === ' ' ?
        codeMessage += symbol :
        codeMessage += cryptoMatrix[ALPHABET_SET_RUSSIAN.indexOf(key[keyIndex++])][ALPHABET_SET_RUSSIAN.indexOf(symbol)]
    )
    return { 
        codeMessage: codeMessage, 
        cryptoMatrix: cryptoMatrix, 
        alphabetSet: ALPHABET_SET_RUSSIAN,
        formattedKey: key,
     }
}

const getFormattedKey = (key, message) => {
    let formattedKey = ''
    let count = 1
    while (formattedKey.length !== message.length) {
        formattedKey += key[count - 1]
        count = (count === key.length) ? 1 : ++count
    }
    return formattedKey
}

export {
    getCryptoResult,
}

