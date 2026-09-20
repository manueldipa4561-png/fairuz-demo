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


// FAIRUZ_IMAGE_FALLBACK
const fairuzFallbackImage='https://images.happycow.net/venues/1024/35/97/hcmp359766_3909640.jpeg';
document.querySelectorAll('img').forEach(img=>{
  img.addEventListener('error',()=>{
    if(img.dataset.fallbackTried==='1'){
      img.classList.add('image-fallback');
      img.removeAttribute('src');
      return;
    }
    img.dataset.fallbackTried='1';
    img.src=fairuzFallbackImage;
  });
});
