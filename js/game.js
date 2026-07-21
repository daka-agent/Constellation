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
  /* 导航 */
  previousScreen: 'home',
  /* TTS 朗读 */
  ttsSpeaking: false,
  ttsPaused: false,
  ttsUtterance: null,
  ttsCurrentText: '',
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
    state.previousScreen = state.currentScreen;
    state.currentScreen = screenName;

    // 进入页面后刷新内容
    if (screenName === 'home') renderHome();
    if (screenName === 'sky-map') setTimeout(initSkyMap, 100); // 等待布局完成
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

  // 搜索 & 筛选（内部会渲染星座网格）
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

  card.innerHTML = `
    <div class="card-name">${c.name}</div>
    <div class="card-difficulty">
      ${locked ? '<span class="card-lock-icon">🔒</span>' : (explored ? '<span class="card-explored-icon">⭐</span>' : '')}
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

/* -------- 搜索 & 筛选 -------- */
const FILTER_STATE = {
  diff: 'all',
  season: 'all',
  status: 'all',
  sort: 'default',
  query: '',
};

let _filterChipsBound = false;

// 从 SKY_POSITIONS 构建星座→季节映射
function getConstellationSeason(cId) {
  const pos = SKY_POSITIONS[cId];
  return pos ? pos.group : 'unknown';
}

const SEASON_LABELS = {
  spring: '春季', summer: '夏季', autumn: '秋季',
  winter: '冬季', polar: '拱极', southern: '南天',
};

function initSearch() {
  const input = document.getElementById('search-input');
  if (!input) return;

  // 恢复输入框内容
  input.value = FILTER_STATE.query;

  // 搜索输入（防抖）
  let debounceTimer = null;
  input.oninput = () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      FILTER_STATE.query = input.value.trim().toLowerCase();
      applyFiltersAndRender();
    }, 200);
  };

  // 筛选芯片点击（只绑定一次）
  if (!_filterChipsBound) {
    _filterChipsBound = true;
    document.querySelectorAll('.filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const key = chip.dataset.key;
        const val = chip.dataset.val;

        // 同组切换 active
        const siblings = chip.parentElement.querySelectorAll('.filter-chip');
        siblings.forEach(s => s.classList.remove('active'));
        chip.classList.add('active');

        FILTER_STATE[key] = val;
        playSound('click');
        applyFiltersAndRender();
      });
    });
  }

  // 恢复筛选芯片的视觉状态
  restoreFilterChipState();

  applyFiltersAndRender();
}

function restoreFilterChipState() {
  document.querySelectorAll('.filter-chip').forEach(chip => {
    const key = chip.dataset.key;
    const val = chip.dataset.val;
    if (FILTER_STATE[key] === val) {
      chip.classList.add('active');
    } else {
      chip.classList.remove('active');
    }
  });
}

function applyFiltersAndRender() {
  let results = [...CONSTELLATIONS];

  // 1. 搜索过滤
  if (FILTER_STATE.query) {
    const q = FILTER_STATE.query;
    results = results.filter(c =>
      c.name.includes(q) ||
      c.pinyin.toLowerCase().includes(q) ||
      c.englishName.toLowerCase().includes(q)
    );
  }

  // 2. 难度过滤
  if (FILTER_STATE.diff !== 'all') {
    const diff = parseInt(FILTER_STATE.diff, 10);
    results = results.filter(c => c.difficulty === diff);
  }

  // 3. 季节过滤
  if (FILTER_STATE.season !== 'all') {
    results = results.filter(c => getConstellationSeason(c.id) === FILTER_STATE.season);
  }

  // 4. 状态过滤
  if (FILTER_STATE.status === 'unlocked') {
    results = results.filter(c => isConstellationUnlocked(c.id));
  } else if (FILTER_STATE.status === 'locked') {
    results = results.filter(c => !isConstellationUnlocked(c.id));
  } else if (FILTER_STATE.status === 'explored') {
    results = results.filter(c => isExplored(c.id));
  }

  // 5. 排序
  switch (FILTER_STATE.sort) {
    case 'name-asc':
      results.sort((a, b) => a.name.localeCompare(b.name, 'zh'));
      break;
    case 'name-desc':
      results.sort((a, b) => b.name.localeCompare(a.name, 'zh'));
      break;
    case 'diff-asc':
      results.sort((a, b) => a.difficulty - b.difficulty || a.name.localeCompare(b.name, 'zh'));
      break;
    case 'diff-desc':
      results.sort((a, b) => b.difficulty - a.difficulty || a.name.localeCompare(b.name, 'zh'));
      break;
    default:
      // 默认：难度优先，名称其次
      results.sort((a, b) => a.difficulty - b.difficulty || a.name.localeCompare(b.name, 'zh'));
  }

  // 渲染结果
  renderFilterResults(results);
}

function renderFilterResults(results) {
  const grid = document.getElementById('constellation-grid');
  const info = document.getElementById('search-result-info');
  const countText = document.getElementById('result-count-text');
  const featuredSection = document.querySelector('.featured-section');

  const hasFilter = FILTER_STATE.query || FILTER_STATE.diff !== 'all' ||
    FILTER_STATE.season !== 'all' || FILTER_STATE.status !== 'all';
  const hasNonDefaultSort = FILTER_STATE.sort !== 'default';

  // 筛选激活时隐藏精选区域，显示时恢复
  if (hasFilter || hasNonDefaultSort) {
    if (featuredSection) featuredSection.style.display = 'none';
  } else {
    if (featuredSection) featuredSection.style.display = '';
  }

  // 显示结果计数
  if (info && countText) {
    if (hasFilter || hasNonDefaultSort) {
      info.style.display = 'block';
      if (results.length === 0) {
        countText.innerHTML = '没有找到匹配的星座';
        countText.classList.remove('result-highlight');
      } else {
        countText.innerHTML = `找到 <span class="result-highlight">${results.length}</span> 个星座`;
      }
    } else {
      info.style.display = 'none';
    }
  }

  // 无结果时显示空状态
  if (grid && results.length === 0) {
    grid.innerHTML = `
      <div class="filter-empty-state">
        <div class="empty-emoji">🔭</div>
        <div class="empty-text">没有找到匹配的星座</div>
        <div class="empty-hint">试试调整筛选条件或搜索关键词</div>
      </div>
    `;
    return;
  }

  // 正常渲染
  if (grid) {
    renderConstellationGrid('constellation-grid', results);
  }
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
    const goBackTo = state.previousScreen || 'home';
    backBtn.onclick = () => { playSound('navigate'); switchScreen(goBackTo); };
  }
}

function renderTabContent(c) {
  const container = document.getElementById('detail-content');
  if (!container) return;

  if (state.currentDetailTab === 'story') {
    container.innerHTML = `
      <div class="content-card">
        <div class="content-card-title">
          📖 ${c.name}的传说
          <button class="audio-btn" id="audio-play-btn" onclick="toggleStoryAudio()" title="朗读故事">
            🔊 朗读
          </button>
        </div>
        <div class="audio-playing-bar" id="audio-playing-bar" style="display:none;">
          <span class="audio-wave">🔊</span>
          <span class="audio-status" id="audio-status-text">正在朗读...</span>
          <button class="audio-stop-btn" onclick="stopStoryAudio()">⏹</button>
        </div>
        <div class="content-card-text" id="story-text">${c.story.replace(/\n/g, '<br><br>')}</div>
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

/* -------- TTS 语音朗读 -------- */
/* 预加载语音列表 */
let _ttsVoicesLoaded = false;
function ensureVoicesLoaded() {
  if (_ttsVoicesLoaded) return;
  const voices = speechSynthesis.getVoices();
  if (voices.length > 0) {
    _ttsVoicesLoaded = true;
    return;
  }
  // 某些浏览器需要等待 voiceschanged 事件
  return new Promise(resolve => {
    speechSynthesis.onvoiceschanged = () => {
      _ttsVoicesLoaded = true;
      resolve();
    };
    // 超时保护
    setTimeout(() => {
      _ttsVoicesLoaded = true;
      resolve();
    }, 500);
  });
}

