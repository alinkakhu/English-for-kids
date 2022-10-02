
    const menuBtnRef = document.querySelector('.burger');
      const mobileMenuRef = document.querySelector('.nav-list');
      const overlay = document.querySelector('.overlay');
  const body = document.querySelector('body');

  menuBtnRef.addEventListener('click', () => {
    menuBtnRef.classList.toggle('is-open');
  overlay.classList.toggle('is-open');
    mobileMenuRef.classList.toggle('is-open');
 body.classList.toggle('is-open');
  });