"use client";

import React, { useState, useEffect } from 'react';

// --- CUSTOM SVG VECTOR GRAPHICS ---
const IconTerminal = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
);
const IconSettings = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15-.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
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
const IconHome = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
);
const IconGrid = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
);
const IconLayers = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2 12 2"></polygon><polygon points="2 17 12 22 22 17"></polygon><polygon points="2 12 12 17 22 12"></polygon></svg>
);
const IconInfo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
);

export default function Abus3Workspace() {
  // Navigation Routing System state
  const [currentTab, setCurrentTab] = useState<'home' | 'generator' | 'plugins' | 'credits'>('generator');

  // Input controller properties
  const [prefixText, setPrefixText] = useState('ABUS3');
  const [totalFrames, setTotalFrames] = useState(64);
  const [animationDelay, setAnimationDelay] = useState(1.5);
  const [animationSpeed, setAnimationSpeed] = useState(3);
  const [textFormats, setTextFormats] = useState({ italic: false, underline: false, strikethrough: false });

  // Compilation helper structures
  const [outputCode, setOutputCode] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [currentPreviewFrame, setCurrentPreviewFrame] = useState(0);
  const [previewHtmlString, setPreviewHtmlString] = useState('');

  const assembleFormattingCodes = () => {
    let codeString = '';
    if (textFormats.italic) codeString += '&o';
    if (textFormats.underline) codeString += '&n';
    if (textFormats.strikethrough) codeString += '&m';
    return codeString;
  };

  const handleFrameChange = (newValue: number) => {
    let validatedValue = Math.max(2, newValue);
    if (validatedValue > 100) validatedValue = 100;
    setTotalFrames(validatedValue);
  };

  const handleDelayChange = (newValue: number) => {
    const validatedValue = Math.max(1.2, parseFloat(newValue.toFixed(1)) || 1.2);
    setAnimationDelay(validatedValue);
  };

  const executeClipboardCopy = () => {
    navigator.clipboard.writeText(outputCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleCharacterInjection = (character: string) => {
    setPrefixText(previousString => previousString + character);
  };

  const calculateHslColor = (hueValue: number, saturation: number, lightness: number): string => {
    const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
    const secondaryComponent = chroma * (1 - Math.abs(((hueValue / 60) % 2) - 1));
    const baselineBrightness = lightness - chroma / 2;
    let redValue = 0, greenValue = 0, blueValue = 0;

    if (hueValue < 60) { redValue = chroma; greenValue = secondaryComponent; blueValue = 0; }
    else if (hueValue < 120) { redValue = secondaryComponent; greenValue = chroma; blueValue = 0; }
    else if (hueValue < 180) { redValue = 0; greenValue = chroma; blueValue = secondaryComponent; }
    else if (hueValue < 240) { redValue = 0; greenValue = secondaryComponent; blueValue = chroma; }
    else if (hueValue < 300) { redValue = secondaryComponent; greenValue = 0; blueValue = chroma; }
    else { redValue = chroma; greenValue = 0; blueValue = secondaryComponent; }

    const hexRed = Math.floor((redValue + baselineBrightness) * 255).toString(16).padStart(2, '0').toUpperCase();
    const hexGreen = Math.floor((greenValue + baselineBrightness) * 255).toString(16).padStart(2, '0').toUpperCase();
    const hexBlue = Math.floor((blueValue + baselineBrightness) * 255).toString(16).padStart(2, '0').toUpperCase();
    return `#${hexRed}${hexGreen}${hexBlue}`;
  };

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

  useEffect(() => {
    const playTicker = setInterval(() => {
      setCurrentPreviewFrame((previousFrame) => (previousFrame + 1) % (totalFrames || 1));
    }, animationDelay * 110);
    return () => clearInterval(playTicker);
  }, [totalFrames, animationDelay]);

  useEffect(() => {
    if (!prefixText.length) {
      setPreviewHtmlString('');
      return;
    }
    const safeFrameIndex = currentPreviewFrame % (totalFrames || 1);
    const normalizedProgress = safeFrameIndex / ((totalFrames - 1) || 1);
    const waveProgress = 1 - Math.abs(2 * normalizedProgress - 1);
    const targetHexColor = calculateHslColor(waveProgress * 300, 1.0, 0.5);

    const animationWaveValue = (safeFrameIndex * animationSpeed / ((totalFrames - 1) || 1)) % 2.0;
    const waveBouncePosition = 1 - Math.abs(animationWaveValue - 1);
    const illuminatedCharIndex = Math.floor(waveBouncePosition * (prefixText.length - 0.001));

    let constructedHtml = '';
    for (let loopIndex = 0; loopIndex < prefixText.length; loopIndex++) {
      let activeCharacter = prefixText[loopIndex];
      let hasSpecialFormat = false;
      
      if (activeCharacter === '\u200C') { activeCharacter = '❲ZWNJ❳'; hasSpecialFormat = true; }
      else if (activeCharacter === '\u200B') { activeCharacter = '❲ZWSP❳'; hasSpecialFormat = true; }
      else if (activeCharacter === '\u2060') { activeCharacter = '❲WJ❳'; hasSpecialFormat = true; }

      const elementStyles = `
        color: ${hasSpecialFormat ? '#555555' : targetHexColor};
        font-size: ${hasSpecialFormat ? '10px' : 'inherit'};
        font-weight: ${loopIndex === illuminatedCharIndex && !hasSpecialFormat ? 'bold' : 'normal'}; 
        font-style: ${textFormats.italic && !hasSpecialFormat ? 'italic' : 'normal'};
        text-decoration: ${textFormats.underline && !hasSpecialFormat ? 'underline' : textFormats.strikethrough && !hasSpecialFormat ? 'line-through' : 'none'};
        padding: ${hasSpecialFormat ? '0 2px' : '0'};
      `;
      constructedHtml += `<span style="${elementStyles}">${activeCharacter}</span>`;
    }
    setPreviewHtmlString(constructedHtml);
  }, [currentPreviewFrame, prefixText, totalFrames, animationSpeed, textFormats]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#C5C5C5] flex flex-col selection:bg-[#202020]" style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system, sans-serif" }}>
      
      {/* Global Scrollbar Styles and Micro-Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scroll::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scroll::-webkit-scrollbar-track { background: #080808; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #1a1a1a; border-radius: 2px; }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: #262626; }
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        @keyframes viewFadeIn { from { opacity: 0; transform: scale(0.995) translateY(2px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes wrapperSlideUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .animate-view-fade { animation: viewFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-wrapper-slide { animation: wrapperSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}} />

      {/* TOP HEADER STATUS BAR */}
      <header className="h-14 border-b border-[#121212] bg-[#070707] px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E5E5E5] animate-pulse" />
            <span className="text-xs font-bold tracking-[0.15em] text-white font-mono">ABUS3</span>
          </div>
          <span className="text-[10px] text-neutral-600 font-mono border-l border-[#1c1c1c] pl-3 uppercase tracking-wider hidden sm:inline">Operational Console</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-mono text-neutral-500">
          <span className="hidden md:inline">API: ACTIVE</span>
          <span className="w-px h-3 bg-[#161616]" />
          <span>v2.1.0</span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        
        {/* SIDEBAR DASHBOARD NAVIGATION MENU */}
        <aside className="w-56 bg-[#070707] border-r border-[#121212] p-3 flex flex-col justify-between shrink-0 hidden md:flex">
          <div className="space-y-1">
            <div className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest px-3 mb-3 block">Navigation</div>
            
            <button 
              type="button" 
              onClick={() => setCurrentTab('home')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded text-xs font-medium transition-all ${currentTab === 'home' ? 'bg-[#121212] text-white border border-[#1c1c1c]' : 'text-neutral-500 hover:text-neutral-200'}`}
            >
              <IconHome /> Hub Overview
            </button>

            <button 
              type="button" 
              onClick={() => setCurrentTab('generator')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded text-xs font-medium transition-all ${currentTab === 'generator' ? 'bg-[#121212] text-white border border-[#1c1c1c]' : 'text-neutral-500 hover:text-neutral-200'}`}
            >
              <IconGrid /> Prefix Builder
            </button>

            <button 
              type="button" 
              onClick={() => setCurrentTab('plugins')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded text-xs font-medium transition-all ${currentTab === 'plugins' ? 'bg-[#121212] text-white border border-[#1c1c1c]' : 'text-neutral-500 hover:text-neutral-200'}`}
            >
              <IconLayers /> Extensions
            </button>

            <button 
              type="button" 
              onClick={() => setCurrentTab('credits')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded text-xs font-medium transition-all ${currentTab === 'credits' ? 'bg-[#121212] text-white border border-[#1c1c1c]' : 'text-neutral-500 hover:text-neutral-200'}`}
            >
              <IconInfo /> System Credits
            </button>
          </div>

          <div className="p-3 bg-[#0a0a0a] border border-[#121212] rounded text-[10px] text-neutral-600 font-mono">
            System Instance: Sec-Node
          </div>
        </aside>

        {/* MOBILE BOTTOM OR TOP NAVIGATION FOR SMALL SCREENS */}
        <div className="md:hidden bg-[#070707] border-b border-[#121212] p-2 flex justify-around shrink-0">
          {(['home', 'generator', 'plugins', 'credits'] as const).map((tab) => (
            <button 
              key={tab} 
              onClick={() => setCurrentTab(tab)} 
              className={`text-[11px] font-medium capitalize px-2 py-1 rounded ${currentTab === tab ? 'text-white bg-[#121212]' : 'text-neutral-500'}`}
            >
              {tab === 'generator' ? 'Builder' : tab}
            </button>
          ))}
        </div>

        {/* MAIN WORKSPACE CONTENT CONTAINER */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 custom-scroll">
          
          {/* TAB 1: HUB HOMEPAGE */}
          {currentTab === 'home' && (
            <div className="max-w-2xl mx-auto py-12 space-y-8 animate-wrapper-slide">
              <div className="space-y-4">
                <div className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">System Gateway</div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Welcome to Abus3 Automation Suite</h1>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  A unified environment optimized for configuring animated chat interfaces, compilation parameters, and executing script deployments.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4">
                <div onClick={() => setCurrentTab('generator')} className="p-4 rounded border border-[#121212] bg-[#070707] hover:border-neutral-700 transition-all cursor-pointer space-y-1">
                  <div className="text-xs font-semibold text-white">Launch Prefix Builder</div>
                  <div className="text-[11px] text-neutral-500">Edit real-time layout structures.</div>
                </div>
                <div onClick={() => setCurrentTab('plugins')} className="p-4 rounded border border-[#121212] bg-[#070707] hover:border-neutral-700 transition-all cursor-pointer space-y-1">
                  <div className="text-xs font-semibold text-white">Extension Hub</div>
                  <div className="text-[11px] text-neutral-500">Download integrated binaries.</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DASHBOARD PREFIX BUILDER */}
          {currentTab === 'generator' && (
            <div className="space-y-6 animate-view-fade">
              
              {/* Dashboard Metrics Header Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-[#070707] border border-[#121212] rounded">
                  <div className="text-[9px] font-bold uppercase tracking-wider text-neutral-500">Active String</div>
                  <div className="text-xs font-mono font-bold text-white mt-0.5 truncate">{prefixText || 'None'}</div>
                </div>
                <div className="p-3 bg-[#070707] border border-[#121212] rounded">
                  <div className="text-[9px] font-bold uppercase tracking-wider text-neutral-500">Frame Capacity</div>
                  <div className="text-xs font-mono font-bold text-white mt-0.5">{totalFrames} Units</div>
                </div>
                <div className="p-3 bg-[#070707] border border-[#121212] rounded">
                  <div className="text-[9px] font-bold uppercase tracking-wider text-neutral-500">Delay Intervals</div>
                  <div className="text-xs font-mono font-bold text-white mt-0.5">{animationDelay}s</div>
                </div>
                <div className="p-3 bg-[#070707] border border-[#121212] rounded">
                  <div className="text-[9px] font-bold uppercase tracking-wider text-neutral-500">Compilation</div>
                  <div className="text-xs font-mono font-bold text-emerald-500 mt-0.5 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-500" /> Success
                  </div>
                </div>
              </div>

              {/* Main Layout Splitting Split Block */}
              <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                
                {/* Control Panel Variable Input Block */}
                <section className="xl:col-span-5 space-y-4">
                  <div className="bg-[#070707] border border-[#121212] p-5 rounded space-y-4">
                    <div className="text-xs font-semibold tracking-wide text-white flex items-center gap-2 mb-1">
                      <IconSettings /> Configuration Matrix
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-1">Raw Prefix Input</label>
                      <input 
                        type="text" 
                        value={prefixText} 
                        onChange={(e) => setPrefixText(e.target.value)}
                        className="w-full bg-[#030303] border border-[#181818] rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-neutral-600 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-1">Inject Hex Space-Breaks</label>
                      <div className="grid grid-cols-3 gap-1">
                        { [['\u200C', 'ZWNJ'], ['\u200B', 'ZWSP'], ['\u2060', 'WJ']].map(([character, labelName]) => (
                          <button 
                            key={labelName}
                            type="button"
                            onClick={() => handleCharacterInjection(character)}
                            className="bg-[#030303] border border-[#181818] hover:border-neutral-600 py-1 text-[9px] font-mono rounded text-neutral-400 transition-all active:scale-95"
                          >
                            + {labelName}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Frames</label>
                        </div>
                        <div className="relative flex items-center bg-[#030303] border border-[#181818] rounded focus-within:border-neutral-600 transition-all">
                          <input type="number" value={totalFrames} onChange={(e) => handleFrameChange(parseInt(e.target.value) || 0)} className="w-full bg-transparent px-3 py-1.5 text-xs text-white focus:outline-none" />
                          <div className="flex flex-col border-l border-[#181818] h-full">
                            <button type="button" onClick={() => handleFrameChange(totalFrames + 1)} className="p-1 text-neutral-500 hover:text-neutral-200 transition-all"><IconChevronUp /></button>
                            <button type="button" onClick={() => handleFrameChange(totalFrames - 1)} className="p-1 border-t border-[#181818] text-neutral-500 hover:text-neutral-200 transition-all"><IconChevronDown /></button>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Interval Rate</label>
                        </div>
                        <div className="relative flex items-center bg-[#030303] border border-[#181818] rounded focus-within:border-neutral-600 transition-all">
                          <input type="number" step="0.1" value={animationDelay} onChange={(e) => handleDelayChange(parseFloat(e.target.value) || 0)} className="w-full bg-transparent px-3 py-1.5 text-xs text-white focus:outline-none" />
                          <div className="flex flex-col border-l border-[#181818] h-full">
                            <button type="button" onClick={() => handleDelayChange(animationDelay + 0.1)} className="p-1 text-neutral-500 hover:text-neutral-200 transition-all"><IconChevronUp /></button>
                            <button type="button" onClick={() => handleDelayChange(animationDelay - 0.1)} className="p-1 border-t border-[#181818] text-neutral-500 hover:text-neutral-200 transition-all"><IconChevronDown /></button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-1">Vector Wave Speed</label>
                      <div className="relative flex items-center bg-[#030303] border border-[#181818] rounded focus-within:border-neutral-600 transition-all">
                        <input type="number" value={animationSpeed} onChange={(e) => setAnimationSpeed(Math.max(1, parseInt(e.target.value) || 0))} className="w-full bg-transparent px-3 py-1.5 text-xs text-white focus:outline-none" />
                        <div className="flex flex-col border-l border-[#181818] h-full">
                          <button type="button" onClick={() => setAnimationSpeed(animationSpeed + 1)} className="p-1 text-neutral-500 hover:text-neutral-200 transition-all"><IconChevronUp /></button>
                          <button type="button" onClick={() => setAnimationSpeed(Math.max(1, animationSpeed - 1))} className="p-1 border-t border-[#181818] text-neutral-500 hover:text-neutral-200 transition-all"><IconChevronDown /></button>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#121212]">
                      <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-2">Style Toggle Switches</label>
                      <div className="space-y-2">
                        {(Object.keys(textFormats) as Array<keyof typeof textFormats>).map((formatKey) => (
                          <div key={formatKey} onClick={() => setTextFormats(prev => ({ ...prev, [formatKey]: !prev[formatKey] }))} className="flex items-center gap-3 cursor-pointer group select-none py-0.5">
                            <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-all ${textFormats[formatKey] ? 'bg-white border-white text-black' : 'bg-transparent border-[#222] group-hover:border-neutral-500'}`}>
                              {textFormats[formatKey] && <div className="w-1.5 h-1.5 bg-black rounded-sm" />}
                            </div>
                            <span className="text-xs text-neutral-400 group-hover:text-neutral-200 transition-colors capitalize">{formatKey}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Operational Terminal Sandbox Module */}
                  <div className="bg-[#070707] border border-[#121212] p-4 rounded space-y-2.5">
                    <div className="flex items-center justify-between text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
                      <span className="flex items-center gap-1.5"><IconEye /> Live Console Display</span>
                      <span className="text-neutral-600 font-mono">Tick: {currentPreviewFrame + 1}/{totalFrames}</span>
                    </div>
                    <div className="bg-[#030303] border border-[#121212] p-3 rounded text-center font-mono h-12 flex items-center justify-center text-sm overflow-hidden select-none">
                      <div dangerouslySetInnerHTML={{ __html: previewHtmlString || '...' }} />
                    </div>
                  </div>
                </section>

                {/* Automation Script Block Execution Column */}
                <section className="xl:col-span-7 flex flex-col space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-bold text-neutral-500 uppercase tracking-wider pl-1">
                    <span className="flex items-center gap-2"><IconCode /> Compiled Python Binary Script</span>
                    <button type="button" onClick={executeClipboardCopy} className="flex items-center gap-1.5 text-[10px] text-neutral-400 hover:text-white bg-[#070707] border border-[#121212] px-3 py-1 rounded transition-all hover:border-neutral-500 active:scale-95">
                      {isCopied ? <><IconCheck /><span className="text-neutral-300">Copied</span></> : <><IconCopy /><span>Copy Data</span></>}
                    </button>
                  </div>
                  <div className="flex-1 bg-[#070707] border border-[#121212] rounded p-4 font-mono text-xs overflow-auto max-h-[460px] text-neutral-400 leading-relaxed custom-scroll">
                    <pre className="whitespace-pre select-all">{outputCode}</pre>
                  </div>
                </section>

              </div>
            </div>
          )}

          {/* TAB 3: EXTENSIONS HUB */}
          {currentTab === 'plugins' && (
            <div className="max-w-xl mx-auto space-y-6 animate-view-fade py-4">
              <div>
                <h2 className="text-base font-semibold text-white">Abus3 Plugin Extensions</h2>
                <p className="text-xs text-neutral-500 mt-0.5">Download precompiled modular dependencies to parse inline layouts.</p>
              </div>

              <div className="space-y-3">
                <div className="bg-[#070707] border border-[#121212] hover:border-[#1c1c1c] p-4 rounded flex items-center justify-between gap-4 transition-all duration-300 group">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-white">Abus3-Core-Plugin</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#121212] font-mono text-neutral-400">v1.4.0</span>
                    </div>
                    <p className="text-[11px] text-neutral-500 max-w-sm">
                      Handles custom buffer structures seamlessly. Supports hidden byte spacing formats out-of-the-box.
                    </p>
                  </div>
                  <a 
                    href="#" 
                    className="inline-flex items-center gap-1.5 bg-white hover:bg-neutral-200 text-black text-[11px] font-semibold px-3 py-1.5 rounded transition-all shrink-0"
                    onClick={(e) => e.preventDefault()}
                  >
                    <IconDownload /> Download .JAR
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SYSTEM ROSTER CREDITS */}
          {currentTab === 'credits' && (
            <div className="max-w-md mx-auto space-y-6 animate-view-fade py-4">
              <div>
                <h2 className="text-base font-semibold text-white">System Manifest &amp; Credits</h2>
                <p className="text-xs text-neutral-500 mt-0.5">Core frameworks utilized within the Abus3 environment console.</p>
              </div>

              <div className="bg-[#070707] border border-[#121212] rounded divide-y divide-[#121212]">
                <div className="p-3.5 flex items-center justify-between text-xs">
                  <span className="text-neutral-400">Main Console Architecture</span>
                  <span className="text-neutral-500 font-mono">Abus3 Software Systems</span>
                </div>
                <div className="p-3.5 flex items-center justify-between text-xs">
                  <span className="text-neutral-400">Upstream Hook references</span>
                  <a href="https://github.com/mcaron/minescript" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white flex items-center gap-1 transition-colors">
                    mcaron / minescript <IconExternalLink />
                  </a>
                </div>
                <div className="p-3.5 flex items-center justify-between text-xs">
                  <span className="text-neutral-400">Component Styling Compiler</span>
                  <span className="text-neutral-500 font-mono">Tailwind Utility Engine Spec</span>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* FOOTER CORE SIGNATURE CONTAINER */}
      <footer className="h-10 border-t border-[#121212] bg-[#070707] px-6 flex items-center justify-center text-[9px] font-mono tracking-widest text-neutral-600 uppercase shrink-0">
        Abus3 Development
      </footer>
    </div>
  );
}
