// DATA PRODUK (Saya isi harga/deskripsi dummy untuk yang bertanda ???)

const parseCSV = (csvString) => {
    const lines = csvString.split('\n').filter(line => line.trim() !== '');
    if (lines.length === 0) return [];

    const headers = lines[0].split(',');
    const products = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const product = {};
        let inQuote = false;
        let field = '';
        let headerIndex = 0;

        for (let j = 0; j < line.length; j++) {
            const char = line[j];

            if (char === '"') {
                inQuote = !inQuote;
            } else if (char === ',' && !inQuote) {
                // End of field
                product[headers[headerIndex].trim()] = field.trim();
                field = '';
                headerIndex++;
            } else {
                field += char;
            }
        }
        // Add the last field
        product[headers[headerIndex].trim()] = field.trim();

        // Type conversion based on expected types
        // Need to handle potential issues if values are missing or malformed
        product.id = parseInt(product.id) || 0;
        const rawPriceValue = product.price;
        const parsedPrice = parseFloat(rawPriceValue);

        if (isNaN(parsedPrice) || rawPriceValue.trim() === '') {
            // If it's not a valid number, or an empty string, keep the original string value
            product.price = rawPriceValue;
        } else {
            // If it's a valid number, use the parsed float value
            product.price = parsedPrice;
        }
        // Handle originalPrice parsing
        const rawOriginalPriceValue = product.originalPrice; // Assuming 'originalPrice' is a header in your CSV
        const parsedOriginalPrice = parseFloat(rawOriginalPriceValue);
        product.originalPrice = isNaN(parsedOriginalPrice) ? null : parsedOriginalPrice; // Store as null if not a valid number

        product.jabodetabekOnly = product.jabodetabekOnly ? (product.jabodetabekOnly.toUpperCase() === 'TRUE') : false;
        product.isAvailable = product.isAvailable ? (product.isAvailable.toUpperCase() === 'TRUE') : false;
        product.show = product.show ? (product.show.toUpperCase() === 'TRUE') : true; // Default to true if missing
        // fixedDeliveryDate might be empty, so handle it
        product.fixedDeliveryDate = product.fixedDeliveryDate === '' ? null : product.fixedDeliveryDate;

        products.push(product);
    }
    return products;
};

const parseInfoCSV = (csvString) => {
    const lines = csvString.split('\n').filter(line => line.trim() !== '');
    if (lines.length <= 1) return []; // Assuming header row and at least one data row

    const headers = lines[0].split(',').map(header => header.trim());
    const data = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (!line) continue; // Skip empty lines

        const row = {};
        let inQuote = false;
        let field = '';
        let headerIndex = 0;

        for (let j = 0; j < line.length; j++) {
            const char = line[j];

            if (char === '"') {
                inQuote = !inQuote;
            } else if (char === ',' && !inQuote) {
                row[headers[headerIndex]] = field.trim();
                field = '';
                headerIndex++;
            } else {
                field += char;
            }
        }
        // Add the last field
        if (headers[headerIndex]) { // Ensure header exists for the last field
            row[headers[headerIndex]] = field.trim();
        }
        data.push(row);
    }
    return data;
};
let products = [];

// Format Rupiah
const formatPrice = (price) => {
    if (typeof price === 'number') {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    }
    return price;
};

// Fungsi Render (Tampilkan Produk)
const renderProducts = (filterCategory = 'all') => {
    const container = document.getElementById('product-list');
    container.innerHTML = ''; // Bersihkan isi container

    // Filter data
    const filteredData = products.filter(p => {
        const matchesCategory = filterCategory === 'all' || p.category === filterCategory;
        const isShown = p.show !== false; // Only show if p.show is true (or undefined/null, but we set default true)
        return matchesCategory && isShown;
    });

    // Loop dan buat HTML
    filteredData.forEach(product => {
        let shippingBadgeHtml = '';
        if (product.jabodetabekOnly) {
            shippingBadgeHtml = `<span class="shipping-badge"><i class="bi bi-truck"></i> Jabodetabek Only</span>`;
        }

        const buttonHtml = product.isAvailable
            ? (product.category === "Special Edition"
                ? `<button onclick="addToCart(${product.id}, true)">Pesan Sekarang</button>`
                : `<button onclick="addToCart(${product.id})">Pesan Sekarang</button>`)
            : `<button class="outline" disabled>Segera Hadir</button>`;

        const html = `
            <article class="product-card">
                <div class="product-image-container">
                    ${shippingBadgeHtml}
                    <span class="category-badge">${product.category}</span>
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                </div>
                <div class="card-content">
                    <div class="product-category-text">${product.category}</div>
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">
                        ${product.originalPrice !== null && typeof product.originalPrice === 'number' && typeof product.price === 'number' && product.originalPrice > product.price
                            ? `<del style="color:var(--pico-muted-color); text-decoration: line-through red 2px;">${formatPrice(product.originalPrice)}</del> ${formatPrice(product.price)}`
                            : `${formatPrice(product.price)}`}
                    </div>
                    <p class="product-desc">${product.desc}</p>
                    ${buttonHtml}
                </div>
            </article>
        `;
        container.innerHTML += html;
    });
};

