import { ALPHABET_SET_RUSSIAN } from '../constants/alphabet'

const removeDupleSymbols = (input) => {
    var obj = input.split('').reduce((o, v) => { o[v] = v; return o; }, {})
    return Object.keys(obj).join('')
}

const formateAlphabetByInputKey = (key, alphabet_set) => {
    return alphabet_set.filter(function (symbol) {
        if (key.includes(symbol)) return
        else return symbol
    })
}

const getCryptoMatrix = (formattedAplhabetSet) => {
    let count = 0
    let matrix = []
    for (let i = 0; i < 6; i++) {
        let arr = []
        for (let j = 0; j < 6; j++) {
            arr.push(formattedAplhabetSet[count++])
        }
        matrix.push(arr)
    }
    return matrix
}

const getCryptoResult = (_message, _key) => {
    let key = removeDupleSymbols(_key.toUpperCase())
    let message = _message.toUpperCase()
    let formattedAplhabetSet = Array.from(key).concat((formateAlphabetByInputKey(key, ALPHABET_SET_RUSSIAN)))
    let cryptoMatrix = getCryptoMatrix(formattedAplhabetSet)
    let codeMessage = ''
    for (let i = 0; i < message.length; i++) {
        if (message[i] === ' ') codeMessage += message[i]
        for (let j = 0; j < cryptoMatrix.length; j++) {
            let index = cryptoMatrix[j].indexOf(message[i])
            if (index !== -1) {
                if (j === cryptoMatrix.length - 1) {
                    codeMessage += cryptoMatrix[0][index]
                }
                else {
                    if (cryptoMatrix[j + 1][index] !== undefined) {
                        codeMessage += cryptoMatrix[++j][index]
                    }
                    else {
                        codeMessage += cryptoMatrix[0][index]
                    }
                }
            }
        }
    }
    return { codeMessage: codeMessage, cryptoMatrix: cryptoMatrix }
}

export {
    getCryptoResult,
}

