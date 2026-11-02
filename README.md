# Expense Tracker API

REST API sederhana untuk mengelola data pengeluaran, dibuat menggunakan Node.js, TypeScript, dan Express.

## Persyaratan

- Node.js dan npm

## Menjalankan aplikasi

```bash
npm install
npm run dev
```

Server berjalan di `http://localhost:5000`.

Data pengeluaran saat ini disimpan di memori. Perubahan data akan hilang saat server dimulai ulang.

## Endpoint

Semua endpoint pengeluaran menggunakan prefix `/api/v1/posts`.

| Method | Endpoint | Keterangan |
| --- | --- | --- |
| `GET` | `/` | Memeriksa server |
| `GET` | `/api/v1/posts` | Mendapatkan semua pengeluaran |
| `GET` | `/api/v1/posts/summary` | Mendapatkan ringkasan pengeluaran |
| `GET` | `/api/v1/posts/:id` | Mendapatkan pengeluaran berdasarkan ID |
| `POST` | `/api/v1/posts` | Menambahkan pengeluaran |
| `PUT` | `/api/v1/posts/:id` | Memperbarui pengeluaran |
| `DELETE` | `/api/v1/posts/:id` | Menghapus pengeluaran |

### Contoh request

`POST /api/v1/posts` dengan header `Content-Type: application/json`:

```json
{
  "title": "Makan siang",
  "description": "Makan siang di kantin",
  "amount": 25000,
  "category": "Food",
  "status": "completed",
  "date": "2026-11-01"
}
```

`title`, `description`, `amount`, dan `category` wajib diisi. `status` dapat berupa `pending` atau `completed` dan default-nya `pending`. `date` menggunakan format `YYYY-MM-DD` dan default-nya tanggal hari ini.

Pada request `PUT`, kirim hanya properti yang ingin diperbarui. `amount` harus berupa angka lebih dari 0.
