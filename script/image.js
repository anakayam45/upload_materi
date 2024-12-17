const form = document.getElementById('uploadForm');
const result = document.getElementById('uploadResult');
console.log(1)
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData();
    const imageFile = document.getElementById('imageInput').files[0];
    formData.append('image', imageFile);

    fetch('upload.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            result.innerHTML = `Upload berhasil: ${data.file} <br>
            <img src="${data.file}" alt="${data.file}" style="width:200px; margin-top:10px;">`;
        } else {
            result.innerHTML = `Error: ${data.message}`;
        }
    })
    .catch(error => {
        result.innerHTML = 'Terjadi kesalahan.';
        console.error(error);
    });
});