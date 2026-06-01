// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(reg => console.log('✅ Service Worker registered'))
    .catch(err => console.error('Service Worker registration failed:', err));
}

// Check if app is installed
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
});

export const installApp = () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
  }
};