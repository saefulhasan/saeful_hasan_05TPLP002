document.addEventListener('DOMContentLoaded', () => {
    // Buat elemen modal untuk edit dan add divisi
    const modalsContainer = document.createElement('div');
    modalsContainer.innerHTML = `
        <!-- Modal Edit Divisi -->
        <div class="modal fade" id="editDivisiModal" tabindex="-1" aria-labelledby="editDivisiModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editDivisiModalLabel">Edit Divisi</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="editDivisiForm">
                            <div class="mb-3">
                                <label for="editKodeDivisi" class="form-label">Kode Divisi</label>
                                <input type="text" class="form-control" id="editKodeDivisi" required>
                            </div>
                            <div class="mb-3">
                                <label for="editNamaDivisi" class="form-label">Nama Divisi</label>
                                <input type="text" class="form-control" id="editNamaDivisi" required>
                            </div>
                            <button type="submit" class="btn btn-primary">Simpan Perubahan</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Add Divisi -->
        <div class="modal fade" id="addDivisiModal" tabindex="-1" aria-labelledby="addDivisiModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addDivisiModalLabel">Add Divisi</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="addDivisiForm">
                            <div class="mb-3">
                                <label for="newKodeDivisi" class="form-label">Kode Divisi</label>
                                <input type="text" class="form-control" id="newKodeDivisi" required>
                            </div>
                            <div class="mb-3">
                                <label for="newNamaDivisi" class="form-label">Nama Divisi</label>
                                <input type="text" class="form-control" id="newNamaDivisi" required>
                            </div>
                            <button type="submit" class="btn btn-success">Tambah Divisi</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modalsContainer);

    // Tombol Add Divisi
    document.querySelector('#addDivisiBtn').addEventListener('click', () => {
        new bootstrap.Modal(document.querySelector('#addDivisiModal')).show();
    });

    // Event listener untuk form edit
    const editForm = document.querySelector('#editDivisiForm');
    let editRow = null;

    editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const kode = document.querySelector('#editKodeDivisi').value;
        const nama = document.querySelector('#editNamaDivisi').value;

        if (editRow) {
            editRow.cells[1].innerText = kode;
            editRow.cells[2].innerText = nama;
            alert('Data divisi berhasil diperbarui!');
            bootstrap.Modal.getInstance(document.querySelector('#editDivisiModal')).hide();
        }

        editForm.reset();
        editRow = null;
    });

    // Event listener untuk tombol Edit
    document.querySelectorAll('.btn-info').forEach((editBtn) => {
        editBtn.addEventListener('click', (e) => {
            editRow = e.target.closest('tr');
            const kode = editRow.cells[1].innerText;
            const nama = editRow.cells[2].innerText;

            document.querySelector('#editKodeDivisi').value = kode;
            document.querySelector('#editNamaDivisi').value = nama;

            new bootstrap.Modal(document.querySelector('#editDivisiModal')).show();
        });
    });

    // Event listener untuk tombol Hapus
    document.querySelectorAll('.btn-danger').forEach((deleteBtn) => {
        deleteBtn.addEventListener('click', (e) => {
            if (confirm('Apakah Anda yakin ingin menghapus data divisi ini?')) {
                const row = e.target.closest('tr');
                row.remove();
                alert('Data divisi berhasil dihapus!');
                updateRowNumbers();
            }
        });
    });

    // Event listener untuk tombol Detail
    document.querySelectorAll('.btn-secondary').forEach((detailBtn) => {
        detailBtn.addEventListener('click', (e) => {
            const row = e.target.closest('tr');
            const kode = row.cells[1].innerText;
            const nama = row.cells[2].innerText;

            alert(`Detail Divisi:\nKode Divisi: ${kode}\nNama Divisi: ${nama}`);
        });
    });

    // Event listener untuk form add
    const addForm = document.querySelector('#addDivisiForm');

    addForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const kode = document.querySelector('#newKodeDivisi').value;
        const nama = document.querySelector('#newNamaDivisi').value;

        // Tambahkan data baru ke tabel
        const tableBody = document.querySelector('table tbody');
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td></td>
            <td>${kode}</td>
            <td>${nama}</td>
            <td>
                <button class="btn btn-info btn-sm">Edit</button>
                <button class="btn btn-danger btn-sm">Hapus</button>
                <button class="btn btn-secondary btn-sm">Detail</button>
            </td>
        `;
        tableBody.appendChild(newRow);

        // Perbarui nomor baris
        updateRowNumbers();

        // Tambahkan event listener ke tombol baru
        newRow.querySelector('.btn-info').addEventListener('click', (e) => {
            editRow = e.target.closest('tr');
            document.querySelector('#editKodeDivisi').value = editRow.cells[1].innerText;
            document.querySelector('#editNamaDivisi').value = editRow.cells[2].innerText;
            new bootstrap.Modal(document.querySelector('#editDivisiModal')).show();
        });

        newRow.querySelector('.btn-danger').addEventListener('click', (e) => {
            if (confirm('Apakah Anda yakin ingin menghapus data divisi ini?')) {
                newRow.remove();
                alert('Data divisi berhasil dihapus!');
                updateRowNumbers();
            }
        });

        newRow.querySelector('.btn-secondary').addEventListener('click', (e) => {
            alert(`Detail Divisi:\nKode Divisi: ${kode}\nNama Divisi: ${nama}`);
        });

        alert('Data divisi berhasil ditambahkan!');
        bootstrap.Modal.getInstance(document.querySelector('#addDivisiModal')).hide();
        addForm.reset();
    });

    // Perbarui nomor urut di tabel
    function updateRowNumbers() {
        const rows = document.querySelectorAll('table tbody tr');
        rows.forEach((row, index) => {
            row.cells[0].innerText = index + 1;
        });
    }
});
