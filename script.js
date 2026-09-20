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

document.querySelectorAll('.menu-tab').forEach(tab=>{
  tab.addEventListener('click',()=>{
    document.querySelectorAll('.menu-tab').forEach(t=>{
      t.classList.toggle('active',t===tab);
      t.setAttribute('aria-selected',String(t===tab));
    });
    document.querySelectorAll('.menu-panel').forEach(p=>p.classList.toggle('active',p.id===tab.dataset.target));
  });
});

const io=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}});
},{threshold:.12,rootMargin:'0px 0px -30px'});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

const header=document.querySelector('.site-header');
window.addEventListener('scroll',()=>{
  if(window.scrollY>40){
    header.style.position='fixed';
    header.style.background='rgba(36,22,29,.92)';
    header.style.backdropFilter='blur(12px)';
  }else{
    header.style.position='absolute';
    header.style.background='transparent';
    header.style.backdropFilter='none';
  }
},{passive:true});
