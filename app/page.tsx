import React, { useState, useEffect } from 'react';
import { Copy, Check, Settings, Code, Sparkles, Terminal, RefreshCw } from 'lucide-react';

export default function MinescriptGenerator() {
  // State management for generator configuration
  const [text, setText] = useState('MINE');
  const [numFrames, setNumFrames] = useState(100);
  const [delay, setDelay] = useState(1.2);
  const [format, setFormat] = useState('&o');
  const [speed, setSpeed] = useState(2);
  
  const [generatedCode, setGeneratedCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [previewFrame, setPreviewFrame] = useState(0);
  const [previewText, setPreviewText] = useState('');

  // HSL to HEX helper logic matching the Python backend script logic
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

    return `#${Math.floor((r + m) * 255).toString(16).padStart(2, '0').toUpperCase()}${Math.floor((g + m) * 255).toString(16).padStart(2, '0').toUpperCase()}${Math.floor((b + m) * 255).toString(16).padStart(2, '0').toUpperCase()}`;
  };

  // Generate Python Script & Live Preview String
  useEffect(() => {
    // Generate Code template dynamically stringified
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
fmt        = "${format}"  # Custom formatting active

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
  }, [text, numFrames, delay, format, speed]);

  // Handle Live Frame Preview Loop simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setPreviewFrame((prev) => (prev + 1) % numFrames);
    }, delay * 150); // Normalized speed preview step

    return () => clearInterval(interval);
  }, [numFrames, delay]);

  // Live calculation of preview frame parsing mock Minecraft syntax
  useEffect(() => {
    if (!text.length) return;
    const t = previewFrame / (numFrames - 1 || 1);
    const t_pp = 1 - Math.abs(2 * t - 1);
    const color = hslToHex(t_pp * 300, 1.0, 0.5);

    const k_val = (previewFrame * speed / (numFrames - 1 || 1)) % 2.0;
    const k_bounce = 1 - Math.abs(k_val - 1);
    const k_pos = Math.floor(k_bounce * (text.length - 0.001));

    // Convert raw structural logic to CSS color inline indicators
    let textStructure = '';
    for (let i = 0; i < text.length; i++) {
      if (i === k_pos) {
        textStructure += `<span style="color: ${color}; font-weight: bold; font-style: ${format.includes('&o') ? 'italic' : 'normal'}">${text[i]}</span>`;
      } else {
        textStructure += `<span style="color: ${color}; font-style: ${format.includes('&o') ? 'italic' : 'normal'}">${text[i]}</span>`;
      }
    }
    setPreviewText(textStructure);
  }, [previewFrame, text, numFrames, speed, format]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E5E5E5] p-6 flex flex-col items-center justify-center selection:bg-[#252525]" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <div className="w-full max-w-4xl space-y-8">
        
        {/* Header Component */}
        <header className="border-b border-[#1A1A1A] pb-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-neutral-400" /> Minescript Prefix Engine
            </h1>
            <p className="text-xs text-neutral-500 mt-1">Minimalist template configuration & execution matrix.</p>
          </div>
          <div className="flex items-center gap-2 text-xs bg-[#121212] border border-[#1A1A1A] px-3 py-1.5 rounded text-neutral-400">
            <Sparkles className="w-3.5 h-3.5" /> Vercel Deployment Stable
          </div>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Controls Segment */}
          <section className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-2 text-sm font-medium text-white mb-2">
              <Settings className="w-4 h-4 text-neutral-400" /> Configuration Parameters
            </div>
            
            <div className="space-y-4 bg-[#121212] p-5 rounded border border-[#1A1A1A]">
              <div>
                <label className="block text-xs font-medium text-neutral-400 mb-1.5">Prefix Plain Text</label>
                <input 
                  type="text" 
                  value={text} 
                  onChange={(e) => setText(e.target.value)}
                  className="w-full bg-[#181818] border border-[#252525] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1.5">Total Frames</label>
                  <input 
                    type="number" 
                    value={numFrames} 
                    onChange={(e) => setNumFrames(Math.max(2, parseInt(e.target.value) || 0))}
                    className="w-full bg-[#181818] border border-[#252525] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1.5">Delay (Seconds)</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    value={delay} 
                    onChange={(e) => setDelay(Math.max(0.01, parseFloat(e.target.value) || 0))}
                    className="w-full bg-[#181818] border border-[#252525] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1.5">Bounce Speed</label>
                  <input 
                    type="number" 
                    value={speed} 
                    onChange={(e) => setSpeed(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full bg-[#181818] border border-[#252525] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-400 mb-1.5">Format Token</label>
                  <select 
                    value={format} 
                    onChange={(e) => setFormat(e.target.value)}
                    className="w-full bg-[#181818] border border-[#252525] rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500 transition-colors appearance-none"
                  >
                    <option value="&o">Italic (&amp;o)</option>
                    <option value="&n">Underline (&amp;n)</option>
                    <option value="">None</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Live Sandbox Render Simulator */}
            <div className="bg-[#121212] p-5 rounded border border-[#1A1A1A] space-y-3">
              <div className="flex items-center justify-between text-xs font-medium text-neutral-400">
                <span className="flex items-center gap-1.5"><RefreshCw className="w-3.5 h-3.5 animate-spin-slow" /> Terminal Preview Matrix</span>
                <span className="text-neutral-600">F: {previewFrame + 1}/{numFrames}</span>
              </div>
              <div className="bg-black/40 border border-[#1A1A1A] p-4 rounded text-center font-mono tracking-wider h-14 flex items-center justify-center text-lg">
                <div dangerouslySetInnerHTML={{ __html: previewText || '...' }} />
              </div>
            </div>
          </section>

          {/* Code Artifact output */}
          <section className="md:col-span-7 flex flex-col space-y-2">
            <div className="flex items-center justify-between text-sm font-medium text-white mb-1">
              <span className="flex items-center gap-2"><Code className="w-4 h-4 text-neutral-400" /> Generated Python Executable</span>
              <button 
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white bg-[#121212] hover:bg-[#1A1A1A] border border-[#1A1A1A] px-2.5 py-1 rounded transition-all active:scale-[0.98]"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex-1 bg-[#121212] border border-[#1A1A1A] rounded p-4 font-mono text-xs overflow-auto max-h-[410px] text-neutral-300 leading-relaxed custom-scrollbar">
              <pre className="whitespace-pre">{generatedCode}</pre>
            </div>
          </section>

        </main>

        <footer className="text-center text-[11px] text-neutral-600 pt-4 border-t border-[#1A1A1A]">
          Execute locally within your Minecraft environment containing the valid Python framework extension.
        </footer>
      </div>
    </div>
  );
}