// Fungsi Tombol Filter (Ganti Style Tombol)
const filterProducts = (category) => {
    // Render ulang produk
    renderProducts(category);

    // Update tampilan tombol (Active vs Outline)
    const buttons = document.querySelectorAll('.filters button');
    buttons.forEach(btn => {
        // Reset semua ke outline
        btn.className = 'outline';
    });

    // Set tombol yang diklik jadi solid (hapus class outline)
    let activeBtnId = 'btn-all';
    if(category === 'Kitee Fudgy') activeBtnId = 'btn-fudgy';
    if(category === 'Kitee Bread') activeBtnId = 'btn-bread';
    if(category === 'Kitee Milk') activeBtnId = 'btn-milk';
    if(category === 'Kitee Crunchy') activeBtnId = 'btn-crunchy';
    if(category === 'Special Edition') activeBtnId = 'btn-special';
    
    document.getElementById(activeBtnId).className = '';
};

// Function to initialize datepicker logic
const initializeDatepickerLogic = () => {
    // JQuery UI Datepicker Indonesian Localization
    $.datepicker.regional.id = {
        closeText: "Tutup",
        prevText: "mundur",
        nextText: "maju",
        currentText: "hari ini",
        monthNames: [ "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "Nopember", "Desember" ],
        monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
        "Jul", "Agu", "Sep", "Okt", "Nop", "Des" ],
        dayNames: [ "Ahad", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu" ],
        dayNamesShort: [ "Ahd", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab" ],
        dayNamesMin: [ "Ah", "Sn", "Sl", "Rb", "Km", "Jm", "Sb" ],
        weekHeader: "Ahd",
        dateFormat: "dd MM yy",
        firstDay: 0, // Sunday
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    $.datepicker.setDefaults($.datepicker.regional.id);

    // --- Delivery Date Logic ---
    const now = new Date();
    // Get current hour in WIB (UTC+7)
    const wibHour = (now.getUTCHours() + 7) % 24;
    
    // If it's 3 PM (15:00) or later, the earliest delivery is H+2. Otherwise, it's H+1.
    const minDateOffset = wibHour >= 15 ? 2 : 1;
    // --- End of Delivery Date Logic ---

    // Initialize datepicker
    const datePicker = $("#delivery-date").datepicker({
        minDate: minDateOffset, // Set minimum selectable date
        dateFormat: "DD, dd MM yy",
        // Fix for datepicker not showing inside a modal
        beforeShow: function(input, inst) {
            $('#modal-order-form').append(inst.dpDiv);
        }
    });

    // Set default selected date
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + minDateOffset);
    datePicker.datepicker("setDate", defaultDate);
    
    // Manual trigger to bypass modal event issues
    $("#delivery-date").on('click', function() {
        datePicker.datepicker("show");
    });
};

// Function to show the general info popup modal
const showInfoPopup = async () => {
    const infoModal = document.getElementById('info-popup-modal');
    if (!infoModal) return;

    const googleSheetsInfoCSVUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQNAcg00T3JaqMt8RJkrC6tDemDzUL2n1TtFAhecimzP8lQbD38kyUWCDsX47jMlSm05L8EZob_fa8i/pub?gid=1161911511&single=true&output=csv'; // Corrected GID

    try {
        const response = await fetch(googleSheetsInfoCSVUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const csvText = await response.text();
        const infoData = parseInfoCSV(csvText);

        if (infoData.length > 0) {
            const lastInfo = infoData[infoData.length - 1];

            // Only show the modal if the status is 'TRUE'
            if (lastInfo.status && lastInfo.status.toUpperCase() === 'TRUE') {
                const infoTitleElement = document.getElementById('info-popup-title');
                const infoContentElement = document.getElementById('info-popup-content');
                const infoImageElement = document.getElementById('info-popup-image');

                // Handle info_title
                if (infoTitleElement) { // Check if element exists
                    if (lastInfo.info_title && lastInfo.info_title.trim() !== '') {
                        infoTitleElement.textContent = lastInfo.info_title;
                        infoTitleElement.style.display = 'block';
                    } else {
                        infoTitleElement.textContent = '';
                        infoTitleElement.style.display = 'none';
                    }
                }


                // Handle info_text
                if (infoContentElement) { // Check if element exists
                    if (lastInfo.info_text && lastInfo.info_text.trim() !== '') {
                        infoContentElement.innerHTML = marked.parse(lastInfo.info_text, { gfm: true,breaks: true,satisfies: { sanitize: true } });
                        infoContentElement.style.display = 'block';
                    } else {
                        infoContentElement.textContent = '';
                        infoContentElement.style.display = 'none';
                    }
                }

                // Handle image
                if (infoImageElement) { // Check if element exists
                    if (lastInfo.image && lastInfo.image.trim() !== '') {
                        infoImageElement.src = lastInfo.image;
                        infoImageElement.style.display = 'block';
                    } else {
                        infoImageElement.src = '';
                        infoImageElement.style.display = 'none';
                    }
                }

                // Handle closable
                const closable = lastInfo.closable ? (lastInfo.closable.toUpperCase() === 'TRUE') : false;
                const closeBtn = document.getElementById('info-popup-close');
                const closeFooter = document.getElementById('info-popup-footer');
                if (closeBtn) {
                    closeBtn.style.display = closable ? 'block' : 'none';
                }
                if (closeFooter) {
                    closeFooter.style.display = closable ? 'block' : 'none';
                }
                
                // Store closable status on the modal for the event listeners
                infoModal.dataset.closable = closable;
                
                infoModal.showModal();
            }
        }
    } catch (error) {
        console.error("Error fetching or parsing info data:", error);
    }
};

        // Jalankan saat pertama kali load
        document.addEventListener('DOMContentLoaded', async () => { // Make DOMContentLoaded async
            const googleSheetsCSVUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQNAcg00T3JaqMt8RJkrC6tDemDzUL2n1TtFAhecimzP8lQbD38kyUWCDsX47jMlSm05L8EZob_fa8i/pub?gid=0&single=true&output=csv';
            
            try {
                const response = await fetch(googleSheetsCSVUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const csvText = await response.text();
                products = parseCSV(csvText);
            } catch (error) {
                console.error("Error fetching or parsing product data:", error);
                document.getElementById('product-list').innerHTML = '<p>Maaf, produk gagal dimuat. Silakan coba lagi nanti.</p>';
            }

            renderProducts('all');
            renderCart(); // Render cart dari session storage saat load
            initializeDatepickerLogic(); // Initialize datepicker after products are loaded
            showInfoPopup(); // Show the general info popup modal

            // Mencegah info-popup-modal ditutup dengan tombol Escape atau klik backdrop jika closable false
            const infoModal = document.getElementById('info-popup-modal');
            if (infoModal) {
                // Blokir event 'cancel' (standar dialog) jika closable false
                infoModal.addEventListener('cancel', (e) => {
                    if (infoModal.dataset.closable !== 'true') {
                        e.preventDefault();
                    }
                });

                // Blokir Escape di fase capture sebelum browser menutup dialog jika closable false
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape' && infoModal.open) {
                        if (infoModal.dataset.closable !== 'true') {
                            e.preventDefault();
                            e.stopImmediatePropagation();
                        }
                    }
                }, true);

                // Tutup modal jika klik di backdrop dan closable true
                infoModal.addEventListener('click', (event) => {
                    if (infoModal.dataset.closable === 'true' && event.target === infoModal) {
                        closeModal('info-popup-modal');
                    }
                });
            }
        });

// --- LOGIKA SHOPPING CART ---

// Fungsi Tambah ke Keranjang
const addToCart = (productId, openModalDirectly = false) => {
    if (openModalDirectly) {
        // Don't add to cart, just open the modal for a direct order
        openModal(productId);
        return; // Stop execution here
    }
    
    // Regular logic for adding to cart
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    sessionStorage.setItem('cart', JSON.stringify(cart));
    renderCart();

    const cartContainer = document.getElementById('cart-container');
    const cartIcon = document.getElementById('cart-icon');
    cartContainer.style.display = 'block';
    cartIcon.style.display = 'none';
};

// Fungsi Render Keranjang
const renderCart = () => {
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalEl = document.getElementById('cart-total');
    const cartContainer = document.getElementById('cart-container');
    const cartIcon = document.getElementById('cart-icon');
    const cartCountBadge = document.getElementById('cart-count-badge');
    
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let totalItems = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: #888;">Keranjang kosong.</p>';
        cartContainer.style.display = 'none'; // Sembunyikan cart jika kosong
        cartIcon.style.display = 'none'; // Sembunyikan ikon jika cart kosong
    } else {
        cart.forEach(item => {
            const itemTotal = typeof item.price === 'number' ? item.price * item.quantity : 0;
            total += itemTotal;
            totalItems += item.quantity;
            
            const itemHtml = `
                <div style="display: flex; align-items: center; margin-bottom: 1rem;">
                    <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px; margin-right: 1rem;">
                    <div style="flex-grow: 1;">
                        <div style="font-size: 0.9rem; font-weight: bold;">${item.name}</div>
                        <div style="font-size: 0.8rem; color: #555;">${formatPrice(item.price)}</div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 5px;">
                        <button onclick="updateQuantity(${item.id}, -1)" style="padding: 2px 8px; font-size: 0.8rem; line-height: 1; min-height: 0; margin:0;">-</button>
                        <span style="font-size: 0.9rem;">${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, 1)" style="padding: 2px 8px; font-size: 0.8rem; line-height: 1; min-height: 0; margin:0;">+</button>
                    </div>
                </div>
            `;
            cartItemsContainer.innerHTML += itemHtml;
        });
        
        // Jika cart tidak kosong, ikon harus terlihat jika cart container tersembunyi
        // atau tersembunyi jika cart container terlihat
        if (window.getComputedStyle(cartContainer).display === 'none') {
            cartIcon.style.display = 'flex';
        } else {
            cartIcon.style.display = 'none';
        }
        cartCountBadge.textContent = totalItems;
    }

    cartTotalEl.textContent = formatPrice(total);
};

