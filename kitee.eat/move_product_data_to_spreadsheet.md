Untuk memindahkan data produk dari `script.js` ke spreadsheet, Anda perlu mengikuti beberapa langkah utama agar data bisa diatur secara eksternal dan diambil oleh aplikasi web Anda.

Berikut adalah langkah-langkah yang perlu Anda lakukan:

1.  **Pilih Platform Spreadsheet:**
    *   **Google Sheets:** Ini adalah pilihan yang paling umum dan mudah karena memungkinkan Anda untuk mempublikasikan data sebagai JSON atau CSV yang dapat diakses melalui URL.
    *   **Microsoft Excel Online (OneDrive):** Juga bisa, tapi mungkin sedikit lebih rumit untuk mendapatkan URL yang bisa diakses langsung sebagai data mentah.
    *   **Lokal/Server Sendiri:** Jika Anda memiliki server, Anda bisa mengelola spreadsheet secara lokal, mengkonversinya ke format JSON atau CSV, lalu menaruh file tersebut di server Anda.

2.  **Siapkan Data Produk di Spreadsheet:**
    *   Buat kolom untuk setiap properti produk Anda (misalnya, `id`, `category`, `name`, `desc`, `price`, `image`, `jabodetabekOnly`, `isAvailable`, `fixedDeliveryDate`).
    *   Pastikan nama kolom persis sama dengan nama properti di objek JavaScript Anda.
    *   Isi semua data produk Anda ke dalam baris-baris spreadsheet.

3.  **Publikasikan Data (Contoh Google Sheets):**
    *   Di Google Sheets, pergi ke `File > Share > Publish to web`.
    *   Pilih `Entire document` atau sheet spesifik yang berisi data produk Anda.
    *   Pilih format `Comma-separated values (.csv)` atau `JSON`. Untuk kasus ini, `JSON` akan lebih mudah diproses di JavaScript.
    *   Klik `Publish` dan Anda akan mendapatkan sebuah URL. URL ini adalah endpoint yang akan Anda gunakan untuk mengambil data.

4.  **Ubah `script.js` untuk Mengambil Data:**
    *   Hapus array `products` yang di-hardcode dari `script.js`.
    *   Gunakan fungsi `fetch()` JavaScript untuk mengambil data dari URL spreadsheet yang sudah Anda publikasikan.
    *   Setelah data diambil, Anda perlu memparsingnya (jika CSV, Anda mungkin perlu library tambahan; jika JSON, ini lebih mudah).
    *   Simpan data yang sudah diparse ke dalam variabel `products` (atau nama lain) yang akan digunakan oleh fungsi `renderProducts` dan fungsi lainnya.

5.  **Perbarui Fungsi yang Menggunakan Data Produk:**
    *   Pastikan semua fungsi seperti `renderProducts`, `addToCart`, `openModal`, dll., masih bekerja dengan struktur data yang baru Anda ambil. Jika format JSON dari Google Sheets sedikit berbeda, Anda mungkin perlu melakukan sedikit penyesuaian pada cara Anda mengakses properti produk.

**Contoh Perubahan di `script.js` (Menggunakan Google Sheets JSON):**

Asumsikan Anda sudah mendapatkan URL publikasi JSON dari Google Sheets, misalnya: `https://docs.google.com/spreadsheets/d/e/2PACX-1vT.../pub?gid=0&single=true&output=csv` (Anda akan mengubah `output=csv` menjadi `output=json`).

```javascript
// Hapus atau komen kode ini
// const products = [
//     { id: 0, category: "Special Edition", ... },
//     ...
// ];

// Variabel global untuk menyimpan data produk yang akan diambil
let products = []; 

// Fungsi untuk mengambil data produk dari spreadsheet
const fetchProducts = async () => {
    try {
        // Ganti URL ini dengan URL Google Sheets JSON Anda
        const response = await fetch('YOUR_GOOGLE_SHEETS_JSON_URL_HERE'); 
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Google Sheets JSON mungkin memiliki struktur yang berbeda.
        // Anda mungkin perlu menyesuaikan cara memproses 'data'.
        // Contoh: Jika data langsung array objek:
        products = data; 
        
        // Atau jika data di nested di properti 'feed' dan 'entry'
        // products = data.feed.entry.map(entry => ({
        //     id: parseInt(entry.gsx$id.$t), // asumsikan kolom bernama 'id'
        //     category: entry.gsx$category.$t,
        //     name: entry.gsx$name.$t,
        //     desc: entry.gsx$desc.$t,
        //     price: parseFloat(entry.gsx$price.$t),
        //     image: entry.gsx$image.$t,
        //     jabodetabekOnly: entry.gsx$jabodetabekOnly.$t === 'TRUE',
        //     isAvailable: entry.gsx$isAvailable.$t === 'TRUE',
        //     fixedDeliveryDate: entry.gsx$fixedDeliveryDate.$t || null, // Handle if not present
        // }));

        // Setelah data diambil, baru render produk dan inisialisasi lainnya
        renderProducts('all');
        renderCart();
        // Inisialisasi datepicker dan logic delivery date lainnya
        initializeDatepickerLogic(); // Pindahkan logic datepicker ke fungsi terpisah
        
    } catch (error) {
        console.error("Error fetching products:", error);
        // Tampilkan pesan error ke user jika gagal mengambil data
        document.getElementById('product-list').innerHTML = '<p>Maaf, produk gagal dimuat. Silakan coba lagi nanti.</p>';
    }
};

// Pindahkan logic datepicker ke fungsi terpisah agar bisa dipanggil setelah data produk dimuat
const initializeDatepickerLogic = () => {
    // ... (kode inisialisasi datepicker yang sudah ada di DOMContentLoaded) ...
    $.datepicker.regional.id = { /* ... */ };
    $.datepicker.setDefaults($.datepicker.regional.id);

    const now = new Date();
    const wibHour = (now.getUTCHours() + 7) % 24;
    const minDateOffset = wibHour >= 15 ? 2 : 1;
    
    const datePicker = $("#delivery-date").datepicker({
        minDate: minDateOffset,
        dateFormat: "DD, dd MM yy",
        beforeShow: function(input, inst) {
            $('#modal-order-form').append(inst.dpDiv);
        }
    });

    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + minDateOffset);
    datePicker.datepicker("setDate", defaultDate);
    
    $("#delivery-date").on('click', function() {
        datePicker.datepicker("show");
    });
};


// Panggil fungsi fetchProducts saat DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    // renderCart(); // renderCart akan dipanggil setelah fetchProducts
    // initializeDatepickerLogic(); // Panggil di dalam fetchProducts
});
```

**Penting:**
*   **Struktur JSON dari Google Sheets:** Perhatikan betul struktur JSON yang dihasilkan Google Sheets. Seringkali, data Anda akan berada di dalam array `feed.entry` dan setiap sel akan menjadi objek seperti `gsx$namaKolom.$t`. Anda perlu memetakan ini ke struktur objek `product` Anda.
*   **Error Handling:** Pastikan ada penanganan error jika data gagal diambil.
*   **Asynchronous Nature:** Karena `fetch` adalah operasi asynchronous, pastikan `renderProducts` dan inisialisasi datepicker hanya dipanggil *setelah* data produk berhasil diambil.

Langkah ini akan membuat aplikasi Anda lebih fleksibel karena data produk dapat diubah hanya dengan mengedit spreadsheet, tanpa perlu mengubah kode JavaScript.