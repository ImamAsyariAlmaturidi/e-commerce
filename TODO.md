# P3-Challenge-2 (Next.js Project)

## W2D1

### Setup Project: Tema Aplikasi

Silahkan setup project aplikasi kamu:

- [ ] Pilih tema sesuai kesepakatan bersama  instructor, tuliskan dalam README github kamu
- [ ] Membuat layout aplikasi sesuai tema yang dipilih
- [ ] Membuat initial data/seeder sesuai struktur data yang ditentukan (Kalian bisa check `db.json` sebagai referensi atau bisa digunakan sebagai data awal)
  - [ ] Halaman auth
    - [ ] Register
    - [ ] Login
  - [ ] Halaman home
    - [ ] Komponen Banner
    - [ ] Komponen Detail info Ecommerce
    - [ ] Komponen Featured Product (50-10 product) + “see-all”
  - [ ] Halaman product
    - [ ] Komponen List Product
    - [ ] Komponen Search
    - [ ] Komponen Pagination
    - [ ] Komponen Add to wishlist
  - [ ] Halaman detail product
    - [ ] Komponen Add to wishlist
  - [ ] Halaman Wishlist
    - [ ] Komponen list Wishlist (bisa menggunakan card yang sama dengan halaman list product)
    - [ ] Komponen Remove Wishlist

## W2D2

### NEXT.js Intro

- [ ] Setup NEXT.js project yang menggunakan typescript
- [ ] Convert halaman-halaman dan komponen-komponen yang dibuat sebelumnya menjadi  pages dan components pada NEXT.js:
  - [ ] Halaman register: /register
  - [ ] Halaman login: /login
  - [ ] Halaman home: /
    - [ ] Komponen Banner
    - [ ] Komponen Detail info Ecommerce
    - [ ] Komponen Featured Product (5-10 product) + “see-all”
  - [ ] Halaman product: /products
    - [ ] Komponen List Product
    - [ ] Komponen Search
    - [ ] Komponent Pagination
    - [ ] Komponen Add to wishlist
  - [ ] Halaman detail product: /products/:slug
    - [ ] Komponen Add to wishlist
  - [ ] Halaman wishlist: /wishlist
    - [ ] Komponen List Wishlist (bisa menggunakan card yang sama dengan halaman list product)
    - [ ] Komponen Remove Wishlist

> Catatan: Kamu bisa menambahkan halaman sesuai kebutuhan aplikasi kamu

### NEXT.js CSR & SSR

Implementasikan CSR dan SSR pada pada halaman-halaman dan komponen-komponen yang sudah dibuat dengan detail sebagai berikut:

- [ ] Halaman register: /register
- [ ] Halaman login: /login
- [ ] Halaman home: / (SSR)
- [ ] Halaman product: /products (CSR)
  - [ ] Komponen List Product (CSR)
  - [ ] Komponen Search (CSR)
  - [ ] Komponen Pagination (CSR)
  - [ ] Komponen Add to Wishlist (CSR)
- [ ] Halaman detail product: /products/:slug (SSR)
  - [ ] Komponen Add to Wishlist (CSR)
- [ ] Halaman wishlist: /wishlist
  - [ ] Komponen List Wishlist (CSR)
  - [ ] Komponen Remove Wishlist (CSR)

> Catatan: Disini belum perlu melakukan fetching atau request data

## W2D3

### NEXT.js Route Handler

- [ ] Install MongoDB database pada komputer kamu atau menggunakan MongoDB Atlas
- [ ] Lakukan wiring dan validasi terhadap halaman-halaman dan komponen-komponen yang sudah dibuat.
  - [ ] Halaman register: /register
    - [ ] username:string (validation: required, unique)
    - [ ] email:string  (validation: required, unique, email format)
    - [ ] password:string  (validation: required, length min 5)
  - [ ] Halaman login: /login
    - [ ] email:string  (validation: required, email format)
    - [ ] password:string  (validation: required)
  - [ ] Halaman home: / (SSR)
    - [ ] Halaman product: /products
    - [ ] Fitur List Product
    - [ ] Fitur Search
    - [ ] Fitur Pagination
    - [ ] Untuk menerapakan infinite scroll salah satu package yang bisa digunakan: react-infinite-scroll
  - [ ] Fitur Add to Wishlist
    - [ ] userId: ObjectId  (validation: required)
    - [ ] productId: ObjectId  (validation: required)
  - [ ] Halaman detail product: /products/:slug
    - [ ] Fitur Add to Wishlist
      - [ ] userId: ObjectId  (validation: required)
      - [ ] productId: ObjectId  (validation: required)
  - [ ] Halaman Wishlist
    - [ ] Fitur List Wishlist
    - [ ] Fitur Remove to Wishlist
      - [ ] userId: ObjectId  (validation: required)
      - [ ] productId: ObjectId  (validation: required)

### NEXT.js Auth

Implementasikan autentikasi pada aplikasi NEXT.js yang sudah dibuat dengan detail sebagai berikut:

- [ ] Hanya user yang sudah login yang bisa menambahkan wishlist produk
- [ ] Hanya user yang sudah login yang bisa menghapus wishlist produk

## W2D4

### Deploy Project

Lakukan deployment pada project ini agar aplikasi bisa dilihat oleh user lain

- [ ] Deploy client

## Day 5 - 6

### Buddy Session

- [ ] Silahkan cek tugas/aplikasi yang kamu buat ke instruktur/buddy untuk memastikan aplikasi yang dibuat sudah sesuai requirement.
