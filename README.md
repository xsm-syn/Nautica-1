# Welcome to Nautica

Sebuah repository serverless tunnel studi kasus Indonesia

# Fitur

- [x] Otomatis split protocol VLESS dan Trojan
- [x] Reverse proxy
- [x] Cache daftar proxy
- [x] Support TCP/UDP (UDP hanya untuk resolve DNS)

# Todo

- [x] Lebih efisien (Partial) (I hate Javascript btw, jadi males buat benerin)

Kode ini masih perlu banyak perbaikan, jadi silahkan berkontribusi dan berikan PR kalian!

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

# Catatan

- Hanya mendukung UUID v4

# Endpoint

- `/` -> Halaman utama reverse proxy
- `/sub` -> Halaman sub/list akun

# Footnote

- Hal aneh dan anomali lain yang saya lakukan [FoolVPN](https://t.me/foolvpn)
- Contact Person [Telegram](https://t.me/d_fordlalatina)
