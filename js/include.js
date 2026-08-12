/**
 * include.js
 * -----------------------------------------------------------------
 * Bu script index.html'deki boş <div id="include-xxx"> kutucuklarını
 * partials/ klasöründeki ilgili HTML parçalarıyla dolduruyor.
 *
 * ÖNEMLİ: Sayfadaki AOS, GLightbox, typed.js, isotope gibi eklentiler
 * DOM üzerinde çalışıyor. Parçalar sayfaya SONRADAN (asenkron) ekleniyor,
 * o yüzden vendor + main.js dosyalarını parçalar tamamen yüklenmeden
 * ÇALIŞTIRMIYORUZ. Önce tüm parçalar yerine oturuyor, ardından script'ler
 * sırayla (birbirini bekleyerek) devreye giriyor.
 * -----------------------------------------------------------------
 */

// Her placeholder id'sinin hangi partial dosyasından besleneceği
const partials = {
    "include-header": "partials/header.html",
    "include-hero": "partials/hero.html",
    "include-about": "partials/about.html",
    "include-skills": "partials/skills.html",
    "include-resume": "partials/resume.html",
    "include-services": "partials/services.html",
    "include-portfolio": "partials/portfolio.html",
    "include-testimonials": "partials/testimonials.html",
    "include-faq": "partials/faq.html",
    "include-contact": "partials/contact.html",
    "include-footer": "partials/footer.html",
};

// Sayfa yüklendiğinde çalışması gereken vendor + main JS dosyaları
// (orijinal index.html'deki sıra korunuyor, sıra önemli!)
const scripts = [
    "assets/vendor/bootstrap/js/bootstrap.bundle.min.js",
    "assets/vendor/php-email-form/validate.js",
    "assets/vendor/aos/aos.js",
    "assets/vendor/purecounter/purecounter_vanilla.js",
    "assets/vendor/typed.js/typed.umd.js",
    "assets/vendor/waypoints/noframework.waypoints.js",
    "assets/vendor/glightbox/js/glightbox.min.js",
    "assets/vendor/imagesloaded/imagesloaded.pkgd.min.js",
    "assets/vendor/isotope-layout/isotope.pkgd.min.js",
    "assets/vendor/swiper/swiper-bundle.min.js",
    "assets/js/main.js",
];

// Tek bir parçayı çekip ilgili div'in içine basan fonksiyon
async function loadPartial(id, path) {
    const el = document.getElementById(id);
    if (!el) return;

    try {
        const res = await fetch(path);
        if (!res.ok) throw new Error(`${path} yüklenemedi (${res.status})`);
        const html = await res.text();
        el.outerHTML = html; // placeholder div'i, gelen içerikle değiştiriyoruz
    } catch (err) {
        console.error("Partial yüklenirken hata:", err);
        el.innerHTML = `<p style="color:red">Yüklenemedi: ${path}</p>`;
    }
}

// Script dosyalarını SIRAYLA (biri bitmeden diğeri başlamadan) yükleyen fonksiyon
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = resolve;
        script.onerror = () => reject(new Error(`${src} yüklenemedi`));
        document.body.appendChild(script);
    });
}

async function init() {
    // 1) Tüm parçaları AYNI ANDA çek (hız için), hepsi bitene kadar bekle
    await Promise.all(
        Object.entries(partials).map(([id, path]) => loadPartial(id, path))
    );

    // 2) Parçalar DOM'a tamamen oturduktan SONRA script'leri sırayla yükle
    for (const src of scripts) {
        try {
            await loadScript(src);
        } catch (err) {
            console.error(err);
        }
    }

    // main.js kendi içinde genelde DOMContentLoaded ve/veya load event'ini
    // bekliyor, ama sayfa o event'leri parçalar eklenmeden ÖNCE zaten
    // geçirmiş oluyor. Script'ler DOM'a yeni eklendiğinde, içindeki
    // "sayfa hazır olunca çalış" mantığı bir daha asla tetiklenmez.
    // Bu yüzden ikisini de manuel olarak yapay şekilde tetikliyoruz ki
    // GLightbox, Isotope, PureCounter gibi eklentiler gerçekten başlasın.
    document.dispatchEvent(new Event("DOMContentLoaded", { bubbles: true, cancelable: true }));
    window.dispatchEvent(new Event("load"));
}

init();