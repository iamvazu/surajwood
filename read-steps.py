import os

filepath = r"c:\Users\dell\Desktop\surajwood\SurajWood_Claude_Code_Walkthrough_v2.md"

steps = []
with open(filepath, 'r', encoding='utf-8') as f:
    for line in f:
        if line.startswith("### Step") or line.startswith("## PHASE"):
            steps.append(line.strip())

print("\n".join(steps))
