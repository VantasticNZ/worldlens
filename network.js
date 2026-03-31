// ── WORLDLENS NETWORK GRAPH ──
// D3-powered conflict of interest / influence network
// Nodes: politicians, orgs, companies, funding sources
// Edges: money, ideology, employment, coalition, policy

const PARTY_COLORS = {
  National: '#00529f',
  ACT: '#ffd700',
  NZFirst: '#2c3e50',
  Labour: '#cc0000',
  Greens: '#008a00',
  org: '#7b5cf0',
  funding: '#ef4444',
  company: '#f59e0b',
};

const EDGE_COLORS = {
  employment: '#f59e0b',
  ideological: '#7b5cf0',
  funding: '#ef4444',
  coalition: '#4f8ef7',
  party: '#22c55e',
  policy: '#f97316',
};

function initNetworkGraph() {
  const container = document.getElementById('network-graph');
  if (!container) return;

  const W = container.clientWidth || 900;
  const H = 560;

  container.innerHTML = '';

  const svg = d3.select(container)
    .append('svg')
    .attr('width', W)
    .attr('height', H)
    .style('background', 'transparent');

  // Arrow markers
  const defs = svg.append('defs');
  Object.entries(EDGE_COLORS).forEach(([type, color]) => {
    defs.append('marker')
      .attr('id', `arrow-${type}`)
      .attr('viewBox', '0 0 10 10')
      .attr('refX', 18)
      .attr('refY', 5)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,0L10,5L0,10z')
      .attr('fill', color)
      .attr('opacity', 0.7);
  });

  const data = window.NZ_NETWORK;
  if (!data) return;

  // Zoom
  const g = svg.append('g');
  svg.call(d3.zoom()
    .scaleExtent([0.3, 3])
    .on('zoom', (event) => g.attr('transform', event.transform))
  );

  // Force simulation
  const simulation = d3.forceSimulation(data.nodes)
    .force('link', d3.forceLink(data.edges).id(d => d.id).distance(d => 80 + (3 - (d.weight || 1)) * 20))
    .force('charge', d3.forceManyBody().strength(-300))
    .force('center', d3.forceCenter(W / 2, H / 2))
    .force('collision', d3.forceCollide().radius(d => (d.size || 12) + 8));

  // Edges
  const link = g.append('g')
    .selectAll('line')
    .data(data.edges)
    .enter().append('line')
    .attr('stroke', d => EDGE_COLORS[d.type] || '#555d72')
    .attr('stroke-width', d => (d.weight || 1) * 1.2)
    .attr('stroke-opacity', 0.5)
    .attr('marker-end', d => `url(#arrow-${d.type})`);

  // Edge labels (shown on hover)
  const edgeLabel = g.append('g')
    .selectAll('text')
    .data(data.edges)
    .enter().append('text')
    .text(d => d.label || '')
    .attr('font-size', '9px')
    .attr('fill', '#8b92a8')
    .attr('text-anchor', 'middle')
    .style('pointer-events', 'none')
    .style('opacity', 0);

  // Node groups
  const node = g.append('g')
    .selectAll('g')
    .data(data.nodes)
    .enter().append('g')
    .attr('class', 'network-node')
    .style('cursor', 'pointer')
    .call(d3.drag()
      .on('start', dragStart)
      .on('drag', dragged)
      .on('end', dragEnd)
    );

  // Node circles
  node.append('circle')
    .attr('r', d => d.size || 12)
    .attr('fill', d => {
      const c = PARTY_COLORS[d.party] || PARTY_COLORS[d.type] || '#555d72';
      return c + '33';
    })
    .attr('stroke', d => PARTY_COLORS[d.party] || PARTY_COLORS[d.type] || '#555d72')
    .attr('stroke-width', 1.5);

  // Node labels
  node.append('text')
    .text(d => d.label || d.id)
    .attr('x', 0)
    .attr('y', d => (d.size || 12) + 12)
    .attr('text-anchor', 'middle')
    .attr('font-size', '10px')
    .attr('fill', '#8b92a8')
    .style('pointer-events', 'none');

  // Node initials
  node.append('text')
    .text(d => {
      if (d.type === 'politician') {
        const parts = d.label.split(' ');
        return (parts[0][0] + parts[parts.length-1][0]);
      }
      return d.label.slice(0, 2).toUpperCase();
    })
    .attr('x', 0)
    .attr('y', 4)
    .attr('text-anchor', 'middle')
    .attr('font-size', d => Math.max(8, (d.size || 12) * 0.6) + 'px')
    .attr('font-weight', '700')
    .attr('fill', d => PARTY_COLORS[d.party] || PARTY_COLORS[d.type] || '#8b92a8')
    .style('pointer-events', 'none');

  // Hover
  node.on('mouseenter', function(event, d) {
    d3.select(this).select('circle')
      .attr('stroke-width', 3)
      .attr('fill-opacity', 0.5);

    // Highlight connected edges
    link.style('opacity', e =>
      e.source.id === d.id || e.target.id === d.id ? 1 : 0.08
    );
    edgeLabel.style('opacity', e =>
      e.source.id === d.id || e.target.id === d.id ? 1 : 0
    );

    // Dim unconnected nodes
    const connected = new Set();
    data.edges.forEach(e => {
      if (e.source.id === d.id) connected.add(e.target.id);
      if (e.target.id === d.id) connected.add(e.source.id);
    });
    node.style('opacity', n => n.id === d.id || connected.has(n.id) ? 1 : 0.2);

    showNetworkTooltip(event, d);
  });

  node.on('mouseleave', function() {
    d3.select(this).select('circle').attr('stroke-width', 1.5).attr('fill-opacity', 0.2);
    link.style('opacity', 0.5);
    edgeLabel.style('opacity', 0);
    node.style('opacity', 1);
    hideNetworkTooltip();
  });

  node.on('click', function(event, d) {
    event.stopPropagation();
    if (d.type === 'politician') {
      const pol = NZ_POLITICIANS.find(p => p.id === d.id);
      if (pol) openNZPolitician(pol.id);
    }
    showNodePanel(d);
  });

  // Simulation tick
  simulation.on('tick', () => {
    link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);

    edgeLabel
      .attr('x', d => (d.source.x + d.target.x) / 2)
      .attr('y', d => (d.source.y + d.target.y) / 2 - 4);

    node.attr('transform', d => `translate(${d.x},${d.y})`);
  });

  function dragStart(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x; d.fy = d.y;
  }
  function dragged(event, d) { d.fx = event.x; d.fy = event.y; }
  function dragEnd(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null; d.fy = null;
  }

  // Edge type filter
  document.getElementById('network-edge-filter')?.addEventListener('change', e => {
    const val = e.target.value;
    link.style('display', d => val === 'all' || d.type === val ? 'block' : 'none');
  });

  // Search highlight
  document.getElementById('network-search')?.addEventListener('input', e => {
    const q = e.target.value.toLowerCase();
    if (!q) {
      node.style('opacity', 1);
      link.style('opacity', 0.5);
      return;
    }
    node.style('opacity', d => d.label.toLowerCase().includes(q) ? 1 : 0.15);
    link.style('opacity', d =>
      d.source.label?.toLowerCase().includes(q) || d.target.label?.toLowerCase().includes(q) ? 0.8 : 0.05
    );
  });
}

