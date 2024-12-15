async function shortenUrl() {
    const input = document.getElementById('originalUrl');
    const resultBox = document.getElementById('resultContainer');
    const shortLinkSpan = document.getElementById('shortLink');
    const btn = document.getElementById('shortenBtn');
    const originalBtnText = btn.innerHTML;

    const url = input.value.trim();

    if (!url) {
        alert("Lütfen geçerli bir link yapıştırın!");
        return;
    }

    // Buton animasyonu
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> İşleniyor...';
    btn.disabled = true;

    try {
        const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
        
        if (response.ok) {
            const shortUrl = await response.text();
            
            // Linki link yapısında göster
            shortLinkSpan.innerHTML = `<a href="${shortUrl}" target="_blank">${shortUrl}</a>`;
            
            resultBox.style.display = "block";
            resultBox.style.animation = "fadeIn 0.5s ease"; // Basit giriş efekti
        } else {
            alert("Hata oluştu! Linki kontrol edin.");
        }
    } catch (error) {
        console.error(error);
        alert("Sunucuya bağlanılamadı.");
    } finally {
        btn.innerHTML = originalBtnText;
        btn.disabled = false;
    }
}

function copyToClipboard() {
    const linkText = document.querySelector('#shortLink a').href;
    navigator.clipboard.writeText(linkText).then(() => {
        const copyBtn = document.querySelector('.copy-btn');
        const originalIcon = copyBtn.innerHTML;
        
        copyBtn.innerHTML = '<i class="fa-solid fa-check" style="color: #00f2fe;"></i>';
        setTimeout(() => {
            copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i>';
        }, 2000);
    });
}
