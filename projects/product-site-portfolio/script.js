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
    description: '围绕运动感应、三色温、续航、磁吸安装与多空间应用组织完整 Listing。主图负责快速识别，功能辅图解释购买信息，A+ 继续展开结构、安装与场景。',
    cover: 'assets/ucl01/main/01.webp',
    facts: ['主图与功能辅图 09', 'A+ 内容 14', '感应 / 色温 / 续航 / 安装'],
    sections: [
      { eyebrow: 'LISTING IMAGES', title: '主图与功能辅图', note: '01—09', layout: 'main-grid', images: assetSeries('assets/ucl01/main', 9) },
      { eyebrow: 'A+ CONTENT', title: 'A+ 完整内容', note: '01—14', layout: 'aplus-stack', images: assetSeries('assets/ucl01/aplus', 14) }
    ]
  },
  {
    id: 'nl01',
    number: '02',
    label: 'MOTION STUDY',
    title: 'NL01 · 楼梯感应灯',
    shortTitle: '楼梯感应灯',
    description: '从动态素材提取完整使用路径：人物进入感应区、灯光逐级亮起、人物经过并离开。连续帧用于解释静态图片难以呈现的动态功能。',
    cover: 'assets/nl01/03.webp',
    facts: ['动态关键帧 05', '感应路径', '夜间场景'],
    sections: [
      { eyebrow: 'MOTION CONTENT', title: '动态素材关键帧', note: '01—05', layout: 'motion-grid', images: assetSeries('assets/nl01', 5) }
    ]
  },
  {
    id: 'tl01',
    number: '03',
    label: 'LIFESTYLE LIGHTING',
    title: 'TL01 · 无线台灯',
    shortTitle: '无线台灯',
    description: '以温暖家居氛围建立生活方式视觉，并完整保留触控调光、便携、续航、充电、尺寸与使用场景等购买信息。',
    cover: 'assets/tl01/main/03.webp',
    facts: ['主图与功能辅图 11', 'A+ 内容 14', '生活方式 / 触控 / 续航'],
    sections: [
      { eyebrow: 'LISTING IMAGES', title: '主图与功能辅图', note: '01—11', layout: 'main-grid', images: assetSeries('assets/tl01/main', 11) },
      { eyebrow: 'A+ CONTENT', title: 'A+ 完整内容', note: '01—14', layout: 'aplus-stack', images: assetSeries('assets/tl01/aplus', 14) }
    ]
  },
  {
    id: 'pl02',
    number: '04',
    label: 'INTERIOR APPLICATION',
    title: 'PL02 · 画灯场景系统',
    shortTitle: '画灯',
    description: '通过不同家居风格、画作比例与空间光线，展示画灯在楼梯、书桌、浴室、客厅与卧室中的适配性。',
    cover: 'assets/pl02/main/02.webp',
    facts: ['主图与场景辅图 07', 'A+ 内容 08', '空间 / 比例 / 安装'],
    sections: [
      { eyebrow: 'LISTING IMAGES', title: '主图与场景辅图', note: '01—07', layout: 'main-grid', images: assetSeries('assets/pl02/main', 7) },
      { eyebrow: 'A+ CONTENT', title: 'A+ 完整内容', note: '01—08', layout: 'aplus-stack', images: assetSeries('assets/pl02/aplus', 8) }
    ]
  },
  {
    id: 'wl05',
    number: '05',
    label: 'WALL LIGHTING',
    title: 'WL05 · 无线壁灯',
    shortTitle: '无线壁灯',
    description: '以暖金材质与深色家居场景建立统一调性，呈现免布线安装、磁吸拆卸、定时、调光、三色温与 RGB 氛围功能。',
    cover: 'assets/wl05/main/01.webp',
    facts: ['主图与功能辅图 09', 'A+ 内容 12', '磁吸 / 定时 / RGB'],
    sections: [
      { eyebrow: 'LISTING IMAGES', title: '主图与功能辅图', note: '01—09', layout: 'main-grid', images: assetSeries('assets/wl05/main', 9) },
      { eyebrow: 'A+ CONTENT', title: 'A+ 完整内容', note: '01—12', layout: 'aplus-stack', images: assetSeries('assets/wl05/aplus', 12) }
    ]
  }
];