async function toggleStoryAudio() {
  // 检查浏览器是否支持语音合成
  if (!window.speechSynthesis) {
    showToast('您的浏览器不支持语音朗读功能');
    return;
  }
  await ensureVoicesLoaded();

  if (state.ttsSpeaking && !state.ttsPaused) {
    pauseStoryAudio();
    return;
  }
  if (state.ttsPaused) {
    resumeStoryAudio();
    return;
  }
  startStoryAudio();
}

function startStoryAudio() {
  const c = CONSTELLATION_MAP[state.currentConstellation];
  if (!c || !c.story) return;

  stopStoryAudio(); // 清除之前的状态

  // 标记故事已收听
  markStoryListened(state.currentConstellation);

  const text = c.story;
  state.ttsCurrentText = text;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'zh-CN';
  utterance.rate = 0.9;
  utterance.pitch = 1.05;

  // 选择合适的语音
  const voices = speechSynthesis.getVoices();
  const zhVoice = voices.find(v => v.lang.startsWith('zh')) || voices[0];
  if (zhVoice) utterance.voice = zhVoice;

  utterance.onstart = () => {
    state.ttsSpeaking = true;
    state.ttsPaused = false;
    updateAudioUI('playing');
  };

  utterance.onend = () => {
    resetAudioState();
    updateAudioUI('stopped');
  };

  utterance.onerror = (e) => {
    console.log('TTS error:', e);
    if (e.error !== 'canceled' && e.error !== 'interrupted') {
      resetAudioState();
      updateAudioUI('stopped');
    }
  };

  utterance.onpause = () => {
    state.ttsPaused = true;
    updateAudioUI('paused');
  };

  utterance.onresume = () => {
    state.ttsPaused = false;
    updateAudioUI('playing');
  };

  state.ttsUtterance = utterance;
  speechSynthesis.speak(utterance);
  playSound('click');
}

function pauseStoryAudio() {
  if (state.ttsSpeaking) {
    speechSynthesis.pause();
  }
}

function resumeStoryAudio() {
  if (state.ttsPaused) {
    speechSynthesis.resume();
  }
}

function stopStoryAudio() {
  speechSynthesis.cancel();
  resetAudioState();
  updateAudioUI('stopped');
}

function resetAudioState() {
  state.ttsSpeaking = false;
  state.ttsPaused = false;
  state.ttsUtterance = null;
  state.ttsCurrentText = '';
}

function updateAudioUI(status) {
  const bar = document.getElementById('audio-playing-bar');
  const btn = document.getElementById('audio-play-btn');
  const statusText = document.getElementById('audio-status-text');

  if (status === 'playing') {
    if (bar) bar.style.display = 'flex';
    if (btn) btn.textContent = '⏸ 暂停';
    if (statusText) statusText.textContent = '正在朗读...';
  } else if (status === 'paused') {
    if (bar) bar.style.display = 'flex';
    if (btn) btn.textContent = '▶ 继续';
    if (statusText) statusText.textContent = '已暂停';
  } else {
    if (bar) bar.style.display = 'none';
    if (btn) btn.textContent = '🔊 朗读';
  }
}

/* -------- 页面切换时停止朗读 -------- */
const _origSwitchScreen = switchScreen;
switchScreen = function(screenName, direction) {
  if (state.ttsSpeaking) stopStoryAudio();
  return _origSwitchScreen(screenName, direction);
};

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
      // 切出故事 Tab 时停止朗读
      if (tab.dataset.tab !== 'story' && state.ttsSpeaking) stopStoryAudio();
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
  // 重置本局统计数据
  state._wrongCount = 0;
  state._totalAttempts = 0;
  state._startTime = Date.now();

  // 清除上一局残留的轮廓图
  removeSilhouetteImg();

  drawGameCanvas(c, 0);

  // 保存画布快照，供 handleMove 快速恢复（避免每帧全量重绘）
  saveCanvasSnapshot();

  // 新手引导
  startTutorial();

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

/* -------- 画布快照（移动端性能优化） -------- */
let _gameSnapshot = null; // 保存游戏画布的 ImageData 快照
let _snapshotW = 0;
let _snapshotH = 0;

/* -------- 新手引导教程 -------- */
let tutorial = {
  active: false,
  step: 0,              // 0=step1_welcome, 1=step2_guide, 2=step3_celebrate
  targetEdge: null,     // 引导步骤中高亮的连线边 [fromIdx, toIdx]
  firstStarPos: null,   // 起始星星的 canvas 坐标
};

function isTutorialDone() {
  return localStorage.getItem('xingzhuo_tutorial_done') === 'true';
}

function markTutorialDone() {
  localStorage.setItem('xingzhuo_tutorial_done', 'true');
}

function startTutorial() {
  if (isTutorialDone()) return;
  if (tutorial.active) return;

  tutorial.active = true;
  tutorial.step = 0;

  const overlay = document.getElementById('tutorial-overlay');
  if (!overlay) return;
  overlay.classList.add('active');

  // 跳过按钮
  addTutorialSkipBtn();

  showTutorialStep1();
}

function showTutorialStep1() {
  tutorial.step = 0;
  const bubble = document.getElementById('tutorial-bubble');
  const text = document.getElementById('tutorial-text');
  const hint = document.getElementById('tutorial-hint');
  const dots = document.getElementById('tutorial-step-dots');
  const hand = document.getElementById('tutorial-hand');

  updateStepDots(0);
  bubble.className = 'tutorial-bubble top';
  text.innerHTML = '🌟 用手指连接<br>数字星星';
  hint.textContent = '还原星座的真实形状';
  if (hand) hand.classList.remove('visible', 'swiping');

  // 2.8秒后自动进入第二步
  clearTimeout(tutorial._timer);
  tutorial._timer = setTimeout(() => {
    showTutorialStep2();
  }, 2800);

  // 点击任意处也可以跳过
  const overlay = document.getElementById('tutorial-overlay');
  if (overlay) {
    overlay.classList.remove('passthrough');
    overlay.onclick = function(e) {
      if (e.target === overlay || e.target.classList.contains('tutorial-mask')) {
        showTutorialStep2();
      }
    };
  }
}

function showTutorialStep2() {
  tutorial.step = 1;
  clearTimeout(tutorial._timer);

  const canvas = document.getElementById('game-canvas');
  const bubble = document.getElementById('tutorial-bubble');
  const text = document.getElementById('tutorial-text');
  const hint = document.getElementById('tutorial-hint');
  const hand = document.getElementById('tutorial-hand');
  const overlay = document.getElementById('tutorial-overlay');

  updateStepDots(1);

  // 找一个未连接的边作为引导目标
  const c = CONSTELLATION_MAP[state.currentConstellation] || CONSTELLATIONS[0];
  const firstEdge = c.lines.find(([i, j]) => {
    return !state.gameConnected.some(([a, b]) => (a === i && b === j) || (a === j && b === i));
  });

  if (!firstEdge || !canvas._starPositions) {
    endTutorial();
    return;
  }

  tutorial.targetEdge = firstEdge;
  const startPos = canvas._starPositions[firstEdge[0]];
  const endPos = canvas._starPositions[firstEdge[1]];
  tutorial.firstStarPos = startPos;

  // 气泡放在底部
  bubble.className = 'tutorial-bubble top';
  text.textContent = '从这颗星开始连接';
  hint.textContent = '👆 按住拖动到目标星星';

  // 手势定位到起始星星上方
  if (hand) {
    const rect = canvas.getBoundingClientRect();
    hand.style.left = (startPos.x + 10) + 'px';
    hand.style.top = (startPos.y - 50) + 'px';
    hand.classList.add('visible', 'swiping');

    // 动态调整手势终点
    setTimeout(() => {
      const dx = endPos.x - startPos.x;
      const dy = endPos.y - startPos.y;
      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        // 更新 keyframes 为当前边的方向
        const styleEl = document.getElementById('tutorial-swipe-style') || createSwipeStyle(dx, dy);
        hand.querySelector('.tutorial-hand-svg').style.animation = 'none';
        hand.querySelector('.tutorial-hand-svg').offsetHeight; // force reflow
        hand.querySelector('.tutorial-hand-svg').style.animation = 'tutorialSwipeCustom 2.2s ease-in-out infinite';
      }
    }, 100);
  }

  // ★ 关键修复：让触摸事件穿透遮罩层到达 Canvas
  // 否则移动端用户无法在画布上连线
  if (overlay) {
    overlay.classList.add('passthrough');
    overlay.onclick = null;
  }
}

