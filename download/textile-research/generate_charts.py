import matplotlib
matplotlib.use('Agg')
import matplotlib.font_manager as fm
fm.fontManager.addfont('/usr/share/fonts/truetype/chinese/SarasaMonoSC-Regular.ttf')
fm.fontManager.addfont('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf')

import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import numpy as np

plt.rcParams['font.sans-serif'] = ['Sarasa Mono SC', 'DejaVu Sans']
plt.rcParams['axes.unicode_minus'] = False
plt.rcParams['figure.dpi'] = 300
plt.rcParams['savefig.dpi'] = 300
plt.rcParams['figure.facecolor'] = '#FFFFFF'
plt.rcParams['axes.facecolor'] = '#F8FAFC'
plt.rcParams['axes.edgecolor'] = '#D1D5DB'
plt.rcParams['axes.grid'] = True
plt.rcParams['grid.alpha'] = 0.15
plt.rcParams['grid.color'] = '#94A3B8'

SAVE_DIR = '/home/z/my-project/download/textile-research'

# ============================================
# CHART 1: Research Topic Trend Evolution (2017-2026)
# ============================================
fig, ax = plt.subplots(figsize=(14, 7.5))
fig.patch.set_facecolor('#FFFFFF')
ax.set_facecolor('#F8FAFC')

years = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026]

data = {
    'Sustainable Wet Processing':    [100, 115, 130, 155, 185, 220, 270, 330, 400, 460],
    'Nanotechnology Finishing':      [100, 120, 140, 165, 190, 225, 265, 310, 360, 400],
    'Smart/Wearable Textiles':       [100, 110, 125, 140, 170, 210, 260, 320, 395, 470],
    'Waterless Dyeing (scCO2)':      [100, 105, 115, 130, 155, 185, 220, 270, 330, 380],
    'AI/Industry 4.0 Textile':       [100, 108, 120, 145, 180, 240, 310, 400, 500, 580],
    'Circular Economy Textile':      [100, 112, 130, 160, 200, 250, 310, 380, 450, 510],
}

colors = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4']
styles = ['-', '-', '-', '--', '-.', '--']

for i, (topic, values) in enumerate(data.items()):
    lw = 2.8 if i < 3 else 2.0
    alpha = 1.0 if i < 3 else 0.75
    ax.plot(years, values, color=colors[i], linewidth=lw, alpha=alpha,
            linestyle=styles[i], marker='o' if i < 3 else 's', markersize=5 if i < 3 else 4,
            label=topic, zorder=5-i)

ax.set_xlabel('Year', fontsize=13, fontweight='bold', color='#1F2937')
ax.set_ylabel('Relative Publication Index (2017 = 100)', fontsize=13, fontweight='bold', color='#1F2937')
ax.set_title('Textile Research Topic Growth Trends (2017-2026)', fontsize=16, fontweight='bold', color='#111827', pad=15)

ax.set_xlim(2017, 2026)
ax.set_ylim(80, 620)
ax.set_xticks(years)
ax.tick_params(axis='both', labelsize=11, colors='#4B5563')

ax.annotate('AI/Industry 4.0\nFastest Growing', xy=(2026, 580), xytext=(2024.2, 600),
            fontsize=10, color='#EF4444', fontweight='bold',
            arrowprops=dict(arrowstyle='->', color='#EF4444', lw=1.5),
            ha='center')

ax.legend(loc='upper left', fontsize=10, framealpha=0.9, edgecolor='#D1D5DB',
          fancybox=True, shadow=False, ncol=2)

plt.tight_layout()
plt.savefig(f'{SAVE_DIR}/01_research_trend_evolution.png', bbox_inches='tight', facecolor='#FFFFFF')
plt.close()
print("Chart 1 saved: Research Trend Evolution")

# ============================================
# CHART 2: Country-wise Research Activity
# ============================================
fig, ax = plt.subplots(figsize=(12, 7))
fig.patch.set_facecolor('#FFFFFF')
ax.set_facecolor('#F8FAFC')

countries = ['China', 'India', 'USA', 'South Korea', 'UK', 'Turkey', 'Australia',
             'Germany', 'Pakistan', 'Portugal', 'Saudi Arabia', 'Hong Kong']
top50_count = [24, 4, 1, 2, 1, 2, 2, 1, 1, 1, 2, 1]
pub_share = [38, 12, 9, 7, 5, 4, 3, 3, 3, 2, 2, 2]

y_pos = np.arange(len(countries))
bar_height = 0.35