// Fungsi Update Kuantitas
const updateQuantity = (productId, change) => {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === productId);

    if (itemIndex > -1) {
        cart[itemIndex].quantity += change;
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1); // Hapus item jika kuantitas 0 atau kurang
        }
    }

    sessionStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    // Setelah update quantity, pastikan cart terlihat jika ada item
    const cartContainer = document.getElementById('cart-container');
    if (cart.length > 0 && window.getComputedStyle(cartContainer).display === 'none') {
        cartContainer.style.display = 'block';
        document.getElementById('cart-icon').style.display = 'none';
    }
};

// --- LOGIKA MODAL & WHATSAPP ---

const openModal = (productId = null) => {
    // Reset previous special order state at the beginning
    sessionStorage.removeItem('specialEditionDirectOrder');

    // The cart empty check is handled in generateWhatsAppLink,
    // and for direct special edition orders, cart is constructed on the fly.
    // For regular orders, openModal is called via 'Pesan via WhatsApp' button
    // which has its own logic for cart empty check.

    const modal = document.getElementById('modal-order-form');
    const deliveryDateInput = document.getElementById('delivery-date');
    const dateHelper = document.getElementById('date-helper');
    const productQuantityLabel = document.getElementById('product-quantity-label');
    const productQuantityInput = document.getElementById('product-quantity');


    const originalDateHelperContent = `
        <ul>
            <li>Batas pesanan untuk pengantaran besok (H+1) adalah pukul 15.00 WIB.</li>
            <li>Pesanan yang masuk setelahnya akan dijadwalkan untuk hari berikutnya (H+2).</li>
        </ul>
    `;

    // Reset to default datepicker state first
    deliveryDateInput.removeAttribute('disabled');
    dateHelper.innerHTML = originalDateHelperContent;
    
    // Re-initialize datepicker to ensure it's fully functional for regular orders
    const now = new Date();
    const wibHour = (now.getUTCHours() + 7) % 24;
    const minDateOffset = wibHour >= 15 ? 2 : 1;
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + minDateOffset);
    $(deliveryDateInput).datepicker("option", "minDate", minDateOffset);
    $(deliveryDateInput).datepicker("setDate", defaultDate);

    // Reset quantity input visibility and value
    productQuantityLabel.style.display = 'none';
    productQuantityInput.style.display = 'none';
    productQuantityInput.value = '1'; // Default to 1


    if (productId !== null) {
        const product = products.find(p => p.id === productId);
        if (product && product.category === "Special Edition") {
            // Set flag for special edition direct order
            sessionStorage.setItem('specialEditionDirectOrder', productId);

            const fixedDate = new Date(product.fixedDeliveryDate); // 'YYYY-MM-DD' format is parsed correctly
            $(deliveryDateInput).datepicker("setDate", fixedDate);
            deliveryDateInput.setAttribute('disabled', 'true'); // Disable input
            dateHelper.innerHTML = `Tanggal pengantaran untuk edisi spesial ini sudah ditentukan pada <strong>${fixedDate.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong>.`;

            // Show quantity input for special edition
            productQuantityLabel.style.display = 'block';
            productQuantityInput.style.display = 'block';
            productQuantityInput.value = '1'; // Always start with 1 for a direct order
        }
    }

    modal.showModal();
};

