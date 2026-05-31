"use client";

import React, { useState, useEffect } from 'react';

// --- INLINE SVG ICONS ---
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

export default function MinescriptGenerator() {
  // Config state keys
  const [text, setText] = useState('MINE');
  const [numFrames, setNumFrames] = useState(100);
  const [delay, setDelay] = useState(1.2);
  const [speed, setSpeed] = useState(2);
  
  // Multi-formatting token selections
  const [formats, setFormats] = useState({
    italic: true,    // &o
    underline: false, // &n
    strikethrough: false, // &m
  });

  const [generatedCode, setGeneratedCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [previewFrame, setPreviewFrame] = useState(0);
  const [previewText, setPreviewText] = useState('');

  // Computed compound format token (e.g. "&o&n")
  const getFormatString = () => {
    let token = '';
    if (formats.italic) token += '&o';
    if (formats.underline) token += '&n';
    if (formats.strikethrough) token += '&m';
    return token;
  };

  // Safe input handlers maintaining system minimum/maximum specs
  const handleFrameChange = (val: number) => {
    let checked = Math.max(2, val);
    if (checked > 100) checked = 100; // Cap at 100 frames max
    setNumFrames(checked);
  };

  const handleDelayChange = (val: number) => {
    let checked = Math.max(1.2, val); // Floor logic at 1.2s minimum
    setDelay(checked);
  };

  // Helper insertion function for invisible Unicode payloads
  const injectSpecialChar = (unicodeStr: string) => {
    setText(prev => prev + unicodeStr);
  };

  // Match Python HSL system color configurations
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

  // Python text output structural composition calculation
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

  // Handle active rendering ticks for DOM visual sandbox
  useEffect(() => {
    const interval = setInterval(() => {
      setPreviewFrame((prev) => (prev + 1) % (numFrames || 1));
    }, delay * 110); // Local playback step logic normalized configuration
    return () => clearInterval(interval);
  }, [numFrames, delay]);

  // Format visibility preview builder
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
      // Decode hidden characters visually inside our UI matrix so they are discoverable
      let charDisplay = text[i];
      let isSpecial = false;
      
      if (charDisplay === '\u200C') { charDisplay = '❲ZWNJ❳'; isSpecial = true; }
      else if (charDisplay === '\u200B') { charDisplay = '❲ZWSP❳'; isSpecial = true; }
      else if (charDisplay === '\u2060') { charDisplay = '❲WJ❳'; isSpecial = true; }

      const styles = `
        color: ${isSpecial ? '#666666' : color};
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
    <div className="min-h-screen bg-[#0A0A0A] text-[#E5E5E5] p-6 flex flex-col items-center justify-center selection:bg-[#252525]" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <div className="w-full max-w-4xl space-y-8">
        
        {/* Navbar */}
        <header className="border-b border-[#1A1A1A] pb-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-white flex items-center gap-2">
              <IconTerminal /> Minescript Engine Matrix
            </h1>
            <p className="text-xs text-neutral-500 mt-1">Configurator optimized for custom structures and invisible padding rules.</p>
          </div>
        </header>

        {/* Workspace Panels */}
        <main className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Controls Segment */}
          <section className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-2 text-sm font-medium text-white mb-2">
              <IconSettings /> Configuration Matrix
            </div>
            
            <div className="space-y-4 bg-[#121212] p-5 rounded border border-[#1A1A1A]">
              {/* String Input */}
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1.5">Prefix Plain Text</label>
                <input 
                  type="text" 
                  value={text} 
                  onChange={(e) => setText(e.target.value)}
                  className="w-full bg-[#181818] border border-[#252525] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500 transition-colors"
                />
              </div>

              {/* Invisible Character Injection Toolbar */}
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1.5">Inject Invisible Unicode Characters</label>
                <div className="grid grid-cols-3 gap-1.5">
                  <button 
                    onClick={() => injectSpecialChar('\u200C')}
                    className="bg-[#181818] border border-[#252525] hover:border-neutral-500 px-2 py-1.5 text-[10px] rounded text-neutral-300 transition-colors text-center"
                    title="Zero Width Non-Joiner"
                  >
                    + ZWNJ
                  </button>
                  <button 
                    onClick={() => injectSpecialChar('\u200B')}
                    className="bg-[#181818] border border-[#252525] hover:border-neutral-500 px-2 py-1.5 text-[10px] rounded text-neutral-300 transition-colors text-center"
                    title="Zero Width Space"
                  >
                    + ZWSP
                  </button>
                  <button 
                    onClick={() => injectSpecialChar('\u2060')}
                    className="bg-[#181818] border border-[#252525] hover:border-neutral-500 px-2 py-1.5 text-[10px] rounded text-neutral-300 transition-colors text-center"
                    title="Word Joiner"
                  >
                    + WJ
                  </button>
                </div>
              </div>

              {/* Numerical Control Matrix */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-medium text-neutral-400">Total Frames</label>
                    <span className="text-[10px] text-neutral-600">Max 100</span>
                  </div>
                  <input 
                    type="number" 
                    value={numFrames} 
                    max={100}
                    onChange={(e) => handleFrameChange(parseInt(e.target.value) || 0)}
                    className="w-full bg-[#181818] border border-[#252525] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500 transition-colors"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-medium text-neutral-400">Delay (Sec)</label>
                    <span className="text-[10px] text-neutral-600">Min 1.2</span>
                  </div>
                  <input 
                    type="number" 
                    step="0.1" 
                    value={delay}
                    onChange={(e) => handleDelayChange(parseFloat(e.target.value) || 0)}
                    className="w-full bg-[#181818] border border-[#252525] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500 transition-colors"
                  />
                </div>
              </div>

              {/* Bounce Velocity Input */}
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1.5">Bounce Animation Speed</label>
                <input 
                  type="number" 
                  value={speed} 
                  onChange={(e) => setSpeed(Math.max(1, parseInt(e.target.value) || 0))}
                  className="w-full bg-[#181818] border border-[#252525] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500 transition-colors"
                />
              </div>

              {/* Multi-Format Block Option Layers */}
              <div className="pt-2 border-t border-[#1A1A1A]">
                <label className="block text-xs font-medium text-neutral-400 mb-2">Active Format Code Layers</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={formats.italic}
                      onChange={(e) => setFormats(prev => ({...prev, italic: e.target.checked}))}
                      className="accent-neutral-500 rounded bg-[#181818] border-[#252525]"
                    />
                    <span>Italic Code (<span className="text-neutral-500">&amp;o</span>)</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={formats.underline}
                      onChange={(e) => setFormats(prev => ({...prev, underline: e.target.checked}))}
                      className="accent-neutral-500 rounded bg-[#181818] border-[#252525]"
                    />
                    <span>Underline Code (<span className="text-neutral-500">&amp;n</span>)</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={formats.strikethrough}
                      onChange={(e) => setFormats(prev => ({...prev, strikethrough: e.target.checked}))}
                      className="accent-neutral-500 rounded bg-[#181818] border-[#252525]"
                    />
                    <span>Strikethrough Code (<span className="text-neutral-500">&amp;m</span>)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Live Visual Sandbox Terminal Rendering */}
            <div className="bg-[#121212] p-5 rounded border border-[#1A1A1A] space-y-3">
              <div className="flex items-center justify-between text-xs font-medium text-neutral-400">
                <span className="flex items-center gap-1.5"><IconEye /> Realtime Sandbox Monitor</span>
                <span className="text-neutral-600 font-mono">F: {previewFrame + 1}/{numFrames}</span>
              </div>
              <div className="bg-black/40 border border-[#1A1A1A] p-4 rounded text-center font-mono tracking-wider h-14 flex items-center justify-center text-lg overflow-hidden">
                <div dangerouslySetInnerHTML={{ __html: previewText || '...' }} />
              </div>
            </div>
          </section>

          {/* Compiled Output Artifact Column */}
          <section className="md:col-span-7 flex flex-col space-y-2">
            <div className="flex items-center justify-between text-sm font-medium text-white mb-1">
              <span className="flex items-center gap-2"><IconCode /> Generated Script Output</span>
              <button 
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white bg-[#121212] hover:bg-[#1A1A1A] border border-[#1A1A1A] px-2.5 py-1 rounded transition-all active:scale-[0.98]"
              >
                {copied ? (
                  <>
                    <IconCheck />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <IconCopy />
                    <span>Copy Script</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex-1 bg-[#121212] border border-[#1A1A1A] rounded p-4 font-mono text-xs overflow-auto max-h-[490px] text-neutral-300 leading-relaxed custom-scrollbar">
              <pre className="whitespace-pre">{generatedCode}</pre>
            </div>
          </section>

        </main>

        <footer className="text-center text-[11px] text-neutral-600 pt-4 border-t border-[#1A1A1A]">
          Ensure your native implementation framework accommodates raw Unicode multi-byte characters accurately.
        </footer>
      </div>
    </div>
  );
}
