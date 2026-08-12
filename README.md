# Style Template - Parçalanmış Yapı

Bu proje, tek parça (monolithic) `index.html` dosyasının **component mantığıyla
bölünmüş** halidir. Amaç: kodun okunabilirliğini artırmak, bakımı kolaylaştırmak
ve her bölümü bağımsız olarak düzenleyebilmek.

## Klasör Yapısı

```
proje/
├── index.html              → Sadece iskelet: <head> + boş placeholder div'ler
├── partials/                → Her section kendi dosyasında
│   ├── header.html          → Navbar
│   ├── hero.html            → Ana giriş (hero) bölümü
│   ├── about.html           → Hakkımda
│   ├── skills.html          → Yetenekler
│   ├── resume.html          → Özgeçmiş / deneyim
│   ├── portfolio.html       → Portfolyo galerisi
│   ├── faq.html              → Sıkça sorulan sorular
│   └── contact.html          → İletişim formu
├── js/
│   └── include.js            → Parçaları birleştiren ve script'leri sıraya
│                                dizen script
└── assets/                   → (mevcut proje klasöründen değişmeden kalıyor:
                                  css, vendor kütüphaneleri, görseller)
```

## Nasıl Çalıştırılır?
Bir local server üzerinden açılması gerekir:

- VS Code kullanıyorsan **Live Server** eklentisiyle "Open with Live Server"
- Ya da terminalden proje klasöründe: `python -m http.server` sonra
  `http://localhost:8000` adresine gidilir.
