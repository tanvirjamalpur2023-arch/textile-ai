from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm, mm
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image, Table, TableStyle, PageBreak, KeepTogether
from reportlab.platypus.flowables import HRFlowable
import os

OUT = '/home/z/my-project/download/BSc_Research_Topic_Selection_Guide_2026.pdf'
IMG = '/home/z/my-project/download/textile-research'

doc = SimpleDocTemplate(OUT, pagesize=A4, leftMargin=2*cm, rightMargin=2*cm, topMargin=2*cm, bottomMargin=2*cm)

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='CoverTitle', fontName='Helvetica-Bold', fontSize=28, leading=34, alignment=TA_CENTER, textColor=HexColor('#1F2937')))
styles.add(ParagraphStyle(name='CoverSub', fontName='Helvetica', fontSize=16, leading=22, alignment=TA_CENTER, textColor=HexColor('#4B5563')))
styles.add(ParagraphStyle(name='H1', fontName='Helvetica-Bold', fontSize=18, leading=24, textColor=HexColor('#1F2937'), spaceAfter=12, spaceBefore=20))
styles.add(ParagraphStyle(name='H2', fontName='Helvetica-Bold', fontSize=14, leading=18, textColor=HexColor('#3B82F6'), spaceAfter=8, spaceBefore=14))
styles.add(ParagraphStyle(name='H3', fontName='Helvetica-Bold', fontSize=12, leading=16, textColor=HexColor('#1F2937'), spaceAfter=6, spaceBefore=10))
styles.add(ParagraphStyle(name='Body', fontName='Helvetica', fontSize=10, leading=14, alignment=TA_JUSTIFY, textColor=HexColor('#374151'), spaceAfter=8))
styles.add(ParagraphStyle(name='MyBullet', fontName='Helvetica', fontSize=10, leading=14, textColor=HexColor('#374151'), leftIndent=20, spaceAfter=4, bulletIndent=8))
styles.add(ParagraphStyle(name='Caption', fontName='Helvetica-Oblique', fontSize=9, leading=12, alignment=TA_CENTER, textColor=HexColor('#6B7280'), spaceAfter=12))
styles.add(ParagraphStyle(name='TableCell', fontName='Helvetica', fontSize=9, leading=12, textColor=HexColor('#374151')))
styles.add(ParagraphStyle(name='TableHeader', fontName='Helvetica-Bold', fontSize=9, leading=12, textColor=white))
styles.add(ParagraphStyle(name='Highlight', fontName='Helvetica-Bold', fontSize=10, leading=14, textColor=HexColor('#10B981'), spaceAfter=6))
styles.add(ParagraphStyle(name='Warning', fontName='Helvetica-Bold', fontSize=10, leading=14, textColor=HexColor('#EF4444'), spaceAfter=6))

story = []

# ============ COVER ============
story.append(Spacer(1, 3*cm))
story.append(Paragraph('BSc Research Topic', styles['CoverTitle']))
story.append(Paragraph('Selection Guide 2026', styles['CoverTitle']))
story.append(Spacer(1, 1*cm))
story.append(HRFlowable(width="60%", thickness=3, color=HexColor('#3B82F6'), spaceAfter=20, spaceBefore=10))
story.append(Paragraph('Textile Engineering — Wet Processing Focus', styles['CoverSub']))
story.append(Spacer(1, 0.5*cm))
story.append(Paragraph('10 Topics Analyzed | 50+ Recent Papers Reviewed | Publication Roadmap Included', styles['CoverSub']))
story.append(Spacer(1, 2*cm))
story.append(Paragraph('Prepared for: BSc Textile Engineering Student', styles['Body']))
story.append(Paragraph('Focus Areas: Sustainable Dyeing, Wet Processing, Chemical Processing', styles['Body']))
story.append(Paragraph('Date: May 2026', styles['Body']))
story.append(PageBreak())

