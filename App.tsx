import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Mail, MessageCircle, Gamepad2 } from "lucide-react";
import { useRef, useState, useEffect, ReactNode } from "react";
import Stack from "./components/Stack";

function FadeBlock({ children, className = "", delay = 0 }: { children: ReactNode, className?: string, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-10%", amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  return (
    <div className="bg-white text-[#111111] font-sans overflow-x-hidden selection:bg-[#3C6FFA] selection:text-white">
      <HeroSection />
      <AboutSection />
      <CompetenciesSection />
      <FilmStripSection />
      <GamingSection />
      <PhotographySection />
      <ContactSection />
    </div>
  );
}

function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.05,
      }
    }
  };

  const fragmentVariants = {
    hidden: { opacity: 0, x: -40, y: 40, rotate: -15 },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0, 
      rotate: 0, 
      transition: { type: "spring", damping: 12, stiffness: 100 } 
    }
  };

  const renderAnimatedText = (text: string, className: string = "") => {
    return text.split("").map((char, i) => (
      <motion.span key={i} variants={fragmentVariants} className={`inline-block ${className}`}>
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ));
  };

  return (
    <section id="hero" ref={ref} className="relative h-screen bg-white flex flex-col justify-end items-start px-6 md:px-12 lg:px-24 pb-14 text-left">
      <div className="absolute top-8 left-6 md:left-12 lg:left-24 font-mono text-lg font-medium flex items-center">
        Terrance_<motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block w-2 h-5 bg-[#3C6FFA] ml-1" />
      </div>
      
      <nav className="absolute top-8 right-6 md:right-12 lg:right-24 hidden md:flex space-x-8 text-sm font-semibold tracking-widest uppercase z-50">
        <a href="#about" className="hover:text-[#3C6FFA] transition-colors">About</a>
        <a href="#competencies" className="hover:text-[#3C6FFA] transition-colors">Projects</a>
        <a href="#gaming" className="hover:text-[#3C6FFA] transition-colors">Gaming</a>
        <a href="#photography" className="hover:text-[#3C6FFA] transition-colors">Life</a>
        <a href="#contact" className="hover:text-[#3C6FFA] transition-colors">Contact</a>
      </nav>

      <motion.div style={{ opacity, y }} className="w-full max-w-[95vw]">
        <motion.h1 
          className="text-[48px] md:text-[80px] font-bold leading-[1.2] tracking-tighter"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <span className="block">
            {renderAnimatedText("大家好！")}
          </span>
          <span className="block">
            {renderAnimatedText("我是")}
            {renderAnimatedText("章天润", "text-[#3C6FFA]")}
            {renderAnimatedText("，")}
          </span>
          <span className="block">
            {renderAnimatedText("你也可以叫我 ")}
            <br className="block md:hidden" />
            {renderAnimatedText("Terrance", "text-[#3C6FFA]")}
            {renderAnimatedText("。")}
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.2 }}
          className="mt-6 md:mt-8 text-gray-400 text-base md:text-lg lg:text-xl max-w-3xl leading-relaxed font-medium"
        >
          24岁，身高183cm，体重68.5kg，infp，巨蟹座，本科毕业于河北医科大学临床药学系，另外最近最火的SBTI为Joke-r🤡。
        </motion.p>
      </motion.div>
    </section>
  );
}

