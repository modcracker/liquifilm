export interface ArticleSection {
  title: string;
  body: string;
}

export interface TechnicalArticle {
  slug: string;
  title: string;
  category: string;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  introduction: string;
  sections: ArticleSection[];
  keyPoints: string[];
}

export interface GlossaryTerm {
  slug: string;
  title: string;
  category: 'formats' | 'color' | 'preservation' | 'restoration' | 'scanning' | 'printing' | 'sound' | 'institutions';
  categoryLabel: string;
  shortDefinition: string;
  detailedExplainer: string;
}

export interface DirectoryEntry {
  slug: string;
  title: string;
  region: string;
  status: string;
  generalMission: string;
  description: string;
}

// 1. WET GATE PRINTING ARTICLES (15 pages)
export const WET_GATE_PAGES: TechnicalArticle[] = [
  {
    slug: "how-it-works",
    title: "How Wet Gate Printing Works: Refractive Index Matching",
    category: "Wet Gate Core",
    summary: "Understand the physics of refractive index matching to eliminate film scratches temporarily during duplication or scanning.",
    metaTitle: "How Wet Gate Printing Works - Refractive Index Matching | Liquifilm",
    metaDescription: "Learn the scientific principles behind wet gate film printing. Understand how liquid refraction index matching hides physical film scratches.",
    introduction: "In motion picture film preservation, physical scratches on the base or emulsion layer can severely degrade the scanned image. Wet gate printing resolves this problem through the elegant application of optical physics.",
    sections: [
      {
        title: "The Optical Problem of Scratches",
        body: "When light passes through a dry film gate, any physical scratch on the film base or emulsion acts as a miniature lens or prism. The air-to-plastic interface bends the light rays irregularly, scattering them. In the resulting print or digital scan, this light scatter appears as dark or light vertical lines and blemishes."
      },
      {
        title: "Solving with Refractive Index Matching",
        body: "By submerging the film in a liquid with a refractive index nearly identical to that of the film base (cellulose triacetate is approx 1.490, polyester is 1.640), the optical boundary is completely neutralized. Light traveling from the glass gate through the liquid and then into the film does not bend at the scratch's edge. The scratch becomes optically invisible."
      }
    ],
    keyPoints: [
      "Light refraction occurs at the boundary of mediums with different densities.",
      "Cellulose acetate has a refractive index of approximately 1.490.",
      "Selecting a liquid that matches this value stops light from scattering at scratch boundaries.",
      "The scratch remains physically on the film but is completely absent from the optical path."
    ]
  },
  {
    slug: "open-face-vs-submerged",
    title: "Open-Face vs. Submerged Wet Gate Systems",
    category: "Gate Variants",
    summary: "Compare the two primary technical methodologies used to coat film in indexing fluid during high-speed scans.",
    metaTitle: "Open-Face vs Submerged Wet Gate Systems | Liquifilm",
    metaDescription: "An in-depth engineering comparison of open-face and fully submerged wet gate film scanning mechanisms.",
    introduction: "Engineers have developed two primary mechanical methodologies for applying index-matching fluid to moving film strips: open-face gates and fully submerged chambers.",
    sections: [
      {
        title: "Open-Face Wet Gates",
        body: "Open-face systems apply a thin layer of liquid to both sides of the film immediately before it passes the aperture. Capillary action spreads the fluid evenly under tension. These systems use less fluid and are easier to clean, but are sensitive to air bubbles and high-speed evaporation."
      },
      {
        title: "Submerged Chamber Gates",
        body: "Submerged systems pull the entire film path through a sealed chamber filled completely with fluid. This guarantees 100% elimination of air boundaries and allows high-speed scanning without dry patches, though it requires robust plumbing, specialized seals, and higher volumes of fluid."
      }
    ],
    keyPoints: [
      "Open-face systems utilize capillary action and surface tension to apply thin layers.",
      "Submerged gates house the entire optical aperture inside a fluid-filled vessel.",
      "Submerged gates offer superior bubble elimination at high transport speeds.",
      "Open-face gates allow simpler mechanical designs and faster film loading times."
    ]
  },
  {
    slug: "liquid-gate-method",
    title: "The Pressurized Liquid Gate Method",
    category: "Gate Variants",
    summary: "How pressurized fluid delivery systems prevent micro-bubbles and ensure uniform liquid distribution across the film plane.",
    metaTitle: "The Pressurized Liquid Gate Method | Liquifilm",
    metaDescription: "Learn how pressurized fluid gates maintain a perfect optical plane and eliminate micro-bubbles during high-resolution film scanning.",
    introduction: "As scanning resolutions migrated from 2K to 4K and 8K, micro-bubbles inside the index fluid became a major threat to image quality. The pressurized liquid gate was designed to solve this.",
    sections: [
      {
        title: "Eliminating Micro-Bubbles with Pressure",
        body: "In a pressurized liquid gate, the fluid is pumped into the optical gate under controlled micro-pressure. This pressure dissolves tiny pockets of air back into the fluid and ensures that the liquid layer maintains an absolutely uniform, micro-thin profile across the entire aperture plane."
      },
      {
        title: "Recirculation and Filtration",
        body: "Pressurized systems must continuously recirculate the fluid through micron-scale filters to remove suspended dust particles, emulsion flakes, and atmospheric contaminants that could otherwise act as focal points under high magnification."
      }
    ],
    keyPoints: [
      "Active pressurization forces micro-bubbles out of the optical path.",
      "Ensures absolute uniformity across wide-gauge film gates (like 35mm and 70mm).",
      "Requires advanced multi-stage filtration loops down to 0.5 microns.",
      "Prevents physical friction between the fragile film emulsion and glass gate surfaces."
    ]
  },
  {
    slug: "ott-gate-history",
    title: "History of the Wet Gate: The Ott Gate Legacy",
    category: "History",
    summary: "Trace the historical origin of the liquid gate printer, pioneered for optical special effects and physical archive preservation.",
    metaTitle: "History of the Wet Gate - The Ott Gate Legacy | Liquifilm",
    metaDescription: "Discover the historical origins of wet gate printing, starting with the innovative designs of John Ott and optical printer pioneers.",
    introduction: "Before digital tools, wet gate printing was the primary method for saving scratched negatives. Its origins lie in the golden age of optical visual effects printing.",
    sections: [
      {
        title: "John Ott's Pioneering Vision",
        body: "In the mid-20th century, optical engineers like John Ott and lab technicians began experimenting with immersing film in organic solvents during optical printing. Their goal was to produce clean duplicate negatives for theatrical release without carrying over physical handling scratches from the original negative."
      },
      {
        title: "Pervasive Optical Printing Standard",
        body: "By the 1970s, liquid gates became standard equipment in optical printing houses worldwide. Classic films with heavy visual effects relied on wet gates to keep composite shots crisp and blemish-free."
      }
    ],
    keyPoints: [
      "Developed mid-century to overcome the limitations of physical film polishing.",
      "John Ott's foundational ideas revolutionized optical duplicating and special effects.",
      "Became critical for making safety duplicate negatives from decaying nitrate films.",
      "Laid the technical groundwork for modern digital wet gate scanners."
    ]
  },
  {
    slug: "perchloroethylene",
    title: "Perchloroethylene: The Traditional Liquid Medium",
    category: "Chemicals",
    summary: "Deep dive into 'Perc', the historically dominant chemical solvent used for refractive index matching.",
    metaTitle: "Perchloroethylene in Film Restoration | Liquifilm",
    metaDescription: "A comprehensive review of Perchloroethylene (Perc) as the traditional index-matching fluid in wet gate printing.",
    introduction: "For decades, one chemical stood as the undisputed standard for wet gate operations: Perchloroethylene (commonly known as 'Perc'). Its physical properties made it uniquely suited for the job.",
    sections: [
      {
        title: "The Optical and Physical Properties of Perc",
        body: "Perchloroethylene ($C_2Cl_4$) has a refractive index of approximately 1.505, which is an exceptionally close match to cellulose triacetate film base (1.490). Furthermore, Perc evaporates quickly and clean, leaving no residue on the film surface, and is non-flammable, which was vital in hazardous film lab environments."
      },
      {
        title: "The Downside: Heavy Toxicity",
        body: "Despite its unmatched optical performance, Perchloroethylene is a chlorinated hydrocarbon. It is a known human carcinogen and environmental hazard, requiring heavily sealed containment systems and specialized personal protective equipment to handle safely."
      }
    ],
    keyPoints: [
      "Refractive index of 1.505 offers a near-perfect match for cellulose triacetate.",
      "Leaves zero residue or oily sheen on the dried film stock.",
      "Classified as a volatile organic compound (VOC) and suspected carcinogen.",
      "Strictly regulated in modern facilities, driving the search for alternative solvents."
    ]
  },
  {
    slug: "health-safety",
    title: "Health & Safety in Wet Gate Lab Operations",
    category: "Chemicals",
    summary: "Critical safety procedures, ventilation requirements, and PPE needed when managing toxic index fluids.",
    metaTitle: "Health & Safety in Wet Gate Operations | Liquifilm",
    metaDescription: "Learn the essential safety regulations, ventilation designs, and PPE requirements for film labs running wet gates.",
    introduction: "Working with traditional wet gate solvents requires absolute adherence to industrial hygiene and safety protocols. Film archives must protect technicians from chemical vapors.",
    sections: [
      {
        title: "Engineering Controls: Closed Loops and Local Exhaust",
        body: "Modern wet gate film scanners feature closed-loop fluid systems that minimize human exposure. Labs must be equipped with localized exhaust hoods (Fume Hoods) that draw solvent vapors down and away from the operator's breathing zone."
      },
      {
        title: "Personal Protective Equipment (PPE) Requirements",
        body: "When filling, draining, or servicing wet gate equipment, operators must wear chemical-resistant gloves (Viton or Nitrile), splash goggles, and an organic-vapor respirator if ambient ventilation levels fall below regulatory limits."
      }
    ],
    keyPoints: [
      "Local exhaust ventilation is the primary defense against vapor inhalation.",
      "Technicians must use chemical-impermeable gloves explicitly rated for chlorinated solvents.",
      "Regular air-quality monitoring is mandatory in professional film restoration labs.",
      "Sealed waste storage prevents dangerous evaporation of volatile solvents into workspace air."
    ]
  },
  {
    slug: "alternative-solvents",
    title: "Alternative Solvents: Transitioning to Greener Fluids",
    category: "Chemicals",
    summary: "Explore the modern, eco-friendly, and non-toxic fluids replacing Perchloroethylene in contemporary archives.",
    metaTitle: "Alternative Wet Gate Solvents & Green Fluids | Liquifilm",
    metaDescription: "Discover modern, safer, and eco-friendly chemical alternatives to Perchloroethylene for wet gate film scanning.",
    introduction: "Driven by strict environmental laws and worker safety concerns, film archives are transitioning away from Perchloroethylene to safer, non-toxic alternatives.",
    sections: [
      {
        title: "Fluorinated Specialty Fluids",
        body: "Contemporary scanners utilize specialized fluorinated fluids (such as 3M Novec or similar engineered fluids). These chemicals offer excellent refractive index matching, evaporate quickly, and are non-flammable with significantly lower toxicity profiles."
      },
      {
        title: "Water-Soluble and Synthetic Lubricants",
        body: "For specific applications, synthetic oils or highly refined light paraffin liquids are used. While exceptionally safe, they evaporate slowly and require an active post-scan physical cleaning step to remove residue completely from the film."
      }
    ],
    keyPoints: [
      "Modern engineered fluids drastically reduce carcinogen risks for lab technicians.",
      "Fluorinated solvents maintain the high evaporation rates required for fast scanning speeds.",
      "Requires re-calibration of the scanner's optical path due to minor index differences.",
      "Helps archives comply with modern environmental regulations like REACH."
    ]
  },
  {
    slug: "environmental-disposal",
    title: "Environmental Regulations & Hazardous Waste Disposal",
    category: "Chemicals",
    summary: "A practical guide to complying with EPA, OSHA, and global environmental standards for chemical storage and waste.",
    metaTitle: "Environmental Regulations & Wet Gate Waste Disposal | Liquifilm",
    metaDescription: "A guide to global environmental compliance and safe disposal of hazardous wet gate solvents like Perc.",
    introduction: "Film restoration labs operating wet gates must maintain rigid compliance with hazardous waste regulations. Improper solvent management carries severe penalties.",
    sections: [
      {
        title: "Classifying and Storing Waste",
        body: "Spent indexing fluid, contaminated cleaning wipes, and used filter cartridges must be stored in labeled, heavy-duty, vapor-tight steel drums. These materials must be kept in dedicated secondary containment areas to prevent accidental ground contamination."
      },
      {
        title: "Manifest and Chain of Custody",
        body: "Under EPA regulations (or local equivalents), labs must utilize licensed hazardous waste haulers. Every shipment requires a waste manifest tracking the material from the lab to its final certified destruction or recycling facility."
      }
    ],
    keyPoints: [
      "Chlorinated solvents like Perchloroethylene are classified as hazardous waste.",
      "Secondary containment units must hold at least 110% of the largest stored tank volume.",
      "Detailed storage logs and EPA manifest tracking are legally required for audits.",
      "Spill kits with specialized absorption pads must be immediately accessible in the gate area."
    ]
  },
  {
    slug: "arriscan-wet-gate",
    title: "ARRI's Flagship Wet Gate Technology: ARRISCAN Integration",
    category: "Equipment",
    summary: "Deep dive into the ARRISCAN's wet gate design, utilizing precise fluid layers for high-resolution archival scanning.",
    metaTitle: "ARRI ARRISCAN Wet Gate Technology | Liquifilm",
    metaDescription: "Learn how the ARRISCAN film scanner integrates specialized liquid gates to restore damaged 35mm and 16mm archives.",
    introduction: "The ARRISCAN has long been a benchmark in archival film scanning. Its integrated wet gate system is a masterpiece of precision mechanical and optical engineering.",
    sections: [
      {
        title: "Integrated Fluid Layering",
        body: "Unlike bulky add-on gates, ARRI's design integrates the fluid supply directly into the transport path. The film is sandwiched between optical glass plates and flooded with fluid, ensuring that even deep base scratches disappear entirely from the 4K or 6K sensor's view."
      },
      {
        title: "Gentle Transport for Shrunk Film",
        body: "The ARRISCAN wet gate is built to accommodate fragile, shrunk archival film. The fluid itself acts as a lubricant, reducing friction and stress on damaged sprocket holes during the scanning cycle."
      }
    ],
    keyPoints: [
      "Direct integration into the optical pathway reduces alignment errors.",
      "Maintains a perfect, flattened focus plane for high-resolution scanning.",
      "Specifically engineered to minimize tension on brittle and fragile film bases.",
      "Features quick-change gates for rapid switching between 35mm and 16mm gauges."
    ]
  },
  {
    slug: "imagica-wet-gate",
    title: "The Imagica Wet Gate System: High-Speed Precision",
    category: "Equipment",
    summary: "Review the mechanical and fluid-dynamics innovations pioneered by Japan's Imagica in professional film duplication.",
    metaTitle: "Imagica Wet Gate Scanning Technology | Liquifilm",
    metaDescription: "Examine the technical features of the Imagica wet gate scanning system, known for high-speed fluid dynamics.",
    introduction: "Japan's Imagica has made historic contributions to film laboratory equipment. Their wet gate systems are renowned for handling high-volume, high-speed restoration workflows.",
    sections: [
      {
        title: "Optimized Fluid Dynamics",
        body: "Imagica's wet gate utilizes advanced fluid dynamics to maintain a continuous, bubble-free liquid stream across the film even at high transport speeds. This allows for rapid scanning of long-form archival releases without frequent halts to purge air."
      },
      {
        title: "Advanced Drying Chambers",
        body: "A key feature of the Imagica system is its high-efficiency drying stage. As the film leaves the gate, high-velocity air knives strip and evaporate the remaining fluid instantly, preparing the film for immediate wind-up."
      }
    ],
    keyPoints: [
      "Engineered for high-volume lab operations and rapid transport speeds.",
      "Active 'air knife' system ensures the film is 100% dry before spooling.",
      "Robust stainless-steel fluid circulation pumps prevent chemical corrosion.",
      "Excellent performance with historical color print stocks and negatives."
    ]
  },
  {
    slug: "equipment-comparison",
    title: "Wet Gate Equipment Comparison Guide",
    category: "Equipment",
    summary: "An objective engineering matrix comparing contemporary and classic wet gate hardware solutions.",
    metaTitle: "Wet Gate Scanning Equipment Comparison | Liquifilm",
    metaDescription: "An objective technical comparison of major wet gate scanning hardware, including ARRI, Imagica, and vintage systems.",
    introduction: "Choosing the right wet gate hardware requires balancing film gauge support, scanning speeds, chemical compatibility, and budget.",
    sections: [
      {
        title: "Comparing the Giants: ARRI vs. Imagica vs. Specialty Scanners",
        body: "While ARRI focuses on absolute optical alignment and modular gauge support, Imagica systems excel in throughput and drying efficiency. Custom-built scanners (like Lasergraphics or dft Scanity wet gates) focus on continuous transport speeds and low-tension sprocketless designs."
      },
      {
        title: "Key Selection Metrics",
        body: "Archives must consider: Is the system compatible with modern green fluids? Can it handle safety film with high shrinkage (over 2%)? Is the setup time per reel suitable for small archival staffs?"
      }
    ],
    keyPoints: [
      "Sprocketless transport is critical for severely damaged or shrunk archival film.",
      "Verify chemical compatibility of the scanner's internal seals before switching fluids.",
      "Consider the drying rate: slow drying can lead to water spots or emulsion sticking.",
      "Assess modularity: can a single scanner scan 8mm, 16mm, and 35mm wet gate?"
    ]
  },
  {
    slug: "vs-digital-restoration",
    title: "Wet Gate vs. Digital Software Scratch Removal",
    category: "Methodology",
    summary: "Analyze the trade-offs between physical optical scratch removal and post-scan software interpolation.",
    metaTitle: "Wet Gate vs Digital Scratch Removal | Liquifilm",
    metaDescription: "An engineering analysis of physical wet gate scratch removal versus post-scan digital restoration algorithms.",
    introduction: "Is physical wet gate printing still necessary in the age of advanced AI and digital restoration software? The answer lies in the distinction between capturing real data and interpolating missing pixels.",
    sections: [
      {
        title: "Digital Artifacts and Interpolation Risks",
        body: "Software 'dust-busting' and scratch removal algorithms work by identifying defects and interpolating pixels from adjacent frames or surrounding areas. On highly detailed film grains or fast-moving action, this can create digital artifacts, soften the image, or accidentally delete real visual data (like thin wires, rain, or stars)."
      },
      {
        title: "The Wet Gate Advantage",
        body: "Wet gate scanning does not interpolate. It physically allows the scanner's sensor to capture the actual, original emulsion details *through* the physical scratch. The original grain structure and fine details remain 100% pure and untouched."
      }
    ],
    keyPoints: [
      "Wet gate captures authentic physical data; digital restoration interpolates.",
      "Software removal can degrade fine textures, film grain, and rapid motion details.",
      "Wet gate is the gold standard for creating archival master files.",
      "Digital tools are best used to clean minor leftover dust that wet gates cannot dissolve."
    ]
  },
  {
    slug: "hybrid-workflows",
    title: "Hybrid Workflows: Physical Restoration Meets Digital Tools",
    category: "Methodology",
    summary: "How modern labs combine wet gate physical scans with digital software for the ultimate restoration quality.",
    metaTitle: "Hybrid Film Restoration Workflows | Liquifilm",
    metaDescription: "Learn how modern labs merge physical wet gate scanning with digital software tools for optimal film restoration.",
    introduction: "The most successful film restorations do not choose between physical and digital; they construct a seamless, highly optimized hybrid workflow.",
    sections: [
      {
        title: "Step 1: Physical Prep and Wet Gate Scan",
        body: "The workflow begins with physical repair, ultrasonic cleaning, and a high-resolution wet gate scan. This eliminates 90% of base scratches, yielding a clean, razor-sharp digital master that retains all original grain structure."
      },
      {
        title: "Step 2: Targeted Digital Cleanup",
        body: "With the major physical damage neutralized by the wet gate, digital artists can focus software tools exclusively on unpreventable issues: optical flicker, chemistry staining, mold damage, and complex tear reconstruction."
      }
    ],
    keyPoints: [
      "Physical scanning reduces the labor and cost of digital post-production by up to 70%.",
      "Keeps the final image looking organic, preserving the distinct texture of the film stock.",
      "Allows digital software to run on a highly stabilized, glare-free source image.",
      "Maximizes the dynamic range and clarity of the resulting digital master files."
    ]
  },
  {
    slug: "35mm-vs-16mm",
    title: "Wet Gate Calibration: 35mm vs. 16mm Film",
    category: "Methodology",
    summary: "Technical nuances, fluid layer thickness, and tension calibration differences between gauge standards.",
    metaTitle: "Wet Gate Calibration: 35mm vs 16mm Film Gauges | Liquifilm",
    metaDescription: "Examine the technical calibration differences, fluid thickness, and mechanical tensions when wet gate scanning 35mm vs 16mm film.",
    introduction: "Calibrating a wet gate for different film gauges requires adjusting fluid viscosity, pump pressure, and physical guide mechanics.",
    sections: [
      {
        title: "35mm Wet Gate Nuances",
        body: "35mm film has a wider surface area, requiring higher fluid volumes to maintain a uniform coating. Calibration must ensure that the liquid layer is perfectly flat and free from wedging (uneven thickness) across the wider screen frame."
      },
      {
        title: "16mm and Super 16 Calibration",
        body: "Due to the smaller frame size, any microscopic bubble or dust speck in a 16mm wet gate is magnified significantly. Calibration requires ultra-fine filtration and lower fluid flow rates to prevent turbulent currents that can cause frame jitter."
      }
    ],
    keyPoints: [
      "Wider film gauges require higher fluid pump pressures to ensure edge-to-edge coverage.",
      "Smaller gauges (16mm/8mm) require more stringent dust and bubble controls due to higher magnification.",
      "Tension settings must be calibrated carefully: 16mm film bases are thinner and tear more easily.",
      "Fluid drying times must be adjusted based on the linear speed of the specific scan gauge."
    ]
  },
  {
    slug: "nitrate-film-considerations",
    title: "Wet Gate Scanning for Fragile Nitrate Film",
    category: "Methodology",
    summary: "Safety hazards and specialized steps required when running highly unstable cellulose nitrate film through wet gates.",
    metaTitle: "Wet Gate Scanning for Fragile Nitrate Film | Liquifilm",
    metaDescription: "Critical safety measures and handling guidelines for running highly flammable cellulose nitrate film through wet gates.",
    introduction: "Nitrate film preservation is a high-stakes endeavor. Running these highly flammable, chemically volatile materials through liquid gates requires extreme caution.",
    sections: [
      {
        title: "Preventing Static and Friction",
        body: "The primary safety advantage of wet gate scanning for nitrate film is that the indexing fluid acts as a heat sink and lubricant. This dramatically reduces friction and eliminates the risk of static electrical sparks, which could otherwise ignite unstable nitrate bases."
      },
      {
        title: "Chemical Interactions with Decomposing Nitrate",
        body: "Decomposing nitrate releases nitric acid, which can react aggressively with certain wet gate solvents or corrode metal scanner parts. Labs must use chemically inert fluids and continuously monitor the pH of the recirculating fluid loop."
      }
    ],
    keyPoints: [
      "Wet gate liquid acts as an effective heat sink, reducing fire risks from high-output light sources.",
      "Scanner gates must be grounding-bonded to completely prevent static electricity build-up.",
      "Acidic compounds from decomposing nitrate must be filtered and neutralized in the fluid loop.",
      "Technicians must be trained in emergency nitrate fire suppression protocols."
    ]
  }
];

