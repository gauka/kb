import { ALPHABET_SET_RUSSIAN_WITH_SPACE } from '../constants/alphabet'

const getCryptoMatrixForCoding = (message, formattedKey) => {
    let matrix = new Array(8)
    matrix[0] = Array.from(message)
    matrix[1] = Array.from(formattedKey)
    for (let i = 2; i < matrix.length; i++) {
        matrix[i] = []
    }
    for (let i = 0; i < matrix[0].length; i++) {
        matrix[2].push(ALPHABET_SET_RUSSIAN_WITH_SPACE.indexOf(message[i]) + 1)
        matrix[3].push(ALPHABET_SET_RUSSIAN_WITH_SPACE.indexOf(formattedKey[i]) + 1)
        matrix[4].push(matrix[2][i] + matrix[3][i])
        matrix[5].push(matrix[4][i] % ALPHABET_SET_RUSSIAN_WITH_SPACE.length)
        if (matrix[5][i] === 0)
            matrix[6].push(ALPHABET_SET_RUSSIAN_WITH_SPACE.length)
        else
            matrix[6].push(matrix[5][i])
        matrix[7].push(ALPHABET_SET_RUSSIAN_WITH_SPACE[matrix[6][i] - 1])

    }
    return matrix
}

const getCryptoMatrixForEncoding = (message, formattedKey) => {
    let matrix = new Array(9)
    matrix[0] = Array.from(message)
    matrix[1] = Array.from(formattedKey)
    for (let i = 2; i < matrix.length; i++) {
        matrix[i] = []
    }
    for (let i = 0; i < matrix[0].length; i++) {
        matrix[2].push(ALPHABET_SET_RUSSIAN_WITH_SPACE.indexOf(message[i]) + 1)
        matrix[3].push(ALPHABET_SET_RUSSIAN_WITH_SPACE.indexOf(formattedKey[i]) + 1)
        matrix[4].push(matrix[2][i] - matrix[3][i])
        matrix[5].push(matrix[4][i] + ALPHABET_SET_RUSSIAN_WITH_SPACE.length)
        matrix[6].push(matrix[5][i] % ALPHABET_SET_RUSSIAN_WITH_SPACE.length)
        if (matrix[6][i] === 0)
            matrix[7].push(ALPHABET_SET_RUSSIAN_WITH_SPACE.length)
        else
            matrix[7].push(matrix[6][i])
        matrix[8].push(ALPHABET_SET_RUSSIAN_WITH_SPACE[matrix[7][i] - 1])

    }
    return matrix
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

const getCryptoResult = (_message, _key, _isCoding) => {
    let message = _message.toUpperCase()
    let key = _key.toUpperCase()
    let formattedKey = getFormattedKey(key, message)
    const cryptoMatrix = _isCoding  ? 
        getCryptoMatrixForCoding(message, formattedKey) :
        getCryptoMatrixForEncoding(message, formattedKey)
    return { codeMessage: cryptoMatrix[cryptoMatrix.length-1].join('') , cryptoMatrix, formattedKey }
}

export {
    getCryptoResult,
}

