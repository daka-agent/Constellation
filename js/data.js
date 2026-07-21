/* ===========================================
   行桌 — 星座数据
   88星座（基于 HYG v4.1 + Stellarium 官方连线重新校准）
   正交投影：切平面投影，保形无畸变
   恒星筛选：每星座最多14颗主星，按视星等筛选
   =========================================== */

const CONSTELLATIONS = [
  {
    id: "andromeda",
    name: "仙女座",
    pinyin: "xiān nǚ zuò",
    englishName: "Andromeda",
    story: "仙女座是秋季夜空中最著名的星座之一，因为它包含着肉眼可见的最远天体——仙女座星系（M31）。\n\n在希腊神话中，公主安德洛墨达被锁在海边的岩石上，作为献给海怪的祭品。英雄珀尔修斯恰好路过，他用美杜莎的头颅将海怪变成石头，救下了公主，并与她结为夫妻。\n\n后来，安德洛墨达、她的父母和珀尔修斯都被升上天空，成为相邻的几个星座。",
    funFacts: [
    "仙女座星系（M31）距地球约250万光年，是肉眼能看到的最远天体！",
    "仙女座星系正以每秒110公里的速度向银河系靠近，约40亿年后将与银河系碰撞合并！",
    "仙女座中最亮的星叫「壁宿二」，在中国古代天文学中属于「壁宿」。"
    ],
    stars: [
      {x: 10.0, y: 217.4, label: "Alpheratz"},
      {x: 160.0, y: 150.5, label: "Mirach"},
      {x: 270.0, y: 62.6, label: "Almach"},
      {x: 87.1, y: 204.1, label: "δ And"},
      {x: 130.0, y: 118.0, label: "μ And"},
      {x: 115.2, y: 88.4, label: "ν And"}
    ],
    lines: [
          [0, 3],
      [3, 1],
      [2, 1],
      [1, 4],
      [4, 5]
    ],
    difficulty: 2,
    starsCount: 6,
    imageFile: 'andromeda',
  },
  {
    id: "antlia",
    name: "唧筒座",
    pinyin: "jī tǒng zuò",
    englishName: "Antlia",
    story: "唧筒座是一个老式气泵！在17世纪，法国天文学家拉卡伊在南天发明了一些新星座，不按神话命名，而是用当时的新科技工具来命名。唧筒座就是其中之一——它代表科学实验用的空气泵。\n\n虽然星星很暗，但唧筒座提醒我们：天空不只是神话的画卷，也是科学的实验室。",
    funFacts: [
    "唧筒座是拉卡伊创造的14个南天星座之一，这些星座都用科学仪器命名，告别了神话时代！",
    "唧筒座最亮的星也只有4.3等，在光污染的地方很难看到。"
    ],
    stars: [
      {x: 270.0, y: 33.6, label: "α Ant"},
      {x: 10.0, y: 246.4, label: "η Ant"}
    ],
    lines: [
          [0, 1]
    ],
    difficulty: 2,
    starsCount: 2,
    imageFile: 'antlia',
  },
  {
    id: "apus",
    name: "天燕座",
    pinyin: "tiān yàn zuò",
    englishName: "Apus",
    story: "天燕座是一只极乐鸟（也叫风鸟），生活在南太平洋！16世纪欧洲航海者第一次看到极乐鸟时，惊叹于它华丽的羽毛，以为它们没有脚，永远在天上飞——其实只是标本去掉了脚。\n\n天燕座紧挨着南天极，在南天极附近翱翔，永远飞不出南半球的天空。",
    funFacts: [
    "天燕座名字Apus源自希腊语，意思是「没有脚的鸟」——因为早期探险家看到的标本都没有脚！",
    "天燕座是离南天极最近的星座之一，在南半球一年四季可见。"
    ],
    stars: [
      {x: 10.0, y: 183.1, label: "α Aps"},
      {x: 237.9, y: 155.8, label: "γ Aps"},
      {x: 270.0, y: 96.9, label: "β Aps"}
    ],
    lines: [
          [0, 1],
      [1, 2]
    ],
    difficulty: 2,
    starsCount: 3,
    imageFile: 'apus',
  },
  {
    id: "aquarius",
    name: "宝瓶座",
    pinyin: "bǎo píng zuò",
    englishName: "Aquarius",
    story: "宝瓶座是黄道十二星座之一，它代表着手持宝瓶倒水的美少年伽倪墨得斯。\n\n伽倪墨得斯是特洛伊王子，拥有一头金发和出众的美貌。宙斯对他一见钟情，化身为一只巨鹰（天鹰座）将他带到奥林匹斯山，担任众神的斟酒者。\n\n伽倪墨得斯手中的宝瓶不断倾倒出美酒，酒水从瓶中流出，化作了天上的银河。",
    funFacts: [
    "宝瓶座流星雨每年7月底达到极大，虽然不如其他流星雨壮观，但非常有诗意。",
    "在中国古代，宝瓶座被称为「虚宿」和「危宿」，属于二十八宿的北方玄武七宿。",
    "宝瓶座虽然不亮，但它的形状很独特——像水从瓶中倾泻而下。"
    ],
    stars: [
      {x: 81.1, y: 106.1, label: "Sadalsuud"},
      {x: 140.2, y: 67.5, label: "Sadalmelik"},
      {x: 224.7, y: 177.0, label: "Skat"},
      {x: 180.9, y: 65.1, label: "Alsad"},
      {x: 247.5, y: 214.9, label: "88 Aqr"},
      {x: 222.5, y: 118.7, label: "Hydor"},
      {x: 10.0, y: 137.9, label: "Albali"},
      {x: 168.2, y: 74.7, label: "Sadachbia"},
      {x: 270.0, y: 208.2, label: "98 Aqr"},
      {x: 192.4, y: 65.8, label: "η Aqr"},
      {x: 216.5, y: 161.2, label: "τ² Aqr"},
      {x: 159.9, y: 119.9, label: "Ancha"},
      {x: 262.5, y: 130.4, label: "ψ¹ Aqr"},
      {x: 142.5, y: 163.2, label: "ι Aqr"}
    ],
    lines: [
          [0, 1],
      [1, 7],
      [7, 3],
      [3, 9],
      [9, 5],
      [5, 12],
      [12, 8],
      [1, 11],
      [11, 13],
      [10, 2],
      [2, 4],
      [6, 0]
    ],
    difficulty: 3,
    starsCount: 14,
    imageFile: 'aquarius',
  },
  {
    id: "aquila",
    name: "天鹰座",
    pinyin: "tiān yīng zuò",
    englishName: "Aquila",
    story: "天鹰座是夏季夜空中一个生动的小星座，形状像一只展翅飞翔的雄鹰。\n\n在希腊神话中，这只鹰是宙斯的忠实使者。它曾经为宙斯叼来神奇的甘露，也曾将特洛伊战争中的英雄伽倪墨得斯带到奥林匹斯山，成为众神的斟酒者。\n\n在中国，天鹰座最亮的星叫「牛郎星」或「牵牛星」，是著名的七夕传说中的主角。牛郎星与织女星隔着银河相望，每年七月初七才能通过鹊桥相会。",
    funFacts: [
    "牛郎星（天鹰座α）是夏季大三角的一员，另外两颗是织女星和天津四！",
    "牛郎星的自转速度非常快，每8.9小时就转一圈（太阳需要25天），所以它被甩成了一个扁球！",
    "七夕节那天，如果你真的能看到鹊桥，它应该跨越16光年——那是牛郎星和织女星之间的距离！"
    ],
    stars: [
      {x: 187.5, y: 91.3, label: "Altair"},
      {x: 172.7, y: 68.6, label: "Tarazed"},
      {x: 42.8, y: 25.9, label: "Okab"},
      {x: 254.8, y: 217.1, label: "Almizan III"},
      {x: 105.5, y: 166.7, label: "Deneb Okab"},
      {x: 43.1, y: 270.0, label: "Al Thalimain I"},
      {x: 202.5, y: 123.4, label: "Alshain"},
      {x: 193.6, y: 194.1, label: "Almizan II"},
      {x: 25.2, y: 10.0, label: "Deneb el Okab"}
    ],
    lines: [
          [6, 0],
      [0, 1],
      [0, 4],
      [4, 7],
      [3, 7],
      [4, 2],
      [2, 8],
      [4, 5]
    ],
    difficulty: 1,
    starsCount: 9,
    imageFile: 'aquila',
  },
  {
    id: "ara",
    name: "天坛座",
    pinyin: "tiān tán zuò",
    englishName: "Ara",
    story: "天坛座是一个用来祭神的祭坛！在希腊神话中，众神在奥林匹斯山上点燃天坛，对着它发誓结盟对抗泰坦巨神。天坛座位于南天，在天蝎座的尾巴下方。\n\n古希腊人相信天坛上的火焰是永不熄灭的圣火，象征人与神之间的约定。",
    funFacts: [
    "天坛座在古代被认为是希腊诸神的祭坛，他们对着它发誓结盟。",
    "天坛座中有一团美丽的星团NGC 6397，是距离地球最近的球状星团之一，只有7800光年！"
    ],
    stars: [
      {x: 141.3, y: 14.6, label: "α Ara"},
      {x: 116.2, y: 145.5, label: "β Ara"},
      {x: 29.6, y: 160.0, label: "ζ Ara"},
      {x: 116.4, y: 165.2, label: "γ Ara"},
      {x: 132.2, y: 265.4, label: "δ Ara"},
      {x: 270.0, y: 31.2, label: "θ Ara"},
      {x: 10.0, y: 233.4, label: "η Ara"}
    ],
    lines: [
          [5, 0],
      [0, 2],
      [2, 6],
      [6, 4],
      [4, 3],
      [3, 1],
      [1, 5]
    ],
    difficulty: 2,
    starsCount: 7,
    imageFile: 'ara',
  },
  {
    id: "aries",
    name: "白羊座",
    pinyin: "bái yáng zuò",
    englishName: "Aries",
    story: "白羊座的故事要从一只会飞的金毛神羊说起！\n\n很久以前，希腊有一位王子叫佛里克索斯，他和妹妹赫勒被邪恶的继母陷害，要被献祭给天神。就在最危急的时刻，一只全身长着金色羊毛、会飞的公羊从天而降，驮着兄妹俩飞上了天空！\n\n可是在飞越大海时，妹妹赫勒不小心从羊背上滑落，掉进了海里（这片海后来就叫赫勒斯滂）。哥哥佛里克索斯安全抵达了目的地，他把金羊献给宙斯作为祭品。\n\n宙斯收下了金羊，并将它的金羊毛高挂在树林中——这就是后来伊阿宋和阿尔戈英雄们远赴重洋寻找的「金羊毛」。而金羊本身则被宙斯升入星空，成为白羊座！",
    funFacts: [
    "白羊座虽然不大，但它是占星学中12黄道星座的第一个哦！",
    "白羊座最亮的星叫「娄宿一」，位于羊头的位置，是一颗橘红色的巨星。",
    "在古代巴比伦，春分点位于白羊座，所以白羊座被视为一年之始的象征！"
    ],
    stars: [
      {x: 76.2, y: 139.6, label: "Hamal"},
      {x: 16.1, y: 192.7, label: "Sheratan"},
      {x: 270.0, y: 56.6, label: "Bharani"},
      {x: 10.0, y: 223.4, label: "Mesarthim"}
    ],
    lines: [
          [2, 0],
      [0, 1],
      [1, 3]
    ],
    difficulty: 1,
    starsCount: 4,
    imageFile: 'aries',
  },
  {
    id: "auriga",
    name: "御夫座",
    pinyin: "yù fū zuò",
    englishName: "Auriga",
    story: "御夫座的形象是一个驾着战车的车夫。传说他是火神与工匠之神的儿子，发明了四马战车！\n\n他怀抱着几只小山羊——其中一只被天神宙斯抚养长大，长大后它的角变成了魔法号角。御夫座最亮的五颗星排成一个五边形，像一顶帽子。",
    funFacts: [
    "御夫座最亮的星「五车二」是全天第六亮星，但它在南半球几乎看不见！",
    "在中国古代，御夫座的主星称为「五车」，意思是五辆战车并排行驶。"
    ],
    stars: [
      {x: 111.4, y: 10.0, label: "Capella"},
      {x: 135.9, y: 270.0, label: "Elnath"},
      {x: 224.2, y: 22.2, label: "Menkalinan"},
      {x: 235.6, y: 137.4, label: "Mahasim"},
      {x: 44.4, y: 198.5, label: "Hassaleh"},
      {x: 69.1, y: 81.5, label: "Saclateni"}
    ],
    lines: [
          [3, 2],
      [2, 0],
      [0, 5],
      [5, 4],
      [1, 4],
      [1, 3]
    ],
    difficulty: 3,
    starsCount: 6,
    imageFile: 'auriga',
  },
  {
    id: "bootes",
    name: "牧夫座",
    pinyin: "mù fū zuò",
    englishName: "Bootes",
    story: "牧夫座是春季夜空中一个有趣的星座，它的形状像一个巨大的风筝。\n\n在希腊神话中，牧夫座代表的是一位名叫阿拉图斯的农夫。他发明了用葡萄藤压榨葡萄酿酒的方法，并将这项技术传授给了人类。作为奖励，他被升上天空成为牧夫座。\n\n也有传说认为牧夫座是俄里翁的牧羊人，负责照看猎人的羊群。",
    funFacts: [
    "大角星（牧夫座α）是北半球夜空中最亮的恒星，也是一颗橙巨星，亮度是太阳的110倍！",
    "大角星在中国古代被称为「大角」，是二十八宿之外最重要的导航星之一。",
    "每年6月，大角星在傍晚高悬于头顶，是寻找牧夫座的最佳时机。"
    ],
    stars: [
      {x: 107.8, y: 217.0, label: "Arcturus"},
      {x: 173.8, y: 140.2, label: "Izar"},
      {x: 59.3, y: 222.1, label: "Muphrid"},
      {x: 145.7, y: 31.5, label: "Seginus"},
      {x: 234.0, y: 75.9, label: "Thiba"},
      {x: 201.2, y: 10.0, label: "Nekkar"},
      {x: 145.2, y: 108.3, label: "ρ Boo"},
      {x: 167.3, y: 270.0, label: "ζ Boo"},
      {x: 46.0, y: 246.3, label: "υ Boo"}
    ],
    lines: [
          [7, 0],
      [0, 1],
      [1, 4],
      [4, 5],
      [5, 3],
      [3, 6],
      [6, 0],
      [0, 2],
      [2, 8]
    ],
    difficulty: 2,
    starsCount: 9,
    imageFile: 'bootes',
  },
  {
    id: "caelum",
    name: "雕具座",
    pinyin: "diāo jù zuò",
    englishName: "Caelum",
    story: "雕具座是一个雕刻用的凿子！它是拉卡伊在18世纪发明的星座之一。雕具座位于南天一个非常暗的区域，像一把不起眼的工具静静地躺在天鸽座和波江座之间。\n\n这把小小的凿子代表所有默默工作的匠人——虽然不耀眼，但他们的工作造就了伟大的艺术作品。",
    funFacts: [
    "雕具座是88星座中最暗又最小的星座之一，原名叫「雕刻师之凿」。",
    "雕具座本身虽然不出名，但它是拉卡伊「科学仪器」星座家族的一员。"
    ],
    stars: [
      {x: 163.5, y: 166.9, label: "α Cae"},
      {x: 174.6, y: 10.0, label: "β Cae"},
      {x: 105.4, y: 270.0, label: "δ Cae"}
    ],
    lines: [
          [2, 0],
      [0, 1]
    ],
    difficulty: 1,
    starsCount: 3,
    imageFile: 'caelum',
  },
  {
    id: "camelopardalis",
    name: "鹿豹座",
    pinyin: "lù bào zuò",
    englishName: "Camelopardalis",
    story: "鹿豹座是天空中一个很大但很暗的星座，代表一只长颈鹿！在古代没有这个星座，直到17世纪才被命名。\n\n有人说它像圣经中的骆驼，也有人说它是长颈鹿。这只「长颈鹿」把头伸到了北极星附近，脖子伸得老长，跨过了一大片暗沉的天空。",
    funFacts: [
    "鹿豹座名字来自动物的混合——Camelus（骆驼）和Pardalis（豹），以前欧洲人以为长颈鹿是骆驼和豹的混血！",
    "鹿豹座虽然面积很大（排第十八），但完全没有任何亮于4等的星星。"
    ],
    stars: [
      {x: 73.5, y: 270.0, label: "HIP 16228"},
      {x: 206.5, y: 187.6, label: "α Cam"},
      {x: 127.0, y: 120.9, label: "γ Cam"},
      {x: 125.1, y: 234.4, label: "HIP 18505"},
      {x: 198.4, y: 10.0, label: "HIP 25110"}
    ],
    lines: [
          [0, 3],
      [3, 1],
      [0, 2],
      [2, 1],
      [2, 4]
    ],
    difficulty: 2,
    starsCount: 5,
    imageFile: 'camelopardalis',
  },
  {
    id: "cancer",
    name: "巨蟹座",
    pinyin: "jù xiè zuò",
    englishName: "Cancer",
    story: "巨蟹是天后赫拉派去骚扰英雄赫拉克勒斯的小螃蟹！当时赫拉克勒斯正在大战九头蛇许德拉，这只小螃蟹偷偷爬过去夹住他的脚……\n\n虽然小螃蟹被赫拉克勒斯一脚踩扁了，但赫拉念它忠心耿耿，把它升上天空成为巨蟹座，永远在黄道上闪闪发光！",
    funFacts: [
    "巨蟹座最著名的天体是M44蜂巢星团，又叫「鬼星团」，肉眼看去像一小团淡淡的云！",
    "巨蟹座的符号♋代表螃蟹的两只钳子，它是12黄道星座中最暗的一个。"
    ],
    stars: [
      {x: 71.0, y: 270.0, label: "Tarf"},
      {x: 163.2, y: 151.6, label: "Asellus Australis"},
      {x: 167.6, y: 10.0, label: "Zubanah"},
      {x: 209.0, y: 234.8, label: "Acubens"},
      {x: 158.5, y: 107.2, label: "Asellus Borealis"},
      {x: 88.7, y: 29.9, label: "χ Cnc"}
    ],
    lines: [
          [2, 4],
      [4, 5],
      [4, 1],
      [1, 0],
      [1, 3]
    ],
    difficulty: 2,
    starsCount: 6,
    imageFile: 'cancer',
  },
  {
    id: "canes_venatici",
    name: "猎犬座",
    pinyin: "liè quǎn zuò",
    englishName: "Canes Venatici",
    story: "猎犬座是牧夫座牵着的一对猎犬！它们正在帮牧夫追赶大熊和小熊。猎犬座是被天文学家赫维留在17世纪发明出来的，代表两条兴奋的猎狗。\n\n它们的主人牧夫座一手拿权杖，一手牵着猎犬，在北极附近巡逻，防止大熊碰倒天空。",
    funFacts: [
    "猎犬座中最著名的天体是M51漩涡星系——它是第一个被观测到螺旋结构的星系！",
    "猎犬座的双主星「常陈一」和「常陈三」组成了猎犬的形象，一颗像狗头，一颗像狗身。"
    ],
    stars: [
      {x: 270.0, y: 232.4, label: "Cor Caroli"},
      {x: 10.0, y: 47.6, label: "Chara"}
    ],
    lines: [
          [1, 0]
    ],
    difficulty: 1,
    starsCount: 2,
    imageFile: 'canes_venatici',
  },
  {
    id: "canis_major",
    name: "大犬座",
    pinyin: "dà quǎn zuò",
    englishName: "Canis Major",
    story: "大犬座是冬季夜空中最令人激动的星座——因为它拥有全天最亮的恒星！\n\n在希腊神话中，大犬是猎人俄里翁的忠实猎犬。它跟随俄里翁一起打猎，形影不离。当天神将俄里翁升上天空成为猎户座后，这条忠实的猎犬也被送上天空，紧紧跟随着它的主人。\n\n有趣的是，大犬座和猎户座在夜空中确实是相邻的，就像生前一样。",
    funFacts: [
    "天狼星（大犬座α）是全天最亮的恒星！它的亮度是太阳的25倍，距离我们只有8.6光年。",
    "天狼星在中国古代被称为「天狼」，苏轼有词云「会挽雕弓如满月，西北望，射天狼」！",
    "每年2月初，天狼星会在傍晚出现在南方天空，是找它最好的时候。"
    ],
    stars: [
      {x: 118.5, y: 69.2, label: "Sirius"},
      {x: 158.6, y: 225.2, label: "Adhara"},
      {x: 186.7, y: 192.9, label: "Wezen"},
      {x: 50.8, y: 87.3, label: "Mirzam"},
      {x: 229.2, y: 231.5, label: "Aludra"},
      {x: 171.9, y: 159.9, label: "Al Zara"},
      {x: 52.9, y: 241.8, label: "Furud"},
      {x: 167.4, y: 212.2, label: "Nganurganity"},
      {x: 134.5, y: 270.0, label: "κ CMa"},
      {x: 93.4, y: 102.1, label: "ν² CMa"},
      {x: 204.8, y: 198.2, label: "ω CMa"},
      {x: 146.1, y: 10.0, label: "θ CMa"},
      {x: 175.6, y: 55.5, label: "Muliphein"},
      {x: 152.1, y: 73.3, label: "ι CMa"}
    ],
    lines: [
          [11, 12],
      [12, 13],
      [13, 0],
      [0, 5],
      [5, 2],
      [2, 10],
      [10, 4],
      [1, 7],
      [7, 2],
      [9, 3],
      [9, 0],
      [1, 8],
      [6, 1],
      [13, 11]
    ],
    difficulty: 1,
    starsCount: 14,
    imageFile: 'canis_major',
  },
  {
    id: "canis_minor",
    name: "小犬座",
    pinyin: "xiǎo quǎn zuò",
    englishName: "Canis Minor",
    story: "小犬座是冬季夜空中一个小型星座，它代表着俄里翁的第二只猎犬。\n\n在希腊神话中，小犬座是俄里翁的另一只猎犬，也许体型较小，但同样忠心耿耿。它与大犬座一起，陪伴着猎户座在夜空中巡逻。\n\n小犬座虽然不大，但有一颗相当亮的星——南河三，它是全天第八亮的恒星。",
    funFacts: [
    "南河三（小犬座α）是全天第八亮的恒星，也是距离我们较近的恒星之一。",
    "南河三和天狼星、参宿四组成的三角形，是冬季夜空中最容易辨认的标记之一！",
    "在中国古代，南河三被称为「南河三」，与北河三（双子座）遥相呼应。"
    ],
    stars: [
      {x: 267.9, y: 270.0, label: "Procyon"},
      {x: 12.1, y: 10.0, label: "Gomeisa"}
    ],
    lines: [
          [0, 1]
    ],
    difficulty: 1,
    starsCount: 2,
    imageFile: 'canis_minor',
  },
  {
    id: "capricornus",
    name: "摩羯座",
    pinyin: "mó jié zuò",
    englishName: "Capricornus",
    story: "摩羯座是黄道十二星座之一，它的形状像一只半羊半鱼的神兽。\n\n在希腊神话中，牧神潘在一次众神的聚会上，为了逃避怪物提丰，跳入尼罗河中，下半身变成了鱼尾，上半身保留了山羊的样子。\n\n后来，这个奇特的形象被升上天空，成为摩羯座。在中国古代，摩羯座被称为「牛宿」和「斗宿」的一部分。",
    funFacts: [
    "摩羯座是黄道十二星座中最暗的一个，它的形状像一个倒置的鸟嘴。",
    "每年8-9月的傍晚，摩羯座出现在南方低空，是观测它的时候。",
    "在中国古代，摩羯座所在的区域是「牛宿」，属于二十八宿的北方玄武七宿。"
    ],
    stars: [
      {x: 270.0, y: 97.7, label: "Deneb Algedi"},
      {x: 19.8, y: 81.5, label: "Dabih"},
      {x: 10.0, y: 55.0, label: "Algedi"},
      {x: 249.8, y: 103.1, label: "Nashira"},
      {x: 208.8, y: 171.2, label: "Yen"},
      {x: 150.9, y: 107.4, label: "θ Cap"},
      {x: 112.3, y: 224.9, label: "ω Cap"},
      {x: 96.2, y: 205.4, label: "ψ Cap"},
      {x: 198.2, y: 103.2, label: "ι Cap"}
    ],
    lines: [
          [2, 1],
      [1, 5],
      [5, 8],
      [8, 3],
      [3, 0],
      [8, 4],
      [4, 5],
      [1, 7],
      [5, 6]
    ],
    difficulty: 3,
    starsCount: 9,
    imageFile: 'capricornus',
  },
  {
    id: "carina",
    name: "船底座",
    pinyin: "chuán dǐ zuò",
    englishName: "Carina",
    story: "船底座和船尾座、船帆座原来是一个巨大的星座——南船座！它代表希腊英雄伊阿宋寻找金羊毛乘坐的阿尔戈号大船。\n\n后来天文学家觉得南船座太大了，就把它拆分成了三个星座：船底座（船身）、船尾座（船尾）和船帆座（船帆）。船底座的星星最亮！",
    funFacts: [
    "船底座中最亮的星「老人星」是全天第二亮星（仅次于天狼星），古代中国人视它为南极仙翁的化身！",
    "船底座η星云是银河系中最大最神秘的星云之一，曾经发生过剧烈的恒星大爆发。"
    ],
    stars: [
      {x: 28.8, y: 168.0, label: "Canopus"},
      {x: 179.2, y: 225.4, label: "Miaplacidus"},
      {x: 137.5, y: 164.8, label: "Avior"},
      {x: 181.5, y: 158.9, label: "Aspidiske"},
      {x: 93.0, y: 49.3, label: "Naos"},
      {x: 239.5, y: 201.1, label: "θ Car"},
      {x: 10.0, y: 109.4, label: "ν Car"},
      {x: 212.1, y: 230.7, label: "ω Car"},
      {x: 227.1, y: 177.3, label: "HIP 50371"},
      {x: 176.5, y: 157.0, label: "HIP 45080"},
      {x: 259.1, y: 170.4, label: "HIP 53253"},
      {x: 239.5, y: 163.2, label: "HIP 51232"},
      {x: 270.0, y: 175.8, label: "HIP 54463"},
      {x: 152.2, y: 163.9, label: "HIP 42568"}
    ],
    lines: [
          [1, 7],
      [7, 5],
      [12, 10],
      [10, 11],
      [11, 8],
      [8, 3],
      [13, 2],
      [2, 0],
      [9, 3],
      [9, 13],
      [0, 6],
      [2, 4]
    ],
    difficulty: 2,
    starsCount: 14,
    imageFile: 'carina',
  },
  {
    id: "cassiopeia",
    name: "仙后座",
    pinyin: "xiān hòu zuò",
    englishName: "Cassiopeia",
    story: "仙后座是秋季夜空中最容易辨认的星座——它的五颗亮星排成一个清晰的「W」或「M」形。\n\n在希腊神话中，仙后座是埃塞俄比亚王后卡西俄珀亚。她因为夸耀自己和女儿的美貌胜过海神涅柔斯的女儿们，招致海神的愤怒，将母女二人置于险境。\n\n后来，她和丈夫、女儿一同被送上天空，成为四个著名的星座。",
    funFacts: [
    "仙后座的五颗主星排成W形，在北半球秋季高悬天空。",
    "它与大熊座隔着北极星遥遥相对，一个升起时另一个就落下。",
    "中国古代叫它「王良」、「策」，是古代星官体系的一部分！"
    ],
    stars: [
      {x: 136.5, y: 134.4, label: "Cih"},
      {x: 88.5, y: 219.3, label: "Schedar"},
      {x: 10.0, y: 153.5, label: "Caph"},
      {x: 211.6, y: 141.6, label: "Ruchbah"},
      {x: 270.0, y: 60.7, label: "Segin"}
    ],
    lines: [
          [4, 3],
      [3, 0],
      [0, 1],
      [1, 2]
    ],
    difficulty: 1,
    starsCount: 5,
    imageFile: 'cassiopeia',
  },
  {
    id: "centaurus",
    name: "半人马座",
    pinyin: "bàn rén mǎ zuò",
    englishName: "Centaurus",
    story: "半人马座是南天一个非常大的星座，代表一名半人半马的智者——喀戎。他是希腊神话中最聪明的老师，许多英雄都是他的学生！\n\n喀戎擅长医术、音乐和射箭。他和射手座的人马不一样——射手座是粗犷的猎手，而半人马座是文雅的老师。",
    funFacts: [
    "半人马座中有「比邻星」，是距离太阳最近的恒星，只有4.24光年！",
    "半人马座ω星团是银河系中最大最亮的球状星团，包含约1000万颗星星！"
    ],
    stars: [
      {x: 203.5, y: 232.0, label: "Rigil Kentaurus"},
      {x: 165.4, y: 222.8, label: "Hadar"},
      {x: 186.6, y: 10.0, label: "Menkent"},
      {x: 53.6, y: 128.6, label: "Menkent"},
      {x: 138.7, y: 160.7, label: "ε Cen"},
      {x: 230.0, y: 67.4, label: "η Cen"},
      {x: 162.3, y: 105.8, label: "Al Nair al Kentaurus"},
      {x: 12.2, y: 155.5, label: "δ Cen"},
      {x: 103.7, y: 12.2, label: "ι Cen"},
      {x: 18.9, y: 270.0, label: "λ Cen"},
      {x: 267.8, y: 75.3, label: "Ke Kwan"},
      {x: 154.5, y: 55.4, label: "ν Cen"},
      {x: 154.5, y: 62.4, label: "μ Cen"},
      {x: 168.4, y: 83.8, label: "υ¹ Cen"}
    ],
    lines: [
          [0, 1],
      [1, 4],
      [4, 6],
      [6, 13],
      [13, 12],
      [12, 11],
      [11, 2],
      [12, 5],
      [5, 10],
      [6, 3]
    ],
    difficulty: 3,
    starsCount: 14,
    imageFile: 'centaurus',
  },
  {
    id: "cepheus",
    name: "仙王座",
    pinyin: "xiān wáng zuò",
    englishName: "Cepheus",
    story: "仙王座是仙后座的丈夫、仙女座的爸爸！他是埃塞俄比亚的国王刻甫斯。他的王后太过骄傲，惹怒了海神，公主被锁在岩石上等待海怪——后来被英雄珀耳修斯所救。\n\n仙王座像一个房子形状的五边形，就在北极星附近，在北方天空永远不落。",
    funFacts: [
    "仙王座中的「造父一」是一种特殊变星的原型——天文学家通过观测造父变星来测量星系距离！",
    "仙王座靠近北极，在北半球一年四季都能看到它，它永远不落下地平线。"
    ],
    stars: [
      {x: 68.8, y: 203.4, label: "Alderamin"},
      {x: 211.2, y: 10.0, label: "Errai"},
      {x: 103.4, y: 105.2, label: "Alfirk"},
      {x: 144.5, y: 270.0, label: "ζ Cep"},
      {x: 197.7, y: 164.1, label: "ι Cep"}
    ],
    lines: [
          [3, 4],
      [4, 2],
      [2, 0],
      [0, 3],
      [4, 1],
      [1, 2]
    ],
    difficulty: 1,
    starsCount: 5,
    imageFile: 'cepheus',
  },
  {
    id: "cetus",
    name: "鲸鱼座",
    pinyin: "jīng yú zuò",
    englishName: "Cetus",
    story: "鲸鱼座是全天第四大星座，代表一头巨大的海怪！在神话中，仙女座公主被她母亲炫耀美貌惹怒了海神，海神派这头海怪去摧毁她们的王国。\n\n后来英雄珀耳修斯用美杜莎的头把海怪石化了，拯救了公主。鲸鱼座变成了天空中的庞然大物。",
    funFacts: [
    "鲸鱼座中最亮的星「土司空」在阿拉伯语里是「鼻尖」的意思，是鲸鱼的鼻子！",
    "鲸鱼座中有一颗著名变星：刍藁增二，它是第一颗被发现的长周期变星。"
    ],
    stars: [
      {x: 51.0, y: 232.2, label: "Diphda"},
      {x: 270.0, y: 87.3, label: "Menkar"},
      {x: 86.0, y: 180.8, label: "Deneb Algenubi"},
      {x: 239.7, y: 92.4, label: "Kaffaljidhma"},
      {x: 143.6, y: 217.8, label: "Al Naymat II"},
      {x: 10.0, y: 173.7, label: "Baten Kaitos Shemali"},
      {x: 110.3, y: 167.4, label: "Al Naymat I"},
      {x: 155.0, y: 181.2, label: "Baten Kaitos"},
      {x: 233.6, y: 111.4, label: "Al Kaff al Jidhmah III"},
      {x: 239.0, y: 204.7, label: "Sadr al Kaitos IV"},
      {x: 241.3, y: 47.8, label: "Al Kaff al Jidhmah IV"},
      {x: 214.7, y: 58.1, label: "Al Kaff al Jidhmah II"},
      {x: 190.0, y: 55.5, label: "Al Kaff al Jidhmah I"}
    ],
    lines: [
          [12, 11],
      [4, 0],
      [0, 5],
      [0, 2],
      [2, 6],
      [6, 7],
      [8, 3],
      [3, 1],
      [10, 11]
    ],
    difficulty: 4,
    starsCount: 13,
    imageFile: 'cetus',
  },
  {
    id: "chamaeleon",
    name: "蝘蜓座",
    pinyin: "yǎn tíng zuò",
    englishName: "Chamaeleon",
    story: "蝘蜓座（变色龙座）是一只可以变换颜色的蜥蜴——变色龙！17世纪荷兰航海家在非洲和马达加斯加看到变色龙后，在南天创造了这个星座。\n\n变色龙能随着环境改变颜色，而蝘蜓座的星星藏在南天极附近的暗处，也在悄悄改变——这里有很多正在形成的年轻恒星！",
    funFacts: [
    "蝘蜓座是离南天极最近的星座之一，位于南天极附近。",
    "蝘蜓座中有很多年轻恒星和一片巨大的蝘蜓座暗星云，是恒星形成的活跃区域。"
    ],
    stars: [
      {x: 10.0, y: 122.5, label: "α Cha"},
      {x: 170.7, y: 118.6, label: "γ Cha"},
      {x: 270.0, y: 161.4, label: "β Cha"}
    ],
    lines: [
          [0, 1],
      [1, 2]
    ],
    difficulty: 2,
    starsCount: 3,
    imageFile: 'chamaeleon',
  },
  {
    id: "circinus",
    name: "圆规座",
    pinyin: "yuán guī zuò",
    englishName: "Circinus",
    story: "圆规座是一个画圆的工具——圆规！拉卡伊在1750年代创造它时，用它来代表绘图工具。圆规座紧挨着南天的南门二和半人马α星。\n\n虽然又小又暗，但圆规座的名字告诉我们：宇宙中完美的圆形轨道、圆形的星体和圆形的轨迹——都离不开圆规的象征。",
    funFacts: [
    "圆规座是88星座中最靠南的星座之一，紧挨着著名的南门二星（半人马座α）。",
    "圆规座中有一个漂亮的星系——圆规座星系，是一个活跃的塞弗特星系。"
    ],
    stars: [
      {x: 43.6, y: 270.0, label: "α Cir"},
      {x: 206.3, y: 10.0, label: "β Cir"},
      {x: 236.4, y: 33.0, label: "γ Cir"}
    ],
    lines: [
          [0, 2],
      [0, 1]
    ],
    difficulty: 1,
    starsCount: 3,
    imageFile: 'circinus',
  },
  {
    id: "columba",
    name: "天鸽座",
    pinyin: "tiān gē zuò",
    englishName: "Columba",
    story: "天鸽座是大洪水传说中诺亚放出去的鸽子！在圣经故事里，大洪水结束后，诺亚从方舟放出一只鸽子，鸽子叼回一枝橄榄叶，告诉诺亚洪水退了，大地又变绿了。\n\n这只有爱的和平之鸽被升到了天空中，永远叼着橄榄枝飞翔。",
    funFacts: [
    "天鸽座位于南天，由16世纪荷兰天文学家普朗修斯命名，有宗教和航海双重意义。",
    "天鸽座最亮的星「丈人一」在中国星官中配有「丈人」和「子」星，像一家人。"
    ],
    stars: [
      {x: 51.0, y: 39.4, label: "Phact"},
      {x: 109.7, y: 79.7, label: "Wazn"},
      {x: 270.0, y: 25.9, label: "δ Col"},
      {x: 10.0, y: 76.3, label: "ε Col"},
      {x: 149.8, y: 254.1, label: "η Col"},
      {x: 142.8, y: 67.5, label: "γ Col"},
      {x: 239.3, y: 66.5, label: "Kurud II"}
    ],
    lines: [
          [2, 6],
      [6, 5],
      [5, 1],
      [1, 4],
      [1, 0],
      [0, 3]
    ],
    difficulty: 2,
    starsCount: 7,
    imageFile: 'columba',
  },
  {
    id: "coma_berenices",
    name: "后发座",
    pinyin: "hòu fā zuò",
    englishName: "Coma Berenices",
    story: "后发座是埃及王后贝勒尼基的头发！传说国王出征打仗，王后许诺：如果国王平安归来，她就剪掉自己美丽的长发献给神。国王果然平安回来，王后就剪下长发放在神庙里。\n\n但第二天长发不见了！天文学家说：别慌，长发被神放到了天上，变成了一团美丽的星光——这就是后发座。",
    funFacts: [
    "后发座不是神话创造的星座，而是有真实历史背景——来源于公元前3世纪的埃及宫廷故事！",
    "后发座看上去像一片淡淡的星云，其实是由几十颗星星组成的疏散星团，距离我们约280光年。"
    ],
    stars: [
      {x: 258.5, y: 22.3, label: "β Com"},
      {x: 254.2, y: 270.0, label: "Diadem"},
      {x: 21.5, y: 10.0, label: "Al Dafirah"}
    ],
    lines: [
          [1, 0],
      [0, 2]
    ],
    difficulty: 2,
    starsCount: 3,
    imageFile: 'coma_berenices',
  },
  {
    id: "corona_australis",
    name: "南冕座",
    pinyin: "nán miǎn zuò",
    englishName: "Corona Australis",
    story: "南冕座是南天的皇冠！和北天的北冕座遥相呼应，南北各有一顶皇冠挂在星空中。它是古希腊天文学家托勒密列出的48个原始星座之一。\n\n这顶南天的小皇冠就在人马座的脚边，像一个散落的宝石环。",
    funFacts: [
    "南冕座是托勒密48星座之一，拥有古老的历史！但比北冕座暗得多。",
    "南冕座最亮的两颗星也只有4等，但弧形的小冠冕排列得非常精致。"
    ],
    stars: [
      {x: 270.0, y: 121.4, label: "β CrA"},
      {x: 267.7, y: 69.7, label: "Meridiana"},
      {x: 246.7, y: 39.0, label: "γ CrA"},
      {x: 257.2, y: 162.5, label: "δ CrA"},
      {x: 220.8, y: 219.1, label: "ζ CrA"},
      {x: 191.6, y: 40.0, label: "ε CrA"},
      {x: 86.5, y: 85.7, label: "λ CrA"},
      {x: 10.0, y: 139.6, label: "HIP 90887"},
      {x: 175.4, y: 241.0, label: "HIP 92953"},
      {x: 177.0, y: 48.5, label: "HIP 92989"}
    ],
    lines: [
          [6, 9],
      [9, 5],
      [5, 2],
      [2, 1],
      [1, 0],
      [0, 3],
      [3, 4],
      [4, 8],
      [6, 7]
    ],
    difficulty: 2,
    starsCount: 10,
    imageFile: 'corona_australis',
  },
  {
    id: "corona_borealis",
    name: "北冕座",
    pinyin: "běi miǎn zuò",
    englishName: "Corona Borealis",
    story: "北冕座是一顶美丽的皇冠，它是克里特公主阿里阿德涅的皇冠！\n\n英雄提修斯用阿里阿德涅送的线团找到了迷宫出口，杀死了米诺陶洛斯怪牛。后来阿里阿德涅与酒神狄俄尼索斯结婚，婚礼时她的皇冠被抛上天空，成为了北冕座。\n\n北冕座7颗星排成漂亮的弧形，就像一顶镶了宝石的皇冠，非常容易辨认！",
    funFacts: [
    "北冕座的7颗主星排成一个完整的弧形，是所有星座中形状最像其名字的之一！",
    "北冕座中最亮的星叫「贯索四」，中文的意思是串起宝座的第四颗星。",
    "2024年，天文学家发现北冕座中有一颗会周期性爆发的新星，预计几年内肉眼可见！"
    ],
    stars: [
      {x: 61.6, y: 211.0, label: "Alphecca"},
      {x: 10.0, y: 124.6, label: "Nusakan"},
      {x: 125.6, y: 226.6, label: "γ CrB"},
      {x: 51.5, y: 45.6, label: "θ CrB"},
      {x: 243.3, y: 204.3, label: "ε CrB"},
      {x: 180.3, y: 234.4, label: "δ CrB"},
      {x: 270.0, y: 97.7, label: "ι CrB"}
    ],
    lines: [
          [3, 1],
      [1, 0],
      [0, 2],
      [2, 5],
      [5, 4],
      [4, 6]
    ],
    difficulty: 2,
    starsCount: 7,
    imageFile: 'corona_borealis',
  },
  {
    id: "corvus",
    name: "乌鸦座",
    pinyin: "wū yā zuò",
    englishName: "Corvus",
    story: "乌鸦座是太阳神阿波罗的使者乌鸦！但这是一只懒乌鸦——阿波罗派它去取水，它却在半路看到无花果成熟了，停下来吃了三天才想起任务。\n\n它叼了一条水蛇回来撒谎说：泉水被水蛇堵住了！阿波罗大怒，把乌鸦连同水蛇和酒杯一起扔到了天上，乌鸦永远追着水杯，却永远喝不到里面的水。",
    funFacts: [
    "乌鸦座的四颗星排成一个歪歪扭扭的四边形，像乌鸦展开的翅膀。",
    "中国古人把乌鸦座叫做「轸宿」，是二十八宿之一，代表战车的后车厢。"
    ],
    stars: [
      {x: 98.8, y: 50.5, label: "Gienah"},
      {x: 230.2, y: 229.4, label: "Kraz"},
      {x: 201.2, y: 19.5, label: "Algorab"},
      {x: 60.3, y: 205.7, label: "Minkar"},
      {x: 49.8, y: 270.0, label: "Alchiba"},
      {x: 217.4, y: 10.0, label: "η Crv"}
    ],
    lines: [
          [5, 2],
      [2, 0],
      [0, 3],
      [3, 4],
      [3, 1],
      [1, 2]
    ],
    difficulty: 1,
    starsCount: 6,
    imageFile: 'corvus',
  },
  {
    id: "crater",
    name: "巨爵座",
    pinyin: "jù jué zuò",
    englishName: "Crater",
    story: "巨爵座是一个巨大的酒杯！在希腊神话中，太阳神阿波罗派乌鸦去取水，乌鸦却贪吃无花果耽误了时间。乌鸦回来时叼了一条水蛇交差，说水蛇堵住了泉水。\n\n阿波罗看穿了乌鸦的谎言，把乌鸦、水蛇和酒杯都扔上了天——乌鸦座、长蛇座和巨爵座就这样诞生了！",
    funFacts: [
    "巨爵座、长蛇座和乌鸦座是一个「神话三人组」——它们一起升到天上，互相挨着。",
    "巨爵座有一个「船底座」中提到的——它属于古代希腊神话中的一组相关星座。"
    ],
    stars: [
      {x: 99.4, y: 109.8, label: "δ Crt"},
      {x: 125.6, y: 166.2, label: "γ Crt"},
      {x: 10.0, y: 180.3, label: "Alkes"},
      {x: 66.8, y: 266.7, label: "Al Sharasif II"},
      {x: 181.8, y: 13.3, label: "θ Crt"},
      {x: 217.4, y: 180.0, label: "ζ Crt"},
      {x: 124.0, y: 33.6, label: "ε Crt"},
      {x: 270.0, y: 158.2, label: "η Crt"}
    ],
    lines: [
          [2, 3],
      [3, 1],
      [1, 0],
      [0, 2],
      [0, 6],
      [6, 4],
      [4, 7],
      [7, 5],
      [5, 1]
    ],
    difficulty: 2,
    starsCount: 8,
    imageFile: 'crater',
  },
  {
    id: "crux",
    name: "南十字座",
    pinyin: "nán shí zì zuò",
    englishName: "Crux",
    story: "南十字座是全天88个星座中最小却最著名的！它是南半球的标志，就像北半球的北斗七星一样重要。澳大利亚、新西兰和巴西的国旗上都有南十字座的身影！\n\n虽然面积最小，但它的四颗亮星组成完美十字架形状，在南方天空中格外耀眼。",
    funFacts: [
    "南十字座是全天最小的星座，但非常容易辨认，对南半球的航海者来说意义重大！",
    "澳大利亚、新西兰、巴西、巴布亚新几内亚的国旗上都有南十字座的图案。"
    ],
    stars: [
      {x: 116.7, y: 270.0, label: "Acrux"},
      {x: 230.3, y: 125.0, label: "Mimosa"},
      {x: 140.1, y: 10.0, label: "Gacrux"},
      {x: 49.7, y: 83.4, label: "Imai"}
    ],
    lines: [
          [2, 0],
      [1, 3]
    ],
    difficulty: 1,
    starsCount: 4,
    imageFile: 'crux',
  },
  {
    id: "cygnus",
    name: "天鹅座",
    pinyin: "tiān é zuò",
    englishName: "Cygnus",
    story: "天鹅座的形状像一只展翅飞翔的天鹅，它正朝着银河深处飞去。\n\n在希腊神话中，天鹅是宙斯变成的。为了接近美丽的斯巴达王后丽达，宙斯化身为一只优雅的天鹅。丽达被天鹅的优美所打动，将它抱入怀中……\n\n后来，这只天鹅被送上天空，永远在银河中翱翔。在中国，天鹅座最亮的天津四与牛郎、织女共同组成了「夏季大三角」。",
    funFacts: [
    "天津四是天鹅座最亮的星，中文名为「天津四」，意为「天河渡口的第四颗星」！",
    "天鹅座位于银河最亮的部分，用望远镜看能看到无数星星。",
    "天鹅座有一个著名的X射线源——天鹅座X-1，是最早被确认的黑hole候选者。"
    ],
    stars: [
      {x: 140.2, y: 102.8, label: "Deneb"},
      {x: 110.5, y: 149.4, label: "Sadr"},
      {x: 156.2, y: 203.9, label: "Aljanah"},
      {x: 50.6, y: 103.4, label: "Fawaris"},
      {x: 10.0, y: 254.2, label: "Albireo"},
      {x: 209.7, y: 231.2, label: "Fawaris III"},
      {x: 35.7, y: 42.5, label: "ι² Cyg"},
      {x: 21.5, y: 25.8, label: "Fawaris I"},
      {x: 63.4, y: 195.1, label: "η Cyg"},
      {x: 270.0, y: 232.2, label: "μ¹ Cyg"}
    ],
    lines: [
          [7, 6],
      [6, 3],
      [3, 1],
      [1, 0],
      [1, 2],
      [2, 5],
      [5, 9],
      [1, 8],
      [8, 4]
    ],
    difficulty: 2,
    starsCount: 10,
    imageFile: 'cygnus',
  },
  {
    id: "delphinus",
    name: "海豚座",
    pinyin: "hǎi tún zuò",
    englishName: "Delphinus",
    story: "海豚座是天空中小巧可爱的一个星座！在希腊神话中，海神波塞冬想娶美人鱼安菲特里忒，但她躲起来了。一只聪明的海豚找到了她，说服她嫁给海神。波塞冬非常感激，把海豚升上天空。\n\n海豚座的四颗主星排成一个小小的菱形，像海豚从水面跃出！",
    funFacts: [
    "海豚座的四颗主星组成一个漂亮的「工作台」钻石形状，英文叫Job's Coffin。",
    "海豚座是夏季星座，用双筒望远镜可以很容易找到这个小钻石。"
    ],
    stars: [
      {x: 109.8, y: 92.8, label: "Rotanev"},
      {x: 137.1, y: 21.8, label: "Sualocin"},
      {x: 52.0, y: 270.0, label: "Aldulfin"},
      {x: 228.0, y: 10.0, label: "Al Salib"},
      {x: 186.8, y: 66.9, label: "Al Ukud"}
    ],
    lines: [
          [2, 0],
      [0, 1],
      [1, 3],
      [3, 4],
      [4, 0]
    ],
    difficulty: 1,
    starsCount: 5,
    imageFile: 'delphinus',
  },
  {
    id: "dorado",
    name: "剑鱼座",
    pinyin: "jiàn yú zuò",
    englishName: "Dorado",
    story: "剑鱼座是一条长嘴剑鱼！也叫鬼头刀鱼，是热带海洋中一种闪闪发光的大鱼。16世纪荷兰航海家凯泽尔和豪特曼在南天绘制了它。\n\n剑鱼座虽然不大，但它的区域内藏着一个天文学宝藏——大麦哲伦云！大麦哲伦云中还有一个巨大的蜘蛛星云，是银河系附近最活跃的恒星诞生区。",
    funFacts: [
    "大麦哲伦云大部分在剑鱼座内！它是银河系最大的卫星星系，像南方天空中的一大片云雾。",
    "剑鱼座的蜘蛛星云如果放在猎户座大星云的位置，它会亮到可以在地面投下影子！"
    ],
    stars: [
      {x: 72.9, y: 68.0, label: "α Dor"},
      {x: 225.8, y: 205.6, label: "β Dor"},
      {x: 10.9, y: 10.0, label: "γ Dor"},
      {x: 242.6, y: 270.0, label: "δ Dor"},
      {x: 269.1, y: 222.3, label: "HIP 27890"}
    ],
    lines: [
          [3, 4],
      [4, 1],
      [1, 3],
      [1, 0],
      [0, 2]
    ],
    difficulty: 3,
    starsCount: 5,
    imageFile: 'dorado',
  },
  {
    id: "draco",
    name: "天龙座",
    pinyin: "tiān lóng zuò",
    englishName: "Draco",
    story: "天龙座是北天极附近最大的星座之一，它蜿蜒盘旋在天空的北部，像一条巨龙守卫着北极。\n\n在希腊神话中，这条龙守护着赫斯珀里得斯的金苹果园。它有一条剧毒的吐息，任何靠近的人都会被杀死。\n\n英雄赫拉克勒斯的第十二项任务，就是从金苹果园取来金苹果。他必须先对付这条巨龙……",
    funFacts: [
    "天龙座曾经是北极星座！5000年前，天龙座的α星（右枢）是北极星。",
    "天龙座中有一个著名的星团——M92，是北半球最亮的球状星团之一。",
    "每年7-8月的夜晚，天龙座高悬于北方天空，像一条蜿蜒的巨龙。"
    ],
    stars: [
      {x: 246.1, y: 259.3, label: "Eltanin"},
      {x: 142.4, y: 192.8, label: "Athebyne"},
      {x: 214.6, y: 260.1, label: "Rastaban"},
      {x: 263.6, y: 116.7, label: "Altais"},
      {x: 180.9, y: 160.5, label: "Aldhibah"},
      {x: 83.4, y: 200.4, label: "Edasich"},
      {x: 216.1, y: 97.4, label: "Alahakan"},
      {x: 38.6, y: 130.1, label: "Thuban"},
      {x: 232.9, y: 220.4, label: "Grumium"},
      {x: 10.0, y: 19.9, label: "Giausar"},
      {x: 270.0, y: 86.3, label: "Tyl"},
      {x: 26.6, y: 53.9, label: "κ Dra"},
      {x: 118.3, y: 212.5, label: "θ Dra"},
      {x: 240.3, y: 79.3, label: "Athafi II"}
    ],
    lines: [
          [8, 0],
      [0, 2],
      [8, 3],
      [3, 10],
      [10, 13],
      [13, 6],
      [6, 4],
      [4, 1],
      [1, 12],
      [12, 5],
      [5, 7],
      [7, 11],
      [11, 9]
    ],
    difficulty: 4,
    starsCount: 14,
    imageFile: 'draco',
  },
  {
    id: "equuleus",
    name: "小马座",
    pinyin: "xiǎo mǎ zuò",
    englishName: "Equuleus",
    story: "小马座是全天第二小的星座，只有南十字座比它更小！它代表一只小马驹，也许是飞马座的孩子，安静地待在飞马爸爸身边。\n\n虽然又小又暗，但天文学家发现这颗小马身上有一颗超大的行星——比木星大好多倍，正围绕小马座的一颗恒星旋转。",
    funFacts: [
    "小马座是全天第二小的星座，面积只有72平方度，只有手指尖那么大的一片天区！",
    "小马座虽然看起来不起眼，但已经被发现了至少一颗系外行星。"
    ],
    stars: [
      {x: 129.2, y: 270.0, label: "Kitalpha"},
      {x: 111.6, y: 16.7, label: "δ Equ"},
      {x: 57.4, y: 10.0, label: "γ Equ"},
      {x: 222.6, y: 186.6, label: "β Equ"}
    ],
    lines: [
          [2, 1],
      [1, 3],
      [3, 0],
      [0, 2]
    ],
    difficulty: 1,
    starsCount: 4,
    imageFile: 'equuleus',
  },
  {
    id: "eridanus",
    name: "波江座",
    pinyin: "bō jiāng zuò",
    englishName: "Eridanus",
    story: "波江座像一条弯弯曲曲的长河，从猎户座的脚下蜿蜒流向南方地平线。在希腊神话中，它是厄里达诺斯河——太阳神之子驾驶太阳马车失控坠入的那条河！\n\n波江座是天空中第六大星座，从北到南蜿蜒了约50多度，像一条星光河流。",
    funFacts: [
    "波江座最亮的星「水委一」是全天第九亮星，它转得飞快，呈椭圆形！",
    "波江座从北到南蜿蜒了约53度，是南北跨度最大的星座之一。"
    ],
    stars: [
      {x: 46.9, y: 270.0, label: "Achernar"},
      {x: 233.1, y: 23.6, label: "Cursa"},
      {x: 87.5, y: 185.4, label: "Acamar"},
      {x: 132.1, y: 35.3, label: "Rana"},
      {x: 165.8, y: 154.5, label: "Beemim I"},
      {x: 62.8, y: 240.8, label: "φ Eri"},
      {x: 48.3, y: 243.9, label: "χ Eri"},
      {x: 104.3, y: 93.5, label: "Angetenar"},
      {x: 119.6, y: 33.8, label: "Ran"},
      {x: 185.6, y: 140.5, label: "Theemin"},
      {x: 196.7, y: 61.6, label: "Sceptrum"},
      {x: 75.3, y: 32.8, label: "Azha"},
      {x: 196.8, y: 10.0, label: "ν Eri"},
      {x: 171.8, y: 156.1, label: "Beemim"}
    ],
    lines: [
          [0, 6],
      [6, 5],
      [4, 13],
      [13, 9],
      [8, 3],
      [3, 12]
    ],
    difficulty: 2,
    starsCount: 14,
    imageFile: 'eridanus',
  },
  {
    id: "fornax",
    name: "天炉座",
    pinyin: "tiān lú zuò",
    englishName: "Fornax",
    story: "天炉座是一个化学实验用的熔炉！拉卡伊创造它时，原本叫「化学熔炉座」。它是18世纪科学启蒙时代的象征——用科学仪器代替神话神兽来命名星座。\n\n天炉座虽然暗，但在其中发现了天炉座星系团——是离我们银河系第二近的星系团，里面有将近60个星系！",
    funFacts: [
    "天炉座原名叫「Fornax Chemiae」，意思是化学熔炉，纪念化学这门新兴科学。",
    "天炉座星系团是本星系群外最近的星系群之一，天文学家通过它研究星系的演化。"
    ],
    stars: [
      {x: 270.0, y: 50.0, label: "Dalim"},
      {x: 10.0, y: 230.0, label: "β For"}
    ],
    lines: [
          [1, 0]
    ],
    difficulty: 2,
    starsCount: 2,
    imageFile: 'fornax',
  },
  {
    id: "gemini",
    name: "双子座",
    pinyin: "shuāng zǐ zuò",
    englishName: "Gemini",
    story: "双子座是冬季夜空中最漂亮的星座之一，两颗最亮的星——北河二和北河三——像一对双胞胎兄弟。\n\n在希腊神话中，这对双胞胎是卡斯托尔和波吕克斯。他们是同母异父的兄弟——卡斯托尔是凡人，波吕克斯是宙斯的儿子，拥有永生。\n\n当卡斯托尔在战斗中被杀死后，波吕克斯向宙斯请求，愿意放弃自己的永生来换取哥哥的生命。宙斯被这份兄弟情深感动，将两人一起送上天空。",
    funFacts: [
    "北河三（双子座β）是一颗橙巨星，而北河二（双子座α）实际上是一个六合星系统！",
    "双子座流星雨每年12月中旬达到极大，是每年最稳定的流星雨之一。",
    "在中国古代，北河二和北河三被称为「北河」双星，属于二十八宿的「井宿」。"
    ],
    stars: [
      {x: 265.9, y: 79.4, label: "Pollux"},
      {x: 233.6, y: 33.5, label: "Castor"},
      {x: 74.8, y: 226.1, label: "Alhena"},
      {x: 35.8, y: 147.8, label: "Tejat"},
      {x: 96.6, y: 118.5, label: "Mebsuta"},
      {x: 13.0, y: 146.1, label: "Propus"},
      {x: 96.4, y: 270.0, label: "Alzirr"},
      {x: 199.5, y: 158.0, label: "Wasat"},
      {x: 267.0, y: 124.5, label: "κ Gem"},
      {x: 195.1, y: 225.6, label: "λ Gem"},
      {x: 124.1, y: 10.0, label: "θ Gem"},
      {x: 212.7, y: 85.2, label: "ι Gem"}
    ],
    lines: [
          [7, 9],
      [9, 6],
      [4, 3],
      [3, 5]
    ],
    difficulty: 2,
    starsCount: 12,
    imageFile: 'gemini',
  },
  {
    id: "grus",
    name: "天鹤座",
    pinyin: "tiān hè zuò",
    englishName: "Grus",
    story: "天鹤座是南天的一只优雅仙鹤！它长长脖子上的星星明亮耀眼。天鹤座是16世纪晚期被命名的南天星座之一。\n\n天鹤座像一个倾斜的十字架，也有人说它像一只正在起飞的天鹅——不过天鹅在北天，仙鹤在南天，遥遥相对。",
    funFacts: [
    "天鹤座最亮的星「鹤一」是一颗蓝白色的主序星，距离我们约101光年。",
    "天鹤座在南天形成一道优雅的身影，像是南半球的「天鹅座」，和北天的天鹅座遥相呼应。"
    ],
    stars: [
      {x: 77.7, y: 170.7, label: "Alnair"},
      {x: 179.8, y: 165.9, label: "Tiaki"},
      {x: 15.1, y: 10.0, label: "Aldhanab"},
      {x: 194.2, y: 243.3, label: "ε Gru"},
      {x: 264.9, y: 142.7, label: "ι Gru"},
      {x: 138.7, y: 107.0, label: "δ¹ Gru"},
      {x: 225.5, y: 270.0, label: "ζ Gru"},
      {x: 257.1, y: 111.7, label: "θ Gru"},
      {x: 59.8, y: 42.8, label: "λ Gru"}
    ],
    lines: [
          [7, 5],
      [5, 0],
      [0, 1],
      [1, 4],
      [4, 7],
      [1, 6],
      [1, 3],
      [0, 8],
      [8, 2]
    ],
    difficulty: 3,
    starsCount: 9,
    imageFile: 'grus',
  },
  {
    id: "hercules",
    name: "武仙座",
    pinyin: "wǔ xiān zuò",
    englishName: "Hercules",
    story: "武仙座是希腊神话中最伟大的英雄——赫拉克勒斯！他是宙斯的儿子，天生力大无穷。\n\n可是天后赫拉非常嫉妒他，给他设下了重重困难。赫拉克勒斯被迫完成了12项几乎不可能完成的任务，被称为「十二苦差」！\n\n他杀死了刀枪不入的尼米亚雄狮、打败了有九个头的海德拉巨蛇、活捉了金角铜蹄的牡鹿，甚至用神力托起了整个天球来代替巨人阿特拉斯……\n\n最后，赫拉克勒斯用英勇和智慧完成了所有任务，被升上天空成为武仙座。在夏夜的星空中，他正跪在地上举起大棒，永远守护着我们！",
    funFacts: [
    "武仙座里有著名的M13球状星团，里面有30多万颗星星紧紧聚在一起！",
    "武仙座的形状像一个跪倒在地的人，一手举着大棒，非常霸气。",
    "赫拉克勒斯在希腊神话中还被叫做「海格力斯」，迪士尼还拍过他的动画电影呢！"
    ],
    stars: [
      {x: 44.6, y: 249.9, label: "Kornephoros"},
      {x: 75.1, y: 154.6, label: "Rutilicus"},
      {x: 145.1, y: 222.3, label: "Sarin"},
      {x: 144.3, y: 106.2, label: "π Her"},
      {x: 212.2, y: 191.5, label: "μ Her"},
      {x: 83.6, y: 84.0, label: "η Her"},
      {x: 234.8, y: 174.5, label: "ξ Her"},
      {x: 24.5, y: 270.0, label: "Nasak Shamiya III"},
      {x: 184.6, y: 16.7, label: "ι Her"},
      {x: 255.5, y: 176.7, label: "ο Her"},
      {x: 223.4, y: 97.6, label: "θ Her"},
      {x: 51.5, y: 10.0, label: "τ Her"},
      {x: 114.0, y: 163.0, label: "ε Her"}
    ],
    lines: [
          [8, 10],
      [3, 5],
      [5, 1],
      [1, 0],
      [0, 7],
      [1, 12],
      [4, 6],
      [6, 9],
      [12, 3]
    ],
    difficulty: 3,
    starsCount: 13,
    imageFile: 'hercules',
  },
  {
    id: "horologium",
    name: "时钟座",
    pinyin: "shí zhōng zuò",
    englishName: "Horologium",
    story: "时钟座是一个摆钟！它是由拉卡伊在1750年代创造的，纪念当时精确计时的重大发明——摆钟。精密的时钟对航海和天文观测至关重要，因为只有准确知道时间才能确定经度。\n\n时钟座虽然不起眼，但它的名字提醒我们：精准的时间测量是通向天空的第一步。",
    funFacts: [
    "时钟座是拉卡伊为纪念摆钟发明者克里斯蒂安·惠更斯而命名的！",
    "时钟座中有一颗有趣的恒星ι Horologii，天文学家在它周围发现了一颗巨大的系外行星。"
    ],
    stars: [
      {x: 263.0, y: 10.0, label: "α Hor"},
      {x: 73.8, y: 270.0, label: "μ Hor"},
      {x: 17.0, y: 193.5, label: "ζ Hor"}
    ],
    lines: [
          [0, 2],
      [2, 1]
    ],
    difficulty: 2,
    starsCount: 3,
    imageFile: 'horologium',
  },
  {
    id: "hydra",
    name: "长蛇座",
    pinyin: "cháng shé zuò",
    englishName: "Hydra",
    story: "长蛇座是全天88个星座中面积最大的！它横跨了约100度的天空，从巨蟹座一直延伸到天秤座。\n\n在希腊神话中，长蛇座是勒拿湖的九头水蛇许德拉。英雄赫拉克勒斯的第二项任务就是消灭它——但每砍下一个头，就会长出两个新头！后来赫拉克勒斯用火烧灼伤口，终于将它消灭。\n\n在中国古代，长蛇座的星星组成了「柳宿」、「星宿」、「张宿」、「翼宿」等多个星官。",
    funFacts: [
    "长蛇座是全天88个星座中面积最大的，占天球面积的3.16%！",
    "长蛇座从东到西横跨约100度，在天球赤道附近蜿蜒，需要好几个夜晚才能全部观测到。",
    "长蛇座的最亮星「星宿一」是一颗橙巨星，比太阳大了很多倍！"
    ],
    stars: [
      {x: 52.6, y: 121.0, label: "Alphard"},
      {x: 270.0, y: 195.7, label: "γ Hya"},
      {x: 18.7, y: 59.8, label: "Minazal V"},
      {x: 139.9, y: 153.4, label: "ν Hya"},
      {x: 10.0, y: 58.4, label: "Ashlesha"},
      {x: 175.0, y: 221.6, label: "ξ Hya"},
      {x: 98.9, y: 136.2, label: "λ Hya"},
      {x: 115.2, y: 155.8, label: "μ Hya"},
      {x: 38.0, y: 74.0, label: "θ Hya"}
    ],
    lines: [
          [2, 8],
      [6, 7],
      [7, 3],
      [3, 5]
    ],
    difficulty: 3,
    starsCount: 9,
    imageFile: 'hydra',
  },
  {
    id: "hydrus",
    name: "水蛇座",
    pinyin: "shuǐ shé zuò",
    englishName: "Hydrus",
    story: "水蛇座是南天的一条小水蛇，和北面那条巨大的长蛇座是远亲！不过水蛇座要小很多，在南天极附近蜿蜒。\n\n16世纪荷兰航海家首次绘制了这条南天的蛇。它紧挨着大麦哲伦云和南天极，是南半球特有的星座。",
    funFacts: [
    "别把水蛇座和长蛇座搞混！水蛇是小蛇，在南天极附近；长蛇是巨蛇，横跨天球赤道。",
    "水蛇座最亮的星是水蛇β，是一颗黄色的恒星，距离我们仅24光年。"
    ],
    stars: [
      {x: 48.4, y: 270.0, label: "β Hyi"},
      {x: 108.1, y: 10.0, label: "α Hyi"},
      {x: 231.6, y: 221.5, label: "γ Hyi"},
      {x: 147.2, y: 117.8, label: "δ Hyi"},
      {x: 172.8, y: 113.4, label: "ε Hyi"}
    ],
    lines: [
          [0, 2],
      [2, 4],
      [4, 3],
      [3, 1]
    ],
    difficulty: 2,
    starsCount: 5,
    imageFile: 'hydrus',
  },
  {
    id: "indus",
    name: "印第安座",
    pinyin: "yìn dì ān zuò",
    englishName: "Indus",
    story: "印第安座代表一位美洲原住民！16世纪欧洲航海家到达新大陆后遇到原住民，被他们的文化和生活方式所震撼。于是荷兰天文学家凯泽尔在南天创造了印第安座。\n\n印第安座中有一位手持长矛的战士形态，纪念那些最早在这片大陆上生活的人们。",
    funFacts: [
    "印第安座是最早纪念人类文化而非神话的星座之一，代表的是真实的美洲原住民。",
    "印第安座最亮的星「印第安α」是一颗橙色的巨星，距离我们约100光年。"
    ],
    stars: [
      {x: 61.0, y: 10.0, label: "Persian"},
      {x: 132.2, y: 270.0, label: "β Ind"},
      {x: 218.9, y: 155.3, label: "θ Ind"}
    ],
    lines: [
          [2, 0],
      [0, 1],
      [1, 2]
    ],
    difficulty: 2,
    starsCount: 3,
    imageFile: 'indus',
  },
  {
    id: "lacerta",
    name: "蝎虎座",
    pinyin: "xiē hǔ zuò",
    englishName: "Lacerta",
    story: "蝎虎座是一只可爱的小蜥蜴，躲在仙后座和天鹅座之间！天文学家赫维留说：因为这个区域星星太暗了，没有明亮星座，所以放一只需要好眼力才能看到的小蜥蜴最合适。\n\n它像一只小小的壁虎趴在银河边上，安安静静的。",
    funFacts: [
    "蝎虎座没有一个神话传说，因为太暗了，古人根本没有注意到它！",
    "蝎虎座BL天体是一种特殊的星系，天文学家用它来研究超大质量黑洞。"
    ],
    stars: [
      {x: 165.5, y: 44.9, label: "α Lac"},
      {x: 114.5, y: 270.0, label: "1 Lac"},
      {x: 161.0, y: 91.4, label: "5 Lac"},
      {x: 143.5, y: 10.0, label: "β Lac"},
      {x: 165.1, y: 174.1, label: "6 Lac"},
      {x: 145.9, y: 59.6, label: "4 Lac"}
    ],
    lines: [
          [1, 4],
      [4, 2],
      [2, 5],
      [5, 3],
      [3, 0],
      [0, 2]
    ],
    difficulty: 2,
    starsCount: 6,
    imageFile: 'lacerta',
  },
  {
    id: "leo",
    name: "狮子座",
    pinyin: "shī zi zuò",
    englishName: "Leo",
    story: "狮子座是春季夜空中最耀眼的星座之一，形状像一只趴伏的狮子。\n\n在希腊神话中，这只狮子是生活在尼米亚沼泽的巨狮，它的皮毛刀枪不入，任何人间的武器都无法伤害它。英雄赫拉克勒斯的第一项任务，就是杀死这只巨狮。\n\n赫拉克勒斯最终用双手扼死了狮子，并用狮子的利爪剥下它的皮毛。后来，宙斯将这只巨狮送上天空，成为狮子座。",
    funFacts: [
    "狮子座最亮的星叫「轩辕十四」，是全天最亮的21颗恒星之一！",
    "每年11月中旬，著名的「狮子座流星雨」就从这里辐射出来。",
    "轩辕十四的意思是「黄帝的夫人的第十四颗星」，中国古代很有诗意。"
    ],
    stars: [
      {x: 52.6, y: 203.9, label: "Regulus"},
      {x: 79.2, y: 133.6, label: "Algieba"},
      {x: 270.0, y: 172.2, label: "Denebola"},
      {x: 193.3, y: 125.0, label: "Zosma"},
      {x: 10.0, y: 95.2, label: "Ras Elased Australis"},
      {x: 196.2, y: 170.9, label: "Chertan"},
      {x: 73.0, y: 101.2, label: "Adhafera"},
      {x: 51.5, y: 160.7, label: "Coxa"},
      {x: 25.5, y: 76.1, label: "Rasalas"}
    ],
    lines: [
          [2, 5],
      [5, 0],
      [0, 7],
      [7, 1],
      [1, 3],
      [3, 2],
      [1, 6],
      [6, 8],
      [8, 4],
      [3, 5]
    ],
    difficulty: 2,
    starsCount: 9,
    imageFile: 'leo',
  },
  {
    id: "leo_minor",
    name: "小狮座",
    pinyin: "xiǎo shī zuò",
    englishName: "Leo Minor",
    story: "小狮座就在大狮子（狮子座）的上面！它是一只还没长大的小狮子宝宝，安静地趴在爸爸背上。不过这只小狮子非常暗，只有最有眼力的观星人才能找到它。\n\n天文学家赫维留在1687年创造了小狮座，说它像一只依偎在大狮子身边的小猫。",
    funFacts: [
    "小狮座没有亮星，最亮的星也只有4等，要用很好的眼力和黑暗天空才能看见。",
    "小狮座的形象是一只趴在狮子座头顶的小狮子——就像骑在爸爸肩膀上。"
    ],
    stars: [
      {x: 270.0, y: 158.2, label: "Praecipua"},
      {x: 184.1, y: 123.2, label: "β LMi"},
      {x: 117.2, y: 147.3, label: "21 LMi"},
      {x: 10.0, y: 121.8, label: "10 LMi"}
    ],
    lines: [
          [0, 1],
      [1, 2],
      [2, 3],
      [2, 0]
    ],
    difficulty: 2,
    starsCount: 4,
    imageFile: 'leo_minor',
  },
  {
    id: "lepus",
    name: "天兔座",
    pinyin: "tiān tù zuò",
    englishName: "Lepus",
    story: "天兔座就在猎户座的脚下！古代的观星者说：看，猎人俄里翁带着两条猎狗（大犬座和小犬座），正在追赶一只小兔子呢！\n\n这只小兔子跑得飞快，但猎人和猎狗永远追不上它——因为它们在天空中一起静止了数千年。",
    funFacts: [
    "天兔座就在猎户座正下方，是猎户追捕的猎物之一！",
    "天兔座中有一颗变星叫做R Leporis，呈深红色，是天上最红的星星之一。"
    ],
    stars: [
      {x: 124.2, y: 151.3, label: "Arneb"},
      {x: 105.1, y: 204.5, label: "Nihal"},
      {x: 10.0, y: 235.4, label: "ε Lep"},
      {x: 38.2, y: 123.0, label: "μ Lep"},
      {x: 186.5, y: 97.6, label: "ζ Lep"},
      {x: 173.1, y: 235.4, label: "Kursi al Jabbar"},
      {x: 228.1, y: 86.8, label: "η Lep"},
      {x: 202.7, y: 207.7, label: "Arsh al Jauzah"},
      {x: 66.3, y: 67.6, label: "λ Lep"},
      {x: 38.3, y: 63.9, label: "κ Lep"},
      {x: 33.8, y: 44.6, label: "ι Lep"},
      {x: 270.0, y: 102.3, label: "θ Lep"},
      {x: 67.9, y: 52.0, label: "ν Lep"}
    ],
    lines: [
          [11, 6],
      [6, 4],
      [4, 0],
      [0, 3],
      [0, 7],
      [7, 5],
      [5, 1],
      [1, 2],
      [0, 1],
      [3, 8],
      [3, 9],
      [2, 3],
      [9, 10],
      [8, 12]
    ],
    difficulty: 2,
    starsCount: 13,
    imageFile: 'lepus',
  },
  {
    id: "libra",
    name: "天秤座",
    pinyin: "tiān chèng zuò",
    englishName: "Libra",
    story: "天秤座是黄道十二星座中唯一没有生命形象的一个，它代表着正义与平衡。\n\n在希腊神话中，天秤座是正义女神阿斯特赖亚手中的天平。当人类还生活在黄金时代时，阿斯特赖亚住在人间，用这天天平衡量人间的善恶。\n\n但随着人类越来越堕落，阿斯特赖亚失望地离开了人间，飞上天空成为室女座，她手中的天平则成为独立的天秤座。",
    funFacts: [
    "天秤座是黄道十二星座中最晚被确认的一个——古罗马人将它从天蝎座的爪子分离出来。",
    "每年6月的傍晚，天秤座出现在南方天空，是观测它的最佳时机。",
    "天秤座最亮的星叫「氐宿一」，在中国古代属于「氐宿」，是二十八宿之一。"
    ],
    stars: [
      {x: 118.9, y: 10.0, label: "Zubeneschamali"},
      {x: 16.8, y: 120.8, label: "Zubenelgenubi"},
      {x: 72.2, y: 270.0, label: "Brachium"},
      {x: 192.4, y: 98.8, label: "Zubenelhakrabi"},
      {x: 263.2, y: 132.7, label: "θ Lib"}
    ],
    lines: [
          [4, 3],
      [3, 0],
      [0, 1],
      [1, 2],
      [2, 3]
    ],
    difficulty: 2,
    starsCount: 5,
    imageFile: 'libra',
  },
  {
    id: "lupus",
    name: "豺狼座",
    pinyin: "chái láng zuò",
    englishName: "Lupus",
    story: "豺狼座在古代被画成一只被半人马刺穿的野兽！半人马座用长矛戳着这只豺狼，把它举向天空献祭。在古巴比伦，这只豺狼被叫做「疯狂之狗」，是一只可怕的野兽。\n\n豺狼座靠近南天银河，虽然没有特别亮的星星，但整片区域非常美丽。",
    funFacts: [
    "豺狼座在古代被画成被半人马刺穿的样子，是一个被征服的猎物！",
    "豺狼座中有一颗非常有名的超新星遗迹SN 1006，是中世纪记录最亮的超新星之一。"
    ],
    stars: [
      {x: 50.8, y: 205.2, label: "α Lup"},
      {x: 85.6, y: 143.3, label: "KeKouan"},
      {x: 179.2, y: 115.4, label: "γ Lup"},
      {x: 143.4, y: 107.3, label: "δ Lup"},
      {x: 123.1, y: 265.2, label: "ζ Lup"},
      {x: 248.1, y: 82.7, label: "η Lup"},
      {x: 145.0, y: 46.7, label: "φ¹ Lup"},
      {x: 228.9, y: 14.8, label: "χ Lup"},
      {x: 45.3, y: 234.2, label: "ρ Lup"},
      {x: 10.0, y: 182.8, label: "τ² Lup"},
      {x: 185.7, y: 135.1, label: "ω Lup"},
      {x: 270.0, y: 62.8, label: "HIP 78970"}
    ],
    lines: [
          [7, 11],
      [11, 5],
      [5, 7],
      [5, 2],
      [2, 3],
      [3, 6],
      [3, 1],
      [2, 10],
      [10, 4],
      [4, 0],
      [4, 8],
      [0, 9],
      [0, 1]
    ],
    difficulty: 2,
    starsCount: 12,
    imageFile: 'lupus',
  },
  {
    id: "lynx",
    name: "天猫座",
    pinyin: "tiān māo zuò",
    englishName: "Lynx",
    story: "天猫座是一个比较暗淡的星座，位于大熊座和御夫座之间。它的名字来源于山猫，因为星座中的星星非常暗，要想看到它们需要像山猫一样锐利的眼睛！\n\n这个星座是17世纪波兰天文学家赫维留创立的。他是一位出色的观测者，创立了许多现代仍然使用的星座名称。\n\n天猫座虽然没有明亮的恒星，但它是寻找深空天体的好地方，有几颗有趣的双星和星系。",
    funFacts: [
    "天猫座是17世纪赫维留命名的，他说你需要山猫一样的眼睛才能看到这个星座的星星！",
    "天猫座最亮的星只有三等星，肉眼需要很暗的地方才能看到。",
    "天猫座位于黄道附近，偶尔会有行星经过这里。"
    ],
    stars: [
      {x: 270.0, y: 260.2, label: "α Lyn"},
      {x: 262.2, y: 239.1, label: "38 Lyn"},
      {x: 223.1, y: 198.8, label: "HIP 44248"},
      {x: 157.2, y: 191.1, label: "Alsciaukat"},
      {x: 49.9, y: 38.1, label: "15 Lyn"},
      {x: 10.0, y: 19.8, label: "2 Lyn"},
      {x: 237.7, y: 228.0, label: "HIP 44700"},
      {x: 70.2, y: 129.4, label: "21 Lyn"}
    ],
    lines: [
          [0, 1],
      [1, 6],
      [6, 2],
      [2, 3],
      [3, 7],
      [7, 4],
      [4, 5]
    ],
    difficulty: 3,
    starsCount: 8,
    imageFile: 'lynx',
  },
  {
    id: "lyra",
    name: "天琴座",
    pinyin: "tiān qín zuò",
    englishName: "Lyra",
    story: "天琴座是一把神奇的竖琴，它的主人是希腊神话中最伟大的音乐家——俄耳甫斯！\n\n俄耳甫斯是太阳神阿波罗的儿子，他的琴声美得不可思议！野兽听了变得温顺，树木听了会移动脚步，就连坚硬的石头都会流下眼泪！\n\n有一天，他最爱的妻子欧律狄刻被毒蛇咬死了。俄耳甫斯伤心欲绝，他抱着竖琴来到冥界，用动人的琴声打动了冥王哈迪斯。冥王答应让他的妻子回到人间，但有一个条件：走出冥界之前，不能回头看她。\n\n俄耳甫斯快要走出冥界时，实在太想念妻子，忍不住回头看了一眼……就在那一瞬间，欧律狄刻永远消失了。后来俄耳甫斯死后，宙斯将他的竖琴放入星空，成为了美丽的天琴座！\n\n在中国，天琴座最亮的星就是织女星——每年七夕，它和牛郎星在银河两岸遥遥相望！",
    funFacts: [
    "天琴座里有织女星（Vega），是北半球夏夜最亮的星之一，也是七夕牛郎织女故事的女主角！",
    "织女星是太阳系附近最亮的恒星之一，距离我们只有25光年。",
    "天琴座和天鹅座、天鹰座一起组成了著名的「夏季大三角」！"
    ],
    stars: [
      {x: 45.4, y: 10.0, label: "Vega"},
      {x: 234.6, y: 270.0, label: "Sulafat"},
      {x: 155.1, y: 242.5, label: "Sheliak"},
      {x: 192.4, y: 91.5, label: "δ² Lyr"},
      {x: 109.8, y: 61.5, label: "Nasr Alwaki I"}
    ],
    lines: [
          [0, 4],
      [4, 2],
      [2, 1],
      [1, 3],
      [3, 4]
    ],
    difficulty: 2,
    starsCount: 5,
    imageFile: 'lyra',
  },
  {
    id: "mensa",
    name: "山案座",
    pinyin: "shān àn zuò",
    englishName: "Mensa",
    story: "山案座是一片高原——南非的桌山（Table Mountain）！拉卡伊在好望角观测南天星空时，桌山上的云雾经常遮挡他的视线。于是他把云层之上的星空命名为山案座，纪念这座平顶山。\n\n山案座包含了部分大麦哲伦云，是最靠南的星座之一。",
    funFacts: [
    "山案座是唯一以地球上的真实地理特征命名的星座——南非开普敦的桌山！",
    "山案座中的大麦哲伦云横跨界线，像云雾缭绕在桌山山顶一样。"
    ],
    stars: [
      {x: 222.8, y: 270.0, label: "γ Men"},
      {x: 57.2, y: 10.0, label: "μ Men"}
    ],
    lines: [
          [0, 1]
    ],
    difficulty: 1,
    starsCount: 2,
    imageFile: 'mensa',
  },
  {
    id: "microscopium",
    name: "显微镜座",
    pinyin: "xiǎn wēi jìng zuò",
    englishName: "Microscopium",
    story: "显微镜座是一架科学显微镜！拉卡伊在18世纪创造它，纪念这一让人类看到微观世界的伟大发明。\n\n虽然显微镜座的星星非常暗淡，但它的名字提醒我们：科学让我们既能仰望星空，也能看到肉眼看不见的微小世界。",
    funFacts: [
    "显微镜座最亮的星也只有4.7等，在城市里完全看不见，需要非常黑暗的天空。",
    "显微镜座是拉卡伊「科学仪器星座」家族中位置最低的之一。"
    ],
    stars: [
      {x: 114.0, y: 106.0, label: "γ Mic"},
      {x: 270.0, y: 104.7, label: "ε Mic"},
      {x: 10.0, y: 175.3, label: "α Mic"}
    ],
    lines: [
          [1, 0],
      [0, 2]
    ],
    difficulty: 1,
    starsCount: 3,
    imageFile: 'microscopium',
  },
  {
    id: "monoceros",
    name: "麒麟座",
    pinyin: "qí lín zuò",
    englishName: "Monoceros",
    story: "麒麟座是天空中一只神秘的独角兽！它是17世纪由天文学家创造的新星座，藏在猎户座、大犬座和小犬座之间。\n\n虽然很暗，但麒麟座里藏着许多天体的宝藏——最著名的就是美丽的玫瑰星云，像一朵在星空中绽放的巨大红色玫瑰花！",
    funFacts: [
    "麒麟座虽然几乎所有星都暗于4等，但其中有绚丽的玫瑰星云和圣诞树星团！",
    "在中国文化中，麒麟是祥瑞之兽，在古代星图上麒麟座与独角兽的形象十分相似。"
    ],
    stars: [
      {x: 53.6, y: 179.9, label: "β Mon"},
      {x: 210.6, y: 202.4, label: "α Mon"},
      {x: 23.2, y: 173.4, label: "γ Mon"},
      {x: 148.0, y: 122.2, label: "δ Mon"},
      {x: 270.0, y: 145.3, label: "ζ Mon"},
      {x: 42.3, y: 77.6, label: "ε Mon"},
      {x: 10.0, y: 96.2, label: "HIP 29151"}
    ],
    lines: [
          [2, 0],
      [0, 3],
      [3, 5],
      [5, 6],
      [3, 4],
      [4, 1]
    ],
    difficulty: 2,
    starsCount: 7,
    imageFile: 'monoceros',
  },
  {
    id: "musca",
    name: "苍蝇座",
    pinyin: "cāng yíng zuò",
    englishName: "Musca",
    story: "苍蝇座是南天的一只小苍蝇！它原来的名字更霸气——「蜜蜂座」，后来又改名叫「南蝇座」，最后简化为苍蝇座。\n\n这只小苍蝇紧挨着南十字座，像一只被十字架吸引的小飞虫。虽然名字不起眼，但苍蝇座包含了南天银河中绚丽的一片星场。",
    funFacts: [
    "苍蝇座原来叫「蜜蜂座」，是拜耳在1603年命名的，后来拉卡伊把它改成了苍蝇。",
    "苍蝇座位于银河带中，可以用双筒望远镜看到密密麻麻的星星。"
    ],
    stars: [
      {x: 230.3, y: 120.8, label: "α Mus"},
      {x: 270.0, y: 77.7, label: "β Mus"},
      {x: 10.0, y: 26.9, label: "λ Mus"},
      {x: 207.8, y: 253.1, label: "γ Mus"}
    ],
    lines: [
          [1, 2],
      [2, 3],
      [3, 0],
      [0, 1]
    ],
    difficulty: 2,
    starsCount: 4,
    imageFile: 'musca',
  },
  {
    id: "norma",
    name: "矩尺座",
    pinyin: "jǔ chǐ zuò",
    englishName: "Norma",
    story: "矩尺座是一个绘图用的丁字尺！天文学家拉卡伊在1750年代创造它时，把它命名为「绘图员之尺」。它是描绘地图和图纸的必备工具，现在永远留在了南天星空。\n\n矩尺座紧挨着银河，虽然很暗，但标志着天文制图学的贡献——没有精准的测量工具，就不会有精确的星图。",
    funFacts: [
    "矩尺座原名「Norma et Regula」，意思是矩尺和直尺，后来简化为矩尺。",
    "矩尺座躺在天蝎座和南三角座之间，附近有一团漂亮的疏散星团NGC 6087。"
    ],
    stars: [
      {x: 166.4, y: 104.9, label: "γ² Nor"},
      {x: 213.4, y: 10.0, label: "ε Nor"},
      {x: 66.6, y: 72.2, label: "η Nor"},
      {x: 130.2, y: 270.0, label: "κ Nor"}
    ],
    lines: [
          [3, 0],
      [0, 1],
      [1, 2],
      [2, 0],
      [2, 3]
    ],
    difficulty: 2,
    starsCount: 4,
    imageFile: 'norma',
  },
  {
    id: "octans",
    name: "南极座",
    pinyin: "nán jí zuò",
    englishName: "Octans",
    story: "南极座是最靠南的星座——南天极就在它的范围内！它也是一个科学仪器——八分仪（octant），是天文学家拉卡伊用来测量星星高度的工具。\n\n虽然南天极没有像北极星那样明亮的标记星，但南极座就是南天最深处的那片天空。",
    funFacts: [
    "南天极就在南极座内！但与北天极有明亮的北极星不同，南天极附近没有亮星标记。",
    "南极座σ星是离南天极最近的肉眼可见星星，距离南天极仅约1度。"
    ],
    stars: [
      {x: 256.6, y: 14.7, label: "ν Oct"},
      {x: 270.0, y: 124.3, label: "β Oct"},
      {x: 10.0, y: 265.3, label: "δ Oct"}
    ],
    lines: [
          [0, 1],
      [1, 2],
      [2, 0]
    ],
    difficulty: 2,
    starsCount: 3,
    imageFile: 'octans',
  },
  {
    id: "ophiuchus",
    name: "蛇夫座",
    pinyin: "shé fū zuò",
    englishName: "Ophiuchus",
    story: "蛇夫座是医神阿斯克勒庇俄斯，他手持一条蛇，代表着治愈与医学！\n\n据说阿斯克勒庇俄斯的医术高超，甚至能让死人复活。他的标志——蛇缠绕权杖，至今仍是医学的象征（世界卫生组织的标志就有它！）。\n\n蛇夫座在黄道上，有时被认为是第13个黄道星座，但占星家们通常只认12个。",
    funFacts: [
    "蛇夫座是全天88个星座中最被忽视的一个，因为它太大而且没有很亮的星！",
    "每年11月底到12月初，太阳经过蛇夫座，但占星家们通常不承认它是黄道星座。",
    "蛇夫座的形状像一个人掰开两条蛇，很像古代医师的样子！"
    ],
    stars: [
      {x: 200.1, y: 10.0, label: "Rasalhague"},
      {x: 156.7, y: 212.5, label: "Sabik"},
      {x: 97.8, y: 175.8, label: "Han"},
      {x: 216.4, y: 66.6, label: "Cebalrai"},
      {x: 134.1, y: 32.1, label: "κ Oph"},
      {x: 63.6, y: 133.8, label: "Yed Posterior"},
      {x: 191.2, y: 270.0, label: "51 Oph"}
    ],
    lines: [
          [0, 3],
      [1, 3],
      [0, 4],
      [4, 5],
      [5, 2],
      [2, 1],
      [1, 6]
    ],
    difficulty: 3,
    starsCount: 7,
    imageFile: 'ophiuchus',
  },
  {
    id: "orion",
    name: "猎户座",
    pinyin: "liè hù zuò",
    englishName: "Orion",
    story: "在古希腊神话中，猎户座是一位伟大的猎人——俄里翁。他手持木棍和盾牌，腰间挂着宝剑，是夜空中最壮丽的星座之一。\n\n月亮女神阿尔忒弥斯爱上了他，但她的哥哥日神阿波罗却不同意。他设计让阿尔忒弥斯远远射出一箭，射中了在海中游泳的俄里翁……\n\n后来，阿尔忒弥斯请求宙斯将俄里翁升上天空，成为永恒星座，好让自己每晚都能看见他。",
    funFacts: [
    "在中国古代，猎户座腰带的三颗亮星被称为「参宿三星」，是二十八宿之一！",
    "猎户座大星云（M42）是距地球最近的恒星诞生区，用双筒望远镜就能看到！",
    "猎户座是全天最壮丽的星座，拥有2颗一等星：参宿四和参宿七。"
    ],
    stars: [
      {x: 113.7, y: 250.8, label: "Rigel"},
      {x: 247.7, y: 43.3, label: "Betelgeuse"},
      {x: 148.6, y: 57.5, label: "Bellatrix"},
      {x: 185.5, y: 158.1, label: "Alnilam"},
      {x: 200.6, y: 167.9, label: "Alnitak"},
      {x: 222.9, y: 270.0, label: "Saiph"},
      {x: 171.5, y: 146.1, label: "Mintaka"},
      {x: 32.3, y: 49.1, label: "Tabit"},
      {x: 181.5, y: 10.0, label: "Meissa"},
      {x: 36.5, y: 67.1, label: "Al Taj II"}
    ],
    lines: [
          [4, 3],
      [3, 6],
      [1, 4],
      [4, 5],
      [5, 0],
      [0, 6],
      [6, 2],
      [2, 8],
      [8, 1],
      [2, 7],
      [7, 9]
    ],
    difficulty: 1,
    starsCount: 10,
    imageFile: 'orion',
  },
  {
    id: "pavo",
    name: "孔雀座",
    pinyin: "kǒng què zuò",
    englishName: "Pavo",
    story: "孔雀座是南天最美丽的星座之一——它代表一只展开华丽尾屏的孔雀！孔雀是希腊天后赫拉的神鸟，它尾羽上的「眼睛」来自被赫拉杀死的百眼巨人阿尔戈斯的眼睛。\n\n孔雀座最亮的星「孔雀十一」是一颗蓝白色的亮星，在南方夜空中格外耀眼。",
    funFacts: [
    "孔雀座是南天的「大鸟群星」之一，和天鹤座、凤凰座、杜鹃座一起组成了南天的鸟类家族！",
    "孔雀座最亮的星「孔雀十一」距离我们约180光年，呈蓝白色。"
    ],
    stars: [
      {x: 225.2, y: 50.9, label: "Peacock"},
      {x: 221.5, y: 163.9, label: "β Pav"},
      {x: 180.6, y: 153.3, label: "δ Pav"},
      {x: 10.0, y: 155.7, label: "η Pav"},
      {x: 159.8, y: 229.1, label: "ε Pav"},
      {x: 90.8, y: 213.0, label: "ζ Pav"},
      {x: 270.0, y: 174.1, label: "γ Pav"},
      {x: 85.2, y: 105.3, label: "λ Pav"},
      {x: 32.7, y: 134.4, label: "π Pav"},
      {x: 44.8, y: 104.7, label: "ξ Pav"},
      {x: 98.0, y: 162.8, label: "κ Pav"}
    ],
    lines: [
          [0, 6],
      [6, 1],
      [1, 2],
      [2, 0],
      [2, 4],
      [4, 5],
      [5, 10],
      [10, 2],
      [10, 7],
      [7, 9],
      [9, 8],
      [8, 7],
      [8, 3]
    ],
    difficulty: 3,
    starsCount: 11,
    imageFile: 'pavo',
  },
  {
    id: "pegasus",
    name: "飞马座",
    pinyin: "fēi mǎ zuò",
    englishName: "Pegasus",
    story: "飞马座是秋季夜空中面积最大的星座之一，最著名的是「飞马座四边形」——四颗亮星组成一个巨大的正方形。\n\n在希腊神话中，飞马佩加索斯是从美杜莎被砍下的头颅中跳出来的。它是一匹长着翅膀的白色飞马，蹄子踏过的地方会涌出灵泉。\n\n英雄柏勒洛丰骑着佩加索斯，完成了许多不可能的任务。但后来柏勒洛丰试图骑它飞上奥林匹斯山，宙斯派出牛虻叮咬飞马，柏勒洛丰坠落人间。",
    funFacts: [
    "飞马座四边形是由四颗亮星组成的巨大正方形，每边长约15度，相当于30个满月排成一排！",
    "这个四边形中的三颗星属于飞马座，第四颗（东北角）实际上属于仙女座。",
    "秋季四边形可以帮助你找到仙女座星系（M31）——距我们最近的大星系，肉眼可见！"
    ],
    stars: [
      {x: 248.2, y: 64.4, label: "Alpheratz"},
      {x: 10.0, y: 208.1, label: "Enif"},
      {x: 148.3, y: 79.9, label: "Scheat"},
      {x: 153.1, y: 173.8, label: "Markab"},
      {x: 270.0, y: 163.8, label: "Algenib"},
      {x: 114.9, y: 64.9, label: "Matar"},
      {x: 112.0, y: 206.1, label: "Homam"},
      {x: 126.5, y: 105.7, label: "Sadalbari"},
      {x: 55.3, y: 237.6, label: "Biham"},
      {x: 55.6, y: 98.6, label: "ι Peg"},
      {x: 120.7, y: 113.3, label: "Sadalnazi"},
      {x: 19.7, y: 93.7, label: "κ Peg"},
      {x: 121.4, y: 196.4, label: "Suudalnujum"},
      {x: 63.4, y: 42.4, label: "π¹ Peg"}
    ],
    lines: [
          [4, 3],
      [2, 5],
      [5, 13],
      [2, 7],
      [7, 10],
      [10, 9],
      [9, 11],
      [3, 12],
      [12, 6],
      [6, 8],
      [8, 1],
      [0, 2],
      [0, 4],
      [2, 3]
    ],
    difficulty: 2,
    starsCount: 14,
    imageFile: 'pegasus',
  },
  {
    id: "perseus",
    name: "英仙座",
    pinyin: "yīng xiān zuò",
    englishName: "Perseus",
    story: "英仙座是秋季夜空中最壮丽的星座之一，它的形状像英仙珀尔修斯手持美杜莎的头颅凯旋而归。\n\n珀尔修斯是宙斯的儿子，他接受了国王交给的危险任务——取来美杜莎的头颅。在众神的帮助下，他成功斩下美杜莎的头，并用它的头颅将海怪变成石头，救出了安德洛墨达。\n\n英仙座中有一个著名的双星团（NGC 869和NGC 884），用肉眼就能看到一团模糊的光斑。",
    funFacts: [
    "英仙座β星叫「大陵五」，是一颗「魔星」——它会周期性地变暗，因为它实际上是一对双星！",
    "每年8月中旬的英仙座流星雨是全年最壮观的流星雨之一，最高时每小时可见上百颗！",
    "英仙座中有一个著名的星团——英仙座双星团，肉眼就能看到。"
    ],
    stars: [
      {x: 138.3, y: 77.4, label: "Mirfak"},
      {x: 104.7, y: 173.5, label: "Algol"},
      {x: 206.5, y: 270.0, label: "Menkhib"},
      {x: 207.7, y: 181.5, label: "ε Per"},
      {x: 106.8, y: 37.2, label: "γ Per"},
      {x: 172.3, y: 99.1, label: "δ Per"},
      {x: 97.2, y: 196.1, label: "Gorgonea Terti"},
      {x: 87.4, y: 10.0, label: "Miram"},
      {x: 183.7, y: 267.2, label: "Atik"},
      {x: 214.1, y: 227.0, label: "Menkib"},
      {x: 65.9, y: 199.3, label: "16 Per"}
    ],
    lines: [
          [8, 2],
      [2, 9],
      [9, 3],
      [3, 5],
      [5, 0],
      [0, 4],
      [4, 7],
      [0, 1],
      [1, 6],
      [6, 10]
    ],
    difficulty: 2,
    starsCount: 11,
    imageFile: 'perseus',
  },
  {
    id: "phoenix",
    name: "凤凰座",
    pinyin: "fèng huáng zuò",
    englishName: "Phoenix",
    story: "凤凰座是南天一只浴火重生的神鸟——凤凰！传说凤凰每500年自焚一次，然后在灰烬中重生。它代表不死和永恒的精神。\n\n凤凰座和中国的凤凰文化遥相呼应——虽然名字相同，但这个星座是16世纪欧洲航海家命名的。",
    funFacts: [
    "凤凰座最亮的星「火鸟六」是一颗橙色的巨大恒星，距离我们约85光年。",
    "虽然凤凰座不含有黄的典型深空天体，但作为南天天际的一个标志性区域，它对航海者有重要意义。"
    ],
    stars: [
      {x: 46.6, y: 49.0, label: "Ankaa"},
      {x: 152.0, y: 107.8, label: "Alrial III"},
      {x: 211.3, y: 61.5, label: "Alrial V"},
      {x: 10.0, y: 104.3, label: "ε Phe"},
      {x: 48.5, y: 68.8, label: "κ Phe"},
      {x: 211.0, y: 145.2, label: "δ Phe"},
      {x: 154.7, y: 231.0, label: "Wurren"},
      {x: 270.0, y: 112.5, label: "ψ Phe"}
    ],
    lines: [
          [6, 1],
      [1, 4],
      [4, 6],
      [1, 5],
      [5, 7],
      [7, 1],
      [1, 2],
      [2, 4],
      [4, 0],
      [0, 3],
      [3, 4]
    ],
    difficulty: 3,
    starsCount: 8,
    imageFile: 'phoenix',
  },
  {
    id: "pictor",
    name: "绘架座",
    pinyin: "huì jià zuò",
    englishName: "Pictor",
    story: "绘架座是一个画家用的画架！拉卡伊在1750年代创造了它，纪念绘画艺术。它位于南天船底座附近，是最不为人知的星座之一。\n\n但绘架座中有一颗非常著名的年轻恒星——绘架座β。它是第一个被拍到周围有巨大尘埃盘的恒星，像太阳系年轻时一样，正在形成自己的行星系统！",
    funFacts: [
    "绘架座β是第一颗被直接拍到周围尘埃盘的恒星，看起来像一颗小太阳系正在诞生！",
    "天文学家对绘架座β的研究帮助我们了解了行星是如何形成的。"
    ],
    stars: [
      {x: 233.6, y: 270.0, label: "α Pic"},
      {x: 46.4, y: 10.0, label: "β Pic"},
      {x: 63.6, y: 128.7, label: "γ Pic"}
    ],
    lines: [
          [0, 2],
      [2, 1]
    ],
    difficulty: 2,
    starsCount: 3,
    imageFile: 'pictor',
  },
  {
    id: "pisces",
    name: "双鱼座",
    pinyin: "shuāng yú zuò",
    englishName: "Pisces",
    story: "双鱼座是黄道十二星座之一，它代表着爱与美之神阿佛洛狄忒和她的儿子厄洛斯。\n\n有一天，众神在埃及尼罗河畔聚会，突然怪物提丰出现了！众神纷纷变身逃跑——阿佛洛狄忒和厄洛斯跳进尼罗河，变成两条鱼逃走了。\n\n为了纪念这次逃脱，雅典娜将这两条鱼升上天空，成为双鱼座。双鱼座的两条鱼之间用丝带相连，永不分离。",
    funFacts: [
    "双鱼座是黄道十二星座中最暗的一个，肉眼需要很暗的地方才能看清它的形状。",
    "每年3月的黄昏，双鱼座位于西方天空，是观测它的最佳时机。",
    "在中国古代，双鱼座的区域属于「室宿」和「壁宿」，是二十八宿的一部分。"
    ],
    stars: [
      {x: 220.0, y: 96.4, label: "Alpherg"},
      {x: 10.0, y: 172.7, label: "γ Psc"},
      {x: 270.0, y: 175.7, label: "Alrescha"},
      {x: 75.9, y: 151.5, label: "ω Psc"},
      {x: 45.4, y: 158.7, label: "ι Psc"},
      {x: 243.4, y: 135.4, label: "Torcular"},
      {x: 177.4, y: 145.1, label: "ε Psc"},
      {x: 27.0, y: 153.3, label: "θ Psc"},
      {x: 238.2, y: 159.3, label: "ν Psc"},
      {x: 48.2, y: 183.6, label: "λ Psc"}
    ],
    lines: [
          [0, 5],
      [5, 2],
      [3, 4],
      [4, 9],
      [1, 7],
      [7, 4]
    ],
    difficulty: 3,
    starsCount: 10,
    imageFile: 'pisces',
  },
  {
    id: "piscis_austrinus",
    name: "南鱼座",
    pinyin: "nán yú zuò",
    englishName: "Piscis Austrinus",
    story: "南鱼座是南天的一条大鱼！在古巴比伦神话中，这是一条鱼神。在南鱼座的嘴里有一颗非常明亮的星星——北落师门，是秋季夜空中孤独而耀眼的标记。\n\n这颗星在阿拉伯语里叫「鱼嘴」，正是南鱼张开大嘴喝水的位置。",
    funFacts: [
    "南鱼座的「北落师门」是全天第18亮星，在秋季的南方夜空独自闪耀，周围被黑色尘埃盘包围！",
    "中国古人称北落师门为「北落师门」，是军中北边营门的标志，也是行军的重要方位星。"
    ],
    stars: [
      {x: 270.0, y: 138.9, label: "Fomalhaut"},
      {x: 207.7, y: 91.1, label: "ε PsA"},
      {x: 260.3, y: 188.9, label: "δ PsA"},
      {x: 171.5, y: 182.1, label: "Fum al Hui"},
      {x: 93.6, y: 186.5, label: "τ PsA"},
      {x: 10.0, y: 163.1, label: "θ PsA"},
      {x: 55.8, y: 117.4, label: "η PsA"}
    ],
    lines: [
          [0, 1],
      [1, 6],
      [6, 5],
      [5, 4],
      [4, 3],
      [3, 2]
    ],
    difficulty: 3,
    starsCount: 7,
    imageFile: 'piscis_austrinus',
  },
  {
    id: "puppis",
    name: "船尾座",
    pinyin: "chuán wěi zuò",
    englishName: "Puppis",
    story: "船尾座是大船南船座的尾部！想象一艘巨大的帆船，船头是船底座，船帆是船帆座，船尾就是船尾座。\n\n古代航海者由北向南航行时，看到这组星座从海平面升起，就知道自己正在接近南方的世界。",
    funFacts: [
    "船尾座中最亮的星叫「弧矢增三十二」，在中国古代属于「弧矢」星官，是一副弓箭！",
    "南船座是古代最大的星座，后来在18世纪被拆分成了三个独立的星座。"
    ],
    stars: [
      {x: 208.7, y: 164.8, label: "Naos"},
      {x: 118.9, y: 132.7, label: "π Pup"},
      {x: 230.6, y: 10.0, label: "Tureis"},
      {x: 80.2, y: 270.0, label: "τ Pup"},
      {x: 49.4, y: 199.6, label: "ν Pup"},
      {x: 142.8, y: 194.6, label: "σ Pup"},
      {x: 188.4, y: 12.5, label: "HIP 38146"}
    ],
    lines: [
          [2, 6],
      [6, 1],
      [1, 4],
      [4, 3],
      [3, 5],
      [5, 0],
      [0, 2]
    ],
    difficulty: 2,
    starsCount: 7,
    imageFile: 'puppis',
  },
  {
    id: "pyxis",
    name: "罗盘座",
    pinyin: "luó pán zuò",
    englishName: "Pyxis",
    story: "罗盘座原来也是大船南船座的一部分，代表船上的指南针！航海者依靠罗盘在茫茫大海上找到方向，就像天文学家依靠星星指向天空的路。\n\n后来南船座被拆分了，罗盘座从桅杆变成一个独立的星座——虽然小，但它在船底座、船尾座和船帆座旁边，组成了大船的全貌。",
    funFacts: [
    "罗盘座原来属于南船座桅杆的一部分，后来被拉卡伊独立命名。",
    "罗盘座很小很暗，但它紧挨着银河，附近有很多迷人的星云和星团。"
    ],
    stars: [
      {x: 126.0, y: 197.2, label: "α Pyx"},
      {x: 101.8, y: 270.0, label: "β Pyx"},
      {x: 178.2, y: 10.0, label: "γ Pyx"}
    ],
    lines: [
          [1, 0],
      [0, 2]
    ],
    difficulty: 2,
    starsCount: 3,
    imageFile: 'pyxis',
  },
  {
    id: "reticulum",
    name: "网罟座",
    pinyin: "wǎng gǔ zuò",
    englishName: "Reticulum",
    story: "网罟座是一张十字交叉的细丝网格——它是望远镜中用来精确测量星体位置的测微器！拉卡伊用这个仪器在南非精确测量了约10000颗星星的位置。\n\n网罟座是一张观星之网，天文学家靠这张网抓住了无数星星的精确坐标。",
    funFacts: [
    "网罟座原本叫「菱形网座」，代表望远镜中的十字丝测量网格。",
    "网罟座ζ星系是一个独特的大麦哲伦云星系，且它距离我们较近，约240光年。"
    ],
    stars: [
      {x: 208.5, y: 158.2, label: "α Ret"},
      {x: 52.9, y: 270.0, label: "β Ret"},
      {x: 227.1, y: 10.0, label: "ε Ret"},
      {x: 122.6, y: 106.8, label: "δ Ret"}
    ],
    lines: [
          [0, 2],
      [2, 3],
      [3, 1],
      [1, 0]
    ],
    difficulty: 1,
    starsCount: 4,
    imageFile: 'reticulum',
  },
  {
    id: "sagitta",
    name: "天箭座",
    pinyin: "tiān jiàn zuò",
    englishName: "Sagitta",
    story: "天箭座是一支飞在天空中的箭！传说这支箭是爱神丘比特射出的爱情之箭，或者是大力士赫拉克勒斯射出的毒箭。\n\n在希腊神话中，赫拉克勒斯用这支箭射死了偷吃普罗米修斯内脏的神鹰——那只神鹰也在天上，就是旁边的天鹰座！箭永远在追击老鹰。",
    funFacts: [
    "天箭座虽然排在88星座中第三小，但四颗星排列整齐，真的像一支飞在空中的箭！",
    "在天箭座附近有一颗著名的球状星团M71，像一小团毛茸茸的星光。"
    ],
    stars: [
      {x: 204.2, y: 107.3, label: "γ Sge"},
      {x: 86.3, y: 149.8, label: "δ Sge"},
      {x: 19.6, y: 195.7, label: "β Sge"},
      {x: 10.0, y: 171.9, label: "Sham"},
      {x: 270.0, y: 84.3, label: "η Sge"}
    ],
    lines: [
          [2, 1],
      [1, 3],
      [1, 0],
      [0, 4]
    ],
    difficulty: 1,
    starsCount: 5,
    imageFile: 'sagitta',
  },
  {
    id: "sagittarius",
    name: "人马座",
    pinyin: "rén mǎ zuò",
    englishName: "Sagittarius",
    story: "人马座是夏季夜空中最壮观的星座之一，因为银河系的中心方向就在这个星座里！\n\n在希腊星座中，人马座代表的是半人半马的喀戎。他是一位智慧而仁慈的半人马，许多希腊英雄都曾是他的学生，包括赫拉克勒斯、阿喀琉斯和伊阿宋。\n\n但有一次，赫拉克勒斯在打猎时不小心用毒箭射中了喀戎。喀戎虽然不死，但承受着巨大的痛苦。最终他选择放弃永生，将这个特权让给了普罗米修斯。",
    funFacts: [
    "人马座的形状像一个「茶壶」，每年7-8月在南方低空找到这个「茶壶」非常有趣！",
    "银河系的中心（超大质量黑洞）就位于人马座方向，距离我们约2.6万光年。",
    "在中国古代，人马座的核心区域被称为「南斗六星」，与北斗七星遥相呼应。"
    ],
    stars: [
      {x: 88.9, y: 197.0, label: "Kaus Australis"},
      {x: 164.9, y: 103.2, label: "Nunki"},
      {x: 182.3, y: 145.0, label: "Ascella"},
      {x: 78.5, y: 145.1, label: "Kaus Media"},
      {x: 94.1, y: 93.6, label: "Kaus Borealis"},
      {x: 41.5, y: 154.3, label: "Alnasl"},
      {x: 75.4, y: 224.8, label: "Arkab"},
      {x: 140.1, y: 110.9, label: "Namalsadirah I"},
      {x: 194.2, y: 120.0, label: "Namalsadirah II"},
      {x: 172.6, y: 43.8, label: "ξ² Sgr"},
      {x: 190.9, y: 51.7, label: "ο Sgr"},
      {x: 54.7, y: 45.5, label: "Polis"},
      {x: 238.4, y: 10.0, label: "ρ¹ Sgr"},
      {x: 222.9, y: 270.0, label: "Rukbat"}
    ],
    lines: [
          [3, 4],
      [6, 0],
      [0, 5],
      [5, 3],
      [3, 0],
      [0, 2],
      [2, 7],
      [7, 3],
      [7, 4],
      [4, 11],
      [2, 8],
      [8, 1],
      [1, 7],
      [1, 9],
      [9, 10]
    ],
    difficulty: 3,
    starsCount: 14,
    imageFile: 'sagittarius',
  },
  {
    id: "scorpius",
    name: "天蝎座",
    pinyin: "tiān xiē zuò",
    englishName: "Scorpius",
    story: "天蝎座是夏季夜空中最惊心动魄的星座——它弯曲的尾巴像一只真正的蝎子！\n\n在希腊神话中，天蝎是大地女神该亚派去刺杀猎人俄里翁的。原来俄里翁曾夸口说「世上没有比我更厉害的猎人」，这话激怒了众神。\n\n天蝎成功刺杀了俄里翁，但它也被升上天空。有趣的是，天蝎座升起时，猎户座就会落下——它们在天空中永远不会同时出现。",
    funFacts: [
    "天蝎座最亮的星叫「心宿二」，是一颗巨大的红超巨星，直径比太阳大700倍！",
    "在中国古代，心宿二属于「心宿」，是二十八宿中最重要的星官之一。",
    "天蝎座的形状非常像一只蝎子，连弯曲的尾巴都栩栩如生，是最好认的星座之一！"
    ],
    stars: [
      {x: 89.4, y: 78.5, label: "Antares"},
      {x: 241.8, y: 202.7, label: "Shaula"},
      {x: 242.0, y: 270.0, label: "Sargas"},
      {x: 143.1, y: 166.3, label: "Larawag"},
      {x: 12.0, y: 42.9, label: "Dschubba"},
      {x: 258.8, y: 226.6, label: "Girtab"},
      {x: 22.7, y: 10.0, label: "Acrab"},
      {x: 106.6, y: 97.9, label: "Paikauhale"},
      {x: 12.1, y: 82.5, label: "Fang"},
      {x: 268.0, y: 240.4, label: "Girtab"},
      {x: 147.3, y: 209.1, label: "Xamidimura"},
      {x: 189.8, y: 268.8, label: "η Sco"},
      {x: 152.1, y: 258.0, label: "ζ¹ Sco"}
    ],
    lines: [
          [1, 5],
      [5, 9],
      [9, 2],
      [2, 11],
      [11, 12],
      [12, 10],
      [10, 3],
      [3, 7],
      [7, 0],
      [0, 4],
      [0, 8],
      [0, 6]
    ],
    difficulty: 3,
    starsCount: 13,
    imageFile: 'scorpius',
  },
  {
    id: "sculptor",
    name: "玉夫座",
    pinyin: "yù fū zuò",
    englishName: "Sculptor",
    story: "玉夫座代表一个雕琢玉石的工匠！它是拉卡伊在18世纪创造的科学仪器星座之一，原本叫「雕刻家工作室」。\n\n玉夫座虽然星星很暗，却有一个著名的南银极星系群——玉夫座星系群，它是距离我们银河系最近的星系群之一。",
    funFacts: [
    "玉夫座星系群是离银河系最近的邻居星系群之一，包括著名的银币星系NGC 253。",
    "NGC 253也叫「玉夫座螺旋星系」，用双筒望远镜在南半球就能看到一团模糊的光斑。"
    ],
    stars: [
      {x: 270.0, y: 93.6, label: "α Scl"},
      {x: 49.9, y: 186.4, label: "β Scl"},
      {x: 10.0, y: 124.6, label: "γ Scl"}
    ],
    lines: [
          [1, 0],
      [0, 2],
      [2, 1]
    ],
    difficulty: 2,
    starsCount: 3,
    imageFile: 'sculptor',
  },
  {
    id: "scutum",
    name: "盾牌座",
    pinyin: "dùn pái zuò",
    englishName: "Scutum",
    story: "盾牌座是波兰国王扬三世·索别斯基的盾牌！1683年，索别斯基在维也纳之战中击败了奥斯曼帝国大军。天文学家赫维留为纪念这次胜利，将这一小片星空命名为盾牌座。\n\n它是唯一一个以真实历史人物命名的星座——其他星座都来自神话和传说。",
    funFacts: [
    "盾牌座是88星座中最晚被命名的之一，也是唯一以真实历史人物命名的星座！",
    "盾牌座虽然小且暗，但位于银河带中，附近有很多美丽的星团。"
    ],
    stars: [
      {x: 100.0, y: 93.7, label: "α Sct"},
      {x: 171.2, y: 10.0, label: "β Sct"},
      {x: 66.2, y: 245.3, label: "γ Sct"},
      {x: 213.8, y: 270.0, label: "HIP 92814"},
      {x: 173.0, y: 32.9, label: "HIP 92202"}
    ],
    lines: [
          [1, 4],
      [4, 3],
      [3, 2],
      [2, 0],
      [0, 1]
    ],
    difficulty: 1,
    starsCount: 5,
    imageFile: 'scutum',
  },
  {
    id: "serpens",
    name: "巨蛇座",
    pinyin: "jù shé zuò",
    englishName: "Serpens",
    story: "巨蛇座被蛇夫座分成了两半——蛇头在西边，蛇尾在东边，中间被医神阿斯克勒庇俄斯抓着！它是唯一一个被分成两块的星座。\n\n这条大蛇是医神的助手，医神通过观察蛇的行为学到了很多治病知识。现在医神的蛇杖上缠绕的蛇，就是巨蛇座的象征。",
    funFacts: [
    "巨蛇座是唯一被分割成两部分的星座——蛇头（巨蛇头座）和蛇尾（巨蛇尾座），中间隔着蛇夫座！",
    "巨蛇座有一段著名的恒星形成区——M16鹰状星云，哈勃望远镜在这里拍到了著名的「创生之柱」。"
    ],
    stars: [
      {x: 21.4, y: 112.7, label: "Unukalhai"},
      {x: 229.0, y: 162.6, label: "Alava"},
      {x: 28.1, y: 166.3, label: "μ Ser"},
      {x: 170.5, y: 229.8, label: "ξ Ser"},
      {x: 26.1, y: 64.5, label: "Nasak Shamiya I"},
      {x: 29.7, y: 123.4, label: "Nasak Yamani II"},
      {x: 10.0, y: 90.4, label: "Tsin"},
      {x: 39.3, y: 63.3, label: "Nasak Shamiya II"},
      {x: 30.3, y: 50.2, label: "Gudja"},
      {x: 176.2, y: 216.6, label: "ο Ser"},
      {x: 149.6, y: 216.7, label: "ν Ser"},
      {x: 270.0, y: 123.1, label: "Alya"}
    ],
    lines: [
          [2, 5],
      [5, 0],
      [0, 6],
      [6, 4],
      [4, 7],
      [7, 8],
      [8, 4],
      [11, 1],
      [1, 9],
      [9, 3],
      [3, 10]
    ],
    difficulty: 3,
    starsCount: 12,
    imageFile: 'serpens',
  },
  {
    id: "sextans",
    name: "六分仪座",
    pinyin: "liù fēn yí zuò",
    englishName: "Sextans",
    story: "六分仪座是一个古老的天文仪器——六分仪！古代航海者用它来测量天体的高度，确定自己在海上的位置。\n\n这个星座是赫维留在1687年创造的，用来纪念他最爱的天文测量工具。不过有意思的是，赫维留的六分仪后来在一场大火中烧毁了——但天上的六分仪永远不会消失。",
    funFacts: [
    "六分仪是一种航海工具，水手用它测量太阳和星星的高度来确定纬度。",
    "六分仪座是赤道星座，离天球赤道很近，所以在地球上大部分地方都能看见。"
    ],
    stars: [
      {x: 10.0, y: 133.8, label: "α Sex"},
      {x: 270.0, y: 146.2, label: "β Sex"}
    ],
    lines: [
          [1, 0]
    ],
    difficulty: 2,
    starsCount: 2,
    imageFile: 'sextans',
  },
  {
    id: "taurus",
    name: "金牛座",
    pinyin: "jīn niú zuò",
    englishName: "Taurus",
    story: "金牛座是冬季夜空中最壮丽的星座之一，其中最著名的是昴星团——一堆紧紧挤在一起的蓝色星星。\n\n在希腊神话中，宙斯化身为一头美丽的白色公牛，混进公主欧罗巴的父亲的海边牛群中。欧罗巴被这头温顺俊美的公牛吸引，骑上了它的背——宙斯立刻跳入海中，将欧罗巴带到了远方的大陆。\n\n那片大陆后来就以欧罗巴的名字命名为「欧洲」（Europe）。昴星团则是宙斯将七位海中仙女送上天空的纪念。",
    funFacts: [
    "金牛座中有一个著名的星团——昴星团（M45），肉眼可以看到6-7颗星，被称为「七姊妹」。",
    "毕宿五是金牛座最亮的星，是一颗橙红色的巨星，标志着金牛的眼睛。",
    "中国古代将毕宿五称为「毕宿五」，是二十八宿中「毕宿」的主星。"
    ],
    stars: [
      {x: 153.2, y: 163.9, label: "Aldebaran"},
      {x: 242.4, y: 60.1, label: "Elnath"},
      {x: 270.0, y: 119.3, label: "Tianguan"},
      {x: 138.8, y: 169.3, label: "Chamukuy"},
      {x: 82.4, y: 196.1, label: "λ Tau"},
      {x: 138.8, y: 141.9, label: "Ain"},
      {x: 10.0, y: 219.9, label: "ο Tau"},
      {x: 64.5, y: 99.6, label: "Atlas"},
      {x: 121.2, y: 171.2, label: "Prima Hyadum"},
      {x: 127.5, y: 155.4, label: "Secunda Hyadum"},
      {x: 164.7, y: 110.4, label: "τ Tau"},
      {x: 132.6, y: 152.2, label: "δ³ Tau"}
    ],
    lines: [
          [1, 10],
      [10, 5],
      [0, 2],
      [8, 9],
      [8, 4],
      [4, 6],
      [0, 5],
      [0, 3],
      [3, 8],
      [5, 11],
      [11, 9],
      [9, 7]
    ],
    difficulty: 2,
    starsCount: 12,
    imageFile: 'taurus',
  },
  {
    id: "telescopium",
    name: "望远镜座",
    pinyin: "wàng yuǎn jìng zuò",
    englishName: "Telescopium",
    story: "望远镜座是一架天文望远镜！拉卡伊创造它时，是想为这个让人类第一次真正看清宇宙的伟大发明留一个纪念碑。伽利略在1609年第一次把望远镜指向夜空，从此天文学进入了全新的时代。\n\n望远镜座虽然星星很暗，但它静静地提醒我们：好奇心是通往宇宙的第一面透镜。",
    funFacts: [
    "望远镜座也是拉卡伊的「科学仪器」星座之一，纪念望远镜这一革命性发明。",
    "望远镜座并没有特别亮的星星，最亮的也只有3.5等，但它在南天星空中有独特的位置。"
    ],
    stars: [
      {x: 126.9, y: 10.0, label: "α Tel"},
      {x: 153.1, y: 270.0, label: "ζ Tel"}
    ],
    lines: [
          [1, 0]
    ],
    difficulty: 2,
    starsCount: 2,
    imageFile: 'telescopium',
  },
  {
    id: "triangulum",
    name: "三角座",
    pinyin: "sān jiǎo zuò",
    englishName: "Triangulum",
    story: "三角座是三个星星组成的简单三角形，像一个几何学图案挂在天空！古希腊人把它想象成尼罗河三角洲的样子，也有人说它象征字母Δ（德尔塔）。\n\n三角座中有一个著名的M33漩涡星系——仙女座大星云的好朋友，是本星系群中第三大星系。",
    funFacts: [
    "三角座像数学课本里画的标准三角形，三颗主星几乎等距离分布！",
    "三角座M33星系距离地球约300万光年，在极黑的地方肉眼就能看到！"
    ],
    stars: [
      {x: 186.6, y: 10.0, label: "Mizan"},
      {x: 14.8, y: 270.0, label: "Mothallah"},
      {x: 265.2, y: 64.0, label: "γ Tri"}
    ],
    lines: [
          [2, 0],
      [0, 1],
      [1, 2]
    ],
    difficulty: 1,
    starsCount: 3,
    imageFile: 'triangulum',
  },
  {
    id: "triangulum_australe",
    name: "南三角座",
    pinyin: "nán sān jiǎo zuò",
    englishName: "Triangulum Australe",
    story: "南三角座是南天的三角座，和北天的三角座遥相呼应！1603年由德国天文学家拜耳首次绘制。它紧挨着南门二和半人马座，三颗亮星组成漂亮的等边三角形。\n\n对于南半球的航海者来说，南三角座是重要的导航标志之一。",
    funFacts: [
    "南三角座的α星是全天中最靠近南天极的亮星之一，对南半球导航很重要！",
    "南三角座的三颗主星几乎等距，是一个非常标准的几何三角形。"
    ],
    stars: [
      {x: 270.0, y: 237.0, label: "Atria"},
      {x: 112.0, y: 43.0, label: "β TrA"},
      {x: 10.0, y: 222.8, label: "γ TrA"}
    ],
    lines: [
          [0, 2],
      [2, 1],
      [1, 0]
    ],
    difficulty: 1,
    starsCount: 3,
    imageFile: 'triangulum_australe',
  },
  {
    id: "tucana",
    name: "杜鹃座",
    pinyin: "dù juān zuò",
    englishName: "Tucana",
    story: "杜鹃座是一种热带大嘴鸟——巨嘴鸟（也叫大嘴鸟）！1598年荷兰航海家在南美看到这种嘴巴巨大的鸟，于是把南天的一片星空命名为杜鹃座。\n\n杜鹃座最令人惊叹的是它里面藏着小麦哲伦云——我们银河系的两个卫星星系之一，肉眼就能在南天看到一团淡淡的云雾。",
    funFacts: [
    "杜鹃座里藏着小麦哲伦云，是银河系的卫星星系，感觉像天空中一团淡淡的小云朵！",
    "在杜鹃座的小麦哲伦云中，还藏着漂亮的球状星团47 Tucanae（杜鹃座47）。"
    ],
    stars: [
      {x: 10.0, y: 138.7, label: "α Tuc"},
      {x: 125.6, y: 82.7, label: "γ Tuc"},
      {x: 243.5, y: 197.3, label: "ζ Tuc"},
      {x: 270.0, y: 170.0, label: "β¹ Tuc"}
    ],
    lines: [
          [0, 1],
      [1, 2],
      [1, 3]
    ],
    difficulty: 3,
    starsCount: 4,
    imageFile: 'tucana',
  },
  {
    id: "ursa_major",
    name: "大熊座",
    pinyin: "dà xióng zuò",
    englishName: "Ursa Major",
    story: "大熊座是全天最大的星座之一，其中最著名的是「北斗七星」。\n\n在希腊神话中，这只大熊其实是美丽的卡利斯托。宙斯爱上了她，引来了赫拉的嫉妒。赫拉将卡利斯托变成了一只熊。\n\n多年后，卡利斯托的儿子阿卡斯差点在森林中射杀变成熊的母亲。宙斯为了避免悲剧，将两人一同送上天空，成为大熊座和小熊座。",
    funFacts: [
    "北斗七星只是大熊座的一部分！真正的大熊座包含更多暗星。",
    "中国古代将北斗七星用于导航和计时，俗语说「斗柄指东，天下皆春」。",
    "北斗七星的亮度都很接近，是夜空中最容易辨认的星群。"
    ],
    stars: [
      {x: 213.4, y: 108.6, label: "Alioth"},
      {x: 126.0, y: 92.6, label: "Dubhe"},
      {x: 270.0, y: 121.7, label: "Alkaid"},
      {x: 237.1, y: 103.7, label: "Mizar"},
      {x: 124.8, y: 123.9, label: "Merak"},
      {x: 169.7, y: 135.5, label: "Phecda"},
      {x: 133.3, y: 193.5, label: "ψ UMa"},
      {x: 81.8, y: 208.3, label: "Tania Australis"},
      {x: 10.0, y: 148.6, label: "Talitha"},
      {x: 45.8, y: 139.7, label: "Alhaud V"},
      {x: 182.6, y: 112.5, label: "Megrez"},
      {x: 23.3, y: 71.7, label: "Muscida"},
      {x: 77.2, y: 199.4, label: "Tania Borealis"},
      {x: 11.9, y: 155.1, label: "Alkaphrah"}
    ],
    lines: [
          [2, 3],
      [3, 0],
      [0, 10],
      [10, 1],
      [1, 4],
      [4, 5],
      [5, 10],
      [6, 12],
      [6, 7],
      [9, 13],
      [9, 8]
    ],
    difficulty: 1,
    starsCount: 14,
    imageFile: 'ursa_major',
  },
  {
    id: "ursa_minor",
    name: "小熊座",
    pinyin: "xiǎo xióng zuò",
    englishName: "Ursa Minor",
    story: "小熊座中最亮的星，就是大名鼎鼎的北极星（勾陈一）！\n\n在希腊神话中，小熊座是卡利斯托的儿子阿卡斯变成的。母子二熊都被宙斯放上天空，大熊在北方天空徘徊，小熊则紧贴着北天极。\n\n北极星是夜空中最重要的导航星，它几乎固定在正北方向，指引了无数航海家和探险家。",
    funFacts: [
    "北极星并不是全天最亮的星，但它是最重要的导航星！",
    "地球的自转轴指向小熊座，所以北极星几乎不动。",
    "由于地球进动，五千年后织女星将成为新的北极星。"
    ],
    stars: [
      {x: 182.0, y: 10.0, label: "Polaris"},
      {x: 88.4, y: 228.3, label: "Kochab"},
      {x: 107.6, y: 270.0, label: "Pherkad"},
      {x: 188.3, y: 132.4, label: "Circitores"},
      {x: 147.2, y: 191.5, label: "Akfa Farkadain"},
      {x: 191.6, y: 65.6, label: "Yildun"},
      {x: 171.8, y: 223.2, label: "Anwa Farkadain"}
    ],
    lines: [
          [0, 5],
      [5, 3],
      [3, 4],
      [4, 6],
      [6, 2],
      [2, 1],
      [1, 4]
    ],
    difficulty: 2,
    starsCount: 7,
    imageFile: 'ursa_minor',
  },
  {
    id: "vela",
    name: "船帆座",
    pinyin: "chuán fān zuò",
    englishName: "Vela",
    story: "船帆座和船底座、船尾座曾经合在一起叫「南船座」，是一艘大帆船！船帆座就是船上的风帆部分。\n\n这艘大船载着希腊英雄伊阿宋和勇士们驶向黑海，去寻找传说中的金羊毛。船帆鼓满风，带领勇士们乘风破浪。",
    funFacts: [
    "船帆座中最有名的天体是船帆座脉冲星，它是一颗转得飞快的中子星，每秒旋转11次！",
    "船帆座和另外两「船」（船底座、船尾座）合在一起，是古人在南天看到的巨舰形象。"
    ],
    stars: [
      {x: 10.0, y: 153.4, label: "Suhail"},
      {x: 79.8, y: 214.7, label: "Alsephina"},
      {x: 104.8, y: 96.8, label: "Suhail"},
      {x: 134.3, y: 212.7, label: "Markeb"},
      {x: 270.0, y: 171.3, label: "μ Vel"},
      {x: 185.2, y: 209.7, label: "φ Vel"},
      {x: 70.2, y: 197.9, label: "ο Vel"},
      {x: 146.6, y: 65.3, label: "ψ Vel"},
      {x: 257.7, y: 155.9, label: "HIP 51986"},
      {x: 229.0, y: 87.9, label: "HIP 50191"}
    ],
    lines: [
          [0, 6],
      [6, 1],
      [1, 3],
      [3, 5],
      [5, 4],
      [4, 8],
      [8, 9],
      [9, 7],
      [7, 2],
      [2, 0]
    ],
    difficulty: 2,
    starsCount: 10,
    imageFile: 'vela',
  },
  {
    id: "virgo",
    name: "室女座",
    pinyin: "shì nǚ zuò",
    englishName: "Virgo",
    story: "室女座是黄道十二星座中面积最大的一个，其中最亮的星是角宿一。\n\n在希腊神话中，室女座代表的是农神得墨忒耳的女儿珀耳塞福涅。她被冥王哈迪斯掳到冥界做了冥后。每年春天，她回到人间，大地便万物复苏；秋天她回到冥界，大地便一片凋零。\n\n这就是四季更替的由来。室女座在春季出现，秋季消失，正好对应着珀耳塞福涅的往返。",
    funFacts: [
    "角宿一（室女座α）是一颗炽热的蓝色巨星，亮度是太阳的2000倍！",
    "室女座方向有一个巨大的星系团——室女座星系团，包含超过1000个星系！",
    "在中国古代，角宿一是「角宿」的主星，代表龙的角，是二十八宿的起点。"
    ],
    stars: [
      {x: 151.8, y: 205.4, label: "Spica"},
      {x: 87.5, y: 148.0, label: "Porrima"},
      {x: 118.3, y: 74.6, label: "Vindemiatrix"},
      {x: 165.8, y: 142.8, label: "Heze"},
      {x: 107.9, y: 119.2, label: "Minelauva"},
      {x: 270.0, y: 128.3, label: "109 Vir"},
      {x: 265.1, y: 173.2, label: "Rigilawwa"},
      {x: 56.1, y: 143.5, label: "Zaniah"},
      {x: 10.0, y: 101.1, label: "ν Vir"},
      {x: 226.4, y: 175.1, label: "Syrma"},
      {x: 221.2, y: 200.3, label: "Kang"},
      {x: 205.7, y: 130.2, label: "τ Vir"}
    ],
    lines: [
          [8, 7],
      [7, 1],
      [1, 0],
      [0, 10],
      [10, 9],
      [9, 6],
      [0, 3],
      [3, 11],
      [11, 5],
      [3, 4],
      [4, 2],
      [4, 1]
    ],
    difficulty: 2,
    starsCount: 12,
    imageFile: 'virgo',
  },
  {
    id: "volans",
    name: "飞鱼座",
    pinyin: "fēi yú zuò",
    englishName: "Volans",
    story: "飞鱼座是一只会飞的鱼！在热带海洋中，飞鱼可以从水面跃出，张开胸鳍滑翔几十米远。16世纪的荷兰航海家在南非好望角附近的海洋中看到飞鱼，把这个南天星座命名为飞鱼座。\n\n飞鱼座紧挨着船底座，像一条刚从南天银河中跃出水面的鱼。",
    funFacts: [
    "飞鱼座是最早被欧洲人绘制的南天星座之一，由荷兰航海家凯泽尔在1595年命名。",
    "飞鱼座和大麦哲伦云很近，在南半球观星时常常一起出现。"
    ],
    stars: [
      {x: 181.4, y: 61.3, label: "β Vol"},
      {x: 10.0, y: 175.4, label: "γ² Vol"},
      {x: 81.2, y: 218.7, label: "ζ Vol"},
      {x: 16.1, y: 110.0, label: "δ Vol"},
      {x: 270.0, y: 84.9, label: "α Vol"},
      {x: 134.1, y: 119.3, label: "ε Vol"}
    ],
    lines: [
          [2, 1],
      [1, 5],
      [5, 2],
      [5, 3],
      [5, 0],
      [0, 4],
      [4, 5]
    ],
    difficulty: 2,
    starsCount: 6,
    imageFile: 'volans',
  },
  {
    id: "vulpecula",
    name: "狐狸座",
    pinyin: "hú li zuò",
    englishName: "Vulpecula",
    story: "狐狸座是天鹅座旁边一只狡猾的小狐狸！天文学家赫维留在1690年创造它时，原本想画一只狐狸嘴里叼着一只鹅——所以它原名是「狐狸与鹅座」。\n\n后来鹅被省略掉了，只剩下这只小狐狸蹲在银河边。狐狸座中有一团著名的哑铃星云M27，是最被容易看到的行星状星云！",
    funFacts: [
    "狐狸座原本叫「狐狸与鹅座」，画着一只狐狸嘴里叼着鹅，后来才简化为狐狸座。",
    "狐狸座M27哑铃星云是第一个被发现的行星状星云，用小型望远镜就能看到它的哑铃形状！"
    ],
    stars: [
      {x: 10.0, y: 195.3, label: "Anser"},
      {x: 270.0, y: 84.7, label: "15 Vul"}
    ],
    lines: [
          [0, 1]
    ],
    difficulty: 2,
    starsCount: 2,
    imageFile: 'vulpecula',
  }
];

