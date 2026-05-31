"use client";

import React, { useState, useEffect } from 'react';

// --- CUSTOM SVG VECTOR GRAPHICS ---
const IconTerminal = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
);
const IconSettings = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15-.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);
const IconCode = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
);
const IconCopy = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
);
const IconCheck = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
);
const IconEye = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);
const IconChevronUp = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
);
const IconChevronDown = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
);
const IconDownload = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
);
const IconExternalLink = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
);

export default function AppWorkspace() {
  // Navigation Router state panel mapping ('home', 'generator', 'plugins', 'credits')
  const [activeTab, setActiveTab] = useState<'home' | 'generator' | 'plugins' | 'credits'>('home');

  // Prefix Generator state variables
  const [text, setText] = useState('MINE');
  const [numFrames, setNumFrames] = useState(100);
  const [delay, setDelay] = useState(1.2);
  const [speed, setSpeed] = useState(2);
  const [formats, setFormats] = useState({ italic: true, underline: false, strikethrough: false });

  const [generatedCode, setGeneratedCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [previewFrame, setPreviewFrame] = useState(0);
  const [previewText, setPreviewText] = useState('');

  const getFormatString = () => {
    let token = '';
    if (formats.italic) token += '&o';
    if (formats.underline) token += '&n';
    if (formats.strikethrough) token += '&m';
    return token;
  };

  const handleFrameChange = (val: number) => {
    let checked = Math.max(2, val);
    if (checked > 100) checked = 100;
    setNumFrames(checked);
  };

  const handleDelayChange = (val: number) => {
    const checked = Math.max(1.2, parseFloat(val.toFixed(1)) || 1.2);
    setDelay(checked);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const injectSpecialChar = (unicodeStr: string) => {
    setText(prev => prev + unicodeStr);
  };

  const hslToHex = (h: number, s: number, l: number): string => {
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;
    if (h < 60) { r = c; g = x; b = 0; }
    else if (h < 120) { r = x; g = c; b = 0; }
    else if (h < 180) { r = 0; g = c; b = x; }
    else if (h < 240) { r = 0; g = x; b = c; }
    else if (h < 300) { r = x; g = 0; b = c; }
    else { r = c; g = 0; b = x; }
    const rHex = Math.floor((r + m) * 255).toString(16).padStart(2, '0').toUpperCase();
    const gHex = Math.floor((g + m) * 255).toString(16).padStart(2, '0').toUpperCase();
    const bHex = Math.floor((b + m) * 255).toString(16).padStart(2, '0').toUpperCase();
    return `#${rHex}${gHex}${bHex}`;
  };

  useEffect(() => {
    const fmtStr = getFormatString();
    const script = `import minescript
import time

def hsl_to_hex(h, s, l):
    c = (1 - abs(2 * l - 1)) * s
    x = c * (1 - abs((h / 60) % 2 - 1))
    m = l - c / 2
    if h < 60:    r, g, b = c, x, 0
    elif h < 120: r, g, b = x, c, 0
    elif h < 180: r, g, b = 0, c, x
    elif h < 240: r, g, b = 0, x, c
    elif h < 300: r, g, b = x, 0, c
    else:         r, g, b = c, 0, x
    r = int((r + m) * 255)
    g = int((g + m) * 255)
    b = int((b + m) * 255)
    return f"#{r:02X}{g:02X}{b:02X}"

text       = "${text}"
NUM_FRAMES = ${numFrames}
DELAY      = ${delay}
fmt        = "${fmtStr}"

frames = []
for frame_i in range(NUM_FRAMES):
    t = frame_i / (NUM_FRAMES - 1)
    t_pp = 1 - abs(2 * t - 1)
    hue = t_pp * 300
    color = hsl_to_hex(hue, 1.0, 0.5)

    k_speed = ${speed} 
    k_val = (frame_i * k_speed / (NUM_FRAMES - 1)) % 2.0
    k_bounce = 1 - abs(k_val - 1)
    k_pos = int(k_bounce * (len(text) - 0.001))

    middle = ""
    for i, char in enumerate(text):
        current_fmt = fmt if i >= 0 else ""
        if i == k_pos:
            middle += f"<{color}>{current_fmt}&l{char}&r"
        else:
            middle += f"<{color}>{current_fmt}{char}"
    suffix = f"&r<{color}>"
    frames.append(middle + suffix)

for i, frame in enumerate(frames):
    minescript.execute(f"animatedprefix {frame}")
    minescript.echo(f"Frame {i+1}/{NUM_FRAMES}")
    time.sleep(DELAY)

minescript.echo(f"Done! {NUM_FRAMES} frames set.")`;
    setGeneratedCode(script);
  }, [text, numFrames, delay, formats, speed]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPreviewFrame((prev) => (prev + 1) % (numFrames || 1));
    }, delay * 110);
    return () => clearInterval(interval);
  }, [numFrames, delay]);

  useEffect(() => {
    if (!text.length) {
      setPreviewText('');
      return;
    }
    const currentFrameSafe = previewFrame % (numFrames || 1);
    const t = currentFrameSafe / ((numFrames - 1) || 1);
    const t_pp = 1 - Math.abs(2 * t - 1);
    const color = hslToHex(t_pp * 300, 1.0, 0.5);

    const k_val = (currentFrameSafe * speed / ((numFrames - 1) || 1)) % 2.0;
    const k_bounce = 1 - Math.abs(k_val - 1);
    const k_pos = Math.floor(k_bounce * (text.length - 0.001));

    let textStructure = '';
    for (let i = 0; i < text.length; i++) {
      let charDisplay = text[i];
      let isSpecial = false;
      if (charDisplay === '\u200C') { charDisplay = '❲ZWNJ❳'; isSpecial = true; }
      else if (charDisplay === '\u200B') { charDisplay = '❲ZWSP❳'; isSpecial = true; }
      else if (charDisplay === '\u2060') { charDisplay = '❲WJ❳'; isSpecial = true; }

      const styles = `
        color: ${isSpecial ? '#555555' : color};
        font-size: ${isSpecial ? '10px' : 'inherit'};
        font-weight: ${i === k_pos && !isSpecial ? 'bold' : 'normal'}; 
        font-style: ${formats.italic && !isSpecial ? 'italic' : 'normal'};
        text-decoration: ${formats.underline && !isSpecial ? 'underline' : formats.strikethrough && !isSpecial ? 'line-through' : 'none'};
        padding: ${isSpecial ? '0 2px' : '0'};
      `;
      textStructure += `<span style="${styles}">${charDisplay}</span>`;
    }
    setPreviewText(textStructure);
  }, [previewFrame, text, numFrames, speed, formats]);

  return (
    <div className="min-h-screen bg-[#060606] text-[#CECECE] flex flex-col selection:bg-[#252525]" style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
      
      {/* Global Embedded CSS Animations & Utilities */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scroll::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scroll::-webkit-scrollbar-track { background: #0a0a0a; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #1f1f1f; border-radius: 2px; }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: #2d2d2d; }
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulseSlow { 0%, 100% { opacity: 0.25; } 50% { opacity: 0.4; } }
        .animate-fade-in { animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-slide-up { animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-pulse-slow { animation: pulseSlow 4s ease-in-out infinite; }
      `}} />

      {/* FIXED TOPBAR NAVIGATION HEADER */}
      <nav className="sticky top-0 z-50 bg-[#060606]/80 backdrop-blur-md border-b border-[#141414] px-6 h-14 flex items-center justify-between transition-all duration-300">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="w-5 h-5 rounded bg-white flex items-center justify-center text-black font-mono font-bold text-xs shadow-sm">M</div>
          <span className="text-sm font-semibold tracking-tight text-[#EDEDED]">Minescript Nexus</span>
        </div>
        
        {/* Router Tab Menu List */}
        <div className="flex items-center gap-1">
          {(['home', 'generator', 'plugins', 'credits'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`text-xs px-3 py-1.5 rounded font-medium capitalize tracking-wide transition-all duration-200 ${activeTab === tab ? 'bg-[#121212] text-white border border-[#1f1f1f]' : 'text-neutral-500 hover:text-neutral-200 border border-transparent'}`}
            >
              {tab === 'generator' ? 'Prefix Engine' : tab === 'plugins' ? 'Our Plugins' : tab}
            </button>
          ))}
        </div>
      </nav>

      {/* CORE FRAMEWORK WORKSPACE SWITCH ROUTER */}
      <div className="flex-1 max-w-5xl w-full mx-auto p-6 md:p-10 flex flex-col justify-center relative">
        
        {/* Dynamic Background Accent blur effect */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-neutral-800/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />

        {/* PAGE 1: HOME PAGE (HERO LANDING HUB) */}
        {activeTab === 'home' && (
          <div className="space-y-10 py-8 animate-slide-up text-center md:text-left max-w-2xl mx-auto">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#0d0d0d] border border-[#161616] text-[11px] font-medium tracking-wide text-neutral-400 uppercase">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Production Ready Pipeline
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
                Automate Your In-Game <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-100 to-neutral-400">Chat Environment Framework</span>
              </h1>
              <p className="text-sm text-neutral-500 leading-relaxed max-w-xl mx-auto md:mx-0">
                An ecosystem designed to build, compile, and distribute specialized automation packages for modern server interfaces and client terminal hooks.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3">
              <button
                type="button"
                onClick={() => setActiveTab('generator')}
                className="w-full sm:w-auto bg-white hover:bg-neutral-200 text-black text-xs font-semibold px-5 py-2.5 rounded shadow-sm transition-all active:scale-[0.98]"
              >
                Launch Prefix Engine
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('plugins')}
                className="w-full sm:w-auto bg-[#0d0d0d] hover:bg-[#121212] border border-[#1c1c1c] hover:border-neutral-700 text-neutral-300 text-xs font-semibold px-5 py-2.5 rounded transition-all active:scale-[0.98]"
              >
                Browse Our Plugins
              </button>
            </div>
          </div>
        )}

        {/* PAGE 2: MINESCRIPT GENERATOR INTERFACE */}
        {activeTab === 'generator' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-lg font-medium text-white">Dynamic Color Animation Compositor</h2>
              <p className="text-xs text-neutral-500 mt-0.5">Generates automated vector text frames utilizing native layout structures.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Configuration adjustments matrix */}
              <section className="md:col-span-5 space-y-5">
                <div className="space-y-4 bg-[#0c0c0c] p-5 rounded border border-[#141414]">
                  <div>
                    <label className="block text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-1.5">Prefix Plain Text</label>
                    <input 
                      type="text" 
                      value={text} 
                      onChange={(e) => setText(e.target.value)}
                      className="w-full bg-[#040404] border border-[#1a1a1a] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-600 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-1.5">Inject Hidden Codes</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      { [['\u200C', 'ZWNJ'], ['\u200B', 'ZWSP'], ['\u2060', 'WJ']].map(([char, name]) => (
                        <button 
                          key={name}
                          type="button"
                          onClick={() => injectSpecialChar(char)}
                          className="bg-[#040404] border border-[#1a1a1a] hover:border-neutral-600 px-2 py-1.5 text-[10px] rounded text-neutral-400 transition-all active:scale-95"
                        >
                          + {name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">Frames</label>
                        <span className="text-[9px] text-neutral-600">Max 100</span>
                      </div>
                      <div className="relative flex items-center bg-[#040404] border border-[#1a1a1a] rounded focus-within:border-neutral-600 transition-all">
                        <input type="number" value={numFrames} onChange={(e) => handleFrameChange(parseInt(e.target.value) || 0)} className="w-full bg-transparent px-3 py-2 text-xs text-white focus:outline-none" />
                        <div className="flex flex-col border-l border-[#1a1a1a] h-full">
                          <button type="button" onClick={() => handleFrameChange(numFrames + 1)} className="p-1 text-neutral-500 hover:text-neutral-200 hover:bg-[#0d0d0d] transition-all"><IconChevronUp /></button>
                          <button type="button" onClick={() => handleFrameChange(numFrames - 1)} className="p-1 border-t border-[#1a1a1a] text-neutral-500 hover:text-neutral-200 hover:bg-[#0d0d0d] transition-all"><IconChevronDown /></button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">Delay</label>
                        <span className="text-[9px] text-neutral-600">Min 1.2</span>
                      </div>
                      <div className="relative flex items-center bg-[#040404] border border-[#1a1a1a] rounded focus-within:border-neutral-600 transition-all">
                        <input type="number" step="0.1" value={delay} onChange={(e) => handleDelayChange(parseFloat(e.target.value) || 0)} className="w-full bg-transparent px-3 py-2 text-xs text-white focus:outline-none" />
                        <div className="flex flex-col border-l border-[#1a1a1a] h-full">
                          <button type="button" onClick={() => handleDelayChange(delay + 0.1)} className="p-1 text-neutral-500 hover:text-neutral-200 hover:bg-[#0d0d0d] transition-all"><IconChevronUp /></button>
                          <button type="button" onClick={() => handleDelayChange(delay - 0.1)} className="p-1 border-t border-[#1a1a1a] text-neutral-500 hover:text-neutral-200 hover:bg-[#0d0d0d] transition-all"><IconChevronDown /></button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-1.5">Wave Elasticity Speed</label>
                    <div className="relative flex items-center bg-[#040404] border border-[#1a1a1a] rounded focus-within:border-neutral-600 transition-all">
                      <input type="number" value={speed} onChange={(e) => setSpeed(Math.max(1, parseInt(e.target.value) || 0))} className="w-full bg-transparent px-3 py-2 text-xs text-white focus:outline-none" />
                      <div className="flex flex-col border-l border-[#1a1a1a] h-full">
                        <button type="button" onClick={() => setSpeed(speed + 1)} className="p-1 text-neutral-500 hover:text-neutral-200 hover:bg-[#0d0d0d] transition-all"><IconChevronUp /></button>
                        <button type="button" onClick={() => setSpeed(Math.max(1, speed - 1))} className="p-1 border-t border-[#1a1a1a] text-neutral-500 hover:text-neutral-200 hover:bg-[#0d0d0d] transition-all"><IconChevronDown /></button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#141414]">
                    <label className="block text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-2">Style Formats Matrix</label>
                    <div className="space-y-2">
                      {(Object.keys(formats) as Array<keyof typeof formats>).map((key) => (
                        <div key={key} onClick={() => setFormats(prev => ({ ...prev, [key]: !prev[key] }))} className="flex items-center gap-3 cursor-pointer group select-none py-0.5">
                          <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-all ${formats[key] ? 'bg-white border-white text-black' : 'bg-transparent border-[#262626] group-hover:border-neutral-500'}`}>
                            {formats[key] && <div className="w-1.5 h-1.5 bg-black rounded-sm" />}
                          </div>
                          <span className="text-xs text-neutral-400 group-hover:text-neutral-200 transition-colors capitalize">{key}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Local Frame Render Output Terminal */}
                <div className="bg-[#0c0c0c] p-5 rounded border border-[#141414] space-y-3">
                  <div className="flex items-center justify-between text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5"><IconEye /> Realtime Sandbox Monitor</span>
                    <span className="text-neutral-600 font-mono">F: {previewFrame + 1}/{numFrames}</span>
                  </div>
                  <div className="bg-[#040404] border border-[#141414] p-4 rounded text-center font-mono h-14 flex items-center justify-center text-base overflow-hidden">
                    <div dangerouslySetInnerHTML={{ __html: previewText || '...' }} />
                  </div>
                </div>
              </section>

              {/* Code Panel Display Column */}
              <section className="md:col-span-7 flex flex-col space-y-2">
                <div className="flex items-center justify-between text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                  <span className="flex items-center gap-2"><IconCode /> Auto-Compiled Python Program</span>
                  <button type="button" onClick={handleCopy} className="flex items-center gap-1.5 text-[11px] text-neutral-400 hover:text-white bg-[#0c0c0c] border border-[#141414] px-3 py-1 rounded transition-all hover:border-neutral-600 active:scale-95">
                    {copied ? <><IconCheck /><span className="text-neutral-300">Copied</span></> : <><IconCopy /><span>Copy Output</span></>}
                  </button>
                </div>
                <div className="flex-1 bg-[#0c0c0c] border border-[#141414] rounded p-4 font-mono text-xs overflow-auto max-h-[480px] text-neutral-400 leading-relaxed custom-scroll">
                  <pre className="whitespace-pre select-all">{generatedCode}</pre>
                </div>
              </section>
            </div>
          </div>
        )}

        {/* PAGE 3: PLUGINS DOWNLOAD MARKETPLACE HUB */}
        {activeTab === 'plugins' && (
          <div className="space-y-6 animate-fade-in max-w-2xl mx-auto w-full">
            <div>
              <h2 className="text-lg font-medium text-white">Extensions Repository</h2>
              <p className="text-xs text-neutral-500 mt-0.5">Optimized production extensions available for public deployment.</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {/* Product Card Row */}
              <div className="bg-[#0c0c0c] border border-[#141414] hover:border-[#1f1f1f] p-5 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300 group">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-white tracking-tight">PrefixCore Automation Engine</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#161616] border border-[#222] font-mono text-neutral-400">v1.4.0</span>
                  </div>
                  <p className="text-xs text-neutral-500 max-w-md leading-relaxed">
                    Processes asynchronous macro strings instantly inside server clusters. Features native support for handling multi-byte invisible padding.
                  </p>
                </div>
                <div>
                  <a 
                    href="#" 
                    className="inline-flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-black text-xs font-semibold px-4 py-2 rounded transition-all group-hover:translate-x-0.5"
                    onClick={(e) => e.preventDefault()}
                  >
                    <IconDownload /> Download .JAR
                  </a>
                </div>
              </div>

              {/* Showcase Sub-Card Layout */}
              <div className="bg-[#0c0c0c] border border-[#141414] p-5 rounded opacity-60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-neutral-300 tracking-tight">Terminal Packet Interceptor</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#161616] font-mono text-neutral-500">Scheduled</span>
                  </div>
                  <p className="text-xs text-neutral-500 max-w-sm">
                    Inbound logging diagnostic terminal module. Out-of-the-box support for managing client configurations.
                  </p>
                </div>
                <div className="text-[11px] text-neutral-600 font-medium italic tracking-wider">
                  Development Pending
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PAGE 4: CREDITS PAGE ROSTER */}
        {activeTab === 'credits' && (
          <div className="space-y-6 animate-fade-in max-w-xl mx-auto w-full">
            <div>
              <h2 className="text-lg font-medium text-white">System Architecture Credits</h2>
              <p className="text-xs text-neutral-500 mt-0.5">Core maintainers and upstream library dependencies.</p>
            </div>

            <div className="bg-[#0c0c0c] border border-[#141414] rounded divide-y divide-[#141414]">
              <div className="p-4 flex items-center justify-between text-xs">
                <span className="font-semibold text-neutral-300">Lead Architectural Design</span>
                <span className="text-neutral-500 font-mono">Development Team Nexus</span>
              </div>
              <div className="p-4 flex items-center justify-between text-xs">
                <span className="font-semibold text-neutral-300">Minescript Integration Pipeline</span>
                <a href="https://github.com/mcaron/minescript" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white flex items-center gap-1 transition-colors">
                  mcaron / minescript <IconExternalLink />
                </a>
              </div>
              <div className="p-4 flex items-center justify-between text-xs">
                <span className="font-semibold text-neutral-300">Visual Interface Matrix</span>
                <span className="text-neutral-500 font-mono">Tailwind Engine Structural Spec</span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* FOOTER */}
      <footer className="text-center text-[10px] text-neutral-700 py-6 border-t border-[#141414] tracking-wider uppercase">
        Minescript Network Infrastructure Core Hub Matrix
      </footer>
    </div>
  );
}
