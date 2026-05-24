import matplotlib
matplotlib.use('Agg')
import matplotlib.font_manager as fm
fm.fontManager.addfont('/usr/share/fonts/truetype/chinese/SarasaMonoSC-Regular.ttf')
import matplotlib.pyplot as plt
import numpy as np
plt.rcParams['font.sans-serif'] = ['Sarasa Mono SC', 'DejaVu Sans']
plt.rcParams['axes.unicode_minus'] = False
plt.rcParams['figure.dpi'] = 200
plt.rcParams['savefig.dpi'] = 200
plt.rcParams['figure.facecolor'] = '#FFFFFF'
plt.rcParams['axes.facecolor'] = '#F8FAFC'
S = '/home/z/my-project/download/textile-research'

# CHART 7: BSc Topic Selection Matrix
fig, ax = plt.subplots(figsize=(14, 9))
topics = ['1.Sustainable\nDyeing(Salt-Free)', '2.AI/ML\nin Dyeing', '3.Wastewater\nTreatment', '4.Natural Dyes\n& Bio-Chem', '5.Digitalization\n& Ind.4.0', '6.Enzymatic\nProcessing', '7.Functional\nFinishing', '8.Plasma &\nNanotech', '9.Low Liquor\nRatio Dyeing', '10.Circular\nRecycling']
feasibility = [8.5, 7.0, 7.5, 9.0, 5.5, 8.0, 7.5, 5.0, 8.5, 4.5]
impact = [8.0, 8.5, 6.5, 7.5, 7.0, 7.0, 7.5, 8.0, 8.5, 7.5]
pub_gap = [350, 280, 250, 400, 200, 300, 350, 250, 500, 450]
colors = []
for f, imp in zip(feasibility, impact):
    s = f*0.4 + imp*0.6
    if s >= 8.0 and f >= 7.5: colors.append('#10B981')
    elif s >= 7.0 and f >= 6.5: colors.append('#3B82F6')
    elif f >= 7.0: colors.append('#F59E0B')
    else: colors.append('#94A3B8')
ax.scatter(feasibility, impact, s=pub_gap, c=colors, alpha=0.7, edgecolors='white', linewidth=2, zorder=5)
for i, t in enumerate(topics):
    oy = -20 if i%2==0 else 16
    ax.annotate(t, (feasibility[i], impact[i]), textcoords="offset points", xytext=(0, oy), ha='center', fontsize=8.5, color='#1F2937', fontweight='bold')
ax.axhline(y=7.5, color='#94A3B8', linestyle='--', alpha=0.4)
ax.axvline(x=7.5, color='#94A3B8', linestyle='--', alpha=0.4)
ax.text(8.5, 9.0, 'BEST FOR BSc\nHigh Impact + Feasible', fontsize=11, color='#10B981', fontweight='bold', ha='center')
ax.text(5.5, 9.0, 'ADVANCED\nHigh Impact but Hard', fontsize=10, color='#3B82F6', fontweight='bold', ha='center')
ax.set_xlabel('BSc Feasibility Score', fontsize=13, fontweight='bold', color='#1F2937')
ax.set_ylabel('Research Impact & Novelty', fontsize=13, fontweight='bold', color='#1F2937')
ax.set_title('BSc Research Topic Selection Matrix\n(Bubble Size = Publication Gap)', fontsize=15, fontweight='bold', color='#111827', pad=12)
ax.set_xlim(3.5, 10); ax.set_ylim(5.5, 9.5)
plt.tight_layout()
plt.savefig(f'{S}/07_bsc_topic_selection_matrix.png', bbox_inches='tight', facecolor='#FFFFFF')
plt.close()
print("Chart 7 done")

