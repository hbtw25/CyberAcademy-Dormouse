
---

### **Slide 1: Pembuka**
**Product Showcase & Group Management**  
_Tugas Modul 3 Web Development_  
Presenter: [Nama Anda]  
Tanggal: [Tanggal Presentasi]

---


---

### **Slide 2: Teknologi yang Digunakan**

**Frontend**:
- **HTML5**: Struktur dasar halaman web.
- **CSS3**: Styling dan tata letak halaman menggunakan teknik responsif.
- **JavaScript**: Untuk interaktivitas dan pemanggilan API.
- **Bootstrap 5**: Framework CSS untuk desain responsif dan komponen UI.
  
**Backend**:
- **Node.js**: JavaScript runtime untuk menjalankan server.
- **Express.js**: Framework minimalis untuk membangun API di Node.js.
- **CORS (Cross-Origin Resource Sharing)**: Untuk mengatasi masalah lintas domain antara frontend dan backend.


---

Gambar: Untuk memperjelas, Anda dapat menambahkan ikon atau logo dari teknologi-teknologi tersebut di slide, seperti logo **Node.js**, **Express**, **JavaScript**, dan **Bootstrap**.



---

### **Slide 3: Struktur Folder Proyek**
**Struktur Folder Proyek**
```
project/
├── frontend/               # Folder untuk file frontend
│   ├── index.html          # Halaman utama frontend
│   ├── script.js           # Logika aplikasi frontend
│   └── style.css           # Styling tambahan untuk frontend
└── backend/                # Folder untuk file backend
    └── index.js            # Server backend menggunakan Node.js
```

Gambar: Screenshot struktur folder proyek dari file explorer.

---

### **Slide 4: Fitur Frontend - Product Showcase**
**Fitur Frontend - Product Showcase**
- Memuat daftar produk dari API eksternal (dummyjson.com).
- Menampilkan gambar, nama, merek, deskripsi, dan harga produk.

Gambar: Potongan kode frontend untuk memuat produk.
```javascript
// Fetch Produk API
const loadProducts = async () => {
  const response = await fetch(API_URL_PRODUCTS);
  const data = await response.json();
  const products = data.products.slice(0, 10); // Batasi 10 produk
  productList.innerHTML = products
    .map((product) => `
      <div class="col-lg-3 col-md-4 col-sm-6">
        <div class="card shadow-sm h-100">
          <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${product.title}</h5>
            <p class="text-muted mb-2">${product.brand}</p>
            <p class="card-text small">${product.description.slice(0, 50)}...</p>
            <p class="fw-bold text-primary">$${product.price}</p>
            <button class="btn btn-sm btn-outline-primary mt-auto">Buy Now</button>
          </div>
        </div>
      </div>`).join("");
};
```

---

### **Slide 5: Fitur Frontend - Group Management**
**Fitur Frontend - Group Management**
- **Form Create Group**: Pengguna bisa membuat grup baru dengan memasukkan nama grup.
- **Kelola Anggota Grup**: Menambah, mengedit, dan menghapus anggota grup.

Gambar: Potongan kode untuk membuat grup baru.
```javascript
createGroupForm.onsubmit = async (e) => {
  e.preventDefault();
  const groupName = groupNameInput.value;
  if (!groupName) return;

  await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ group_name: groupName }),
  });

  groupNameInput.value = "";
  fetchGroups();
};
```

---

### **Slide 6: Fitur Backend - API - Get Groups**
**Fitur Backend - API - Get Groups**
- **GET /groups**: Menampilkan semua grup yang ada di server.

Gambar: Potongan kode backend untuk endpoint `GET /groups`.
```javascript
// Get all groups
app.get("/groups", (req, res) => {
  res.json(groups); // Tampilkan seluruh grup
});
```

---

### **Slide 7: Fitur Backend - API - Create Group**
**Fitur Backend - API - Create Group**
- **POST /groups**: Membuat grup baru atau menambah anggota grup.