function ReactionButton({ icon, popupEmoji }: { icon: string, popupEmoji: string }) {
  const [emojis, setEmojis] = useState<{id: number}[]>([]);

  const handleClick = () => {
    const id = Date.now();
    setEmojis(prev => [...prev, { id }]);
    setTimeout(() => {
      setEmojis(prev => prev.filter(e => e.id !== id));
    }, 1000);
  };

  return (
    <div className="relative">
      <button 
        onClick={handleClick}
        className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors text-xl shadow-sm border border-gray-200"
      >
        {icon}
      </button>
      {emojis.map(e => (
        <motion.div
          key={e.id}
          initial={{ opacity: 1, y: 0, scale: 0.5 }}
          animate={{ opacity: 0, y: -60, scale: 1.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none text-2xl z-10"
        >
          {popupEmoji}
        </motion.div>
      ))}
    </div>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
        <div className="md:col-span-4 flex flex-col">
          <FadeBlock>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-12">About Me</h2>
          </FadeBlock>
          <FadeBlock delay={0.2}>
            <div className="aspect-[3/4] bg-gray-100 w-full relative overflow-hidden rounded-lg">
              <img src="/zipai1.png" alt="Terrance" className="object-cover w-full h-full" referrerPolicy="no-referrer" />
            </div>
            <div className="flex justify-center gap-6 mt-6">
              <ReactionButton icon="❤️" popupEmoji="😘" />
              <ReactionButton icon="💔" popupEmoji="🥺" />
            </div>
          </FadeBlock>
        </div>
        <div className="md:col-span-8 flex flex-col justify-center">
          <FadeBlock>
            <h3 className="text-3xl md:text-5xl font-semibold mb-10 leading-tight">
              跨界：从实验室到游戏宇宙
            </h3>
          </FadeBlock>
          <FadeBlock delay={0.2}>
            <div className="text-lg md:text-xl text-gray-600 space-y-8 leading-relaxed">
              <p>
                鲁迅弃医从文，孙中山弃医从政，冯骥弃医做黑神话<br/>
                <span className="text-[#3C6FFA] font-medium">合着学医的不搞本行，个个都能闯出大名堂？</span><br/>
                既然前辈都证明「不学医本行=<span className="text-[#3C6FFA]">开挂人生</span>」<br/>
                那我药学人，果断解锁游戏新地图！
              </p>
              <p>
                我是追求质感与审美的硬核玩家，偏爱在游戏里体验万千人生。<br/>
                一边是理性规整的医学实验室，一边是鲜活有趣的游戏行业，<br/>
                两种画风截然不同的人生，却都是最真实的我✨
              </p>
            </div>
          </FadeBlock>
        </div>
      </div>
    </section>
  );
}

function CompetenciesSection() {
  const items = [
    {
      title: "🔍 自带八倍镜的“数据猎人”",
      desc: "在医院打过“地狱级”副本：顶着统计学的底子，人肉审核过超2万份复杂处方。不仅眼神好，还成功揪出了抗肿瘤处方的底层逻辑Bug，顺手把医院的审核规则给全盘重置升级了。对异常数据有天然的敏锐度，如果把这招用在游戏宣发和市场漏斗排雷上，我就是那个最快发现不对劲并掏出“急救包”的人。"
    },
    {
      title: "🎬 懂点镜头的10W+“整活”副部长",
      desc: "前校新媒体摄制部副部长，精通微单与 PR、PS 的排列组合。操刀过毕业季、十大歌手等官方“大片”，最懂怎么用视觉抓人眼球；还曾参与过多校联动的整活企划，蹭出了 B站 10万+ 播放量的爆款。懂镜头语言也懂平台调性，随时准备好为好游戏搓出下一个高转化物料。"
    },
    {
      title: "🗣️ 满级跨服沟通的现实版“公会会长”",
      desc: "做临床药学桥梁时，日常在医生和患者的“跨服聊天”中反复横跳，练就了把专业天书精准翻译成人话的满级沟通术，主打一个情绪稳定、需求秒懂。不仅如此，还是大学里的安徽老乡“乡长”，百人规模的中秋线下大聚会说办就办。不管是跨部门扯皮对接，还是玩家社群运营，交给我，情绪价值和落地执行力直接拉满。"
    }
  ];

  return (
    <section id="competencies" className="py-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative">
      <FadeBlock>
        <h2 className="text-sm font-bold uppercase tracking-widest mb-16">Core Competencies & Projects</h2>
      </FadeBlock>
      <div className="border-t border-black/10 relative z-10">
        {items.map((item, index) => (
          <FadeBlock key={index} delay={index * 0.1}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-12 border-b border-black/10 group cursor-default">
              <div className="md:col-span-4 text-xl md:text-2xl font-medium group-hover:translate-x-2 group-hover:text-[#3C6FFA] transition-all duration-300 flex items-start">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity mr-2 text-sm mt-1.5">●</span>
                {item.title}
              </div>
              <div className="md:col-span-8 text-lg md:text-xl text-gray-600 leading-relaxed">
                {item.desc}
              </div>
            </div>
          </FadeBlock>
        ))}
      </div>
    </section>
  );
}

const GAMES_DATA = [
  { id: 1, name: "黑神话：悟空", hours: "121.2小时", ach: "全成就/全收集", desc: "我首款全额预购的豪华版游戏。\n从美术意境到动作设计，皆是国产单机的顶级水准，也是我心中真正意义上的东方3A史诗。作为村里第一个大学生，我始终相信：真正的天选，从不是命运馈赠，而是以热爱为刃，以实力为骨，一步一步，走出属于自己的西行路。", img: "/jiaopian/p10.png" },
  { id: 2, name: "只狼：影逝二度", hours: "157.8小时", ach: "全成就", desc: "“你只不过是条小狗而已”我真正的3A启蒙之作，打了20个小时的鬼刑部，死亡50次的蝴蝶夫人，打铁的独特玩法，拼刀到极致的战斗爽感，通关后还在我脑子里反复回放。", img: "/jiaopian/p24.png" },
  { id: 3, name: "艾尔登法环", hours: "279.8小时", ach: "全成就/全收集", desc: "魂类游戏的集大成之作，丰富的职业与武器玩法，加上两个超级大的开放世界地图共同构成了这片让人甘愿死上百次也不远离去的交界地。\n宫崎英高上学时门无法从他那侧打开。", img: "/jiaopian/p4.png" },
  { id: 4, name: "永劫无间", hours: "1373.9小时", ach: "全成就", desc: "从天人城的落日到昆仑山风雪，独特的石头剪刀布振刀博弈、飞索钩锁的立体战斗，让这款把冷兵器手感和东方美学结合的游戏，完美诠释了“我身无拘，武道无穷”的武术美学。", img: "/jiaopian/p17.jpg" },
  { id: 5, name: "女神异闻录5", hours: "119.6小时", ach: "全成就", desc: "我从没想过JRPG能这么好玩，通关后是久久不能忘怀的戒断反应，那还说啥了，P5天下第一！", img: "/jiaopian/p18.png" },
  { id: 6, name: "剧情向", hours: "通关时长不等", ach: "部分全成就", desc: "从《底特律：变人》的仿生权辩题、《烟火》的中式家庭悲剧，到《行尸走肉》的末世人性选择，《艾迪芬奇的记忆》里怪诞又温柔的家族记忆、再到《锈湖》诡谲神秘的宿命轮回我总在剧情游戏里触摸现实的褶皱。比起通关，我更享受在角色的每一次抉择里共情，在叙事的留白里读懂人性的复杂与温度。", img: "/jiaopian/p30.jpg" },
];

function AchievementBadge() {
  return (
    <svg width="24" height="32" viewBox="0 0 64 85" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block ml-2 align-middle -mt-1">
      <path d="M20 40 L0 85 L20 75 L40 85 Z" fill="#1E88E5" />
      <path d="M44 40 L24 85 L44 75 L64 85 Z" fill="#1E88E5" />
      <path d="M32 0 L42 10 L56 8 L54 22 L64 32 L54 42 L56 56 L42 54 L32 64 L22 54 L8 56 L10 42 L0 32 L10 22 L8 8 L22 10 Z" fill="#2196F3" />
      <circle cx="32" cy="32" r="16" fill="#FFCA28" stroke="#FF9800" strokeWidth="4" />
    </svg>
  );
}

const STACK_CARDS = [...GAMES_DATA].reverse().map(g => ({
  id: g.id,
  content: <img src={g.img} alt={g.name} className="w-full h-full object-cover rounded-2xl" draggable={false} />
}));

function GamingSection() {
  const [activeGameId, setActiveGameId] = useState<string | number>(GAMES_DATA[0].id);
  const activeGame = GAMES_DATA.find(g => g.id === activeGameId) || GAMES_DATA[0];

  return (
    <section id="gaming" className="py-32 overflow-hidden relative bg-[#111111] text-[#FFFFFF]">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative z-10">
        <FadeBlock>
          <h2 className="text-sm font-bold uppercase tracking-widest mb-12 opacity-50">Gaming Portfolio</h2>
        </FadeBlock>
        <FadeBlock>
          <h3 className="text-[4.5vw] sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-12 leading-tight whitespace-nowrap tracking-tight">
            能打的我都行：<span className="text-[#F37021]">Terrance的游戏精选</span>
          </h3>
        </FadeBlock>
        <FadeBlock delay={0.1}>
          <div className="text-xl md:text-2xl lg:text-3xl opacity-80 max-w-5xl mb-24 leading-relaxed font-medium">
            不只是通关，更是追求极致的白金体验。 这里集结了我认为最能代表我风格的大作， 每一款都有它的独特故事。
          </div>
        </FadeBlock>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">
          <FadeBlock delay={0.2} className="lg:col-span-4">
            <div className="h-[420px] md:h-[480px] w-full max-w-[280px] md:max-w-[320px] mx-auto lg:mx-0">
              <Stack
                randomRotation={true}
                sensitivity={120}
                sendToBackOnClick={true}
                cards={STACK_CARDS}
                onTopCardChange={(id) => setActiveGameId(id)}
              />
            </div>
          </FadeBlock>
          
          <div className="lg:col-span-8 flex flex-col justify-center min-h-[300px] lg:pl-12 xl:pl-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGame.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="text-4xl md:text-5xl font-bold mb-8">{activeGame.name}</h4>
                
                <div className="space-y-6 text-xl md:text-2xl opacity-90">
                  <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-8">
                    <span className="text-gray-400 min-w-[140px]">游戏时长：</span>
                    <span>{activeGame.hours}</span>
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-8">
                    <span className="text-gray-400 min-w-[140px]">成就状态：</span>
                    <span className="text-[#F37021] flex items-center">
                      {activeGame.ach}
                      {activeGame.ach.includes("全成就") && <AchievementBadge />}
                    </span>
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-8">
                    <span className="flex-1 leading-relaxed text-2xl md:text-3xl whitespace-pre-line">{activeGame.desc}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        
        <FadeBlock delay={0.3}>
          <div className="opacity-50 italic mb-8 mt-12">
            *其他游戏详情可进入我的steam个人主页了解。
          </div>
          <a href="https://steamcommunity.com/profiles/76561199085157455/" target="_blank" rel="noreferrer" className="inline-flex items-center space-x-2 hover:text-[#3C6FFA] transition-colors border-b border-current pb-1">
            <Gamepad2 size={20} />
            <span>点击访问我的 Steam 个人主页</span>
          </a>
        </FadeBlock>
      </div>

    </section>
  );
}

function FilmStripSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Text appearance when scrolling to the center
  const textOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [30, 0, 0, -30]);

  // Create multiple transform animations for different rows to move at different speeds/directions
  // Adjusted to 20 rows for the new medium size
  const transforms = [
    useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]),
    useTransform(scrollYProgress, [0, 1], ["-15%", "0%"]),
    useTransform(scrollYProgress, [0, 1], ["-5%", "-20%"]),
    useTransform(scrollYProgress, [0, 1], ["-20%", "-5%"]),
    useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]),
    useTransform(scrollYProgress, [0, 1], ["-25%", "0%"]),
    useTransform(scrollYProgress, [0, 1], ["-10%", "-20%"]),
    useTransform(scrollYProgress, [0, 1], ["-20%", "-10%"]),
    useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]),
    useTransform(scrollYProgress, [0, 1], ["-10%", "5%"]),
    useTransform(scrollYProgress, [0, 1], ["-5%", "-15%"]),
    useTransform(scrollYProgress, [0, 1], ["-15%", "-5%"]),
    useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]),
    useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]),
    useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]),
    useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]),
    useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]),
    useTransform(scrollYProgress, [0, 1], ["-5%", "-25%"]),
    useTransform(scrollYProgress, [0, 1], ["-25%", "-5%"]),
    useTransform(scrollYProgress, [0, 1], ["-15%", "-30%"]),
  ];

  // ==========================================
  // 【如何替换为您自己的照片】
  // 1. 在左侧的文件资源管理器中，点击上传图标（或直接拖拽），将您的照片上传到项目中。
  // 2. 将下方数组中的网络链接，替换为您上传的图片文件名。
  //    例如：如果您上传了名为 "game1.jpg" 的图片，就写 "/game1.jpg"。
  // 3. 您可以随意增加或减少数组里的图片数量，系统会自动将它们循环铺满整个屏幕。
  // ==========================================
  const myPhotos = [
    "/jiaopian/p1.png",
    "/jiaopian/p2.png",
    "/jiaopian/p3.png",
    "/jiaopian/p4.png",
    "/jiaopian/p5.png",
    "/jiaopian/p6.png",
    "/jiaopian/p7.png",
    "/jiaopian/p8.jpg",
    "/jiaopian/p9.jpg",
    "/jiaopian/p10.png",
    "/jiaopian/p11.png",
    "/jiaopian/p12.png",
    "/jiaopian/p13.png", // 补上了遗漏的 p13
    "/jiaopian/p14.png",
    "/jiaopian/p15.png",
    "/jiaopian/p16.png",
    "/jiaopian/p17.jpg",
    "/jiaopian/p18.png",
    "/jiaopian/p19.png",
    "/jiaopian/p20.jpg", // 修复了 p20 的后缀名 (png -> jpg)
    "/jiaopian/p21.png",
    "/jiaopian/p22.png",
    "/jiaopian/p23.png",
    "/jiaopian/p24.png",
    "/jiaopian/p25.png",
    "/jiaopian/p26.png",
    "/jiaopian/p27.png",
    "/jiaopian/p28.png",
  ];

  // 确定性打乱算法：根据行号生成不同的图片顺序
  const getShuffledRow = (array: string[], rowIndex: number) => {
    if (array.length === 0) return [];
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = (i * rowIndex * 31 + 17) % (i + 1);
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // 【核心优化】：将所有照片分组（最多分3组）。
  // 这样相邻的行会使用完全不同的照片池，从物理上100%杜绝了相邻行出现同一张照片交汇的情况。
  const numPools = Math.min(3, Math.max(1, Math.floor(myPhotos.length / 7)));
  const pools = Array.from({ length: numPools }, () => [] as string[]);
  myPhotos.forEach((photo, i) => {
    pools[i % numPools].push(photo);
  });

  return (
    <section ref={ref} className="relative h-screen bg-[#111111] overflow-hidden flex items-center justify-center">
      {/* Grid background */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 md:gap-2 opacity-40 rotate-[-45deg] scale-[2.2] pointer-events-none">
        {transforms.map((xTransform, rowIndex) => {
          // 交替使用不同的照片池
          const currentPool = pools[rowIndex % numPools];
          
          // 在当前池子内进行确定性打乱
          const shuffledBase = getShuffledRow(currentPool, rowIndex + 1);
          
          // 动态计算重复次数，确保总图片数足够铺满屏幕（约200张/行）
          const repeatCount = Math.ceil(200 / (currentPool.length || 1));
          const rowPhotos = [...Array(repeatCount)].flatMap(() => shuffledBase);
          
          return (
            <motion.div key={rowIndex} style={{ x: xTransform }} className="flex gap-1.5 md:gap-2 w-[400vw] -ml-[100vw]">
              {rowPhotos.map((src, i) => (
                <div key={i} className="w-[36px] h-[50px] md:w-[44px] md:h-[62px] lg:w-[52px] lg:h-[74px] shrink-0 rounded-sm overflow-hidden shadow-md">
                  <img src={src} alt="Memory" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              ))}
            </motion.div>
          );
        })}
      </div>

      {/* Foreground Text */}
      <motion.div 
        style={{ opacity: textOpacity, y: textY }}
        className="relative z-10 text-center px-6 max-w-4xl"
      >
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight drop-shadow-2xl">
          <span className="text-[#F37021]">我的胶片记忆库</span>
          <span className="text-white">：穿梭于奇幻与现实的每一段游戏旅程。</span>
        </h2>
      </motion.div>
    </section>
  );
}

function PhotographySection() {
  return (
    <section id="photography" className="py-32 relative bg-[#111111] text-[#FFFFFF]">
      <div className="px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative z-10">
        <FadeBlock>
          <h2 className="text-sm font-bold uppercase tracking-widest mb-16 opacity-50">Photography & Lifestyle</h2>
        </FadeBlock>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center mb-24">
          <div className="lg:col-span-5">
            <FadeBlock>
              <div className="text-2xl md:text-3xl lg:text-4xl font-medium leading-tight opacity-90">
                <span className="whitespace-nowrap">热爱摄影、旅行与健身，</span><br/>
                用镜头捕捉独特的抽象美感，用脚步丈量更广阔的世界。
              </div>
            </FadeBlock>
          </div>
          <div className="lg:col-span-7 mt-8 lg:mt-0">
            <FadeBlock delay={0.2}>
              <div className="bg-[#1a1a1a] relative overflow-hidden group rounded-xl">
                <img src="/jiaopian/life1.jpg" alt="Lifestyle" className="w-full h-auto block group-hover:scale-105 transition-transform duration-700" draggable={false} />
              </div>
            </FadeBlock>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {[
            "/jiaopian/life2.jpg",
            "/jiaopian/life3.jpg",
            "/jiaopian/life4.jpg"
          ].map((src, i) => (
            <FadeBlock key={i} delay={i * 0.15}>
              <div className={`bg-[#1a1a1a] overflow-hidden rounded-xl ${i === 1 ? 'md:mt-16' : ''}`}>
                <img src={src} alt="Photography" className="w-full h-auto block hover:scale-105 transition-transform duration-700" draggable={false} />
              </div>
            </FadeBlock>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  useEffect(() => {
    const initUnicorn = () => {
      if ((window as any).UnicornStudio) {
        (window as any).UnicornStudio.init();
      }
    };

    if (!(window as any).UnicornStudio) {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.9/dist/unicornStudio.umd.js";
      script.onload = initUnicorn;
      document.head.appendChild(script);
    } else {
      initUnicorn();
    }

    // Robustly hide the Unicorn Studio watermark (handles Shadow DOM)
    const hideWatermark = () => {
      const container = document.querySelector('[data-us-project]');
      if (container) {
        const shadowHosts = [container, ...Array.from(container.querySelectorAll('*'))];
        shadowHosts.forEach(host => {
          if (host.shadowRoot) {
            if (!host.shadowRoot.querySelector('#hide-us-badge')) {
              const style = document.createElement('style');
              style.id = 'hide-us-badge';
              style.innerHTML = 'a, .us-badge, [href*="unicorn.studio"] { display: none !important; opacity: 0 !important; pointer-events: none !important; visibility: hidden !important; }';
              host.shadowRoot.appendChild(style);
            }
          }
        });
      }
      // Fallback for global
      document.querySelectorAll('a[href*="unicorn.studio"]').forEach(el => {
        (el as HTMLElement).style.display = 'none';
        (el as HTMLElement).style.opacity = '0';
        (el as HTMLElement).style.pointerEvents = 'none';
      });
    };

    const interval = setInterval(hideWatermark, 500);
    const timeout = setTimeout(() => clearInterval(interval), 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section id="contact" className="py-32 px-6 md:px-12 lg:px-24 bg-[#111111] text-[#FFFFFF] flex flex-col items-center justify-center min-h-[60vh] text-center relative overflow-hidden">
      <div 
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        style={{ 
          maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)', 
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)' 
        }}
      >
        <div className="w-[125%] h-[125%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" data-us-project="e8JyeH6F6uruF6WuqUJI"></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center">
        <FadeBlock>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-16 leading-tight max-w-4xl mx-auto">
            如果您觉得我的经历与游戏科学的愿景契合，期待与您交流。
          </h2>
        </FadeBlock>

        <FadeBlock delay={0.2}>
          <div className="flex space-x-8">
            <div className="relative group cursor-pointer">
              <a href="mailto:terrance25pharm@163.com" className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#F37021] hover:border-[#F37021] hover:text-white transition-all">
                <Mail size={24} className="group-hover:scale-110 transition-transform" />
              </a>
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#F37021] text-white px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                terrance25pharm@163.com
              </div>
            </div>
            <div className="relative group cursor-pointer">
              <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#F37021] hover:border-[#F37021] hover:text-white transition-all">
                <MessageCircle size={24} className="group-hover:scale-110 transition-transform" />
              </div>
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#F37021] text-white px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Terrance-0704
              </div>
            </div>
            <a href="https://steamcommunity.com/profiles/76561199085157455/" target="_blank" rel="noreferrer" className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#F37021] hover:border-[#F37021] hover:text-white transition-all group">
              <Gamepad2 size={24} className="group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </FadeBlock>
      </div>

      <div className="absolute bottom-8 right-8 text-white font-mono text-sm md:text-base z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] font-medium tracking-wider">
        to be continued<span className="animate-blink">.</span>
      </div>
    </section>
  );
}