bars1 = ax.barh(y_pos + bar_height/2, top50_count, bar_height, label='Top 50 Universities Count',
                color='#3B82F6', alpha=0.85, edgecolor='white', linewidth=0.5)
bars2 = ax.barh(y_pos - bar_height/2, pub_share, bar_height, label='Global Publication Share (%)',
                color='#10B981', alpha=0.85, edgecolor='white', linewidth=0.5)

ax.set_yticks(y_pos)
ax.set_yticklabels(countries, fontsize=11, color='#1F2937')
ax.set_xlabel('Count / Percentage', fontsize=13, fontweight='bold', color='#1F2937')
ax.set_title('Country-wise Textile Research Activity (2024-2025)', fontsize=15, fontweight='bold', color='#111827', pad=12)
ax.legend(loc='lower right', fontsize=10, framealpha=0.9, edgecolor='#D1D5DB')
ax.invert_yaxis()
ax.tick_params(axis='x', labelsize=10, colors='#4B5563')

for bar in bars1:
    width = bar.get_width()
    if width > 0:
        ax.text(width + 0.3, bar.get_y() + bar.get_height()/2, f'{int(width)}',
                ha='left', va='center', fontsize=9, color='#3B82F6', fontweight='bold')
for bar in bars2:
    width = bar.get_width()
    if width > 0:
        ax.text(width + 0.3, bar.get_y() + bar.get_height()/2, f'{int(width)}%',
                ha='left', va='center', fontsize=9, color='#059669', fontweight='bold')

plt.tight_layout()
plt.savefig(f'{SAVE_DIR}/02_country_research_activity.png', bbox_inches='tight', facecolor='#FFFFFF')
plt.close()
print("Chart 2 saved: Country Research Activity")

# ============================================
# CHART 3: Journal Impact Factor Ranking
# ============================================
fig, ax = plt.subplots(figsize=(13, 7.5))
fig.patch.set_facecolor('#FFFFFF')
ax.set_facecolor('#F8FAFC')

journals = [
    'Advanced Fiber Materials', 'J. Cleaner Production', 'Green Chemistry',
    'ACS Appl. Mater. & Interfaces', 'Cellulose', 'Dyes and Pigments',
    'Molecules', 'Sustainability', 'J. Natural Fibers',
    'J. Industrial Textiles', 'Textile Research J.', 'Autex Research J.'
]
impacts = [17.2, 11.1, 10.2, 9.5, 4.9, 4.2, 4.2, 3.9, 3.1, 2.5, 1.9, 1.5]

colors_j = ['#EF4444' if v >= 10 else '#3B82F6' if v >= 4 else '#10B981' if v >= 2.5 else '#94A3B8' for v in impacts]

bars = ax.barh(range(len(journals)), impacts, color=colors_j, alpha=0.85,
               edgecolor='white', linewidth=0.5, height=0.7)

ax.set_yticks(range(len(journals)))
ax.set_yticklabels(journals, fontsize=10.5, color='#1F2937')
ax.set_xlabel('Impact Factor (2024)', fontsize=13, fontweight='bold', color='#1F2937')
ax.set_title('Key Textile Research Journals — Impact Factor Ranking', fontsize=15, fontweight='bold', color='#111827', pad=12)
ax.invert_yaxis()
ax.tick_params(axis='x', labelsize=10, colors='#4B5563')
ax.set_xlim(0, 20)

for i, (bar, val) in enumerate(zip(bars, impacts)):
    ax.text(val + 0.2, bar.get_y() + bar.get_height()/2, f'{val}',
            ha='left', va='center', fontsize=10, color=colors_j[i], fontweight='bold')

high = mpatches.Patch(color='#EF4444', alpha=0.85, label='High Impact (IF >= 10)')
mid = mpatches.Patch(color='#3B82F6', alpha=0.85, label='Mid Impact (IF 4-10)')
low = mpatches.Patch(color='#10B981', alpha=0.85, label='Standard (IF 2.5-4)')
base = mpatches.Patch(color='#94A3B8', alpha=0.85, label='Baseline (IF < 2.5)')
ax.legend(handles=[high, mid, low, base], loc='lower right', fontsize=9.5,
          framealpha=0.9, edgecolor='#D1D5DB')

plt.tight_layout()
plt.savefig(f'{SAVE_DIR}/03_journal_impact_ranking.png', bbox_inches='tight', facecolor='#FFFFFF')
plt.close()
print("Chart 3 saved: Journal Impact Ranking")

# ============================================
# CHART 4: Research Opportunity Matrix (Impact vs Competition)
# ============================================
fig, ax = plt.subplots(figsize=(12, 8))
fig.patch.set_facecolor('#FFFFFF')
ax.set_facecolor('#F8FAFC')

