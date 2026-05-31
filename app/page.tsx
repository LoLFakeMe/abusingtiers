"use client";

import React, { useState, useEffect } from 'react';

// --- CUSTOM SVG ICONS (Lucide Style Fallbacks) ---
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

export default function MinescriptGenerator() {
  const [text, setText] = useState('MINE');
  const [numFrames, setNumFrames] = useState(100);
  const [delay, setDelay] = useState(1.2);
  const [speed, setSpeed] = useState(2);
  
  const [formats, setFormats] = useState({
    italic: true,
    underline: false,
    strikethrough: false,
  });

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
fmt        = "${fmtStr}"  # Multi-format layer assignment

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
    <div className="min-h-screen bg-[#070707] text-[#D4D4D4] p-6 flex flex-col items-center justify-center selection:bg-[#222]" style={{ fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif" }}>
      
      {/* Dynamic Global Scrollbar Styling */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scroll::-webkit-scrollbar { width: 5px; height: 5px; }
        .custom-scroll::-webkit-scrollbar-track { background: #0e0e0e; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #222; border-radius: 2px; }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: #333; }
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type="number"] { -moz-appearance: textfield; }
      `}} />

      <div className="w-full max-w-4xl space-y-8 animate-fade-in">
        
        {/* Header */}
        <header className="border-b border-[#161616] pb-5 flex items-center justify-between transition-all duration-300">
          <div>
            <h1 className="text-lg font-medium tracking-tight text-[#f3f3f3] flex items-center gap-2">
              <IconTerminal /> Minescript Matrix Config
            </h1>
            <p className="text-xs text-neutral-600 mt-0.5">Minimalist engine configuration.</p>
          </div>
        </header>

        {/* Core Layout Panels */}
        <main className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Settings Segment */}
          <section className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400 tracking-wider uppercase mb-1">
              <IconSettings /> Variables
            </div>
            
            <div className="space-y-4 bg-[#0d0d0d] p-5 rounded border border-[#161616] hover:border-[#222] transition-colors duration-300">
              {/* String Value */}
              <div>
                <label className="block text-[11px] font-medium text-neutral-500 uppercase tracking-wider mb-1.5">Prefix Text</label>
                <input 
                  type="text" 
                  value={text} 
                  onChange={(e) => setText(e.target.value)}
                  className="w-full bg-[#050505] border border-[#1c1c1c] rounded px-3 py-2 text-sm text-[#f3f3f3] focus:outline-none focus:border-neutral-600 transition-all duration-200"
                />
              </div>

              {/* Invisible Unicode Blocks */}
              <div>
                <label className="block text-[11px] font-medium text-neutral-500 uppercase tracking-wider mb-1.5">Inject Invisibles</label>
                <div className="grid grid-cols-3 gap-1.5">
                  { [['\u200C', 'ZWNJ'], ['\u200B', 'ZWSP'], ['\u2060', 'WJ']].map(([char, name]) => (
                    <button 
                      key={name}
                      type="button"
                      onClick={() => injectSpecialChar(char)}
                      className="bg-[#050505] border border-[#1c1c1c] hover:border-neutral-600 px-2 py-1.5 text-[10px] rounded text-neutral-400 transition-all duration-200 active:scale-95"
                    >
                      + {name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Advanced Custom Stepper Arrays */}
              <div className="grid grid-cols-2 gap-3">
                {/* Total Frames Box */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider">Frames</label>
                    <span className="text-[9px] text-neutral-600">Max 100</span>
                  </div>
                  <div className="relative flex items-center bg-[#050505] border border-[#1c1c1c] rounded focus-within:border-neutral-600 transition-all duration-200">
                    <input 
                      type="number" 
                      value={numFrames} 
                      max={100}
                      onChange={(e) => handleFrameChange(parseInt(e.target.value) || 0)}
                      className="w-full bg-transparent px-3 py-2 text-sm text-[#f3f3f3] focus:outline-none"
                    />
                    <div className="flex flex-col border-l border-[#1c1c1c] h-full">
                      <button type="button" onClick={() => handleFrameChange(numFrames + 1)} className="p-1 text-neutral-500 hover:text-neutral-200 hover:bg-[#111] transition-all rounded-tr active:scale-90"><IconChevronUp /></button>
                      <button type="button" onClick={() => handleFrameChange(numFrames - 1)} className="p-1 border-t border-[#1c1c1c] text-neutral-500 hover:text-neutral-200 hover:bg-[#111] transition-all rounded-br active:scale-90"><IconChevronDown /></button>
                    </div>
                  </div>
                </div>

                {/* Delay Speed Box */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider">Delay</label>
                    <span className="text-[9px] text-neutral-600">Min 1.2</span>
                  </div>
                  <div className="relative flex items-center bg-[#050505] border border-[#1c1c1c] rounded focus-within:border-neutral-600 transition-all duration-200">
                    <input 
                      type="number" 
                      step="0.1" 
                      value={delay}
                      onChange={(e) => handleDelayChange(parseFloat(e.target.value) || 0)}
                      className="w-full bg-transparent px-3 py-2 text-sm text-[#f3f3f3] focus:outline-none"
                    />
                    <div className="flex flex-col border-l border-[#1c1c1c] h-full">
                      <button type="button" onClick={() => handleDelayChange(delay + 0.1)} className="p-1 text-neutral-500 hover:text-neutral-200 hover:bg-[#111] transition-all rounded-tr active:scale-90"><IconChevronUp /></button>
                      <button type="button" onClick={() => handleDelayChange(delay - 0.1)} className="p-1 border-t border-[#1c1c1c] text-neutral-500 hover:text-neutral-200 hover:bg-[#111] transition-all rounded-br active:scale-90"><IconChevronDown /></button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bounce Speed custom stepper */}
              <div>
                <label className="block text-[11px] font-medium text-neutral-500 uppercase tracking-wider mb-1.5">Animation Velocity</label>
                <div className="relative flex items-center bg-[#050505] border border-[#1c1c1c] rounded focus-within:border-neutral-600 transition-all duration-200">
                  <input 
                    type="number" 
                    value={speed} 
                    onChange={(e) => setSpeed(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full bg-transparent px-3 py-2 text-sm text-[#f3f3f3] focus:outline-none"
                  />
                  <div className="flex flex-col border-l border-[#1c1c1c] h-full">
                    <button type="button" onClick={() => setSpeed(speed + 1)} className="p-1 text-neutral-500 hover:text-neutral-200 hover:bg-[#111] transition-all active:scale-90"><IconChevronUp /></button>
                    <button type="button" onClick={() => setSpeed(Math.max(1, speed - 1))} className="p-1 border-t border-[#1c1c1c] text-neutral-500 hover:text-neutral-200 hover:bg-[#111] transition-all active:scale-90"><IconChevronDown /></button>
                  </div>
                </div>
              </div>

              {/* Completely Custom Formatter Toggles */}
              <div className="pt-3 border-t border-[#161616]">
                <label className="block text-[11px] font-medium text-neutral-500 uppercase tracking-wider mb-2.5">Minecraft Text Formats</label>
                <div className="space-y-2">
                  {(Object.keys(formats) as Array<keyof typeof formats>).map((key) => (
                    <div 
                      key={key}
                      onClick={() => setFormats(prev => ({ ...prev, [key]: !prev[key] }))}
                      className="flex items-center gap-3 cursor-pointer group select-none py-0.5"
                    >
                      {/* Custom Checkbox Frame */}
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all duration-200 ${formats[key] ? 'bg-neutral-200 border-neutral-200 text-black' : 'bg-transparent border-[#2c2c2c] group-hover:border-neutral-500'}`}>
                        {formats[key] && <div className="w-2 h-2 bg-black rounded-sm animate-[scaleIn_0.15s_ease-out]" />}
                      </div>
                      <span className="text-xs text-neutral-400 group-hover:text-neutral-200 transition-colors capitalize">
                        {key} <span className="text-neutral-600 text-[10px] font-mono">(&amp;{key === 'italic' ? 'o' : key === 'underline' ? 'n' : 'm'})</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Simulated Live Frame Output Monitor */}
            <div className="bg-[#0d0d0d] p-5 rounded border border-[#161616] space-y-3 hover:border-[#222] transition-colors duration-300">
              <div className="flex items-center justify-between text-[11px] font-medium text-neutral-500 tracking-wider uppercase">
                <span className="flex items-center gap-1.5"><IconEye /> Sandbox Monitor</span>
                <span className="text-neutral-600 font-mono">Frame: {previewFrame + 1}/{numFrames}</span>
              </div>
              <div className="bg-[#040404] border border-[#161616] p-4 rounded text-center font-mono tracking-wider h-14 flex items-center justify-center text-lg overflow-hidden relative">
                <div className="relative z-10" dangerouslySetInnerHTML={{ __html: previewText || '...' }} />
              </div>
            </div>
          </section>

          {/* Code Generation Terminal Panel */}
          <section className="md:col-span-7 flex flex-col space-y-2 animate-[slideUp_0.4s_ease-out]">
            <div className="flex items-center justify-between text-xs font-semibold text-neutral-400 tracking-wider uppercase mb-1">
              <span className="flex items-center gap-2"><IconCode /> Executable Blueprint</span>
              <button 
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-[11px] text-neutral-400 hover:text-[#f3f3f3] bg-[#0d0d0d] border border-[#161616] px-3 py-1 rounded transition-all duration-200 hover:border-neutral-600 active:scale-[0.97]"
              >
                {copied ? (
                  <>
                    <IconCheck />
                    <span className="text-neutral-200">Copied</span>
                  </>
                ) : (
                  <>
                    <IconCopy />
                    <span>Copy Script</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex-1 bg-[#0d0d0d] border border-[#161616] hover:border-[#222] transition-colors duration-300 rounded p-4 font-mono text-xs overflow-auto max-h-[505px] text-neutral-400 leading-relaxed custom-scroll">
              <pre className="whitespace-pre select-all text-[#a6a6a6]">{generatedCode}</pre>
            </div>
          </section>

        </main>

        <footer className="text-center text-[10px] text-neutral-700 pt-2 border-t border-[#161616] tracking-wider uppercase">
          Minescript Local Python Client Framework Module Target
        </footer>
      </div>
    </div>
  );
}
