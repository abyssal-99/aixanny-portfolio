import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, Maximize2, Volume2, VolumeX, X } from 'lucide-react';
import editorDefaults from './editorDefaults.js';

const works = [
  {
    id: 'main',
    number: '01',
    title: '红土穿越',
    englishTitle: 'Across the Red Earth',
    year: '2026',
    category: 'AI 短片 / 电影感视觉叙事',
    role: '导演 / 概念设定 / AI 影像工作流',
    duration: '02:42',
    src: '/media/red-earth.web.mp4',
    poster: '/assets/cover-main-showreel.jpg',
    color: '#B94237',
    logline: '它不懂爱，却把一首歌带到了海边。',
    overview:
      '在无人的澳大利亚红土荒原上，一个机械袋鼠头机器人带着一台旧留声机驶向海边。它不懂爱，却把一首歌带到了海边。',
    process:
      '项目以“旧留声机、红土荒原、机械身体、海边告别”为核心意象，建立从荒原到海岸的镜头秩序。画面采用公路片式推进，让一个非人的角色承载人类留下的记忆。',
    outcome:
      '这不是一次旅行，而是一场迟来的告别。它也许不懂爱，却仍记得把杯子往里推。最终作品呈现为一支克制、缓慢、带有余温的 AI 叙事短片。',
  },
  {
    id: 'wukong',
    number: '02',
    title: '既见未来，为何不拜',
    englishTitle: 'Since You Have Seen the Future, Why Not Bow?',
    year: '2026',
    category: 'AI 动画 / 东方神话实验',
    role: '概念设定 / 动态影像 / 美术指导',
    duration: '00:38',
    src: '/media/future-bow.web.mp4',
    poster: '/assets/cover-wukong.jpg',
    color: '#8F5541',
    logline: '万象皆虚，唯有眼前的因果不灭。',
    overview:
      '万象皆虚，唯有眼前的因果不灭。当凡躯瞥见未来的那一瞬，是该跪地俯首，还是挥棒破障？',
    process:
      '作品从死寂佛窟的禅意开始，逐步推向裂变的神魔对战。金瞳、暗场、斗笠、预言式字幕共同构成压迫感，把东方神话转译为一场关于宿命与反抗的视听实验。',
    outcome:
      '金瞳之下，再无神佛。“既见未来，为何不拜？”不只是台词，也是作品的精神核心：看见未来之后，仍然选择破障。',
  },
  {
    id: 'drone',
    number: '03',
    title: '灵感无界',
    englishTitle: 'Inspiration Without Boundaries',
    year: '2026',
    category: '航拍影像 / 运动视觉实验',
    role: '视觉指导 / 节奏控制 / 剪辑实验',
    duration: '00:39',
    src: '/media/inspiration.web.mp4',
    poster: '/assets/cover-drone.jpg',
    color: '#6C7A45',
    logline: '从此，灵感不再有边界。',
    overview:
      '镜头掠过田野、水渠与地平线，速度把现实拉成一条流动的轨迹。它不是单纯的风景记录，而是一段关于视野被打开的运动影像。',
    process:
      '作品以航拍视角建立空间尺度，通过倾斜地平线、快速推进、运动模糊和字幕节奏，让观众感到灵感从地面脱离，进入更开阔的感知区域。',
    outcome:
      '作为作品集中更明亮、更具呼吸感的一章，它把“灵感无界”转化成空间速度和身体感，让黑色电影叙事之外出现一处开放出口。',
  },
  {
    id: 'wind',
    number: '04',
    title: '只是想再听一次你的声音',
    englishTitle: 'To Hear Your Voice Once More',
    year: '2026',
    category: 'AI 影像 / 情绪氛围叙事',
    role: '场景设计 / AIGC 影像 / 情绪叙事',
    duration: '00:52',
    src: '/media/voice.web.mp4',
    poster: '/assets/cover-wind-voice.jpg',
    color: '#4C6C70',
    logline: '那天的雨，至今还湿着心口。',
    overview:
      '一座低温的街区，一场迟迟没有停下的雨，以及远处像记忆一样压来的巨浪。作品讲的不是灾难，而是某个再也无法抵达的声音。',
    process:
      '画面以电线、街道、雨幕和远处巨型水体建立压迫感。冷色调、低饱和画面与中日双语字幕共同构成一种“想再听一次”的回声。',
    outcome:
      '最终形成一段安静但有重量的氛围短片。人物没有被过度解释，环境本身替人物说话，雨声和远处的浪成为情绪的主体。',
  },
];

