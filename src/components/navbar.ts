const navbar = document.querySelector<HTMLElement>('.navbar');
const collapsible = document.getElementById('header-collapsible-navbar');

if (!navbar || !collapsible) throw new Error('Navbar elements not found');

function updateNavAppearance(): void {
  const scrolled = window.scrollY > 100;
  const isLight = scrolled || navbar!.classList.contains('menu-open');
  navbar!.classList.toggle('scrolled', scrolled);
  navbar!.classList.toggle('navbar-dark', !isLight);
  navbar!.classList.toggle('navbar-light', isLight);
}

window.addEventListener('scroll', updateNavAppearance, { passive: true });

collapsible.addEventListener('show.bs.collapse', () => {
  navbar.classList.add('menu-open');
  updateNavAppearance();
});
collapsible.addEventListener('hide.bs.collapse', () => {
  navbar.classList.remove('menu-open');
  updateNavAppearance();
});

document.querySelectorAll<HTMLTableElement>('table').forEach((t) => {
  t.classList.add('table', 'table-bordered', 'table-hover', 'table-display-block');
});

updateNavAppearance();