// 2. WIDER PRESERVATION TOPICS (12 pages)
export const WIDER_TOPICS: TechnicalArticle[] = [
  {
    slug: "history-of-film-preservation",
    title: "The Global History of Film Preservation",
    category: "Preservation",
    summary: "Trace the evolution of moving image archiving from the early days of silent film disposal to modern international treaties.",
    metaTitle: "The Global History of Film Preservation | Liquifilm",
    metaDescription: "Explore the fascinating history of film preservation, from early silent film neglect to modern global archival efforts.",
    introduction: "During the first decades of cinema, motion pictures were viewed as disposable commercial products. Preserving them was rarely considered, leading to a tragic loss of early cinematic history.",
    sections: [
      {
        title: "The Era of Neglect",
        body: "In the silent era, studios routinely melted down old film prints to reclaim silver, or simply threw them into the ocean or local dumps. It is estimated that over 75% of all silent films produced are lost forever due to this systemic neglect."
      },
      {
        title: "The Birth of the Film Archive",
        body: "In the 1930s, passionate film collectors and curators began establishing the first formal film archives. These pioneers recognized cinema as a vital cultural art form, laying the groundwork for the modern global preservation network."
      }
    ],
    keyPoints: [
      "Early cinema was viewed as short-term entertainment with no long-term financial value.",
      "Studio fires, silver reclamation, and physical decomposition destroyed the majority of silent films.",
      "The 1930s marked the birth of formal archiving institutions in France, the UK, and the US.",
      "Modern preservation treats films as historical artifacts worthy of national heritage protection."
    ]
  },
  {
    slug: "digital-vs-physical-archives",
    title: "Digital vs. Physical Film Archives: The Dual-Track Strategy",
    category: "Preservation",
    summary: "Analyze the critical debate between digital storage longevity and physical film cell stabilization.",
    metaTitle: "Digital vs Physical Film Archives: Dual-Track Strategy | Liquifilm",
    metaDescription: "An exploration of the digital versus physical storage dilemma in film archiving. Why a dual-track strategy is mandatory.",
    introduction: "In the modern era, film archivists face a difficult question: Should resources be spent on digital storage networks or temperature-controlled physical film vaults?",
    sections: [
      {
        title: "The Limits of Digital Storage",
        body: "While digital files are easy to distribute, they are highly vulnerable to technological obsolescence, bit rot, and server failures. A digital hard drive or LTO tape rarely lasts more than a decade without needing active migration to a new format, incurring immense continuous costs."
      },
      {
        title: "The Stability of Physical Film",
        body: "Under ideal cold and dry storage conditions, modern black-and-white safety film can remain stable for up to 500 years. Physical film is a human-readable medium—it only requires a light source and a lens to retrieve the image. Therefore, the gold standard remains: digital for access, physical for preservation."
      }
    ],
    keyPoints: [
      "LTO tape drives and digital servers require expensive migrations every 5 to 10 years.",
      "Physical polyester safety film in cold vaults has a projected lifespan of several centuries.",
      "Physical film requires no software codecs or operating systems to read.",
      "Archivists recommend a dual-track approach: digital access copies alongside physical master negatives."
    ]
  },
  {
    slug: "silent-film-preservation-challenges",
    title: "Silent Film Preservation: Challenges of a Lost Era",
    category: "Preservation",
    summary: "Identify the unique physical, mechanical, and historical hurdles in saving films from the first decades of cinema.",
    metaTitle: "Silent Film Preservation Challenges | Liquifilm",
    metaDescription: "Discover the specific technical and historical difficulties encountered when restoring silent-era films.",
    introduction: "Silent-era films represent some of the most beautiful and fragile creations in art history, yet their restoration is plagued by unique technical and historical hurdles.",
    sections: [
      {
        title: "Incomplete and Mixed Elements",
        body: "Silent films often survive only in fragmented pieces scattered across different international archives. Restorers must compare multiple prints, often with different language intertitles, frame rates, and color tinting styles, to assemble a single complete version."
      },
      {
        title: "Varying Frame Rates and Chemistry",
        body: "Before motor-driven cameras, silent films were hand-cranked, resulting in speeds ranging from 14 to 24 frames per second. Restoring the natural motion of these films requires careful frame rate conversion and timing calibration."
      }
    ],
    keyPoints: [
      "Most silent films survive only as secondary distribution prints, not original negatives.",
      "Reconstructing a film often requires stitching together elements from three or four different archives.",
      "Hand-cranked camera speeds create variable frame rates that must be digitally stabilized.",
      "Historical tinted colors must be carefully documented and replicated using digital color timing."
    ]
  },
  {
    slug: "nitrate-fire-history-and-safety-legacy",
    title: "Nitrate Fires: History, Physics, and Safety Legacy",
    category: "Safety",
    summary: "A chilling look at the devastating fires of the nitrate era, and how they shaped modern building codes and safety laws.",
    metaTitle: "Nitrate Fires: History, Physics, & Safety | Liquifilm",
    metaDescription: "A deep dive into the chemical dangers of cellulose nitrate film, historic fire disasters, and modern safety regulations.",
    introduction: "Cellulose nitrate was the foundational medium of early cinema, but it was also a highly dangerous chemical compound akin to gun cotton.",
    sections: [
      {
        title: "The Chemistry of a Nitrate Fire",
        body: "Cellulose nitrate contains its own chemical oxygen supply. Once ignited, it burns rapidly with intense heat (over 3000°F) and cannot be extinguished by water or smothering. It can burn underwater and releases highly toxic nitrogen oxide gases that are lethal in seconds."
      },
      {
        title: "Historic Disasters and Code Reforms",
        body: "Devastating theater fires and vault explosions in the early 20th century led to massive reforms. Modern buildings, fire walls, automatic deluge sprinkler systems, and specialized vault vents were engineered specifically to contain nitrate combustion."
      }
    ],
    keyPoints: [
      "Nitrate film burns without atmospheric oxygen, making conventional fire extinguishers useless.",
      "Decomposing nitrate becomes increasingly unstable and can spontaneously ignite at temperatures as low as 120°F.",
      "Historic fires reshaped building codes, introducing panic bars and fire-resistant projection booths.",
      "Nitrate storage today is strictly limited to heavily regulated, remote, specialized vaults."
    ]
  },
  {
    slug: "color-fading-and-restoration",
    title: "Chromogenic Color Fading and Chemical Restoration",
    category: "Color",
    summary: "The science of dye instability in mid-century color films, and how digital and photochemical timing brings them back to life.",
    metaTitle: "Color Fading & Chemical Film Restoration | Liquifilm",
    metaDescription: "Learn the chemical causes of color fading in historical films and the methods used to restore vibrant original colors.",
    introduction: "Unlike early hand-colored or Technicolor films, mid-century chromogenic color stocks (such as Eastmancolor) suffer from severe chemical dye fading.",
    sections: [
      {
        title: "The Chemistry of Dye Fading",
        body: "Chromogenic film uses cyan, magenta, and yellow organic dyes. Over time, particularly when stored in warm or humid environments, these dye layers decompose at different rates. Cyan is usually the first to fade, leaving old films with a stark, washed-out reddish-magenta hue."
      },
      {
        title: "Restoring the Color Balance",
        body: "Restoring faded color requires scanning the remaining dye layers and using advanced digital color grading to reconstruct the missing spectral bands. Photochemical laboratories historically used complex 'color timing lights' during optical printing to achieve similar corrections."
      }
    ],
    keyPoints: [
      "Organic dyes in color film are chemically unstable and decompose over time.",
      "Warm storage accelerates dye decay; cold storage is essential to freeze color fading.",
      "Digital scanning can isolate the remaining cyan, magenta, and yellow color channels.",
      "Reference tools like Laboratory Aim Density (LAD) assist colorists in establishing correct skin tones."
    ]
  },
  {
    slug: "orphan-films",
    title: "Saving the Orphan Films: Cinema's Forgotten History",
    category: "Preservation",
    summary: "Why home movies, newsreels, and independent films are the most endangered visual records of our cultural past.",
    metaTitle: "Saving Orphan Films - Cinema's Forgotten History | Liquifilm",
    metaDescription: "Understand the cultural value and preservation challenges of orphan films—including home movies and amateur footage.",
    introduction: "While Hollywood blockbusters receive expensive studio restorations, the vast majority of our moving image history consists of 'orphan films'—works without active commercial advocates.",
    sections: [
      {
        title: "What is an Orphan Film?",
        body: "An orphan film is any motion picture that has been abandoned by its owners, whose copyright holders are unknown, or whose physical master elements lack a legal custodian. This category includes amateur home movies, industrial documentaries, regional newsreels, and experimental films."
      },
      {
        title: "The Cultural Value of the Ordinary",
        body: "Orphan films capture authentic, unscripted historical moments, changing fashions, and regional histories that commercial cinema ignores. Preserving them requires public grants, non-profit archives, and dedicated community efforts."
      }
    ],
    keyPoints: [
      "Orphan films are highly vulnerable to trash-bin disposal and rapid decay.",
      "Include crucial historical documents like amateur footage of civil rights marches or local communities.",
      "Lack of commercial market makes them dependent on public funding and non-profit film archives.",
      "The annual 'Orphan Film Symposium' is a major gathering of curators dedicated to saving this heritage."
    ]
  },
  {
    slug: "fiaf-and-international-standards",
    title: "FIAF and the Development of International Archival Standards",
    category: "Standards",
    summary: "The history and operational role of the International Federation of Film Archives, founded in 1938.",
    metaTitle: "FIAF & International Archival Standards | Liquifilm",
    metaDescription: "Learn about the history and influence of FIAF in setting global standards for film preservation and archival vaults.",
    introduction: "To preserve the world's cinematic heritage, archives must collaborate across international borders. The guiding force behind this global network is FIAF.",
    sections: [
      {
        title: "Founding in 1938",
        body: "The International Federation of Film Archives (FIAF) was founded in Paris in 1938 by the Cinémathèque française, the British Film Institute, the Museum of Modern Art, and the Reichsfilmarchiv. It has grown to include over 180 member institutions across 80 countries."
      },
      {
        title: "Establishing Standards for Storage and Cataloging",
        body: "FIAF establishes the rigorous technical standards that define modern archiving. These include storage temperature/humidity profiles, chemical safety tests for nitrate film, metadata schema designs, and ethical codes for digital restoration."
      }
    ],
    keyPoints: [
      "FIAF was founded to stop the destruction of silent films and encourage archival exchanges.",
      "Promotes a strict Code of Ethics: restorations must preserve the original work's integrity.",
      "Collaborates with international bodies like UNESCO to declare film a protected cultural heritage.",
      "Maintains the definitive 'FIAF Cataloging Rules for Moving Image Materials'."
    ]
  },
  {
    slug: "amateur-and-home-movie-preservation",
    title: "Amateur & Home Movie Preservation: Technical Guides",
    category: "Preservation",
    summary: "A practical guide to identifying, cleaning, and digitizing 8mm, Super 8, and 16mm amateur family archives.",
    metaTitle: "Amateur & Home Movie Preservation Guide | Liquifilm",
    metaDescription: "A practical technical guide to cleaning, repairing, and digitizing home movies and amateur film gauges.",
    introduction: "Millions of feet of historical record are locked inside family closets on 8mm, Super 8, and 16mm home movies. Preserving these memories requires careful handling.",
    sections: [
      {
        title: "Identifying the Gauge and Condition",
        body: "The first step is identifying the film stock. Standard 8mm, Super 8, and 16mm have distinct perforation layouts. Next, evaluate the condition: Is there a vinegar smell indicating chemical rot? Is the film brittle or covered in mold?"
      },
      {
        title: "Safe Cleaning and Digitization",
        body: "Amateur film should never be run through dirty home projectors, which can tear brittle splices. It should be cleaned with a lint-free microfiber cloth moistened with an approved film cleaner and scanned on a continuous, sprocketless digital scanner."
      }
    ],
    keyPoints: [
      "Home movies are often the only surviving visual records of local historical spaces.",
      "Sprocketless scanning prevents tearing fragile, dried-out home movie perforations.",
      "Do not use water or household solvents to clean historical film emulsion.",
      "Store family films in vented plastic containers, never sealed metal boxes that trap acids."
    ]
  },
  {
    slug: "copyright-and-rights-clearance-in-restoration",
    title: "Copyright & Rights Clearance in Film Restoration",
    category: "Standards",
    summary: "The complex legal landscape of restoring and publicizing orphaned, copyrighted, and public domain motion pictures.",
    metaTitle: "Copyright & Rights Clearance in Film Restoration | Liquifilm",
    metaDescription: "An overview of the legal challenges and rights clearance workflows required for film restoration projects.",
    introduction: "A film restoration is not just a technical challenge; it is a legal puzzle. Archives must establish the rights to show a film before investing in its repair.",
    sections: [
      {
        title: "The Legal Nightmare of Split Rights",
        body: "Films involve multiple layers of copyright: the screenplay, the performance, the underlying music, and the visual image itself. Often, these rights are split among various entities or have expired in some countries but remain active in others."
      },
      {
        title: "Orphan Works Legislation",
        body: "Many countries have enacted special provisions for 'orphan works,' allowing non-profit archives to restore and screen culturally significant works if a documented, 'diligent search' fails to locate the original copyright owner."
      }
    ],
    keyPoints: [
      "A completed restoration can be tied up in court indefinitely if rights are not cleared first.",
      "Music rights are the most common source of legal blockages in historical film releases.",
      "Public domain status varies globally, requiring careful regional legal research.",
      "Archives must maintain meticulous documentation of their diligent searches for rights holders."
    ]
  },
  {
    slug: "public-domain-film-restoration",
    title: "The Economics of Public Domain Film Restoration",
    category: "Standards",
    summary: "How community funding, open-access archives, and internet libraries make public domain cinema accessible to all.",
    metaTitle: "Public Domain Film Restoration Economics | Liquifilm",
    metaDescription: "Discover how crowd-funding, open licenses, and non-profits drive the restoration of public domain films.",
    introduction: "Once a film enters the public domain, any entity can copy and distribute it. While this democratizes access, it creates a unique funding challenge for expensive restorations.",
    sections: [
      {
        title: "Who Pays for Public Domain Restorations?",
        body: "Because public domain restorations cannot be commercialized with exclusive copyrights, studios rarely fund them. Instead, funding comes from public arts grants, university archives, and crowd-funded non-profits (such as Kickstarter campaigns or the Internet Archive)."
      },
      {
        title: "The Open-Access Preservation Model",
        body: "Modern public domain restorations frequently adopt an open-access model. The restored 4K master files are released under Creative Commons licenses and uploaded to public servers, ensuring the film remains permanently preserved and accessible without paywalls."
      }
    ],
    keyPoints: [
      "Public domain status removes copyright barriers, enabling rapid, crowd-sourced restoration projects.",
      "Lacks the traditional studio distribution model, relying on public donations and museum exhibition.",
      "Restored materials are often hosted openly on platforms like YouTube, Vimeo, and the Internet Archive.",
      "Fosters a culture of open cinema study and historical re-editing."
    ]
  },
  {
    slug: "careers-in-film-preservation",
    title: "How to Build a Career in Film Preservation",
    category: "Standards",
    summary: "An educational guide to academic programs, technical fellowships, and essential skills for aspiring archivists.",
    metaTitle: "Careers in Film Preservation & Archiving | Liquifilm",
    metaDescription: "A comprehensive guide on how to become a professional film archivist, including degree programs and training.",
    introduction: "Preserving motion pictures requires a rare blend of historical knowledge, chemical understanding, and advanced digital software skills. Here is how to enter this rewarding field.",
    sections: [
      {
        title: "Academic Pathways and Specialized Degrees",
        body: "Aspiring preservationists typically pursue master's degrees in Moving Image Archiving, Film Studies, or Library Science with an archival track. Notable international programs include those at the George Eastman Museum, NYU, UCLA, and the University of Amsterdam."
      },
      {
        title: "Essential Skills: Chemistry to Command Line",
        body: "Modern film archivists must be multi-disciplinary. You need to understand physical film chemistry (decomposition stages, splicing) as well as digital IT infrastructure (command-line FFmpeg, metadata standards, and digital asset management systems)."
      }
    ],
    keyPoints: [
      "Graduate-level specialized degrees provide direct pipelines into national archives and museum departments.",
      "Hands-on internships at film laboratories or archives are critical for mastering physical handling.",
      "Archivists must balance traditional photochemical skills with advanced computer science literacy.",
      "Professional organizations like AMIA (Association of Moving Image Archivists) offer networking and grants."
    ]
  },
  {
    slug: "how-a-restoration-project-actually-runs",
    title: "How a Professional Film Restoration Project Runs",
    category: "Standards",
    summary: "A step-by-step explainer detailing the operational workflow of a major restoration, from vault extraction to theatrical release.",
    metaTitle: "How a Film Restoration Project Runs: Step-by-Step | Liquifilm",
    metaDescription: "Trace the complete operational workflow of a professional film restoration project, from vault sourcing to final DCP.",
    introduction: "A professional film restoration is a highly structured, multi-month project requiring meticulous planning and interdisciplinary collaboration.",
    sections: [
      {
        title: "Phase 1: Research, Sourcing, and Inspection",
        body: "The project begins with exhaustive research to locate all surviving film elements globally. Curators inspect each reel, measuring shrinkage, checking for vinegar syndrome, and choosing the absolute best source elements (ideally the original camera negative)."
      },
      {
        title: "Phase 2: Scanning, Restoration, and Mastering",
        body: "The selected elements are cleaned, physically repaired, and scanned (often with wet gates). Digital artists then correct color fading, stabilize jitter, and repair physical scratches. Finally, a Digital Cinema Package (DCP) is mastered for theatrical and home exhibition."
      }
    ],
    keyPoints: [
      "Sourcing the best physical elements is the single most critical factor in a restoration's quality.",
      "Meticulous physical preparation (splicing, perforation repair) must happen prior to any digital scanning.",
      "All digital corrections must respect the original historical context, avoiding over-smoothing of film grain.",
      "The final output must include a comprehensive 'restoration comparison' documenting the changes made."
    ]
  }
];