const chapters = [
  { time: 0, label: '00:00 开场' },
  { time: 45, label: '00:45 信号' },
  { time: 85, label: '01:25 穿越' },
  { time: 136, label: '02:16 尾帧' },
];

const profileRows = [
  ['姓名', '孙泽豪 / Tom Sun'],
  ['方向', '视觉设计 · AI 动画 · 品牌设计'],
  ['地点', '青岛 / 湖南'],
  ['合作', '开放精选项目合作'],
  ['联系', 'qdszh@outlook.com'],
];

function buildProjectCopyFixes() {
  const fixes = {};

  works.forEach((work, index) => {
    const nextWork = works[(index + 1) % works.length];
    const detailSections = [
      ['项目概述', work.overview],
      ['我的角色', work.role],
      ['创作过程', work.process],
      ['最终呈现', work.outcome],
    ];

    Object.assign(fixes, {
      [`video-${work.id}-number`]: work.number,
      [`video-${work.id}-title`]: work.title,
      [`video-${work.id}-meta`]: `${work.year} / ${work.category} / ${work.duration}`,
      [`video-${work.id}-desc-v3`]: work.overview,
      [`selector-${work.id}-number`]: work.number,
      [`selector-${work.id}-title`]: work.title,
      [`work-${work.id}-number`]: work.number,
      [`work-${work.id}-meta`]: `${work.year} / ${work.category}`,
      [`work-${work.id}-title`]: work.title,
      [`work-${work.id}-logline`]: work.logline,
      [`work-${work.id}-view`]: '查看项目',
      [`detail-${work.id}-meta`]: `${work.number} / ${work.year}`,
      [`detail-${work.id}-title`]: work.title,
      [`detail-${work.id}-role`]: work.role,
      [`detail-${work.id}-next-label`]: '下一个项目',
      [`detail-${work.id}-next-title`]: nextWork.title,
    });

    detailSections.forEach(([label, value]) => {
      fixes[`detail-${work.id}-${label}-label`] = label;
      fixes[`detail-${work.id}-${label}-text`] = value;
    });
  });

  return fixes;
}

function useProjectCopyCleanup() {
  useEffect(() => {
    const versionKey = 'tom-portfolio-copy-cleanup:project-info-v3';
    const copyPrefix = 'tom-portfolio-copy:';

    try {
      if (window.localStorage.getItem(versionKey)) return;

      const fixes = buildProjectCopyFixes();
      Object.entries(fixes).forEach(([key, value]) => {
        window.localStorage.setItem(`${copyPrefix}${key}`, value);
      });
      window.localStorage.setItem(versionKey, 'done');
    } catch {
      // If storage is unavailable, project defaults in code still remain clean.
    }
  }, []);
}

function usePointer() {
  const [pointer, setPointer] = useState({ x: 0, y: 0, label: '', pressed: false });

  useEffect(() => {
    const handlePointer = (event) => {
      setPointer((current) => ({
        ...current,
        x: event.clientX,
        y: event.clientY,
      }));
    };
    const handleDown = () => setPointer((current) => ({ ...current, pressed: true }));
    const handleUp = () => setPointer((current) => ({ ...current, pressed: false }));

    window.addEventListener('pointermove', handlePointer);
    window.addEventListener('pointerdown', handleDown);
    window.addEventListener('pointerup', handleUp);
    return () => {
      window.removeEventListener('pointermove', handlePointer);
      window.removeEventListener('pointerdown', handleDown);
      window.removeEventListener('pointerup', handleUp);
    };
  }, []);

  return [pointer, setPointer];
}

function useRevealOnScroll() {
  useEffect(() => {
    const nodes = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.14 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function useSectionProgress(sectionRef) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const max = rect.height - window.innerHeight;
      const next = max <= 0 ? 0 : Math.min(1, Math.max(0, -rect.top / max));
      setProgress(next);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [sectionRef]);

  return progress;
}

function useSmoothedValue(value) {
  const [smoothValue, setSmoothValue] = useState(value);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setSmoothValue(value);
      return undefined;
    }

    let frame = 0;
    const tick = () => {
      setSmoothValue((current) => {
        const next = current + (value - current) * 0.2;
        if (Math.abs(next - value) < 0.001) return value;
        frame = window.requestAnimationFrame(tick);
        return next;
      });
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [value]);

  return smoothValue;
}

