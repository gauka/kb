const getCryptoMatrix = (_message, _route, _matrixSize) => {
    let matrix = []
    let message = _message.split(' ').join('')
    for (let i = 0; i < message.length;) {
        let arr = []
        for (let j = 0; j < _matrixSize; j++) {
            arr.push(message[i++])
        }
        matrix.push(arr)
    }
    return matrix
}

const getCodeMessageByVerticalRightRoute = (cryptoMatrix) => {
    let codeMessage = ''
    for (let i = cryptoMatrix[0].length - 1; i >= 0; i--) {
        for (let j = 0; j < cryptoMatrix.length; j++) {
            if (cryptoMatrix[j][i] !== undefined)
                codeMessage += cryptoMatrix[j][i]
        }
    }
    return codeMessage
}

const getCodeMessageByVerticalLeftRoute = (cryptoMatrix) => {
    let codeMessage = ''
    for (let i = 0; i < cryptoMatrix[0].length; i++) {
        for (let j = 0; j < cryptoMatrix.length; j++) {
            if (cryptoMatrix[j][i] !== undefined)
                codeMessage += cryptoMatrix[j][i]
        }
    }
    return codeMessage
}

const getCodeMessageByHorizontalRightRoute = (cryptoMatrix) => {
    let codeMessage = ''
    for (let i = 0; i < cryptoMatrix.length; i++) {
        for (let j = cryptoMatrix[0].length - 1; j >= 0; j--) {
            if (cryptoMatrix[i][j] !== undefined)
                codeMessage += cryptoMatrix[i][j]
        }
    }
    return codeMessage
}

const getCodeMessageByHorizontalLeftRoute = (cryptoMatrix) => {
    let codeMessage = ''
    for (let i = 0; i < cryptoMatrix.length; i++) {
        for (let j = 0; j < cryptoMatrix[0].length; j++) {
            if (cryptoMatrix[i][j] !== undefined)
                codeMessage += cryptoMatrix[i][j]
        }
    }
    return codeMessage
}

const getCryptoResult = (_message, _route, _matrixSize) => {
    let message = _message.toUpperCase()
    let codeMessage = ''
    let cryptoMatrix = getCryptoMatrix(message, _route, _matrixSize)
    switch (_route) {
        case '1': {
            codeMessage = getCodeMessageByVerticalRightRoute(cryptoMatrix)
            break
        }
        case '2': {
            codeMessage = getCodeMessageByVerticalLeftRoute(cryptoMatrix)
            break
        }
        case '3': {
            codeMessage = getCodeMessageByHorizontalRightRoute(cryptoMatrix)
            break
        }
        case '4': {
            codeMessage = getCodeMessageByHorizontalLeftRoute(cryptoMatrix)
            break
        }
    }
    return { codeMessage: codeMessage, cryptoMatrix: cryptoMatrix }
}

export {
    getCryptoResult,
}
