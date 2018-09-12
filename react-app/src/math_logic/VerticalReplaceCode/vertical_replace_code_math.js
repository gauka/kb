const getCryptoMatrix = (_message, key) => {
    let matrix = []
    let message = _message.split(' ').join('')
    matrix.push(Array.from(key))
    for (let i = 0; i < message.length;) {
        let arr = []
        for (let j = 0; j < matrix[0].length; j++) {
            arr.push(message[i++])
        }
        matrix.push(arr)
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

const getCryptoResult = (_message, _key) => {
    let key = ''
    let symbolKey = null
    if (Number(_key)) {
        key = _key
    } else {
        symbolKey = _key
        key = getFormattedKey(_key.toUpperCase())
    }

    let message = _message.toUpperCase()
    let codeMessage = ''
    let cryptoMatrix = getCryptoMatrix(message, key)
    for (let i = 0; i < cryptoMatrix[0].length; i++) {
        let index = cryptoMatrix[0].indexOf((i + 1).toString())
        for (let j = 1; j < cryptoMatrix.length; j++) {
            if (cryptoMatrix[j][index] === undefined) continue
            codeMessage += cryptoMatrix[j][index]
        }
    }
    return { codeMessage: codeMessage, cryptoMatrix: cryptoMatrix, symbolKey: symbolKey }
}

export {
    getCryptoResult,
}