function EditableText({ as: Tag = 'span', storageKey, children, editMode, className = '', ...props }) {
  const fallback = editorDefaults.copy[storageKey] || String(children ?? '');
  const textRef = useRef(null);
  const dragRef = useRef(null);
  const readText = () => {
    try {
      return window.localStorage.getItem(`tom-portfolio-copy:${storageKey}`) || fallback;
    } catch {
      return fallback;
    }
  };
  const readStyle = () => {
    try {
      const saved = window.localStorage.getItem(`tom-portfolio-style:${storageKey}`);
      return saved ? JSON.parse(saved) : editorDefaults.style?.[storageKey] || { x: 0, y: 0, size: null };
    } catch {
      return editorDefaults.style?.[storageKey] || { x: 0, y: 0, size: null };
    }
  };
  const [text, setText] = useState(() => {
    return readText();
  });
  const [styleState, setStyleState] = useState(() => {
    return readStyle();
  });

  useEffect(() => {
    setText(readText());
    setStyleState(readStyle());
  }, [storageKey, fallback]);

  const blockTags = ['p', 'h1', 'h2', 'h3', 'h4', 'div', 'section', 'figcaption'];
  const Wrapper = blockTags.includes(String(Tag)) ? 'div' : 'span';

  const saveStyle = (next) => {
    setStyleState(next);
    try {
      window.localStorage.setItem(`tom-portfolio-style:${storageKey}`, JSON.stringify(next));
    } catch {
      // Layout edits remain visible for the current session.
    }
  };

  const currentSize = () => {
    if (styleState.size) return styleState.size;
    const node = textRef.current;
    if (!node) return 16;
    return Math.round(parseFloat(window.getComputedStyle(node).fontSize) || 16);
  };

  const changeSize = (delta) => {
    const next = {
      ...styleState,
      size: Math.min(180, Math.max(10, currentSize() + delta)),
    };
    saveStyle(next);
  };

  const resetStyle = () => {
    saveStyle({ x: 0, y: 0, size: null });
  };

  const beginDrag = (event) => {
    event.preventDefault();
    event.stopPropagation();
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: styleState.x || 0,
      originY: styleState.y || 0,
    };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const moveDrag = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    saveStyle({
      ...styleState,
      x: Math.round(drag.originX + event.clientX - drag.startX),
      y: Math.round(drag.originY + event.clientY - drag.startY),
    });
  };

  const endDrag = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    dragRef.current = null;
  };

  const commit = (event) => {
    const next = event.currentTarget.innerText.trim() || fallback;
    setText(next);
    try {
      window.localStorage.setItem(`tom-portfolio-copy:${storageKey}`, next);
    } catch {
      // Editing remains available for the current session.
    }
  };

  return (
    <Wrapper
      className={`editable-box ${editMode ? 'editable-box-active' : ''}`.trim()}
      style={{
        transform: `translate3d(${styleState.x || 0}px, ${styleState.y || 0}px, 0)`,
      }}
    >
      <Tag
        className={`${className} editable-text ${editMode ? 'editable-active' : ''}`.trim()}
        contentEditable={editMode}
        onBlur={commit}
        onClick={(event) => {
          if (editMode) event.stopPropagation();
          props.onClick?.(event);
        }}
        ref={textRef}
        style={styleState.size ? { fontSize: `${styleState.size}px` } : undefined}
        suppressContentEditableWarning
        {...props}
      >
        {text}
      </Tag>
      {editMode ? (
        <span className="edit-tools" contentEditable={false} onClick={(event) => event.stopPropagation()} onMouseDown={(event) => event.stopPropagation()}>
          <span
            aria-label="Drag text"
            className="edit-drag"
            role="button"
            tabIndex={0}
            onPointerDown={beginDrag}
            onPointerMove={moveDrag}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            Drag
          </span>
          <span role="button" tabIndex={0} onMouseDown={(event) => event.preventDefault()} onClick={() => changeSize(-2)}>
            A-
          </span>
          <span role="button" tabIndex={0} onMouseDown={(event) => event.preventDefault()} onClick={() => changeSize(2)}>
            A+
          </span>
          <span role="button" tabIndex={0} onMouseDown={(event) => event.preventDefault()} onClick={resetStyle}>
            R
          </span>
        </span>
      ) : null}
    </Wrapper>
  );
}

