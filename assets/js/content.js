/* EDIT THIS FILE to update projects, earlier work, web tools, learning resources, publications, conferences, and news. */
window.MHM_CONTENT = {

  /* Current Ph.D. projects and future research directions live here. Edit text, metrics, and tags without touching the layout. */
  projects: [
    {
      number: "01",
      eyebrow: "Aim 1 · United States · 2021 to 2025",
      title: "A population-scale phenotype atlas of H5N1 clade 2.3.4.4b",
      question: "What functional capacity was already present before and during emergence in cattle?",
      summary: "This project integrates approximately 13,000 U.S. hemagglutinin sequences and 2,195 unique HA variants with a time-resolved phylogeny, AlphaFold 3 structures, receptor-binding-site geometry, physicochemical traits, Rosetta and FoldX energetics, molecular dynamics simulations, and glycan-binding interpretation. It tests how standing phenotypic breadth, lineage sorting, and distributed structural change shape cross-host potential.",
      status: "First-author manuscript under review at Nature",
      metrics: ["13K+ HA sequences", "2,195 variants", "Avian and cattle lineages"],
      tags: ["Sequence", "Structure", "Function", "AlphaFold 3", "Rosetta", "Molecular dynamics", "Nextstrain"],
      visual: "atlas"
    },
    {
      number: "02",
      eyebrow: "Aim 2 · Global H5 · 1996 to 2026",
      title: "A global evolutionary and phenotypic atlas of H5",
      question: "How do ecological opportunity, host movement, and phenotypic breadth combine to shape the global evolutionary history of H5?",
      summary: "Using more than 37,000 H5 hemagglutinin sequences collected from 1996 through 2026, this aim reconstructs how genetic and phenotypic diversity is generated, transmitted, and retained across hosts, regions, clades, and epidemic waves. Time-scaled phylogenies and phylogeographic models quantify lineage movement, host transitions, persistence, and reassortment. Markov jumps and rewards estimate cross-host flow and residence, while structure-derived receptor-binding, stability, and physicochemical traits map functional change onto the tree. The objective is to identify repeatable evolutionary phases and lineages where ecological opportunity converges with phenotypic breadth, creating priority targets for surveillance.",
      status: "Global dataset curated through 2026",
      metrics: ["37K+ HA sequences", "4K+ variants", "1996 to 2026"],
      tags: ["Phylogeography", "Host transitions", "Markov jumps and rewards", "Lineage persistence", "Reassortment", "Structural phenotype"],
      visual: "global"
    },
    {
      number: "03",
      eyebrow: "Future direction · Predictive evolutionary biology",
      title: "A structure-informed predictive framework for phenotype and lineage fate",
      question: "Can evolutionary history, protein structure, host ecology, and measured phenotype be learned together rather than analyzed as separate data streams?",
      summary: "This future program will develop statistical and machine-learning frameworks that jointly represent sequence variation, time-scaled phylogenies, protein structure, receptor-site geometry, phenotype, host transitions, and ecological context. The conceptual architecture combines protein language models with structure-aware encoders, multimodal fusion, and flow matching to trace phenotype evolution, rank lineage fate, and identify surveillance priorities. RFdiffusion provides a reference for generative structural modeling, while the central methodological goal remains structure-informed phylodynamics. Foundational training and pilot design are in progress.",
      status: "Foundational training and pilot design in progress",
      metrics: ["Future direction", "Joint evolutionary model", "Pilot studies planned"],
      tags: ["Protein language models", "Flow matching", "Multimodal learning", "Structure-informed phylodynamics", "RFdiffusion"],
      visual: "learning"
    }
  ],

  foundations: [
    {
      number: "A",
      label: "M.S. thesis · Influenza H3N2",
      title: "Consensus-based influenza vaccine design",
      text: "Designed and evaluated consensus HA immunogens to capture sequence diversity while preserving structurally and antigenically important regions, using comparative modeling and integrated sequence and structure analysis.",
      tags: ["Consensus design", "HA", "Antigen engineering"],
      visual: "consensus"
    },
    {
      number: "B",
      label: "Strauch Lab · Viral fusion proteins",
      title: "A Rosetta-guided proline scanner",
      text: "Developed a computational design workflow that introduced candidate proline substitutions, evaluated structural consequences, compared energetic scores, and prioritized mutations for prefusion stabilization across influenza, RSV, hMPV, and SARS-CoV-2 systems.",
      tags: ["Rosetta", "Prefusion stabilization", "Proline scanning"],
      visual: "proline"
    },
    {
      number: "C",
      label: "Respiratory-virus structural biology",
      title: "Multi-virus protein and antigen modeling",
      text: "Applied structure prediction, energetic analysis, docking, and molecular dynamics simulation to questions in receptor specificity, glycosylation, antigen conservation, and vaccine design across respiratory viruses.",
      tags: ["RSV", "hMPV", "SARS-CoV-2", "Influenza A/B"],
      visual: "viruses"
    }
  ],

  tools: [
    {
      category: "Structure prediction",
      title: "AlphaFold Server",
      source: "Google DeepMind",
      description: "Predict biomolecular complexes with AlphaFold 3, including proteins, nucleic acids, ligands, ions, and modified residues.",
      link: "https://alphafoldserver.com/",
      cta: "Launch server",
      accent: "violet"
    },
    {
      category: "Structure prediction",
      title: "Robetta / RoseTTAFold",
      source: "Baker Lab",
      description: "Submit protein sequences and complexes through the Robetta interface, including RoseTTAFold-based prediction workflows.",
      link: "https://robetta.bakerlab.org/",
      cta: "Open Robetta",
      accent: "cyan"
    },
    {
      category: "Biomolecular AI",
      title: "Boltz",
      source: "MIT · Recursion",
      description: "Explore the open Boltz family for biomolecular complex structure prediction and, with Boltz-2, binding-affinity modeling.",
      link: "https://github.com/jwohlwend/boltz",
      cta: "View toolkit",
      accent: "coral"
    },
    {
      category: "Accessible folding",
      title: "ColabFold",
      source: "ColabFold",
      description: "Run accessible AlphaFold2 and AlphaFold-Multimer predictions in browser-based notebooks powered by fast MSA generation.",
      link: "https://colab.research.google.com/github/sokrypton/ColabFold/blob/main/AlphaFold2.ipynb",
      cta: "Open notebook",
      accent: "amber"
    },
    {
      category: "Experimental structures",
      title: "RCSB Protein Data Bank",
      source: "RCSB PDB",
      description: "Search, inspect, download, and interactively visualize experimentally determined biomolecular structures.",
      link: "https://www.rcsb.org/",
      cta: "Search structures",
      accent: "blue"
    },
    {
      category: "Phylogenomics",
      title: "Nextstrain / Auspice",
      source: "Nextstrain",
      description: "Explore and communicate pathogen evolution through interactive phylogenies, metadata, geography, and genomic change.",
      link: "https://nextstrain.org/",
      cta: "Explore platform",
      accent: "mint"
    }
  ],

  resources: [
    {
      category: "Protein design community",
      title: "Boston Protein Design and Modeling Club",
      source: "BPDMC",
      description: "Research seminars and community talks spanning computational protein engineering, structure, dynamics, and modern design methods.",
      link: "https://www.youtube.com/@bpdmc/videos",
      cta: "Watch talks"
    },
    {
      category: "AI protein design",
      title: "Machine Learning for Protein Design Bootcamp",
      source: "Rosetta Commons",
      description: "A practical playlist covering AlphaFold, ESMFold, ProteinMPNN, RFdiffusion, PyTorch, and end-to-end design workflows.",
      link: "https://www.youtube.com/playlist?list=PLFavr8uo6kSr9ms7g7eQI5CqAJSP8kpf7",
      cta: "Watch bootcamp"
    },
    {
      category: "Structural biology",
      title: "Protein folding explained",
      source: "Google DeepMind",
      description: "A clear introduction to why protein structure matters and how AlphaFold changed computational structural biology.",
      link: "https://www.youtube.com/watch?v=KpedmJdrTpY",
      cta: "Watch video"
    },
    {
      category: "Phylodynamics",
      title: "Phylodynamics: concepts and applications",
      source: "Fogarty International Center",
      description: "A focused video series on using pathogen genomes and evolutionary models to reconstruct transmission and population history.",
      link: "https://www.youtube.com/playlist?list=PLS4EOa5fdsSvBkARqHV_cuBKLw9aMAlum",
      cta: "Watch series"
    },
    {
      category: "Genomic surveillance",
      title: "Nextstrain narratives tutorial",
      source: "Nextstrain",
      description: "A step-by-step playlist for exploring, building, and communicating pathogen-evolution stories with Nextstrain narratives.",
      link: "https://www.youtube.com/playlist?list=PLsFWZl6SQqWxN9SkbgdjU8sylIfhZNDiW",
      cta: "Watch tutorials"
    },
    {
      category: "Machine learning",
      title: "CS229: Machine Learning",
      source: "Stanford Online",
      description: "A rigorous foundation in supervised and unsupervised learning, learning theory, neural networks, and model evaluation.",
      link: "https://www.youtube.com/playlist?list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU",
      cta: "Watch course"
    }
  ],

  publications: [
    {
      year: "2026",
      type: "manuscript",
      selected: true,
      status: "Under review · Nature",
      title: "Standing HA phenotypic breadth shapes H5N1 cross-host potential",
      authors: "Mubassir, M. H. M.; Subedi, S.; Rajamand, T.; Bakheet, M. A.; Carmola, L. R.; Peng, S.; Kandel, R.; Stott, G.; Woods, R. J.; Tompkins, S. M.; Boons, G. J.; Bahl, J.",
      venue: "Nature · Manuscript under review",
      link: ""
    },
    {
      year: "2026",
      type: "manuscript",
      selected: true,
      status: "Preprint · Under review",
      title: "Dynamic Risk Maps Predict Highly Pathogenic Avian Influenza Hotspots Across North America",
      authors: "Bakheet, M. A.; Babasola, O.; Næsborg-Nielsen, C.; Subedi, S.; Mubassir, M. H. M.; Peng, S.; Rajamand, T.; Bahl, J.",
      venue: "Research Square",
      link: "https://doi.org/10.21203/rs.3.rs-8605487/v1"
    },
    {
      year: "2026",
      type: "manuscript",
      selected: true,
      status: "Under review",
      title: "Ecological and evolutionary drivers of 2.3.4.4b H5Nx HPAI spread in Europe",
      authors: "Subedi, S.; Mubassir, M. H. M.; Rajamand, T.; Bakheet, M. A.; Carmola, L. R.; Lyu, L.; Babasola, O.; Peng, S.; Liu, Y.; Kirkeby, C.; Bahl, J.",
      venue: "Communications Biology · Manuscript under review",
      link: ""
    },
    {
      year: "2026",
      type: "journal",
      selected: true,
      status: "Published",
      title: "A phylogeny-informed mathematical modeling of HPAI H5N1 transmission dynamics and effectiveness of control measures",
      authors: "Babasola, O.; Bakheet, M.; Næsborg-Nielsen, C.; Subedi, S.; Mubassir, M. H. M.; Bahl, J.",
      venue: "One Health 23, 101490",
      link: "https://doi.org/10.1016/j.onehlt.2026.101490"
    },
    {
      year: "2026",
      type: "journal",
      selected: true,
      status: "Published",
      title: "A time-delayed epidemic model for control of highly pathogenic avian influenza (HPAI H5Nx) with vaccination, compliance, and non-pharmaceutical interventions",
      authors: "Babasola, O.; Bakheet, M.; Næsborg-Nielsen, C.; Subedi, S.; Mubassir, M. H. M.; Bahl, J.",
      venue: "Frontiers in Public Health 14, 1819528",
      link: "https://doi.org/10.3389/fpubh.2026.1819528"
    },
    {
      year: "2025",
      type: "journal",
      selected: true,
      status: "Editor’s Pick",
      title: "N-glycosylation at the receptor binding site drives differences in receptor binding specificity between influenza B virus lineages",
      authors: "Page, C. K.; Mubassir, M. H. M.; Chopra, P.; Gay, L. C.; Geiger, G.; Ray, S. D.; Shepard, J. D.; Miller, R. J.; Perez, D.; Bahl, J.; Boons, G. J.; Tompkins, S. M.",
      venue: "Journal of Virology 99(11), e01039-25",
      link: "https://doi.org/10.1128/jvi.01039-25"
    },
    {
      year: "2025",
      type: "journal",
      selected: true,
      status: "Published",
      title: "Evolving fitness and immune escape: A retrospective analysis of SARS-CoV-2 spike protein (2020–2024) using a protein language model",
      authors: "Peng, S.; Lyu, L.; Carmola, L. R.; Subedi, S.; Mubassir, M. H. M.; Bakheet, M. A.; Bahl, J.",
      venue: "Frontiers in Immunology 16, 1576414",
      link: "https://doi.org/10.3389/fimmu.2025.1576414"
    },
    {
      year: "2026",
      type: "manuscript",
      selected: false,
      status: "In preparation",
      title: "MHC-II-EpiPred: Sliding-window scanning for MHC class II epitope discovery via a protein language model",
      authors: "Peng, S.; Carmola, L. R.; Lyu, L.; Subedi, S.; Mubassir, M. H. M.; Bakheet, M. A.; Bahl, J.",
      venue: "Collaborative manuscript in preparation",
      link: ""
    },
    {
      year: "2026",
      type: "manuscript",
      selected: false,
      status: "In preparation",
      title: "PhyloSpillover: Graph neural network-based prediction of pre-emergence zoonotic spillover risk from avian influenza H5N1 using multi-host phylodynamic simulations",
      authors: "Subedi, S.; Mubassir, M. H. M.; Rajamand, T.; Bakheet, M. A.; Carmola, L. R.; Babasola, O.; Peng, S.; Bahl, J.",
      venue: "Collaborative manuscript in preparation",
      link: ""
    },
    {
      year: "2026",
      type: "manuscript",
      selected: false,
      status: "In preparation",
      title: "A graph neural network framework for epidemiologically informed phylodynamics of avian influenza H5N1 reassortment in Europe",
      authors: "Subedi, S.; Mubassir, M. H. M.; Rajamand, T.; Bakheet, M. A.; Carmola, L. R.; Babasola, O.; Peng, S.; Bahl, J.",
      venue: "Collaborative manuscript in preparation",
      link: ""
    },
    {
      year: "2026",
      type: "manuscript",
      selected: false,
      status: "In preparation",
      title: "Phenotypic diversity as an early signal of zoonotic spillover risk",
      authors: "Mubassir, M. H. M.; Subedi, S.; Rajamand, T.; Bakheet, M. A.; Carmola, L. R.; Peng, S.; Babasola, O.; Tompkins, S. M.; Boons, G. J.; Bahl, J.",
      venue: "Distinct follow-up manuscript in preparation",
      link: ""
    },
    {
      year: "2026",
      type: "manuscript",
      selected: false,
      status: "In preparation",
      title: "Host lineage shapes gut microbiome structural architecture at the poultry–wildlife interface of avian influenza",
      authors: "Næsborg-Nielsen, C.; Mubassir, M. H. M.; Carmola, L. R.; Peng, S.; Babasola, O.; Bakheet, M. A.; Bahl, J.",
      venue: "Collaborative manuscript in preparation",
      link: ""
    },
    {
      year: "2026",
      type: "manuscript",
      selected: false,
      status: "In preparation",
      title: "A reproducible R-based protocol for preprocessing avian influenza A (H5Nx, clade 2.3.4.4b) sequence data from GISAID for phylogenetic analysis",
      authors: "Rajamand, T.; Subedi, S.; Mubassir, M. H. M.; Bakheet, M. A.; Bahl, J.",
      venue: "Collaborative manuscript in preparation",
      link: ""
    },
    {
      year: "2026",
      type: "manuscript",
      selected: false,
      status: "In preparation",
      title: "Standardized wild and domestic host annotations for global avian influenza A (H5Nx, clade 2.3.4.4b) sequences: A curated classification resource",
      authors: "Rajamand, T.; Subedi, S.; Mubassir, M. H. M.; Bakheet, M. A.; Bahl, J.",
      venue: "Target journal: Scientific Data",
      link: ""
    },
    {
      year: "2026",
      type: "manuscript",
      selected: false,
      status: "In preparation",
      title: "Modeling the risk of HPAI H5N1 spread through cattle networks: Implications for cross-species transmission and pandemic prevention",
      authors: "Rajamand, T.; Subedi, S.; Mubassir, M. H. M.; Bakheet, M. A.; Lyu, L.; Babasola, O.; Bahl, J.",
      venue: "Collaborative manuscript in preparation",
      link: ""
    },
    {
      year: "2026",
      type: "manuscript",
      selected: false,
      status: "In preparation",
      title: "Quantifying cross-host transmission and seasonal phase structure of U.S. H5N1 using integrated phylodynamics and incidence",
      authors: "Bakheet, M. A.; Babasola, O.; Næsborg-Nielsen, C.; Subedi, S.; Mubassir, M. H. M.; Peng, S.; Rajamand, T.; Bahl, J.",
      venue: "Collaborative manuscript in preparation",
      link: ""
    },
    {
      year: "2024",
      type: "journal",
      selected: false,
      status: "Published",
      title: "A mathematical model for understanding and controlling monkeypox transmission dynamics in the United States and its implications for future epidemic management",
      authors: "Islam, M. A. I.; Mubassir, M. H. M.; Paul, A. K.; Shanta, S. S.",
      venue: "Decoding Infection and Transmission 2, 100031",
      link: "https://doi.org/10.1016/j.dcit.2024.100031"
    },
    {
      year: "2023",
      type: "journal",
      selected: false,
      status: "Published",
      title: "Effect of D128N mutation in OsSERK2 in Xa21-mediated innate immunity",
      authors: "Mubassir, M. H. M.; Alvy, R. I.",
      venue: "Advances in Agriculture",
      link: ""
    },
    {
      year: "2022",
      type: "journal",
      selected: false,
      status: "Published",
      title: "How Arabidopsis receptor-like kinase 7 (RLK7) manifests: Delineating its structure and function",
      authors: "Chowdhury, R.; Mubassir, M. H. M.",
      venue: "Advances in Agriculture 2022, 4715110",
      link: ""
    },
    {
      year: "2020",
      type: "journal",
      selected: false,
      status: "Published",
      title: "Comprehensive in silico modeling of multi-domain plant PRR Xa21 and its interaction with PAMP RaxX21-sY",
      authors: "Mubassir, M. H. M.; Naser, M. A.; Abdul-Wahab, M. F.; Jawad, T.; Alvy, R. I.; Hamdan, S.",
      venue: "RSC Advances 10(27), 15800–15814",
      link: "https://doi.org/10.1039/D0RA01396J"
    },
    {
      year: "2019",
      type: "journal",
      selected: false,
      status: "Published",
      title: "A brief overview on early events of Xa21-mediated pattern-triggered immunity",
      authors: "Mubassir, M. H. M.; Naser, M. A.; Abdul-Wahab, M. F.; Hamdan, S.",
      venue: "Journal of Chemical and Pharmaceutical Sciences 12(2), 1–5",
      link: ""
    },
    {
      year: "2019",
      type: "journal",
      selected: false,
      status: "Published",
      title: "A synopsis of different plant LRR-RLK structures and functionality",
      authors: "Mubassir, M. H. M.",
      venue: "American Journal of Biomedical Science & Research 1(2), 84–86",
      link: ""
    },
    {
      year: "2017",
      type: "journal",
      selected: false,
      status: "Published",
      title: "In-silico structural modeling and molecular dynamics simulation of pathogen-associated molecular pattern RaxX21",
      authors: "Mubassir, M. H. M.; Naser, M. A.; Abdul-Wahab, M. F.; Hamdan, S.",
      venue: "Journal of Chemical and Pharmaceutical Sciences 10(1), 121–126",
      link: ""
    },
    {
      year: "2016",
      type: "journal",
      selected: false,
      status: "Published",
      title: "Measurement of phenotypic variation for control and bacterial-leaf-blight-inoculated rice lines and varieties",
      authors: "Mubassir, M. H. M.; Nasiruddin, K. M.; Shahin, N. H.; Begum, S. N.; Sultana, A.; Rashid, A. Q. M. B.",
      venue: "American Journal of Bioscience and Bioengineering 4(6), 59–64",
      link: ""
    },
    {
      year: "2016",
      type: "journal",
      selected: false,
      status: "Published",
      title: "SSR marker-based genetic diversity analysis of some rice lines and varieties for bacterial leaf blight resistance",
      authors: "Mubassir, M. H. M.; Nasiruddin, K. M.; Shahin, N. H.; Begum, S. N.; Saha, M. K.; Rashid, A. Q. M. B.",
      venue: "Journal of Pharmaceutical, Chemical and Biological Sciences 4(4), 475–486",
      link: ""
    },
    {
      year: "2016",
      type: "journal",
      selected: false,
      status: "Published",
      title: "Morpho-molecular screening for bacterial leaf blight resistance in some rice lines and varieties",
      authors: "Mubassir, M. H. M.; Nasiruddin, K. M.; Shahin, N. H.; Begum, S. N.; Saha, M. K.; Rashid, A. Q. M. B.",
      venue: "Journal of Plant Sciences 4(6), 146–152",
      link: ""
    }
  ],

  conferences: [
    { year: "2026", type: "Presentation", title: "An evolutionary trajectory of H5 hemagglutinin phenotypes across U.S. clade 2.3.4.4b", event: "Ecology and Evolution of Infectious Diseases · Virginia Tech · Blacksburg, VA · June 1 to 4" },
    { year: "2026", type: "Presentation", title: "Phenotypic flexibility, rather than optimization, governs pandemic potential", event: "CEIRR 5th Annual Network Meeting · Emory University · Atlanta, GA · May 26 to 29" },
    { year: "2025", type: "Poster", title: "An integrative atlas of receptor-binding evolution in U.S. H5N1 2.3.4.4b viruses", event: "CEIRR 4th Annual Network Meeting · University of Georgia · Athens, GA · May 27 to 30" },
    { year: "2024", type: "Poster", title: "Integrating molecular dynamics and phylodynamics to unravel sialic-acid and HA interaction patterns in avian H5 2.3.4.4b influenza", event: "CEIRR Conference · New York, NY" },
    { year: "2022", type: "Poster", title: "Establishing a proline scanner for stabilizing virus class I fusion proteins", event: "RosettaCon · USA" },
    { year: "2017", type: "Presentation", title: "Structural dynamics of endogenous peptide AtPep1", event: "ASIA International Multidisciplinary Conference · Malaysia" }
  ],

  news: [
    { date: "JUL 2026", category: "Manuscript", title: "First-author H5N1 phenotype manuscript is under review at Nature.", link: "" },
    { date: "JUN 2026", category: "Publications", title: "Two HPAI modeling studies were published in One Health and Frontiers in Public Health.", link: "https://doi.org/10.1016/j.onehlt.2026.101490" },
    { date: "JAN 2026", category: "Preprint", title: "Dynamic risk maps identify shifting HPAI hotspots across North America.", link: "https://doi.org/10.21203/rs.3.rs-8605487/v1" },
    { date: "NOV 2025", category: "Research feature", title: "UGA featured our Journal of Virology Editor’s Pick study on influenza B receptor specificity.", link: "https://thescope.vet.uga.edu/flu-b-at-uga" }
  ]
};