function createSwipeStyle(dx, dy) {
  const style = document.createElement('style');
  style.id = 'tutorial-swipe-style';
  style.textContent = `
    @keyframes tutorialSwipeCustom {
      0%   { transform: translate(0, 0); }
      20%  { transform: translate(${dx*0.2}px, ${dy*0.2}px); }
      40%  { transform: translate(${dx*0.5}px, ${dy*0.4}px); }
      55%  { transform: translate(${dx*0.85}px, ${dy*0.8}px); }
      70%  { transform: translate(${dx}px, ${dy}px); }
      85%  { transform: translate(${dx*0.85}px, ${dy*0.8}px); }
      100% { transform: translate(0, 0); }
    }
  `;
  document.head.appendChild(style);
  return style;
}

function showTutorialStep3() {
  tutorial.step = 2;
  clearTimeout(tutorial._timer);

  const bubble = document.getElementById('tutorial-bubble');
  const text = document.getElementById('tutorial-text');
  const hint = document.getElementById('tutorial-hint');
  const hand = document.getElementById('tutorial-hand');
  const overlay = document.getElementById('tutorial-overlay');

  updateStepDots(2);
  if (hand) hand.classList.remove('visible', 'swiping');
  if (overlay) overlay.classList.remove('passthrough');

  bubble.className = 'tutorial-bubble top';
  text.textContent = '🎉 太棒了！';
  hint.textContent = '继续连接所有星星完成星座';

  // 2秒后结束教程
  tutorial._timer = setTimeout(() => {
    endTutorial();
  }, 2000);
}

function endTutorial() {
  clearTimeout(tutorial._timer);
  tutorial.active = false;
  tutorial.step = 0;
  tutorial.targetEdge = null;
  tutorial.firstStarPos = null;

  const overlay = document.getElementById('tutorial-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    overlay.classList.remove('passthrough');
  }

  const hand = document.getElementById('tutorial-hand');
  if (hand) hand.classList.remove('visible', 'swiping');

  removeTutorialSkipBtn();

  // 清理动画样式
  const style = document.getElementById('tutorial-swipe-style');
  if (style) style.remove();

  markTutorialDone();
}

function addTutorialSkipBtn() {
  if (document.getElementById('tutorial-skip-btn')) return;
  const gameArea = document.getElementById('game-area');
  if (!gameArea) return;
  const btn = document.createElement('div');
  btn.id = 'tutorial-skip-btn';
  btn.className = 'tutorial-skip';
  btn.textContent = '跳过';
  btn.onclick = function(e) {
    e.stopPropagation();
    endTutorial();
  };
  gameArea.appendChild(btn);
}

function removeTutorialSkipBtn() {
  const btn = document.getElementById('tutorial-skip-btn');
  if (btn) btn.remove();
}

function updateStepDots(activeIdx) {
  const dots = document.querySelectorAll('#tutorial-step-dots .tutorial-dot');
  dots.forEach((d, i) => {
    d.classList.remove('active', 'done');
    if (i < activeIdx) d.classList.add('done');
    if (i === activeIdx) d.classList.add('active');
  });
}

function isTutorialStep2() {
  return tutorial.active && tutorial.step === 1;
}

/* -------- 成就徽章系统 -------- */
const BADGES = [
  // 连线类
  { id: 'connect_1', name: '初出茅庐', emoji: '🌱', desc: '完成第 1 个星座连线', cat: 'connect', check: () => getExploredIds().length >= 1 },
  { id: 'connect_10', name: '连线达人', emoji: '🌟', desc: '完成 10 个星座连线', cat: 'connect', check: () => getExploredIds().length >= 10 },
  { id: 'connect_30', name: '星座大师', emoji: '👑', desc: '完成 30 个星座连线', cat: 'connect', check: () => getExploredIds().length >= 30 },
  { id: 'connect_88', name: '星空征服者', emoji: '🏆', desc: '完成全部 88 个星座连线', cat: 'connect', check: () => getExploredIds().length >= 88 },
  // 故事类
  { id: 'story_1', name: '故事启蒙', emoji: '📖', desc: '听完第 1 个星座故事', cat: 'story', check: () => getStoryListenedCount() >= 1 },
  { id: 'story_10', name: '故事收藏家', emoji: '📚', desc: '听完 10 个星座故事', cat: 'story', check: () => getStoryListenedCount() >= 10 },
  // 连击类
  { id: 'combo_5', name: '一箭双星', emoji: '🎯', desc: '连续正确连线 5 次', cat: 'combo', check: () => getMaxCombo() >= 5 },
  { id: 'combo_10', name: '连击高手', emoji: '⚡', desc: '连续正确连线 10 次', cat: 'combo', check: () => getMaxCombo() >= 10 },
  { id: 'perfect', name: '行云流水', emoji: '✨', desc: '一次不错就完成一个星座', cat: 'combo', check: () => getPerfectCount() >= 1 },
  // 探索类
  { id: 'explore_sky', name: '星图探索者', emoji: '🔭', desc: '打开过全景星图', cat: 'explore', check: () => localStorage.getItem('xingzhuo_visited_skymap') === 'true' },
];

function getUnlockedBadgeIds() {
  try {
    return JSON.parse(localStorage.getItem('xingzhuo_badges') || '[]');
  } catch { return []; }
}

function unlockBadge(badgeId) {
  const badges = getUnlockedBadgeIds();
  if (badges.includes(badgeId)) return false;
  badges.push(badgeId);
  localStorage.setItem('xingzhuo_badges', JSON.stringify(badges));
  return true;
}

function checkAndUnlockBadges() {
  const unlocked = getUnlockedBadgeIds();
  let newBadges = [];
  BADGES.forEach(b => {
    if (unlocked.includes(b.id)) return;
    if (b.check()) {
      if (unlockBadge(b.id)) {
        newBadges.push(b);
      }
    }
  });
  return newBadges;
}

// 即时检测连击徽章（游戏中触发）
function checkComboBadges() {
  const unlocked = getUnlockedBadgeIds();
  const comboBadges = BADGES.filter(b => b.cat === 'combo' && !unlocked.includes(b.id));
  comboBadges.forEach(b => {
    if (b.check() && unlockBadge(b.id)) {
      showBadgeEarned(b);
    }
  });
}

// 故事收听计数
function markStoryListened(constellationId) {
  try {
    const listened = JSON.parse(localStorage.getItem('xingzhuo_stories_listened') || '[]');
    if (!listened.includes(constellationId)) {
      listened.push(constellationId);
      localStorage.setItem('xingzhuo_stories_listened', JSON.stringify(listened));
    }
  } catch(e) {}
}

function getStoryListenedCount() {
  try {
    return JSON.parse(localStorage.getItem('xingzhuo_stories_listened') || '[]').length;
  } catch { return 0; }
}

// 连击计数
function getCurrentCombo() {
  try { return parseInt(localStorage.getItem('xingzhuo_current_combo') || '0', 10); } catch { return 0; }
}

function setCurrentCombo(n) {
  localStorage.setItem('xingzhuo_current_combo', n);
}

function getMaxCombo() {
  try { return parseInt(localStorage.getItem('xingzhuo_max_combo') || '0', 10); } catch { return 0; }
}

function incrementCombo() {
  const c = getCurrentCombo() + 1;
  setCurrentCombo(c);
  const max = getMaxCombo();
  if (c > max) {
    localStorage.setItem('xingzhuo_max_combo', c);
  }
}