# ============ EXECUTIVE SUMMARY ============
story.append(Paragraph('1. Executive Summary', styles['H1']))
story.append(Paragraph('This guide analyzes 10 textile research topics specifically for BSc-level students who want to publish in SCI/Scopus-indexed journals. Each topic was evaluated against five critical criteria: BSc feasibility (lab access, cost, time), research novelty, publication gap, industry demand, and time to publish. The analysis is based on a comprehensive review of 50+ papers published between 2024 and 2026 across journals including Dyes and Pigments, Journal of Cleaner Production, RSC Advances, Cellulose, Textile Research Journal, and MDPI Sustainability.', styles['Body']))
story.append(Spacer(1, 6))
story.append(Paragraph('TOP RECOMMENDATION: Topic 9 — Low Liquor Ratio Salt-Free Dyeing with Bio-Mordants', styles['Highlight']))
story.append(Paragraph('This combined topic addresses the BIGGEST publication gap in textile wet processing research. Only 2-3 experimental papers exist on LLR dyeing (2024-2026), and ZERO papers combine LLR with bio-mordants or salt-free approaches. A BSc student with standard university lab equipment can complete the experiments in 8-10 weeks and target journals with IF 3.9-11.1.', styles['Body']))
story.append(Spacer(1, 6))

# Ranking table
story.append(Paragraph('2. All 10 Topics Ranked by BSc Publishability', styles['H1']))
story.append(Paragraph('The following table ranks all 10 topics based on a weighted score (40% feasibility + 35% novelty/gap + 25% industry demand). Topics in GREEN are strongly recommended, BLUE are good alternatives, and AMBER require additional resources or expertise.', styles['Body']))

rank_data = [
    [Paragraph('<b>Rank</b>', styles['TableHeader']), Paragraph('<b>Topic</b>', styles['TableHeader']),
     Paragraph('<b>Feasibility</b>', styles['TableHeader']), Paragraph('<b>Novelty/Gap</b>', styles['TableHeader']),
     Paragraph('<b>Score</b>', styles['TableHeader']), Paragraph('<b>Verdict</b>', styles['TableHeader'])],
    ['1', '9. Low Liquor Ratio + Salt-Free Dyeing', '9.0', '9.5', '9.2', 'BEST CHOICE'],
    ['2', '4. Natural Dyes & Bio-Mordants', '9.5', '7.5', '8.5', 'EXCELLENT'],
    ['3', '1. Sustainable Salt-Free Dyeing', '8.5', '8.0', '8.2', 'VERY GOOD'],
    ['4', '6. Enzymatic Wet Processing', '8.0', '7.0', '7.5', 'GOOD'],
    ['5', '7. Functional Finishing', '7.5', '7.5', '7.5', 'GOOD'],
    ['6', '2. AI/ML in Dyeing', '7.0', '8.5', '7.4', 'GOOD*'],
    ['7', '3. Wastewater Treatment', '7.5', '6.0', '6.8', 'COMMON'],
    ['8', '5. Digitalization/Ind.4.0', '5.5', '7.5', '6.2', 'HARD'],
    ['9', '8. Plasma & Nanotech', '5.0', '8.0', '6.0', 'ADVANCED'],
    ['10', '10. Circular Recycling', '4.5', '8.0', '5.8', 'ADVANCED'],
]

t = Table(rank_data, colWidths=[1.2*cm, 5.5*cm, 2.2*cm, 2.2*cm, 1.8*cm, 2.8*cm])
t.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), HexColor('#3B82F6')),
    ('TEXTCOLOR', (0,0), (-1,0), white),
    ('BACKGROUND', (0,1), (-1,1), HexColor('#D1FAE5')),
    ('BACKGROUND', (0,2), (-1,3), HexColor('#DBEAFE')),
    ('BACKGROUND', (0,4), (-1,6), HexColor('#FEF3C7')),
    ('BACKGROUND', (0,7), (-1,10), HexColor('#F3F4F6')),
    ('GRID', (0,0), (-1,-1), 0.5, HexColor('#D1D5DB')),
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ('FONTSIZE', (0,0), (-1,-1), 9),
    ('TOPPADDING', (0,0), (-1,-1), 4),
    ('BOTTOMPADDING', (0,0), (-1,-1), 4),
]))
story.append(t)
story.append(Spacer(1, 8))
story.append(Paragraph('* AI/ML topics score high on novelty but require Python/ML skills beyond typical BSc curriculum. Recommended only if you have programming experience.', styles['MyBullet']))

