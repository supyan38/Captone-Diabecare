# Laporan Update Back End

## Menambah Middleware
- Menambahkan CORS Middleware agar backend dapat diakses dari frontend React (http://localhost:5173)
- Menambahkan Session Middleware untuk menyimpan sesi login user agar dapat mengakses data secara persist selama sesi aktif

## Mengubah Database
- Mengubah kolom kolom database agar sesuai dengan frontend yaitu kolom id, nama, usia, email dan password
- Perubahan ini bertujuan agar sesuai dengan kebutuhan frontend React yang membutuhkan data nama, usia, dan email user

## Memperbarui post login
- Menyesuaikan query untuk mencocokkan email dan password sesuai struktur database baru
- Menyimpan informasi user (id, nama, usia, email) ke dalam session agar dapat digunakan di halaman dashboard dan profil

## Memperbarui post register
- Mengubah form input menjadi menerima nama, usia, email, dan password
- Menambahkan validasi untuk menangani sqlite3.IntegrityError jika email sudah terdaftar

## Memperbarui post predict
- Normalisasi nilai input: age, bmi, glucose_level
- Memperbarui model yang lebih akurat dari model sebelumnya dan juga menambah inputan model yuitu age, bmi, glucose_level, physical_activity, family_history, smoker, gender
- Mapping data kategorikal seperti gender, family_history, smoker, physical_activity menjadi numerik
- Model yang digunakan adalah file best_model_diabetes_risk.sav, memprediksi langsung probabilitas risiko diabetes

## Membuat rute profile untuk frontend edit profile
- Menambahkan endpoint untuk mengambil data profil user (GET /profile)
- Menambahkan endpoint untuk update data nama dan usia user (POST /profile/update)
