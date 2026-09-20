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


// FAIRUZ_MOTION_SHOWCASE
const motionMedia=document.querySelector('[data-motion-media]');
const motionImage=motionMedia?.querySelector('.motion-showcase__image');
const finePointer=window.matchMedia('(hover:hover) and (pointer:fine)');
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');

if(motionMedia && motionImage && finePointer.matches && !reducedMotion.matches){
  motionMedia.addEventListener('pointermove',(event)=>{
    const rect=motionMedia.getBoundingClientRect();
    const px=(event.clientX-rect.left)/rect.width-.5;
    const py=(event.clientY-rect.top)/rect.height-.5;
    motionImage.style.setProperty('--motion-x',`${px*-12}px`);
    motionImage.style.setProperty('--motion-y',`${py*-9}px`);
  },{passive:true});

  motionMedia.addEventListener('pointerleave',()=>{
    motionImage.style.setProperty('--motion-x','0px');
    motionImage.style.setProperty('--motion-y','0px');
  });
}


// FAIRUZ_CINEMATIC_HERO
const cinematicHero=document.querySelector('[data-hero-cinematic]');
const cinematicStage=cinematicHero?.querySelector('.hero-cinematic__stage');

if(cinematicHero && cinematicStage){
  const heroFine=window.matchMedia('(hover:hover) and (pointer:fine)');
  const heroReduced=window.matchMedia('(prefers-reduced-motion: reduce)');

  if(heroFine.matches && !heroReduced.matches){
    cinematicHero.addEventListener('pointermove',(event)=>{
      const rect=cinematicHero.getBoundingClientRect();
      const x=(event.clientX-rect.left)/rect.width-.5;
      const y=(event.clientY-rect.top)/rect.height-.5;

      cinematicStage.style.setProperty('--hero-ry',`${x*1.35}deg`);
      cinematicStage.style.setProperty('--hero-rx',`${y*-0.85}deg`);
      cinematicStage.style.setProperty('--hero-tx',`${x*-5}px`);
      cinematicStage.style.setProperty('--hero-ty',`${y*-3}px`);
    },{passive:true});

    cinematicHero.addEventListener('pointerleave',()=>{
      cinematicStage.style.setProperty('--hero-ry','0deg');
      cinematicStage.style.setProperty('--hero-rx','0deg');
      cinematicStage.style.setProperty('--hero-tx','0px');
      cinematicStage.style.setProperty('--hero-ty','0px');
    });
  }
}
