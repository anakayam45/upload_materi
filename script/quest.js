function sendQuest(soalId) {
    const soalDiv = document.getElementById(soalId);
    if (!soalDiv) {
        alert("Soal tidak ditemukan!");
        return;
    }

    const questionText = soalDiv.querySelector('h5').innerText.trim();
    const options = soalDiv.querySelectorAll('p');
    const correctAnswer = soalDiv.querySelector(`input[name="correct-${soalId}"]:checked`);

    if (!correctAnswer) {
        alert("Pilih jawaban yang benar!");
        return;
    }

    const choices = [];
    options.forEach((opt, index) => {
        const text = opt.innerText.trim();
        choices.push({ choice: text, value: String.fromCharCode(65 + index) });
    });

    const correctValue = correctAnswer.value;

    const formDataQuestion = new FormData();
    formDataQuestion.append("id", materiId);
    formDataQuestion.append("quest", questionText);

    fetch(`http://localhost/upload/question.php`, {
        method: "POST",
        body: formDataQuestion
    })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.text();
        })
        .then((questionId) => {
            choices.forEach(({ choice, value }) => {
                const formDataChoice = new FormData();
                formDataChoice.append("id", questionId.trim());
                formDataChoice.append("choice", choice);
                formDataChoice.append("correct", value === correctValue ? 1 : 0);

                fetch(`http://localhost/upload/question.php`, {
                    method: "POST",
                    body: formDataChoice
                })
                    .then(response => {
                        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                        return response.text();
                    })
                    .then((data) => console.log("Jawaban berhasil dikirim: ", data))
                    .catch((err) => console.error("Error mengirim jawaban: ", err));
            });
        })
        .catch((err) => console.error("Error mengirim pertanyaan: ", err));
}


function addQuest() {
    const pertanyaan = document.getElementById('pertanyaan');
    const uniqueId = `soal-${Date.now()}`; // ID unik berbasis timestamp

    const questionText = prompt("Pertanyaannya apa?");
    if (!questionText) {
        alert("Pertanyaan tidak boleh kosong!");
        return;
    }

    const options = [];
    for (let i = 1; i <= 4; i++) {
        const answer = prompt(`Jawaban ${i}`);
        if (!answer) {
            alert(`Jawaban ${i} tidak boleh kosong!`);
            return;
        }
        options.push(answer);
    }

    const newQuestion = document.createElement('div');
    newQuestion.id = uniqueId;
    newQuestion.className = 'text-section border5';
    newQuestion.innerHTML = `
        <div>
            <h5>${questionText}</h5>
            ${options.map((opt, index) => `
                <p>
                    <input type="radio" name="correct-${uniqueId}" value="${String.fromCharCode(65 + index)}">
                    ${opt}
                </p>
            `).join('')}
        </div>
        <button class="uploadLabel btn" onclick="removeQuest('${uniqueId}')">Hapus</button>
        <button class="uploadLabel btn" onclick="sendQuest('${uniqueId}')">Kirim</button>
    `;
    pertanyaan.appendChild(newQuestion);
}

function removeQuest(id) {
    const soal = document.getElementById(id);
    if (soal) soal.remove();
}
