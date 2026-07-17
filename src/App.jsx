import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiMail, FiGithub, FiMessageCircle } from "react-icons/fi";

/* ============================================================
   Images
   ============================================================ */

import avatarImg from "/avatar.jpg";
import tourismImg from "/project-tourism.png";
import internshipImg from "/internship.jpg";

/* ============================================================
   Data
   ============================================================ */

const NAV_ITEMS = [
  { label: "关于", href: "#about" },
  { label: "技能", href: "#skills" },
  { label: "项目", href: "#projects" },
  { label: "经历", href: "#experience" },
  { label: "联系", href: "#contact" },
];

const SKILL_CATEGORIES = [
  {
    title: "语言与框架",
    tags: [
      "Python",
      "JavaScript",
      "Flask",
      "FastAPI",
      "LangChain",
      "React",
      "Node.js",
    ],
  },
  {
    title: "数据处理",
    tags: [
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Regex",
      "数据清洗",
      "特征提取",
      "可视化分析",
    ],
  },
  {
    title: "AI 与 NLP",
    tags: [
      "RAG",
      "LLM",
      "OpenAI API",
      "ChatGLM",
      "GPT-4",
      "文本向量化",
      "Prompt 优化",
    ],
  },
  {
    title: "智能体与安全",
    tags: [
      "MCP 协议",
      "Skills 机制",
      "LangChain",
      "Dify",
      "Prompt Injection",
      "Agent 越权",
      "OWASP LLM Top 10",
    ],
  },
  {
    title: "数据库",
    tags: ["MySQL", "SQLite", "MongoDB", "PostgreSQL", "数据建模", "索引优化"],
  },
  {
    title: "部署与工具",
    tags: [
      "Linux",
      "Docker",
      "Git",
      "AutoGen",
      "Claude Code",
      "CentOS",
      "Ubuntu",
    ],
  },
];

const PROJECTS = [
  {
    period: "2024.12 — 2025.03",
    title: "暖核洞察",
    role: "AI 数据与模型开发负责人",
    desc: [
      "多源行业语料采集与清洗，Pandas/Regex 文本切分去噪，召回准确率提升约 30%",
      "基于 LangChain + FAISS 构建知识向量数据库，实现高效语义检索与问答召回",
      "LLM 语料构建与 Prompt 模板设计，优化问答结果一致性",
    ],
  },
  {
    period: "2024.03 — 2025.01",
    title: "智析舞码视界",
    role: "AI 算法与数据负责人",
    desc: [
      "主导动作评分核心算法研发，构建从姿态采集到模型评估的端到端 AI 评分管线",
      "基于 MediaPipe 捕捉 33 关键点姿态，改进 DTW + Hausdorff + KNN 优化时序相似度",
      "设计「物理—一致性—美学」三层十维度评分体系，LLM 生成自动化动作评语",
      "Flask + SQL 数据管线，评分与教练一致性达 87%，论文成果已投 SCI",
    ],
  },
  {
    period: "2024 — 2025",
    title: "书法知识问答 Bot",
    role: "Web 服务与数据接口",
    desc: [
      "论文《A Large Language Model-Powered Bot for Calligraphy Knowledge Q&A and Appreciation》",
      "已被 IEEE ICCTEI 2025 录用",
      "负责 Web 服务搭建与数据接口设计",
    ],
  },
  {
    period: "2025",
    title: "喂喂monster",
    role: "独立开发",
    desc: [
      "个人全栈项目，在线部署运行中",
    ],
    link: "https://six-flame.vercel.app",
  },
  {
    period: "2025",
    title: "知识客栈",
    role: "产品设计与开发",
    desc: [
      "AI 驱动的知识管理产品",
    ],
    link: "https://www.insight-inn.top/",
  },
];

const EDUCATION = [
  {
    title: "北京邮电大学",
    sub: "软件工程（全日制本科）",
    period: "2024.09 — 2026.06",
    desc: [
      "主修：人工智能原理、机器学习、数据挖掘、移动应用开发、软件工程理论、计算机视觉、算法与数据结构、操作系统、计算机网络",
    ],
  },
  {
    title: "北京邮电大学世纪学院",
    sub: "软件工程（全日制本科） · GPA 4.4/5 · 专业第 2 名",
    period: "2022.09 — 2026.06",
    desc: [
      "国家励志奖学金（Top 2%）· 连续三年校一等奖学金 · 优秀毕业设计论文（学院排名第一）",
    ],
  },
];

