const form = document.getElementById('uploadForm');
const result = document.getElementById('uploadResult');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const imageFile = document.getElementById('imageInput').files[0];
    if (!imageFile) {
        result.innerHTML = 'Pilih file terlebih dahulu.';
        return;
    }

    const formData = new FormData();
    formData.append('image', imageFile);

    fetch('upload.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.status === 'success') {
            result.innerHTML = `Upload berhasil:<br>
            <a href="image.php?name=${data.file}">${data.file}</a>`;
            document.querySelector("#isi").value += `\nurl:localhost/upload/image.php?name=${data.file}\n`;
        } else {
            result.innerHTML = `Error: ${data.message}`;
        }
    })
    .catch(error => {
        result.innerHTML = `Terjadi kesalahan: ${error.message}`;
        console.error(error);
    });
});
