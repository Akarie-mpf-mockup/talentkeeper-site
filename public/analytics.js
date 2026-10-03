/* Shared by the landing page and generated articles. Local previews never send data. */
(() => {
  if (!['www.talentkeeper.jp', 'talentkeeper.jp'].includes(window.location.hostname)) return;
  if (window.gtag) return;

  const measurementId = 'G-WW6DQN57R7';
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', measurementId);

  const tag = document.createElement('script');
  tag.async = true;
  tag.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(tag);

  document.addEventListener('click', event => {
    const link = event.target.closest?.('a[href]');
    if (!link) return;
    const target = new URL(link.href, window.location.href);
    if (target.origin !== window.location.origin || target.pathname !== '/') return;
    if (!['#contact', '#consultation'].includes(target.hash)) return;
    window.gtag('event', 'cta_click', {
      cta_location: link.closest('section')?.id || (link.closest('nav, header') ? 'navigation' : link.closest('footer') ? 'footer' : 'article'),
      request_type: target.hash === '#consultation' ? 'consultation' : 'contact',
    });
  });
})();
