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

// Funções para download em PDF e Word serão adicionadas posteriormente