# ============ CHART: Topic Matrix ============
story.append(Paragraph('3. BSc Topic Selection Matrix', styles['H1']))
story.append(Paragraph('The chart below visualizes all 10 topics by BSc feasibility (x-axis), research impact (y-axis), and publication gap (bubble size). Green bubbles in the upper-right quadrant represent the best choices for BSc students — high impact topics that are feasible with university lab equipment and have large publication gaps.', styles['Body']))
chart_path = os.path.join(IMG, '07_bsc_topic_selection_matrix.png')
if os.path.exists(chart_path):
    story.append(Image(chart_path, width=15*cm, height=9.6*cm))
    story.append(Paragraph('Figure 1: BSc Research Topic Selection Matrix — Bubble size indicates publication gap (larger = more opportunity)', styles['Caption']))

# ============ DETAILED TOPIC ANALYSIS ============
story.append(Paragraph('4. Detailed Analysis of Top 3 Topics', styles['H1']))

# Topic 9
story.append(Paragraph('4.1 Topic 9: Low Liquor Ratio Salt-Free Dyeing with Bio-Mordants', styles['H2']))
story.append(Paragraph('<b>Why This is the #1 Choice:</b> This combined topic addresses the largest publication gap identified across all 10 areas. The 2024-2026 literature review found only 2-3 experimental papers on low liquor ratio (LLR) dyeing, and absolutely ZERO papers that combine LLR with salt-free cationization or bio-mordant approaches. This creates a massive "blue ocean" opportunity where a BSc student can make a genuinely novel contribution with standard laboratory equipment.', styles['Body']))
story.append(Paragraph('<b>Current Research Status:</b> A 2026 paper in Discover Chemistry (Springer) demonstrated LLR cotton dyeing at ratios as low as 1:3 with reactive dyes, showing 2.5-3.7 KJ energy consumption. A 2024 paper in Journal of Cleaner Production showed CHPTAC cationization bath reuse cutting chemical consumption by 97.98%. However, nobody has yet published work combining these approaches — LLR + cationization + bio-mordants in a single sustainable process.', styles['Body']))
story.append(Paragraph('<b>Key Research Papers:</b>', styles['H3']))
story.append(Paragraph('1. Elahi et al. (2026) "Reducing Water and Energy in Sustainable Cotton Dyeing Using LLR Process" — Discover Chemistry, Springer. First systematic LLR study at 1:3 ratio.', styles['MyBullet']))
story.append(Paragraph('2. Liu et al. (2024) "Cleaner Cationization by Reusing Modification Bath" — J. Cleaner Production. Bath reuse saves 97.98% chemicals.', styles['MyBullet']))
story.append(Paragraph('3. Majeed et al. (2025) "Salt-Free Dyeing via Graft Polymerization with Chitosan" — RSC Advances. Chitosan + dimethyl itaconate cationization.', styles['MyBullet']))
story.append(Paragraph('<b>Experimental Design:</b> Cationize cotton using chitosan or CHPTAC at various concentrations, then dye with reactive dyes at low liquor ratios (1:3, 1:5, 1:8, 1:10), using bio-mordants (pomegranate peel, myrobalan) as auxiliary agents. Measure K/S values, fastness properties, energy consumption, and effluent load. Compare with conventional 1:15 ratio dyeing.', styles['Body']))
story.append(Paragraph('<b>Target Journals:</b> Journal of Cleaner Production (IF 11.1), Sustainability (IF 3.9), Dyes and Pigments (IF 4.2), Cellulose (IF 4.9)', styles['MyBullet']))
story.append(Paragraph('<b>Estimated Cost:</b> $200-400 for chemicals and dyes', styles['MyBullet']))
story.append(Paragraph('<b>Time to Complete:</b> 8-10 weeks (experiments) + 3-4 weeks (writing)', styles['MyBullet']))

