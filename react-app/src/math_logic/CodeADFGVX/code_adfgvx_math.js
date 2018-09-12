import { ALPHABET_SET_RUSSIAN_WITH_SPACE } from '../constants/alphabet'
import { ADFGVXsArray, getRandomNumber, getItemIndexInMatrix } from '../constants/algorithm'

const getADFGVXsMatrix = (_alphabet) => {
    let matrix = []
    let alphabet = _alphabet.slice()
    matrix.push([undefined].concat(ADFGVXsArray))
    for (let i = 1; i <= ADFGVXsArray.length; i++) {
        matrix.push([])
        matrix[i].push([ADFGVXsArray[i - 1]][0])
        for (let j = 1; j <= ADFGVXsArray.length; j++) {
            let randomIndex = getRandomNumber(0, alphabet.length)
            matrix[i].push(alphabet.splice(randomIndex, 1)[0])
        }
    }
    return matrix
}

const getFormattedKey = (key) => {
    let sortedKey = Array.from(key).sort().join('')
    let result = ''
    for (let i = 0; i < sortedKey.length; i++) {
        let index = sortedKey.indexOf(key[i])
        result += index + 1
        let tempArray = Array.from(sortedKey)
        tempArray[index] = '*'
        sortedKey = tempArray.join('')
    }
    return result
}

const getCryptoMatrix = (message, key, ADFGVXsMatrix) => {
    let matrix = []
    let row = 0, col = 5
    matrix.push(Array.from(key))
    Array.from(message).forEach((symbol) => {
        if (col >= 5) {
            matrix.push([undefined, undefined, undefined, undefined, undefined, undefined])
            col = 0
            row++
        }
        matrix[row][col++] = ADFGVXsMatrix[getItemIndexInMatrix(symbol, ADFGVXsMatrix).row][0]
        matrix[row][col++] = ADFGVXsMatrix[0][getItemIndexInMatrix(symbol, ADFGVXsMatrix).col]
    })
    return matrix
}

const getCryptoResult = (_message, _key) => {
    const message = _message.toUpperCase()
    const key = getFormattedKey(_key.toUpperCase())
    const ADFGVXsMatrix = getADFGVXsMatrix(ALPHABET_SET_RUSSIAN_WITH_SPACE)
    const cryptoMatrix = getCryptoMatrix(message, key, ADFGVXsMatrix)
    let codeMessage = ''
    for (let i = 0; i < cryptoMatrix[0].length; i++) {
        let index = cryptoMatrix[0].indexOf((i + 1).toString())
        for (let j = 1; j < cryptoMatrix.length; j++) {
            if (cryptoMatrix[j][index] === undefined) continue
            codeMessage += cryptoMatrix[j][index]
        }
    }
    return { codeMessage, cryptoMatrix, ADFGVXsMatrix }
}

export {
    getCryptoResult,
}

