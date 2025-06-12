# Laporan Update Front End

## Memperbarui Login Page
- Mengupdate fungsi handleLogin untuk mengambil data input email dan password dari form menggunakan FormData
- Mengupdate fungsi handleLogin untuk mengirim permintaan POST ke endpoint backend http://localhost:8000/login menggunakan fetch
- Mengupdate fungsi handleLogin untuk mengatur credentials: "include" agar cookies (seperti session ID) bisa dikirim untuk autentikasi
- Mengupdate fungsi handleLogin untuk menangani response dari server, jika response.ok && result.success → navigasi ke halaman dashboard dan jika tidak akan menampilkan pesan error menggunakan alert

## Memperbarui Register Page
- Mengimplementasikan fungsi handleRegister untuk mengambil data input dari form: nama, usia, email, dan password menggunakan objek FormData
- Menambahkan pengiriman data menggunakan metode POST ke endpoint backend http://localhost:8000/register dengan opsi credentials: "include" agar cookie/session dapat tersimpan jika diperlukan
- Menambahkan pengecekan response.ok untuk mengarahkan pengguna ke halaman login (/login) jika proses register berhasil
- Menambahkan fallback handler untuk menangani response error dari server

## Memperbarui Dashboard Page
- Memperbarui fungsi fetchUserData agar dapat mengambil data profile dari backend profile sehingga jika user ingin mengubah profile, data perubahannya akan otomatis tersimpan pada database

## Memperbarui CekGulaDarah Page
- Memperbarui state form menggunakan useState untuk menyimpan data input pengguna bmi, age, glucose_level, family_history, smoker, physical_activity, dan gender
- Menambahkan fungsi handleChange agar input dari form langsung memperbarui state formData
- Mengupdate handleSubmit untuk mencegah default form submission, mengirim permintaan POST ke endpoint http://localhost:8000/predict, format data dikirim dalam bentuk JSON, dengan headers: 'Content-Type': 'application/json', hasil prediksi dari backend disimpan di state result menggunakan setResult
- Menambahkan fitur menampilkan hasil prediksi
- Melengkapi form input agar semua field memiliki atribut name yang sesuai dan onChange yang terhubung ke handleChange
