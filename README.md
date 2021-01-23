# payment

> Payment merupakan aplikasi web yang dibangun menggunakan framework Vue.js. Terdapat tiga tahapan dalam alur aplikasi ini.
Tahapan alur aplikasi:
1. Pengisian form Delivery details
	Pada tahap ini user harus mengisi email, phone number, dan address. Apabila pengiriman dikirim sebagai dropshipper maka user harus mengisi nama dan dropshipper phone number. Apabila terdapat kesalahan ketika pengisian form, maka akan terdapat warning bahwa isian form salah atau form belum diisi. Ketika user ingin melanjutkan ke tahap selanjutnya yaitu Payment tetapi masih terdapat kesalahan pada pengisian form, maka akan muncul popup window bahwa masih terdapat kesalahan pada pengisian form.
	Terdapat bagian Summary, yang menampilkan jumlah barang yang dibeli, harga total barang, biaya dropshipping apabila pengiriman sebagai dropshipper dipilih (sebesar 5900), dan total biaya yang harus dibayar.
2. Pengisian form Payment
	Pada tahap ini user harus memilih Shipment dan Payment. Shipment terdiri dari GO-SEND, JNE, dan Personal Courier. Payment terdiri dari e-wallet, Bank Transfer, dan Virtual Account. Pada bagian Summary, biaya Shipment akan otomatis terupdate dan akan ditampilkan estimasi waktu pengiriman sesuai Shipment berdasarkan Shipment yang dipilih. Teks pada tombol "Pay" untuk melanjutkan ke tahap selanjutnya akan otomatis terupdate sesuai metode Paymen yang dipilih.
3. Menampilkan hasil dari tahap-tahap sebelumnya
	Pada tahap ini akan digenerate Order ID yang berisi alphanumerik sebanyak lima karakter. Pada bagian Summary terdapat tambahan tampilan berupa Payment method yang dipilih pada tahap ke dua.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
