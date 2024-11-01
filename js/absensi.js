document.addEventListener('DOMContentLoaded', function() {
    // Ambil semua tombol aksi di tabel
    const actionButtons = document.querySelectorAll('.btn-primary');

    // Tambahkan event listener untuk setiap tombol
    actionButtons.forEach((button) => {
        button.addEventListener('click', function() {
            // Ambil data dari baris terkait tombol yang diklik
            const row = button.closest('tr');
            const namaKaryawan = row.children[1].textContent;
            const tanggal = row.children[2].textContent;
            const lokasiAbsen = row.children[3].textContent;
            const jamMasuk = row.children[4].textContent;
            const jamKeluar = row.children[5].textContent;

            // Isi konten modal dengan detail data absensi
            document.getElementById('modalBodyContent').innerHTML = `
                <p><strong>Nama Karyawan:</strong> ${namaKaryawan}</p>
                <p><strong>Tanggal:</strong> ${tanggal}</p>
                <p><strong>Lokasi Absen:</strong> ${lokasiAbsen}</p>
                <p><strong>Jam Masuk:</strong> ${jamMasuk}</p>
                <p><strong>Jam Keluar:</strong> ${jamKeluar}</p>
            `;

            // Tampilkan modal
            const modal = new bootstrap.Modal(document.getElementById('detailModal'));
            modal.show();
        });
    });
});
