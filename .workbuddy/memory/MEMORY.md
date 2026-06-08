# 行桌 — 星座科普网站项目

## 项目信息
- 路径：`D:/dakaAgentProject/xingzhuo/`
- 设计文件：ardot `行桌-星座科普网站设计稿`（fileId: 690288048950476）
- 目标用户：7岁儿童
- 星座范围：IAU 88 星座（当前 data.js 已填充 30 个核心星座）

## 设计系统
- 风格：Claymorphism（圆角 16–28px，双层阴影）
- 背景：`#0F0F23` 午夜深蓝
- 卡片：`#1E1D35` 暗紫
- 主色：`#8B5CF6` 紫罗兰
- 强调：`#FBBF24` 金星金
- 标题字：Fredoka Bold
- 正文字：Nunito

## 文件结构
```
xingzhuo/
├── index.html          # 入口，4个屏幕容器
├── css/style.css      # 完整设计系统 + 响应式
├── imgs/              # 星座卡通 SVG 图片（每个星座一张）
│   ├── orion.svg     # 猎户座卡通猎人（已完成）
│   ├── leo.svg       # 狮子座
│   ├── scorpius.svg  # 天蝎座
│   ├── canis_major.svg  # 大犬座
│   ├── sagittarius.svg  # 射手座
│   ├── gemini.svg    # 双子座
│   ├── taurus.svg    # 金牛座
│   ├── ursa_major.svg  # 大熊座
│   ├── aquila.svg    # 天鹰座
│   ├── cygnus.svg    # 天鹅座
│   ├── virgo.svg     # 室女座
│   ├── andromeda.svg # 仙女座
│   ├── perseus.svg   # 英仙座
│   ├── bootes.svg    # 牧夫座
│   ├── aries.svg     # 白羊座
│   ├── capricornus.svg  # 摩羯座
│   ├── hercules.svg   # 武仙座
│   ├── lyra.svg      # 天琴座
│   ├── draco.svg     # 天龙座
│   ├── ursa_minor.svg  # 小熊座
│   ├── cassiopeia.svg  # 仙后座
│   ├── lynx.svg      # 天猫座
│   ├── pegasus.svg   # 飞马座
│   ├── canis_minor.svg  # 小犬座
│   ├── aquarius.svg   # 水瓶座
│   ├── pisces.svg    # 双鱼座
│   ├── libra.svg      # 天秤座
│   ├── corona_borealis.svg  # 北冕座
│   ├── ophiuchus.svg  # 蛇夫座
│   └── hydra.svg     # 长蛇座
├── js/
│   ├── data.js       # 星座数据（30个，含星图坐标/神话/趣味知识）
│   └── game.js      # 状态管理 + 页面路由 + 游戏逻辑 + 渲染
└── .workbuddy/memory/  # 工作记忆
```

## 已完成
- [x] 设计稿：4个手机页面（首页/详情/游戏/图鉴）
- [x] index.html（4屏结构）
- [x] css/style.css（完整）
- [x] js/data.js（30 星座，含故事/趣味知识/星点坐标/连线数据）
- [x] js/game.js（屏幕切换/详情页Tab/星图Canvas绘制/连线游戏逻辑/图鉴渲染/Web Audio音效/localStorage进度持久化）
- [x] imgs/orion.svg — 猎户卡通 SVG（头盔羽冠/皮甲/腰带三星/盾牌/弓箭）
- [x] 游戏完成后 SVG 图片叠加淡入（方案 B：DOM img + CSS opacity transition）
- [x] 30 个星座卡通 SVG 全部完成 ✅