// 3. GLOSSARY TERMS (73 terms total, dense & informative)
export const GLOSSARY_TERMS: GlossaryTerm[] = [
  // Category: formats (12)
  {
    slug: "nitrate-film",
    title: "Nitrate Film",
    category: "formats",
    categoryLabel: "Film Stock & Formats",
    shortDefinition: "A highly flammable cellulose nitrate film base used for professional motion pictures from the 1880s to 1951.",
    detailedExplainer: "Cellulose nitrate was the first successful transparent plastic base for photographic film. However, its chemical composition is chemically similar to gun cotton, making it extremely flammable. It burns rapidly, produces toxic gases, and can ignite spontaneously as it decomposes, which forced the industry to completely transition to safety film by 1952."
  },
  {
    slug: "acetate-safety-film",
    title: "Acetate / Safety Film",
    category: "formats",
    categoryLabel: "Film Stock & Formats",
    shortDefinition: "A non-flammable film base made of cellulose acetate, introduced as a safe replacement for dangerous nitrate stock.",
    detailedExplainer: "Introduced commercially by Kodak in the 1920s for amateur gauges and adopted for professional releases in the early 1950s, safety film eliminates the fire risk of nitrate. It includes cellulose diacetate, triacetate, and acetate-propionate. While safe from fire, acetate film is highly susceptible to chemical deacetylation, known globally as vinegar syndrome."
  },
  {
    slug: "polyester-base-film",
    title: "Polyester Base Film",
    category: "formats",
    categoryLabel: "Film Stock & Formats",
    shortDefinition: "An exceptionally durable and chemically stable synthetic polymer film base used for modern archival duplication.",
    detailedExplainer: "Introduced under trade names like Estar in the mid-1950s, polyester film is the modern gold standard for physical preservation. It is virtually tear-proof, chemically inert, and does not suffer from vinegar syndrome. It is used almost exclusively for making new archival preservation intermediate elements."
  },
  {
    slug: "35mm",
    title: "35mm Film Gauge",
    category: "formats",
    categoryLabel: "Film Stock & Formats",
    shortDefinition: "The globally dominant professional motion picture gauge, measuring 35mm in width with sprocket holes on both sides.",
    detailedExplainer: "Standardized by Thomas Edison and George Eastman in the 1890s, 35mm has been the workhorse of cinema history. It traditionally features four perforations per frame on both edges, running vertically. Its wide surface area provides superb image resolution, making it the standard against which other formats are measured."
  },
  {
    slug: "16mm",
    title: "16mm Film Gauge",
    category: "formats",
    categoryLabel: "Film Stock & Formats",
    shortDefinition: "A narrower safety film gauge introduced in 1923 for amateur use, later widely adopted by news and documentarians.",
    detailedExplainer: "Launched by Eastman Kodak as a non-flammable alternative to 35mm nitrate, 16mm film was adopted by schools, industrial filmmakers, news stations, and independent directors. It is cheaper to shoot, transport, and preserve, though its smaller frame area results in a more prominent and textured film grain structure."
  },
  {
    slug: "super-16",
    title: "Super 16",
    category: "formats",
    categoryLabel: "Film Stock & Formats",
    shortDefinition: "A variation of the 16mm gauge that utilizes single-perforated film to expand the image area into a widescreen ratio.",
    detailedExplainer: "Introduced in 1969 by Swedish cinematographer Rune Ericson, Super 16mm eliminates the sprocket holes and soundtrack space on one edge of standard 16mm film. This expands the usable frame area by 40%, yielding a modern 1.66:1 aspect ratio that is highly suited for blow-ups to 35mm or widescreen digital mastering."
  },
  {
    slug: "8mm",
    title: "8mm Film (Standard / Regular 8)",
    category: "formats",
    categoryLabel: "Film Stock & Formats",
    shortDefinition: "A consumer film gauge introduced in 1932, created by exposing 16mm film in two passes and cutting it in half.",
    detailedExplainer: "Also known as Regular 8, this consumer format was developed by Kodak during the Great Depression. The film is run through the camera in two directions, exposing half the width on each pass. The lab develops the film, splits it down the center, and splices it together, creating a highly economical home movie format."
  },
  {
    slug: "super-8",
    title: "Super 8mm Film",
    category: "formats",
    categoryLabel: "Film Stock & Formats",
    shortDefinition: "An upgraded 8mm consumer format introduced in 1965 featuring smaller sprocket holes and a larger frame area.",
    detailedExplainer: "Kodak introduced Super 8 to provide higher image quality for amateur filmmakers. By reducing the size of the sprocket holes and shifting them to one edge, the frame area was increased by nearly 50% compared to Standard 8mm. This format was popularized in easy-to-load plastic cartridges that bypassed manual threading."
  },
  {
    slug: "9-5mm-format",
    title: "9.5mm Format",
    category: "formats",
    categoryLabel: "Film Stock & Formats",
    shortDefinition: "An early amateur film format introduced by Pathé Frères in 1922 featuring sprocket holes located in the center of the film strip.",
    detailedExplainer: "A highly innovative French format, 9.5mm placed a single perforation in the center of the film strip between adjacent frames. This allowed the entire width of the film to be used for the image, making the frame size nearly as large as 16mm despite the narrower overall width of the physical stock."
  },
  {
    slug: "70mm",
    title: "70mm Film Gauge",
    category: "formats",
    categoryLabel: "Film Stock & Formats",
    shortDefinition: "A high-fidelity wide-gauge film format used for prestigious theatrical releases and immersive large-format experiences.",
    detailedExplainer: "Utilized for premium theatrical presentation, 70mm provides immense surface area and clarity. Historically, films were shot on 65mm negatives and printed onto 70mm positive stocks to accommodate magnetic multi-channel soundtracks along the outer edges, resulting in unparalleled visual density and sonic immersion."
  },
  {
    slug: "imax-film-format",
    title: "IMAX Film Format",
    category: "formats",
    categoryLabel: "Film Stock & Formats",
    shortDefinition: "A massive 15-perforation wide-gauge film format that runs horizontally through specialized cameras and projection gates.",
    detailedExplainer: "Co-developed by Canadian filmmakers, IMAX uses 70mm wide film running horizontally rather than vertically. This horizontal transport accommodates 15 perforations per frame, resulting in an image area approximately ten times larger than standard vertical 35mm, offering the highest resolution in photographic history."
  },
  {
    slug: "vinegar-syndrome",
    title: "Vinegar Syndrome",
    category: "formats",
    categoryLabel: "Film Stock & Formats",
    shortDefinition: "The colloquial term for the chemical decomposition of cellulose acetate safety film, marked by a sharp vinegar odor.",
    detailedExplainer: "When cellulose acetate film is stored in warm, humid conditions, it undergoes a chemical reaction known as deacetylation. Acetic acid is released, creating a strong vinegar smell. As it worsens, the film shrinks, twists, loses elasticity, and eventually decomposes into a brittle, sticky, un-scannable mass."
  },

  // Category: color (6)
  {
    slug: "tinting-and-toning",
    title: "Tinting & Toning",
    category: "color",
    categoryLabel: "Color & Early Processes",
    shortDefinition: "Early mechanical methods of applying color to black-and-white film stocks using chemical dyes or metal baths.",
    detailedExplainer: "In the silent era, film color was applied physically. Tinting involved bathing processed film in dye, coloring the transparent highlight areas. Toning replaced the metallic silver in the emulsion with a colored metal salt, leaving the highlight areas clear while coloring the dark, silver-heavy shadow areas."
  },
  {
    slug: "two-strip-technicolor",
    title: "Two-Strip Technicolor",
    category: "color",
    categoryLabel: "Color & Early Processes",
    shortDefinition: "An early subtractive color process that recorded red and green records printed on separate dyed gelatin layers.",
    detailedExplainer: "Used from the 1910s to the early 1930s, Two-Strip Technicolor utilized a beam-splitter camera to expose two separate frames simultaneously behind red and green filters. These negative records were printed onto thin gelatin matrices, dyed cyan and magenta, and cemented back-to-back to create a two-color theatrical print."
  },
  {
    slug: "three-strip-technicolor",
    title: "Three-Strip Technicolor",
    category: "color",
    categoryLabel: "Color & Early Processes",
    shortDefinition: "The famous, high-fidelity dye-transfer color process that utilized three separate film strips exposed in a specialized camera.",
    detailedExplainer: "Introduced in 1932, Three-Strip (Process 4) Technicolor utilized a massive, highly complex camera containing a prism. The prism split light into red, green, and blue paths, exposing three separate black-and-white strips simultaneously. These records were used to transfer yellow, cyan, and magenta dyes onto a single blank receiver film."
  },
  {
    slug: "kinemacolor",
    title: "Kinemacolor",
    category: "color",
    categoryLabel: "Color & Early Processes",
    shortDefinition: "The first commercially successful additive color motion picture process, utilizing alternating red and green filters.",
    detailedExplainer: "Invented by George Albert Smith and launched in 1908, Kinemacolor was an additive system. Black-and-white film was shot and projected at twice the normal speed (32 frames per second) through a rotating color wheel containing alternating red and green filters, relying on persistence of vision to blend colors."
  },
  {
    slug: "hand-tinted-film",
    title: "Hand-Tinted Film",
    category: "color",
    categoryLabel: "Color & Early Processes",
    shortDefinition: "An early, labor-intensive color process where individual frames were painted or stenciled by hand with liquid dyes.",
    detailedExplainer: "Before chemical color processes, early filmmakers like Georges Méliès colored films manually. Teams of artists used fine brushes to paint transparent dyes onto individual frames. This was later mechanized using the Pathécolor stencil system, which used cut-out stencils to apply up to six individual color dyes."
  },
  {
    slug: "base-vs-emulsion",
    title: "Base vs. Emulsion",
    category: "color",
    categoryLabel: "Color & Early Processes",
    shortDefinition: "The two main layers of a film strip: the clear plastic supporting base and the light-sensitive chemical coating.",
    detailedExplainer: "A film strip consists of two primary components. The 'base' is the thick, transparent plastic support (nitrate, acetate, or polyester). The 'emulsion' is the active, microscopic layer of light-sensitive silver halide crystals suspended in gelatin, which captures the visual photographic image during camera exposure."
  },

  // Category: preservation (8)
  {
    slug: "cold-storage-vaults",
    title: "Cold Storage Vaults",
    category: "preservation",
    categoryLabel: "Preservation & Storage",
    shortDefinition: "Low-temperature facilities built to freeze or delay the physical decomposition of acetate and nitrate film elements.",
    detailedExplainer: "Chemical reactions double in speed with every 10°C rise in temperature. To prevent vinegar syndrome and color dye fading, archives construct highly insulated, walk-in vaults running at freezing or sub-freezing temperatures (often down to -18°C / 0°F). This effectively freezes the physical decay cycle of old film stocks."
  },
  {
    slug: "film-vault-humidity-control",
    title: "Film Vault Humidity Control",
    category: "preservation",
    categoryLabel: "Preservation & Storage",
    shortDefinition: "Precise regulation of relative humidity inside archives to prevent emulsion softening, mold growth, or brittle curling.",
    detailedExplainer: "High humidity triggers acid hydrolysis in acetate film and encourages destructive mold growth on gelatin emulsions. Low humidity causes film to become extremely dry and brittle, making it break under tension. Modern archival standards require relative humidity to be strictly maintained between 20% and 40%."
  },
  {
    slug: "archival-film-canisters",
    title: "Archival Film Canisters",
    category: "preservation",
    categoryLabel: "Preservation & Storage",
    shortDefinition: "Chemically inert containers designed to protect film reels from physical damage, dust, and corrosive vapors.",
    detailedExplainer: "Standard commercial tin cans rust over time, staining film and accelerating decay. Modern archives use containers molded from high-density polypropylene or aluminum that are chemically inert. These cans often feature small vents to allow decomposing acid gases to escape safely rather than being trapped inside."
  },
  {
    slug: "acid-free-packaging",
    title: "Acid-Free Packaging",
    category: "preservation",
    categoryLabel: "Preservation & Storage",
    shortDefinition: "Archival-grade paper envelopes, cores, and spacers manufactured to be completely free of active acid compounds.",
    detailedExplainer: "Standard cardboard and paper contain lignin, which naturally degrades and releases acids that yellow and damage photographic emulsion. Acid-free materials are processed with a calcium carbonate buffer to neutralize any surrounding acidity, ensuring safe physical contact with historic film stocks."
  },
  {
    slug: "iso-18911-storage-standard",
    title: "ISO 18911 Storage Standard",
    category: "preservation",
    categoryLabel: "Preservation & Storage",
    shortDefinition: "The official international standard specifying precise environment parameters for safety film archiving.",
    detailedExplainer: "This ISO standard defines the industry-agreed storage environments for safety film. It mandates maximum temperatures and relative humidity levels based on whether the storage is medium-term or long-term, and whether the elements are black-and-white or fragile organic color stocks."
  },
  {
    slug: "fire-suppression-in-film-vaults",
    title: "Fire Suppression in Film Vaults",
    category: "preservation",
    categoryLabel: "Preservation & Storage",
    shortDefinition: "Specialized fire defense systems engineered to control explosive nitrate fires or protect fragile digital and physical vaults.",
    detailedExplainer: "Conventional sprinklers are inadequate for nitrate, which burns under water. Nitrate vaults require high-volume deluge water systems to cool surrounding film containers and prevent heat transfer. Safety safety vaults utilize gaseous suppression agents (like Novec 1230 or Inergen) to extinguish fires without leaving water residue."
  },
  {
    slug: "orphan-films-glossary",
    title: "Orphan Films",
    category: "preservation",
    categoryLabel: "Preservation & Storage",
    shortDefinition: "A motion picture that lacks an active commercial owner, legal custodian, or clear copyright holder.",
    detailedExplainer: "This term describes a huge percentage of our cinematic heritage: films abandoned by original studios, home movies, newsreels, industrial records, and student films. Lacking commercial backers, they rely entirely on non-profit institutions and national archives for preservation before they decay."
  },
  {
    slug: "nitrate-decomposition-stages",
    title: "Nitrate Decomposition Stages",
    category: "preservation",
    categoryLabel: "Preservation & Storage",
    shortDefinition: "The five distinct physical and chemical phases of cellulose nitrate film degradation.",
    detailedExplainer: "Nitrate decay is predictable and progressive: Stage 1 involves mild amber staining and odor. Stage 2 makes the emulsion sticky. Stage 3 is marked by gas bubbles and severe stickiness. Stage 4 sees the film turn into a solid, congealed mass with a strong acrid smell. Stage 5 results in the film crumbling into a toxic, shock-sensitive yellow powder."
  },

  // Category: restoration (14)
  {
    slug: "wet-gate-printing-glossary",
    title: "Wet Gate Printing",
    category: "restoration",
    categoryLabel: "Restoration Processes",
    shortDefinition: "The technique of scanning or printing film submerged in a liquid with a matching refractive index to hide scratches.",
    detailedExplainer: "This process uses a liquid (traditionally Perchloroethylene) that optically matches the refractive index of the film base. Light passes straight through scratches rather than refracting at their edges, making them invisible on the resulting duplicate or digital scan. This is the cornerstone physical restoration method."
  },
  {
    slug: "dry-gate-printing",
    title: "Dry Gate Printing",
    category: "restoration",
    categoryLabel: "Restoration Processes",
    shortDefinition: "Conventional film scanning or printing without the use of an index-matching fluid interface.",
    detailedExplainer: "In dry gate scanning, the film travels through the aperture surrounded by air. While simpler and faster to set up, dry gate scanning captures every surface scratch, hairline fracture, and physical blemish on both the base and emulsion layers, requiring extensive digital post-processing to clean."
  },
  {
    slug: "ultrasonic-film-cleaning",
    title: "Ultrasonic Film Cleaning",
    category: "restoration",
    categoryLabel: "Restoration Processes",
    shortDefinition: "Cleaning fragile film strips in a solvent bath agitated by high-frequency sound waves to dislodge dirt.",
    detailedExplainer: "Ultrasonic cleaners submerge film in a safe solvent (like Solvene) and pass high-frequency sound waves through the liquid. This causes cavitation—the rapid formation and collapse of microscopic vacuum bubbles—which gently lifts oil, grease, and dirt from the film without physical friction."
  },
  {
    slug: "chemical-film-restoration",
    title: "Chemical Film Restoration",
    category: "restoration",
    categoryLabel: "Restoration Processes",
    shortDefinition: "Physical and chemical laboratory treatments used to recondition, stabilize, or rehydrate degraded film stocks.",
    detailedExplainer: "Before scanning, severely dried, brittle, or curled films must undergo chemical reconditioning. This involves vapor chamber exposure to rehydrate the emulsion, bathing the film in softening oils, or applying chemical stabilizers to temporarily stop active decay and allow safe transport."
  },
  {
    slug: "frame-by-frame-digital-restoration",
    title: "Frame-by-Frame Digital Restoration",
    category: "restoration",
    categoryLabel: "Restoration Processes",
    shortDefinition: "The painstaking process of using software to clean, stabilize, and color-correct scanned film frames one by one.",
    detailedExplainer: "Using advanced workstations (like Diamant or Phoenix), digital restoration artists examine every single frame of a film scan. They manually repair tears, erase leftover dust, remove mold stains, and correct frame jitter. A full restoration requires hundreds of hours of painstaking manual labor."
  },
  {
    slug: "dust-busting",
    title: "Dust Busting",
    category: "restoration",
    categoryLabel: "Restoration Processes",
    shortDefinition: "The targeted digital detection and removal of dust particles, hairs, and dirt from scanned film frames.",
    detailedExplainer: "Dust busting is a key stage in digital post-production. While automated algorithms can identify and remove high-contrast spots, a digital artist must oversee the process to ensure that the software does not mistake fast-moving real elements—such as rainfall or small projectiles—for dust."
  },
  {
    slug: "flicker-correction",
    title: "Flicker Correction",
    category: "restoration",
    categoryLabel: "Restoration Processes",
    shortDefinition: "Software algorithms that eliminate rapid, unwanted fluctuations in density and luminance caused by aging film.",
    detailedExplainer: "Film flicker is caused by unstable hand-cranking in silent cameras, chemical density variations during uneven development, or deteriorating emulsion. Digital flicker correction software analyzes the average luminance across sequences of frames and flattens out these rapid, distracting jumps in brightness."
  },
  {
    slug: "image-stabilization",
    title: "Image Stabilization",
    category: "restoration",
    categoryLabel: "Restoration Processes",
    shortDefinition: "Digital tracking and alignment of frames to eliminate mechanical bounce, weave, and jitter from historical film gates.",
    detailedExplainer: "When film sprocket holes are worn or shrunk, or when a camera's gate is mechanically unstable, the projected image bounces up and down (jitter) or weaves side to side (weave). Digital stabilization software tracks prominent contrast features in the image frame and aligns them to a stable center."
  },
  {
    slug: "digital-color-regrading",
    title: "Digital Color Regrading",
    category: "restoration",
    categoryLabel: "Restoration Processes",
    shortDefinition: "Adjusting and restoring colors using digital suites, often guided by historical references and film experts.",
    detailedExplainer: "Using specialized color tools (like DaVinci Resolve), colorists adjust the color balance, highlights, midtones, and shadows of a scanned film. In a restoration context, this step is tightly guided by vintage references, answer prints, and input from film historians to preserve the original artistic intent."
  },
  {
    slug: "photochemical-color-timing",
    title: "Photochemical Color Timing",
    category: "restoration",
    categoryLabel: "Restoration Processes",
    shortDefinition: "The traditional lab process of adjusting red, green, and blue printer lights to balance colors during duplication.",
    detailedExplainer: "Before digital color tools, labs adjusted color balance using physical printer lights on an optical printer. Technicians (called color timers) specified exposure values on a scale of 1 to 50 for the RGB primary light paths, altering the chemistry's exposure to correct density and hue."
  },
  {
    slug: "density-correction",
    title: "Density Correction",
    category: "restoration",
    categoryLabel: "Restoration Processes",
    shortDefinition: "The digital or physical adjustment of overall brightness and exposure levels across variable film sequences.",
    detailedExplainer: "Due to aging, solarization, or poor original exposure, different scenes in a film print may have widely different densities (darkness levels). Density correction balances these scenes so that the narrative flows smoothly without jarring jumps in contrast and black levels."
  },
  {
    slug: "splice-repair",
    title: "Splice Repair",
    category: "restoration",
    categoryLabel: "Restoration Processes",
    shortDefinition: "The physical re-joining of broken or fragile film splices using specialized cement or archival splicing tape.",
    detailedExplainer: "Old films contain hundreds of individual edits joined by cement or tape. Over decades, these splices dry out and fail. Before running a film through a high-speed scanner, technicians must manually inspect and reinforce every single splice under a magnifying glass."
  },
  {
    slug: "perforation-repair",
    title: "Perforation Repair",
    category: "restoration",
    categoryLabel: "Restoration Processes",
    shortDefinition: "Manual patching of torn or chipped sprocket holes along the edges of a physical film strip.",
    detailedExplainer: "Sprocket holes are subjected to heavy mechanical stress during projection. If a sprocket hole is torn, it can snag and shred the film in a scanner. Technicians use specialized archival polyester tape and precision jigs to rebuild or reinforce individual sprocket perforations."
  },
  {
    slug: "shrinkage-compensation",
    title: "Shrinkage Compensation",
    category: "restoration",
    categoryLabel: "Restoration Processes",
    shortDefinition: "Scanner configurations or mechanical adjustments designed to handle film that has shrunk over time.",
    detailedExplainer: "As solvents evaporate from acetate bases, the film physically shrinks. Standard scanners assume a standard sprocket spacing; running shrunk film on them can tear sprocket holes. Modern archival scanners use sprocketless, continuous capstan drives and optical tracking to accommodate severe shrinkage (up to 4%)."
  },

  // Category: scanning (10)
  {
    slug: "telecine",
    title: "Telecine",
    category: "scanning",
    categoryLabel: "Scanning & Digitization",
    shortDefinition: "An early mechanical and electronic device used to translate motion picture film frames into broadcast video formats.",
    detailedExplainer: "Pioneered in the mid-20th century, a telecine allows films to be broadcast on television or copied to videotape. It uses a projector synchronized with a video camera tube to perform frame rate conversion (such as the 3:2 pulldown needed for 24fps film on 30fps television systems)."
  },
  {
    slug: "datacine",
    title: "Datacine",
    category: "scanning",
    categoryLabel: "Scanning & Digitization",
    shortDefinition: "Advanced digital scanning devices that output uncompressed data files rather than standard video streams.",
    detailedExplainer: "Developing from traditional telecines, datacine systems capture and export raw digital files (such as DPX or EXR) to hard drives or servers, establishing a high-quality data master for digital intermediates and CGI workflows in the pre-4K era."
  },
  {
    slug: "pin-registered-film-scanner",
    title: "Pin-Registered Film Scanner",
    category: "scanning",
    categoryLabel: "Scanning & Digitization",
    shortDefinition: "A scanner that uses physical registration pins to lock each frame perfectly still during camera capture.",
    detailedExplainer: "To achieve the highest possible registration stability, these scanners use mechanical pins that slide into the sprocket holes of the film, holding each frame in a rock-steady position while the image sensor captures the frame, eliminating mechanical jitter completely."
  },
  {
    slug: "continuous-motion-film-scanner",
    title: "Continuous-Motion Film Scanner",
    category: "scanning",
    categoryLabel: "Scanning & Digitization",
    shortDefinition: "A sprocketless film scanner that pulls the film smoothly and continuously past the scan sensor.",
    detailedExplainer: "Unlike intermittent scanners, continuous-motion scanners use line-scan sensors or ultra-fast flashing LEDs to capture frames while the film is moving smoothly. This eliminates the mechanical stress of stopping the film repeatedly, making it ideal for fragile, severely shrunk, or brittle archival stocks."
  },
  {
    slug: "2k-4k-8k-scanning-resolution",
    title: "2K / 4K / 8K Scanning Resolution",
    category: "scanning",
    categoryLabel: "Scanning & Digitization",
    shortDefinition: "The horizontal pixel count of digital scans, representing the level of detail captured from physical film.",
    detailedExplainer: "These resolutions define the size of digital frames: 2K is approx 2048 pixels wide, 4K is 4096, and 8K is 8192. While 35mm film grain is typically resolved fully at 4K, fine-grain stocks, wide-gauge 70mm, and IMAX require 8K scans to capture the maximum photographic density of the emulsion."
  },
  {
    slug: "dpx-file-format",
    title: "DPX File Format",
    category: "scanning",
    categoryLabel: "Scanning & Digitization",
    shortDefinition: "Digital Picture Exchange, an uncompressed, metadata-rich raster image format optimized for digital film preservation.",
    detailedExplainer: "Standardized by SMPTE, DPX represents each film frame as an individual, uncompressed file. This preserves all dynamic range, color depth, and fine grain details without compression artifacts, making it the industry standard for archival scanning and post-production workflows."
  },
  {
    slug: "digital-intermediate",
    title: "Digital Intermediate (DI)",
    category: "scanning",
    categoryLabel: "Scanning & Digitization",
    shortDefinition: "The digital workflow where film is scanned, edited/graded digitally, and then recorded back onto physical film.",
    detailedExplainer: "Pioneered in the early 2000s, the DI process replaced physical photochemical color timing. It allows filmmakers to digitize the entire negative, execute complex color adjustments and VFX digitally, and then print the finished file back onto film for theatrical projection."
  },
  {
    slug: "aces-color-space",
    title: "ACES Color Space",
    category: "scanning",
    categoryLabel: "Scanning & Digitization",
    shortDefinition: "Academy Color Encoding System, an open, device-independent color management standard for high-fidelity work.",
    detailedExplainer: "Developed by the Academy of Motion Picture Arts and Sciences, ACES provides a massive color gamut that encompasses the entire visible spectrum. It ensures that colors captured by scanners remain absolutely consistent across grading monitors, VFX pipelines, and final theatrical projections."
  },
  {
    slug: "log-vs-linear-color-encoding",
    title: "Log vs. Linear Color Encoding",
    category: "scanning",
    categoryLabel: "Scanning & Digitization",
    shortDefinition: "The mathematical curves used to map exposure values from physical film to digital image files.",
    detailedExplainer: "Linear encoding assigns values proportionally to light intensity. Logarithmic (Log) encoding maps values on a curved scale that mimics the logarithmic way human eyes and photographic film respond to light. Log encoding allows scanners to capture the entire dynamic range of film highlights and shadows in compact file formats."
  },
  {
    slug: "hdr-mastering-for-restoration",
    title: "HDR Mastering for Restoration",
    category: "scanning",
    categoryLabel: "Scanning & Digitization",
    shortDefinition: "Creating dynamic, high-contrast, wide-color-gamut digital masters from classic physical film negatives.",
    detailedExplainer: "Photographic negatives hold a wider dynamic range and color depth than standard-definition video. High Dynamic Range (HDR) mastering maps this extensive latitude directly onto modern consumer displays, revealing rich detail in both the bright highlights and dark shadows of classic films."
  },

  // Category: printing (11)
  {
    slug: "contact-printing",
    title: "Contact Printing",
    category: "printing",
    categoryLabel: "Printing & Lab Terminology",
    shortDefinition: "A classic physical replication method where source film and raw stock are held directly against each other.",
    detailedExplainer: "Contact printing is a highly efficient laboratory process. The source negative film and unexposed raw positive stock are drawn emulsion-to-emulsion over a printer aperture, where a light source exposes the positive. It is fast and sharp, but physical contact poses scratches risks if the gates are dirty."
  },
  {
    slug: "optical-printing",
    title: "Optical Printing",
    category: "printing",
    categoryLabel: "Printing & Lab Terminology",
    shortDefinition: "A physical printing process where a film projector projects images onto a raw camera stock through an adjustable lens.",
    detailedExplainer: "Optical printing uses a camera focusing on a projector aperture. Because the image passes through an adjustable lens, the technician can scale, crop, speed up, slow down, or composite multiple visual elements. This was the foundational method for Hollywood special effects before computers."
  },
  {
    slug: "step-printing",
    title: "Step Printing",
    category: "printing",
    categoryLabel: "Printing & Lab Terminology",
    shortDefinition: "Optical printing where both projector and camera stop and register each frame individually during exposure.",
    detailedExplainer: "In step printing, both the source reel and destination stock are advanced frame-by-frame and held perfectly stationary during exposure by registration pins. This ensures maximum image stability and allows the color timer to change exposure settings for individual frames."
  },
  {
    slug: "answer-print",
    title: "Answer Print",
    category: "printing",
    categoryLabel: "Printing & Lab Terminology",
    shortDefinition: "The first combined positive print from the laboratory that blends both picture and soundtrack for approval.",
    detailedExplainer: "Presented to the director and cinematographer, the answer print represents the first real test of a film's color timing, density, and audio synchronization. It is used to approve the look of the film before mass duplication of release prints begins."
  },
  {
    slug: "interpositive",
    title: "Interpositive (IP)",
    category: "printing",
    categoryLabel: "Printing & Lab Terminology",
    shortDefinition: "A fine-grain positive copy printed from the original camera negative, used as a master element for preservation.",
    detailedExplainer: "An interpositive is printed on specialized, extremely fine-grain film. Unlike a high-contrast projection print, an IP preserves the maximum possible dynamic range and detail of the original camera negative, serving as an invaluable safety backup in preservation vaults."
  },
  {
    slug: "internegative",
    title: "Internegative (IN)",
    category: "printing",
    categoryLabel: "Printing & Lab Terminology",
    shortDefinition: "A duplicate negative made directly from a fine-grain interpositive, used to print multiple exhibition prints.",
    detailedExplainer: "Because printing hundreds of copies directly from the original camera negative would scratch and destroy it, labs print an interpositive first, copy that IP onto an internegative, and then use that internegative to make the theatrical release prints."
  },
  {
    slug: "dupe-negative",
    title: "Dupe Negative",
    category: "printing",
    categoryLabel: "Printing & Lab Terminology",
    shortDefinition: "A duplicate negative manufactured to protect precious master materials during mass-scale theatrical printing.",
    detailedExplainer: "A duplicate negative (or dupe negative) is any duplicate negative element created during duplication workflows. It ensures that the original historical negative elements can remain locked safely in temperature-controlled archives, protected from wear and tear."
  },
  {
    slug: "check-print",
    title: "Check Print",
    category: "printing",
    categoryLabel: "Printing & Lab Terminology",
    shortDefinition: "A trial positive print made from release printing negatives to ensure the quality of mass duplication.",
    detailedExplainer: "Made during mass replication, a check print is pulled at random from the lab's assembly line to ensure that printer light adjustments remain calibrated and that no dust, scratches, or mechanical errors have contaminated the duplicate negatives."
  },
  {
    slug: "release-print",
    title: "Release Print",
    category: "printing",
    categoryLabel: "Printing & Lab Terminology",
    shortDefinition: "The finished positive film prints distributed to movie theaters for commercial projection and public viewing.",
    detailedExplainer: "Release prints are the final physical copies of a movie designed for theatrical distribution. Printed at high speed on cheaper positive film stocks, they are subjected to heavy physical handling, heat from high-output projector lamps, and rapid wear."
  },
  {
    slug: "timing-lights",
    title: "Timing Lights",
    category: "printing",
    categoryLabel: "Printing & Lab Terminology",
    shortDefinition: "The mechanical settings (values 1-50) governing red, green, and blue exposures in photochemical printers.",
    detailedExplainer: "In laboratory duplication, timing lights represent the color correction parameters. By adjusting these values, the lab technician alters the balance of RGB light hitting the positive stock, compensating for exposure errors or shifting colors to meet artistic goals."
  },
  {
    slug: "timing-lights-lad",
    title: "LAD (Laboratory Aim Density)",
    category: "printing",
    categoryLabel: "Printing & Lab Terminology",
    shortDefinition: "A calibration reference system containing mid-gray density patches to standardize laboratory color chemistry.",
    detailedExplainer: "Laboratory Aim Density (LAD) uses a standardized film frame with specific gray and primary color patches. By measuring this frame with a densitometer, labs calibrate their optical printers and developer chemistry, ensuring color consistency across different film batches."
  },

  // Category: sound (5)
  {
    slug: "optical-soundtrack",
    title: "Optical Soundtrack",
    category: "sound",
    categoryLabel: "Sound Preservation",
    shortDefinition: "An analog audio track represented photographically as a wavy or variable-density strip along the film margin.",
    detailedExplainer: "Standardized in NTSC and PAL cinema, the optical soundtrack sits between the active picture area and the sprocket holes. Projectors shine a narrow beam of light through this photographic strip onto a photocell, translating the light variations back into audible electrical signals."
  },
  {
    slug: "magnetic-soundtrack",
    title: "Magnetic Soundtrack",
    category: "sound",
    categoryLabel: "Sound Preservation",
    shortDefinition: "Audio recorded onto strips of magnetic iron oxide bonded directly onto physical film positive stocks.",
    detailedExplainer: "Popularized in the 1950s for stereophonic theatrical standards, magnetic soundtrack film features thin stripes of magnetic tape laminated along the film edges. This allowed multiple high-fidelity audio tracks (such as stereo surround), though the magnetic oxide is prone to flaking and decay."
  },
  {
    slug: "historical-surround-sound-formats",
    title: "Historical Surround Sound Formats",
    category: "sound",
    categoryLabel: "Sound Preservation",
    shortDefinition: "Multi-channel physical sound formats like CinemaScope 4-track or Todd-AO 6-track from mid-century cinema.",
    detailedExplainer: "During the widescreen boom of the 1950s, engineers introduced complex multi-channel audio configurations. These systems required multiple physical heads and synchronized players, which present highly complex synchronization and hardware challenges during modern digital restoration."
  },
  {
    slug: "audio-click-pop-removal",
    title: "Audio Click & Pop Removal",
    category: "sound",
    categoryLabel: "Sound Preservation",
    shortDefinition: "Digital restoration tools that target and clean physical clicks, hiss, and splices from old optical soundtrack scans.",
    detailedExplainer: "Optical soundtracks suffer from physical scratches, dust, and splice joins, which translate to sharp pops, crackles, and loud thuds. Specialized digital audio restoration software (like iZotope RX) isolates these spikes and reconstructs the underlying waveforms smoothly."
  },
  {
    slug: "sound-restoration-remastering",
    title: "Sound Restoration & Remastering",
    category: "sound",
    categoryLabel: "Sound Preservation",
    shortDefinition: "The professional reconditioning of vintage audio elements, correcting speed variations and mechanical noises.",
    detailedExplainer: "Sound preservationists source the original audio masters (magnetic tracks or optical negatives). They digitize the signal, correct speed fluctuations like wow and flutter caused by mechanical shrinkage, apply balanced noise filters, and remaster the track into modern mono, stereo, or surround mixes."
  },

  // Category: institutions (7)
  {
    slug: "film-archive",
    title: "Film Archive",
    category: "institutions",
    categoryLabel: "Institutions, Standards & Rights",
    shortDefinition: "An institution dedicated to the collect, chemical preservation, and historical documentation of moving images.",
    detailedExplainer: "Film archives are specialized cultural repositories. They house temperature-controlled vaults, chemistry labs, and restoration scanners to physically save and catalogue original film rolls. They serve as guardians of human visual history, saving works from commercial neglect."
  },
  {
    slug: "cinematheque",
    title: "Cinémathèque",
    category: "institutions",
    categoryLabel: "Institutions, Standards & Rights",
    shortDefinition: "A specialized archive and theater focusing on public exhibition of historic films and retrospectives.",
    detailedExplainer: "Originating in France, a cinémathèque combines an active archival repository with high-curation theatrical exhibition. Rather than screening modern commercial films, they show retrospective programs, restored silent films, and director-focused series, celebrating cinema history as a living art form."
  },
  {
    slug: "fiaf-glossary",
    title: "FIAF (International Federation of Film Archives)",
    category: "institutions",
    categoryLabel: "Institutions, Standards & Rights",
    shortDefinition: "The premier global federation of film archives, promoting international standards and historical exchanges since 1938.",
    detailedExplainer: "Fédération Internationale des Archives du Film (FIAF) was founded in Paris to coordinate global preservation. It sets rigorous climate standards, publishes technical documentation, facilitates element exchanges for restorations, and establishes ethical guidelines for film curators."
  },
  {
    slug: "smpte-standards",
    title: "SMPTE Standards",
    category: "institutions",
    categoryLabel: "Institutions, Standards & Rights",
    shortDefinition: "Engineering standards established by the Society of Motion Picture and Television Engineers.",
    detailedExplainer: "SMPTE publishes technical standards that ensure compatibility across the industry. These standards define physical dimensions of film gauges, projector synchronization codes, timecode standards, and digital file templates (like DPX and MXF) used globally in restoration pipelines."
  },
  {
    slug: "copyright-and-orphan-works-in-restoration-glossary",
    title: "Copyright & Orphan Works",
    category: "institutions",
    categoryLabel: "Institutions, Standards & Rights",
    shortDefinition: "The complex legal rules governing the reproduction, repair, and display of films with missing or unknown owners.",
    detailedExplainer: "Because film restoration is highly expensive, clear copyright is needed to recoup costs. If a work is 'orphaned'—its copyright owner cannot be identified—archives face legal blockages in screening the film, forcing them to navigate complex legal exemptions to preserve and share them."
  },
  {
    slug: "rights-clearance-for-restoration-projects-glossary",
    title: "Rights Clearance",
    category: "institutions",
    categoryLabel: "Institutions, Standards & Rights",
    shortDefinition: "The legal process of researching, negotiating, and acquiring permissions to restore and distribute historical films.",
    detailedExplainer: "Rights clearance is a mandatory phase of any commercial restoration. It involves finding the heirs of original producers, verifying script rights, clearing soundtrack music copyrights, and negotiating licenses with current copyright owners to ensure the restored film can be legally distributed."
  },
  {
    slug: "public-domain-film-restoration-glossary",
    title: "Public Domain Film Restoration",
    category: "institutions",
    categoryLabel: "Institutions, Standards & Rights",
    shortDefinition: "Restoring films whose copyright has expired, enabling open-access digital distribution and study.",
    detailedExplainer: "When a film's copyright terms end, it enters the public domain, allowing anyone to copy or show it. While this removes legal hurdles for preservationists, it removes commercial incentives, making these projects highly dependent on non-profit donations and community funding."
  }
];

