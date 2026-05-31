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

export default function AppMainLayout() {
  // Navigation Tabs state routing
  const [currentTab, setCurrentTab] = useState<'home' | 'generator' | 'plugins' | 'credits'>('home');

  // Input control states
  const [prefixText, setPrefixText] = useState('MINE');
  const [totalFrames, setTotalFrames] = useState(100);
  const [animationDelay, setAnimationDelay] = useState(1.2);
  const [animationSpeed, setAnimationSpeed] = useState(2);
  const [textFormats, setTextFormats] = useState({ italic: true, underline: false, strikethrough: false });

  // Generated code and preview helper states
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

  // Build generated Python script file matching settings criteria
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

  // Handle active rendering ticks for continuous sandbox element animation
  useEffect(() => {
    const playTicker = setInterval(() => {
      setCurrentPreviewFrame((previousFrame) => (previousFrame + 1) % (totalFrames || 1));
    }, animationDelay * 110);
    return () => clearInterval(playTicker);
  }, [totalFrames, animationDelay]);

  // Build safe HTML string inside dashboard visualization terminal
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
    <div className="min-h-screen bg-[#060606] text-[#CECECE] flex flex-col selection:bg-[#222222]" style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system, sans-serif" }}>
      
      {/* Global Scrollbars and View Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scroll::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scroll::-webkit-scrollbar-track { background: #0a0a0a; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #1f1f1f; border-radius: 2px; }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: #2d2d2d; }
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        @keyframes viewFadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes wrapperSlideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes glowPulseSlow { 0%, 100% { opacity: 0.25; } 50% { opacity: 0.4; } }
        .animate-view-fade { animation: viewFadeIn 0.4s ease forwards; }
        .animate-wrapper-slide { animation: wrapperSlideUp 0.6s ease forwards; }
        .animate-glow-pulse { animation: glowPulseSlow 4s ease-in-out infinite; }
      `}} />

      {/* TOPBAR NAVIGATION HEADER */}
      <nav className="sticky top-0 z-50 bg-[#060606]/80 backdrop-blur-md border-b border-[#141414] px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentTab('home')}>
          <div className="w-5 h-5 rounded bg-white flex items-center justify-center text-black font-mono font-bold text-xs shadow-sm">M</div>
          <span className="text-sm font-semibold tracking-tight text-[#EDEDED]">Minescript Hub</span>
        </div>
        
        {/* Navigation Menu Selection Toolbar */}
        <div className="flex items-center gap-1">
          {(['home', 'generator', 'plugins', 'credits'] as const).map((tabName) => (
            <button
              key={tabName}
              type="button"
              onClick={() => setCurrentTab(tabName)}
              className={`text-xs px-3 py-1.5 rounded font-medium capitalize tracking-wide transition-all ${currentTab === tabName ? 'bg-[#121212] text-white border border-[#1f1f1f]' : 'text-neutral-500 hover:text-neutral-200 border border-transparent'}`}
            >
              {tabName === 'generator' ? 'Prefix Builder' : tabName === 'plugins' ? 'My Plugins' : tabName}
            </button>
          ))}
        </div>
      </nav>

      {/* INTERACTIVE COMPONENT MOUNT POINT */}
      <div className="flex-1 max-w-5xl w-full mx-auto p-6 md:p-10 flex flex-col justify-center relative">
        
        {/* Ambient background styling layer */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-neutral-800/10 rounded-full blur-[120px] pointer-events-none animate-glow-pulse" />

        {/* TAB LAYER 1: HOMEPAGE INTRO HERO SECTION */}
        {currentTab === 'home' && (
          <div className="space-y-10 py-8 animate-wrapper-slide text-center md:text-left max-w-2xl mx-auto">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#0d0d0d] border border-[#161616] text-[11px] font-medium tracking-wide text-neutral-400 uppercase">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Live Utility Terminal
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
                Animate Your Chat Layouts <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-100 to-neutral-400">With Automated Code Blocks</span>
              </h1>
              <p className="text-sm text-neutral-500 leading-relaxed max-w-xl mx-auto md:mx-0">
                A custom dashboard designed to configure, generate, and build lightweight python scripts for chat styling configurations.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3">
              <button
                type="button"
                onClick={() => setCurrentTab('generator')}
                className="w-full sm:w-auto bg-white hover:bg-neutral-200 text-black text-xs font-semibold px-5 py-2.5 rounded shadow-sm transition-all active:scale-[0.98]"
              >
                Open Prefix Builder
              </button>
              <button
                type="button"
                onClick={() => setCurrentTab('plugins')}
                className="w-full sm:w-auto bg-[#0d0d0d] hover:bg-[#121212] border border-[#1c1c1c] hover:border-neutral-700 text-neutral-300 text-xs font-semibold px-5 py-2.5 rounded transition-all active:scale-[0.98]"
              >
                View Plugin Downloads
              </button>
            </div>
          </div>
        )}

        {/* TAB LAYER 2: MINESCRIPT BUILDER PANEL */}
        {currentTab === 'generator' && (
          <div className="space-y-6 animate-view-fade">
            <div>
              <h2 className="text-lg font-medium text-white">Prefix Style Setup Terminal</h2>
              <p className="text-xs text-neutral-500 mt-0.5">Customize lines, text speed parameters, and specific padding elements below.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Variable control box section */}
              <section className="md:col-span-5 space-y-5">
                <div className="space-y-4 bg-[#0c0c0c] p-5 rounded border border-[#141414]">
                  <div>
                    <label className="block text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-1.5">Text String</label>
                    <input 
                      type="text" 
                      value={prefixText} 
                      onChange={(e) => setPrefixText(e.target.value)}
                      className="w-full bg-[#040404] border border-[#1a1a1a] rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-600 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-1.5">Inject Hidden Padding Characters</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      { [['\u200C', 'ZWNJ'], ['\u200B', 'ZWSP'], ['\u2060', 'WJ']].map(([character, labelName]) => (
                        <button 
                          key={labelName}
                          type="button"
                          onClick={() => handleCharacterInjection(character)}
                          className="bg-[#040404] border border-[#1a1a1a] hover:border-neutral-600 px-2 py-1.5 text-[10px] rounded text-neutral-400 transition-all active:scale-95"
                        >
                          + {labelName}
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
                        <input type="number" value={totalFrames} onChange={(e) => handleFrameChange(parseInt(e.target.value) || 0)} className="w-full bg-transparent px-3 py-2 text-xs text-white focus:outline-none" />
                        <div className="flex flex-col border-l border-[#1a1a1a] h-full">
                          <button type="button" onClick={() => handleFrameChange(totalFrames + 1)} className="p-1 text-neutral-500 hover:text-neutral-200 hover:bg-[#0d0d0d] transition-all"><IconChevronUp /></button>
                          <button type="button" onClick={() => handleFrameChange(totalFrames - 1)} className="p-1 border-t border-[#1a1a1a] text-neutral-500 hover:text-neutral-200 hover:bg-[#0d0d0d] transition-all"><IconChevronDown /></button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">Delay Step</label>
                        <span className="text-[9px] text-neutral-600">Min 1.2s</span>
                      </div>
                      <div className="relative flex items-center bg-[#040404] border border-[#1a1a1a] rounded focus-within:border-neutral-600 transition-all">
                        <input type="number" step="0.1" value={animationDelay} onChange={(e) => handleDelayChange(parseFloat(e.target.value) || 0)} className="w-full bg-transparent px-3 py-2 text-xs text-white focus:outline-none" />
                        <div className="flex flex-col border-l border-[#1a1a1a] h-full">
                          <button type="button" onClick={() => handleDelayChange(animationDelay + 0.1)} className="p-1 text-neutral-500 hover:text-neutral-200 hover:bg-[#0d0d0d] transition-all"><IconChevronUp /></button>
                          <button type="button" onClick={() => handleDelayChange(animationDelay - 0.1)} className="p-1 border-t border-[#1a1a1a] text-neutral-500 hover:text-neutral-200 hover:bg-[#0d0d0d] transition-all"><IconChevronDown /></button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-1.5">Wave Velocity Speed</label>
                    <div className="relative flex items-center bg-[#040404] border border-[#1a1a1a] rounded focus-within:border-neutral-600 transition-all">
                      <input type="number" value={animationSpeed} onChange={(e) => setAnimationSpeed(Math.max(1, parseInt(e.target.value) || 0))} className="w-full bg-transparent px-3 py-2 text-xs text-white focus:outline-none" />
                      <div className="flex flex-col border-l border-[#1a1a1a] h-full">
                        <button type="button" onClick={() => setAnimationSpeed(animationSpeed + 1)} className="p-1 text-neutral-500 hover:text-neutral-200 hover:bg-[#0d0d0d] transition-all"><IconChevronUp /></button>
                        <button type="button" onClick={() => setAnimationSpeed(Math.max(1, animationSpeed - 1))} className="p-1 border-t border-[#1a1a1a] text-neutral-500 hover:text-neutral-200 hover:bg-[#0d0d0d] transition-all"><IconChevronDown /></button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#141414]">
                    <label className="block text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-2">Text Formatting Switches</label>
                    <div className="space-y-2">
                      {(Object.keys(textFormats) as Array<keyof typeof textFormats>).map((formatKey) => (
                        <div key={formatKey} onClick={() => setTextFormats(previousFormats => ({ ...previousFormats, [formatKey]: !previousFormats[formatKey] }))} className="flex items-center gap-3 cursor-pointer group select-none py-0.5">
                          <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-all ${textFormats[formatKey] ? 'bg-white border-white text-black' : 'bg-transparent border-[#262626] group-hover:border-neutral-500'}`}>
                            {textFormats[formatKey] && <div className="w-1.5 h-1.5 bg-black rounded-sm" />}
                          </div>
                          <span className="text-xs text-neutral-400 group-hover:text-neutral-200 transition-colors capitalize">{formatKey}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Local Sandbox Terminal Display Window */}
                <div className="bg-[#0c0c0c] p-5 rounded border border-[#141414] space-y-3">
                  <div className="flex items-center justify-between text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">
                    <span className="flex items-center gap-1.5"><IconEye /> Text Preview Monitor</span>
                    <span className="text-neutral-600 font-mono">Frame: {currentPreviewFrame + 1}/{totalFrames}</span>
                  </div>
                  <div className="bg-[#040404] border border-[#141414] p-4 rounded text-center font-mono h-14 flex items-center justify-center text-base overflow-hidden">
                    <div dangerouslySetInnerHTML={{ __html: previewHtmlString || '...' }} />
                  </div>
                </div>
              </section>

              {/* Text Area Output Script Window Column */}
              <section className="md:col-span-7 flex flex-col space-y-2">
                <div className="flex items-center justify-between text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                  <span className="flex items-center gap-2"><IconCode /> Generated Script Output</span>
                  <button type="button" onClick={executeClipboardCopy} className="flex items-center gap-1.5 text-[11px] text-neutral-400 hover:text-white bg-[#0c0c0c] border border-[#141414] px-3 py-1 rounded transition-all hover:border-neutral-600 active:scale-95">
                    {isCopied ? <><IconCheck /><span className="text-neutral-300">Copied</span></> : <><IconCopy /><span>Copy Output</span></>}
                  </button>
                </div>
                <div className="flex-1 bg-[#0c0c0c] border border-[#141414] rounded p-4 font-mono text-xs overflow-auto max-h-[480px] text-neutral-400 leading-relaxed custom-scroll">
                  <pre className="whitespace-pre select-all">{outputCode}</pre>
                </div>
              </section>
            </div>
          </div>
        )}

        {/* TAB LAYER 3: PLUGINS SECTION */}
        {currentTab === 'plugins' && (
          <div className="space-y-6 animate-view-fade max-w-2xl mx-auto w-full">
            <div>
              <h2 className="text-lg font-medium text-white">Plugin Repository</h2>
              <p className="text-xs text-neutral-500 mt-0.5">Download custom server chat tools and utilities.</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="bg-[#0c0c0c] border border-[#141414] hover:border-[#1f1f1f] p-5 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300 group">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-white tracking-tight">PrefixCore Utility Extension</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#161616] border border-[#222] font-mono text-neutral-400">v1.4.0</span>
                  </div>
                  <p className="text-xs text-neutral-500 max-w-md leading-relaxed">
                    Processes asynchronous layout strings instantly. Includes custom character translation filters.
                  </p>
                </div>
                <div>
                  <a 
                    href="#" 
                    className="inline-flex items-center gap-2 bg-white hover:bg-neutral-200 text-black text-xs font-semibold px-4 py-2 rounded transition-all group-hover:translate-x-0.5"
                    onClick={(e) => e.preventDefault()}
                  >
                    <IconDownload /> Download .JAR
                  </a>
                </div>
              </div>

              <div className="bg-[#0c0c0c] border border-[#141414] p-5 rounded opacity-60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-neutral-300 tracking-tight">Packet Interceptor Hook</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#161616] font-mono text-neutral-500">Upcoming</span>
                  </div>
                  <p className="text-xs text-neutral-500 max-w-sm">
                    Inbound packet diagnostic manager tool with modular channel layouts.
                  </p>
                </div>
                <div className="text-[11px] text-neutral-600 font-medium italic tracking-wider">
                  In Development
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB LAYER 4: CREDITS PAGE */}
        {currentTab === 'credits' && (
          <div className="space-y-6 animate-view-fade max-w-xl mx-auto w-full">
            <div>
              <h2 className="text-lg font-medium text-white">App Credits</h2>
              <p className="text-xs text-neutral-500 mt-0.5">Project credits and module dependencies used to construct the interface.</p>
            </div>

            <div className="bg-[#0c0c0c] border border-[#141414] rounded divide-y divide-[#141414]">
              <div className="p-4 flex items-center justify-between text-xs">
                <span className="font-semibold text-neutral-300">Lead Frontend Developer</span>
                <span className="text-neutral-500 font-mono">Core Engineering Team</span>
              </div>
              <div className="p-4 flex items-center justify-between text-xs">
                <span className="font-semibold text-neutral-300">Minescript API Hook Reference</span>
                <a href="https://github.com/mcaron/minescript" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white flex items-center gap-1 transition-colors">
                  mcaron / minescript <IconExternalLink />
                </a>
              </div>
              <div className="p-4 flex items-center justify-between text-xs">
                <span className="font-semibold text-neutral-300">UI Framework Library</span>
                <span className="text-neutral-500 font-mono">Tailwind Utility Engine CSS Specification</span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* FOOTER */}
      <footer className="text-center text-[10px] text-neutral-700 py-6 border-t border-[#141414] tracking-wider uppercase">
        Application Utilities System Layout Portal
      </footer>
    </div>
  );
}
