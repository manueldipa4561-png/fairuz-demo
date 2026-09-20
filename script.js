const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
toggle?.addEventListener('click',()=>{
  const open=!nav.classList.contains('open');
  nav.classList.toggle('open',open);
  toggle.classList.toggle('open',open);
  toggle.setAttribute('aria-expanded',String(open));
  document.body.style.overflow=open?'hidden':'';
});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  nav.classList.remove('open');
  toggle?.classList.remove('open');
  toggle?.setAttribute('aria-expanded','false');
  document.body.style.overflow='';
}));

const revealEls=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window){
  const io=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  },{threshold:.1,rootMargin:'0px 0px -25px'});
  revealEls.forEach(el=>io.observe(el));
}else{
  revealEls.forEach(el=>el.classList.add('in'));
}

const header=document.querySelector('.site-header');
const onScroll=()=>header?.classList.toggle('scrolled',window.scrollY>36);
onScroll();
window.addEventListener('scroll',onScroll,{passive:true});