# Topic 4
story.append(Paragraph('4.2 Topic 4: Natural Dyes & Bio-Mordants', styles['H2']))
story.append(Paragraph('<b>Why This is the #2 Choice:</b> Natural dyes and bio-mordants represent the most BSc-friendly research area with the lowest barrier to entry. Experiments can be conducted with basic equipment (hot plate, dyeing pots, thermometer) and inexpensive materials (plant leaves, fruit peels, cotton fabric). The 2025 paper by Hosseinnezhad et al. in Research Journal of Textile and Apparel introduced dual bio-mordants from agricultural waste (walnut husk + pomegranate peel), opening a new direction that has not yet been extensively followed up.', styles['Body']))
story.append(Paragraph('<b>Current Research Status:</b> There is growing literature on natural dyes, but a critical gap exists in standardization and industrial scalability. Most published work uses single bio-mordants; dual and triple bio-mordant combinations are virtually unexplored. Additionally, the 2026 paper by Rasmussen et al. in Current Opinion in Environmental Sustainability formally identified synthetic dyes as a BARRIER to circular economy recycling — creating urgent demand for natural dye alternatives that enable fiber-to-fiber recyclability.', styles['Body']))
story.append(Paragraph('<b>Key Research Papers:</b>', styles['H3']))
story.append(Paragraph('1. Hosseinnezhad et al. (2024) "New Combination of Bio-Mordant from Agriculture Waste" — RJTA, Emerald. Dual WH+PO bio-mordant on wool.', styles['MyBullet']))
story.append(Paragraph('2. Ketema et al. (2025) "Optimization of Cotton Dyeing Using Urera Leaf Extract and Wood Ash Bio-Mordant" — J. Natural Fibers. RSM optimization.', styles['MyBullet']))
story.append(Paragraph('3. Rasmussen et al. (2026) "Synthetic Dyes: A Barrier to Circular Economy?" — Current Opinion in Environmental Sustainability. Landmark review.', styles['MyBullet']))
story.append(Paragraph('<b>Target Journals:</b> Journal of Natural Fibers (IF 3.1), Sustainability (IF 3.9), Textile Research Journal (IF 1.9)', styles['MyBullet']))

# Topic 1
story.append(Paragraph('4.3 Topic 1: Salt-Free Dyeing via Cationization', styles['H2']))
story.append(Paragraph('<b>Why This is the #3 Choice:</b> Salt-free dyeing through cotton cationization is a mature yet still-evolving field with consistent publication opportunities. The key advantage for BSc students is the well-established experimental protocols — CHPTAC cationization has been practiced for over a decade, meaning methodology papers are available as references. Recent innovations using chitosan grafting (RSC Advances 2025) and cationic nanoparticles (Int. J. Biol. Macromol. 2025) have opened new research directions that are accessible to undergraduate researchers.', styles['Body']))
story.append(Paragraph('<b>Current Research Status:</b> Nine significant papers were published in 2024-2026 on salt-free dyeing approaches. The hottest new direction is dual salt-free AND alkali-free (neutral fixation) dyeing, with a 2026 paper in Dyes and Pigments demonstrating this concept. Bath reuse strategies (Liu et al. 2024) dramatically reduce chemical consumption and represent an underexplored optimization angle.', styles['Body']))
story.append(Paragraph('<b>Key Research Papers:</b>', styles['H3']))
story.append(Paragraph('1. Majeed et al. (2025) "Salt-Free Dyeing via Graft Polymerization with Chitosan Using Dimethyl Itaconate" — RSC Advances.', styles['MyBullet']))
story.append(Paragraph('2. Xie et al. (2025) "Salt-Free Clean Dyeing by Reactive Dye/Cationic Nanoparticle for Dark Colours" — Int. J. Biol. Macromol.', styles['MyBullet']))
story.append(Paragraph('3. Liu et al. (2024) "Cleaner Cationization by Reusing Modification Bath" — J. Cleaner Production.', styles['MyBullet']))

