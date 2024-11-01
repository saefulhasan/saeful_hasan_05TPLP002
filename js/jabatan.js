document.addEventListener('DOMContentLoaded', () => {
    // Buat elemen modal untuk edit dan add jabatan
    const modalsContainer = document.createElement('div');
    modalsContainer.innerHTML = `
        <!-- Modal Edit Jabatan -->
        <div class="modal fade" id="editJabatanModal" tabindex="-1" aria-labelledby="editJabatanModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editJabatanModalLabel">Edit Jabatan</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="editJabatanForm">
                            <div class="mb-3">
                                <label for="editKodeJabatan" class="form-label">Kode Jabatan</label>
                                <input type="text" class="form-control" id="editKodeJabatan" required>
                            </div>
                            <div class="mb-3">
                                <label for="editNamaJabatan" class="form-label">Jabatan</label>
                                <input type="text" class="form-control" id="editNamaJabatan" required>
                            </div>
                            <button type="submit" class="btn btn-primary">Simpan Perubahan</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Add Jabatan -->
        <div class="modal fade" id="addJabatanModal" tabindex="-1" aria-labelledby="addJabatanModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="addJabatanModalLabel">Add Jabatan</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="addJabatanForm">
                            <div class="mb-3">
                                <label for="newKodeJabatan" class="form-label">Kode Jabatan</label>
                                <input type="text" class="form-control" id="newKodeJabatan" required>
                            </div>
                            <div class="mb-3">
                                <label for="newNamaJabatan" class="form-label">Jabatan</label>
                                <input type="text" class="form-control" id="newNamaJabatan" required>
                            </div>
                            <button type="submit" class="btn btn-success">Tambah Jabatan</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modalsContainer);

    // Tombol Add Jabatan
    document.querySelector('.btn-success').addEventListener('click', () => {
        new bootstrap.Modal(document.querySelector('#addJabatanModal')).show();
    });

    // Event listener untuk form edit
    const editForm = document.querySelector('#editJabatanForm');
    let editRow = null;

    editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const kode = document.querySelector('#editKodeJabatan').value;
        const nama = document.querySelector('#editNamaJabatan').value;

        if (editRow) {
            editRow.cells[1].innerText = kode;
            editRow.cells[2].innerText = nama;
            alert('Data jabatan berhasil diperbarui!');
            bootstrap.Modal.getInstance(document.querySelector('#editJabatanModal')).hide();
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

            document.querySelector('#editKodeJabatan').value = kode;
            document.querySelector('#editNamaJabatan').value = nama;

            new bootstrap.Modal(document.querySelector('#editJabatanModal')).show();
        });
    });

    // Event listener untuk tombol Hapus
    document.querySelectorAll('.btn-danger').forEach((deleteBtn) => {
        deleteBtn.addEventListener('click', (e) => {
            if (confirm('Apakah Anda yakin ingin menghapus data jabatan ini?')) {
                const row = e.target.closest('tr');
                row.remove();
                alert('Data jabatan berhasil dihapus!');
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

            alert(`Detail Jabatan:\nKode Jabatan: ${kode}\nNama Jabatan: ${nama}`);
        });
    });

    // Event listener untuk form add
    const addForm = document.querySelector('#addJabatanForm');

    addForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const kode = document.querySelector('#newKodeJabatan').value;
        const nama = document.querySelector('#newNamaJabatan').value;

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
            document.querySelector('#editKodeJabatan').value = editRow.cells[1].innerText;
            document.querySelector('#editNamaJabatan').value = editRow.cells[2].innerText;
            new bootstrap.Modal(document.querySelector('#editJabatanModal')).show();
        });

        newRow.querySelector('.btn-danger').addEventListener('click', (e) => {
            if (confirm('Apakah Anda yakin ingin menghapus data jabatan ini?')) {
                newRow.remove();
                alert('Data jabatan berhasil dihapus!');
                updateRowNumbers();
            }
        });

        newRow.querySelector('.btn-secondary').addEventListener('click', (e) => {
            alert(`Detail Jabatan:\nKode Jabatan: ${kode}\nNama Jabatan: ${nama}`);
        });

        alert('Data jabatan berhasil ditambahkan!');
        bootstrap.Modal.getInstance(document.querySelector('#addJabatanModal')).hide();
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