Gambar: Potongan kode backend untuk endpoint `POST /groups`.
```javascript
// Add a new group or add members to an existing group
app.post("/groups", (req, res) => {
  const { group_name, student1, student2, student3, student4 } = req.body;
  if (!group_name) {
    return res.status(400).json({ error: "Group name is required" });
  }

  const group = groups.find((g) => g.group_name === group_name);
  if (group) {
    if (student1) group.student1 = student1;
    if (student2) group.student2 = student2;
    if (student3) group.student3 = student3;
    if (student4) group.student4 = student4;
    return res.status(200).json(group);
  }

  const newGroup = { group_name, student1, student2, student3, student4 };
  groups.push(newGroup);
  res.status(201).json(newGroup);
});
```

---

### **Slide 8: Fitur Backend - API - Delete Group**
**Fitur Backend - API - Delete Group**
- **DELETE /groups/:group_name**: Menghapus grup berdasarkan nama grup.

Gambar: Potongan kode backend untuk endpoint `DELETE /groups`.
```javascript
// Delete a group by name
app.delete("/groups/:group_name", (req, res) => {
  const groupName = req.params.group_name;
  const groupIndex = groups.findIndex((g) => g.group_name === groupName);

  if (groupIndex === -1) {
    return res.status(404).json({ error: "Group not found" });
  }

  groups.splice(groupIndex, 1);

  res.status(200).json({
    message: `The Group "${groupName}" has been deleted successfully.`,
  });
});
```

---

### **Slide 9: Pengujian dan Demo**
**Pengujian dan Demo**
- **Frontend**: Akses di browser untuk melihat dan mengelola produk serta grup.
- **Backend**: Jalankan server dengan perintah `node index.js` dan uji API menggunakan **POSTMAN** atau browser.
- **Demo Fitur**: Tunjukkan demo cara menambah grup, mengelola anggota, dan melihat produk.

Gambar: Screenshot pengujian menggunakan **POSTMAN** untuk endpoint API seperti `GET /groups` atau `POST /groups`.

---

### **Slide 10: Penutup**
**Penutup**
- Terima kasih atas perhatian Anda!
- Pertanyaan?

---


### ** tambahan **



---

### **Slide : Fitur Backend - API - CRUD Operations**

**Fitur Backend - API - CRUD Operations**
- **Create Group (POST)**: Menambahkan grup baru.
- **Update Group (PUT)**: Memperbarui grup berdasarkan nama grup.
- **Delete Group (DELETE)**: Menghapus grup berdasarkan nama grup.

---

#### **Create Group - POST**
```javascript
// Create a new group
app.post("/groups", (req, res) => {
  const { group_name, student1, student2, student3, student4 } = req.body;

  const newGroup = { group_name, student1, student2, student3, student4 };
  groups.push(newGroup);

  res.status(201).json(newGroup);
});
```

#### **Update Group - PUT**
```javascript
// Update a group by name
app.put("/groups/:group_name", (req, res) => {
  const groupName = req.params.group_name;
  const { group_name, student1, student2, student3, student4 } = req.body;

  const group = groups.find((g) => g.group_name === groupName);
  if (!group) return res.status(404).json({ error: "Group not found" });

  if (group_name) group.group_name = group_name;
  if (student1) group.student1 = student1;
  if (student2) group.student2 = student2;
  if (student3) group.student3 = student3;
  if (student4) group.student4 = student4;

  res.json(group);
});
```

#### **Delete Group - DELETE**
```javascript
// Delete a group by name
app.delete("/groups/:group_name", (req, res) => {
  const groupName = req.params.group_name;
  const groupIndex = groups.findIndex((g) => g.group_name === groupName);

  if (groupIndex === -1) {
    return res.status(404).json({ error: "Group not found" });
  }

  groups.splice(groupIndex, 1);

  res.status(200).json({
    message: `The Group "${groupName}" has been deleted successfully.`,
  });
});
```

---

\