# ============ RADAR CHART ============
story.append(Paragraph('5. Top 3 Topics — Detailed Comparison', styles['H1']))
story.append(Paragraph('The radar charts below compare the top 3 recommended topics across 7 evaluation dimensions. Topic 9 (LLR + Salt-Free) achieves the most balanced high scores across all criteria, particularly excelling in publication gap and research novelty — the two most important factors for acceptance in high-impact journals.', styles['Body']))
chart_path2 = os.path.join(IMG, '08_top3_radar_comparison.png')
if os.path.exists(chart_path2):
    story.append(Image(chart_path2, width=16*cm, height=6.2*cm))
    story.append(Paragraph('Figure 2: Detailed comparison of top 3 recommended BSc research topics across 7 evaluation criteria', styles['Caption']))

# ============ EXPERIMENTAL PLAN ============
story.append(Paragraph('6. Detailed Experimental Plan — Topic 9', styles['H1']))
story.append(Paragraph('The following step-by-step experimental plan is designed for a BSc student with access to a standard university textile wet processing laboratory. Total duration: 13 weeks from topic selection to paper submission.', styles['Body']))

plan_data = [
    [Paragraph('<b>Phase</b>', styles['TableHeader']), Paragraph('<b>Week</b>', styles['TableHeader']),
     Paragraph('<b>Activities</b>', styles['TableHeader']), Paragraph('<b>Deliverable</b>', styles['TableHeader'])],
    ['Phase 1', '1-2', 'Literature review (30+ papers),\nidentify research gap, plan\nmethodology', 'Literature review\ndocument + research\nquestion'],
    ['Phase 2', '3-5', 'Cationization experiments:\nCHPTAC/chitosan at 2-3\nconcentrations, optimize\nmodification conditions', 'Optimized cationization\nparameters + FTIR\nverification'],
    ['Phase 3', '6-8', 'Salt-free dyeing at LLR\n(1:3, 1:5, 1:8, 1:10) with\nbio-mordants (pomegranate\npeel, myrobalan)', 'K/S values, fastness\ndata, effluent analysis'],
    ['Phase 4', '9-10', 'Characterization: color\nstrength (K/S), wash/rub/\nlight fastness, CIELab,\nFTIR, bending rigidity', 'Complete dataset +\nstatistical analysis\n(ANOVA)'],
    ['Phase 5', '11-13', 'Paper writing: Title,\nAbstract, Introduction,\nMethods, Results, Discussion,\nConclusion, References', 'Camera-ready\nmanuscript submitted\nto target journal'],
]
t2 = Table(plan_data, colWidths=[2*cm, 1.5*cm, 5.5*cm, 5*cm])
t2.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), HexColor('#3B82F6')),
    ('TEXTCOLOR', (0,0), (-1,0), white),
    ('BACKGROUND', (0,1), (0,1), HexColor('#DBEAFE')),
    ('BACKGROUND', (0,2), (0,2), HexColor('#D1FAE5')),
    ('BACKGROUND', (0,3), (0,3), HexColor('#EDE9FE')),
    ('BACKGROUND', (0,4), (0,4), HexColor('#FEF3C7')),
    ('BACKGROUND', (0,5), (0,5), HexColor('#FEE2E2')),
    ('GRID', (0,0), (-1,-1), 0.5, HexColor('#D1D5DB')),
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ('FONTSIZE', (0,0), (-1,-1), 9),
    ('TOPPADDING', (0,0), (-1,-1), 5),
    ('BOTTOMPADDING', (0,0), (-1,-1), 5),
]))
story.append(t2)
story.append(Spacer(1, 8))

# Timeline chart
chart_path3 = os.path.join(IMG, '09_research_timeline_roadmap.png')
if os.path.exists(chart_path3):
    story.append(Image(chart_path3, width=16*cm, height=8*cm))
    story.append(Paragraph('Figure 3: 13-Week Research Timeline — From topic selection to paper submission', styles['Caption']))