const CONSTELLATION_MAP = {};
CONSTELLATIONS.forEach(c => {
  CONSTELLATION_MAP[c.id] = c;
});

// 获取已探索的星座 ID 列表（从 localStorage）
function getExploredIds() {
  try {
    return JSON.parse(localStorage.getItem('xingzhuo_explored') || '[]');
  } catch {
    return [];
  }
}

function markExplored(id) {
  const ids = getExploredIds();
  if (!ids.includes(id)) {
    ids.push(id);
    localStorage.setItem('xingzhuo_explored', JSON.stringify(ids));
  }
}

function isExplored(id) {
  return getExploredIds().includes(id);
}

/* -------- 难度递增系统 -------- */
function getCompletedCountByDifficulty(diff) {
  const ids = getExploredIds();
  return ids.filter(id => {
    const c = CONSTELLATION_MAP[id];
    return c && c.difficulty === diff;
  }).length;
}

function isTierUnlocked(diff) {
  if (diff <= 1) return true; // 难度1始终解锁
  if (diff === 2) return getCompletedCountByDifficulty(1) >= 3;
  if (diff === 3) return getCompletedCountByDifficulty(2) >= 5;
  if (diff === 4) return getCompletedCountByDifficulty(3) >= 3;
  return false;
}

function isConstellationUnlocked(id) {
  const c = CONSTELLATION_MAP[id];
  if (!c) return false;
  return isTierUnlocked(c.difficulty);
}

