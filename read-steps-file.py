import os

filepath = r"c:\Users\dell\Desktop\surajwood\SurajWood_Claude_Code_Walkthrough_v2.md"

output_path = r"c:\Users\dell\Desktop\surajwood\steps_list.txt"

with open(filepath, 'r', encoding='utf-8') as f:
    lines = [line.strip() for line in f if line.startswith("### Step") or line.startswith("## PHASE")]

with open(output_path, 'w', encoding='utf-8') as f:
    f.write("\n".join(lines))

print("Wrote steps list.")