const closeModal = (modalId = 'modal-order-form') => {
    const modalToClose = document.getElementById(modalId);
    if (modalToClose) {
        modalToClose.close();
    }
    
    // Reset logic for modal-order-form only
    if (modalId === 'modal-order-form') {
        // Reset delivery date input and helper text
        const deliveryDateInput = document.getElementById('delivery-date');
        const dateHelper = document.getElementById('date-helper');
        const originalDateHelperContent = `
            <ul>
                <li>Batas pesanan untuk pengantaran besok (H+1) adalah pukul 15.00 WIB.</li>
                <li>Pesanan yang masuk setelahnya akan dijadwalkan untuk hari berikutnya (H+2).</li>
            </ul>
        `;
        deliveryDateInput.removeAttribute('disabled');
        dateHelper.innerHTML = originalDateHelperContent;

        // Reset datepicker to default minDate and selected date
        const now = new Date();
        const wibHour = (now.getUTCHours() + 7) % 24;
        const minDateOffset = wibHour >= 15 ? 2 : 1;
        const defaultDate = new Date();
        defaultDate.setDate(defaultDate.getDate() + minDateOffset);
        $(deliveryDateInput).datepicker("option", "minDate", minDateOffset);
        $(deliveryDateInput).datepicker("setDate", defaultDate);
        
        // Clean up special order flag if it exists
        sessionStorage.removeItem('specialEditionDirectOrder');
    }
};

