/* ============================================
   行桌 — 游戏状态管理 & 页面路由
   ============================================ */

/* -------- 状态 -------- */
const state = {
  currentScreen: 'home',       // home | detail | game | achievement
  currentDetailTab: 'story',    // story | knowledge | star-map
  currentConstellation: null,      // 当前查看/游戏的星座 id
  gameScore: 0,
  gameConnected: [],              // 游戏中已连接的星点索引数组
  gameCurrentTarget: null,        // 当前正在拖拽的星点
  gameProgress: 0,               // 当前游戏连接进度（已连几条边）
  gameTotalEdges: 0,             // 当前星座总边数
  gameFinished: false,
};

/* -------- 屏幕切换 -------- */
function switchScreen(screenName, direction = 'left') {
  const screens = document.querySelectorAll('.screen');
  screens.forEach(s => {
    s.classList.remove('active', 'screen-exit');
    if (s.id === `screen-${screenName}`) {
      // 先设置退场状态（非active页面）
    } else {
      s.classList.add('screen-exit');
    }
  });

  // 等一小段时间后激活目标屏幕
  setTimeout(() => {
    screens.forEach(s => {
      s.classList.remove('active', 'screen-exit');
    });
    const target = document.getElementById(`screen-${screenName}`);
    if (target) {
      target.classList.add('active');
    }
    state.currentScreen = screenName;

    // 进入页面后刷新内容
    if (screenName === 'home') renderHome();
    if (screenName === 'achievement') renderAchievement();
    if (screenName === 'detail') renderDetail();
    if (screenName === 'game') initGame();
  }, 80);
}

/* -------- 底部导航 -------- */
function initNav() {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      const target = item.dataset.screen;
      if (target === state.currentScreen) return;
      document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
      item.classList.add('active');
      playSound('navigate');
      switchScreen(target);
    });
  });
}

/* -------- 首页渲染 -------- */
function renderHome() {
  // 精选星座（前4个）
  const featured = CONSTELLATIONS.slice(0, 4);
  renderCardRow('featured-row1', featured.slice(0, 2));
  renderCardRow('featured-row2', featured.slice(2, 4));

  // 全部星座网格（按难度排序：低难度在前）
  const sorted = [...CONSTELLATIONS].sort((a, b) => a.difficulty - b.difficulty);
  renderConstellationGrid('constellation-grid', sorted);

  // 搜索功能
  initSearch();

  // 渲染难度进度指示器
  renderProgressTiers();
}

function renderProgressTiers() {
  const container = document.getElementById('progress-tiers');
  const hint = document.getElementById('progress-hint');
  if (!container) return;

  container.innerHTML = '';
  const tiers = [
    { diff: 1, label: '入门', emoji: '🌟' },
    { diff: 2, label: '进阶', emoji: '🌟🌟' },
    { diff: 3, label: '挑战', emoji: '🌟🌟🌟' },
    { diff: 4, label: '大师', emoji: '🌟🌟🌟🌟' },
  ];

  let nextHint = '';

  tiers.forEach(({ diff, label, emoji }) => {
    const unlocked = isTierUnlocked(diff);
    const tierEl = document.createElement('div');
    tierEl.className = `progress-tier ${unlocked ? 'unlocked' : 'locked'}`;
    tierEl.innerHTML = `
      <span class="tier-name">${label}</span>
      <span class="tier-stars">${getDifficultyStars(diff)}</span>
      <span class="${unlocked ? 'tier-icon-unlocked' : 'tier-icon-locked'}">
        ${unlocked ? '✅' : '🔒'}
      </span>
    `;
    container.appendChild(tierEl);

    if (!unlocked && !nextHint) {
      const needed = diff === 2 ? 3 : diff === 3 ? 5 : 3;
      const completed = getCompletedCountByDifficulty(diff - 1);
      nextHint = `再完成 ${needed - completed} 个${getTierName(diff - 1)}星座，即可解锁「${label}」！`;
    }
  });

  if (hint) {
    const allUnlocked = tiers.every(t => isTierUnlocked(t.diff));
    hint.textContent = allUnlocked ? '🎉 全部难度已解锁，尽情探索吧！' : (nextHint || '');
  }
}

function renderCardRow(containerId, constellations) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  constellations.forEach(c => {
    const card = createConstellationCard(c, 'large');
    container.appendChild(card);
  });
}

function renderConstellationGrid(containerId, constellations) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  constellations.forEach(c => {
    const card = createConstellationCard(c, 'grid');
    container.appendChild(card);
  });
}

