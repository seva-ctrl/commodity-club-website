/* global React */
const { useState: usePrimState } = React;

function Button({ variant = 'primary', size, children, onClick, as = 'button', href, icon, style, ...rest }) {
  const cls = ['btn', `btn--${variant}`, size ? `btn--${size}` : ''].join(' ').trim();
  if (as === 'a') return <a className={cls} href={href} onClick={onClick} style={style} {...rest}>{icon}{children}</a>;
  return <button className={cls} onClick={onClick} style={style} {...rest}>{icon}{children}</button>;
}

function Label({ children, color, style }) {
  return <div className="label-upper" style={{ color, ...style }}>{children}</div>;
}

function BrassRule({ style, width = 40 }) {
  return <div style={{ width, height: 2, background: '#C49A3E', ...style }} />;
}

function HairRule({ tone = 'light', style }) {
  return <div style={{ height: 1, background: tone === 'dark' ? 'rgba(255,255,255,0.14)' : '#D8D4CC', border: 0, ...style }} />;
}

function Chip({ children, variant = 'outline', style }) {
  const base = {
    fontSize: 11, letterSpacing: '1px', textTransform: 'uppercase',
    padding: '5px 10px', borderRadius: 2, fontWeight: 400, display: 'inline-block'
  };
  const styles = {
    solid:   { background: '#132531', color: '#fff' },
    outline: { background: 'transparent', color: '#132531', border: '1px solid #132531' },
    brass:   { background: '#C49A3E', color: '#132531' },
    good:    { background: '#2E6B3E', color: '#fff' },
    warn:    { background: '#D89A2B', color: '#132531' },
    urgent:  { background: '#C8321E', color: '#fff' },
    muted:   { background: '#ECE8DF', color: '#6B6B6B' },
    darkOutline: { background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.35)' },
  };
  return <span style={{ ...base, ...styles[variant], ...style }}>{children}</span>;
}

// Editorial image with grayscale filter for B&W tone required by design system
function EditorialImage({ src, alt = '', aspect = '16 / 9', style, overlay = false, grayscale = true }) {
  return (
    <div style={{ position: 'relative', aspectRatio: aspect, overflow: 'hidden', background: '#132531', ...style }}>
      <img src={src} alt={alt} style={{
        width: '100%', height: '100%', objectFit: 'cover', display: 'block',
        filter: grayscale ? 'grayscale(100%) contrast(1.05)' : 'none',
      }} />
      {overlay && <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(6,15,22,0.25) 0%, rgba(6,15,22,0.75) 100%)' }} />}
    </div>
  );
}

// Navy/void placeholder for when imagery isn't available
function ImagePlaceholder({ label, aspect = '16 / 9', tone = 'dark', style, children }) {
  const bg = tone === 'dark'
    ? 'linear-gradient(135deg, #060F16 0%, #132531 60%, #1E3A4C 100%)'
    : 'linear-gradient(135deg, #1E3A4C 0%, #2E2E2E 100%)';
  return (
    <div style={{ position: 'relative', aspectRatio: aspect, background: bg, width: '100%', overflow: 'hidden', ...style }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.04), transparent 60%)' }} />
      <div style={{ position: 'absolute', left: 16, bottom: 14, fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: '#BFBFBF' }}>
        IMAGE — {label}
      </div>
      {children}
    </div>
  );
}

function ArrowIcon({ size = 12, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" style={{ display: 'inline-block', ...style }}>
      <path d="M2 10L10 2M10 2H3.5M10 2V8.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
    </svg>
  );
}

Object.assign(window, { Button, Label, BrassRule, HairRule, Chip, EditorialImage, ImagePlaceholder, ArrowIcon });
