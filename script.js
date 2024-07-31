document.getElementById('labelForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const numEtiquetas = document.getElementById('numEtiquetas').value;
    const nome = document.getElementById('nome').value;
    const labelsContainer = document.getElementById('labelsContainer');
    labelsContainer.innerHTML = '';

    for (let i = 1; i <= numEtiquetas; i++) {
        const label = document.createElement('div');
        label.classList.add('label');
        
        const number = document.createElement('div');
        number.classList.add('number');
        number.textContent = i;
        
        const name = document.createElement('div');
        name.classList.add('name');
        name.textContent = nome;
        
        label.appendChild(number);
        label.appendChild(name);
        labelsContainer.appendChild(label);
    }
});

document.getElementById('printBtn').addEventListener('click', function() {
    window.print();
});

document.getElementById('downloadPdfBtn').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const labels = document.querySelectorAll('.label');
    labels.forEach((label, index) => {
        const number = label.querySelector('.number').textContent;
        const name = label.querySelector('.name').textContent;
        doc.text(`Número: ${number}`, 10, 10 + (index * 20));
        doc.text(`Nome: ${name}`, 10, 20 + (index * 20));
    });

    doc.save('etiquetas.pdf');
});

// Função para download em Word será adicionada posteriormente