const WORK = [
  {
    title: "绿盟科技集团股份有限公司",
    sub: "实习研究员 · 能力中心 / 天元实验室 · 北京海淀",
    period: "2026.02 — 至今",
    desc: [
      "AISS 社区平台前端开发（React），负责案例管理员端组件设计与接口联调",
      "面向 AISS 社区撰写 AI 安全技术文章，涵盖攻击案例分析、前沿漏洞解读",
      "设计并实现基于 Python（Requests / BeautifulSoup / Playwright）的 AI 安全案例自动化采集脚本，减少人工采集时间 60%",
      "梳理 LLM 生态下智能体安全风险（Prompt Injection、MCP 组件攻击面），研读 OWASP LLM Top 10，参与内部红队技术框架建设",
      "参与 2026 大模型众测，完成模型与智能体基线测试，覆盖安全边界评估与异常行为记录",
    ],
    tech: "Python / JavaScript / React / PostgreSQL / Docker / Git / AutoGen / Claude Code",
    photo: internshipImg,
  },
  {
    title: "北京字节跳动科技有限公司",
    sub: "活动运营实习生 · 抖音校园 · 北京海淀",
    period: "2026.04 — 2026.05",
    desc: [
      "负责「抖音 AI 创变者计划 2026」黑客松联赛北京海淀站策划与落地，遴选 80 人组成 25 支队伍",
      "协调多所北京高校资源与投资者完成选手招募与筛选，对接场地、导师、志愿者及评委资源",
      "现场分享个人 AI 开发实践经验与工具使用心得，助力参赛选手快速上手 AI 编程工具",
    ],
  },
];

const HONORS = [
  { text: "全国大学生数学建模竞赛 北京赛区二等奖", highlight: true },
  { text: "国家励志奖学金（Top 2%）", highlight: true },
  { text: "IEEE ICCTEI 2025 论文录用", highlight: true },
  { text: "优秀毕业设计论文（学院排名第一）", highlight: true },
  { text: "第七届节能节水低碳减排竞赛 北京赛区二等奖", highlight: false },
  { text: "中国国际大学生创新大赛 北京赛区三等奖", highlight: false },
  { text: "全国大学生 C 语言程序设计大赛 三等奖", highlight: false },
  { text: "华北五省计算机应用大赛 三等奖", highlight: false },
  { text: "Intuition X S1 黑客松一等奖（最佳创意奖）", highlight: false },
  { text: "She Code Lab 黑客松 扣子特别奖", highlight: false },
  { text: "腾讯云安全零界赛场 优胜奖", highlight: false },
  { text: "连续三年校一等奖学金", highlight: false },
  { text: "CET-4 通过", highlight: false },
];

/* ============================================================
   Animation helpers
   ============================================================ */

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const stagger = (delay = 0.08) => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay } },
});

const fadeUpChild = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

/* ============================================================
   ScrollReveal
   ============================================================ */

function ScrollReveal({ children, className, once = true, amount = 0.15 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, amount });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================
   Section wrapper
   ============================================================ */

function Section({ id, label, title, children, alt = false }) {
  return (
    <section id={id} className={`section${alt ? " section-alt" : ""}`}>
      <div className="section-inner">
        <ScrollReveal>
          {label && <div className="section-label">{label}</div>}
          {title && <h2 className="section-title">{title}</h2>}
        </ScrollReveal>
        {children}
      </div>
    </section>
  );
}

/* ============================================================
   Navbar
   ============================================================ */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
      <div className="nav-inner">
        <a href="#" className="nav-logo">
          Lyra
        </a>
        <ul className="nav-links">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

/* ============================================================
   Hero
   ============================================================ */

