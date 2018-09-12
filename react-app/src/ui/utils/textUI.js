const copyText = (text) => {
    let copytext = document.createElement('input')
    copytext.value = text
    document.body.appendChild(copytext)
    copytext.select()
    document.execCommand('copy')
    document.body.removeChild(copytext)
}

export {
    copyText,
}