function createConstellationCard(c, size = 'grid') {
  const unlocked = isConstellationUnlocked(c.id);
  const explored = isExplored(c.id);
  const locked = !unlocked;
  const diffStars = getDifficultyStars(c.difficulty);
  const diffLabel = getDifficultyLabel(c.difficulty);

  const card = document.createElement('div');
  card.className = `constellation-card ${size === 'grid' ? 'grid-card' : ''} ${locked ? 'locked' : ''} ${explored ? 'explored' : ''}`;

  let statusIcon = '';
  if (locked) {
    statusIcon = '🔒';
  } else if (explored) {
    statusIcon = '⭐';
  } else {
    statusIcon = diffStars;
  }

  card.innerHTML = `
    <div class="card-status">${statusIcon}</div>
    <div class="card-name">${c.name}</div>
    <div class="card-difficulty">
      <span class="difficulty-stars">${diffStars}</span>
      <span class="difficulty-label">${diffLabel}</span>
    </div>
    ${size === 'large' ? `<div class="card-count">${c.starsCount}颗主星</div>` : ''}
    ${locked ? `<div class="card-lock-hint">${getLockHint(c.difficulty)}</div>` : ''}
  `;

  if (locked) {
    card.addEventListener('click', () => {
      playSound('wrong');
      showToast(getLockHint(c.difficulty));
    });
  } else {
    card.addEventListener('click', () => {
      state.currentConstellation = c.id;
      playSound('click');
      switchScreen('detail');
    });
  }
  return card;
}

function getLockHint(diff) {
  if (diff <= 1) return '';
  const tierNames = ['', '入门', '进阶', '挑战', '大师'];
  const needed = diff === 2 ? 3 : diff === 3 ? 5 : 3;
  const completed = getCompletedCountByDifficulty(diff - 1);
  const remaining = needed - completed;
  if (remaining <= 0) return ''; // should not happen if isTierUnlocked is correct
  return `需先完成 ${remaining} 个${tierNames[diff - 1]}星座`;
}

/* -------- 搜索 -------- */
function initSearch() {
  const input = document.getElementById('search-input');
  if (!input) return;
  // 避免重复绑定
  input.oninput = () => {
    const q = input.value.trim().toLowerCase();
    if (!q) {
      renderConstellationGrid('constellation-grid', CONSTELLATIONS);
      return;
    }
    const filtered = CONSTELLATIONS.filter(c =>
      c.name.includes(q) ||
      c.pinyin.toLowerCase().includes(q) ||
      c.englishName.toLowerCase().includes(q)
    );
    renderConstellationGrid('constellation-grid', filtered);
  };
}

/* -------- 详情页渲染 -------- */
function renderDetail() {
  const c = CONSTELLATION_MAP[state.currentConstellation];
  if (!c) return;

  document.getElementById('detail-name').textContent = c.name;
  document.getElementById('detail-pinyin').textContent = c.pinyin;

  // 绘制星图
  drawStarMap('detail-star-canvas', c, false);

  // 渲染 Tab 内容
  renderTabContent(c);

  // Tab 切换
  initDetailTabs();

  // 游戏按钮
  const btn = document.getElementById('btn-launch-game');
  if (btn) {
    const unlocked = isConstellationUnlocked(c.id);
    if (unlocked) {
      btn.disabled = false;
      btn.style.opacity = '1';
      btn.style.pointerEvents = 'auto';
      btn.onclick = () => {
        state.currentConstellation = c.id;
        playSound('start');
        switchScreen('game');
      };
    } else {
      btn.disabled = true;
      btn.style.opacity = '0.5';
      btn.style.pointerEvents = 'none';
      btn.onclick = null;
    }
  }

  // 锁定提示
  let lockTip = document.getElementById('detail-lock-tip');
  if (!lockTip) {
    lockTip = document.createElement('div');
    lockTip.id = 'detail-lock-tip';
    lockTip.style.cssText = 'text-align:center;color:#f59e0b;font-size:13px;margin:8px 0;min-height:20px;';
    const btnArea = document.querySelector('.btn-launch-wrap') || btn?.parentElement;
    if (btnArea) btnArea.parentElement.insertBefore(lockTip, btnArea.nextSibling);
  }
  if (!isConstellationUnlocked(c.id)) {
    lockTip.textContent = getLockHint(c.difficulty) || '该星座尚未解锁，继续努力吧！🌟';
    lockTip.style.display = 'block';
  } else {
    lockTip.style.display = 'none';
  }

  // 返回按钮
  const backBtn = document.getElementById('btn-detail-back');
  if (backBtn) {
    backBtn.onclick = () => { playSound('navigate'); switchScreen('home'); };
  }
}