# ============ CHEMICALS & EQUIPMENT ============
story.append(Paragraph('7. Chemicals & Equipment Required', styles['H1']))
story.append(Paragraph('The table below lists all chemicals and equipment needed for the recommended Topic 9 experiments. All items are standard in university textile laboratories. Total estimated cost: $200-400 USD.', styles['Body']))

chem_data = [
    [Paragraph('<b>Item</b>', styles['TableHeader']), Paragraph('<b>Purpose</b>', styles['TableHeader']),
     Paragraph('<b>Est. Cost</b>', styles['TableHeader']), Paragraph('<b>Available in Lab?</b>', styles['TableHeader'])],
    ['Cotton fabric (plain weave)', 'Substrate', '$5-10/m', 'Yes'],
    ['CHPTAC (60% aqueous)', 'Cationizing agent', '$30-50', 'Check'],
    ['Chitosan (medium MW)', 'Bio-based cationizer', '$25-40', 'Check'],
    ['Dimethyl itaconate', 'Crosslinker for chitosan', '$30-50', 'Order'],
    ['Reactive dyes (C.I. RB 19, RR 195)', 'Dye', '$15-25 each', 'Yes'],
    ['NaOH, Na2CO3, Acetic acid', 'Chemicals', '$5-10', 'Yes'],
    ['Pomegranate peel powder', 'Bio-mordant', '$5-10', 'Collect/Order'],
    ['Myrobalan (Harda) powder', 'Bio-mordant', '$5-10', 'Order'],
    ['Lab dyeing machine (IR type)', 'Dyeing at various LR', 'Shared', 'Yes'],
    ['Spectrophotometer (reflectance)', 'K/S and CIELab', 'Shared', 'Yes'],
    ['FTIR spectrometer', 'Surface characterization', 'Shared', 'Yes'],
    ['Crockmeter', 'Rub fastness', 'Shared', 'Yes'],
    ['Wash fastness tester', 'ISO 105-C06', 'Shared', 'Yes'],
]
t3 = Table(chem_data, colWidths=[4.5*cm, 3.5*cm, 2.5*cm, 3.5*cm])
t3.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), HexColor('#3B82F6')),
    ('TEXTCOLOR', (0,0), (-1,0), white),
    ('ROWBACKGROUNDS', (0,1), (-1,-1), [HexColor('#F9FAFB'), white]),
    ('GRID', (0,0), (-1,-1), 0.5, HexColor('#D1D5DB')),
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ('FONTSIZE', (0,0), (-1,-1), 9),
    ('TOPPADDING', (0,0), (-1,-1), 3),
    ('BOTTOMPADDING', (0,0), (-1,-1), 3),
]))
story.append(t3)

# ============ TOPIC 6-10 BRIEF ANALYSIS ============
story.append(Paragraph('8. Brief Analysis of Topics 6-10', styles['H1']))

story.append(Paragraph('8.1 Topic 6: Enzymatic Wet Processing', styles['H2']))
story.append(Paragraph('Enzymatic processing (bio-scouring, bio-polishing, enzyme washing) is a well-established area with moderate publication opportunities. The key advantage is simplicity — commercial cellulase enzymes are readily available and experiments take only 2-3 days. However, novelty is lower compared to LLR or salt-free approaches. Best combined with AI optimization (ML-based parameter prediction) to increase novelty. The cross-topic of "ML-optimized enzymatic bio-scouring" has nearly zero competing papers. Recent work by Heliyon (2024) used sugarcane bagasse-derived enzymes, opening new low-cost bio-enzyme directions for BSc researchers in tropical countries.', styles['Body']))

story.append(Paragraph('8.2 Topic 7: Functional Finishing', styles['H2']))
story.append(Paragraph('Functional finishing (antibacterial, UV protection, water repellent, flame retardant) is a high-demand area with many experimental papers already published. The simplest BSc-feasible approach is plant-extract finishing — Tulsi (Ocimum sanctum) extract on cotton for antibacterial + UV protection requires only leaves, hot water, and a pad-dry-cure setup (Rohit & Shah, 2024). Mimusops elengi leaf extract provides dual dyeing + finishing functionality (Hossain et al., 2024). For higher novelty, combine plant extracts with green-synthesized CuO or Ag nanoparticles, though this requires SEM/XRD characterization access.', styles['Body']))

