(()=>{
 const root=new URL('./',document.currentScript.src),reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const asset=src=>new URL(src,root).href;
 const setImage=(img,src,alt)=>{img.alt=alt;img.removeAttribute('srcset');img.dataset.mediaSrc=asset(src);window.PortfolioMedia?.load(img)};
 const options=[
  ['UCL01 橱柜感应灯','assets/overseas/cabinet-light-project-scene.webp','case-ucl01','SCENE / FUNCTION / A+'],
  ['橱柜灯主副图方案','assets/archive-web/fe1060af400cfc39caba.webp','case-p9','LISTING / A+'],
  ['超薄智能感应灯','assets/archive-web/efc037380d818966e1db.webp','case-p10','STRUCTURE / INSTALLATION'],
  ['橱柜灯 A+ 方案','assets/archive-web/592d493d926f9be64134.webp','case-p11','HOME SCENES / A+']];
 const buttons=[...document.querySelectorAll('[data-lighting]')],hero=document.getElementById('lighting-preview');
 const select=index=>{const [name,src,hash,type]=options[index];buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));setImage(hero,src,name+'项目画面');document.getElementById('lighting-name').textContent=name;document.getElementById('lighting-count').textContent=String(index+1).padStart(2,'0')+' / 04';document.getElementById('lighting-type').textContent=type;document.getElementById('lighting-action').href=asset('projects/product-site-portfolio/index.html#'+hash);if(!reduced)hero.animate([{opacity:.2,transform:'translateY(8px)'},{opacity:1,transform:'none'}],{duration:380,easing:'ease-out'})};
 buttons.forEach((b,i)=>{b.addEventListener('click',()=>select(i));b.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?buttons.length-1:(i+(e.key==='ArrowRight'?1:-1)+buttons.length)%buttons.length;select(next);buttons[next].focus()})});
 const previews=['assets/overseas/echo-cost/main/main-01.webp','assets/overseas/cassini-product-crop.webp','assets/overseas/small-appliance/main/main-01.webp','assets/covers-v2/overseas-lighting.webp','assets/covers-v2/smart-gift-set.webp','assets/covers-v2/echo-desk-lamp.webp'];
 document.querySelectorAll('.overseas-page .archive-row').forEach((row,i)=>{if(i>2)return;const media=document.createElement('span');media.className='o-archive-image';const img=document.createElement('img');img.dataset.mediaSrc=asset(previews[i]);img.alt=row.querySelector('strong').textContent;img.loading='lazy';media.append(img);row.prepend(media)});
 // Position-based chapter tracking remains stable through tall image sections.
 const links=[...document.querySelectorAll('[data-chapter]')],targets=links.map(a=>document.getElementById(a.hash.slice(1)));let queued=false;
 const update=()=>{queued=false;let active=0;targets.forEach((t,i)=>{if(t&&t.getBoundingClientRect().top<170)active=i});links.forEach((a,i)=>{a.classList.toggle('is-active',i===active);if(i===active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')});const max=document.documentElement.scrollHeight-innerHeight;document.documentElement.style.setProperty('--reading',max>0?Math.min(1,scrollY/max):0)};
 if(links.length){addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(update)}},{passive:true});addEventListener('resize',update);update()}
 document.querySelectorAll('[data-reading]').forEach(section=>{section.querySelectorAll('[data-layout]').forEach(b=>b.addEventListener('click',()=>{section.classList.toggle('read-continuous',b.dataset.layout==='continuous');section.querySelectorAll('[data-layout]').forEach(other=>other.setAttribute('aria-pressed',String(other===b)))}))});
 document.querySelectorAll('[data-stage]').forEach(button=>button.addEventListener('click',()=>{const img=document.querySelector('.v-stage img');setImage(img,button.dataset.stage,button.dataset.alt);document.querySelectorAll('[data-stage]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));document.querySelector('.v-stage-label').textContent=button.textContent;if(!reduced)img.animate([{opacity:.1},{opacity:1}],{duration:320})}));
})();