function EditableHeroTitle({ editMode }) {
  const dragRef = useRef(null);
  const [layout, setLayout] = useState(() => {
    try {
      const saved = window.localStorage.getItem('tom-portfolio-style:hero-title-layout');
      return saved ? JSON.parse(saved) : editorDefaults.style?.['hero-title-layout'] || { x: 0, y: 0, size: null };
    } catch {
      return editorDefaults.style?.['hero-title-layout'] || { x: 0, y: 0, size: null };
    }
  });

  const saveLayout = (next) => {
    setLayout(next);
    try {
      window.localStorage.setItem('tom-portfolio-style:hero-title-layout', JSON.stringify(next));
    } catch {
      // Layout edits remain visible for the current session.
    }
  };

  const currentSize = () => layout.size || 96;

  const changeSize = (delta) => {
    saveLayout({
      ...layout,
      size: Math.min(180, Math.max(38, currentSize() + delta)),
    });
  };

  const resetLayout = () => {
    saveLayout({ x: 0, y: 0, size: null });
  };

  const beginDrag = (event) => {
    event.preventDefault();
    event.stopPropagation();
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: layout.x || 0,
      originY: layout.y || 0,
    };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const moveDrag = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    saveLayout({
      ...layout,
      x: Math.round(drag.originX + event.clientX - drag.startX),
      y: Math.round(drag.originY + event.clientY - drag.startY),
    });
  };

  const endDrag = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    dragRef.current = null;
  };

  return (
    <div
      className={`hero-title-frame ${editMode ? 'hero-title-frame-editing' : ''}`}
      style={{
        transform: `translate3d(${layout.x || 0}px, ${layout.y || 0}px, 0)`,
      }}
    >
      <h1 style={layout.size ? { fontSize: `${layout.size}px` } : undefined}>
        <EditableText storageKey="hero-title-line-1" editMode={editMode} className="hero-title-line">
          视觉叙事
        </EditableText>
        <EditableText storageKey="hero-title-line-2" editMode={editMode} className="hero-title-line">
          与 AI 影像
        </EditableText>
        <EditableText storageKey="hero-title-line-3" editMode={editMode} className="hero-title-line">
          实验档案
        </EditableText>
      </h1>
      {editMode ? (
        <span className="edit-tools hero-title-tools" contentEditable={false} onClick={(event) => event.stopPropagation()} onMouseDown={(event) => event.stopPropagation()}>
          <span
            aria-label="Drag main title"
            className="edit-drag"
            role="button"
            tabIndex={0}
            onPointerDown={beginDrag}
            onPointerMove={moveDrag}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            Title Drag
          </span>
          <span role="button" tabIndex={0} onMouseDown={(event) => event.preventDefault()} onClick={() => changeSize(-4)}>
            A-
          </span>
          <span role="button" tabIndex={0} onMouseDown={(event) => event.preventDefault()} onClick={() => changeSize(4)}>
            A+
          </span>
          <span role="button" tabIndex={0} onMouseDown={(event) => event.preventDefault()} onClick={resetLayout}>
            R
          </span>
        </span>
      ) : null}
    </div>
  );
}

function Header({ activeSection, editMode, setEditMode, canEdit }) {
  const navItems = [
    ['首页', 'home'],
    ['影像', 'showreel'],
    ['作品', 'works'],
    ['档案', 'about'],
    ['联系', 'contact'],
  ];

  return (
    <header className="site-header">
      <a className="wordmark" href="#home" aria-label="Back to home" onClick={(event) => editMode && event.preventDefault()}>
        <EditableText storageKey="nav-logo" editMode={editMode}>TS</EditableText>
        <EditableText storageKey="nav-brand" editMode={editMode}>孙泽豪作品档案</EditableText>
      </a>
      <nav className="top-links" aria-label="Primary navigation">
        {navItems.map(([label, href]) => (
          <a href={`#${href}`} key={href} onClick={(event) => editMode && event.preventDefault()}>
            <EditableText storageKey={`nav-${href}`} editMode={editMode}>{label}</EditableText>
          </a>
        ))}
      </nav>
      <div className="header-status">
        <span>{activeSection}</span>
        {canEdit ? (
          <button className="edit-toggle" onClick={() => setEditMode((value) => !value)} type="button">
            {editMode ? '退出编辑' : '编辑'}
          </button>
        ) : null}
      </div>
    </header>
  );
}