// 4. DIRECTORY ENTRIES (7 entries, verified facts only)
export const DIRECTORY_ENTRIES: DirectoryEntry[] = [
  {
    slug: "library-of-congress-national-audio-visual-conservation-center",
    title: "Library of Congress National Audio-Visual Conservation Center",
    region: "Culpeper, Virginia, United States",
    status: "US National Archive / FIAF Member",
    generalMission: "The preservation and consolidation of the US national collection of moving images and recorded sounds.",
    description: "This state-of-the-art facility located in Culpeper, Virginia, houses the Library of Congress's massive physical collections of motion pictures, television shows, and radio broadcasts. Built inside a secure bunker, it provides specialized cold storage vaults and digital preservation facilities for historical American cinematic records."
  },
  {
    slug: "ucla-film-and-television-archive",
    title: "UCLA Film & Television Archive",
    region: "Los Angeles, California, United States",
    status: "University Archive / FIAF Member",
    generalMission: "To collect, preserve, and showcase historical films and television programs for academic study and public appreciation.",
    description: "Affiliated with the University of California, Los Angeles, this archive represents one of the largest moving image collections in the United States. It specializes in historical Hollywood studio classics, independent features, and local television broadcasts, conducting major restorations that are presented annually in Los Angeles."
  },
  {
    slug: "george-eastman-museum",
    title: "George Eastman Museum",
    region: "Rochester, New York, United States",
    status: "Museum Archive / FIAF Member",
    generalMission: "The collection and preservation of photographic and cinematographic materials on the historic estate of George Eastman.",
    description: "Located on the Rochester estate of the founder of Eastman Kodak, this world-renowned museum maintains an extensive motion picture archive. It hosts a specialized school of film preservation and is famous for storing rare, fragile silent film reels and original camera negative elements on nitrate stock."
  },
  {
    slug: "bfi-national-archive",
    title: "BFI National Archive",
    region: "London / Berkhamsted, United Kingdom",
    status: "National Film Archive / FIAF Founding Member (1938)",
    generalMission: "To preserve and curate the moving image heritage of the United Kingdom, from early television to classic cinema.",
    description: "The British Film Institute (BFI) National Archive is one of the oldest and largest film collections in the world. As a founding member of FIAF in 1938, it maintains extensive collections of British cinema history, television heritage, and historical non-fiction films, housing them in specialized climate-controlled vaults."
  },
  {
    slug: "cinematheque-francaise",
    title: "Cinémathèque française",
    region: "Paris, France",
    status: "French Film Archive / FIAF Founding Member (1938)",
    generalMission: "The preservation, restoration, and public exhibition of international cinema heritage and related technical equipment.",
    description: "Co-founded by Henri Langlois in Paris, the Cinémathèque française was a founding member of FIAF in 1938. It holds an incomparable collection of film reels, pre-cinema optical devices, historic costumes, and scripts, serving as an iconic temple of cinematographic culture and archival screening."
  },
  {
    slug: "moma-department-of-film",
    title: "Museum of Modern Art (MoMA) Department of Film",
    region: "New York City, New York, United States",
    status: "Museum Archive / FIAF Founding Member (1938)",
    generalMission: "The preservation of cinema as a major modern artistic medium, collecting seminal silent, art-house, and global films.",
    description: "Established in 1935 as the MoMA Film Library, this department was a key founding member of FIAF in 1938. It champions cinema as a core art form, collecting and preserving artistic classics, avant-garde cinema, and international masterpieces, stored in their state-of-the-art preservation center."
  },
  {
    slug: "nfsa-australia",
    title: "National Film and Sound Archive of Australia (NFSA)",
    region: "Canberra, Australia",
    status: "Australian National Archive / FIAF Member",
    generalMission: "To collect, preserve, and share Australia's national audiovisual heritage, ensuring its availability for future generations.",
    description: "Headquartered in Canberra, the NFSA is the national custodian of Australia's moving image, recorded sound, and gaming heritage. It maintains specialized preservation laboratories to rescue fragile acetate film stocks, historically significant newsreels, and indigenous Australian audiovisual materials."
  }
];

