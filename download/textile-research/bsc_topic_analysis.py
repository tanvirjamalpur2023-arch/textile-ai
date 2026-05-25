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

SAVE_DIR = '/home/z/my-project/download/textile-research'

# ============================================
# CHART 7: BSc Topic Feasibility vs Impact Matrix
# ============================================
fig, ax = plt.subplots(figsize=(14, 9))
fig.patch.set_facecolor('#FFFFFF')
ax.set_facecolor('#F8FAFC')

topics = [
    '1. Sustainable\nDyeing\n(Salt-Free)',
    '2. AI/ML in\nDyeing',
    '3. Wastewater\nTreatment',
    '4. Natural Dyes\n& Bio-Chemicals',
    '5. Digitalization\n& Industry 4.0',
    '6. Enzymatic\nProcessing',
    '7. Functional\nFinishing',
    '8. Plasma &\nNanotechnology',
    '9. Low Liquor\nRatio Dyeing',
    '10. Circular\nRecycling'
]

# BSc feasibility score (1-10) - how easy for a BSc student
feasibility = [8.5, 7.0, 7.5, 9.0, 5.5, 8.0, 7.5, 5.0, 8.5, 4.5]
# Research impact / novelty (1-10)
impact = [8.0, 8.5, 6.5, 7.5, 7.0, 7.0, 7.5, 8.0, 8.5, 7.5]
# Publication gap (bubble size) - bigger = more gap = more opportunity
pub_gap = [350, 280, 250, 400, 200, 300, 350, 250, 500, 450]

# Color by recommendation tier
colors = []
for f, imp in zip(feasibility, impact):
    score = f * 0.4 + imp * 0.6  # Weighted score
    if score >= 8.0 and f >= 7.5:
        colors.append('#10B981')  # Green - TOP TIER
    elif score >= 7.0 and f >= 6.5:
        colors.append('#3B82F6')  # Blue - GOOD
    elif f >= 7.0:
        colors.append('#F59E0B')  # Amber - FEASIBLE but lower impact
    else:
        colors.append('#94A3B8')  # Gray - CHALLENGING

scatter = ax.scatter(feasibility, impact, s=pub_gap, c=colors, alpha=0.7,
                     edgecolors='white', linewidth=2, zorder=5)

# Labels
for i, topic in enumerate(topics):
    offset_y = -22 if i % 2 == 0 else 18
    ax.annotate(topic, (feasibility[i], impact[i]),
                textcoords="offset points", xytext=(0, offset_y),
                ha='center', fontsize=8.5, color='#1F2937', fontweight='bold')

# Quadrant lines
ax.axhline(y=7.5, color='#94A3B8', linestyle='--', alpha=0.4, linewidth=1)
ax.axvline(x=7.5, color='#94A3B8', linestyle='--', alpha=0.4, linewidth=1)

# Quadrant labels
ax.text(8.5, 9.0, 'BEST FOR BSc\nHigh Impact + Feasible', fontsize=11,
        color='#10B981', fontweight='bold', ha='center', alpha=0.9,
        bbox=dict(boxstyle='round,pad=0.3', facecolor='#D1FAE5', alpha=0.5, edgecolor='#10B981'))
ax.text(5.5, 9.0, 'ADVANCED\nHigh Impact but Hard', fontsize=10,
        color='#3B82F6', fontweight='bold', ha='center', alpha=0.8)
ax.text(8.5, 6.2, 'EASY BUT COMMON\nFeasible but Saturated', fontsize=10,
        color='#F59E0B', fontweight='bold', ha='center', alpha=0.8)
ax.text(5.5, 6.2, 'AVOID\nHard + Low Impact', fontsize=10,
        color='#94A3B8', fontweight='bold', ha='center', alpha=0.8)

ax.set_xlabel('BSc Feasibility Score (Lab Access, Cost, Time)', fontsize=13, fontweight='bold', color='#1F2937')
ax.set_ylabel('Research Impact & Novelty Score', fontsize=13, fontweight='bold', color='#1F2937')
ax.set_title('BSc Research Topic Selection Matrix — Textile Engineering\n(Bubble Size = Publication Gap / Opportunity)', fontsize=15, fontweight='bold', color='#111827', pad=12)
ax.set_xlim(3.5, 10)
ax.set_ylim(5.5, 9.5)
ax.tick_params(axis='both', labelsize=10, colors='#4B5563')

plt.tight_layout()
plt.savefig(f'{SAVE_DIR}/07_bsc_topic_selection_matrix.png', bbox_inches='tight', facecolor='#FFFFFF')
plt.close()
print("Chart 7 saved: BSc Topic Selection Matrix")

# ============================================
# CHART 8: Detailed Comparison Radar Chart - Top 3 Topics
# ============================================
fig, axes = plt.subplots(1, 3, figsize=(18, 7), subplot_kw=dict(polar=True))
fig.patch.set_facecolor('#FFFFFF')

categories = ['BSc\nFeasibility', 'Research\nNovelty', 'Publication\nGap', 'Industry\nDemand', 'Cost\nEfficiency', 'Time to\nPublish', 'Future\nScope']
N = len(categories)
angles = [n / float(N) * 2 * np.pi for n in range(N)]
angles += angles[:1]