// ── NETWORK TOOLTIP ──
let netTooltip = null;

function showNetworkTooltip(event, d) {
  if (!netTooltip) {
    netTooltip = document.createElement('div');
    netTooltip.className = 'map-tooltip';
    document.body.appendChild(netTooltip);
  }
  const connections = NZ_NETWORK.edges.filter(e =>
    (e.source.id || e.source) === d.id || (e.target.id || e.target) === d.id
  ).length;
  netTooltip.innerHTML = `
    <div style="font-weight:600;margin-bottom:4px">${d.label}</div>
    <div style="font-size:10px;color:#8b92a8">${d.type}${d.party ? ' · ' + d.party : ''}</div>
    <div style="font-size:10px;color:#555d72;margin-top:2px">${connections} connections</div>
    ${d.type === 'politician' ? '<div style="font-size:10px;color:#4f8ef7;margin-top:2px">Click to view profile</div>' : ''}
  `;
  netTooltip.style.display = 'block';
  netTooltip.style.left = (event.clientX + 12) + 'px';
  netTooltip.style.top = (event.clientY - 8) + 'px';
}

function hideNetworkTooltip() {
  if (netTooltip) netTooltip.style.display = 'none';
}

// ── NODE PANEL ──
function showNodePanel(d) {
  const panel = document.getElementById('network-node-panel');
  const content = document.getElementById('network-node-content');
  if (!panel) return;

  const connections = NZ_NETWORK.edges.filter(e => {
    const src = e.source.id || e.source;
    const tgt = e.target.id || e.target;
    return src === d.id || tgt === d.id;
  });

  content.innerHTML = `
    <div style="font-size:15px;font-weight:700;margin-bottom:4px">${d.label}</div>
    <div style="font-size:12px;color:#8b92a8;margin-bottom:12px">${d.type}${d.party ? ' — ' + d.party : ''}</div>
    <div class="pol-section-title">Connections (${connections.length})</div>
    <div style="display:flex;flex-direction:column;gap:6px;margin-top:8px">
      ${connections.map(e => {
        const src = e.source.id || e.source;
        const tgt = e.target.id || e.target;
        const other = src === d.id ? tgt : src;
        const otherNode = NZ_NETWORK.nodes.find(n => n.id === other);
        const color = EDGE_COLORS[e.type] || '#555d72';
        return `
          <div style="display:flex;align-items:center;gap:8px;padding:6px 10px;background:#111318;border-radius:8px;border-left:3px solid ${color}">
            <div style="flex:1">
              <div style="font-size:12px;font-weight:600">${otherNode?.label || other}</div>
              <div style="font-size:10px;color:${color}">${e.type} · ${e.label || ''}</div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
    ${d.type === 'politician' ? `<div style="margin-top:12px"><button class="ctrl-btn" onclick="openNZPolitician('${d.id}')" style="font-size:12px;padding:6px 14px">Full Profile ↗</button></div>` : ''}
  `;
  panel.style.display = 'block';
}

window.initNetworkGraph = initNetworkGraph;
