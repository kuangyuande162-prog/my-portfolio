(()=>{
  const sets={
    'chalk-main':7,'chalk-aplus':6,
    'squishy-main':6,'squishy-aplus':7,
    'bear-main':6,'bear-aplus':5,
    'plant-main':7,'plant-aplus':5,
    'cat-main':7,'cat-aplus':5
  };
  const labels={chalk:'户外粉笔套装',squishy:'农场捏捏玩具',bear:'泰迪熊钥匙扣',plant:'针织盆栽礼物',cat:'猫咪边缘摆件'};
  const all=[];
  document.querySelectorAll('[data-gallery]').forEach(gallery=>{
    const key=gallery.dataset.gallery,count=sets[key]||0,type=key.endsWith('aplus')?'A+':'主副图',name=labels[key.split('-')[0]];
    for(let i=1;i<=count;i++){
      const src=`assets/${key}-${String(i).padStart(2,'0')}.webp`;
      const button=document.createElement('button');button.className='shot reveal';button.type='button';button.dataset.src=src;button.dataset.caption=`${name} · ${type} ${String(i).padStart(2,'0')}`;
      const img=document.createElement('img');img.src=src;img.alt=button.dataset.caption;img.loading=i<=2?'eager':'lazy';img.decoding='async';button.append(img);gallery.append(button);all.push(button);
    }
  });

  const rail=[...document.querySelectorAll('.rail-inner a')],sections=rail.map(link=>document.querySelector(link.hash)).filter(Boolean);
  rail.forEach(link=>link.addEventListener('click',event=>{event.preventDefault();document.querySelector(link.hash)?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'});}));
  if('IntersectionObserver'in window){
    const activeObserver=new IntersectionObserver(entries=>{const active=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(!active)return;rail.forEach(link=>link.classList.toggle('active',link.hash===`#${active.target.id}`));},{rootMargin:'-18% 0px -65% 0px',threshold:[0,.1,.25]});sections.forEach(section=>activeObserver.observe(section));
    const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in');revealObserver.unobserve(entry.target);}}),{rootMargin:'0px 0px -8%',threshold:.06});document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
  }else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('in'));

  const menu=document.querySelector('.version-menu');document.addEventListener('pointerdown',event=>{if(menu?.open&&!menu.contains(event.target))menu.removeAttribute('open')});
  const dialog=document.querySelector('.lightbox'),dialogImg=dialog.querySelector('img'),caption=dialog.querySelector('figcaption');let current=0;
  const open=index=>{current=(index+all.length)%all.length;const item=all[current];dialogImg.src=item.dataset.src;dialogImg.alt=item.dataset.caption;caption.textContent=`${item.dataset.caption} · ${String(current+1).padStart(2,'0')} / ${all.length}`;if(!dialog.open)dialog.showModal();};
  all.forEach((item,index)=>item.addEventListener('click',()=>open(index)));
  dialog.querySelector('.lightbox-close').addEventListener('click',()=>dialog.close());dialog.querySelector('.lightbox-prev').addEventListener('click',()=>open(current-1));dialog.querySelector('.lightbox-next').addEventListener('click',()=>open(current+1));dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
  addEventListener('keydown',event=>{if(!dialog.open)return;if(event.key==='ArrowLeft')open(current-1);if(event.key==='ArrowRight')open(current+1)});

  const collage=document.querySelector('.hero-collage');if(collage&&!matchMedia('(pointer:coarse)').matches&&!matchMedia('(prefers-reduced-motion:reduce)').matches){collage.addEventListener('pointermove',event=>{const rect=collage.getBoundingClientRect(),x=(event.clientX-rect.left)/rect.width-.5,y=(event.clientY-rect.top)/rect.height-.5;collage.querySelectorAll('.hero-card').forEach((card,index)=>{const depth=(index%3+1)*4;card.style.translate=`${x*depth}px ${y*depth}px`;});});collage.addEventListener('pointerleave',()=>collage.querySelectorAll('.hero-card').forEach(card=>card.style.translate=''));}
})();

