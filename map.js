// ── WORLD MAP (simplified SVG paths) ──
// Using approximate country positions as circles/blobs for the heatmap
// Real deployments would use TopoJSON/D3

const COUNTRY_POSITIONS = {
  NZ:  { x: 830, y: 430 }, AU:  { x: 780, y: 390 },
  JP:  { x: 790, y: 165 }, CN:  { x: 740, y: 175 },
  KR:  { x: 775, y: 168 }, SG:  { x: 760, y: 255 },
  IN:  { x: 670, y: 215 }, PH:  { x: 790, y: 235 },
  NO:  { x: 480, y: 80  }, SE:  { x: 490, y: 95  },
  FI:  { x: 505, y: 88  }, DK:  { x: 475, y: 108 },
  IS:  { x: 420, y: 72  }, NL:  { x: 468, y: 118 },
  DE:  { x: 480, y: 122 }, CH:  { x: 476, y: 130 },
  FR:  { x: 464, y: 132 }, GB:  { x: 455, y: 112 },
  IE:  { x: 445, y: 115 }, ES:  { x: 455, y: 145 },
  IT:  { x: 488, y: 140 }, PT:  { x: 444, y: 148 },
  EE:  { x: 510, y: 100 }, PL:  { x: 498, y: 115 },
  HU:  { x: 498, y: 125 }, IL:  { x: 545, y: 170 },
  SA:  { x: 570, y: 195 }, RU:  { x: 620, y: 110 },
  US:  { x: 175, y: 165 }, CA:  { x: 160, y: 120 },
  MX:  { x: 155, y: 205 }, BR:  { x: 270, y: 305 },
  AR:  { x: 240, y: 380 }, ZA:  { x: 530, y: 360 },
  NG:  { x: 490, y: 255 },
};

function initMap(metric) {
  const container = document.getElementById('world-map');
  if (!container) return;

  const W = 960, H = 480;
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svg.setAttribute('width', '100%');
  svg.style.background = 'transparent';

  // Ocean backdrop
  const ocean = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  ocean.setAttribute('width', W); ocean.setAttribute('height', H);
  ocean.setAttribute('rx', '8');
  ocean.style.fill = '#0d1117';
  svg.appendChild(ocean);

  // Grid lines
  for (let i = 0; i < 6; i++) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', 0); line.setAttribute('x2', W);
    line.setAttribute('y1', i*80); line.setAttribute('y2', i*80);
    line.style.stroke = 'rgba(255,255,255,0.03)';
    line.style.strokeWidth = '1';
    svg.appendChild(line);
  }
  for (let i = 0; i < 13; i++) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', i*80); line.setAttribute('x2', i*80);
    line.setAttribute('y1', 0); line.setAttribute('y2', H);
    line.style.stroke = 'rgba(255,255,255,0.03)';
    line.style.strokeWidth = '1';
    svg.appendChild(line);
  }

  // Country dots
  COUNTRIES.forEach(country => {
    const pos = COUNTRY_POSITIONS[country.code];
    if (!pos) return;

    let val = country[metric];
    if (metric === 'gdp') val = Math.min(100, val / 1000);
    if (val === undefined) val = country.overall;

    const color = scoreGradient(val);
    const radius = 8 + (val / 100) * 10;

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.style.cursor = 'pointer';

    // Glow
    const glow = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    glow.setAttribute('cx', pos.x); glow.setAttribute('cy', pos.y);
    glow.setAttribute('r', radius + 6);
    glow.style.fill = color;
    glow.style.opacity = '0.15';
    g.appendChild(glow);

    // Main dot
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', pos.x); circle.setAttribute('cy', pos.y);
    circle.setAttribute('r', radius);
    circle.style.fill = color;
    circle.style.opacity = '0.85';
    circle.style.transition = 'r 0.3s';
    g.appendChild(circle);

    // Label
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', pos.x); text.setAttribute('y', pos.y + radius + 12);
    text.setAttribute('text-anchor', 'middle');
    text.style.fill = 'rgba(255,255,255,0.6)';
    text.style.fontSize = '9px';
    text.style.fontFamily = 'Inter, sans-serif';
    text.style.pointerEvents = 'none';
    text.textContent = country.code;
    g.appendChild(text);

    // Hover
    g.addEventListener('mouseenter', (e) => {
      circle.setAttribute('r', radius + 3);
      circle.style.opacity = '1';
      showMapTooltip(e, country, val);
    });
    g.addEventListener('mouseleave', () => {
      circle.setAttribute('r', radius);
      circle.style.opacity = '0.85';
      hideMapTooltip();
    });
    g.addEventListener('click', () => {
      selectCountry(country.code);
    });

    svg.appendChild(g);
  });

  container.innerHTML = '';
  container.appendChild(svg);
}

let tooltip = null;

function showMapTooltip(e, country, val) {
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.className = 'map-tooltip';
    document.body.appendChild(tooltip);
  }
  tooltip.innerHTML = `
    <div class="tt-name">${country.flag} ${country.name}</div>
    <div class="tt-score" style="color:${scoreGradient(val)}">${Math.round(val)}/100</div>
    <div style="font-size:10px;color:#8b92a8;margin-top:2px">${country.region}</div>
  `;
  tooltip.style.display = 'block';
  moveMapTooltip(e);
}

function moveMapTooltip(e) {
  if (!tooltip) return;
  tooltip.style.left = (e.clientX + 12) + 'px';
  tooltip.style.top = (e.clientY - 8) + 'px';
}

function hideMapTooltip() {
  if (tooltip) tooltip.style.display = 'none';
}

document.addEventListener('mousemove', moveMapTooltip);

window.initMap = initMap;
