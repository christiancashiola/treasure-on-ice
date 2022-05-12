export function toggleBodyScroll() {
  const body = document.querySelector('body');
  if (!body) return;

  if (body.style.overflow === 'hidden') {
    return (body.style.overflow = 'auto');
  }

  body.style.overflow = 'hidden';
}