function renderTabContent(c) {
  const container = document.getElementById('detail-content');
  if (!container) return;

  if (state.currentDetailTab === 'story') {
    container.innerHTML = `
      <div class="content-card">
        <div class="content-card-title">📖 ${c.name}的传说</div>
        <div class="content-card-text">${c.story.replace(/\n/g, '<br><br>')}</div>
      </div>
      <div class="fun-fact-card">
        <div class="fun-fact-emoji">💡</div>
        <div class="fun-fact-content">
          <div class="fun-fact-label">你知道吗？</div>
          <div class="fun-fact-text">${c.funFacts[0]}</div>
        </div>
      </div>
    `;
  } else if (state.currentDetailTab === 'knowledge') {
    container.innerHTML = c.funFacts.map((fact, i) => `
      <div class="fun-fact-card">
        <div class="fun-fact-emoji">${['💡','🔭','🌟'][i] || '💡'}</div>
        <div class="fun-fact-content">
          <div class="fun-fact-label">趣味知识 ${i + 1}</div>
          <div class="fun-fact-text">${fact}</div>
        </div>
      </div>
    `).join('');
  } else if (state.currentDetailTab === 'star-map') {
    container.innerHTML = `
      <div class="star-map-container">
        <canvas id="detail-star-map-canvas" width="280" height="280"></canvas>
      </div>
      <div class="content-card">
        <div class="content-card-title">🌟 观测指南</div>
        <div class="content-card-text">
          最佳观测月份：${getBestMonth(c.englishName)}<br>
          难度：${'★'.repeat(c.difficulty)}${'☆'.repeat(5 - c.difficulty)}<br>
          主星数量：${c.starsCount} 颗
        </div>
      </div>
    `;
    setTimeout(() => {
      const cvs = document.getElementById('detail-star-map-canvas');
      if (cvs) drawStarMapCanvas(cvs, c, true);
    }, 50);
  }
}

function getBestMonth(englishName) {
  const monthMap = {
    'Orion': '12月 - 3月（冬季）',
    'Ursa Major': '3月 - 8月（春夏季）',
    'Ursa Minor': '全年可见（拱极星座）',
    'Cassiopeia': '9月 - 1月（秋冬季）',
    'Cygnus': '7月 - 10月（夏季）',
    'Leo': '3月 - 5月（春季）',
    'Scorpius': '6月 - 8月（夏季）',
    'Gemini': '12月 - 2月（冬季）',
    'Taurus': '11月 - 1月（冬季）',
    'Aquila': '7月 - 9月（夏季）',
    'Pegasus': '9月 - 11月（秋季）',
    'Andromeda': '10月 - 12月（秋季）',
    'Perseus': '10月 - 12月（秋季）',
    'Virgo': '4月 - 6月（春季）',
    'Canis Major': '12月 - 2月（冬季）',
    'Sagittarius': '7月 - 9月（夏季）',
    'Aquarius': '8月 - 10月（夏秋季）',
    'Pisces': '9月 - 11月（秋季）',
    'Capricornus': '8月 - 10月（夏秋季）',
    'Libra': '5月 - 7月（春夏季）',
    'Draco': '全年可见（拱极星座）',
  };
  return monthMap[englishName] || '全年可见';
}

function initDetailTabs() {
  document.querySelectorAll('#detail-tab-bar .tab-item').forEach(tab => {
    tab.onclick = () => {
      document.querySelectorAll('#detail-tab-bar .tab-item').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.currentDetailTab = tab.dataset.tab;
      playSound('click');
      const c = CONSTELLATION_MAP[state.currentConstellation];
      renderTabContent(c);
    };
  });
}

/* -------- 星图绘制 -------- */
function drawStarMap(canvasId, constellation, showLines = false) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  drawStarMapCanvas(canvas, constellation, showLines);
}