function Hero({ editMode, setCursor }) {
  return (
    <section className="hero-section panel-section" id="home">
      <div className="intro-loader" aria-hidden="true">
        <EditableText storageKey="loader-cn" editMode={editMode}>孙泽豪作品档案 / 2026</EditableText>
        <EditableText storageKey="loader-en" editMode={editMode}>VISUAL STORYTELLING</EditableText>
      </div>

      <div className="hero-meta">
        <EditableText storageKey="hero-meta-name" editMode={editMode}>孙泽豪 / Tom Sun</EditableText>
        <EditableText storageKey="hero-meta-role" editMode={editMode}>视觉传达 · AI 影像</EditableText>
        <EditableText storageKey="hero-meta-place" editMode={editMode}>中国 / 2026</EditableText>
      </div>

      <div className="hero-copy" data-reveal>
        <EditableText as="p" storageKey="hero-eyebrow-v3" editMode={editMode} className="eyebrow">
          孙泽豪视觉作品集 / Portfolio Archive
        </EditableText>
        <EditableHeroTitle editMode={editMode} />
        <EditableText as="p" storageKey="hero-desc-v3" editMode={editMode} className="hero-statement">
          这里收录视觉设计、AI 动画与电影感影像实验。网页不是包装，作品本身才是叙事现场。
        </EditableText>
      </div>

      <a
        className="hero-visual"
        href="#showreel"
        onClick={(event) => editMode && event.preventDefault()}
        onMouseEnter={() => setCursor('PLAY')}
        onMouseLeave={() => setCursor('')}
      >
        <img src="/assets/cover-main-showreel.jpg" alt="红土穿越 Across the Red Earth 封面" />
        <EditableText storageKey="hero-visual-label" editMode={editMode}>观看主片</EditableText>
      </a>

      <a className="enter-archive" href="#showreel" onClick={(event) => editMode && event.preventDefault()}>
        <EditableText storageKey="hero-enter-label" editMode={editMode}>进入作品档案</EditableText>
        <ArrowUpRight size={18} />
      </a>
    </section>
  );
}

