// ساده: تغییر تم بین 'light' و 'dark'، ذخیره در localStorage، و احترام به prefers-color-scheme
(function(){
  const key = 'preferred-theme';
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');

  function applyTheme(theme){
    if(theme === 'dark') {
      root.setAttribute('data-theme','dark');
      btn.setAttribute('aria-pressed','true');
      icon.textContent = '☀️';
    } else {
      root.removeAttribute('data-theme');
      btn.setAttribute('aria-pressed','false');
      icon.textContent = '🌙';
    }
  }

  function getInitialTheme(){
    const stored = localStorage.getItem(key);
    if(stored === 'dark' || stored === 'light') return stored;
    // در صورت نبودن تنظیم، به preference سیستم احترام بگذار
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  // مقدار اولیه
  let theme = getInitialTheme();
  applyTheme(theme);

  btn.addEventListener('click', () => {
    theme = (theme === 'dark') ? 'light' : 'dark';
    localStorage.setItem(key, theme);
    applyTheme(theme);
  });
})();