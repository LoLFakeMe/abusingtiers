"use client";

import React, { useState, useEffect } from 'react';

// --- ICONS ---
const IconSettings = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
);
const IconCode = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
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
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
);
const IconExternalLink = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
);

export default function Abus3App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'generator' | 'plugins' | 'credits'>('home');

  // Input states
  const [prefixText, setPrefixText] = useState('ABUS3');
  const [totalFrames, setTotalFrames] = useState(64);
  const [animationDelay, setAnimationDelay] = useState(1.5);
  const [animationSpeed, setAnimationSpeed] = useState(3);
  const [textFormats, setTextFormats] = useState({ italic: false, underline: false, strikethrough: false });

  // Output and preview updates
  const [outputCode, setOutputCode] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [currentPreviewFrame, setCurrentPreviewFrame] = useState(0);
  const [previewHtmlString, setPreviewHtmlString] = useState('');

  const assembleFormattingCodes = () => {
    let formatting = '';
    if (textFormats.italic) formatting += '&o';
    if (textFormats.underline) formatting += '&n';
    if (textFormats.strikethrough) formatting += '&m';
    return formatting;
  };

  const handleFrameChange = (val: number) => {
    let corrected = Math.max(2, val);
    if (corrected > 100) corrected = 100;
    setTotalFrames(corrected);
  };

  const handleDelayChange = (val: number) => {
    const corrected = Math.max(1.2, parseFloat(val.toFixed(1)) || 1.2);
    setAnimationDelay(corrected);
  };

  const executeClipboardCopy = () => {
    navigator.clipboard.writeText(outputCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleCharacterInjection = (char: string) => {
    setPrefixText(prev => prev + char);
  };

  const calculateHslColor = (h: number, s: number, l: number): string => {
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

    const hexR = Math.floor((r + m) * 255).toString(16).padStart(2, '0').toUpperCase();
    const hexG = Math.floor((g + m) * 255).toString(16).padStart(2, '0').toUpperCase();
    const hexB = Math.floor((b + m) * 255).toString(16).padStart(2, '0').toUpperCase();
    return `#${hexR}${hexG}${hexB}`;
  };

  // Re-build python file when inputs change
  useEffect(() => {
    const formatTags = assembleFormattingCodes();
    const scriptTemplate = `import minescript
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

text       = "${prefixText}"
NUM_FRAMES = ${totalFrames}
DELAY      = ${animationDelay}
fmt        = "${formatTags}"

frames = []
for frame_i in range(NUM_FRAMES):
    t = frame_i / (NUM_FRAMES - 1)
    t_pp = 1 - abs(2 * t - 1)
    hue = t_pp * 300
    color = hsl_to_hex(hue, 1.0, 0.5)

    k_speed = ${animationSpeed} 
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
    setOutputCode(scriptTemplate);
  }, [prefixText, totalFrames, animationDelay, textFormats, animationSpeed]);

  // Run live animation steps
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPreviewFrame((prev) => (prev + 1) % (totalFrames || 1));
    }, animationDelay * 110);
    return () => clearInterval(interval);
  }, [totalFrames, animationDelay]);

  // Generate preview text elements
  useEffect(() => {
    if (!prefixText.length) {
      setPreviewHtmlString('');
      return;
    }
    const safeIdx = currentPreviewFrame % (totalFrames || 1);
    const progress = safeIdx / ((totalFrames - 1) || 1);
    const waveProgress = 1 - Math.abs(2 * progress - 1);
    const hexColor = calculateHslColor(waveProgress * 300, 1.0, 0.5);

    const waveValue = (safeIdx * animationSpeed / ((totalFrames - 1) || 1)) % 2.0;
    const bouncePos = 1 - Math.abs(waveValue - 1);
    const litCharIdx = Math.floor(bouncePos * (prefixText.length - 0.001));

    let html = '';
    for (let i = 0; i < prefixText.length; i++) {
      let char = prefixText[i];
      let hasFormat = false;
      
      if (char === '\u200C') { char = '❲ZWNJ❳'; hasFormat = true; }
      else if (char === '\u200B') { char = '❲ZWSP❳'; hasFormat = true; }
      else if (char === '\u2060') { char = '❲WJ❳'; hasFormat = true; }

      const elementStyles = `
        color: ${hasFormat ? '#555555' : hexColor};
        font-size: ${hasFormat ? '10px' : 'inherit'};
        font-weight: ${i === litCharIdx && !hasFormat ? 'bold' : 'normal'}; 
        font-style: ${textFormats.italic && !hasFormat ? 'italic' : 'normal'};
        text-decoration: ${textFormats.underline && !hasFormat ? 'underline' : textFormats.strikethrough && !hasFormat ? 'line-through' : 'none'};
        padding: ${hasFormat ? '0 2px' : '0'};
      `;
      html += `<span style="${elementStyles}">${char}</span>`;
    }
    setPreviewHtmlString(html);
  }, [currentPreviewFrame, prefixText, totalFrames, animationSpeed, textFormats]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#C5C5C5] flex flex-col selection:bg-[#202020]" style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system, sans-serif" }}>
      
      {/* Scrollbars and Fades */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scroll::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scroll::-webkit-scrollbar-track { background: #080808; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #1a1a1a; border-radius: 2px; }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: #262626; }
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        @keyframes viewFadeIn { from { opacity: 0; transform: scale(0.995) translateY(2px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes wrapperSlideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-view-fade { animation: viewFadeIn 0.3s ease forwards; }
        .animate-wrapper-slide { animation: wrapperSlideUp 0.5s ease forwards; }
      `}} />

      {/* TOP BAR */}
      <nav className="sticky top-0 z-50 bg-[#050505]/85 backdrop-blur-md border-b border-[#121212] px-6 h-14 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentTab('home')}>
          <div className="w-5 h-5 rounded bg-white flex items-center justify-center text-black font-mono font-bold text-xs">A</div>
          <span className="text-sm font-semibold tracking-tight text-[#EDEDED]">Abus3</span>
        </div>
        
        <div className="flex items-center gap-1">
          {(['home', 'generator', 'plugins', 'credits'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setCurrentTab(tab)}
              className={`text-xs px-3 py-1.5 rounded font-medium capitalize tracking-wide transition-all ${currentTab === tab ? 'bg-[#121212] text-white border border-[#1f1f1f]' : 'text-neutral-500 hover:text-neutral-200 border border-transparent'}`}
            >
              {tab === 'generator' ? 'Prefix Dashboard' : tab === 'plugins' ? 'Plugins' : tab}
            </button>
          ))}
        </div>
      </nav>

      <div className="flex-1 flex flex-col relative overflow-hidden">
        
        {/* TAB 1: HOME PAGE (CLEAN LAYOUT) */}
        {currentTab === 'home' && (
          <div className="flex-1 max-w-4xl w-full mx-auto px-6 flex flex-col justify-center py-12 animate-wrapper-slide">
            <div className="space-y-8 text-center md:text-left max-w-xl">
              <div className="space-y-3">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
                  Make your chat layout stand out.
                </h1>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  Abus3 lets you generate clean, animated formatting strings and python scripts to customize text layouts.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3">
                <button
                  type="button"
                  onClick={() => setCurrentTab('generator')}
                  className="w-full sm:w-auto bg-white hover:bg-neutral-200 text-black text-xs font-semibold px-5 py-2.5 rounded shadow-sm transition-all active:scale-[0.98]"
                >
                  Open Prefix Dashboard
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentTab('plugins')}
                  className="w-full sm:w-auto bg-[#0d0d0d] hover:bg-[#121212] border border-[#1c1c1c] text-neutral-300 text-xs font-semibold px-5 py-2.5 rounded transition-all active:scale-[0.98]"
                >
                  Get Plugins
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PREFIX BUILDER (FULL EXPANDED DASHBOARD) */}
        {currentTab === 'generator' && (
          <div className="flex-1 flex flex-col w-full h-full animate-view-fade bg-[#070707]">
            
            {/* Dashboard Workspace Titlebar */}
            <div className="h-12 border-b border-[#121212] bg-[#090909] px-6 flex items-center justify-between text-xs text-neutral-500 shrink-0 font-mono">
              <div className="flex items-center gap-3">
                <span className="text-white font-bold tracking-wider">EDITING: PREFIX_ENGINE</span>
                <span className="w-px h-3 bg-[#1c1c1c]" />
                <span className="hidden sm:inline">Output: Standard Code</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Live
              </div>
            </div>

            {/* Dashboard Main Viewport */}
            <div className="flex-1 grid grid-cols-1 xl:grid-cols-12 gap-6 p-6 overflow-y-auto custom-scroll">
              
              {/* Left Settings Sidebar */}
              <section className="xl:col-span-5 space-y-4 flex flex-col justify-start">
                
                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2 shrink-0">
                  <div className="p-2.5 bg-[#0a0a0a] border border-[#141414] rounded">
                    <div className="text-[9px] uppercase tracking-wider text-neutral-500 font-bold">Text String</div>
                    <div className="text-xs font-mono font-bold text-white mt-0.5 truncate">{prefixText || 'Empty'}</div>
                  </div>
                  <div className="p-2.5 bg-[#0a0a0a] border border-[#141414] rounded">
                    <div className="text-[9px] uppercase tracking-wider text-neutral-500 font-bold">Frames</div>
                    <div className="text-xs font-mono font-bold text-white mt-0.5">{totalFrames}</div>
                  </div>
                  <div className="p-2.5 bg-[#0a0a0a] border border-[#141414] rounded">
                    <div className="text-[9px] uppercase tracking-wider text-neutral-500 font-bold">Delay</div>
                    <div className="text-xs font-mono font-bold text-white mt-0.5">{animationDelay}s</div>
                  </div>
                </div>

                {/* Input Fields Box */}
                <div className="bg-[#0a0a0a] border border-[#141414] p-5 rounded space-y-4">
                  <div className="text-xs font-semibold tracking-wide text-white flex items-center gap-2">
                    <IconSettings /> Configuration Settings
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-1.5">Prefix Text</label>
                    <input 
                      type="text" 
                      value={prefixText} 
                      onChange={(e) => setPrefixText(e.target.value)}
                      className="w-full bg-[#030303] border border-[#1c1c1c] rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-neutral-600 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-1.5">Add Hidden Spaces</label>
                    <div className="grid grid-cols-3 gap-1">
                      { [['\u200C', 'ZWNJ'], ['\u200B', 'ZWSP'], ['\u2060', 'WJ']].map(([character, labelName]) => (
                        <button 
                          key={labelName}
                          type="button"
                          onClick={() => handleCharacterInjection(character)}
                          className="bg-[#030303] border border-[#1c1c1c] hover:border-neutral-600 py-1 text-[9px] font-mono rounded text-neutral-400 transition-all active:scale-95"
                        >
                          + {labelName}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-1">Total Frames</label>
                      <div className="relative flex items-center bg-[#030303] border border-[#1c1c1c] rounded focus-within:border-neutral-600 transition-all">
                        <input type="number" value={totalFrames} onChange={(e) => handleFrameChange(parseInt(e.target.value) || 0)} className="w-full bg-transparent px-3 py-1.5 text-xs text-white focus:outline-none" />
                        <div className="flex flex-col border-l border-[#1c1c1c] h-full">
                          <button type="button" onClick={() => handleFrameChange(totalFrames + 1)} className="p-1 text-neutral-500 hover:text-neutral-200 transition-all"><IconChevronUp /></button>
                          <button type="button" onClick={() => handleFrameChange(totalFrames - 1)} className="p-1 border-t border-[#1c1c1c] text-neutral-500 hover:text-neutral-200 transition-all"><IconChevronDown /></button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-1">Delay Rate</label>
                      <div className="relative flex items-center bg-[#030303] border border-[#1c1c1c] rounded focus-within:border-neutral-600 transition-all">
                        <input type="number" step="0.1" value={animationDelay} onChange={(e) => handleDelayChange(parseFloat(e.target.value) || 0)} className="w-full bg-transparent px-3 py-1.5 text-xs text-white focus:outline-none" />
                        <div className="flex flex-col border-l border-[#1c1c1c] h-full">
                          <button type="button" onClick={() => handleDelayChange(animationDelay + 0.1)} className="p-1 text-neutral-500 hover:text-neutral-200 transition-all"><IconChevronUp /></button>
                          <button type="button" onClick={() => handleDelayChange(animationDelay - 0.1)} className="p-1 border-t border-[#1c1c1c] text-neutral-500 hover:text-neutral-200 transition-all"><IconChevronDown /></button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-1">Wave Speed</label>
                    <div className="relative flex items-center bg-[#030303] border border-[#1c1c1c] rounded focus-within:border-neutral-600 transition-all">
                      <input type="number" value={animationSpeed} onChange={(e) => setAnimationSpeed(Math.max(1, parseInt(e.target.value) || 0))} className="w-full bg-transparent px-3 py-1.5 text-xs text-white focus:outline-none" />
                      <div className="flex flex-col border-l border-[#1c1c1c] h-full">
                        <button type="button" onClick={() => setAnimationSpeed(animationSpeed + 1)} className="p-1 text-neutral-500 hover:text-neutral-200 transition-all"><IconChevronUp /></button>
                        <button type="button" onClick={() => setAnimationSpeed(Math.max(1, animationSpeed - 1))} className="p-1 border-t border-[#1c1c1c] text-neutral-500 hover:text-neutral-200 transition-all"><IconChevronDown /></button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#141414]">
                    <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-2">Style Flags</label>
                    <div className="space-y-2">
                      {(Object.keys(textFormats) as Array<keyof typeof textFormats>).map((key) => (
                        <div key={key} onClick={() => setTextFormats(prev => ({ ...prev, [key]: !prev[key] }))} className="flex items-center gap-3 cursor-pointer group select-none py-0.5">
                          <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-all ${textFormats[key] ? 'bg-white border-white text-black' : 'bg-transparent border-[#222] group-hover:border-neutral-500'}`}>
                            {textFormats[key] && <div className="w-1.5 h-1.5 bg-black rounded-sm" />}
                          </div>
                          <span className="text-xs text-neutral-400 group-hover:text-neutral-200 transition-colors capitalize">{key}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Preview Window Panel */}
                <div className="bg-[#0a0a0a] border border-[#141414] p-4 rounded space-y-2.5">
                  <div className="flex items-center justify-between text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5"><IconEye /> Real-Time Preview</span>
                    <span className="text-neutral-600 font-mono">Frame: {currentPreviewFrame + 1}/{totalFrames}</span>
                  </div>
                  <div className="bg-[#030303] border border-[#121212] p-3 rounded text-center font-mono h-12 flex items-center justify-center text-sm overflow-hidden select-none">
                    <div dangerouslySetInnerHTML={{ __html: previewHtmlString || '...' }} />
                  </div>
                </div>
              </section>

              {/* Right Output Script Box */}
              <section className="xl:col-span-7 flex flex-col space-y-2 min-h-[350px]">
                <div className="flex items-center justify-between text-[10px] font-bold text-neutral-500 uppercase tracking-wider pl-1">
                  <span className="flex items-center gap-2"><IconCode /> Python Script Output</span>
                  <button type="button" onClick={executeClipboardCopy} className="flex items-center gap-1.5 text-[10px] text-neutral-400 hover:text-white bg-[#0a0a0a] border border-[#141414] px-3 py-1 rounded transition-all hover:border-neutral-500 active:scale-95">
                    {isCopied ? <><IconCheck /><span className="text-neutral-300">Copied</span></> : <><IconCopy /><span>Copy Code</span></>}
                  </button>
                </div>
                <div className="flex-1 bg-[#0a0a0a] border border-[#141414] rounded p-4 font-mono text-xs overflow-auto text-neutral-400 leading-relaxed custom-scroll select-all">
                  <pre className="whitespace-pre">{outputCode}</pre>
                </div>
              </section>

            </div>
          </div>
        )}

        {/* TAB 3: PLUGINS DOWNLOAD PAGE */}
        {currentTab === 'plugins' && (
          <div className="flex-1 max-w-2xl w-full mx-auto px-6 flex flex-col justify-center py-12">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white">Plugins</h2>
                <p className="text-xs text-neutral-500 mt-0.5">Files you can download to parse layout updates.</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="bg-[#0c0c0c] border border-[#141414] p-5 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-white">Abus3-Core-Plugin</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#161616] border border-[#222] font-mono text-neutral-400">v1.4.0</span>
                    </div>
                    <p className="text-xs text-neutral-500 max-w-md leading-relaxed">
                      Handles standard text formats and sets up formatting filters for hidden space characters.
                    </p>
                  </div>
                  <div>
                    <a 
                      href="#" 
                      className="inline-flex items-center gap-2 bg-white hover:bg-neutral-200 text-black text-xs font-semibold px-4 py-2 rounded transition-all"
                      onClick={(e) => e.preventDefault()}
                    >
                      <IconDownload /> Download .JAR
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CREDITS PAGE */}
        {currentTab === 'credits' && (
          <div className="flex-1 max-w-xl w-full mx-auto px-6 flex flex-col justify-center py-12">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white">Credits</h2>
                <p className="text-xs text-neutral-500 mt-0.5">Tools used to construct this workspace.</p>
              </div>

              <div className="bg-[#0c0c0c] border border-[#141414] rounded divide-y divide-[#141414]">
                <div className="p-4 flex items-center justify-between text-xs">
                  <span className="font-semibold text-neutral-300">Front-end Work</span>
                  <span className="text-neutral-500 font-mono">Abus3 Team</span>
                </div>
                <div className="p-4 flex items-center justify-between text-xs">
                  <span className="font-semibold text-neutral-300">Minescript API Link</span>
                  <a href="https://github.com/mcaron/minescript" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white flex items-center gap-1 transition-colors">
                    mcaron / minescript <IconExternalLink />
                  </a>
                </div>
                <div className="p-4 flex items-center justify-between text-xs">
                  <span className="font-semibold text-neutral-300">Styling</span>
                  <span className="text-neutral-500 font-mono">Tailwind CSS</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* FOOTER */}
      <footer className="h-10 text-center text-[10px] text-neutral-700 border-t border-[#121212] flex items-center justify-center bg-[#050505] shrink-0 font-mono">
        Abus3 Workspace
      </footer>
    </div>
  );
}