function resetCombo() {
  setCurrentCombo(0);
}

// 完美通关计数
function getPerfectCount() {
  try { return parseInt(localStorage.getItem('xingzhuo_perfect_count') || '0', 10); } catch { return 0; }
}

function incrementPerfectCount() {
  const n = getPerfectCount() + 1;
  localStorage.setItem('xingzhuo_perfect_count', n);
}

/* -------- 徽章通知 -------- */
let _badgeQueue = [];
let _badgeShowing = false;

function showBadgeEarned(badge) {
  _badgeQueue.push(badge);
  if (!_badgeShowing) processBadgeQueue();
}

function processBadgeQueue() {
  if (_badgeQueue.length === 0) { _badgeShowing = false; return; }
  _badgeShowing = true;
  const badge = _badgeQueue.shift();

  // 移除旧通知
  const existing = document.querySelector('.badge-notification');
  if (existing) existing.remove();

  const notif = document.createElement('div');
  notif.className = 'badge-notification';
  notif.innerHTML = `
    <div class="badge-popup">
      <div class="badge-popup-glow"></div>
      <div class="badge-popup-emoji">${badge.emoji}</div>
      <div class="badge-popup-title">🏅 新成就解锁！</div>
      <div class="badge-popup-name">${badge.name}</div>
      <div class="badge-popup-desc">${badge.desc}</div>
    </div>
  `;
  document.body.appendChild(notif);

  // 播放解锁音效
  playSound('win');
  setTimeout(() => playSound('score'), 150);

  // 3秒后自动消失
  setTimeout(() => {
    notif.classList.add('badge-fadeout');
    setTimeout(() => {
      notif.remove();
      processBadgeQueue();
    }, 400);
  }, 3000);

  // 点击也可关闭
  notif.onclick = () => {
    notif.classList.add('badge-fadeout');
    setTimeout(() => {
      notif.remove();
      processBadgeQueue();
    }, 400);
  };
}

