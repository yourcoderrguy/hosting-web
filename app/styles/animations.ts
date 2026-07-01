// Global keyframes injected once via <GlobalStyles /> in app/page.tsx.
// Keep this as the single source of truth so no component re-declares
// the same @keyframes block.
export const globalKeyframes = `
  @keyframes pulse  { 0%,100%{opacity:1} 50%{opacity:0.4} }
  @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
  @keyframes spin   { to{transform:rotate(360deg)} }
  * { box-sizing: border-box; }
  body { margin: 0; }
`;