topics = [
    'Ionic Liquid\nProcessing',
    'Bacterial Self-\nPigmenting',
    'AI Dye Recipe\nOptimization',
    'Digital Twin\nWet Processing',
    'scCO2 for\nCellulose',
    'PFAS-Free\nDWR Finishing',
    'Bio-based\nAuxiliaries',
    'Nanoparticle\nMultifunctional',
    'Enzyme Cocktail\nProcessing',
    'Self-Healing\nTextiles',
    'Radiative Cooling\nTextiles',
    'Natural Dye\nScale-up',
    'Plasma\nPre-treatment',
    'Textile Wastewater\nTreatment',
    'Circular Economy\nReview'
]

impact = [9.5, 9.0, 8.5, 8.0, 9.0, 8.5, 7.5, 7.0, 7.5, 8.0, 7.0, 6.0, 6.5, 5.5, 5.0]
competition = [2.0, 1.5, 4.0, 2.5, 5.0, 6.0, 5.5, 7.5, 4.5, 3.0, 3.5, 7.0, 6.0, 9.0, 8.5]
market = [300, 250, 350, 280, 400, 450, 380, 500, 300, 220, 200, 350, 280, 300, 250]

colors_b = []
for imp, comp in zip(impact, competition):
    if imp >= 7.5 and comp <= 5:
        colors_b.append('#10B981')
    elif imp >= 7.5 and comp > 5:
        colors_b.append('#3B82F6')
    elif imp < 7.5 and comp <= 5:
        colors_b.append('#F59E0B')
    else:
        colors_b.append('#94A3B8')

scatter = ax.scatter(competition, impact, s=market, c=colors_b, alpha=0.7,
                     edgecolors='white', linewidth=1.5, zorder=5)

for i, topic in enumerate(topics):
    ax.annotate(topic, (competition[i], impact[i]),
                textcoords="offset points", xytext=(0, -18 if market[i] > 350 else 14),
                ha='center', fontsize=8.5, color='#1F2937', fontweight='bold')

ax.axhline(y=7.5, color='#94A3B8', linestyle='--', alpha=0.5, linewidth=1)
ax.axvline(x=5.0, color='#94A3B8', linestyle='--', alpha=0.5, linewidth=1)

ax.text(2.5, 9.7, 'SWEET SPOT\nHigh Impact + Low Competition', fontsize=10,
        color='#10B981', fontweight='bold', ha='center', alpha=0.8)
ax.text(7.5, 9.7, 'HIGH COMPETITION\nHigh Impact + Crowded', fontsize=10,
        color='#3B82F6', fontweight='bold', ha='center', alpha=0.8)
ax.text(2.5, 5.3, 'NICHE OPPORTUNITY\nMedium Impact + Low Competition', fontsize=10,
        color='#F59E0B', fontweight='bold', ha='center', alpha=0.8)
ax.text(7.5, 5.3, 'LOW PRIORITY\nMedium Impact + Crowded', fontsize=10,
        color='#94A3B8', fontweight='bold', ha='center', alpha=0.8)

ax.set_xlabel('Competition Level (1=Low, 10=High)', fontsize=13, fontweight='bold', color='#1F2937')
ax.set_ylabel('Research Impact Potential (1=Low, 10=High)', fontsize=13, fontweight='bold', color='#1F2937')
ax.set_title('Research Opportunity Matrix — Textile Engineering (2026)', fontsize=15, fontweight='bold', color='#111827', pad=12)
ax.set_xlim(0, 10)
ax.set_ylim(4.5, 10.2)
ax.tick_params(axis='both', labelsize=10, colors='#4B5563')

plt.tight_layout()
plt.savefig(f'{SAVE_DIR}/04_research_opportunity_matrix.png', bbox_inches='tight', facecolor='#FFFFFF')
plt.close()
print("Chart 4 saved: Research Opportunity Matrix")

# ============================================
# CHART 5: Market Growth Projections
# ============================================
fig, ax = plt.subplots(figsize=(13, 7))
fig.patch.set_facecolor('#FFFFFF')
ax.set_facecolor('#F8FAFC')

sectors = ['Smart\nTextiles', 'Waterless\nDyeing', 'Natural\nDyes', 'Functional\nFinishing',
           'Geotextiles', 'Automotive\nComposites', 'Smart\nBandages', 'AI Textile\nMfg']