// 5. PRACTICAL GUIDE PAGES (3 sub-pages under /hiring/ + faq data)
export const HIRING_PAGES: TechnicalArticle[] = [
  {
    slug: "finding-a-service-provider",
    title: "How to Find a Professional Film Restoration Service Provider",
    category: "Hiring Guidance",
    summary: "Critical criteria to evaluate when selecting a specialized laboratory to handle fragile family or institutional film archives.",
    metaTitle: "Finding a Film Restoration Service Provider | Liquifilm",
    metaDescription: "Learn how to choose and vet a professional film preservation laboratory for historical film scanning and scratch repair.",
    introduction: "Entrusting physical, fragile, and irreplaceable film elements to a restoration laboratory requires careful research. Here is how to locate and vet a qualified provider.",
    sections: [
      {
        title: "Check for Specialization in Historical Gauges",
        body: "Many modern commercial transfer services are optimized for consumer VHS tapes and have little experience with fragile, shrunk film. Ensure the lab has dedicated film preservation specialists, proper ultrasonic cleaning gear, and continuous-motion, sprocketless scanners that won't shred historic film."
      },
      {
        title: "Evaluate Chemical Cleanliness and Standards",
        body: "A professional laboratory must operate in a dust-free, clean-room environment with specialized air filtration. Ask if they use chemical ultrasonic film cleaning and whether they have certified liquid wet gates to handle physical scratches directly at scan time."
      }
    ],
    keyPoints: [
      "Avoid generalist consumer transfer operations that use outdated, high-tension sprocket projectors.",
      "Verify that the laboratory houses professional equipment from recognized makers (such as ARRI, Lasergraphics, or dft).",
      "Ensure the provider offers detailed pre-scan physical reports documenting shrinkage and sprocket damage.",
      "Look for membership in professional archiving bodies like AMIA (Association of Moving Image Archivists)."
    ]
  },
  {
    slug: "cost-factors",
    title: "Understanding the Cost Factors of Film Restoration",
    category: "Hiring Guidance",
    summary: "An transparent breakdown of pricing drivers, from physical splicing labor to high-resolution data storage.",
    metaTitle: "Cost Factors of Film Restoration Projects | Liquifilm",
    metaDescription: "Understand the pricing models, physical preparation costs, scanning resolutions, and storage fees in film restoration.",
    introduction: "Professional film restoration is an intricate, highly skilled craft. Understanding why quotes vary requires breaking down the core drivers of project costs.",
    sections: [
      {
        title: "Physical Prep: The Hidden Labor Cost",
        body: "A huge portion of the cost occurs before the film even touches a scanner. If a reel contains dozens of dried, broken edits or torn sprockets, a skilled technician must spend hours manually repairing each defect under a microscope. This intensive manual labor is billed by the hour or by the foot."
      },
      {
        title: "Resolution and Wet Gate Options",
        body: "Scanning in 4K or 8K requires significantly more processing time and data storage than 2K scans. Additionally, choosing a wet gate scan incurs a premium due to the cost of indexing fluids, scanner calibration time, and clean-up processes."
      }
    ],
    keyPoints: [
      "Manual physical prep (repairing perforations, re-splicing) is the most variable labor cost.",
      "Wet gate scanning adds a setup and fluid premium, but drastically reduces subsequent digital cleanup costs.",
      "High-resolution scans (4K/8K) require robust data handling and uncompressed master formatting (DPX).",
      "Digital frame-by-frame cleanup is billed on a time-and-complexity scale based on initial film condition."
    ]
  },
  {
    slug: "questions-to-ask",
    title: "10 Crucial Questions to Ask a Film Restoration Laboratory",
    category: "Hiring Guidance",
    summary: "A practical checklist of technical questions to ask a service provider before shipping your precious film elements.",
    metaTitle: "10 Questions to Ask a Film Restoration Lab | Liquifilm",
    metaDescription: "Ensure your film is handled safely. A checklist of technical questions to ask a preservation lab before hiring them.",
    introduction: "Before shipping rare or historically significant film reels to a laboratory, walk through this checklist of technical questions to ensure your materials will be handled safely.",
    sections: [
      {
        title: "Mechanical Questions: Handling and Transport",
        body: "First, ask: 'Do you use sprocketless scanners to transport film?' and 'How do you handle film with shrinkage exceeding 2%?' A professional lab should immediately answer with details about continuous capstan drives and optical tracking systems."
      },
      {
        title: "Optical and File Delivery Questions",
        body: "Next, ask: 'Do you offer optical wet gate scanning for physical scratch removal?' and 'What file formats do you deliver as archival master files?' Ensure they deliver uncompressed, archival-standard formats like DPX or ProRes 4444 XQ rather than highly compressed H.264 MP4 files."
      }
    ],
    keyPoints: [
      "Inquire about sprocketless continuous transport to protect brittle film from tearing.",
      "Confirm if they actively measure shrinkage levels before running the film.",
      "Ask for a written guarantee that original elements will not be subjected to high-temperature projector lamps.",
      "Request detailed logs of the physical prep work and scan settings used for your project."
    ]
  }
];

