(()=>{
  let viewer,items=[],active=0,opener,previousOverflow='',touchStart=null,neighborTimer;
  const fast=src=>window.PortfolioMedia?.preview(src)||src;
  const loading=value=>{viewer.classList.toggle('is-loading',value);viewer.querySelector('.pv-stage').setAttribute('aria-busy',String(value));viewer.querySelector('.pv-loading').hidden=!value};
  const setImage=()=>{const item=items[active],img=viewer.querySelector('.pv-stage img');loading(true);img.src=viewer.classList.contains('is-actual')?item.src:(item.preview||fast(item.src));img.alt=item.alt;if(img.complete&&img.naturalWidth)loading(false)};
  const create=()=>{
    if(viewer)return;
    viewer=document.createElement('dialog');viewer.className='portfolio-viewer';viewer.setAttribute('aria-label','项目作品大图');
    viewer.innerHTML='<header class="pv-head"><span class="pv-title"></span><div class="pv-tools"><button type="button" data-fit aria-pressed="false">原尺寸</button><button type="button" data-close aria-label="关闭大图">关闭 ×</button></div></header><div class="pv-stage"><img alt=""></div><p class="pv-error" hidden>图片暂时未能加载。<br><a target="_blank" rel="noopener">打开原图 ↗</a></p><button class="pv-arrow pv-prev" type="button" aria-label="上一张">←</button><button class="pv-arrow pv-next" type="button" aria-label="下一张">→</button><footer class="pv-foot"><span class="pv-count" aria-live="polite"></span><nav class="pv-thumbs" aria-label="项目图片缩略图"></nav></footer>';
    document.body.append(viewer);
    const status=document.createElement('p');status.className='pv-loading';status.hidden=true;status.setAttribute('role','status');status.textContent='图片加载中…';viewer.append(status);
    const fit=()=>{const actual=viewer.classList.toggle('is-actual');viewer.querySelector('[data-fit]').textContent=actual?'适应屏幕':'原尺寸';viewer.querySelector('[data-fit]').setAttribute('aria-pressed',String(actual));setImage()};
    viewer.querySelector('[data-fit]').onclick=fit;viewer.querySelector('.pv-stage img').onclick=fit;
    viewer.querySelector('[data-close]').onclick=()=>viewer.close();viewer.querySelector('.pv-prev').onclick=()=>show(active-1);viewer.querySelector('.pv-next').onclick=()=>show(active+1);
    viewer.addEventListener('cancel',e=>{e.preventDefault();viewer.close()});
    viewer.addEventListener('close',()=>{clearTimeout(neighborTimer);document.body.style.overflow=previousOverflow;viewer.querySelector('.pv-stage img').removeAttribute('src');opener?.focus({preventScroll:true})});
    viewer.querySelector('.pv-stage img').onerror=()=>{loading(false);viewer.querySelector('.pv-error').hidden=false};
    viewer.querySelector('.pv-stage img').onload=()=>{loading(false);const index=active;clearTimeout(neighborTimer);if(navigator.connection?.saveData||/2g/.test(navigator.connection?.effectiveType||''))return;neighborTimer=setTimeout(()=>{if(!viewer.open||index!==active||items.length<2)return;const img=new Image();img.fetchPriority='low';img.decoding='async';img.src=fast(items[(active+1)%items.length].src)},250)};
    viewer.addEventListener('touchstart',e=>{touchStart=[e.changedTouches[0].clientX,e.changedTouches[0].clientY]},{passive:true});
    viewer.addEventListener('touchend',e=>{if(!touchStart||viewer.classList.contains('is-actual'))return;const dx=e.changedTouches[0].clientX-touchStart[0],dy=e.changedTouches[0].clientY-touchStart[1];if(Math.abs(dx)>65&&Math.abs(dx)>Math.abs(dy)*1.5)show(active+(dx<0?1:-1));touchStart=null},{passive:true});
  };
  const show=index=>{
    clearTimeout(neighborTimer);active=(index+items.length)%items.length;const item=items[active];viewer.querySelector('.pv-error').hidden=true;viewer.querySelector('.pv-title').textContent=item.alt;viewer.querySelector('.pv-count').textContent=`${String(active+1).padStart(2,'0')} / ${String(items.length).padStart(2,'0')}`;viewer.querySelector('.pv-error a').href=item.src;viewer.querySelector('.pv-stage').scrollTop=0;setImage();
    viewer.querySelectorAll('.pv-thumbs button').forEach((button,i)=>{button.setAttribute('aria-current',String(i===active));if(i===active)button.scrollIntoView({block:'nearest',inline:'nearest'})});
  };
  const open=(images,index=0,trigger=null)=>{
    if(!images.length)return;create();items=images;opener=trigger;viewer.classList.remove('is-actual');viewer.querySelector('[data-fit]').textContent='原尺寸';viewer.querySelector('[data-fit]').setAttribute('aria-pressed','false');
    const thumbs=viewer.querySelector('.pv-thumbs');thumbs.replaceChildren();items.forEach((item,i)=>{const button=document.createElement('button');button.type='button';button.setAttribute('aria-label',`查看第 ${i+1} 张`);const number=document.createElement('span');number.textContent=String(i+1).padStart(2,'0');button.append(number);window.PortfolioMedia?.thumb(button,item.src);button.onclick=()=>show(i);thumbs.append(button)});
    previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';viewer.showModal();show(index);viewer.querySelector('[data-close]').focus();
  };
  window.PortfolioViewer={open};
  const selector='.gallery-item,.zoomable,.image-button,.dialog-section img,.gallery-grid img,[data-gallery-image]';
  document.addEventListener('click',e=>{
    if(e.target.closest('.portfolio-viewer'))return;
    const trigger=e.target.closest(selector);if(!trigger)return;
    const group=trigger.closest('[data-gallery-group],.archive-case,.case-shell,#dialog-gallery,#dialog-body,.chapter,main')||document;
    const nodes=[...group.querySelectorAll(selector)].filter(node=>node.tagName==='IMG'||!node.parentElement.closest(selector));
    const images=nodes.map(node=>{const img=node.tagName==='IMG'?node:node.querySelector('img');return {src:node.dataset.src||node.dataset.lightbox||img?.dataset.fullSrc||img?.dataset.mediaSrc||img?.currentSrc||img?.src,preview:img?.complete&&img?.naturalWidth?img.currentSrc:undefined,alt:node.dataset.label||img?.alt||'项目作品'}}).filter(item=>item.src);
    const index=nodes.indexOf(trigger);if(index<0||!images.length)return;
    e.preventDefault();e.stopImmediatePropagation();open(images,index,trigger);
  },true);
  window.addEventListener('keydown',e=>{if(!viewer?.open)return;if(['Escape','ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();e.stopImmediatePropagation();if(e.key==='Escape')viewer.close();else show(active+(e.key==='ArrowRight'?1:-1))}},true);
})();