function saveCanvasSnapshot() {
  const canvas = document.getElementById('game-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  _snapshotW = canvas.width;
  _snapshotH = canvas.height;
  try {
    _gameSnapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
  } catch (e) {
    _gameSnapshot = null;
  }
}

function restoreCanvasSnapshot() {
  const canvas = document.getElementById('game-canvas');
  if (!canvas || !_gameSnapshot) return;
  const ctx = canvas.getContext('2d');
  if (canvas.width === _snapshotW && canvas.height === _snapshotH) {
    ctx.putImageData(_gameSnapshot, 0, 0);
  } else {
    // 尺寸变了（极少见），退回到全量重绘
    _gameSnapshot = null;
  }
}

function invalidateSnapshot() {
  _gameSnapshot = null;
}

function initGameInteraction(c) {
  const canvas = document.getElementById('game-canvas');
  if (!canvas) return;

  let dragging = null;
  let dragLine = null; // {x1, y1, x2, y2}

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    // touchend 时 e.touches 为空数组（length=0），需改用 e.changedTouches
    const touchList = (e.touches && e.touches.length > 0) ? e.touches
      : (e.changedTouches && e.changedTouches.length > 0) ? e.changedTouches : null;
    const clientX = touchList ? touchList[0].clientX : e.clientX;
    const clientY = touchList ? touchList[0].clientY : e.clientY;
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

  function handleStart(e) {
    if (state.gameFinished) return;
    e.preventDefault();
    const pos = getPos(e);
    const starIdx = findStar(pos);
    if (starIdx >= 0) {
      dragging = starIdx;
      playSound('select');
    }
  }

  function handleMove(e) {
    if (dragging === null || state.gameFinished) return;
    e.preventDefault();
    const pos = getPos(e);
    const targetIdx = findStar(pos);

    // 从快照恢复 + 画拖拽线（避免每帧全量重绘，移动端性能关键）
    restoreCanvasSnapshot();
    if (!_gameSnapshot) {
      // 快照失效，退回到全量重绘
      drawGameCanvas(c, 0);
      saveCanvasSnapshot();
    }
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
  }

  function handleEnd(e) {
    if (dragging === null || state.gameFinished) return;
    const pos = getPos(e);
    const targetIdx = findStar(pos);

    if (targetIdx >= 0 && targetIdx !== dragging) {
      // 检查是否是正确的连线
      if (isLineInConstellation(dragging, targetIdx)) {
        if (!isLineConnected(dragging, targetIdx)) {
          state._totalAttempts = (state._totalAttempts || 0) + 1;
          state.gameConnected.push([dragging, targetIdx]);
          state.gameProgress++;
          playSound('correct');
          playSound('score');
          addScore(20);
          updateGameProgress();
          drawGameCanvas(c);
          saveCanvasSnapshot();

          // 弹出部位标签气泡
          showStarLabel(canvas, targetIdx, c);

          // 连击计数
          incrementCombo();

          // 即时检测连击类徽章
          checkComboBadges();

          // 新手引导：第一步正确连接后进入庆祝步骤
          if (isTutorialStep2()) {
            showTutorialStep3();
          }

          // 检查是否完成
          if (state.gameProgress >= state.gameTotalEdges) {
            finishGame();
          }
        }
      } else {
        // 错误连线，抖动提示
        playSound('wrong');
        state._wrongCount = (state._wrongCount || 0) + 1;
        state._totalAttempts = (state._totalAttempts || 0) + 1;
        resetCombo();
        shakeCanvas(canvas);
      }
    }

    dragging = null;
    drawGameCanvas(c, 0);
    saveCanvasSnapshot();
  }

  // 鼠标事件（桌面端）
  canvas.onmousedown = handleStart;
  canvas.onmousemove = handleMove;
  canvas.onmouseup = handleEnd;

  // 触摸事件（移动端，必须 passive: false 才能阻止默认行为）
  canvas.addEventListener('touchstart', handleStart, { passive: false });
  canvas.addEventListener('touchmove', handleMove, { passive: false });
  canvas.addEventListener('touchend', handleEnd, { passive: false });
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

  // 计算本局数据
  const duration = state._startTime ? ((Date.now() - state._startTime) / 1000) : 0;
  const totalAttempts = state._totalAttempts || 0;
  const wrongCount = state._wrongCount || 0;
  const accuracy = totalAttempts > 0 ? Math.round(((totalAttempts - wrongCount) / totalAttempts) * 100) : 100;
  const maxCombo = getMaxCombo();

  // 保存历史记录
  const c = CONSTELLATION_MAP[state.currentConstellation];
  saveGameHistory({
    constId: state.currentConstellation,
    name: c ? c.name : '未知',
    difficulty: c ? c.difficulty : 1,
    duration: duration,
    accuracy: accuracy,
    wrongCount: wrongCount,
    maxCombo: maxCombo,
    totalEdges: state.gameTotalEdges,
    timestamp: Date.now(),
    score: totalAttempts * 20 + 50, // 本局得分（正确连线×20 + 通关奖励50）
  });

  // 标记已探索
  markExplored(state.currentConstellation);
  playSound('win');
  addScore(50); // 通关奖励
  playSound('score');

  // 完美通关检测
  if (wrongCount === 0) {
    incrementPerfectCount();
  }

  // 检测成就徽章
  setTimeout(() => {
    const newBadges = checkAndUnlockBadges();
    newBadges.forEach(b => showBadgeEarned(b));
  }, 1600);

  // 重绘最终连线（自动连完所有线）
  if (c) {
    c.lines.forEach(([i, j]) => {
      if (!state.gameConnected.some(([a, b]) => (a === i && b === j) || (a === j && b === i))) {
        state.gameConnected.push([i, j]);
      }
    });

    // 先做轮廓淡入动画（1.2秒），再显示分析图
    animateSilhouette(c);
    setTimeout(() => showAnalysisOverlay(c, { duration, accuracy, maxCombo, wrongCount, totalAttempts }), 1400);
  } else {
    showAnalysisOverlay(null, { duration, accuracy, maxCombo, wrongCount, totalAttempts });
  }
}

/* -------- 游戏历史 -------- */
function getGameHistory() {
  try {
    return JSON.parse(localStorage.getItem('xingzhuo_game_history') || '[]');
  } catch { return []; }
}

function saveGameHistory(record) {
  try {
    const history = getGameHistory();
    history.unshift(record);
    // 最多保留20条
    if (history.length > 20) history.length = 20;
    localStorage.setItem('xingzhuo_game_history', JSON.stringify(history));
  } catch { /* ignore */ }
}

/* -------- 通关分析图 -------- */
function showAnalysisOverlay(c, stats) {
  const canvas = document.getElementById('game-canvas');
  if (!canvas) return;
  const parent = canvas.parentElement;
  let overlay = parent.querySelector('.game-success-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'game-success-overlay';
    parent.appendChild(overlay);
  }

  // 计算评分
  const rating = calcRating(stats.accuracy, stats.maxCombo, stats.wrongCount, stats.totalAttempts, c ? c.difficulty : 1);
  const history = getGameHistory();
  const prevBest = history.length > 1 ? getBestRecord(history.slice(1)) : null;

  overlay.innerHTML = `
    <div class="analysis-card">
      <div class="analysis-header">
        <div class="analysis-emoji">${rating.emoji}</div>
        <div class="analysis-title">${c ? c.name.replace('座', '') : '星座'} · 通关！</div>
        <div class="analysis-rating ${rating.grade.toLowerCase()}">评级 ${rating.grade}</div>
      </div>

      <div class="analysis-chart-wrap">
        <canvas class="analysis-radar" id="analysis-radar" width="200" height="200"></canvas>
        <div class="analysis-chart-label">能力雷达</div>
      </div>

      <div class="analysis-stats">
        <div class="analysis-stat">
          <div class="analysis-stat-value">${fmtDuration(stats.duration)}</div>
          <div class="analysis-stat-label">⏱ 耗时</div>
        </div>
        <div class="analysis-stat">
          <div class="analysis-stat-value">${stats.accuracy}%</div>
          <div class="analysis-stat-label">🎯 准确率</div>
        </div>
        <div class="analysis-stat">
          <div class="analysis-stat-value">${stats.maxCombo}x</div>
          <div class="analysis-stat-label">🔥 最大连击</div>
        </div>
        <div class="analysis-stat">
          <div class="analysis-stat-value">${stats.wrongCount}</div>
          <div class="analysis-stat-label">❌ 错误次数</div>
        </div>
      </div>

      ${prevBest ? `
      <div class="analysis-compare">
        <div class="analysis-compare-title">📊 与历史最佳对比</div>
        <div class="analysis-compare-row">
          <span class="compare-label">准确率</span>
          <span class="compare-this">${stats.accuracy}%</span>
          <span class="compare-vs">vs</span>
          <span class="compare-best">${prevBest.accuracy}%</span>
          <span class="compare-diff ${stats.accuracy >= prevBest.accuracy ? 'up' : 'down'}">${stats.accuracy >= prevBest.accuracy ? '↑' : '↓'}${Math.abs(stats.accuracy - prevBest.accuracy)}%</span>
        </div>
        <div class="analysis-compare-row">
          <span class="compare-label">连击</span>
          <span class="compare-this">${stats.maxCombo}x</span>
          <span class="compare-vs">vs</span>
          <span class="compare-best">${prevBest.maxCombo}x</span>
          <span class="compare-diff ${stats.maxCombo >= prevBest.maxCombo ? 'up' : 'down'}">${stats.maxCombo >= prevBest.maxCombo ? '↑' : '↓'}${Math.abs(stats.maxCombo - prevBest.maxCombo)}</span>
        </div>
      </div>
      ` : `
      <div class="analysis-compare">
        <div class="analysis-compare-title">🎖 首通记录已保存</div>
        <div class="analysis-compare-hint">继续探索更多星座，解锁历史对比！</div>
      </div>
      `}

      <div class="analysis-actions">
        <button class="analysis-btn retry" id="btn-analysis-retry">🔄 再来一局</button>
        <button class="analysis-btn detail" id="btn-analysis-detail">📖 查看故事 →</button>
      </div>
    </div>
  `;

  setTimeout(() => overlay.classList.add('show'), 100);

  // 绑定按钮
  setTimeout(() => {
    const retryBtn = document.getElementById('btn-analysis-retry');
    const detailBtn = document.getElementById('btn-analysis-detail');
    if (retryBtn) retryBtn.onclick = () => {
      overlay.classList.remove('show');
      setTimeout(() => initGame(), 400);
    };
    if (detailBtn) detailBtn.onclick = () => {
      overlay.classList.remove('show');
      setTimeout(() => switchScreen('detail'), 400);
    };

    // 绘制雷达图
    drawRadarChart(stats, c);
  }, 200);

  // 不自动消失（用户自己选择）
}

function calcRating(accuracy, maxCombo, wrongCount, totalAttempts, difficulty) {
  // 综合评分：准确率权重50% + 连击权重25% + 错误权重15% + 难度加成10%
  const comboRatio = totalAttempts > 0 ? Math.min(maxCombo / totalAttempts, 1) : 1;
  let score = accuracy * 0.5 + comboRatio * 100 * 0.25 + (wrongCount === 0 ? 100 : Math.max(0, 100 - wrongCount * 15)) * 0.15 + difficulty * 10;

  if (score >= 95) return { grade: 'S', emoji: '👑' };
  if (score >= 85) return { grade: 'A', emoji: '🌟' };
  if (score >= 70) return { grade: 'B', emoji: '✨' };
  if (score >= 50) return { grade: 'C', emoji: '👍' };
  return { grade: 'D', emoji: '💪' };
}

function getBestRecord(history) {
  if (!history.length) return null;
  return history.reduce((best, r) => r.accuracy > best.accuracy ? r : best, history[0]);
}

function fmtDuration(seconds) {
  if (seconds < 60) return Math.round(seconds) + 's';
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return m + 'm' + s + 's';
}

/* -------- 雷达图绘制 -------- */
function drawRadarChart(stats, c) {
  const canvas = document.getElementById('analysis-radar');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const w = 200, h = 200;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  ctx.scale(dpr, dpr);

  const cx = w / 2, cy = h / 2;
  const radius = 70;
  const levels = 5;
  const angles = 5; // 5 个维度

  // 维度定义
  const dims = [
    { key: 'speed', label: '速度', value: calcSpeedScore(stats.duration, c ? c.difficulty : 1) },
    { key: 'accuracy', label: '准确', value: stats.accuracy },
    { key: 'combo', label: '连击', value: Math.min(stats.maxCombo * 20, 100) },
    { key: 'perfection', label: '完美', value: stats.wrongCount === 0 ? 100 : Math.max(0, 100 - stats.wrongCount * 20) },
    { key: 'efficiency', label: '效率', value: stats.totalAttempts > 0 ? Math.min((stats.totalAttempts - stats.wrongCount) / Math.max(stats.totalAttempts, 1) * 100, 100) : 100 },
  ];

  // 背景网格
  for (let l = 1; l <= levels; l++) {
    ctx.beginPath();
    const r = (radius / levels) * l;
    for (let i = 0; i <= angles; i++) {
      const angle = (Math.PI * 2 / angles) * i - Math.PI / 2;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = 'rgba(139, 92, 246, 0.15)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // 轴线
  for (let i = 0; i < angles; i++) {
    const angle = (Math.PI * 2 / angles) * i - Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
    ctx.strokeStyle = 'rgba(139, 92, 246, 0.2)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // 数据区域
  ctx.beginPath();
  for (let i = 0; i < dims.length; i++) {
    const angle = (Math.PI * 2 / angles) * i - Math.PI / 2;
    const r = (dims[i].value / 100) * radius;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = 'rgba(139, 92, 246, 0.2)';
  ctx.fill();
  ctx.strokeStyle = '#A78BFA';
  ctx.lineWidth = 2;
  ctx.stroke();

  // 数据点
  for (let i = 0; i < dims.length; i++) {
    const angle = (Math.PI * 2 / angles) * i - Math.PI / 2;
    const r = (dims[i].value / 100) * radius;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#C4B5FD';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  // 标签
  ctx.fillStyle = '#A5B4FC';
  ctx.font = '10px "Fredoka", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (let i = 0; i < dims.length; i++) {
    const angle = (Math.PI * 2 / angles) * i - Math.PI / 2;
    const labelR = radius + 16;
    const x = cx + Math.cos(angle) * labelR;
    const y = cy + Math.sin(angle) * labelR;
    ctx.fillText(dims[i].label, x, y);
  }
}

function calcSpeedScore(duration, difficulty) {
  // 根据难度调整基准时间：★=30s, ★★=45s, ★★★=60s, ★★★★=90s
  const base = 20 + difficulty * 15;
  if (duration <= 0) return 100;
  const ratio = base / Math.max(duration, 1);
  return Math.min(Math.round(ratio * 100), 100);
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

  // 徽章区域
  renderBadgeSection();

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

/* -------- 徽章渲染 -------- */
function renderBadgeSection() {
  const tiersEl = document.getElementById('achieved-tiers');
  if (!tiersEl) return;
  const parent = tiersEl.parentElement;

  // 移除旧徽章区域
  const existing = document.getElementById('badge-section-wrap');
  if (existing) existing.remove();

  const wrapper = document.createElement('div');
  wrapper.id = 'badge-section-wrap';
  wrapper.className = 'badge-section';

  const unlocked = getUnlockedBadgeIds();
  wrapper.innerHTML = `
    <div class="badge-section-title">🏅 成就徽章 <span style="font-size:13px;color:var(--text-secondary);font-weight:400">${unlocked.length}/${BADGES.length}</span></div>
    <div class="badge-grid" id="badge-grid"></div>
  `;

  // 插入到图鉴页最上方（进度区域之后）
  const progressOverview = document.querySelector('.progress-overview');
  if (progressOverview) {
    progressOverview.after(wrapper);
  } else {
    parent.prepend(wrapper);
  }

  // 渲染每个徽章
  const grid = document.getElementById('badge-grid');
  if (!grid) return;
  BADGES.forEach(b => {
    const card = document.createElement('div');
    const isUnlocked = unlocked.includes(b.id);
    card.className = `badge-card ${isUnlocked ? 'unlocked' : 'locked'}`;
    card.innerHTML = `
      <div class="badge-card-emoji">${b.emoji}</div>
      <div class="badge-card-name">${b.name}</div>
      <div class="badge-card-desc">${b.desc}</div>
      ${isUnlocked ? '' : '<div class="badge-lock">🔒</div>'}
    `;
    grid.appendChild(card);
  });
}

/* -------- 返回按钮（图鉴页） -------- */
function initBackButtons() {
  const ids = [
    ['btn-settings', null],
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

/* -------- 星图全景 -------- */
const SKY_MAP = {
  canvas: null,
  ctx: null,
  width: 3000,
  height: 3000,
  centerX: 1500,
  centerY: 1500,
  offsetX: 0,
  offsetY: 0,
  scale: 0.38,
  minScale: 0.15,
  maxScale: 1.2,
  dragging: false,
  dragStartX: 0,
  dragStartY: 0,
  dragMoved: false,
};

/* 88星座在天图上的位置（按季节分组，圆形布局） */
const SKY_POSITIONS = {
  // ====== 北天拱极（中心区域）======
  ursa_minor:     { x: 1500, y: 1050, group: 'polar' },
  ursa_major:     { x: 1500, y: 1300, group: 'polar' },
  draco:          { x: 1380, y: 1120, group: 'polar' },
  cassiopeia:     { x: 1620, y: 1080, group: 'polar' },
  cepheus:        { x: 1560, y: 960,  group: 'polar' },
  camelopardalis: { x: 1700, y: 1200, group: 'polar' },
  lynx:           { x: 1350, y: 1380, group: 'polar' },
  lacerta:        { x: 1640, y: 1180, group: 'polar' },
  canes_venatici: { x: 1380, y: 1300, group: 'polar' },
  leo_minor:      { x: 1320, y: 1400, group: 'polar' },

  // ====== 春季（右侧偏上）======
  leo:            { x: 2050, y: 1150, group: 'spring' },
  virgo:          { x: 2100, y: 1400, group: 'spring' },
  bootes:         { x: 1950, y: 1050, group: 'spring' },
  coma_berenices: { x: 2000, y: 1200, group: 'spring' },
  cancer:         { x: 1750, y: 900,  group: 'spring' },
  crater:         { x: 2200, y: 1550, group: 'spring' },
  corvus:         { x: 2250, y: 1600, group: 'spring' },
  sextans:        { x: 2150, y: 1500, group: 'spring' },
  hydra:          { x: 2200, y: 1700, group: 'spring' },
  centaurus:      { x: 2250, y: 1950, group: 'spring' },
  crux:           { x: 2300, y: 2100, group: 'spring' },
  antlia:         { x: 2400, y: 1750, group: 'spring' },
  pyxis:          { x: 2350, y: 1650, group: 'spring' },

  // ====== 夏季（下方）======
  cygnus:         { x: 1550, y: 2200, group: 'summer' },
  aquila:         { x: 1700, y: 2400, group: 'summer' },
  lyra:           { x: 1450, y: 2100, group: 'summer' },
  hercules:       { x: 1380, y: 2050, group: 'summer' },
  scorpius:       { x: 1850, y: 2300, group: 'summer' },
  sagittarius:    { x: 1950, y: 2350, group: 'summer' },
  ophiuchus:      { x: 1750, y: 2150, group: 'summer' },
  serpens:        { x: 1680, y: 2100, group: 'summer' },
  scutum:         { x: 1800, y: 2250, group: 'summer' },
  sagitta:        { x: 1600, y: 2180, group: 'summer' },
  delphinus:      { x: 1620, y: 2250, group: 'summer' },
  equuleus:       { x: 1650, y: 2280, group: 'summer' },
  vulpecula:      { x: 1580, y: 2120, group: 'summer' },
  corona_borealis:{ x: 1420, y: 1980, group: 'summer' },
  corona_australis:{ x: 1900, y: 2400, group: 'summer' },
  libra:          { x: 2000, y: 1900, group: 'summer' },
  lupus:          { x: 2100, y: 2200, group: 'summer' },
  ara:            { x: 2000, y: 2450, group: 'summer' },
  norma:          { x: 2150, y: 2300, group: 'summer' },
  circinus:       { x: 2180, y: 2250, group: 'summer' },
  triangulum_australe:{ x: 2200, y: 2350, group: 'summer' },
  apus:           { x: 2300, y: 2550, group: 'summer' },
  pavo:           { x: 2150, y: 2550, group: 'summer' },
  musca:          { x: 2350, y: 2250, group: 'summer' },

  // ====== 秋季（左侧）======
  pegasus:        { x: 950,  y: 1500, group: 'autumn' },
  andromeda:      { x: 900,  y: 1250, group: 'autumn' },
  pisces:         { x: 850,  y: 1550, group: 'autumn' },
  aquarius:       { x: 900,  y: 1750, group: 'autumn' },
  capricornus:    { x: 950,  y: 1950, group: 'autumn' },
  perseus:        { x: 1050, y: 1100, group: 'autumn' },
  triangulum:     { x: 950,  y: 1200, group: 'autumn' },
  aries:          { x: 900,  y: 1350, group: 'autumn' },
  cetus:          { x: 800,  y: 1650, group: 'autumn' },
  piscis_austrinus:{ x: 850, y: 1850, group: 'autumn' },
  sculptor:       { x: 750,  y: 1850, group: 'autumn' },
  fornax:         { x: 720,  y: 1750, group: 'autumn' },
  grus:           { x: 700,  y: 2100, group: 'autumn' },
  phoenix:        { x: 750,  y: 2200, group: 'autumn' },
  tucana:         { x: 650,  y: 2350, group: 'autumn' },
  microscopium:   { x: 880,  y: 2000, group: 'autumn' },
  telescopium:    { x: 930,  y: 2100, group: 'autumn' },
  indus:          { x: 780,  y: 2300, group: 'autumn' },

  // ====== 冬季（上方）======
  orion:          { x: 1500, y: 500,  group: 'winter' },
  taurus:         { x: 1650, y: 450,  group: 'winter' },
  gemini:         { x: 1400, y: 400,  group: 'winter' },
  canis_major:    { x: 1600, y: 680,  group: 'winter' },
  canis_minor:    { x: 1450, y: 580,  group: 'winter' },
  auriga:         { x: 1700, y: 350,  group: 'winter' },
  lepus:          { x: 1520, y: 650,  group: 'winter' },
  monoceros:      { x: 1550, y: 600,  group: 'winter' },
  eridanus:       { x: 1350, y: 700,  group: 'winter' },
  columba:        { x: 1300, y: 800,  group: 'winter' },
  caelum:         { x: 1200, y: 850,  group: 'winter' },
  horologium:     { x: 1180, y: 900,  group: 'winter' },
  reticulum:      { x: 1250, y: 920,  group: 'winter' },
  dorado:         { x: 1350, y: 950,  group: 'winter' },
  pictor:         { x: 1280, y: 980,  group: 'winter' },

  // ====== 南天极附近（底部边缘）======
  carina:         { x: 1950, y: 680,  group: 'southern' },
  vela:           { x: 2050, y: 750,  group: 'southern' },
  puppis:         { x: 1950, y: 780,  group: 'southern' },
  chamaeleon:     { x: 2400, y: 2600, group: 'southern' },
  volans:         { x: 2300, y: 2450, group: 'southern' },
  hydrus:         { x: 2200, y: 2600, group: 'southern' },
  mensa:          { x: 2100, y: 2650, group: 'southern' },
  octans:         { x: 2050, y: 2600, group: 'southern' },
};

const GROUP_COLORS = {
  polar:    { fill: 'rgba(147, 197, 253, 0.5)',  stroke: '#93c5fd', dot: '#93c5fd', bg: 'rgba(147,197,253,0.08)' },
  spring:   { fill: 'rgba(134, 239, 172, 0.5)',  stroke: '#86efac', dot: '#86efac', bg: 'rgba(134,239,172,0.08)' },
  summer:   { fill: 'rgba(252, 165, 165, 0.5)',  stroke: '#fca5a5', dot: '#fca5a5', bg: 'rgba(252,165,165,0.08)' },
  autumn:   { fill: 'rgba(253, 224, 71, 0.5)',   stroke: '#fde047', dot: '#fde047', bg: 'rgba(253,224,71,0.06)' },
  winter:   { fill: 'rgba(196, 181, 253, 0.5)',  stroke: '#c4b5fd', dot: '#c4b5fd', bg: 'rgba(196,181,253,0.08)' },
  southern: { fill: 'rgba(94, 234, 212, 0.5)',   stroke: '#5eead4', dot: '#5eead4', bg: 'rgba(94,234,212,0.08)' },
};

function initSkyMap() {
  try {
    // 标记星图已访问
    localStorage.setItem('xingzhuo_visited_skymap', 'true');

    const container = document.getElementById('sky-map-container');
    const canvas = document.getElementById('sky-map-canvas');
    if (!container || !canvas) {
      console.error('[星图] 找不到容器或画布元素');
      return;
    }

  SKY_MAP.canvas = canvas;
  SKY_MAP.ctx = canvas.getContext('2d');

  // 重置视口
  SKY_MAP.offsetX = 0;
  SKY_MAP.offsetY = 0;
  SKY_MAP.scale = 0.38;

  // 确保容器有尺寸（可能需要等待布局完成）
  if (!container.clientWidth || !container.clientHeight) {
    setTimeout(() => initSkyMap(), 100);
    return;
  }

  resizeSkyMap();
  renderSkyMap();

  // 返回按钮
  const backBtn = document.getElementById('btn-sky-map-back');
  if (backBtn) {
    backBtn.onclick = () => { playSound('navigate'); if (state.ttsSpeaking) stopStoryAudio(); switchScreen('home'); };
  }

  // 缩放按钮
  document.getElementById('btn-sky-zoomin').onclick = () => {
    SKY_MAP.scale = Math.min(SKY_MAP.maxScale, SKY_MAP.scale * 1.3);
    renderSkyMap();
  };
  document.getElementById('btn-sky-zoomout').onclick = () => {
    SKY_MAP.scale = Math.max(SKY_MAP.minScale, SKY_MAP.scale / 1.3);
    renderSkyMap();
  };
  document.getElementById('btn-sky-reset').onclick = () => {
    SKY_MAP.offsetX = 0;
    SKY_MAP.offsetY = 0;
    SKY_MAP.scale = 0.38;
    renderSkyMap();
  };

  // 事件绑定（避免重复绑定）
  if (!canvas._skyEventsBound) {
    canvas._skyEventsBound = true;

    // 鼠标拖拽
    canvas.addEventListener('mousedown', (e) => {
      SKY_MAP.dragging = true;
      SKY_MAP.dragStartX = e.clientX;
      SKY_MAP.dragStartY = e.clientY;
      SKY_MAP.dragMoved = false;
      e.preventDefault();
    });
    window.addEventListener('mousemove', (e) => {
      if (!SKY_MAP.dragging) return;
      const dx = e.clientX - SKY_MAP.dragStartX;
      const dy = e.clientY - SKY_MAP.dragStartY;
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) SKY_MAP.dragMoved = true;
      SKY_MAP.offsetX += dx;
      SKY_MAP.offsetY += dy;
      SKY_MAP.dragStartX = e.clientX;
      SKY_MAP.dragStartY = e.clientY;
      renderSkyMap();
    });
    window.addEventListener('mouseup', () => { SKY_MAP.dragging = false; });

    // 触摸拖拽
    canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        SKY_MAP.dragging = true;
        SKY_MAP.dragStartX = e.touches[0].clientX;
        SKY_MAP.dragStartY = e.touches[0].clientY;
        SKY_MAP.dragMoved = false;
      }
    }, { passive: false });
    canvas.addEventListener('touchmove', (e) => {
      if (!SKY_MAP.dragging || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - SKY_MAP.dragStartX;
      const dy = e.touches[0].clientY - SKY_MAP.dragStartY;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) SKY_MAP.dragMoved = true;
      SKY_MAP.offsetX += dx;
      SKY_MAP.offsetY += dy;
      SKY_MAP.dragStartX = e.touches[0].clientX;
      SKY_MAP.dragStartY = e.touches[0].clientY;
      renderSkyMap();
      e.preventDefault();
    }, { passive: false });
    canvas.addEventListener('touchend', () => { SKY_MAP.dragging = false; });

    // 滚轮缩放
    canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const factor = e.deltaY > 0 ? 0.9 : 1.1;
      const newScale = SKY_MAP.scale * factor;
      if (newScale < SKY_MAP.minScale || newScale > SKY_MAP.maxScale) return;

      // 以鼠标位置为中心缩放
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      SKY_MAP.offsetX = mx - (mx - SKY_MAP.offsetX) * factor;
      SKY_MAP.offsetY = my - (my - SKY_MAP.offsetY) * factor;
      SKY_MAP.scale = newScale;
      renderSkyMap();
    }, { passive: false });

    // 点击星座跳转
    canvas.addEventListener('click', (e) => {
      if (SKY_MAP.dragMoved) return;
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      // 转换为画布坐标
      const cx = (mx - SKY_MAP.offsetX) / SKY_MAP.scale;
      const cy = (my - SKY_MAP.offsetY) / SKY_MAP.scale;

      // 查找点击的星座
      const hitRadius = 50 / SKY_MAP.scale;
      let best = null;
      let bestDist = Infinity;
      for (const [id, pos] of Object.entries(SKY_POSITIONS)) {
        const dx = cx - pos.x;
        const dy = cy - pos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < hitRadius && dist < bestDist) {
          const c = CONSTELLATION_MAP[id];
          if (c && isConstellationUnlocked(id)) {
            best = c;
            bestDist = dist;
          }
        }
      }
      if (best) {
        state.currentConstellation = best.id;
        playSound('select');
        switchScreen('detail');
      }
    });
  }

  window.addEventListener('resize', () => {
    if (state.currentScreen !== 'sky-map') return;
    try { resizeSkyMap(); renderSkyMap(); } catch(e) { console.error('[星图] resize失败:', e.message); }
  });
  } catch (e) {
    console.error('[星图] 初始化失败:', e.message, e.stack);
  }
}

function resizeSkyMap() {
  const container = document.getElementById('sky-map-container');
  if (!container || !SKY_MAP.canvas) return;
  const w = container.clientWidth;
  const h = container.clientHeight;
  const dpr = window.devicePixelRatio || 1;
  SKY_MAP.canvas.width = w * dpr;
  SKY_MAP.canvas.height = h * dpr;
  SKY_MAP.canvas.style.width = w + 'px';
  SKY_MAP.canvas.style.height = h + 'px';
  SKY_MAP.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  SKY_MAP.displayWidth = w;
  SKY_MAP.displayHeight = h;
}

function renderSkyMap() {
  try {
  const { ctx } = SKY_MAP;
  const dw = SKY_MAP.displayWidth;
  const dh = SKY_MAP.displayHeight;
  if (!ctx || !dw || !dh) return;

  ctx.clearRect(0, 0, dw, dh);

  // 深空背景
  const bgGrad = ctx.createRadialGradient(dw/2, dh/2, 0, dw/2, dh/2, Math.max(dw, dh) * 0.7);
  bgGrad.addColorStop(0, '#0a0a2e');
  bgGrad.addColorStop(0.5, '#060622');
  bgGrad.addColorStop(1, '#020212');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, dw, dh);

  ctx.save();

  // 应用变换
  ctx.translate(SKY_MAP.offsetX, SKY_MAP.offsetY);
  ctx.scale(SKY_MAP.scale, SKY_MAP.scale);

  const s = SKY_MAP;

  // 绘制星空背景小星星
  drawStarfield(ctx, s.width, s.height);

  // 绘制季节区域背景圈
  drawSeasonZones(ctx);

  // 绘制所有星座
  drawAllConstellations(ctx);

  // 绘制中心十字标记（北天极）
  drawPolarMark(ctx);

  ctx.restore();

  // 绘制图例
  drawLegend(ctx, dw);
  } catch (e) {
    console.error('[星图] 渲染失败:', e.message, e.stack);
  }
}