function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-bg-orb" />
        <div className="hero-bg-orb" />
      </div>

      <motion.div
        className="hero-inner"
        initial="hidden"
        animate="visible"
        variants={stagger(0.15)}
      >
        <motion.img
          src={avatarImg}
          alt="李影"
          className="hero-avatar"
          variants={fadeUpChild}
        />

        <motion.p className="hero-greeting" variants={fadeUpChild}>
          ENFP 快乐小狗报道
        </motion.p>

        <motion.h1 className="hero-name" variants={fadeUpChild}>
          Lyra
        </motion.h1>

        <motion.p className="hero-name-sub" variants={fadeUpChild}>
          李影 · base 北京
        </motion.p>

        <motion.div className="hero-titles" variants={fadeUpChild}>
          <span className="hero-tag">AI 产品</span>
          <span className="hero-tag">AI 开发</span>
          <span className="hero-tag">双栖选手</span>
        </motion.div>

        <motion.p className="hero-slogan" variants={fadeUpChild}>
          网页开发 · 大模型应用 · Agent 开发 · AR 交互 + 计算机视觉 · 后端与数据工程
          <br />
          超爱 vibe coding，就喜欢用技术搞定实际场景，代码落地能力在线
        </motion.p>
      </motion.div>

      <motion.div
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <span>Scroll</span>
        <div className="hero-scroll-line" />
      </motion.div>
    </section>
  );
}

/* ============================================================
   About
   ============================================================ */

function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <Section id="about" label="关于我" title="一个简单的介绍">
      <motion.div
        ref={ref}
        className="about-grid"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div>
          <div className="about-text">
            <p>
              <strong>AI 产品 / 开发双栖选手</strong>，base 北京。
              技术栈覆盖网页开发、大模型应用开发、Agent 开发、AR 交互 + 计算机视觉、后端与数据工程。
              深度实践 LangChain + FAISS + RAG 构建知识检索系统，参与基于 MCP 协议的智能体系统设计与落地。
            </p>
            <br />
            <p>
              目前就职于绿盟科技天元实验室，参与 AISS
              社区研发与产品迭代，同时跟进 LLM
              安全前沿研究。IEEE 论文录用，具备工程落地与学术研究综合能力。
            </p>
            <br />
            <p>
              超爱 <strong>vibe coding</strong>，就喜欢用技术搞定实际场景。
              运营技术公众号「CPU 烤蛋挞」，维护开源项目，在
              <a href="https://linux.do/u/shadowking/summary" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)", textDecoration: "none" }}> Linux.do </a>
              社区活跃交流。还有很多要进步的！
            </p>
          </div>
        </div>
        <div>
          <img
            src={tourismImg}
            alt="AI 文旅设计作品"
            className="about-image"
          />
          <div className="about-image-caption">
            AI 文旅设计作品
          </div>
        </div>
      </motion.div>
    </Section>
  );
}

/* ============================================================
   Skills
   ============================================================ */

