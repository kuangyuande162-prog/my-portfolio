(()=>{
  const body=document.body;
  const isOverseas=body.classList.contains('overseas-page');
  const isBrand=body.classList.contains('brand-page');
  const isAppliance=new URLSearchParams(location.search).get('edition')==='appliance';

  let items=[];
  if(isOverseas){
    items=[['橱柜灯','#work'],['ECHO','.echo'],['CASSINI','.cassini'],['更多项目','#archive']];
  }else if(isBrand){
    items=[['品牌首页','#top'],['明星营销','#campaign'],['洗护香氛','#collection'],['跨市场','#global']];
  }else if(isAppliance){
    const cards=[...document.querySelectorAll('#works .project-card')];
    cards.slice(0,4).forEach((card,index)=>card.id=`appliance-project-${index+1}`);
    items=[['吸尘器','#appliance-project-1'],['扫地机器人','#appliance-project-2'],['机器人系列','#appliance-project-3'],['厨房小电','#appliance-project-4']];
  }else{
    items=[['明星营销','#campaign-project'],['洗护香氛','#care-project'],['消费电子','#product-project'],['更多项目','.archive']];
  }

  const header=document.querySelector('.site-header');
  if(!header||!items.length)return;
  const rail=document.createElement('nav');
  rail.className='project-rail';
  rail.setAttribute('aria-label','当前作品项目');
  const inner=document.createElement('div');
  inner.className='project-rail__inner';
  const targets=[];
  items.forEach(([label,selector],index)=>{
    const target=document.querySelector(selector);
    if(!target)return;
    if(!target.id)target.id=`project-section-${index+1}`;
    const link=document.createElement('a');
    link.href=`#${target.id}`;
    link.textContent=`${String(index+1).padStart(2,'0')} ${label}`;
    if(index===0)link.classList.add('is-active');
    inner.append(link);targets.push([target,link]);
  });
  rail.append(inner);header.after(rail);

  if('IntersectionObserver'in window){
    const observer=new IntersectionObserver(entries=>{
      const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if(!visible)return;
      targets.forEach(([target,link])=>link.classList.toggle('is-active',target===visible.target));
    },{rootMargin:'-18% 0px -62% 0px',threshold:[0,.08,.25]});
    targets.forEach(([target])=>observer.observe(target));
  }

  inner.addEventListener('click',event=>{
    const link=event.target.closest('a');
    if(!link)return;
    event.preventDefault();
    document.querySelector(link.getAttribute('href'))?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
  });
})();