function Showreel({ editMode, setCursor }) {
  const [activeId, setActiveId] = useState(works[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);
  const activeWork = useMemo(() => works.find((work) => work.id === activeId) || works[0], [activeId]);

  useEffect(() => {
    setIsPlaying(false);
    setProgress(0);
  }, [activeId]);

  const togglePlay = async () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      await videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const seekTo = (time) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = time;
    videoRef.current.play();
    setIsPlaying(true);
  };

  const requestFullScreen = () => {
    const node = videoRef.current;
    if (node?.requestFullscreen) node.requestFullscreen();
  };

  return (
    <section className="showreel-section panel-section" id="showreel">
      <div className="section-kicker" data-reveal>
        <EditableText storageKey="showreel-kicker-title" editMode={editMode}>影像主展厅</EditableText>
        <EditableText storageKey="showreel-kicker-count" editMode={editMode}>作品 01 / 04</EditableText>
      </div>

      <div
        className="cinema-shell"
        data-reveal
        onMouseEnter={() => setCursor('播放')}
        onMouseLeave={() => setCursor('')}
      >
        <video
          key={activeWork.id}
          className="cinema-video"
          muted={muted}
          onClick={togglePlay}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          onTimeUpdate={(event) => {
            const video = event.currentTarget;
            setProgress(video.duration ? video.currentTime / video.duration : 0);
          }}
          playsInline
          poster={activeWork.poster}
          preload="metadata"
          ref={videoRef}
        >
          <source src={activeWork.src} type="video/mp4" />
        </video>

        <div className="film-grain" aria-hidden="true" />
        <div className="cinema-info">
          <EditableText storageKey={`video-${activeWork.id}-number`} editMode={editMode}>{activeWork.number}</EditableText>
          <EditableText as="h2" storageKey={`video-${activeWork.id}-title`} editMode={editMode}>{activeWork.title}</EditableText>
          <EditableText as="p" storageKey={`video-${activeWork.id}-meta`} editMode={editMode}>
            {activeWork.year} / {activeWork.category} / {activeWork.duration}
          </EditableText>
        </div>

        <div className="cinema-controls">
          <button className="text-play" onClick={togglePlay} type="button">
            <EditableText storageKey={isPlaying ? 'video-control-pause' : 'video-control-play'} editMode={editMode}>
              {isPlaying ? '暂停' : '播放影片'}
            </EditableText>
            <span>→</span>
          </button>
          <button onClick={() => setMuted((value) => !value)} type="button" aria-label="Toggle mute">
            {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
          </button>
          <button onClick={requestFullScreen} type="button" aria-label="Full screen">
            <Maximize2 size={17} />
          </button>
          <div className="progress-track" aria-label="Video progress">
            <span style={{ width: `${progress * 100}%` }} />
          </div>
        </div>
      </div>

      <div className="chapter-row" aria-label="Film chapters" data-reveal>
        {chapters.map((chapter) => (
          <button key={chapter.label} onClick={() => seekTo(chapter.time)} type="button">
            <EditableText storageKey={`chapter-${chapter.time}`} editMode={editMode}>{chapter.label}</EditableText>
          </button>
        ))}
      </div>

      <div className="film-selector" aria-label="Select film" data-reveal>
        {works.map((work) => (
          <button
            className={work.id === activeId ? 'active' : ''}
            key={work.id}
            onClick={() => setActiveId(work.id)}
            type="button"
          >
            <img src={work.poster} alt={`${work.title} cover`} loading="lazy" />
            <EditableText storageKey={`selector-${work.id}-number`} editMode={editMode}>{work.number}</EditableText>
            <EditableText as="strong" storageKey={`selector-${work.id}-title`} editMode={editMode}>{work.title}</EditableText>
          </button>
        ))}
      </div>

      <EditableText as="p" storageKey={`video-${activeWork.id}-desc-v3`} editMode={editMode} className="showreel-note" data-reveal>
        {activeWork.overview}
      </EditableText>
    </section>
  );
}

function WorksRail({ openProject, setCursor, editMode }) {
  const sectionRef = useRef(null);
  const progress = useSectionProgress(sectionRef);
  const smoothProgress = useSmoothedValue(progress);
  const translate = smoothProgress * -((works.length - 1) * 72);
  const railIndex = smoothProgress * (works.length - 1);

  return (
    <section className="works-section" id="works" ref={sectionRef} style={{ '--rail-progress': smoothProgress }}>
      <div className="works-sticky">
        <div className="section-kicker" data-reveal>
          <EditableText storageKey="works-kicker-title" editMode={editMode}>精选作品</EditableText>
          <span>{String(Math.round(progress * 100)).padStart(2, '0')}%</span>
        </div>
        <div className="works-track" style={{ transform: `translate3d(${translate}vw, 0, 0)` }}>
          {works.map((work, index) => {
            const focus = Math.max(0, 1 - Math.abs(index - railIndex) * 0.55);
            return (
              <article
                className={`work-panel ${focus > 0.56 ? 'work-panel-focus' : ''}`}
                data-reveal
                key={work.id}
                onMouseEnter={() => setCursor('查看')}
                onMouseLeave={() => setCursor('')}
                style={{ '--accent': work.color, '--focus': focus, '--panel-index': index }}
              >
                <button
                  onClick={() => {
                    if (!editMode) openProject(work);
                  }}
                  type="button"
                  style={{ viewTransitionName: `project-${work.id}` }}
                >
                  <img src={work.poster} alt={`${work.title} poster`} loading="lazy" />
                  <span className="kinetic-line" aria-hidden="true" />
                  <EditableText storageKey={`work-${work.id}-number`} editMode={editMode} className="panel-number">{work.number}</EditableText>
                  <div className="panel-caption">
                    <EditableText as="p" storageKey={`work-${work.id}-meta`} editMode={editMode}>
                      {work.year} / {work.category}
                    </EditableText>
                    <EditableText as="h3" storageKey={`work-${work.id}-title`} editMode={editMode}>{work.title}</EditableText>
                    <EditableText as="small" storageKey={`work-${work.id}-logline`} editMode={editMode}>{work.logline}</EditableText>
                  </div>
                  <EditableText storageKey={`work-${work.id}-view`} editMode={editMode} className="view-label">查看项目</EditableText>
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectDetail({ project, close, nextProject, editMode }) {
  if (!project) return null;

  return (
    <div className="project-overlay" role="dialog" aria-modal="true" aria-label={`${project.title} details`}>
      <button className="close-detail" onClick={close} type="button" aria-label="关闭项目">
        <X size={22} />
      </button>
      <div className="detail-hero">
        <img
          src={project.poster}
          alt={`${project.title} project cover`}
          style={{ viewTransitionName: `project-${project.id}` }}
        />
        <div>
          <EditableText storageKey={`detail-${project.id}-meta`} editMode={editMode}>{project.number} / {project.year}</EditableText>
          <EditableText as="h2" storageKey={`detail-${project.id}-title`} editMode={editMode}>{project.title}</EditableText>
          <EditableText as="p" storageKey={`detail-${project.id}-role`} editMode={editMode}>{project.role}</EditableText>
        </div>
      </div>
      <div className="detail-grid">
        {[
          ['项目概述', project.overview],
          ['我的角色', project.role],
          ['创作过程', project.process],
          ['最终呈现', project.outcome],
        ].map(([label, value]) => (
          <section key={label}>
            <EditableText as="h3" storageKey={`detail-${project.id}-${label}-label`} editMode={editMode}>{label}</EditableText>
            <EditableText as="p" storageKey={`detail-${project.id}-${label}-text`} editMode={editMode}>{value}</EditableText>
          </section>
        ))}
      </div>
      <button
        className="next-project"
        onPointerDownCapture={(event) => {
          event.preventDefault();
          event.stopPropagation();
          nextProject(project);
        }}
        type="button"
      >
        <EditableText storageKey={`detail-${project.id}-next-label`} editMode={editMode}>下一个项目</EditableText>
        <EditableText storageKey={`detail-${project.id}-next-title`} editMode={editMode}>
          {works[(works.findIndex((work) => work.id === project.id) + 1) % works.length].title}
        </EditableText>
      </button>
    </div>
  );
}

function About({ editMode }) {
  return (
    <section className="about-section panel-section" id="about">
      <div className="about-manifesto" data-reveal>
        <EditableText storageKey="about-kicker" editMode={editMode}>个人档案</EditableText>
        <EditableText as="h2" storageKey="intro-title-v3" editMode={editMode}>
          一个多元创作者
        </EditableText>
        <EditableText as="p" storageKey="intro-desc-a-v3" editMode={editMode}>
          孙泽豪，2005年11月生于山东青岛，湖南农业大学视觉传达本科在读。2025年5月加入字节跳动&湖南大学校企合作智能美学项目组，个人总计完成1,000+人工智能图像及视频的质检标注工作。中央美术学院美术学专业校考合格、湖南省大学生公益广告大赛平面设计类全省一等奖、新片场认证创作人、Uidea首届AI创作大赛入围。
        </EditableText>
      </div>
      <figure className="profile-image" data-reveal>
        <img src="/assets/tom-portrait-full.jpg" alt="Tom Sun portrait" loading="lazy" />
        <EditableText as="figcaption" storageKey="about-portrait-caption" editMode={editMode}>Tom Sun / Zehao Sun</EditableText>
      </figure>
      <div className="profile-table" data-reveal>
        {profileRows.map(([label, value]) => (
          <div key={label}>
            <EditableText storageKey={`profile-${label}-label`} editMode={editMode}>{label}</EditableText>
            <EditableText as="strong" storageKey={`profile-${label}-value`} editMode={editMode}>{value}</EditableText>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact({ editMode }) {
  return (
    <section className="contact-section panel-section" id="contact">
      <EditableText storageKey="contact-kicker" editMode={editMode}>Contact / 2026</EditableText>
      <EditableText as="h2" storageKey="contact-title" editMode={editMode}>让下一段影像，从一次对话开始。</EditableText>
      <a href="mailto:qdszh@outlook.com" onClick={(event) => editMode && event.preventDefault()}>
        <EditableText storageKey="contact-email" editMode={editMode}>qdszh@outlook.com</EditableText>
        <ArrowUpRight size={24} />
      </a>
    </section>
  );
}

function ArchiveDivider({ index, title, text, editMode }) {
  return (
    <section className="archive-divider" aria-label={title} data-reveal>
      <EditableText storageKey={`divider-${index}-index`} editMode={editMode}>{index}</EditableText>
      <EditableText as="h2" storageKey={`divider-${index}-title`} editMode={editMode}>{title}</EditableText>
      <EditableText as="p" storageKey={`divider-${index}-text`} editMode={editMode}>{text}</EditableText>
    </section>
  );
}

export default function App() {
  const [pointer, setPointer] = usePointer();
  const [activeSection, setActiveSection] = useState('首页');
  const [selectedProject, setSelectedProject] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const canEdit = false;

  useProjectCopyCleanup();
  useRevealOnScroll();

  useEffect(() => {
    const sections = ['home', 'showreel', 'works', 'about', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        const active = entries.find((entry) => entry.isIntersecting);
        if (active) {
          const labels = {
            home: '首页',
            showreel: '影像',
            works: '作品',
            about: '档案',
            contact: '联系',
          };
          setActiveSection(labels[active.target.id] || '首页');
        }
      },
      { threshold: 0.35 },
    );

    sections.forEach((id) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!selectedProject) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setSelectedProject(null);
      }
    };

    const closeOnHashChange = () => setSelectedProject(null);

    window.addEventListener('keydown', closeOnEscape);
    window.addEventListener('hashchange', closeOnHashChange);
    return () => {
      window.removeEventListener('keydown', closeOnEscape);
      window.removeEventListener('hashchange', closeOnHashChange);
    };
  }, [selectedProject]);

  const runViewTransition = (action) => {
    if (!document.startViewTransition) {
      action();
      return;
    }

    try {
      const transition = document.startViewTransition(action);
      transition.ready?.catch(() => {});
      transition.finished?.catch(() => {});
    } catch {
      action();
    }
  };

  const openProject = (project) => {
    runViewTransition(() => setSelectedProject(project));
  };

  const closeProject = () => {
    runViewTransition(() => setSelectedProject(null));
  };

  const nextProject = (project) => {
    const index = works.findIndex((work) => work.id === project.id);
    const next = works[(index + 1) % works.length];
    setSelectedProject(next);
  };

  return (
    <>
      <div
        className={`cursor ${pointer.label ? 'cursor-labeled' : ''} ${pointer.pressed ? 'cursor-pressed' : ''}`}
        style={{ transform: `translate3d(${pointer.x}px, ${pointer.y}px, 0)` }}
      >
        <span>{pointer.label}</span>
      </div>
      <Header activeSection={activeSection} editMode={editMode} setEditMode={setEditMode} canEdit={canEdit} />
      <main>
        <Hero editMode={editMode} setCursor={(label) => setPointer((value) => ({ ...value, label: label === 'PLAY' ? '播放' : label }))} />
        <ArchiveDivider editMode={editMode} index="01" title="先看影像，再进入档案" text="四支短片构成网站的主叙事：红土、神话、航拍与雨声。每个作品都是一个独立章节。" />
        <Showreel editMode={editMode} setCursor={(label) => setPointer((value) => ({ ...value, label }))} />
        <ArchiveDivider editMode={editMode} index="02" title="作品不是列表，是一条时间轨" text="向下滚动时，作品会像胶片一样横向推进。点击任意作品进入完整项目档案。" />
        <WorksRail editMode={editMode} openProject={openProject} setCursor={(label) => setPointer((value) => ({ ...value, label }))} />
        <ArchiveDivider editMode={editMode} index="03" title="作者档案" text="把简历信息收束成策展标签，保留真实经历，也保留创作者的气质。" />
        <About editMode={editMode} />
        <Contact editMode={editMode} />
      </main>
      <ProjectDetail project={selectedProject} close={closeProject} editMode={editMode} nextProject={nextProject} />
    </>
  );
}
