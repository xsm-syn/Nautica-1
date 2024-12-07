# Welcome to Nautica

Sebuah repository serverless tunnel studi kasus Indonesia

# Fitur

- [x] Otomatis split protocol VLESS dan Trojan
- [x] Reverse proxy
- [x] Cache daftar proxy
- [x] Support TCP/UDP (UDP hanya untuk resolve DNS)
- [ ] Support HU (HTTP Upgrade)
- [x] Lebih efisien (Partial) (I hate Javascript btw, jadi males buat benerin)

Kode ini masih perlu banyak perbaikan, jadi silahkan berkontribusi dan berikan PR kalian!

# Cara Deploy

1. Buat akun cloudflare
2. Buat worker
3. Masukkan link daftar proxy kalian ke dalam environemnt variable `PROXY_BANK_URL`
4. (Optional) Masukkan link target reverse proxy ke environment variable `REVERSE_PROXY_TARGET`
5. Deploy
6. Buka `https://DOMAIN_WORKER_KALIAN/sub`

# Endpoint

- `/` -> Halaman utama reverse proxy
- `/sub` -> Halaman sub/list akun

# Footnote

- Hal aneh dan anomali lain yang saya lakukan [FoolVPN]("t.me/foolvpn")
- Contact Person [Telegram]("t.me/d_fordlalatina")
