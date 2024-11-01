// Sample data array to simulate a database
let lemburData = [
    { id: 1, name: "Saeful Hasan", tanggal: "2024-05-10", jamMulai: "10:35:00", jamBerakhir: "15:35:00", keperluan: "Pengganti Izin", status: "Menunggu Konfirmasi" },
    { id: 2, name: "Yovan Fiqri", tanggal: "2024-05-09", jamMulai: "11:05:00", jamBerakhir: "04:05:00", keperluan: "Biarkan Bos Kaya", status: "Disetujui" },
    { id: 3, name: "Ependi", tanggal: "2024-05-04", jamMulai: "17:00:00", jamBerakhir: "17:30:00", keperluan: "Lembur", status: "Disetujui" },
    { id: 4, name: "Nauval", tanggal: "2024-05-03", jamMulai: "17:00:00", jamBerakhir: "21:37:00", keperluan: "Printer", status: "Disetujui" },
    { id: 5, name: "Apriesta", tanggal: "2024-04-30", jamMulai: "01:46:00", jamBerakhir: "21:46:00", keperluan: "Pengen Aja", status: "Disetujui" },
    { id: 6, name: "Fiqri", tanggal: "2024-04-28", jamMulai: "17:00:00", jamBerakhir: "20:51:00", keperluan: "Printer FEB", status: "Disetujui" }
];

function renderTable() {
    const tbody = document.getElementById('lemburTableBody');
    tbody.innerHTML = ''; // Clear existing rows
    lemburData.forEach((item, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.tanggal}</td>
                <td>${item.jamMulai} | ${item.jamBerakhir}</td>
                <td>${item.keperluan}</td>
                <td>${item.status}</td>
            </tr>
        `;
        tbody.insertAdjacentHTML('beforeend', row);
    });
}

function addEntry() {
    const name = prompt("Enter Name:");
    const tanggal = prompt("Enter Tanggal (YYYY-MM-DD):");
    const jamMulai = prompt("Enter Jam Mulai (HH:mm:ss):");
    const jamBerakhir = prompt("Enter Jam Berakhir (HH:mm:ss):");
    const keperluan = prompt("Enter Keperluan Lembur:");
    const status = "Menunggu Konfirmasi";

    if (name && tanggal && jamMulai && jamBerakhir && keperluan) {
        const newEntry = {
            id: lemburData.length + 1,
            name,
            tanggal,
            jamMulai,
            jamBerakhir,
            keperluan,
            status
        };

        lemburData.push(newEntry);
        renderTable();
    } else {
        alert("All fields are required!");
    }
}

function editEntry() {
    const id = prompt("Pilih nomor yang ingin di edit:");
    const entry = lemburData.find(item => item.id == id);
    if (entry) {
        entry.name = prompt("Enter new Name:", entry.name) || entry.name;
        entry.tanggal = prompt("Enter new Tanggal (YYYY-MM-DD):", entry.tanggal) || entry.tanggal;
        entry.jamMulai = prompt("Enter new Jam Mulai (HH:mm:ss):", entry.jamMulai) || entry.jamMulai;
        entry.jamBerakhir = prompt("Enter new Jam Berakhir (HH:mm:ss):", entry.jamBerakhir) || entry.jamBerakhir;
        entry.keperluan = prompt("Enter new Keperluan Lembur:", entry.keperluan) || entry.keperluan;
        entry.status = prompt("Enter new Status:", entry.status) || entry.status;
        renderTable();
    } else {
        alert("Entry not found.");
    }
}

function deleteEntry() {
    const id = prompt("Pilih nomor yang ingin di hapus:");
    const index = lemburData.findIndex(item => item.id == id);
    if (index > -1) {
        lemburData.splice(index, 1);
        renderTable();
    } else {
        alert("Entry not found.");
    }
}

// Initial rendering of the table
renderTable();

// Button event listeners
document.getElementById('addBtn').addEventListener('click', addEntry);
document.getElementById('editBtn').addEventListener('click', editEntry);
document.getElementById('deleteBtn').addEventListener('click', deleteEntry);
