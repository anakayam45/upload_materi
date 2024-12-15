let textList = []

function myFunc(code) {
    const text = document.querySelector("#textH")
    text.textContent = ''
    let myList = ""
    let myInput = code.value
    textList = myInput.split("!ini").filter(a => a !== "")
    for (var i of textList) {
        const trimText = i.trimStart().trimEnd()
        if (trimText.substring(0, 4) == "url:") {
            const imageUrl = trimText.substring(4)
            myList += `<a src="${imageUrl}">${imageUrl}</a>`
        } else {
            myList += `<p>${trimText}</p>`
        }
    }
    text.innerHTML = myList
}


function sendList(code) {
    getTextValue(() => {
        for (var i of textList) {
            const trimText = i.trimStart().trimEnd()
            resultData = ["", ""]
            if (trimText.substring(0, 4) == "url:") {
                const imageUrl = trimText.substring(4)
                resultData = [imageUrl, "code"]
            } else {
                resultData = [trimText, "text"]
            }
            const formData = new FormData()
            formData.append("id", idMateri)
            formData.append("content", desc)
            formData.append("type", dura)
            fetchData("materi.php", formData, "POST")
        }
    }, code)
}
