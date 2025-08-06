const themeToggle = document.getElementById('theme-toggle');
const icon = themeToggle.querySelector('i');
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-theme');
    icon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');

    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

function copyToClipboard(text, type) {
    const card = event.currentTarget;
    const actualText = card.dataset.copyValue || text;

    navigator.clipboard.writeText(actualText).then(() => {
        card.classList.add('copied');
        setTimeout(() => card.classList.remove('copied'), 2000);
    }).catch(err => {
        console.error('Copy failed:', err);
        alert(`Failed to copy ${type}. Please try again.`);
    });
}