function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });

  return (
    <Section id="skills" label="专业技能" title="工具箱" alt>
      <motion.div
        ref={ref}
        className="skills-grid"
        variants={stagger(0.06)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {SKILL_CATEGORIES.map((cat) => (
          <motion.div
            key={cat.title}
            className="skill-card"
            variants={fadeUpChild}
          >
            <div className="skill-card-head">
              <span className="skill-card-line" />
              <span className="skill-card-title">{cat.title}</span>
            </div>
            <div className="skill-card-tags">
              {cat.tags.map((t) => (
                <span key={t} className="skill-tag">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

/* ============================================================
   Projects
   ============================================================ */

function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });

  return (
    <Section id="projects" label="项目作品" title="做过的东西">
      <motion.div
        ref={ref}
        className="projects-grid"
        variants={stagger(0.1)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {PROJECTS.map((p) => (
          <motion.div
            key={p.title}
            className="project-card"
            variants={fadeUpChild}
          >
            {p.image && (
              <div className="project-image-wrap">
                <img src={p.image} alt={p.title} className="project-image" />
              </div>
            )}
            <div className="project-card-period">{p.period}</div>
            <div className="project-card-title">{p.title}</div>
            <div className="project-card-role">{p.role}</div>
            <div className="project-card-desc">
              <ul>
                {p.desc.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
            {p.link && (
              <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid var(--border-light)" }}>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--accent)",
                    textDecoration: "none",
                    borderBottom: "1px solid var(--accent-light)",
                    paddingBottom: 2,
                  }}
                >
                  {p.link.replace("https://", "")} ↗
                </a>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

/* ============================================================
   Experience
   ============================================================ */

function Experience() {
  const eduRef = useRef(null);
  const eduInView = useInView(eduRef, { once: true, amount: 0.1 });
  const workRef = useRef(null);
  const workInView = useInView(workRef, { once: true, amount: 0.1 });

  return (
    <Section id="experience" label="经历" title="一路走来" alt>
      {/* Education */}
      <div className="timeline-section">
        <div className="timeline-heading">教育</div>
        <motion.div
          ref={eduRef}
          className="timeline-items"
          variants={stagger(0.12)}
          initial="hidden"
          animate={eduInView ? "visible" : "hidden"}
        >
          {EDUCATION.map((e) => (
            <motion.div
              key={e.title}
              className="timeline-item"
              variants={fadeUpChild}
            >
              <div className="timeline-item-header">
                <span className="timeline-item-title">{e.title}</span>
                <span className="timeline-item-period">{e.period}</span>
              </div>
              <div className="timeline-item-sub">{e.sub}</div>
              <div className="timeline-item-desc">
                <ul>
                  {e.desc.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Work */}
      <div className="timeline-section">
        <div className="timeline-heading">实习</div>
        <motion.div
          ref={workRef}
          className="timeline-items"
          variants={stagger(0.12)}
          initial="hidden"
          animate={workInView ? "visible" : "hidden"}
        >
          {WORK.map((w) => (
            <motion.div
              key={w.title}
              className="timeline-item"
              variants={fadeUpChild}
            >
              <div className="timeline-item-header">
                <span className="timeline-item-title">{w.title}</span>
                <span className="timeline-item-period">{w.period}</span>
              </div>
              <div className="timeline-item-sub">{w.sub}</div>
              <div className="timeline-item-desc">
                <ul>
                  {w.desc.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
              {w.tech && (
                <div
                  style={{
                    marginTop: 16,
                    fontSize: "0.78rem",
                    color: "var(--accent-dark)",
                    padding: "10px 0",
                    borderTop: "1px solid var(--border-light)",
                    lineHeight: 1.7,
                  }}
                >
                  {w.tech}
                </div>
              )}
              {w.photo && (
                <div className="timeline-photo">
                  <img src={w.photo} alt="实习工作照" />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

/* ============================================================
   Contact + Honors
   ============================================================ */

function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <Section id="contact" label="联系" title="找到我">
      <motion.div
        ref={ref}
        className="contact-grid"
        variants={stagger(0.1)}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Contact links */}
        <motion.div className="contact-info" variants={fadeUpChild}>
          <a href="mailto:15003334203@163.com" className="contact-item">
            <FiMail className="contact-item-icon" />
            15003334203@163.com
          </a>
          <a
            href="https://github.com/FlowingHeartEggTart"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-item"
          >
            <FiGithub className="contact-item-icon" />
            github.com/FlowingHeartEggTart
          </a>
          <a
            href="https://linux.do/u/shadowking/summary"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-item"
          >
            <FiMessageCircle className="contact-item-icon" />
            linux.do/u/shadowking
          </a>
        </motion.div>

        {/* Honors */}
        <motion.div variants={fadeUpChild}>
          <div className="honors-heading">荣誉奖项</div>
          <div className="honors-grid">
            {HONORS.map((h) => (
              <span
                key={h.text}
                className={`honor-tag${h.highlight ? " highlight" : ""}`}
              >
                {h.text}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}

/* ============================================================
   Footer
   ============================================================ */

function Footer() {
  return (
    <footer className="footer">
      <p>
        © 2026{" "}
        <a href="https://github.com/FlowingHeartEggTart">Lyra 李影</a> · Made
        with care
      </p>
    </footer>
  );
}

/* ============================================================
   App
   ============================================================ */

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
