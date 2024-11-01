document.addEventListener('DOMContentLoaded', () => {
    // Form tambah/edit karyawan
    const form = document.querySelector('#addEmployeeModal form');
    let isEditMode = false; // Menandakan apakah mode saat ini adalah edit
    let editRow = null; // Menyimpan referensi ke baris yang sedang diedit

    // Fungsi untuk mendapatkan nomor urut terakhir di tabel
    function getHighestNumber() {
        const rows = document.querySelectorAll('table tbody tr');
        let highestNumber = 0;
        rows.forEach((row) => {
            const number = parseInt(row.cells[0].innerText);
            if (number > highestNumber) {
                highestNumber = number;
            }
        });
        return highestNumber;
    }

    // Fungsi untuk menambahkan atau mengedit karyawan
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Ambil nilai dari input form
        const kode = document.querySelector('#employeeCode').value;
        const nama = document.querySelector('#employeeName').value;
        const email = document.querySelector('#employeeEmail').value;
        const alamat = document.querySelector('#employeeAddress').value;
        const jabatan = document.querySelector('#employeePosition').value;

        if (isEditMode && editRow) {
            // Update data di baris yang sedang diedit
            editRow.cells[1].innerText = kode;
            editRow.cells[2].innerText = nama;
            editRow.cells[3].innerText = email;
            editRow.cells[4].innerText = alamat;
            editRow.cells[5].innerText = jabatan;

            alert('Data karyawan berhasil diperbarui!');
        } else {
            // Tambah data baru ke tabel
            const newNumber = getHighestNumber() + 1; // Dapatkan nomor urut selanjutnya
            const tableBody = document.querySelector('table tbody');
            const newRow = document.createElement('tr');

            newRow.innerHTML = `
                <td>${newNumber}</td>
                <td>${kode}</td>
                <td>${nama}</td>
                <td>${email}</td>
                <td>${alamat}</td>
                <td>${jabatan}</td>
                <td>
                    <button class="btn btn-info btn-sm">Edit</button>
                    <button class="btn btn-danger btn-sm">Hapus</button>
                </td>
            `;

            // Tambahkan event listener untuk tombol edit dan hapus pada baris baru
            newRow.querySelector('.btn-info').addEventListener('click', handleEdit);
            newRow.querySelector('.btn-danger').addEventListener('click', handleDelete);

            tableBody.appendChild(newRow);

            alert('Karyawan baru berhasil ditambahkan!');
        }

        // Reset form dan tutup modal
        form.reset();
        bootstrap.Modal.getInstance(document.querySelector('#addEmployeeModal')).hide();
        isEditMode = false;
        editRow = null;
    });

    // Fungsi untuk edit karyawan
    function handleEdit(e) {
        isEditMode = true;
        editRow = e.target.closest('tr');

        // Isi modal dengan data dari baris yang dipilih
        document.querySelector('#employeeCode').value = editRow.cells[1].innerText;
        document.querySelector('#employeeName').value = editRow.cells[2].innerText;
        document.querySelector('#employeeEmail').value = editRow.cells[3].innerText;
        document.querySelector('#employeeAddress').value = editRow.cells[4].innerText;
        document.querySelector('#employeePosition').value = editRow.cells[5].innerText;

        // Tampilkan modal
        new bootstrap.Modal(document.querySelector('#addEmployeeModal')).show();
    }

    // Fungsi untuk hapus karyawan
    function handleDelete(e) {
        if (confirm('Apakah Anda yakin ingin menghapus data karyawan ini?')) {
            const row = e.target.closest('tr');
            row.remove();
            alert('Data karyawan berhasil dihapus!');
            updateRowNumbers();
        }
    }

    // Fungsi untuk memperbarui nomor urut setelah penghapusan
    function updateRowNumbers() {
        const rows = document.querySelectorAll('table tbody tr');
        let number = 1; // Mulai dari 1
        rows.forEach((row) => {
            row.cells[0].innerText = number++;
        });
    }

    // Tambahkan event listener ke tombol edit dan hapus yang sudah ada
    document.querySelectorAll('.btn-info').forEach((editBtn) => {
        editBtn.addEventListener('click', handleEdit);
    });
    document.querySelectorAll('.btn-danger').forEach((deleteBtn) => {
        deleteBtn.addEventListener('click', handleDelete);
    });
});
