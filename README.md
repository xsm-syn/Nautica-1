# Welcome to Nautica

Sebuah repository serverless tunnel studi kasus Indonesia

# Fitur

- [x] Otomatis split protocol VLESS, Trojan, dan Shadowsocks
- [x] Reverse proxy
- [x] Cache daftar proxy
- [x] Support TCP dan DoH
- [x] Transport Websocket CDN dan SNI
- [x] Pagination
- [x] Tampilan web bagus dan minimalis (Menurut saya)
- [x] Dark mode
- [x] Auto check (ping) akun
- [x] Ambil akun dalam beberapa format (link, clash, sing-box, dll)
- [x] Registrasi wildcard

# Todo (Belum Selesai)

- [x] Lebih efisien (Partial) (I hate Javascript btw, jadi males buat benerin)
- [ ] Menambahkan filter
  - [x] Negara `&cc=ID,SG,...`
  - [ ] VPN `&vpn=vless,trojan,...`
  - [ ] Region `&region=Asia,Europe,...`
  - [ ] Limit `&limit=10`
- [ ] Menambahkan filler
  - [ ] Subdomain/Wildcard `&subdomain=zaintest.vuclip.com`
- [ ] Subscription API
- [ ] Skema URL shadowsocks
- [ ] Tombol `Deploy to workers` untuk instant deployment

Kode ini masih perlu banyak perbaikan, jadi silahkan berkontribusi dan berikan PR kalian!

# Catatan

- Harus UUID v4 Variant 2
- Gunakan security `none`

# Cara Deploy

1. Buat akun cloudflare
2. Buat worker
3. Copy kode dari `worker.js` ke editor cloudflare worker
4. Masukkan link daftar proxy kalian ke dalam environemnt variable `PROXY_BANK_URL`
5. (Optional) Masukkan link target reverse proxy ke environment variable `REVERSE_PROXY_TARGET`
6. Deploy
7. Buka `https://DOMAIN_WORKER_KALIAN/sub`

- Contoh daftar proxy [proxyList.txt](https://raw.githubusercontent.com/dickymuliafiqri/Nautica/refs/heads/main/proxyList.txt)
- Contoh reverse proxy [example.com](https://example.com)

## Cara Aktivasi API

Salah satu fungsi API adalah agar kalian bisa melihat dan menambahkan subdomain wildcards ke workers.

Berikut cara aktivasinya:

1. Masuk ke halaman editor workers yang sudah kalian buat
2. Isi `variable` dari baris ke 4-9 sesuai dengan key yang kalian miliki
3. Deploy

# Endpoint

- `/` -> Halaman utama reverse proxy
- `/sub/:page` -> Halaman sub/list akun

# Footnote

- Hal aneh lain yang saya kerjakan [FoolVPN](https://t.me/foolvpn)
- Tanya-tanya -> [Telegram](https://t.me/d_fordlalatina)
