let courseId = 0
let materiId = 0

function createOption(id, name) {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = name;
    option.id = id;
    return option;
}

const _dropDown = document.querySelector("#dropDown")
const _materi = document.querySelector("#materi")

function _getCourseName() {
    fetch(`http://localhost/upload/course.php?see=1`)
    .then(response => response.json())
    .then(data => {
        _dropDown.innerHTML = "";
        data.forEach(item => {
            _dropDown.appendChild(createOption(item.id, item.name));
        })
        courseId = _dropDown.value;
        _getMateriName();
    })
}

function _getMateriName() {
    let url = `http://localhost/upload/materi.php?see=1&id=${courseId}`
    fetch(url)
    .then(response => response.json())
    .then(data => {
        _materi.innerHTML = "";
            data.forEach(item => {
                _materi.appendChild(createOption(item.id, item.title));
            })
        materiId = _materi.value
    })
}

_dropDown.addEventListener("change", () => {
    courseId = _dropDown.value
    _getMateriName()
})
_getCourseName()

function addCourse() {
    const name = prompt("Nama course")
    const desc = prompt("Tambahkan deskripsi")
    const dura = prompt("Waktu yang dihabiskan")

    if (!name || !desc ||!dura) {
        alert("Semua filed wajib di isi")
    } else {
    const formData = new FormData()
    formData.append("course", 1)
    formData.append("nama", name)
    formData.append("desc", desc)
    formData.append("dura", dura)

    fetchData("course.php", formData, "POST")
    }
}

function addMateri() {
    const name = prompt("Nama materi")
    const desc = prompt("Tambahkan deskripsi")

    if (!name || !desc) {
        alert("Semua filed wajib di isi")
    } else {
        const formData = new FormData()
        formData.append("course", 1)
        formData.append("id", courseId)
        formData.append("title", name)
        formData.append("desc", desc)

        fetchData("materi.php", formData, "POST")
    }
}

function fetchData(file, formData, method) {
    console.log(materiId, courseId)
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
    .then(() => {
        _getCourseName()
        _getMateriName()
    })
    .catch((err) => alert("Error bang", err))
}