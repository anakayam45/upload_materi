let textList = []
let myList = ""

function myFunc(code) {
    const text = document.querySelector("#textH")
    text.textContent = ''
    let myInput = code.value
    textList = myInput.split("!ini").filter(a => a !== "")
    for (var i of textList) {
        const trimText = i.trimStart().trimEnd()
        if (trimText.substring(0, 4) == "url:") {
            const imageUrl = trimText.substring(4)
            myList += `<img src="image.php?name=${imageUrl}">`
            // console.log(`<a href="image.php?${imageUrl}" target="_blank">ewfwrrw${imageUrl}</a>`)
        } else if (trimText.substring(0, 5) == "head:") {
            const imageUrl = trimText.substring(5)
            myList += `<h3>${imageUrl}</h3>`
        } else {
            myList += `<p>${trimText}</p>`
        }
    }
    text.innerHTML = myList
}




function sendList() {
    const text = document.querySelector("#isi")
    let myInput = text.value
    textList = myInput.split("!ini").filter(a => a !== "")
        for (var i of textList) {
            const trimText = i.trimStart().trimEnd()
            resultData = ["", ""]
            if (trimText.substring(0, 4) == "url:") {
                const imageUrl = trimText.substring(4)
                resultData = [imageUrl, "image"]
            } else if (trimText.substring(0, 5) == "head:") {
                const headText = trimText.substring(5)
                resultData = [headText, "head"]
            } else {
                resultData = [trimText, "text"]
            }
            if (materiId == null) {
                addMateri()
            } else {
                const formData = new FormData()
                formData.append("materi", 1)
                formData.append("id", materiId)
                formData.append("content", resultData[0])
                formData.append("type", resultData[1])
                fetchData("materi.php", formData, "POST")
            }
        }
}