function drawStarMapCanvas(canvas, c, showLines) {
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  const w = rect.width;
  const h = rect.height;

  // 清除
  ctx.clearRect(0, 0, w, h);

  // 画背景星点（装饰）
  drawBackgroundStars(ctx, w, h);

  // 计算缩放和偏移，让星座填满画布
  const padding = 30;
  const stars = c.stars;
  const xs = stars.map(s => s.x);
  const ys = stars.map(s => s.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const scaleX = (w - padding * 2) / (maxX - minX || 1);
  const scaleY = (h - padding * 2) / (maxY - minY || 1);
  const scale = Math.min(scaleX, scaleY);
  const offsetX = (w - (maxX + minX) * scale) / 2;
  const offsetY = (h - (maxY + minY) * scale) / 2;

  function tx(x) { return x * scale + offsetX; }
  function ty(y) { return y * scale + offsetY; }

  // 画连线
  if (showLines && c.lines) {
    ctx.strokeStyle = '#FBBF24';
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.7;
    ctx.shadowColor = 'rgba(251, 191, 36, 0.5)';
    ctx.shadowBlur = 8;
    c.lines.forEach(([i, j]) => {
      if (c.stars[i] && c.stars[j]) {
        ctx.beginPath();
        ctx.moveTo(tx(c.stars[i].x), ty(c.stars[i].y));
        ctx.lineTo(tx(c.stars[j].x), ty(c.stars[j].y));
        ctx.stroke();
      }
    });
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
  }

  // 画星点
  stars.forEach((s, idx) => {
    const x = tx(s.x);
    const y = ty(s.y);
    // 光晕
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, 12);
    gradient.addColorStop(0, 'rgba(251, 191, 36, 0.5)');
    gradient.addColorStop(1, 'rgba(251, 191, 36, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, 12, 0, Math.PI * 2);
    ctx.fill();

    // 星点核心
    ctx.fillStyle = '#FBBF24';
    ctx.shadowColor = 'rgba(251, 191, 36, 0.8)';
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // 星号标签
    ctx.fillStyle = '#94A3B8';
    ctx.font = '10px Nunto, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(idx + 1, x, y - 12);
  });
}

function drawBackgroundStars(ctx, w, h) {
  // 使用固定种子生成装饰星点
  const seed = 42;
  function seededRandom(i) {
    const x = Math.sin(seed + i * 12.9898) * 43758.5453;
    return x - Math.floor(x);
  }
  for (let i = 0; i < 60; i++) {
    const x = seededRandom(i) * w;
    const y = seededRandom(i + 100) * h;
    const r = seededRandom(i + 200) * 1.5 + 0.3;
    const alpha = seededRandom(i + 300) * 0.4 + 0.1;
    ctx.fillStyle = `rgba(248, 250, 252, ${alpha})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
}

/* -------- 游戏逻辑 -------- */
function initGame() {
  const c = CONSTELLATION_MAP[state.currentConstellation] || CONSTELLATIONS[0];
  state.currentConstellation = c.id;
  state.gameProgress = 0;
  state.gameConnected = [];
  state.gameFinished = false;
  state.gameTotalEdges = c.lines.length;

  document.getElementById('game-constellation-name').textContent = `✦ ${c.name}`;
  document.getElementById('game-score').textContent = getScore();
  updateGameProgress();

  // 清除上一局残留的轮廓图
  removeSilhouetteImg();

  drawGameCanvas(c, 0);

  // 返回按钮
  const backBtn = document.getElementById('btn-game-back');
  if (backBtn) {
    backBtn.onclick = () => { playSound('navigate'); switchScreen('detail'); };
  }

  // 完成按钮
  const completeBtn = document.getElementById('btn-game-complete');
  if (completeBtn) {
    completeBtn.onclick = finishGame;
    completeBtn.classList.add('disabled');
  }

  // 重置 canvas 交互
  initGameInteraction(c);
}

function drawGameCanvas(c, silhouetteAlpha = 0) {
  const canvas = document.getElementById('game-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  canvas.style.width = rect.width + 'px';
  canvas.style.height = rect.height + 'px';
  ctx.scale(dpr, dpr);
  const w = rect.width;
  const h = rect.height;

  ctx.clearRect(0, 0, w, h);
  drawBackgroundStars(ctx, w, h);

  // 计算布局
  const padding = 40;
  const stars = c.stars;
  const xs = stars.map(s => s.x);
  const ys = stars.map(s => s.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const scaleX = (w - padding * 2) / (maxX - minX || 1);
  const scaleY = (h - padding * 2) / (maxY - minY || 1);
  const scale = Math.min(scaleX, scaleY) * 0.85;
  const offsetX = (w - (maxX + minX) * scale) / 2;
  const offsetY = (h - (maxY + minY) * scale) / 2;

  // 存储计算后的坐标供交互使用
  canvas._starPositions = stars.map(s => ({
    x: s.x * scale + offsetX,
    y: s.y * scale + offsetY,
    radius: 16,
  }));
  canvas._constellation = c;
  canvas._scale = scale;
  canvas._offsetX = offsetX;
  canvas._offsetY = offsetY;

  // ---- 第一层：卡通轮廓（在线和星点之下） ----
  if (silhouetteAlpha > 0 && c.silhouette) {
    drawSilhouette(ctx, c, scale, offsetX, offsetY, minX, minY, silhouetteAlpha);
  }

  // 画已连线
  ctx.strokeStyle = '#FBBF24';
  ctx.lineWidth = 3;
  ctx.shadowColor = 'rgba(251, 191, 36, 0.6)';
  ctx.shadowBlur = 10;
  ctx.globalAlpha = 0.8;
  state.gameConnected.forEach(([i, j]) => {
    const p1 = canvas._starPositions[i];
    const p2 = canvas._starPositions[j];
    if (p1 && p2) {
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    }
  });
  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;

  // 画星点
  canvas._starPositions.forEach((pos, idx) => {
    // 光晕
    const gradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 18);
    gradient.addColorStop(0, 'rgba(251, 191, 36, 0.4)');
    gradient.addColorStop(1, 'rgba(251, 191, 36, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 18, 0, Math.PI * 2);
    ctx.fill();

    // 星点（完成后已连接的高亮）
    const isConnected = state.gameFinished || state.gameConnected.some(
      ([a, b]) => a === idx || b === idx
    );
    ctx.fillStyle = isConnected ? '#FBBF24' : '#94A3B8';
    ctx.shadowColor = isConnected ? 'rgba(251, 191, 36, 0.9)' : 'transparent';
    ctx.shadowBlur = isConnected ? 10 : 0;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // 编号
    ctx.fillStyle = '#0F0F23';
    ctx.font = 'bold 11px Fredoka, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(idx + 1, pos.x, pos.y);
  });
}

/* -------- 卡通轮廓绘制 -------- */
function drawSilhouette(ctx, c, scale, offsetX, offsetY, minX, minY, alpha) {
  if (!c.silhouette) return;

  // 把数据坐标映射到画布坐标（与 drawGameCanvas 里的坐标系一致）
  function tx(x) { return x * scale + offsetX; }
  function ty(y) { return y * scale + offsetY; }

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.shadowColor = 'rgba(139, 92, 246, 0.9)';
  ctx.shadowBlur = 18 * alpha;
  ctx.fillStyle = 'rgba(139, 92, 246, 0.18)';
  ctx.strokeStyle = 'rgba(196, 181, 253, 0.85)';
  ctx.lineWidth = 3;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  // 把 silhouette 按 "M" 指令拆分为多段路径，每段单独 stroke
  const segments = [];
  let current = null;

  c.silhouette.forEach(seg => {
    const type = seg[0];
    if (type === 'circle') {
      // 单独处理圆形
      segments.push({ type: 'circle', cx: seg[1], cy: seg[2], r: seg[3] });
    } else if (type === 'M') {
      // 新段开始
      current = { cmds: [seg] };
      segments.push(current);
    } else if (current) {
      current.cmds.push(seg);
    }
  });

  // 先画填充区域（所有闭合段）
  segments.forEach(seg => {
    if (seg.type === 'circle') {
      ctx.beginPath();
      ctx.arc(tx(seg.cx), ty(seg.cy), seg.r * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    } else {
      ctx.beginPath();
      let hasZ = false;
      seg.cmds.forEach(cmd => {
        const t = cmd[0];
        if (t === 'M') ctx.moveTo(tx(cmd[1]), ty(cmd[2]));
        else if (t === 'L') ctx.lineTo(tx(cmd[1]), ty(cmd[2]));
        else if (t === 'Q') ctx.quadraticCurveTo(tx(cmd[1]), ty(cmd[2]), tx(cmd[3]), ty(cmd[4]));
        else if (t === 'Z') { ctx.closePath(); hasZ = true; }
      });
      if (hasZ) ctx.fill();
      ctx.stroke();
    }
  });

  ctx.restore();
}

function initGameInteraction(c) {
  const canvas = document.getElementById('game-canvas');
  if (!canvas) return;

  let dragging = null;
  let dragLine = null; // {x1, y1, x2, y2}

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  }

  function findStar(pos) {
    if (!canvas._starPositions) return -1;
    return canvas._starPositions.findIndex(s =>
      Math.hypot(pos.x - s.x, pos.y - s.y) < s.radius + 8
    );
  }

  function isLineConnected(i, j) {
    return state.gameConnected.some(
      ([a, b]) => (a === i && b === j) || (a === j && b === i)
    );
  }

  function isLineInConstellation(i, j) {
    return c.lines.some(
      ([a, b]) => (a === i && b === j) || (a === j && b === i)
    );
  }

  canvas.ontouchstart = canvas.onmousedown = function(e) {
    if (state.gameFinished) return;
    e.preventDefault();
    const pos = getPos(e);
    const starIdx = findStar(pos);
    if (starIdx >= 0) {
      dragging = starIdx;
      playSound('select');
    }
  };

  canvas.ontouchmove = canvas.onmousemove = function(e) {
    if (dragging === null || state.gameFinished) return;
    e.preventDefault();
    const pos = getPos(e);
    const targetIdx = findStar(pos);

    // 实时重绘
    drawGameCanvas(c, 0);
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // 画拖拽线
    const p1 = canvas._starPositions[dragging];
    ctx.strokeStyle = targetIdx >= 0 && targetIdx !== dragging ? '#8B5CF6' : '#555';
    ctx.lineWidth = 3;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    ctx.setLineDash([]);
  };

  canvas.ontouchend = canvas.onmouseup = function(e) {
    if (dragging === null || state.gameFinished) return;
    const pos = getPos(e);
    const targetIdx = findStar(pos);

    if (targetIdx >= 0 && targetIdx !== dragging) {
      // 检查是否是正确的连线
      if (isLineInConstellation(dragging, targetIdx)) {
        if (!isLineConnected(dragging, targetIdx)) {
          state.gameConnected.push([dragging, targetIdx]);
          state.gameProgress++;
          playSound('correct');
          playSound('score');
          addScore(20);
          updateGameProgress();
          drawGameCanvas(c);

          // 弹出部位标签气泡
          showStarLabel(canvas, targetIdx, c);

          // 检查是否完成
          if (state.gameProgress >= state.gameTotalEdges) {
            finishGame();
          }
        }
      } else {
        // 错误连线，抖动提示
        playSound('wrong');
        shakeCanvas(canvas);
      }
    }

    dragging = null;
    drawGameCanvas(c, 0);
  };
}

function updateGameProgress() {
  const label = document.getElementById('game-progress-label');
  const fill = document.getElementById('game-progress-fill');
  if (label) label.textContent = `进度 ${state.gameProgress} / ${state.gameTotalEdges}`;
  if (fill) {
    const pct = state.gameTotalEdges > 0 ? (state.gameProgress / state.gameTotalEdges) * 100 : 0;
    fill.style.width = pct + '%';
  }
  // 更新完成按钮状态
  const btn = document.getElementById('btn-game-complete');
  if (btn) {
    btn.classList.toggle('disabled', state.gameProgress < state.gameTotalEdges);
  }
}

function finishGame() {
  if (state.gameFinished) return;
  state.gameFinished = true;

  // 标记已探索
  markExplored(state.currentConstellation);
  playSound('win');
  addScore(50); // 通关奖励
  playSound('score');

  // 重绘最终连线（自动连完所有线）
  const c = CONSTELLATION_MAP[state.currentConstellation];
  if (c) {
    c.lines.forEach(([i, j]) => {
      if (!state.gameConnected.some(([a, b]) => (a === i && b === j) || (a === j && b === i))) {
        state.gameConnected.push([i, j]);
      }
    });

    // 先做轮廓淡入动画（1.2秒），再显示成功弹窗
    animateSilhouette(c);
    setTimeout(() => showGameSuccess(), 1400);
  } else {
    showGameSuccess();
  }
}

/* -------- Toast 提示 -------- */
function showToast(msg, duration = 2000) {
  let toast = document.getElementById('toast-msg');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-msg';
    toast.style.cssText = `
      position: fixed; bottom: 90px; left: 50%; transform: translateX(-50%);
      background: rgba(30,30,60,0.92); color: #fff;
      padding: 10px 24px; border-radius: 20px;
      font-size: 14px; font-family: 'Fredoka', sans-serif;
      z-index: 9999; opacity: 0; transition: opacity 0.3s;
      pointer-events: none; white-space: nowrap;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => { toast.style.opacity = '0'; }, duration);
}

function showGameSuccess() {
  const canvas = document.getElementById('game-canvas');
  if (!canvas) return;
  const c = CONSTELLATION_MAP[state.currentConstellation];
  const parent = canvas.parentElement;
  let overlay = parent.querySelector('.game-success-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'game-success-overlay';
    parent.appendChild(overlay);
  }
  overlay.innerHTML = `
    <div class="game-success-emoji">🎉</div>
    <div class="game-success-text">太棒了！</div>
    <div class="game-success-subtext">${c ? c.name.replace('座','') : '星座'}出现啦 ✨</div>
    <div class="game-success-score">+50 分！</div>
    <button class="game-success-btn" onclick="this.closest('.game-success-overlay').classList.remove('show'); setTimeout(()=>switchScreen('detail'),400);">继续探索 →</button>
  `;
  setTimeout(() => overlay.classList.add('show'), 100);

  // 5秒后自动消失并跳转
  setTimeout(() => {
    overlay.classList.remove('show');
    setTimeout(() => switchScreen('detail'), 500);
  }, 5000);
}

function shakeCanvas(canvas) {
  canvas.style.transition = 'transform 0.1s';
  canvas.style.transform = 'translateX(4px)';
  setTimeout(() => {
    canvas.style.transform = 'translateX(-4px)';
    setTimeout(() => {
      canvas.style.transform = 'translateX(0)';
    }, 100);
  }, 100);
}

/* -------- 星点部位标签气泡 -------- */
function showStarLabel(canvas, starIdx, c) {
  if (!c.stars[starIdx] || !c.stars[starIdx].label) return;
  const pos = canvas._starPositions && canvas._starPositions[starIdx];
  if (!pos) return;

  const parent = canvas.parentElement;
  const canvasRect = canvas.getBoundingClientRect();
  const parentRect = parent.getBoundingClientRect();

  // 计算气泡位置（相对于 parent）
  const bubbleX = canvasRect.left - parentRect.left + pos.x;
  const bubbleY = canvasRect.top - parentRect.top + pos.y - 40;

  const bubble = document.createElement('div');
  bubble.className = 'star-label-bubble';
  bubble.textContent = c.stars[starIdx].label;
  bubble.style.cssText = `
    position: absolute;
    left: ${bubbleX}px;
    top: ${bubbleY}px;
    transform: translateX(-50%) translateY(0px);
    background: #8B5CF6;
    color: #fff;
    font-size: 13px;
    font-family: 'Fredoka', sans-serif;
    padding: 5px 12px;
    border-radius: 20px;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s, transform 0.4s;
    z-index: 100;
    box-shadow: 0 4px 12px rgba(139,92,246,0.4);
  `;
  parent.appendChild(bubble);

  // 淡入 + 上浮
  requestAnimationFrame(() => {
    bubble.style.opacity = '1';
    bubble.style.transform = 'translateX(-50%) translateY(-10px)';
  });

  // 1.5秒后淡出消失
  setTimeout(() => {
    bubble.style.opacity = '0';
    bubble.style.transform = 'translateX(-50%) translateY(-20px)';
    setTimeout(() => bubble.remove(), 400);
  }, 1500);
}

/* -------- 卡通轮廓淡入动画 -------- */
function animateSilhouette(c) {
  // 优先方案：SVG 图片叠加（方案 B）
  if (c.imageFile) {
    playSound('reveal');
    animateSilhouetteImg(c);
    return;
  }
  // 降级方案：Canvas 轮廓（无 imageFile 时）
  if (!c.silhouette) return;
  const canvas = document.getElementById('game-canvas');
  if (!canvas) return;

  let alpha = 0;
  const target = 1;
  const duration = 1200;
  const startTime = performance.now();

  function step(now) {
    const elapsed = now - startTime;
    alpha = Math.min(elapsed / duration, target);
    const eased = 1 - Math.pow(1 - alpha, 3);
    drawGameCanvas(c, eased);
    if (alpha < target) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* -------- SVG 图片叠加动画（方案 B） -------- */
function animateSilhouetteImg(c) {
  const canvas = document.getElementById('game-canvas');
  if (!canvas) return;
  const parent = canvas.parentElement;

  // 移除旧图（防重复）
  const old = parent.querySelector('.constellation-silhouette-img');
  if (old) old.remove();

  // 计算画布区域尺寸
  const canvasRect = canvas.getBoundingClientRect();
  const parentRect = parent.getBoundingClientRect();
  const imgW = canvasRect.width * 0.72;
  const imgH = canvasRect.height * 0.88;
  const imgLeft = (canvasRect.left - parentRect.left) + (canvasRect.width - imgW) / 2;
  const imgTop  = (canvasRect.top  - parentRect.top)  + (canvasRect.height - imgH) / 2;

  const img = document.createElement('img');
  img.className = 'constellation-silhouette-img';
  img.src = `imgs/${c.imageFile}.svg`;
  img.style.cssText = `
    position: absolute;
    left: ${imgLeft}px;
    top: ${imgTop}px;
    width: ${imgW}px;
    height: ${imgH}px;
    pointer-events: none;
    opacity: 0;
    transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: 5;
    filter: drop-shadow(0 0 18px rgba(139,92,246,0.55));
  `;
  parent.appendChild(img);

  // 等图片加载完再淡入
  img.onload = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        img.style.opacity = '1';
      });
    });
  };
  // 如果已缓存（onload 不触发），直接淡入
  if (img.complete) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        img.style.opacity = '1';
      });
    });
  }
}

