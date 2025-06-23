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
            // Fade out the button when clicked
            motivationBtn.style.opacity = '0.5';
            // Show loading spinner
            loading.classList.remove('hidden');
            motivationBtn.disabled = true;
            motivationBtn.textContent = 'Finding motivation...';
            const response = await fetch('https://api.quotable.io/random');
            if (!response.ok) {
                throw new Error('Failed to fetch quote');
            }
            const data = await response.json();
            // Add a small delay for better UX
            setTimeout(() => {
                quoteText.textContent = `"${data.content}"`;
                quoteAuthor.textContent = `— ${data.author}`;
                // Hide loading and reset button
                loading.classList.add('hidden');
                motivationBtn.disabled = false;
                motivationBtn.textContent = 'Find your motivation!';
                motivationBtn.style.opacity = '1';
                // Increment quote count and check if we should show upgrade message
                quoteFetchCount++;
                if (quoteFetchCount >= maxFreeQuotes) {
                    setTimeout(() => {
                        // Trigger the upgrade button animation and text change after 5 seconds
                        motivationBtn.classList.add('upgrading');
                        // Small delay to let the animation start
                        setTimeout(() => {
                            motivationBtn.textContent = 'Upgrade to Pro for more quotes!';
                            motivationBtn.disabled = true;
                            motivationBtn.style.cursor = 'default';
                        }, 200);
                    }, 5000);
                }
            }, 500);
        } catch (error) {
            console.error('Error fetching quote:', error);
            // Array of fallback quotes logic continues here...
        }
    }
    // Add click event listener
    motivationBtn.addEventListener('click', function() {
        // Skip if button is already disabled
        if (motivationBtn.disabled) return;
        
        clickCount++;
        
        // Check if this is the second consecutive click (double tap)
        if (clickCount === 2) {
            // Double tap detected - show upgrade instantly
            motivationBtn.classList.add('upgrading');
            
            // Small delay to let the animation start
            setTimeout(() => {
                motivationBtn.textContent = 'Upgrade to Pro for more quotes!';
                motivationBtn.disabled = true;
                motivationBtn.style.cursor = 'default';
            }, 200);
            return;
        }
        
        // Normal single click - proceed with quote fetching
        fetchMotivationalQuote();
    });
});
