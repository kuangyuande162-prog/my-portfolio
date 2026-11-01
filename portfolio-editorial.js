(()=>{
  const isDomestic=/domestic\.html$/.test(location.pathname),isOverseas=document.body.classList.contains('overseas-page'),isBrand=document.body.classList.contains('brand-page'),appliance=new URLSearchParams(location.search).get('edition')==='appliance';
  const root=new URL(document.currentScript.src).pathname.replace(/portfolio-editorial\.js$/,'');
  const text=(selector,copy)=>{const el=document.querySelector(selector);if(el)el.textContent=copy};
  // Preserve the edition and project from which a visitor opened a full case.
  document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a||a.target==='_blank'||e.metaKey||e.ctrlKey)return;const url=new URL(a.href,location.href);if(url.origin!==location.origin||!url.pathname.startsWith(root+'projects/'))return;const section=a.closest('[id]');try{sessionStorage.setItem('portfolio-origin',JSON.stringify({destination:url.pathname,href:location.pathname+location.search+(section?'#'+section.id:location.hash)}))}catch{}},true);
  if(location.pathname.includes('/projects/')){
    if(document.body.classList.contains('care-page')){
      const sources=['laundry-500ml.webp','laundry-100ml.webp','fragrance-cards.webp'];document.querySelectorAll('.hero-card img').forEach((img,i)=>{img.src=root+'assets/covers-v2/'+sources[i]});
      text('.hero-intro','香薰片、100ml 与 500ml 洗衣液的品牌影像与完整详情设计。');
      text('.hero-meta span:nth-child(2)','品牌影像 / 完整详情');
      document.querySelectorAll('[data-series]').forEach(series=>{
        series.classList.add('is-continuous');
        const controls=document.createElement('div');controls.className='series-view-switch';controls.setAttribute('aria-label','详情浏览方式');controls.innerHTML='<button type="button" aria-pressed="true">连续阅读</button><button type="button" aria-pressed="false">单张浏览</button>';
        const track=series.querySelector('.series-track');track.before(controls);controls.querySelectorAll('button').forEach((button,index)=>button.addEventListener('click',()=>{series.classList.toggle('is-continuous',index===0);controls.querySelectorAll('button').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));track.dispatchEvent(new Event('scroll'))}));
        const details=document.createElement('details');details.className='delivery-expand';const chapter=series.closest('.chapter'),count=chapter.id==='detergent-100'?11:10;details.innerHTML=`<summary><span>展开完整详情</span><span>${count} 张 · ＋</span></summary>`;series.before(details);details.append(series);details.addEventListener('toggle',()=>{details.querySelector('summary>span:first-child').textContent=details.open?'完整详情':'展开完整详情';details.querySelector('summary>span:last-child').textContent=`${count} 张 · ${details.open?'－':'＋'}`});
      });
    }
    try{const origin=JSON.parse(sessionStorage.getItem('portfolio-origin'));if(origin?.destination===location.pathname&&origin.href.startsWith(root)&&!/\/projects\//.test(origin.href))document.querySelectorAll('.back-link,.back,.case-no,#case-back').forEach(a=>{a.href=origin.href;a.textContent='返回作品列表 ↗'})}catch{}
    return;
  }
  if(!(isDomestic||isOverseas||isBrand))return;
  const studyUrl=(id,from)=>`projects/case-study/index.html?project=${id}${from?'&from='+from:''}`;
  const replaceTrigger=(trigger,href)=>{const a=document.createElement('a');for(const attr of trigger.attributes)if(!['type','data-project','aria-haspopup'].includes(attr.name))a.setAttribute(attr.name,attr.value);a.innerHTML=trigger.innerHTML;a.href=href;trigger.replaceWith(a)};
  const convert=(project,id,from)=>document.querySelectorAll(`[data-project="${project}"]`).forEach(el=>replaceTrigger(el,studyUrl(id,from)));
  document.querySelectorAll('.unified-version-menu').forEach(menu=>{
    const summary=menu.querySelector('summary');summary?.setAttribute('aria-label','切换作品版本');
    menu.addEventListener('keydown',e=>{if(e.key==='Escape'){menu.open=false;summary.focus()}});
    menu.addEventListener('focusout',()=>setTimeout(()=>{if(!menu.contains(document.activeElement))menu.open=false},0));
  });
  document.querySelectorAll('.reveal').forEach(el=>el.classList.add('is-visible'));
  if(isDomestic){
    convert('p3','vacuum',appliance?'':'domestic');if(appliance)convert('p12','robot');
    document.querySelectorAll('.project-summary').forEach(el=>{el.textContent=el.textContent.replace('作为补充品类，完整保留洗护详情与品牌视觉作品。','洗护详情、香氛影像与品牌内容。').replace('完整保留国内明星营销与电商承接经验。','代言人主视觉、粉丝互动与商品会场。')});
    document.querySelectorAll('.project-link').forEach(el=>{if(el.closest('a[href*="case-study"]'))el.innerHTML='查看完整案例 <b aria-hidden="true">↗</b>'});
    text('.cross-edition-card p','智能照明、家居小电与多语言商品内容。');
    document.querySelector('.workflow-inline')?.remove();
    if(!appliance){
      document.querySelector('.hero-scope')?.remove();
      const tiles=[...document.querySelectorAll('.hero-tile')];
      const robot=tiles[1];if(robot){robot.className='hero-tile hero-tile--product';robot.querySelector('img').src='assets/covers-v2/robot-1x.webp';robot.querySelector('img').alt='云米扫拖机器人 1X 产品视觉';robot.querySelector('figcaption b').textContent='消费电子'}
      tiles[2]?.remove();
      text('.hero .hero-copy','明星整合营销、洗护香氛与小家电产品视觉。');
    }else{
      const visual=document.querySelector('.hero-visual');if(visual)visual.innerHTML='<figure class="appliance-feature-image"><img src="assets/covers-v2/handheld-vacuum.webp" alt="云米手持无线吸尘器产品与结构视觉" fetchpriority="high"><figcaption>VIOMI / PRODUCT VISUAL</figcaption></figure>';
      const cards=[...document.querySelectorAll('.work-grid>.project-card')];
      const main=document.querySelector('.work-grid');
      if(main&&cards.length>2){
        const rest=document.createElement('details');rest.className='additional-projects';rest.id='additional-projects';rest.innerHTML='<summary><span>更多产品与品牌项目</span><small>厨房小电 / 环境电器 / 品牌营销</small><i>＋</i></summary><div class="additional-grid"></div>';main.after(rest);cards.slice(2).forEach(card=>rest.querySelector('.additional-grid').append(card));
        const more=document.querySelector('.unified-nav a[href="#legacy-overseas"]');if(more){more.href='#additional-projects';more.addEventListener('click',()=>rest.open=true)}
        const expandedId=location.hash.slice(1);if(expandedId&&rest.querySelector('#'+CSS.escape(expandedId)))rest.open=true;
        document.querySelectorAll('.project-rail a').forEach(a=>a.addEventListener('click',()=>{if(rest.querySelector(a.hash))rest.open=true}));
      }
      text('#works .section-head>p','吸尘器与扫地机器人完整案例。');
    }
    // Other projects keep quick previews, now with shareable addresses and browser history.
    const dialog=document.getElementById('project-dialog');let syncing=false;
    document.addEventListener('click',e=>{const t=e.target.closest('button[data-project]');if(!t||!dialog?.open)return;if(location.hash!==`#project=${t.dataset.project}`)history.pushState({portfolioProject:true},'',`#project=${t.dataset.project}`)});
    const sync=()=>{const id=location.hash.startsWith('#project=')?decodeURIComponent(location.hash.slice(9)):'';if(id&&typeof openProject==='function'&&typeof pd!=='undefined'&&pd[id]){syncing=true;if(dialog.open)dialog.close();openProject(id,document.querySelector(`[data-project="${CSS.escape(id)}"]`));syncing=false}else if(dialog?.open){syncing=true;dialog.close();syncing=false}};
    addEventListener('popstate',sync);dialog?.addEventListener('close',()=>{if(!syncing&&location.hash.startsWith('#project='))history.replaceState(null,'',location.pathname+location.search+'#works')});
    if(location.hash.startsWith('#project='))sync();
  }
  if(isOverseas){
    const lead=document.querySelector('.hero-main img');if(lead){lead.src='assets/overseas/cabinet-light-project-scene.webp';lead.fetchPriority='high'}
    convert('echo','echo');convert('cassini','cassini');
    const echo=document.querySelector('.feature.echo'),cassini=document.querySelector('.feature.cassini');if(echo)echo.id='echo';if(cassini)cassini.id='cassini';
    document.getElementById('process')?.remove();document.querySelector('.hero-index')?.remove();
    text('.hero-side>p','邝先生 · 电商视觉设计主管\nAmazon 主副图、A+ 与多语言内容。');
    text('.feature.lighting .feature-copy>p','围绕感应、安装与空间照明，组织主副图、A+ 和动态内容。');
    text('.feature.echo .feature-copy>p','把智能控制、灯光细节与生活场景组织为完整 Listing 和 A+。');
    text('.feature.cassini .feature-copy>p','围绕卧室场景，呈现时钟、无线充电、音箱及多语言商品内容。');
  }
  if(isBrand){
    document.querySelector('.ticker')?.remove();
    text('.hero .kicker','品牌影像 / 活动视觉 / 跨渠道延展');
    document.querySelector('.hero h1').innerHTML='同一品牌，<br><em>不同触点。</em>';
    text('.hero-copy','从活动主视觉到商品内容，保持清晰一致的品牌表达。');
    document.querySelectorAll('.collection-card').forEach((card,i)=>{const ids=['detergent-100','detergent-500','fragrance'];if(i<3)card.href='projects/laundry-care-collection/index.html#'+ids[i];else card.remove()});
    const global=document.getElementById('global');
    if(global){global.innerHTML='<div class="container"><div class="section-head"><div><p class="eyebrow">CROSS-MARKET CONTENT</p><h2>品牌的另一种表达。</h2></div><p>在海外商品内容中延续产品与场景语言。</p></div><div class="global-grid"><div class="global-visual"><img src="assets/overseas/echo-cost/aplus/aplus-03.webp" alt="ECHO 台灯 A+ 细节视觉" loading="lazy"></div><div class="global-content"><small>ECHO / AMAZON A+</small><h3>从产品细节，延伸到家居场景。</h3><p>通过材质光感、产品比例和场景内容，保持商品表达的一致性。</p><a class="button" href="projects/case-study/index.html?project=echo">查看 ECHO 完整项目 ↗</a></div></div></div>'}
    const method=document.getElementById('method');
    if(method){method.className='section brand-observations';method.innerHTML='<div class="container"><div class="section-head"><div><p class="eyebrow">VISUAL APPROACH</p><h2>让视觉有延续。</h2></div></div><div class="brand-rules"><div><small>01 / 活动识别</small><p>从几光活动主视觉延展色彩、图形与主题字，适配会场、互动页和商品物料。</p></div><div><small>02 / 产品影像</small><p>用光感、织物和材质统一洗护产品的场景表达。</p></div><div><small>03 / 内容适配</small><p>保留产品识别，按平台、画幅与语言重组信息。</p></div></div></div>'}
    text('.unified-nav a[href="#method"]','视觉方法');
  }
  // Keep below-the-fold images lazy and decoding independent of interaction.
  document.querySelectorAll('img').forEach(img=>{img.decoding='async';if(!img.hasAttribute('loading')&&img.getBoundingClientRect().top>innerHeight)img.loading='lazy'});
})();