/* -------- 清理轮廓图（离开游戏时调用） -------- */
function removeSilhouetteImg() {
  const canvas = document.getElementById('game-canvas');
  if (!canvas) return;
  const img = canvas.parentElement.querySelector('.constellation-silhouette-img');
  if (img) img.remove();
}

/* -------- 音效（Web Audio API 合成，无需外部文件） -------- */
let audioCtx = null;
function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playSound(type) {
  try {
    const ctx = getAudioContext();
    const t = ctx.currentTime;
    let osc, gain;

    // 工具：单音
    const tone = (freq, startT, dur, vol, wavetype) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = wavetype || 'sine';
      o.frequency.setValueAtTime(freq, startT);
      g.gain.setValueAtTime(vol, startT);
      g.gain.exponentialRampToValueAtTime(0.001, startT + dur);
      o.connect(g).connect(ctx.destination);
      o.start(startT);
      o.stop(startT + dur);
    };

    // 工具：频率滑动音
    const sweep = (f0, f1, startT, dur, vol, wavetype) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = wavetype || 'sine';
      o.frequency.setValueAtTime(f0, startT);
      o.frequency.exponentialRampToValueAtTime(f1, startT + dur);
      g.gain.setValueAtTime(vol, startT);
      g.gain.exponentialRampToValueAtTime(0.001, startT + dur);
      o.connect(g).connect(ctx.destination);
      o.start(startT);
      o.stop(startT + dur);
    };

    // 工具：琶音序列
    const arpeggio = (notes, startT, noteDur, vol, wavetype) => {
      notes.forEach((freq, i) => {
        const st = startT + i * noteDur;
        tone(freq, st, noteDur * 2.5, vol, wavetype);
      });
    };

    switch (type) {
      case 'click':
        // 轻点击 — 短促 blip，带轻微噪声感
        osc = ctx.createOscillator();
        gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(900, t);
        osc.frequency.exponentialRampToValueAtTime(600, t + 0.05);
        gain.gain.setValueAtTime(0.06, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
        osc.connect(gain).connect(ctx.destination);
        osc.start(t); osc.stop(t + 0.07);
        break;

      case 'navigate':
        // 页面/导航切换 — 柔和上行
        sweep(400, 650, t, 0.13, 0.05, 'sine');
        break;

      case 'select':
        // 星点选中 — 明亮叮咚，双音叠加
        tone(880, t, 0.1, 0.09, 'sine');
        tone(1320, t + 0.04, 0.1, 0.06, 'sine');
        break;

      case 'start':
        // 游戏开始 — C-E-G-C 上行琶音
        arpeggio([523, 659, 784, 1047], t, 0.1, 0.1, 'triangle');
        break;

      case 'correct':
        // 正确连线 — C-E-G 大三和弦上行（triangle 波更柔和）
        osc = ctx.createOscillator();
        gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523, t);
        osc.frequency.setValueAtTime(659, t + 0.1);
        osc.frequency.setValueAtTime(784, t + 0.2);
        gain.gain.setValueAtTime(0.14, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.45);
        osc.connect(gain).connect(ctx.destination);
        osc.start(t); osc.stop(t + 0.45);
        break;

      case 'wrong':
        // 错误连线 — 低沉嗡鸣 + 噪声感
        osc = ctx.createOscillator();
        gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, t);
        osc.frequency.exponentialRampToValueAtTime(120, t + 0.25);
        gain.gain.setValueAtTime(0.05, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
        osc.connect(gain).connect(ctx.destination);
        osc.start(t); osc.stop(t + 0.3);
        break;

      case 'win':
        // 通关庆祝 — 胜利号角（C 大调上行）
        arpeggio([523, 659, 784, 1047, 784, 1047, 1319, 1568], t, 0.09, 0.12, 'triangle');
        // 叠加一个低音垫
        tone(262, t, 1.0, 0.04, 'sine');
        break;

      case 'reveal':
        // 轮廓魔法揭示 — 星光闪烁琶音
        arpeggio([660, 880, 1100, 1320, 1760], t, 0.12, 0.07, 'sine');
        // 叠加 shimmer
        sweep(2000, 4000, t + 0.1, 0.5, 0.03, 'sine');
        break;

      case 'score':
        // 分数获得 — 清脆双音
        tone(1200, t, 0.08, 0.1, 'sine');
        tone(1600, t + 0.06, 0.12, 0.08, 'sine');
        break;
    }
  } catch (e) { /* 静默失败 */ }
}

