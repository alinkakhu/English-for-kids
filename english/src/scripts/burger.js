
  export  const menuBtnRef = document.querySelector('.burger');
   export   const mobileMenuRef = document.querySelector('.nav-list');
    export  const overlay = document.querySelector('.overlay');
export  const body = document.querySelector('body');

  menuBtnRef.addEventListener('click', () => {
    menuBtnRef.classList.toggle('is-open');
  overlay.classList.toggle('is-open');
    mobileMenuRef.classList.toggle('is-open');
 body.classList.toggle('is-open');
 overlay.addEventListener('click', ()=>{
  menuBtnRef.classList.remove('is-open');
  mobileMenuRef.classList.remove('is-open')
  overlay.classList.remove('is-open');
  body.classList.remove('is-open')
 })
  });

  document.body.addEventListener('click', (e) => {
    if (
      e.target.classList.contains("nav-item") ||
      e.target.classList.contains("nav-link")
    ){
      menuBtnRef.classList.remove('is-open');
      mobileMenuRef.classList.remove('is-open')
      overlay.classList.remove('is-open');
      body.classList.remove('is-open')
    }
  })