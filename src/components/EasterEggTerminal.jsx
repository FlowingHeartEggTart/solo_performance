import { useState, useRef, useEffect, useCallback } from 'react';

const COMMANDS = {
  help: {
    desc: '显示可用命令',
    run: () => [
      '可用命令:',
      '  help      — 显示此帮助',
      '  whoami    — 关于我',
      '  ls        — 列出技能',
      '  clear     — 清屏',
      '  neofetch  — 系统信息',
      '  exit      — 关闭终端',
    ],
  },
  whoami: {
    desc: '关于我',
    run: () => [
      'Name:  李影 / Lyra',
      'Role:  AI 应用工程师 & 安全研究员',
      'Org:   绿盟科技 · 天元实验室',
      'Edu:   北京邮电大学 · 软件工程',
      'Blog:  公众号「CPU 烤蛋挞」',
    ],
  },
  ls: {
    desc: '列出技能',
    run: () => [
      'skills/',
      '  ai/        LLM · RAG · LangChain · Agent',
      '  lang/      Python · JavaScript · Flask · React',
      '  security/  Prompt Injection · OWASP LLM Top 10',
      '  infra/     Linux · Docker · Git · PostgreSQL',
    ],
  },
  neofetch: {
    desc: '系统信息',
    run: () => [
      '        ████████        OS:   Human v26.0',
      '      ██        ██      Host: Earth · Beijing',
      '    ██    ████    ██    Uptime: coding since 2022',
      '  ██    ██    ██    ██  Shell: vibe coding',
      '  ██  ██  ██  ██  ██  Editor: Claude Code',
      '  ██    ██    ██    ██  Lang: zh-CN / en-US',
      '    ██    ████    ██    Motto: 超爱 vibe coding',
      '      ██        ██      ',
      '        ████████        ',
    ],
  },
  clear: { desc: '清屏', run: () => '__CLEAR__' },
  exit: { desc: '关闭终端', run: () => '__EXIT__' },
};

const MOTD = [
  '欢迎来到 Lyra 的秘密终端 🖥️',
  '输入 help 查看可用命令',
  '',
];

export default function EasterEggTerminal({ onClose }) {
  const [lines, setLines] = useState(() => [...MOTD]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const addLines = useCallback((newLines) => {
    setLines((prev) => [...prev, ...newLines]);
  }, []);

  const execute = useCallback(
    (cmd) => {
      const trimmed = cmd.trim();
      if (!trimmed) {
        addLines(['guest@lyra:~$ ']);
        return;
      }

      addLines([`guest@lyra:~$ ${trimmed}`]);

      const handler = COMMANDS[trimmed.toLowerCase()];
      if (!handler) {
        addLines([`zsh: command not found: ${trimmed}`, '输入 help 查看可用命令']);
        return;
      }

      const result = handler.run();
      if (result === '__CLEAR__') {
        setLines([]);
      } else if (result === '__EXIT__') {
        onClose();
      } else {
        addLines(result);
      }
    },
    [addLines, onClose]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        const cmd = input;
        setInput('');
        if (cmd.trim()) {
          setHistory((prev) => [...prev, cmd]);
        }
        setHistoryIdx(-1);
        execute(cmd);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (history.length === 0) return;
        const newIdx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
        setHistoryIdx(newIdx);
        setInput(history[newIdx]);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIdx === -1) return;
        const newIdx = historyIdx + 1;
        if (newIdx >= history.length) {
          setHistoryIdx(-1);
          setInput('');
        } else {
          setHistoryIdx(newIdx);
          setInput(history[newIdx]);
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    },
    [input, history, historyIdx, execute, onClose]
  );

  // Stop click from closing parent overlay
  const stopClick = useCallback((e) => e.stopPropagation(), []);

  return (
    <div className="egg-terminal-overlay" onClick={onClose}>
      <div className="egg-terminal" onClick={stopClick}>
        <div className="egg-terminal-bar">
          <span className="egg-terminal-dot" />
          <span className="egg-terminal-dot" />
          <span className="egg-terminal-dot" />
          <span className="egg-terminal-label">guest@lyra — zsh</span>
        </div>
        <div className="egg-terminal-body" ref={bodyRef}>
          {lines.map((line, i) => (
            <div
              key={i}
              className={`line${line.startsWith('guest@lyra') ? ' prompt' : ' output'}`}
            >
              {line}
            </div>
          ))}
          <div className="egg-terminal-input-row">
            <span className="egg-terminal-prompt">guest@lyra:~$ </span>
            <input
              ref={inputRef}
              className="egg-terminal-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
