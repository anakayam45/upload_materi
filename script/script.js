function createOption(id, name) {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    option.id = "option" + id;
    return option;
}

const _dropDown = document.querySelector("#dropDown")
let _courseId = _dropDown.value
function _getCourseName() {
    fetch(`http://localhost/upload/course.php?see=1`)
    .then(response => response.json())
    .then(data => {
        _dropDown.innerHTML = "";
        data.forEach(item => {
            _dropDown.appendChild(createOption(item.id, item.name));
        });
    });
}
_getCourseName()

const _materi = document.querySelector("#materi")
let idMateri = _materi.value
function _getMateriName() {
    fetch(`http://localhost/upload/materi.php?see=1`)
    .then(response => response.json())
    .then(data => {
        _materi.innerHTML = "";
        data.forEach(item => {
            _materi.appendChild(createOption(item.id, item.name));
        });
    });
}
_getMateriName()



function getTextValue(repat, code) {
    const text = document.querySelector("#textH")
    text.textContent = ''
    let myList = ""
    let myInput = code.value
    textList = myInput.split("!ini").filter(a => a !== "")
    repat
    text.innerHTML = myList
}

let textList = []
function myFunc(code) {
    getTextValue(
        () => {
            for (var i of textList) {
                const trimText = i.trimStart().trimEnd()
                if (trimText.substring(0, 4) == "url:") {
                    const imageUrl = trimText.substring(4)
                    myList += `<a src="${imageUrl}">${imageUrl}</a>`
                } else {
                    myList += `<p>${trimText}</p>`
                }
            }
        }, code)
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

function addCourse() {
    const name = prompt("Nama course")
    const desc = prompt("Tambahkan deskripsi")
    const dura = prompt("Waktu yang dihabiskan")

    if (!name || !desc ||!dura) {
        alert("Semua filed wajib di isi")
    }

    const formData = new FormData()
    formData.append("nama", name)
    formData.append("desc", desc)
    formData.append("dura", dura)

    fetchData("course.php", formData, "POST")
    _getCourseName()
    _getMateriName()
}

function fetchData(file, formData, method) {
    fetch(`http://localhost/upload/`+file, {
        method: method,
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
    })
    .then((data) => alert(data))
    .catch((err) => alert(err.message))
}