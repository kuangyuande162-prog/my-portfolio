(()=>{
 const q=s=>document.querySelector(s),all=s=>[...document.querySelectorAll(s)];
 function arrows(selector){const buttons=all(selector);buttons.forEach((b,i)=>b.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const n=e.key==='Home'?0:e.key==='End'?buttons.length-1:(i+(e.key==='ArrowRight'?1:-1)+buttons.length)%buttons.length;buttons[n].focus();buttons[n].click()}))}
 function views(selector,attribute,target,caption,records,counter){const buttons=all(selector);let request=0;buttons.forEach((b,i)=>b.addEventListener('click',()=>{const record=records[b.getAttribute(attribute)],version=++request,button=q(target),img=button.querySelector('img');button.setAttribute('aria-busy','true');const next=new Image();next.onload=()=>{if(version!==request)return;img.removeAttribute('srcset');img.src=record.src;img.alt=record.alt;button.dataset.zoom=record.src;button.dataset.caption=record.caption;q(caption).textContent=record.caption;buttons.forEach(x=>x.setAttribute('aria-pressed',String(x===b)));if(counter)q(counter).textContent=`0${i+1} / 0${buttons.length}`;button.removeAttribute('aria-busy')};next.onerror=()=>{if(version!==request)return;button.removeAttribute('aria-busy');q(caption).textContent='图片暂未载入，请重新选择'};next.src=record.src}));arrows(selector)}
 views('[data-candle-view]','data-candle-view','.candle-view-image','.candle-view-description',{
  hero:{src:'assets/chizhao-hero.webp',alt:'迟照合盖状态与成套抽屉包装',caption:'合盖 / 陶瓷杯体与胡桃木盖'},
  open:{src:'assets/chizhao-open.webp',alt:'迟照开盖状态，单芯蜡面与独立胡桃木盖',caption:'开盖 / 单芯蜡面与独立木盖'},
  detail:{src:'assets/chizhao-detail.webp',alt:'迟照陶瓷直印与胡桃木纹理细节',caption:'材质 / 陶瓷直印与胡桃木纹理'}
 },'.candle-view-count');
 views('[data-pack-view]','data-pack-view','.candle-pack-image','.pack-description',{
  packaging:{src:'assets/chizhao-packaging.webp',alt:'迟照封背抽屉外套与圆形纸质内托',caption:'抽屉盒 / 圆形内托与拉带'},
  fit:{src:'assets/chizhao-fit.svg',alt:'迟照杯体与抽屉包装的容纳尺寸提案',caption:'收纳结构 / 外观尺寸提案'}
 });
 const accords={tea:'红茶的醇厚，带一点陈皮的清亮。',wood:'雪松与柏木，衔接温润木质。',amber:'安息香与琥珀，收束为柔和尾调。'};
 all('.accord-tabs button').forEach(b=>b.addEventListener('click',()=>{all('.accord-tabs button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));q('.candle-accord').dataset.accord=b.dataset.accord;q('.accord-description').textContent=accords[b.dataset.accord]}));arrows('.accord-tabs button');
 const viewer=q('.viewer');let previousFocus=null;
 all('[data-zoom]').forEach(b=>b.addEventListener('click',()=>{if(b.getAttribute('aria-busy')==='true')return;previousFocus=b;const img=viewer.querySelector('img');img.src=b.dataset.zoom;img.alt=b.dataset.caption||b.querySelector('img').alt;viewer.querySelector('.viewer-toolbar span').textContent=img.alt;viewer.classList.remove('is-zoomed');viewer.showModal();viewer.scrollTop=0;document.body.classList.add('viewer-open')}));
 viewer.querySelector('.viewer-close').addEventListener('click',()=>viewer.close());viewer.addEventListener('click',e=>{if(e.target===viewer||e.target.classList.contains('viewer-canvas'))viewer.close()});viewer.querySelector('.viewer-canvas img').addEventListener('click',()=>viewer.classList.toggle('is-zoomed'));viewer.addEventListener('close',()=>{document.body.classList.remove('viewer-open');viewer.classList.remove('is-zoomed');previousFocus?.focus({preventScroll:true})});
 const anchors=all('.site-head nav a[href^="#"]'),sections=anchors.map(a=>({a,target:q(a.hash)})).filter(x=>x.target);let queued=false;const spy=()=>{queued=false;const active=sections.filter(x=>x.target.getBoundingClientRect().top<=Math.min(innerHeight*.25,180)).at(-1);anchors.forEach(a=>{if(a===active?.a)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current')})};const queue=()=>{if(!queued){queued=true;requestAnimationFrame(spy)}};addEventListener('scroll',queue,{passive:true});addEventListener('resize',queue);spy();
})();