# CHART 8: Radar comparison top 3
fig, axes = plt.subplots(1, 3, figsize=(18, 7), subplot_kw=dict(polar=True))
cats = ['BSc\nFeasibility','Research\nNovelty','Publication\nGap','Industry\nDemand','Cost\nEfficiency','Time to\nPublish','Future\nScope']
N = len(cats)
angles = [n/float(N)*2*np.pi for n in range(N)] + [0]
topic_data = [
    ('Topic 9: Low Liquor Ratio\n+ Salt-Free Dyeing', [9.0,9.0,9.5,8.5,9.0,8.0,8.5], '#10B981'),
    ('Topic 4: Natural Dyes\n& Bio-Mordants', [9.5,7.5,7.0,8.0,9.5,9.0,8.0], '#3B82F6'),
    ('Topic 1: Salt-Free\nCationization', [8.5,8.0,7.5,9.0,7.5,7.5,8.5], '#8B5CF6'),
]
for idx, (name, vals, col) in enumerate(topic_data):
    ax = axes[idx]
    v = vals + vals[:1]
    ax.plot(angles, v, 'o-', linewidth=2.5, color=col, markersize=6)
    ax.fill(angles, v, alpha=0.25, color=col)
    ax.set_xticks(angles[:-1])
    ax.set_xticklabels(cats, fontsize=8, color='#1F2937')
    ax.set_ylim(0, 10)
    ax.set_title(name, fontsize=11, fontweight='bold', color=col, pad=20)
    ax.grid(True, alpha=0.3)
fig.suptitle('Top 3 BSc Topics - Detailed Comparison', fontsize=15, fontweight='bold', color='#111827', y=1.02)
plt.tight_layout()
plt.savefig(f'{S}/08_top3_radar_comparison.png', bbox_inches='tight', facecolor='#FFFFFF')
plt.close()
print("Chart 8 done")

# CHART 9: Research Timeline
fig, ax = plt.subplots(figsize=(16, 8))
phases = [
    ('Phase 1:\nLit Review &\nPlanning', 0, 2, '#3B82F6'),
    ('Phase 2:\nCationization\nExperiments', 2, 3, '#10B981'),
    ('Phase 3:\nSalt-Free Dyeing\nat Low LR', 5, 3, '#8B5CF6'),
    ('Phase 4:\nTesting &\nCharacterization', 8, 2, '#F59E0B'),
    ('Phase 5:\nPaper Writing\n& Submission', 10, 3, '#EF4444'),
]
for name, start, dur, col in phases:
    ax.barh(0, dur, left=start, height=0.6, color=col, alpha=0.8, edgecolor='white', linewidth=2)
    ax.text(start+dur/2, 0, name, ha='center', va='center', fontsize=9, fontweight='bold', color='white')
milestones = [(1,'Topic\nFinalized','#3B82F6'),(4,'Cationization\nOptimized','#10B981'),(7,'Dyeing\nComplete','#8B5CF6'),(9,'Data\nAnalyzed','#F59E0B'),(12,'Paper\nSubmitted','#EF4444')]
for x, label, col in milestones:
    ax.plot(x, 0.5, 'D', markersize=14, color=col, zorder=5)
    ax.text(x, 0.85, label, ha='center', va='bottom', fontsize=8.5, fontweight='bold', color=col)
for w in range(13):
    ax.axvline(x=w, color='#E5E7EB', linestyle='-', alpha=0.3, linewidth=0.5)
    ax.text(w, -0.5, f'W{w+1}', ha='center', fontsize=8, color='#6B7280')
ax.set_xlim(-0.5, 13); ax.set_ylim(-0.8, 1.3)
ax.set_xlabel('Weeks', fontsize=13, fontweight='bold', color='#1F2937')
ax.set_title('13-Week Research Timeline\nTopic: Low Liquor Ratio Salt-Free Dyeing with Bio-Mordants', fontsize=14, fontweight='bold', color='#111827', pad=12)
ax.set_yticks([])
ax.spines['top'].set_visible(False); ax.spines['right'].set_visible(False); ax.spines['left'].set_visible(False)
plt.tight_layout()
plt.savefig(f'{S}/09_research_timeline_roadmap.png', bbox_inches='tight', facecolor='#FFFFFF')
plt.close()
print("Chart 9 done")
print("ALL CHARTS DONE!")
