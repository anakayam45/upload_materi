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


function sendList() {
    console.log(1)
    const text = document.querySelector("#isi")
    let myInput = text.value
    textList = myInput.split("!ini").filter(a => a !== "")
        for (var i of textList) {
            const trimText = i.trimStart().trimEnd()
            resultData = ["", ""]
            if (trimText.substring(0, 4) == "url:") {
                const imageUrl = trimText.substring(4)
                resultData = [imageUrl, "code"]
            } else {
                resultData = [trimText, "text"]
            }
            if (materiId == 0) {
                addMateri()
            } else {
                const formData = new FormData()
                formData.append("id", materiId)
                formData.append("content", resultData[0])
                formData.append("type", resultData[1])
                fetchData("materi.php", formData, "POST")
            }
        }
}

function getId() {
    courseId = _dropDown.value
    materiId = _materi.value
    console.log(courseId, materiId)
}