function drawStarfield(ctx, w, h) {
  // 使用伪随机保证每次渲染一致
  const seed = 42;
  const random = (i) => {
    let x = Math.sin(i * 127.1 + seed) * 43758.5453;
    return x - Math.floor(x);
  };

  for (let i = 0; i < 800; i++) {
    const x = random(i * 2) * w;
    const y = random(i * 2 + 1) * h;
    const size = random(i * 3) * 2.2 + 0.3;
    const alpha = random(i * 4) * 0.5 + 0.3;
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }

  // 银河带（从左上到右下）
  ctx.save();
  ctx.globalAlpha = 0.06;
  const mwGrad = ctx.createRadialGradient(w * 0.45, h * 0.55, 50, w * 0.5, h * 0.5, w * 0.35);
  mwGrad.addColorStop(0, 'rgba(180, 200, 255, 0.8)');
  mwGrad.addColorStop(1, 'rgba(100, 140, 220, 0)');
  ctx.fillStyle = mwGrad;
  ctx.beginPath();
  ctx.ellipse(w * 0.5, h * 0.5, w * 0.35, h * 0.5, -0.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawSeasonZones(ctx) {
  // 绘制季节区域标记
  const zones = [
    { name: '冬季星空', cx: 1550, cy: 520, rx: 380, ry: 280, color: 'rgba(196,181,253,0.03)', label: '❄️ 冬季' },
    { name: '春季星空', cx: 2150, cy: 1550, rx: 320, ry: 380, color: 'rgba(134,239,172,0.03)', label: '🌸 春季' },
    { name: '夏季星空', cx: 1800, cy: 2300, rx: 420, ry: 280, color: 'rgba(252,165,165,0.03)', label: '☀️ 夏季' },
    { name: '秋季星空', cx: 850,  cy: 1700, rx: 320, ry: 380, color: 'rgba(253,224,71,0.03)',  label: '🍂 秋季' },
  ];

  zones.forEach(zone => {
    ctx.fillStyle = zone.color;
    ctx.beginPath();
    ctx.ellipse(zone.cx, zone.cy, zone.rx, zone.ry, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    ctx.font = 'bold 26px "Nunito", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(zone.label, zone.cx, zone.cy - zone.ry - 15);
  });
}

function drawPolarMark(ctx) {
  const cx = 1500, cy = 1500;
  // 北天极标记
  ctx.strokeStyle = 'rgba(255,255,255,0.08)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(cx, cy, 400, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, cy, 800, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.font = '13px "Nunito", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('北天极 ⭐', cx, cy - 420);
}

function drawAllConstellations(ctx) {
  for (const [id, pos] of Object.entries(SKY_POSITIONS)) {
    const c = CONSTELLATION_MAP[id];
    if (!c) continue;
    try {
      drawConstellationOnMap(ctx, c, pos);
    } catch (e) {
      console.error('[星图] 绘制星座失败:', id, e.message);
    }
  }
}

function drawConstellationOnMap(ctx, c, pos) {
  const scale = 0.55;
  const unlocked = isConstellationUnlocked(c.id);
  const explored = isExplored(c.id);
  const group = SKY_POSITIONS[c.id] ? SKY_POSITIONS[c.id].group : 'polar';
  const colors = GROUP_COLORS[group];

  // 计算星座星点中心点
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  c.stars.forEach(s => {
    if (s.x < minX) minX = s.x;
    if (s.y < minY) minY = s.y;
    if (s.x > maxX) maxX = s.x;
    if (s.y > maxY) maxY = s.y;
  });
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;

  // 计算每个星点的画布位置（以星座自身中心为基准）
  const starPositions = c.stars.map(s => ({
    x: pos.x + (s.x - cx) * scale,
    y: pos.y + (s.y - cy) * scale,
  }));

  // 绘制连线
  ctx.strokeStyle = unlocked ? (explored ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.2)') : 'rgba(255,255,255,0.08)';
  ctx.lineWidth = unlocked ? 0.8 : 0.4;
  c.lines.forEach(([a, b]) => {
    ctx.beginPath();
    ctx.moveTo(starPositions[a].x, starPositions[a].y);
    ctx.lineTo(starPositions[b].x, starPositions[b].y);
    ctx.stroke();
  });

  // 绘制星点
  starPositions.forEach((sp, i) => {
    ctx.beginPath();
    if (i === 0) {
      // 主星更大
      ctx.fillStyle = unlocked ? (explored ? '#fde047' : colors.dot) : 'rgba(100,100,120,0.4)';
      ctx.arc(sp.x, sp.y, unlocked ? 4 : 2, 0, Math.PI * 2);
    } else {
      ctx.fillStyle = unlocked ? (explored ? 'rgba(253,224,71,0.7)' : colors.fill) : 'rgba(80,80,100,0.3)';
      ctx.arc(sp.x, sp.y, unlocked ? 2.5 : 1.5, 0, Math.PI * 2);
    }
    ctx.fill();
  });

  // 星座标签
  const labelSize = unlocked ? 13 : 10;
  ctx.font = `${unlocked ? 'bold ' : ''}${labelSize}px "Nunito", "PingFang SC", sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillStyle = unlocked ? (explored ? '#fde047' : 'rgba(255,255,255,0.8)') : 'rgba(150,150,170,0.5)';
  ctx.fillText(c.name, pos.x, pos.y + 28);
}

function drawLegend(ctx, dw) {
  // 不再重新绘制，因为 HTML legend 已存在
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
