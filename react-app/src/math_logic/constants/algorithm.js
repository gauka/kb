const BBS_Q = 103

const BBS_P = 107

const BBS_X0 = 211

const BBS_M = 11021

const EL_GAMAL_P = 593

const EL_GAMAL_G = 3

const RSA_CONSTANTS = {
    p: 167,
    q: 173,
    n: 28891,
    eiler: 28552,
}

const ADFGVXsArray = ['A', 'D', 'F', 'G', 'V', 'X']

const gcd = (a, b) => {
    if (b === 0)
        return a;
    return gcd(b, a % b);
}

const gcdEuclidExtended = (a, b) => {
    let gcd = a, x = 1, y = 0
    if (b === 0)
        return { gcd, x, y }
    else {
        let result = gcdEuclidExtended(b, a % b)
        gcd = result.gcd
        x = result.x
        y = result.y
        return { gcd, x: y, y: x - y * Math.floor(a / b) }
    }
}

// Возвращает случайное число между min (включительно) и max (не включая max)
const getRandomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
}

const getItemIndexInMatrix = (item, matrix) => {
    let result = -1
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (item === matrix[i][j])
                result = { row: i, col: j }
        }
    }
    return result
}

const getBBS_X0 = () => {
    let result
    while (true) {
        result = getRandomNumber(1, 10000)
        if (result != BBS_Q && result != BBS_P)
            break
    }
    return Math.floor(result)
}

const toBinaryFromAlphabet = (code, size) => {
    let binary = code.toString(2)
    for (let i = binary.length; i < size; i++) {
        binary = '0' + binary
    }
    return binary
}

export {
    BBS_Q,
    BBS_P,
    BBS_X0,
    BBS_M,
    ADFGVXsArray,
    getRandomNumber,
    getItemIndexInMatrix,
    getBBS_X0,
    gcdEuclidExtended,
    EL_GAMAL_P,
    EL_GAMAL_G,
    RSA_CONSTANTS,
    toBinaryFromAlphabet,
}