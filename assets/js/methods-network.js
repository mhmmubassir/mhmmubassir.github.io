(function () {
  'use strict';

  const svg = document.getElementById('research-ecosystem-svg');
  const stage = document.getElementById('methods-network-stage');
  if (!svg || !stage || !window.SVGElement) return;

  const NS = 'http://www.w3.org/2000/svg';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const palette = {
    identity: '#eefcff',
    biology: '#efc45c',
    structural: '#6ee7d0',
    simulation: '#ff9d66',
    preparedness: '#f6c177',
    phylo: '#a99cff',
    ml: '#ff718c',
    compute: '#68b8ff'
  };

  const statusLabels = {
    identity: 'Research ecosystem',
    domain: 'Research domain',
    core: 'Used in current research',
    current: 'Working toolkit',
    learning: 'Learning / future direction',
    system: 'Biological system'
  };

  const clusters = [
    {
      id: 'biology', label: 'Viral Systems', short: 'Viral\nSystems', color: palette.biology,
      description: 'Respiratory and emerging viruses that anchor my biological questions.',
      members: [
        ['h5', 'H5N1 / H5Nx', 'core', 'Primary Ph.D. system: phenotype-aware evolution, host transitions, receptor biology, and surveillance.'],
        ['flua', 'Influenza A', 'core', 'Viral evolution, receptor specificity, vaccine design, and cross-host emergence.'],
        ['flub', 'Influenza B', 'current', 'Receptor specificity, N-glycosylation, and lineage-level structural biology.'],
        ['rsv', 'RSV', 'current', 'Class I fusion-protein stabilization and computational antigen design.'],
        ['hmpv', 'hMPV', 'current', 'Structure-guided stabilization of viral fusion proteins.'],
        ['sars2', 'SARS-CoV-2', 'current', 'Spike evolution, immune escape, and vaccine-design context.'],
        ['mpox', 'Mpox', 'current', 'Transmission modeling and epidemic-control research.'],
        ['ha', 'HA receptor biology', 'core', 'Sialic-acid specificity, receptor-binding geometry, host range, and antigenic evolution.'],
        ['vaccine', 'Vaccine design', 'core', 'Consensus immunogens, antigen engineering, and fusion-protein stabilization.']
      ]
    },
    {
      id: 'structural', label: 'Structural Biology', short: 'Structural\nBiology', color: palette.structural,
      description: 'Sequence-to-structure-to-function modeling across viral proteins and biomolecular complexes.',
      members: [
        ['af3', 'AlphaFold 3', 'core', 'Population-scale structure prediction and biomolecular-complex modeling.', 'https://alphafoldserver.com/'],
        ['rosetta', 'Rosetta', 'core', 'Structure-guided design, mutagenesis, relaxation, scoring, and protein engineering.', 'https://www.rosettacommons.org/'],
        ['foldx', 'FoldX', 'core', 'Fast energetic estimation for mutation and stability analyses.', 'https://foldxsuite.crg.eu/'],
        ['pymol', 'PyMOL', 'core', 'Structural inspection, comparison, annotation, and publication visualization.', 'https://pymol.org/'],
        ['rcsb', 'RCSB PDB', 'current', 'Experimental structure discovery, validation, and comparative structural context.', 'https://www.rcsb.org/'],
        ['molstar', 'Mol*', 'current', 'Browser-based interactive molecular visualization.', 'https://molstar.org/'],
        ['rfaa', 'RoseTTAFold All-Atom', 'learning', 'All-atom prediction of biomolecular assemblies.', 'https://github.com/baker-laboratory/RoseTTAFold-All-Atom'],
        ['rfd3', 'RFdiffusion3', 'learning', 'Generative protein design under complex structural and molecular constraints.', 'https://github.com/RosettaCommons/foundry/tree/production/models/rfd3'],
        ['boltz2', 'Boltz-2', 'learning', 'Open biomolecular modeling for structure and binding-affinity prediction.', 'https://github.com/jwohlwend/boltz'],
        ['openfold3', 'OpenFold3', 'learning', 'Open-source trainable biomolecular co-folding model.', 'https://github.com/aqlaboratory/openfold-3'],
        ['proteinmpnn', 'ProteinMPNN', 'learning', 'Neural sequence design conditioned on protein structure.', 'https://github.com/dauparas/ProteinMPNN'],
        ['esmfold', 'ESMFold', 'learning', 'Language-model-based protein structure prediction.', 'https://github.com/facebookresearch/esm']
      ]
    },
    {
      id: 'simulation', label: 'Molecular Dynamics & Docking', short: 'Molecular Dynamics\n& Docking', color: palette.simulation,
      description: 'Molecular dynamics simulation, receptor-binding analysis, energetic interpretation, and molecular docking.',
      members: [
        ['amber', 'Amber', 'core', 'Molecular dynamics setup, simulation, and analysis.', 'https://ambermd.org/'],
        ['ambertools', 'AmberTools', 'core', 'Open tools for system preparation, trajectory analysis, and free-energy workflows.', 'https://ambermd.org/AmberTools.php'],
        ['gromacs', 'GROMACS', 'current', 'High-performance molecular dynamics and trajectory analysis.', 'https://www.gromacs.org/'],
        ['glycam', 'GLYCAM', 'core', 'Carbohydrate force fields and protein-glycan modeling.', 'https://glycam.org/'],
        ['mmgbsa', 'MM/GBSA', 'core', 'Approximate binding free-energy decomposition and comparative receptor analysis.'],
        ['md', 'Molecular dynamics', 'core', 'Replicated atomistic simulations linking sequence variation to structural dynamics.'],
        ['geometry', 'Receptor geometry', 'core', 'Quantifying receptor-binding-site distances, loops, and structural rearrangements.'],
        ['glycan', 'Protein-glycan interactions', 'core', 'Mechanistic analysis of α2,3 and α2,6 sialic-acid recognition.'],
        ['vina', 'AutoDock Vina', 'current', 'Fast small-molecule docking and pose exploration.', 'https://vina.scripps.edu/'],
        ['haddock', 'HADDOCK', 'current', 'Integrative biomolecular docking guided by experimental or predicted restraints.', 'https://www.bonvinlab.org/software/haddock2.4/'],
        ['rosettadock', 'RosettaDock', 'current', 'Protein-protein docking within the Rosetta modeling ecosystem.', 'https://www.rosettacommons.org/']
      ]
    },
    {
      id: 'preparedness', label: 'Epidemiology & Preparedness', short: 'Epidemiology\n& Preparedness', color: palette.preparedness,
      description: 'Connecting evolutionary evidence with outbreak interpretation, One Health surveillance, and pandemic preparedness.',
      members: [
        ['epidemiology', 'Epidemiology', 'core', 'Population-level interpretation of pathogen transmission, host transitions, and intervention.'],
        ['pandemic', 'Pandemic preparedness', 'core', 'Mechanistic risk assessment and surveillance prioritization before widespread emergence.'],
        ['outbreak', 'Outbreak analytics', 'core', 'Integrating genomic, temporal, geographic, and host information during emergence.'],
        ['surveillance', 'Genomic surveillance', 'core', 'Scalable sequence analysis connected to interpretable phenotypic evidence.'],
        ['spillover', 'Spillover risk', 'core', 'Evaluating cross-species emergence through ecology, evolution, and phenotype.'],
        ['onehealth', 'One Health', 'core', 'Linking wildlife, poultry, livestock, human, and environmental interfaces.'],
        ['epimodel', 'Epidemic modeling', 'current', 'Mathematical and simulation-based models of transmission and control.'],
        ['hosttransitions', 'Host transitions', 'core', 'Tracing movement among avian, poultry, cattle, and human populations.']
      ]
    },
    {
      id: 'phylo', label: 'Phylodynamics', short: 'Phylo-\ndynamics', color: palette.phylo,
      description: 'Time-resolved evolution, host transitions, phylogeography, and ecological drivers of viral spread.',
      members: [
        ['iqtree', 'IQ-TREE 2', 'core', 'Maximum-likelihood phylogenetic inference and model selection.', 'https://iqtree.github.io/'],
        ['beastx', 'BEAST X', 'core', 'Bayesian evolutionary analysis and phylodynamic inference.', 'https://beast.community/'],
        ['beast2', 'BEAST 2', 'current', 'Modular Bayesian phylogenetics and population-dynamic modeling.', 'https://www.beast2.org/'],
        ['treetime', 'TreeTime', 'core', 'Rapid molecular-clock dating, ancestral reconstruction, and phylodynamic analysis.', 'https://treetime.readthedocs.io/'],
        ['nextstrain', 'Nextstrain', 'core', 'Interactive pathogen evolution, surveillance visualization, and public data products.', 'https://nextstrain.org/'],
        ['auspice', 'Auspice', 'core', 'Interactive visualization of phylogenies and metadata layers.', 'https://docs.nextstrain.org/projects/auspice/'],
        ['hyphy', 'HyPhy', 'current', 'Selection analysis and evolutionary hypothesis testing.', 'https://hyphy.org/'],
        ['baltic', 'baltic', 'current', 'Python-based phylogenetic tree manipulation and visualization.', 'https://github.com/evogytis/baltic'],
        ['tracer', 'Tracer', 'current', 'Posterior diagnostics and Bayesian parameter inspection.', 'https://beast.community/tracer'],
        ['ancestral', 'Ancestral reconstruction', 'core', 'Inferring ancestral sequences, traits, and evolutionary transitions.'],
        ['discrete', 'Discrete-trait analysis', 'current', 'Modeling host, location, or ecological states across phylogenies.'],
        ['markov', 'Markov jumps', 'current', 'Quantifying transition counts, rewards, and lineage movement through state space.'],
        ['bssvs', 'BSSVS / GLM', 'current', 'Testing supported transition routes and ecological predictors in phylogeographic models.']
      ]
    },
    {
      id: 'ml', label: 'Future Predictive Biology', short: 'Future Predictive\nBiology', color: palette.ml,
      description: 'A future direction integrating evolutionary history, protein structure, host ecology, and phenotype through modern statistical learning and machine learning.',
      members: [
        ['plm', 'Protein language models', 'learning', 'Representation learning from evolutionary sequence data for phenotype and fitness prediction.'],
        ['esm2', 'ESM-2', 'learning', 'Protein sequence embeddings and representation learning.', 'https://github.com/facebookresearch/esm'],
        ['esm3', 'ESM-3', 'learning', 'Multimodal protein modeling across sequence, structure, and function.', 'https://www.evolutionaryscale.ai/'],
        ['gnn', 'Graph learning', 'learning', 'Graph-based learning for phylogenies, reassortment, spillover risk, and structural relationships.'],
        ['transformers', 'Transformers', 'learning', 'Attention-based modeling of sequence, metadata, and multimodal biological context.'],
        ['diffusion', 'Generative structure models', 'learning', 'Generative modeling for protein structure and design.'],
        ['flow', 'Flow matching', 'learning', 'Continuous-time generative modeling for biological structures and distributions.'],
        ['temporal', 'Temporal graphs', 'learning', 'Learning from evolving phylogenetic and epidemiological networks.'],
        ['multimodal', 'Multimodal fusion', 'learning', 'Combining sequence, structure, tree, host, ecology, and phenotype features.'],
        ['pytorch', 'PyTorch', 'learning', 'Deep-learning framework for future model development.', 'https://pytorch.org/']
      ]
    },
    {
      id: 'compute', label: 'Scientific Computing', short: 'Scientific\nComputing', color: palette.compute,
      description: 'Reproducible scripting, high-performance execution, and scalable data workflows.',
      members: [
        ['python', 'Python', 'core', 'Data processing, phylogenetics, structural analysis, automation, and visualization.', 'https://www.python.org/'],
        ['r', 'R', 'current', 'Statistical analysis, data wrangling, and scientific visualization.', 'https://www.r-project.org/'],
        ['bash', 'Bash', 'core', 'Workflow automation, HPC execution, and large-scale file processing.'],
        ['linux', 'Linux', 'core', 'Primary environment for bioinformatics, phylogenetics, and MD simulation.'],
        ['slurm', 'SLURM', 'core', 'CPU/GPU job scheduling, arrays, resource planning, and cluster execution.'],
        ['hpc', 'HPC', 'core', 'Large phylogenies, MD simulations, structure prediction, and parallel workflows.'],
        ['git', 'Git / GitHub', 'core', 'Version control, reproducible research, public data products, and web deployment.', 'https://github.com/mhmmubassir'],
        ['mpi', 'MPI', 'current', 'Parallel execution for phylogenetic and scientific-computing workloads.'],
        ['repro', 'Reproducible pipelines', 'core', 'Scripted and versioned workflows from raw data to interpretable outputs.']
      ]
    }
  ];

  const centerNode = {
    id: 'center', type: 'center', cluster: 'identity', label: 'Research\nEcosystem', color: palette.identity,
    status: 'identity', description: 'Explore the biological questions, methods, and software that connect evolution, structure, ecology, and preparedness.'
  };

  const crossLinks = [
    ['biology', 'structural'], ['biology', 'phylo'], ['biology', 'preparedness'], ['biology', 'simulation'],
    ['structural', 'simulation'], ['structural', 'ml'], ['structural', 'compute'],
    ['phylo', 'preparedness'], ['phylo', 'ml'], ['phylo', 'compute'],
    ['simulation', 'compute'], ['preparedness', 'ml'], ['preparedness', 'compute'], ['ml', 'compute'],
    ['h5', 'af3'], ['h5', 'iqtree'], ['h5', 'nextstrain'], ['h5', 'md'], ['ha', 'glycam'],
    ['ha', 'mmgbsa'], ['vaccine', 'rosetta'], ['vaccine', 'rfd3'], ['surveillance', 'nextstrain'],
    ['outbreak', 'treetime'], ['spillover', 'gnn'], ['onehealth', 'phylo'], ['docking', 'rosetta'],
    ['rfd3', 'diffusion'], ['boltz2', 'multimodal'], ['python', 'pytorch'], ['slurm', 'hpc']
  ];

  // One alias is used only to express a docking-domain cross-link.
  const aliases = { docking: 'simulation' };

  const allNodes = [centerNode];
  clusters.forEach(function (cluster) {
    allNodes.push({
      id: cluster.id, type: 'hub', cluster: cluster.id, label: cluster.short, fullLabel: cluster.label,
      color: cluster.color, status: 'domain', description: cluster.description
    });
    cluster.members.forEach(function (member) {
      allNodes.push({
        id: member[0], type: 'tool', cluster: cluster.id, label: member[1], fullLabel: member[1],
        color: cluster.color, status: member[2], description: member[3], url: member[4] || ''
      });
    });
  });

  const nodeById = new Map(allNodes.map(function (node) { return [node.id, node]; }));
  const clusterById = new Map(clusters.map(function (cluster) { return [cluster.id, cluster]; }));
  const backdropLayer = svg.querySelector('.ecosystem-backdrop');
  const edgeLayer = svg.querySelector('.ecosystem-edges');
  const pulseLayer = svg.querySelector('.ecosystem-pulses');
  const nodeLayer = svg.querySelector('.ecosystem-nodes');
  const mobileLabelLayer = svg.querySelector('.ecosystem-mobile-label');

  const inspector = {
    category: document.getElementById('method-inspector-category'),
    title: document.getElementById('method-inspector-title'),
    description: document.getElementById('method-inspector-description'),
    status: document.getElementById('method-inspector-status'),
    link: document.getElementById('method-inspector-link')
  };
  const pauseButton = document.getElementById('methods-pause');
  const resetButton = document.getElementById('methods-reset');
  const expandButton = document.getElementById('methods-expand');
  const accessibleList = document.getElementById('methods-accessible-list');

  let width = 0;
  let height = 0;
  let mobile = false;
  let paused = reduceMotion;
  let selectedId = 'center';
  let activeCluster = 'structural';
  let allCollapsed = false;
  const collapsedClusters = new Set();
  const visualNodes = new Map();
  const visualEdges = [];
  const pulseVisuals = [];
  let dragging = null;
  let dragOrigin = null;
  let dragMoved = false;
  let lastFrame = performance.now();
  let animationId = 0;

  function createSvgElement(name, attrs) {
    const element = document.createElementNS(NS, name);
    if (attrs) Object.keys(attrs).forEach(function (key) { element.setAttribute(key, attrs[key]); });
    return element;
  }

  function labelLines(label, maxChars) {
    const explicit = String(label).split('\n');
    if (explicit.length > 1) return explicit;
    const words = String(label).split(/\s+/);
    const lines = [];
    let current = '';
    words.forEach(function (word) {
      if (!current) current = word;
      else if ((current + ' ' + word).length <= maxChars) current += ' ' + word;
      else { lines.push(current); current = word; }
    });
    if (current) lines.push(current);
    if (lines.length > 3) return [lines[0], lines.slice(1).join(' ')];
    return lines;
  }

  function nodeRadius(node) {
    if (node.type === 'center') return mobile ? 43 : 52;
    if (node.type === 'hub') return mobile ? 24 : 31;
    const length = (node.fullLabel || node.label).length;
    if (mobile) return length > 20 ? 20 : length > 12 ? 18 : 16;
    return length > 22 ? 20 : length > 14 ? 18 : 16;
  }

  function statusShort(node) {
    if (node.type === 'hub') {
      const cluster = clusterById.get(node.cluster);
      return cluster ? cluster.members.length + ' tools' : 'domain';
    }
    if (node.status === 'learning') return 'future';
    if (node.status === 'core') return 'current';
    if (node.status === 'current') return 'toolkit';
    return '';
  }

  function renderNodes() {
    nodeLayer.innerHTML = '';
    visualNodes.clear();
    allNodes.forEach(function (node) {
      const group = createSvgElement('g', {
        class: 'ecosystem-node ecosystem-node--' + node.type,
        'data-node-id': node.id,
        'data-status': node.status,
        'data-cluster': node.cluster,
        role: 'button',
        tabindex: '0',
        'aria-label': (node.fullLabel || node.label.replace(/\n/g, ' ')) + '. ' + node.description
      });
      group.style.setProperty('--node-color', node.color);

      const radius = nodeRadius(node);
      const halo = createSvgElement('circle', { class: 'node-halo', r: (radius + (node.type === 'center' ? 15 : node.type === 'hub' ? 9 : 5)).toFixed(1), stroke: node.color });
      const disc = createSvgElement('circle', { class: 'node-disc', r: radius.toFixed(1), fill: node.color, stroke: node.color });
      const dot = createSvgElement('circle', { class: 'node-dot', r: node.status === 'core' ? '2.3' : '1.7', cx: (radius * .68).toFixed(1), cy: (-radius * .65).toFixed(1), fill: node.color });
      group.appendChild(halo);
      group.appendChild(disc);
      group.appendChild(dot);

      const text = createSvgElement('text', { class: 'node-label' });
      const maxChars = node.type === 'center' ? 13 : node.type === 'hub' ? 13 : mobile ? 14 : 15;
      const lines = labelLines(node.label, maxChars).slice(0, node.type === 'tool' ? 3 : 2);
      const lineHeight = node.type === 'center' ? 15 : node.type === 'hub' ? 11 : 9.2;
      const firstY = -((lines.length - 1) * lineHeight) / 2 - (node.type === 'hub' ? 2 : 0);
      lines.forEach(function (line, index) {
        const tspan = createSvgElement('tspan', { x: '0', y: (firstY + index * lineHeight).toFixed(1) });
        tspan.textContent = line;
        text.appendChild(tspan);
      });
      group.appendChild(text);

      if (node.type === 'hub') {
        const sub = createSvgElement('text', { class: 'node-substatus', x: '0', y: (radius * .58).toFixed(1) });
        sub.textContent = statusShort(node);
        group.appendChild(sub);
      }

      nodeLayer.appendChild(group);
      node._el = group;
      node._radius = radius;
      node._phase = Math.random() * Math.PI * 2;
      node._x = 0; node._y = 0; node._tx = 0; node._ty = 0;
      visualNodes.set(node.id, group);

      group.addEventListener('pointerdown', onPointerDown);
      group.addEventListener('pointermove', onPointerMove);
      group.addEventListener('pointerup', onPointerUp);
      group.addEventListener('pointercancel', onPointerUp);
      group.addEventListener('pointerenter', function () { highlightNode(node.id); });
      group.addEventListener('pointerleave', function () { if (!dragging) highlightNode(selectedId); });
      group.addEventListener('dblclick', function (event) { event.preventDefault(); resetLayout(); });
      group.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          activateNode(node, true);
        }
      });
    });
  }

  function addEdge(sourceId, targetId, kind) {
    const source = nodeById.get(aliases[sourceId] || sourceId);
    const target = nodeById.get(aliases[targetId] || targetId);
    if (!source || !target || source === target) return;
    const path = createSvgElement('path', {
      class: 'ecosystem-edge ecosystem-edge--' + kind,
      stroke: kind === 'cross' ? '#d9d1ff' : source.color,
      'data-source': source.id,
      'data-target': target.id
    });
    edgeLayer.appendChild(path);
    visualEdges.push({ source: source, target: target, kind: kind, el: path });
  }

  function renderEdges() {
    edgeLayer.innerHTML = '';
    pulseLayer.innerHTML = '';
    visualEdges.length = 0;
    pulseVisuals.length = 0;

    clusters.forEach(function (cluster) {
      addEdge('center', cluster.id, 'primary');
      cluster.members.forEach(function (member) { addEdge(cluster.id, member[0], 'member'); });
    });
    crossLinks.forEach(function (link) { addEdge(link[0], link[1], 'cross'); });

    clusters.forEach(function (cluster, index) {
      const pulse = createSvgElement('circle', { class: 'ecosystem-pulse', r: '2.25', fill: cluster.color });
      pulseLayer.appendChild(pulse);
      pulseVisuals.push({ source: centerNode, target: nodeById.get(cluster.id), el: pulse, phase: index / clusters.length });
    });
  }

  function renderBackdrop() {
    backdropLayer.innerHTML = '';
    const max = Math.min(width, height);
    [0.17, 0.28, 0.40].forEach(function (ratio) {
      backdropLayer.appendChild(createSvgElement('circle', { cx: width / 2, cy: mobile ? 108 : height * .46, r: max * ratio }));
    });
  }

  function renderMobileLabel() {
    mobileLabelLayer.innerHTML = '';
    if (!mobile) return;
    const cluster = clusterById.get(activeCluster);
    const kicker = createSvgElement('text', { class: 'ecosystem-mobile-title', x: width / 2, y: 354 });
    kicker.textContent = 'SELECTED DOMAIN';
    const title = createSvgElement('text', { class: 'ecosystem-mobile-domain', x: width / 2, y: 376 });
    title.textContent = cluster.label;
    mobileLabelLayer.appendChild(kicker);
    mobileLabelLayer.appendChild(title);
  }

  function desktopHubPositions() {
    return {
      biology: [0.15, 0.25],
      structural: [0.38, 0.16],
      simulation: [0.70, 0.18],
      preparedness: [0.87, 0.42],
      phylo: [0.73, 0.69],
      ml: [0.43, 0.76],
      compute: [0.15, 0.66]
    };
  }

  function setTarget(node, x, y, immediate) {
    node._tx = x;
    node._ty = y;
    if (immediate || !Number.isFinite(node._x) || (node._x === 0 && node._y === 0)) {
      node._x = x;
      node._y = y;
    }
  }

  function layoutDesktop(immediate) {
    const centerX = width * .50;
    const centerY = height * .46;
    setTarget(centerNode, centerX, centerY, immediate);
    const hubs = desktopHubPositions();

    clusters.forEach(function (cluster) {
      const hub = nodeById.get(cluster.id);
      const pos = hubs[cluster.id];
      const hx = width * pos[0];
      const hy = height * pos[1];
      setTarget(hub, hx, hy, immediate);
      const isCollapsed = collapsedClusters.has(cluster.id);
      const outward = Math.atan2(hy - centerY, hx - centerX);
      const members = cluster.members.map(function (member) { return nodeById.get(member[0]); });
      const firstRingCount = Math.min(members.length, 6);
      members.forEach(function (node, index) {
        if (isCollapsed) {
          setTarget(node, hx, hy, immediate);
          node._visible = false;
          return;
        }
        const ring = index < firstRingCount ? 0 : 1;
        const ringIndex = ring === 0 ? index : index - firstRingCount;
        const ringCount = ring === 0 ? firstRingCount : members.length - firstRingCount;
        const radius = ring === 0 ? Math.min(88, width * .073) : Math.min(137, width * .112);
        const span = ring === 0 ? Math.PI * 1.48 : Math.PI * 1.62;
        const angle = ringCount <= 1 ? outward : outward - span / 2 + (span * ringIndex / (ringCount - 1));
        let x = hx + Math.cos(angle) * radius;
        let y = hy + Math.sin(angle) * radius;
        const marginX = 28 + node._radius;
        const marginY = 70 + node._radius;
        x = Math.max(marginX, Math.min(width - marginX, x));
        y = Math.max(marginY, Math.min(height - 92 - node._radius, y));
        setTarget(node, x, y, immediate);
        node._visible = true;
      });
    });
  }

  function layoutMobile(immediate) {
    const centerX = width / 2;
    setTarget(centerNode, centerX, 112, immediate);
    const hubRows = [
      ['biology', 'structural', 'simulation', 'preparedness'],
      ['phylo', 'ml', 'compute']
    ];
    hubRows.forEach(function (row, rowIndex) {
      const y = rowIndex === 0 ? 205 : 292;
      row.forEach(function (id, index) {
        const x = width * ((index + 1) / (row.length + 1));
        setTarget(nodeById.get(id), x, y, immediate);
      });
    });

    clusters.forEach(function (cluster) {
      const active = cluster.id === activeCluster;
      const members = cluster.members.map(function (member) { return nodeById.get(member[0]); });
      const columns = width < 370 ? 3 : 3;
      const xPositions = columns === 3 ? [width * .17, width * .50, width * .83] : [width * .25, width * .75];
      members.forEach(function (node, index) {
        if (!active) {
          const hub = nodeById.get(cluster.id);
          setTarget(node, hub._tx, hub._ty, immediate);
          node._visible = false;
          return;
        }
        const row = Math.floor(index / columns);
        const col = index % columns;
        const y = 430 + row * 67;
        setTarget(node, xPositions[col], y, immediate);
        node._visible = true;
      });
    });
  }

  function applyLayout(immediate) {
    if (mobile) layoutMobile(immediate);
    else layoutDesktop(immediate);
    renderBackdrop();
    renderMobileLabel();
    updateVisibility();
  }

  function edgeVisible(edge) {
    if (mobile) {
      if (edge.kind === 'primary') return true;
      if (edge.kind === 'member') return edge.source.id === activeCluster;
      return false;
    }
    if (edge.kind === 'member' && collapsedClusters.has(edge.source.id)) return false;
    if (edge.source.type === 'tool' && !edge.source._visible) return false;
    if (edge.target.type === 'tool' && !edge.target._visible) return false;
    return true;
  }

  function updateVisibility() {
    allNodes.forEach(function (node) {
      const hidden = node.type === 'tool' && !node._visible;
      node._el.classList.toggle('is-hidden', hidden);
    });
    visualEdges.forEach(function (edge) {
      edge.el.style.display = edgeVisible(edge) ? '' : 'none';
    });
  }

  function pathFor(edge, sx, sy, tx, ty) {
    const dx = tx - sx;
    const dy = ty - sy;
    const length = Math.max(1, Math.hypot(dx, dy));
    const curveStrength = edge.kind === 'cross' ? Math.min(30, length * .10) : edge.kind === 'primary' ? Math.min(18, length * .06) : Math.min(12, length * .04);
    const sign = ((edge.source.id.length + edge.target.id.length) % 2 === 0) ? 1 : -1;
    const nx = -dy / length;
    const ny = dx / length;
    const mx = (sx + tx) / 2 + nx * curveStrength * sign;
    const my = (sy + ty) / 2 + ny * curveStrength * sign;
    return { d: 'M ' + sx.toFixed(2) + ' ' + sy.toFixed(2) + ' Q ' + mx.toFixed(2) + ' ' + my.toFixed(2) + ' ' + tx.toFixed(2) + ' ' + ty.toFixed(2), mx: mx, my: my };
  }

  function quadraticPoint(sx, sy, mx, my, tx, ty, t) {
    const inv = 1 - t;
    return {
      x: inv * inv * sx + 2 * inv * t * mx + t * t * tx,
      y: inv * inv * sy + 2 * inv * t * my + t * t * ty
    };
  }

  function frame(now) {
    const dt = Math.min(36, now - lastFrame);
    lastFrame = now;
    const motionTime = paused || reduceMotion ? 0 : now * .001;
    const ease = Math.min(1, dt * .0085);

    allNodes.forEach(function (node) {
      if (dragging !== node) {
        node._x += (node._tx - node._x) * ease;
        node._y += (node._ty - node._y) * ease;
      }
      const amp = node.type === 'center' ? 1.4 : node.type === 'hub' ? 2.2 : 3.0;
      node._dx = Math.sin(motionTime * .72 + node._phase) * amp;
      node._dy = Math.cos(motionTime * .59 + node._phase * 1.31) * amp;
      const x = node._x + node._dx;
      const y = node._y + node._dy;
      node._displayX = x;
      node._displayY = y;
      node._el.setAttribute('transform', 'translate(' + x.toFixed(2) + ' ' + y.toFixed(2) + ')');
    });

    visualEdges.forEach(function (edge) {
      if (!edgeVisible(edge)) return;
      const path = pathFor(edge, edge.source._displayX, edge.source._displayY, edge.target._displayX, edge.target._displayY);
      edge._path = path;
      edge.el.setAttribute('d', path.d);
    });

    pulseVisuals.forEach(function (pulse, index) {
      const edge = visualEdges.find(function (candidate) { return candidate.kind === 'primary' && candidate.target.id === pulse.target.id; });
      if (!edge || !edgeVisible(edge)) { pulse.el.style.display = 'none'; return; }
      pulse.el.style.display = '';
      const t = reduceMotion ? .55 : ((motionTime * .115 + pulse.phase) % 1 + 1) % 1;
      const path = edge._path || pathFor(edge.source._displayX, edge.source._displayY, edge.target._displayX, edge.target._displayY);
      const point = quadraticPoint(edge.source._displayX, edge.source._displayY, path.mx, path.my, edge.target._displayX, edge.target._displayY, t);
      pulse.el.setAttribute('cx', point.x.toFixed(2));
      pulse.el.setAttribute('cy', point.y.toFixed(2));
      pulse.el.setAttribute('opacity', mobile && pulse.target.id !== activeCluster ? '.18' : '.82');
    });

    animationId = requestAnimationFrame(frame);
  }

  function svgPoint(event) {
    const rect = svg.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) * width / rect.width,
      y: (event.clientY - rect.top) * height / rect.height
    };
  }

  function onPointerDown(event) {
    const id = event.currentTarget.getAttribute('data-node-id');
    const node = nodeById.get(id);
    if (!node) return;
    const point = svgPoint(event);
    dragging = node;
    dragOrigin = { point: point, nodeX: node._x, nodeY: node._y, targets: null };
    dragMoved = false;
    if (node.type === 'hub' && !mobile) {
      const clusterNodes = [node].concat(clusterById.get(node.cluster).members.map(function (member) { return nodeById.get(member[0]); }));
      dragOrigin.targets = clusterNodes.map(function (item) { return { node: item, x: item._x, y: item._y }; });
    }
    event.currentTarget.setPointerCapture(event.pointerId);
    stage.classList.add('is-dragging');
    event.preventDefault();
  }

  function onPointerMove(event) {
    if (!dragging) return;
    const point = svgPoint(event);
    const dx = point.x - dragOrigin.point.x;
    const dy = point.y - dragOrigin.point.y;
    if (Math.hypot(dx, dy) > 4) dragMoved = true;
    if (dragOrigin.targets) {
      dragOrigin.targets.forEach(function (entry) {
        entry.node._x = entry.node._tx = Math.max(entry.node._radius + 8, Math.min(width - entry.node._radius - 8, entry.x + dx));
        entry.node._y = entry.node._ty = Math.max(entry.node._radius + 58, Math.min(height - entry.node._radius - 84, entry.y + dy));
      });
    } else {
      dragging._x = dragging._tx = Math.max(dragging._radius + 8, Math.min(width - dragging._radius - 8, dragOrigin.nodeX + dx));
      dragging._y = dragging._ty = Math.max(dragging._radius + 58, Math.min(height - dragging._radius - 20, dragOrigin.nodeY + dy));
    }
    event.preventDefault();
  }

  function onPointerUp(event) {
    if (!dragging) return;
    const node = dragging;
    dragging = null;
    stage.classList.remove('is-dragging');
    if (!dragMoved) activateNode(node, false);
    try { event.currentTarget.releasePointerCapture(event.pointerId); } catch (error) { /* no-op */ }
    event.preventDefault();
  }

  function activateNode(node, keyboard) {
    selectedId = node.id;
    updateInspector(node);
    if (node.type === 'hub') {
      if (mobile) {
        activeCluster = node.cluster;
        selectedId = node.id;
        applyLayout(false);
      } else {
        if (collapsedClusters.has(node.cluster)) collapsedClusters.delete(node.cluster);
        else collapsedClusters.add(node.cluster);
        allCollapsed = collapsedClusters.size === clusters.length;
        updateExpandButton();
        applyLayout(false);
      }
    } else if (node.url && keyboard) {
      window.open(node.url, '_blank', 'noopener');
    }
    highlightNode(node.id);
  }

  function updateInspector(node) {
    const cluster = node.type === 'center' ? null : clusterById.get(node.cluster);
    inspector.category.textContent = node.type === 'center' ? 'Research map' : node.type === 'hub' ? 'Research domain' : cluster.label;
    inspector.title.textContent = node.fullLabel || node.label.replace(/\n/g, ' ');
    inspector.description.textContent = node.description;
    inspector.status.textContent = statusLabels[node.status] || 'Research ecosystem';
    inspector.status.style.setProperty('--inspector-color', node.color);
    if (node.url) {
      inspector.link.hidden = false;
      inspector.link.href = node.url;
      inspector.link.textContent = 'Open official resource';
    } else {
      inspector.link.hidden = true;
      inspector.link.removeAttribute('href');
    }
  }

  function adjacentIds(id) {
    const ids = new Set([id]);
    visualEdges.forEach(function (edge) {
      if (edge.source.id === id) ids.add(edge.target.id);
      if (edge.target.id === id) ids.add(edge.source.id);
    });
    const node = nodeById.get(id);
    if (node && node.type === 'hub') {
      clusterById.get(node.cluster).members.forEach(function (member) { ids.add(member[0]); });
      ids.add('center');
    }
    return ids;
  }

  function highlightNode(id) {
    const showWholeMap = id === 'center';
    const adjacent = adjacentIds(id);
    allNodes.forEach(function (node) {
      node._el.classList.toggle('is-selected', node.id === id);
      node._el.classList.toggle('is-muted', !showWholeMap && !adjacent.has(node.id));
    });
    visualEdges.forEach(function (edge) {
      const highlighted = edge.source.id === id || edge.target.id === id;
      const connected = adjacent.has(edge.source.id) && adjacent.has(edge.target.id);
      edge.el.classList.toggle('is-highlighted', !showWholeMap && highlighted);
      edge.el.classList.toggle('is-muted', !showWholeMap && !connected);
    });
  }

  function clearHighlight() {
    highlightNode(selectedId);
  }

  function updateExpandButton() {
    if (!expandButton) return;
    const collapsed = collapsedClusters.size > 0;
    expandButton.textContent = collapsed ? 'Expand clusters' : 'Collapse clusters';
    expandButton.setAttribute('aria-pressed', collapsed ? 'true' : 'false');
  }

  function toggleAllClusters() {
    if (collapsedClusters.size > 0) collapsedClusters.clear();
    else clusters.forEach(function (cluster) { collapsedClusters.add(cluster.id); });
    allCollapsed = collapsedClusters.size === clusters.length;
    updateExpandButton();
    applyLayout(false);
  }

  function resetLayout() {
    collapsedClusters.clear();
    activeCluster = 'structural';
    selectedId = 'center';
    updateExpandButton();
    updateInspector(centerNode);
    applyLayout(true);
    clearHighlight();
  }

  function resize() {
    const rect = svg.getBoundingClientRect();
    width = Math.max(320, Math.round(rect.width));
    height = Math.max(640, Math.round(rect.height));
    const nextMobile = width <= 760;
    const modeChanged = nextMobile !== mobile;
    mobile = nextMobile;
    svg.setAttribute('viewBox', '0 0 ' + width + ' ' + height);
    renderBackdrop();
    if (modeChanged) {
      collapsedClusters.clear();
      activeCluster = activeCluster || 'structural';
    }
    applyLayout(modeChanged || !centerNode._x);
  }

  function buildAccessibleList() {
    if (!accessibleList) return;
    accessibleList.innerHTML = '';
    allNodes.forEach(function (node) {
      const li = document.createElement('li');
      li.textContent = (node.fullLabel || node.label.replace(/\n/g, ' ')) + ': ' + node.description;
      accessibleList.appendChild(li);
    });
  }

  if (pauseButton) {
    pauseButton.addEventListener('click', function () {
      paused = !paused;
      pauseButton.textContent = paused ? 'Resume motion' : 'Pause motion';
      pauseButton.setAttribute('aria-pressed', paused ? 'true' : 'false');
    });
  }
  if (resetButton) resetButton.addEventListener('click', resetLayout);
  if (expandButton) expandButton.addEventListener('click', toggleAllClusters);

  svg.addEventListener('pointerleave', function () { if (!dragging) clearHighlight(); });
  window.addEventListener('resize', resize, { passive: true });

  renderNodes();
  renderEdges();
  buildAccessibleList();
  updateInspector(centerNode);
  resize();
  clearHighlight();
  animationId = requestAnimationFrame(frame);

  window.addEventListener('beforeunload', function () { if (animationId) cancelAnimationFrame(animationId); });
})();