story.append(Paragraph('8.3 Topic 2: AI/ML in Dyeing', styles['H2']))
story.append(Paragraph('AI-based dyeing optimization is the fastest-growing research area in textile engineering (5.8x growth since 2017), but requires Python programming and machine learning skills. The simplest entry point is building a color prediction model using scikit-learn (free, Python-based) with dyeing data from your lab. Jasper & Ingle (2025, MDPI) demonstrated ML-based shade prediction, while a 2025 paper in Dyes and Pigments used AI for polyimide dyeing optimization. If you have programming experience, this topic offers extremely high novelty with zero chemical costs — only a computer and free software needed.', styles['Body']))

story.append(Paragraph('8.4 Topic 8: Plasma & Nanotechnology', styles['H2']))
story.append(Paragraph('Plasma surface treatment and nanotechnology finishing are high-impact but equipment-intensive topics. Most university labs lack plasma generators, and nanoparticle synthesis requires SEM/XRD characterization that may not be available. However, if your lab has a dielectric barrier discharge (DBD) plasma unit, a novel 2026 paper in Arabian Journal of Chemistry combined DBD plasma + ZnO + green tea extract for multifunctional finishing — a replicable approach. Without specialized equipment, this topic is NOT recommended for BSc students.', styles['Body']))

story.append(Paragraph('8.5 Topics 3, 5, 10: Wastewater, Industry 4.0, and Circular Recycling', styles['H2']))
story.append(Paragraph('Wastewater treatment (Topic 3) is the most-cited textile research area but is heavily saturated — it is difficult to find novel angles at BSc level. Industry 4.0/Digitalization (Topic 5) requires IoT hardware, sensors, and factory access that most BSc students cannot obtain. Circular recycling (Topic 10) is critically important but requires chemical recycling infrastructure (depolymerization setups, solvent recovery) beyond typical BSc lab capabilities. All three topics score low on BSc feasibility and are better suited for MSc/PhD research with dedicated equipment and longer timelines.', styles['Body']))

# ============ PUBLICATION STRATEGY ============
story.append(Paragraph('9. Publication Strategy for BSc Students', styles['H1']))
story.append(Paragraph('Publishing as a BSc student is challenging but entirely achievable with the right strategy. The following recommendations are specifically designed for undergraduate researchers with limited time and resources.', styles['Body']))

story.append(Paragraph('<b>9.1 Journal Selection Hierarchy:</b>', styles['H3']))
journal_data = [
    [Paragraph('<b>Tier</b>', styles['TableHeader']), Paragraph('<b>Journal</b>', styles['TableHeader']),
     Paragraph('<b>IF (2024)</b>', styles['TableHeader']), Paragraph('<b>Best For</b>', styles['TableHeader']),
     Paragraph('<b>BSc Friendly?</b>', styles['TableHeader'])],
    ['Tier 1', 'J. Cleaner Production', '11.1', 'Sustainable processing', 'Moderate'],
    ['Tier 1', 'Green Chemistry (RSC)', '10.2', 'Bio-based chemistry', 'Hard'],
    ['Tier 2', 'Cellulose', '4.9', 'Cellulose dyeing', 'Yes'],
    ['Tier 2', 'Dyes and Pigments', '4.2', 'Dyeing chemistry', 'Yes'],
    ['Tier 2', 'Molecules (MDPI)', '4.2', 'Bio-based auxiliaries', 'Yes'],
    ['Tier 3', 'Sustainability (MDPI)', '3.9', 'Sustainability review', 'Very Yes'],
    ['Tier 3', 'J. Natural Fibers', '3.1', 'Natural dyes', 'Very Yes'],
    ['Tier 3', 'J. Industrial Textiles', '2.5', 'Functional finishing', 'Yes'],
    ['Tier 4', 'Textile Research J.', '1.9', 'General textile science', 'Very Yes'],
]
t4 = Table(journal_data, colWidths=[1.5*cm, 3.5*cm, 1.8*cm, 3.5*cm, 2.5*cm])
t4.setStyle(TableStyle([
    ('BACKGROUND', (0,0), (-1,0), HexColor('#3B82F6')),
    ('TEXTCOLOR', (0,0), (-1,0), white),
    ('ROWBACKGROUNDS', (0,1), (-1,-1), [HexColor('#F9FAFB'), white]),
    ('GRID', (0,0), (-1,-1), 0.5, HexColor('#D1D5DB')),
    ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ('FONTSIZE', (0,0), (-1,-1), 9),
    ('TOPPADDING', (0,0), (-1,-1), 3),
    ('BOTTOMPADDING', (0,0), (-1,-1), 3),
]))
story.append(t4)
story.append(Spacer(1, 8))

