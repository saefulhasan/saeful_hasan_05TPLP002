// Sample data array to simulate a database
let izinData = [
    { id: 1, name: "Ependi", izin: "Pulang Lebih Awal", tanggal: "2024-05-10", jam: "10:35:00", keterangan: "sakit", status: "Menunggu Konfirmasi" },
    { id: 2, name: "Ipul", izin: "Datang Terlambat", tanggal: "2024-05-09", jam: "11:04:00", keterangan: "sehat", status: "Menunggu Konfirmasi" },
    { id: 3, name: "Iqbal", izin: "Datang Terlambat", tanggal: "2024-04-30", jam: "09:55:00", keterangan: "ban bocor", status: "Menunggu Konfirmasi" },
    { id: 4, name: "Yovan", izin: "Datang Terlambat", tanggal: "2024-04-29", jam: "09:45:00", keterangan: "Batuk", status: "Menunggu Konfirmasi" },
    { id: 5, name: "Nadia", izin: "Datang Terlambat", tanggal: "2024-04-28", jam: "09:00:00", keterangan: "Macet", status: "Menunggu Konfirmasi" },
    { id: 6, name: "Rere", izin: "Datang Terlambat", tanggal: "2024-04-28", jam: "09:00:00", keterangan: "sakit", status: "Disetujui" }
];

function renderTable() {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = ''; // Clear existing rows
    izinData.forEach((item, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.izin}</td>
                <td>${item.tanggal}</td>
                <td>${item.jam}</td>
                <td>${item.keterangan}</td>
                <td>${item.status}</td>
            </tr>
        `;
        tbody.insertAdjacentHTML('beforeend', row);
    });
}

function addEntry() {
    const name = prompt("Enter Name:");
    const izin = prompt("Enter Izin:");
    const tanggal = prompt("Enter Tanggal (YYYY-MM-DD):");
    const jam = prompt("Enter Jam (HH:mm:ss):");
    const keterangan = prompt("Enter Keterangan:");
    const status = "Menunggu Konfirmasi";

    const newEntry = {
        id: izinData.length + 1,
        name,
        izin,
        tanggal,
        jam,
        keterangan,
        status
    };

    izinData.push(newEntry);
    renderTable();
}

function editEntry() {
    const id = prompt(" Pilih nomor yang ingin di edit:");
    const entry = izinData.find(item => item.id == id);
    if (entry) {
        entry.name = prompt("Enter new Name:", entry.name);
        entry.izin = prompt("Enter new Izin:", entry.izin);
        entry.tanggal = prompt("Enter new Tanggal (YYYY-MM-DD):", entry.tanggal);
        entry.jam = prompt("Enter new Jam (HH:mm:ss):", entry.jam);
        entry.keterangan = prompt("Enter new Keterangan:", entry.keterangan);
        entry.status = prompt("Enter new Status:", entry.status);
        renderTable();
    } else {
        alert("Entry not found.");
    }
}

function deleteEntry() {
    const id = prompt("Pilih nomor yang ingin di hapus:");
    const index = izinData.findIndex(item => item.id == id);
    if (index > -1) {
        izinData.splice(index, 1);
        renderTable();
    } else {
        alert("Entry not found.");
    }
}

// Initial rendering of the table
renderTable();

// Button event listeners
document.querySelector('.btn-primary').addEventListener('click', addEntry);
document.querySelector('.btn-warning').addEventListener('click', editEntry);
document.querySelector('.btn-danger').addEventListener('click', deleteEntry);
