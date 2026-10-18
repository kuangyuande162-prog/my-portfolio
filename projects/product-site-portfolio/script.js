const assetSeries = (folder, count) => Array.from({ length: count }, (_, index) => {
  const number = String(index + 1).padStart(2, '0');
  return [`${folder}/${number}.webp`, number];
});

const cases = [
  { id: 'ucl01', number: '01 / PRIORITY CASE', title: 'UCL01 2.0 · 橱柜感应灯', description: '围绕运动感应、三色温、续航、磁吸安装与多空间应用建立完整 Listing。先用主图与功能辅图快速建立认知，再由 A+ 模块展开功能、结构、安装与场景。', tags: ['Motion Sensor', '3 Color Temperatures', 'Rechargeable', 'Main Images', 'A+ Content'], sections: [
    { eyebrow: 'MAIN & SECONDARY IMAGES', title: '主图与功能辅图', note: '01—09 / Listing image system', layout: 'main-grid', images: assetSeries('assets/ucl01/main', 9) },
    { eyebrow: 'A+ CONTENT', title: 'A+ 完整模块', note: '01—14 / Story, function & specification', layout: 'aplus-stack', images: assetSeries('assets/ucl01/aplus', 14) }
  ]},
  { id: 'nl01', number: '02 / MOTION STUDY', title: 'NL01 · 楼梯感应灯', description: '从视频素材中提取完整使用路径：人物进入感应区、灯光逐级亮起、人物经过并离开、空间恢复。连续帧用于解释静态图片难以呈现的动态功能。', tags: ['Storyboard', 'Motion Path', 'Night Scene', 'Video Frames', 'Lighting Mood'], sections: [
    { eyebrow: 'MOTION CONTENT', title: '动态素材关键帧', note: '01—05 / Sensor lighting sequence', layout: 'motion-grid', images: assetSeries('assets/nl01', 5) }
  ]},
  { id: 'tl01', number: '03 / TABLE LAMP', title: 'TL01 · 无线台灯', description: '以温暖家居氛围建立生活方式视觉，同时完整保留触控调光、便携、续航、充电、尺寸与使用场景等购买信息。', tags: ['Lifestyle', 'Cordless', 'Touch Dimming', 'Battery', 'A+ Content'], sections: [
    { eyebrow: 'MAIN & SECONDARY IMAGES', title: '主图与功能辅图', note: '01—11 / Listing image system', layout: 'main-grid', images: assetSeries('assets/tl01/main', 11) },
    { eyebrow: 'A+ CONTENT', title: 'A+ 完整模块', note: '01—14 / Lifestyle & product detail', layout: 'aplus-stack', images: assetSeries('assets/tl01/aplus', 14) }
  ]},
  { id: 'pl02', number: '04 / PICTURE LIGHT', title: 'PL02 · 画灯场景系统', description: '通过不同家居风格、画作比例与空间光线，完整展示画灯在楼梯、书桌、浴室、客厅与卧室中的适配性。', tags: ['Picture Light', 'Interior Styling', 'Scene Rendering', 'Scale', 'Application'], sections: [
    { eyebrow: 'MAIN & SECONDARY IMAGES', title: '主图与场景辅图', note: '01—07 / Listing image system', layout: 'main-grid', images: assetSeries('assets/pl02/main', 7) },
    { eyebrow: 'A+ CONTENT', title: 'A+ 完整模块', note: '01—08 / Interior applications', layout: 'aplus-stack', images: assetSeries('assets/pl02/aplus', 8) }
  ]},
  { id: 'wl05', number: '05 / WALL LIGHT', title: 'WL05 · 无线壁灯', description: '以暖金材质与深色家居场景建立统一调性，完整呈现免布线安装、磁吸拆卸、定时、调光、三色温与 RGB 氛围功能。', tags: ['Wall Light', 'No Wiring', 'Magnetic', 'Timer', 'RGB Mood'], sections: [
    { eyebrow: 'MAIN & SECONDARY IMAGES', title: '主图与功能辅图', note: '01—09 / Listing image system', layout: 'main-grid', images: assetSeries('assets/wl05/main', 9) },
    { eyebrow: 'A+ CONTENT', title: 'A+ 完整模块', note: '01—12 / Installation, function & mood', layout: 'aplus-stack', images: assetSeries('assets/wl05/aplus', 12) }
  ]}
];

const mount = document.querySelector('#caseMount');
const lightbox = document.querySelector('#lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxCaption = lightbox.querySelector('p');

const renderImages = (item, section) => section.images.map(([src, number]) => `
  <button class="gallery-item" type="button" data-src="${src}" data-label="${item.title} · ${section.title} ${number}">
    <img src="${src}" alt="${item.title} ${section.title} ${number}" loading="lazy">
    <span>${number}</span>
  </button>`).join('');

mount.innerHTML = cases.map(item => `
  <article class="case-shell" id="case-${item.id}">
    <header class="case-intro">
      <div><span class="case-number">${item.number}</span><h3>${item.title}</h3><p>${item.description}</p></div>
      <div class="case-tags">${item.tags.map(tag => `<span>${tag}</span>`).join('')}</div>
    </header>
    ${item.sections.map(section => `
      <section class="case-section">
        <header class="case-section-head"><div><span>${section.eyebrow}</span><h4>${section.title}</h4></div><p>${section.note}</p></header>
        <div class="gallery ${section.layout}">${renderImages(item, section)}</div>
      </section>`).join('')}
  </article>`).join('');

mount.querySelectorAll('.gallery-item').forEach(button => button.addEventListener('click', () => {
  lightboxImage.src = button.dataset.src;
  lightboxImage.alt = button.dataset.label;
  lightboxCaption.textContent = button.dataset.label;
  lightbox.showModal();
}));

lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });
