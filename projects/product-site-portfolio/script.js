const assetSeries = (folder, count) => Array.from({ length: count }, (_, index) => {
  const number = String(index + 1).padStart(2, '0');
  return [`${folder}/${number}.webp`, number];
});

const cases = [
  {
    id: 'ucl01',
    number: '01',
    label: 'PRIORITY PROJECT',
    title: 'UCL01 2.0 · 橱柜感应灯',
    shortTitle: '橱柜感应灯',
    description: '感应、色温、续航、磁吸安装与多场景应用。',
    cover: 'assets/ucl01/main/01.webp',
    facts: ['主图与功能辅图 09', 'A+ 内容 14', '感应 / 色温 / 续航 / 安装'],
    sections: [
      { eyebrow: 'LISTING IMAGES', title: '主图与功能辅图', note: '01—09', layout: 'main-grid', images: assetSeries('assets/ucl01/main', 9) },
      { eyebrow: 'A+ CONTENT', title: 'A+ 完整内容', note: '01—14', layout: 'aplus-stack', images: assetSeries('assets/ucl01/aplus', 14) }
    ]
  },
  {
    id: 'tl01',
    number: '02',
    label: 'LIFESTYLE LIGHTING',
    title: 'TL01 · 无线台灯',
    shortTitle: '无线台灯',
    description: '触控调光、便携续航与家居场景表达。',
    cover: 'assets/tl01/main/03.webp',
    facts: ['主图与功能辅图 11', 'A+ 内容 14', '生活方式 / 触控 / 续航'],
    sections: [
      { eyebrow: 'LISTING IMAGES', title: '主图与功能辅图', note: '01—11', layout: 'main-grid', images: assetSeries('assets/tl01/main', 11) },
      { eyebrow: 'A+ CONTENT', title: 'A+ 完整内容', note: '01—14', layout: 'aplus-stack', images: assetSeries('assets/tl01/aplus', 14) }
    ]
  },
  {
    id: 'pl02',
    number: '03',
    label: 'INTERIOR APPLICATION',
    title: 'PL02 · 画灯场景系统',
    shortTitle: '画灯',
    description: '不同空间、画作比例与灯光氛围的场景系统。',
    cover: 'assets/pl02/main/02.webp',
    facts: ['主图与场景辅图 07', 'A+ 内容 08', '空间 / 比例 / 安装'],
    sections: [
      { eyebrow: 'LISTING IMAGES', title: '主图与场景辅图', note: '01—07', layout: 'main-grid', images: assetSeries('assets/pl02/main', 7) },
      { eyebrow: 'A+ CONTENT', title: 'A+ 完整内容', note: '01—08', layout: 'aplus-stack', images: assetSeries('assets/pl02/aplus', 8) }
    ]
  },
  {
    id: 'wl05',
    number: '04',
    label: 'WALL LIGHTING',
    title: 'WL05 · 无线壁灯',
    shortTitle: '无线壁灯',
    description: '免布线、磁吸、定时、调光与 RGB 氛围功能。',
    cover: 'assets/wl05/main/01.webp',
    facts: ['主图与功能辅图 09', 'A+ 内容 12', '磁吸 / 定时 / RGB'],
    sections: [
      { eyebrow: 'LISTING IMAGES', title: '主图与功能辅图', note: '01—09', layout: 'main-grid', images: assetSeries('assets/wl05/main', 9) },
      { eyebrow: 'A+ CONTENT', title: 'A+ 完整内容', note: '01—12', layout: 'aplus-stack', images: assetSeries('assets/wl05/aplus', 12) }
    ]
  }
];


cases[0].title='UCL01 · 橱柜感应灯';
const archiveNames={p9:'橱柜灯主副图方案',p10:'超薄智能感应灯',p11:'橱柜灯 A+ 方案'};
const localAsset=src=>'../../'+window.portfolioArchiveMap[src];
const extras=Object.entries(archiveNames).map(([id,title],i)=>{const p=window.archiveProjectData[id];return {id,title,number:'0'+(i+2),label:'CABINET LIGHT',description:p.s.length>1?'主副图与 A+ 完整内容':'A+ 场景与功能内容',cover:localAsset(p.s[0].i[0]),sections:p.s.map(s=>({title:s.t.includes('A+')?'A+ 完整内容':'主图与功能辅图',layout:s.t.includes('A+')?'aplus-stack':'main-grid',images:s.i.map((src,i)=>[localAsset(src),String(i+1).padStart(2,'0')])}))}});
const imageHtml=(p,s)=>s.images.map(([src,n])=>`<button class="gallery-item" type="button" data-src="${src}" data-label="${p.title} · ${s.title} ${n}"><img data-media-src="${src}" alt="${p.title} · ${s.title} ${n}" loading="lazy" decoding="async"><span>${n}</span></button>`).join('');
const sections=p=>p.sections.map((s,i)=>{const continuous=s.layout==='aplus-stack';return `<section class="case-section ${continuous?'read-continuous':''}" data-reading id="${p.id}-${continuous?'aplus':'main'}"><header class="case-section-head"><div><span class="v-label">${continuous?'A+ CONTENT':'LISTING IMAGES'} / ${s.images.length}</span><h4>${s.title}</h4></div><div class="v-layout" aria-label="${p.title} ${s.title}浏览方式"><button type="button" data-layout="overview" aria-pressed="${!continuous}">总览</button><button type="button" data-layout="continuous" aria-pressed="${continuous}">连续阅读</button></div></header><div class="gallery ${s.layout}">${imageHtml(p,s)}</div></section>`}).join('');
const priority=cases[0];document.getElementById('priorityMount').innerHTML=`<article class="v-case case-shell" id="case-ucl01"><header class="v-case-title"><div><span class="v-label">01 / FEATURED PROJECT</span><h2>${priority.title}</h2></div><p>主副图设计 / A+ 视觉与场景表达<br>${priority.sections[0].images.length} 张主副图 · ${priority.sections[1].images.length} 张 A+ 内容</p></header>${sections(priority)}</article>`;
const details=p=>`<details class="archive-case" id="case-${p.id}"><summary><figure><img data-media-src="${p.cover}" alt="${p.title}项目预览" loading="lazy"></figure><div class="archive-copy"><small>${p.label}</small><h3>${p.title}</h3><p>${p.description}</p></div><span class="v-expand" aria-hidden="true">＋</span></summary><div class="archive-content">${sections(p)}</div></details>`;
document.getElementById('cabinetMount').innerHTML=extras.map(details).join('');document.getElementById('archiveMount').innerHTML=cases.slice(1).map(details).join('');
function revealHash(){const id=decodeURIComponent(location.hash.slice(1));if(!id)return;const target=document.getElementById(id);if(!target)return;const detail=target.closest('details');if(detail)detail.open=true;requestAnimationFrame(()=>target.scrollIntoView({block:'start'}))}addEventListener('hashchange',revealHash);addEventListener('DOMContentLoaded',revealHash);

