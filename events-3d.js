// Events page — subtle interactive 3D ritual.
(()=>{
  const host=document.querySelector('[data-event-3d]');
  const scene=host?.querySelector('[data-ritual-scene]');
  if(!host || !scene) return;

  const fine=window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!fine || reduce) return;

  const reset=()=>{
    scene.style.setProperty('--rx','58deg');
    scene.style.setProperty('--rz','-16deg');
  };

  host.addEventListener('pointermove',(event)=>{
    const rect=host.getBoundingClientRect();
    const x=(event.clientX-rect.left)/rect.width-.5;
    const y=(event.clientY-rect.top)/rect.height-.5;
    scene.style.setProperty('--rx',`${58 + y*-10}deg`);
    scene.style.setProperty('--rz',`${-16 + x*12}deg`);
  },{passive:true});

  host.addEventListener('pointerleave',reset);
})();