const generateWhatsAppLink = () => {
    const customerName = document.getElementById('customer-name').value.trim();
    const customerAddress = document.getElementById('customer-address').value.trim();
    const deliveryDate = $("#delivery-date").datepicker("getDate");

    if (!customerName || !customerAddress || !deliveryDate) {
        alert("Mohon lengkapi semua data: nama, alamat, dan tanggal pengantaran.");
        return;
    }

    let cart; // Use 'let' for the cart variable
    const specialProductId = sessionStorage.getItem('specialEditionDirectOrder');

    if (specialProductId !== null) {
        // --- Special edition direct order flow ---
        const product = products.find(p => p.id === parseInt(specialProductId));
        
        if (!product) { // Explicitly check if product is found
             alert("Terjadi kesalahan: Produk spesial tidak ditemukan. Silakan coba lagi.");
             closeModal(); // Clean up state
             return;
        }

        const quantity = parseInt(document.getElementById('product-quantity').value);

        if (isNaN(quantity) || quantity <= 0) {
            alert("Jumlah pesanan tidak valid.");
            return;
        }
        
        // Create a temporary cart for message generation
        cart = [{ ...product, quantity: quantity }];

    } else {
        // --- Regular cart flow ---
        cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    }

    if (cart.length === 0) {
        // This case should not be reached in a special order, but good for safety
        alert("Keranjang Anda kosong!");
        closeModal();
        return;
    }

    let message = "Halo Kitee Eat, saya mau pesan:\n\n";
    let total = 0;

    cart.forEach(item => {
        const itemTotal = typeof item.price === 'number' ? item.price * item.quantity : 0;
        message += `- *${item.name}* (${item.quantity}x) - ${formatPrice(item.price * item.quantity)}\n`;
        total += itemTotal;
    });

    message += `\n*Total Pesanan: ${formatPrice(total)}*`;
    message += `\n_Harga belum termasuk ongkir._\n\n`;
    message += `*Data Pemesan:*
`;
    message += `👤 Nama: ${customerName}\n`;
    message += `📍 Alamat: ${customerAddress}\n`;
    message += `📅 Tgl. Antar: ${deliveryDate.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`;
    
    const encodedMessage = encodeURIComponent(message);
    const waLink = `https://wa.me/6281293500570?text=${encodedMessage}`;
    
    window.open(waLink, '_blank');
    
    // --- Cart cleanup ---
    if (specialProductId === null) {
        // Only clear the main cart if it was a regular order from the cart
        sessionStorage.removeItem('cart');
    }
    
    closeModal(); // Close the modal and reset its state (this will also remove the specialProductId flag)
    
    document.getElementById('order-form').reset();
    
    // Explicitly re-render and minimize cart to reflect the final state
    renderCart(); 
    minimizeCart(); 
};