export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ_DATA: FAQItem[] = [
  {
    question: "What is wet gate (liquid gate) scanning?",
    answer: "Wet gate scanning is a physical restoration method where film is temporarily coated or submerged in a specialized liquid (with a refractive index matching the film base) as it passes through the scanner's lens. This bends light straight through surface scratches, making physical blemishes completely invisible on the final digital file without altering the actual film."
  },
  {
    question: "Does wet gate printing damage the original physical film?",
    answer: "No. When performed in a professional laboratory, wet gate printing is entirely non-destructive. The specialized fluids (like modern non-toxic fluorinated solvents) evaporate quickly and cleanly, leaving no residue, oil, or stain on the film stock. It is a standard, highly trusted preservation workflow."
  },
  {
    question: "What is vinegar syndrome and can it be cured?",
    answer: "Vinegar syndrome is the chemical decomposition of cellulose acetate safety film. It cannot be 'cured' or reversed once it begins, as the chemical breakdown is autocatalytic. However, its progress can be severely slowed by storing the film in specialized freezing or sub-freezing cold storage vaults and utilizing molecular sieves to absorb acid vapors."
  },
  {
    question: "Why should I choose wet gate scanning over digital AI cleanup?",
    answer: "Digital AI cleanup and software 'dust-busting' work by guessing and interpolating missing pixels from adjacent frames. This can blur original grain, soften details, and create unnatural visual artifacts. Wet gate scanning physically captures the actual, genuine photographic details located behind the scratch, preserving the original texture of the film."
  },
  {
    question: "How do I know if my old family film is nitrate or safety film?",
    answer: "Nitrate film was only used for professional 35mm motion pictures up to 1951. Standard consumer home movie gauges (like 16mm, 8mm, and Super 8) were manufactured exclusively on non-flammable safety film base and are never nitrate. Additionally, safety film usually features the words 'SAFETY FILM' printed along the edge of the film margins."
  },
  {
    question: "What is the recommended storage climate for historical film elements?",
    answer: "According to ISO 18911 standards, safety films should ideally be kept in sub-freezing cold storage vaults around -18°C (0°F) or at minimum below 4°C (40°F), with relative humidity strictly controlled between 20% and 40%. This cold, dry environment stalls chemical deacetylation and preserves dye layers for centuries."
  }
];