/* -------- 成就/图鉴渲染 -------- */
function renderAchievement() {
  const achieved = getExploredIds();
  document.getElementById('achievement-count').textContent = `${achieved.length} / ${CONSTELLATIONS.length}`;

  // 按难度分组渲染已解锁
  const tiersEl = document.getElementById('achieved-tiers');
  if (tiersEl) {
    tiersEl.innerHTML = '';
    const tierOrder = [1, 2, 3, 4];
    tierOrder.forEach(diff => {
      const tierAchieved = CONSTELLATIONS.filter(c => achieved.includes(c.id) && c.difficulty === diff);
      if (tierAchieved.length === 0) return;
      const section = document.createElement('div');
      section.className = 'achievement-tier';
      section.innerHTML = `
        <h2 class="section-title">${getTierEmoji(diff)} ${getTierName(diff)}（${tierAchieved.length}）</h2>
        <div class="achievement-grid" id="achieved-tier-${diff}"></div>
      `;
      tiersEl.appendChild(section);
      renderAchievementGrid(`achieved-tier-${diff}`, tierAchieved, true);
    });
  }

  // 未解锁（按难度排序）
  const lockedList = CONSTELLATIONS.filter(c => !achieved.includes(c.id));
  renderAchievementGrid('locked-grid', lockedList, false);

  // 返回按钮
  const backBtn = document.getElementById('btn-achievement-back');
  if (backBtn) {
    backBtn.onclick = () => { playSound('navigate'); switchScreen('home'); };
  }
}