// Fungsi untuk minimalkan cart
const minimizeCart = () => {
    const cartContainer = document.getElementById('cart-container');
    const cartIcon = document.getElementById('cart-icon');
    cartContainer.style.display = 'none';
    if (JSON.parse(sessionStorage.getItem('cart'))?.length > 0) {
        cartIcon.style.display = 'flex';
    } else {
        cartIcon.style.display = 'none';
    }
};

// Event Listener untuk Ikon Cart (untuk membuka cart)
document.getElementById('cart-icon').addEventListener('click', () => {
    const cartContainer = document.getElementById('cart-container');
    const cartIcon = document.getElementById('cart-icon');
    if (JSON.parse(sessionStorage.getItem('cart'))?.length > 0) {
        cartContainer.style.display = 'block';
        cartIcon.style.display = 'none';
    }
});

// Sembunyikan cart jika klik di luar, kecuali pada tombol tambah ke cart atau minimize button
document.addEventListener('click', function(event) {
    const cartContainer = document.getElementById('cart-container');
    const cartIcon = document.getElementById('cart-icon');
    const isClickInsideCart = cartContainer.contains(event.target);
    const isClickOnCartIcon = cartIcon.contains(event.target);
    const isClickOnAddToCartButton = event.target.matches('button[onclick^="addToCart"]');
    const isClickOnMinimizeButton = event.target.matches('button[onclick="minimizeCart()"]');
    const isClickOnQuantityButton = event.target.matches('button[onclick^="updateQuantity"]'); // Check for quantity buttons

    // Jika cart terlihat dan kliknya di luar cart, bukan di ikon cart, bukan di tombol 'add to cart', bukan di tombol minimize, dan bukan di tombol kuantitas
    if (
        window.getComputedStyle(cartContainer).display === 'block' &&
        !isClickInsideCart &&
        !isClickOnCartIcon &&
        !isClickOnAddToCartButton &&
        !isClickOnMinimizeButton &&
        !isClickOnQuantityButton // Exclude quantity buttons
    ) {
            minimizeCart();
    }
});

// Global event listener for closing modals using data-target attribute
document.addEventListener('click', (event) => {
    const target = event.target;
    // Check if the clicked element or its parent has a data-target attribute
    const dataTargetElement = target.closest('[data-target]');
    if (dataTargetElement) {
        const dataTarget = dataTargetElement.getAttribute('data-target');
        // Jangan tutup info-popup-modal via data-target
        if (dataTarget === 'info-popup-modal') return;
        // Ensure the data-target corresponds to an actual dialog element
        if (document.getElementById(dataTarget)?.tagName === 'DIALOG') {
            closeModal(dataTarget);
        }
    }
});