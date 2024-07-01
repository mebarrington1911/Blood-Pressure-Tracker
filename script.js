document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('bp-form');
    const tableBody = document.querySelector('#bp-table tbody');
    let entries = JSON.parse(localStorage.getItem('bpEntries')) || [];

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const date = document.getElementById('date').value;
        const systolic = document.getElementById('systolic').value;
        const diastolic = document.getElementById('diastolic').value;

        const entry = { date, systolic, diastolic };
        entries.push(entry);
        localStorage.setItem('bpEntries', JSON.stringify(entries));
        addEntryToTable(entry);
        form.reset();
    });

    const addEntryToTable = (entry) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.date}</td>
            <td>${entry.systolic}</td>
            <td>${entry.diastolic}</td>
            <td><button class="delete-btn">Delete</button></td>
        `;
        row.querySelector('.delete-btn').addEventListener('click', () => {
            row.remove();
            entries = entries.filter(e => e !== entry);
            localStorage.setItem('bpEntries', JSON.stringify(entries));
        });
        tableBody.appendChild(row);
    };

    entries.forEach(entry => addEntryToTable(entry));
});