## 星座卡通 SVG 进度（30/30 全部完成！）✅
- [x] orion（猎户座）— 人形猎人，头盔/皮甲/腰带三金星/盾牌/弓箭
- [x] leo（狮子座）— 卡通大狮子，鬃毛/爪子/尾巴/胡须/♌符号
- [x] scorpius（天蝎座）— 紫色大蝎子，钳子/六腿/弯尾/红尾针
- [x] canis_major（大犬座）— 棕色猎犬，天狼星星标/垂耳/红项圈/舌头
- [x] sagittarius（射手座/人马座）— 半人半马，拉弓射箭/头盔/马蹄
- [x] gemini（双子座）— 蓝粉两小孩手牵手，♊符号
- [x] taurus（金牛座）— 圆滚滚白牛，金角/大鼻/铃铛项圈/♉符号
- [x] ursa_major（大熊座）— 棕色胖熊，身体上印有北斗七星连线
- [x] aquila（天鹰座）— 展翅老鹰，胸口牛郎星/鹰钩嘴/白头冠
- [x] cygnus（天鹅座）— 大白天鹅，皇冠/S形长颈/天津四星/水波纹
- [x] virgo（室女座）— 花冠少女，麦穗/♍符号/粉花冠/飘逸金发
- [x] andromeda（仙女座）— 王冠公主，手腕枷锁/链条/星裙/泪珠
- [x] perseus（英仙座）— 英雄武士，银甲/飞马/美杜莎头/宝剑
- [x] bootes（牧夫座）— 草帽大叔，权杖顶星/大角星/北斗小图/山羊胡
- [x] aries（白羊座）— 卷角小白羊，大卷角/羊毛纹理/♈符号
- [x] capricornus（摩羯座）— 羊头鱼身，弯角/鱼尾/鱼鳞/♑符号
- [x] hercules（武仙座）— 肌肉英雄，棍棒/蛇/头带/腹肌
- [x] lyra（天琴座）— 竖琴，7根琴弦/织女星标注/音符
- [x] draco（天龙座）— 紫色飞龙，S形身体/火焰/翅膀/北极星
- [x] ursa_minor（小熊座）— 小胖熊，头顶北极星/小北斗连线
- [x] cassiopeia（仙后座）— 女王，W形王冠/王冠宝石/星裙
- [x] lynx（天猫座）— 猞猁，尖耳毛簇/猫眼竖瞳/身体斑点
- [x] pegasus（飞马座）— 白色飞马，大翅膀/四边形标记/白色鬃毛
- [x] canis_minor（小犬座）— 萌系小狗，下垂耳/南河三星标/橙色项圈
- [x] aquarius（水瓶座）— 美少年，宝瓶倒水/蓝色水流/金色卷发
- [x] pisces（双鱼座）— 双鱼，丝带相连/蓝粉两色/水泡装饰/♓符号
- [x] libra（天秤座）— 正义天平，蒙眼女神/两盘平衡/羽毛与心
- [x] corona_borealis（北冕座）— 弧形皇冠，7颗宝石星/垂挂宝石链
- [x] ophiuchus（蛇夫座）— 持蛇医神，双蛇/蛇杖/月桂冠/长袍
- [x] hydra（长蛇座）— 超长海蛇，S形身体/分叉舌头/青龙鳞片

## 约定：如何给星座新增 SVG 图
1. 在 `imgs/` 下新建 `{id}.svg`，viewBox="0 0 280 420"，人物居中
2. 在 `data.js` 对应星座对象里加 `imageFile: '{id}'`
3. 无需改 game.js，会自动走 animateSilhouetteImg 逻辑

## 待完成
- [ ] data.js 补充其余 58 个 IAU 星座数据
- [ ] 游戏难度递增机制
- [ ] 音效文件（当前用 Web Audio API 合成音）
- [ ] 部署到 CloudStudio 或静态托管

## 技术决策
- 架构参考 gameMatch（数据/逻辑/渲染分离）
- 纯前端，零外部依赖
- 星图用 Canvas 2D 绘制（非 SVG）
- 进度存 localStorage
- 游戏交互：拖拽连线（鼠标 + 触摸）

## 已知问题
- `js/ui.js` 未创建，所有 UI 逻辑已合并入 `js/game.js`
- `index.html` 已移除 `ui.js` 引用，无需补充该文件