function renderAchievementGrid(containerId, list, isUnlocked) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  list.forEach(c => {
    const card = document.createElement('div');
    card.className = `achievement-card ${isUnlocked ? '' : 'locked'}`;
    const stars = getDifficultyStars(c.difficulty);
    card.innerHTML = `
      <div class="card-star">${isUnlocked ? '⭐' : '🔒'}</div>
      <div class="card-name">${c.name}</div>
      <div class="card-difficulty" style="margin-top:2px">
        <span style="font-size:10px;color:#f59e0b">${stars}</span>
        <span style="font-size:10px;color:#94a3b8">${getDifficultyLabel(c.difficulty)}</span>
      </div>
      ${isUnlocked ? '' : `<div style="font-size:10px;color:#f59e0b;margin-top:2px">${getLockHint(c.difficulty)}</div>`}
    `;
    if (isUnlocked) {
      card.onclick = () => {
        state.currentConstellation = c.id;
        switchScreen('detail');
      };
    }
    container.appendChild(card);
  });
}

/* -------- 返回按钮（图鉴页） -------- */
function initBackButtons() {
  const ids = [
    ['btn-settings', null],
    ['btn-detail-back', 'home'],
    ['btn-game-back', 'detail'],
    ['btn-achievement-back', 'home'],
  ];
  ids.forEach(([btnId, target]) => {
    const btn = document.getElementById(btnId);
    if (btn && target) {
      btn.onclick = () => switchScreen(target);
    }
  });
}

/* -------- 初始化 -------- */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initBackButtons();
  renderHome();

  // 默认显示首页
  const home = document.getElementById('screen-home');
  if (home) home.classList.add('active');

  // 更新分数显示
  document.getElementById('game-score').textContent = getScore();
});