# Top 3 topics data
topic_data = {
    'Topic 9: Low Liquor Ratio\nDyeing + Natural Dyes': {
        'values': [9.0, 9.0, 9.5, 8.5, 9.0, 8.0, 8.5],
        'color': '#10B981',
        'fill_alpha': 0.25
    },
    'Topic 4: Natural Dyes\n& Bio-Mordants': {
        'values': [9.5, 7.5, 7.0, 8.0, 9.5, 9.0, 8.0],
        'color': '#3B82F6',
        'fill_alpha': 0.25
    },
    'Topic 1: Salt-Free\nDyeing': {
        'values': [8.5, 8.0, 7.5, 9.0, 7.5, 7.5, 8.5],
        'color': '#8B5CF6',
        'fill_alpha': 0.25
    }
}

for idx, (topic_name, data) in enumerate(topic_data.items()):
    ax = axes[idx]
    values = data['values'] + data['values'][:1]
    
    ax.plot(angles, values, 'o-', linewidth=2.5, color=data['color'], markersize=6)
    ax.fill(angles, values, alpha=data['fill_alpha'], color=data['color'])
    
    ax.set_xticks(angles[:-1])
    ax.set_xticklabels(categories, fontsize=8.5, color='#1F2937')
    ax.set_ylim(0, 10)
    ax.set_yticks([2, 4, 6, 8, 10])
    ax.set_yticklabels(['2', '4', '6', '8', '10'], fontsize=7, color='#94A3B8')
    ax.set_title(topic_name, fontsize=11, fontweight='bold', color=data['color'], pad=20)
    ax.grid(True, alpha=0.3)
    ax.set_facecolor('#F8FAFC')

fig.suptitle('Top 3 Recommended BSc Topics — Detailed Comparison', fontsize=15, fontweight='bold', color='#111827', y=1.02)
plt.tight_layout()
plt.savefig(f'{SAVE_DIR}/08_top3_radar_comparison.png', bbox_inches='tight', facecolor='#FFFFFF')
plt.close()
print("Chart 8 saved: Top 3 Radar Comparison")

# ============================================
# CHART 9: Topic 9 Experimental Roadmap Timeline
# ============================================
fig, ax = plt.subplots(figsize=(16, 8))
fig.patch.set_facecolor('#FFFFFF')
ax.set_facecolor('#FFFFFF')

# Timeline phases
phases = [
    {'name': 'Phase 1:\nLiterature Review\n& Planning', 'start': 0, 'duration': 2, 'color': '#3B82F6', 'alpha': 0.8},
    {'name': 'Phase 2:\nCationization\nExperiments', 'start': 2, 'duration': 3, 'color': '#10B981', 'alpha': 0.8},
    {'name': 'Phase 3:\nSalt-Free Dyeing\nat Low LR', 'start': 5, 'duration': 3, 'color': '#8B5CF6', 'alpha': 0.8},
    {'name': 'Phase 4:\nTesting &\nCharacterization', 'start': 8, 'duration': 2, 'color': '#F59E0B', 'alpha': 0.8},
    {'name': 'Phase 5:\nPaper Writing\n& Submission', 'start': 10, 'duration': 3, 'color': '#EF4444', 'alpha': 0.8},
]

for i, phase in enumerate(phases):
    bar = ax.barh(0, phase['duration'], left=phase['start'], height=0.6,
                  color=phase['color'], alpha=phase['alpha'], edgecolor='white', linewidth=2)
    # Phase label
    mid = phase['start'] + phase['duration'] / 2
    ax.text(mid, 0, phase['name'], ha='center', va='center',
            fontsize=9, fontweight='bold', color='white')

# Milestones
milestones = [
    (1, 0.5, 'Topic\nFinalized', '#3B82F6'),
    (4, 0.5, 'Cationization\nOptimized', '#10B981'),
    (7, 0.5, 'Dyeing\nComplete', '#8B5CF6'),
    (9, 0.5, 'Data\nAnalyzed', '#F59E0B'),
    (12, 0.5, 'Paper\nSubmitted', '#EF4444'),
]

for x, y, label, color in milestones:
    ax.plot(x, y, 'D', markersize=14, color=color, zorder=5)
    ax.text(x, y + 0.35, label, ha='center', va='bottom',
            fontsize=8.5, fontweight='bold', color=color)

# Week labels
for w in range(13):
    ax.axvline(x=w, color='#E5E7EB', linestyle='-', alpha=0.3, linewidth=0.5)
    ax.text(w, -0.55, f'W{w+1}', ha='center', fontsize=8, color='#6B7280')

ax.set_xlim(-0.5, 13)
ax.set_ylim(-0.8, 1.2)
ax.set_xlabel('Weeks', fontsize=13, fontweight='bold', color='#1F2937')
ax.set_title('BSc Research Timeline — 13-Week Publication Roadmap\nTopic: Low Liquor Ratio Salt-Free Dyeing with Bio-Mordants on Cotton', 
             fontsize=14, fontweight='bold', color='#111827', pad=12)
ax.set_yticks([])
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.spines['left'].set_visible(False)

plt.tight_layout()
plt.savefig(f'{SAVE_DIR}/09_research_timeline_roadmap.png', bbox_inches='tight', facecolor='#FFFFFF')
plt.close()
print("Chart 9 saved: Research Timeline Roadmap")

print("\n=== ALL 3 BSc ANALYSIS CHARTS GENERATED ===")