function getNextTierInfo() {
  for (let d = 2; d <= 4; d++) {
    if (!isTierUnlocked(d)) {
      const needed = d === 2 ? 3 : d === 3 ? 5 : 3;
      const current = getCompletedCountByDifficulty(d - 1);
      return { tier: d, needed, current, remaining: needed - current };
    }
  }
  return null; // 全部解锁
}

function getDifficultyStars(diff) {
  return '★'.repeat(diff) + '☆'.repeat(5 - diff);
}

function getDifficultyLabel(diff) {
  return ['', '入门', '进阶', '挑战', '大师'][diff] || '';
}

function getTierName(diff) {
  return ['', '入门', '进阶', '挑战', '大师'][diff] || '';
}

function getTierEmoji(diff) {
  return ['', '🌟', '🌟🌟', '🌟🌟🌟', '🌟🌟🌟🌟'][diff] || '';
}

function getScore() {
  try {
    return parseInt(localStorage.getItem('xingzhuo_score') || '0', 10);
  } catch {
    return 0;
  }
}

function addScore(points) {
  const s = getScore() + points;
  localStorage.setItem('xingzhuo_score', s);
  return s;
}

function resetProgress() {
  localStorage.removeItem('xingzhuo_explored');
  localStorage.removeItem('xingzhuo_score');
}