const priorityMount = document.querySelector('#priorityMount');
const archiveMount = document.querySelector('#archiveMount');
const lightbox = document.querySelector('#lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxCaption = lightbox.querySelector('p');
let galleryButtons = [];
let activeImageIndex = 0;

const renderImages = (item, section) => section.images.map(([src, number]) => `
  <button class="gallery-item" type="button" data-src="${src}" data-label="${item.title} · ${section.title} ${number}">
    <img src="${src}" alt="${item.title} ${section.title} ${number}" loading="lazy" decoding="async">
    <span>${number}</span>
  </button>`).join('');

const renderSections = item => item.sections.map(section => `
  <section class="case-section">
    <header class="case-section-head">
      <div><span>${section.eyebrow}</span><h4>${section.title}</h4></div>
      <p>${section.note}</p>
    </header>
    <div class="gallery ${section.layout}">${renderImages(item, section)}</div>
  </section>`).join('');

const priority = cases[0];
priorityMount.innerHTML = `
  <article class="case-shell priority-case" id="case-${priority.id}">
    <header class="case-intro">
      <div class="case-heading"><span>${priority.number} / ${priority.label}</span><h3>${priority.title}</h3></div>
      <p>${priority.description}</p>
      <ul>${priority.facts.map(fact => `<li>${fact}</li>`).join('')}</ul>
    </header>
    ${renderSections(priority)}
  </article>`;

archiveMount.innerHTML = cases.slice(1).map(item => `
  <details class="archive-case" id="case-${item.id}">
    <summary>
      <span class="archive-number">${item.number}</span>
      <figure><img src="${item.cover}" alt="${item.title}项目封面" loading="lazy" decoding="async"></figure>
      <div class="archive-copy">
        <small>${item.label}</small>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <ul>${item.facts.map(fact => `<li>${fact}</li>`).join('')}</ul>
      </div>
      <span class="archive-action"><b>展开完整项目</b><i>＋</i></span>
    </summary>
    <div class="archive-content">${renderSections(item)}</div>
  </details>`).join('');

const refreshGalleryButtons = () => {
  galleryButtons = [...document.querySelectorAll('.gallery-item')];
};
refreshGalleryButtons();

const openImage = index => {
  const button = galleryButtons[index];
  if (!button) return;
  activeImageIndex = index;
  lightboxImage.src = button.dataset.src;
  lightboxImage.alt = button.dataset.label;
  lightboxCaption.textContent = `${button.dataset.label} · ${index + 1} / ${galleryButtons.length}`;
};

document.addEventListener('click', event => {
  const button = event.target.closest('.gallery-item');
  if (!button) return;
  openImage(galleryButtons.indexOf(button));
  lightbox.showModal();
});

lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.querySelector('.lightbox-prev').addEventListener('click', () => openImage((activeImageIndex - 1 + galleryButtons.length) % galleryButtons.length));
lightbox.querySelector('.lightbox-next').addEventListener('click', () => openImage((activeImageIndex + 1) % galleryButtons.length));
lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });
lightbox.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') openImage((activeImageIndex - 1 + galleryButtons.length) % galleryButtons.length);
  if (event.key === 'ArrowRight') openImage((activeImageIndex + 1) % galleryButtons.length);
});

document.querySelectorAll('.archive-case').forEach(detail => {
  detail.addEventListener('toggle', () => {
    const label = detail.querySelector('.archive-action b');
    const icon = detail.querySelector('.archive-action i');
    label.textContent = detail.open ? '收起完整项目' : '展开完整项目';
    icon.textContent = detail.open ? '－' : '＋';
  });
});

document.querySelectorAll('.project-rail a').forEach(link => {
  link.addEventListener('click', () => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target?.tagName === 'DETAILS') target.open = true;
  });
});

const railLinks = [...document.querySelectorAll('.project-rail a')];
const observedCases = cases.map(item => document.querySelector(`#case-${item.id}`)).filter(Boolean);
const observer = new IntersectionObserver(entries => {
  const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  railLinks.forEach(link => link.classList.toggle('is-active', link.getAttribute('href') === `#${visible.target.id}`));
}, { rootMargin: '-28% 0px -58% 0px', threshold: [0, .1, .35] });
observedCases.forEach(section => observer.observe(section));

