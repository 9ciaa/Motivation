document.addEventListener('DOMContentLoaded', function() {
    const motivationBtn = document.getElementById('motivation-btn');
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    const loading = document.getElementById('loading');
    let quoteFetchCount = 0;
    let clickCount = 0;
    const maxFreeQuotes = 3;
    async function fetchMotivationalQuote() {
        try {
            motivationBtn.style.opacity = '0.5';
            loading.classList.remove('hidden');
            motivationBtn.disabled = true;
            motivationBtn.textContent = 'Finding motivation...';
            const response = await fetch('https://api.quotable.io/random');
            if (!response.ok) {
                throw new Error('Failed to fetch quote');
            }
            const data = await response.json();
            setTimeout(() => {
                quoteText.textContent = `"${data.content}"`;
                quoteAuthor.textContent = `— ${data.author}`;
                loading.classList.add('hidden');
                motivationBtn.disabled = false;
                motivationBtn.textContent = 'Find your motivation!';
                motivationBtn.style.opacity = '1';
                quoteFetchCount++;
                if (quoteFetchCount >= maxFreeQuotes) {
                    setTimeout(() => {
                        motivationBtn.classList.add('upgrading');
                        setTimeout(() => {
                            motivationBtn.textContent = 'Upgrade to Pro for more efficient quotes!';
                            motivationBtn.disabled = true;
                        }, 200);
                    }, 5000);
                }
            }, 500);
        } catch (error) {
            console.error('Error fetching quote:', error);
        }
    }
    motivationBtn.addEventListener('click', function() {
        if (motivationBtn.disabled) return;
        clickCount++;
        if (clickCount == 3) {
            motivationBtn.classList.add('upgrading');
            setTimeout(() => {
                motivationBtn.textContent = 'Upgrade to Pro for more efficient quotes!';
                motivationBtn.disabled = true;
            }, 200);
            return;
        }
        fetchMotivationalQuote();
    });
});