current = [2.41, 0.35, 4.57, 5.20, 7.99, 10.06, 0.78, 1.48]
projected = [5.56, 0.78, 7.54, 7.80, 13.40, 17.72, 2.52, 3.50]
cagr = [18.2, 9.2, 5.7, 5.3, 6.7, 12.0, 11.5, 15.7]

x = np.arange(len(sectors))
width = 0.35

bars1 = ax.bar(x - width/2, current, width, label='Current Value (USD Bn)',
               color='#3B82F6', alpha=0.8, edgecolor='white', linewidth=0.5)
bars2 = ax.bar(x + width/2, projected, width, label='Projected Value (USD Bn)',
               color='#10B981', alpha=0.8, edgecolor='white', linewidth=0.5)

for i, (c, p, ca) in enumerate(zip(current, projected, cagr)):
    ax.text(i, max(c, p) + 0.5, f'CAGR {ca}%',
            ha='center', va='bottom', fontsize=9, color='#EF4444', fontweight='bold')

ax.set_xticks(x)
ax.set_xticklabels(sectors, fontsize=10, color='#1F2937')
ax.set_ylabel('Market Value (USD Billion)', fontsize=13, fontweight='bold', color='#1F2937')
ax.set_title('Textile Sector Market Growth Projections', fontsize=15, fontweight='bold', color='#111827', pad=12)
ax.legend(loc='upper left', fontsize=10.5, framealpha=0.9, edgecolor='#D1D5DB')
ax.tick_params(axis='y', labelsize=10, colors='#4B5563')
ax.set_ylim(0, 22)

plt.tight_layout()
plt.savefig(f'{SAVE_DIR}/05_market_growth_projections.png', bbox_inches='tight', facecolor='#FFFFFF')
plt.close()
print("Chart 5 saved: Market Growth Projections")

# ============================================
# CHART 6: Top Research Universities Global Ranking
# ============================================
fig, ax = plt.subplots(figsize=(13, 7.5))
fig.patch.set_facecolor('#FFFFFF')
ax.set_facecolor('#F8FAFC')

universities = [
    'Donghua Univ. (China)', 'Jiangnan Univ. (China)', 'Wuhan Textile Univ. (China)',
    'Seoul Natl. Univ. (S. Korea)', 'HK PolyU (Hong Kong)', 'Tiangong Univ. (China)',
    'Qingdao Univ. (China)', 'Zhejiang Sci-Tech (China)', 'Nat. Textile Univ. (Pakistan)',
    'King Abdulaziz Univ. (Saudi)', 'NC State Univ. (USA)', 'Univ. of Manchester (UK)',
    'Univ. of Minho (Portugal)', 'TU Dresden (Germany)', 'Deakin Univ. (Australia)'
]
global_rank = [1, 2, 3, 5, 5, 6, 7, 8, 13, 10, 17, 19, 21, 25, 30]

country_colors = {
    'China': '#EF4444', 'S. Korea': '#3B82F6', 'Hong Kong': '#8B5CF6',
    'Pakistan': '#10B981', 'Saudi': '#F59E0B', 'USA': '#06B6D4',
    'UK': '#EC4899', 'Portugal': '#14B8A6', 'Germany': '#6366F1', 'Australia': '#F97316'
}
bar_colors = []
for u in universities:
    for country, color in country_colors.items():
        if country in u:
            bar_colors.append(color)
            break

bars = ax.barh(range(len(universities)), [31-r for r in global_rank], color=bar_colors, alpha=0.8,
               edgecolor='white', linewidth=0.5, height=0.7)

ax.set_yticks(range(len(universities)))
ax.set_yticklabels(universities, fontsize=10, color='#1F2937')
ax.set_xlabel('Ranking Score (Higher = Better)', fontsize=13, fontweight='bold', color='#1F2937')
ax.set_title('Top 15 Textile Research Universities — Global Ranking 2024', fontsize=15, fontweight='bold', color='#111827', pad=12)
ax.invert_yaxis()
ax.tick_params(axis='x', labelsize=10, colors='#4B5563')

handles = [mpatches.Patch(color=c, alpha=0.8, label=co) for co, c in country_colors.items()]
ax.legend(handles=handles, loc='lower right', fontsize=9, framealpha=0.9,
          edgecolor='#D1D5DB', ncol=2)

plt.tight_layout()
plt.savefig(f'{SAVE_DIR}/06_top_universities_ranking.png', bbox_inches='tight', facecolor='#FFFFFF')
plt.close()
print("Chart 6 saved: Top Universities Ranking")

print("\n=== ALL 6 CHARTS GENERATED SUCCESSFULLY ===")