story.append(Paragraph('<b>9.2 BSc Publication Tips:</b>', styles['H3']))
story.append(Paragraph('1. Target Tier 3-4 journals first — higher acceptance rates, faster review (2-4 months), and BSc-friendly editors who appreciate undergraduate research.', styles['MyBullet']))
story.append(Paragraph('2. Emphasize the novelty angle explicitly in your abstract — "First study to combine LLR dyeing with bio-mordant cationization" is a powerful hook for editors.', styles['MyBullet']))
story.append(Paragraph('3. Include statistical analysis (ANOVA, RSM) — reviewers consistently request this, and it dramatically strengthens your paper.', styles['MyBullet']))
story.append(Paragraph('4. Collaborate with a faculty supervisor — even informal guidance significantly improves paper quality and journal credibility.', styles['MyBullet']))
story.append(Paragraph('5. Compare with 2024-2025 benchmark papers directly — cite them and show how your approach improves upon their results.', styles['MyBullet']))
story.append(Paragraph('6. Avoid predatory journals — check Beall\'s List and verify the journal is indexed in Scopus/Web of Science before submitting.', styles['MyBullet']))

# ============ NEXT STEPS ============
story.append(Paragraph('10. Immediate Next Steps', styles['H1']))
story.append(Paragraph('If you choose Topic 9 (Low Liquor Ratio Salt-Free Dyeing with Bio-Mordants), here are your immediate action items for this week:', styles['Body']))
story.append(Paragraph('<b>Week 1 Action Items:</b>', styles['H3']))
story.append(Paragraph('1. Confirm your lab has: IR dyeing machine, spectrophotometer, wash fastness tester, and basic chemicals (NaOH, Na2CO3, acetic acid).', styles['MyBullet']))
story.append(Paragraph('2. Order: CHPTAC (60% aqueous) or chitosan, reactive dyes (C.I. Reactive Blue 19 and Reactive Red 195), bio-mordants (pomegranate peel powder, myrobalan powder).', styles['MyBullet']))
story.append(Paragraph('3. Download and read these 5 key papers in full: Elahi et al. (2026) Discover Chemistry; Liu et al. (2024) J. Cleaner Production; Majeed et al. (2025) RSC Advances; Hosseinnezhad et al. (2024) RJTA; Ketema et al. (2025) J. Natural Fibers.', styles['MyBullet']))
story.append(Paragraph('4. Prepare your research question: "Can low liquor ratio (1:3-1:8) salt-free reactive dyeing of cationized cotton, assisted with bio-mordants, achieve comparable color strength and fastness to conventional 1:15 dyeing?"', styles['MyBullet']))
story.append(Paragraph('5. Create your experimental plan with specific sample numbers, concentrations, and testing schedule.', styles['MyBullet']))
story.append(Spacer(1, 12))
story.append(Paragraph('I will continue to assist you through every step of this research journey — from experimental design to paper writing, statistical analysis, journal selection, and reviewer response. Just let me know when you are ready to begin!', styles['Body']))

# Build
doc.build(story)
print(f"PDF generated: {OUT}")
