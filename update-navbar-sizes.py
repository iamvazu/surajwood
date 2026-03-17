import os

filepath = r"c:\Users\dell\Desktop\surajwood\surajwood-frontend\components\layout\Navbar.tsx"

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update Black Top Bar height and text
# Beforewards: className="hidden md:flex items-center justify-between px-6 lg:px-12 py-1.5 text-xs bg-[#1F1F1F] text-white"
content = content.replace('py-1.5 text-xs bg-[#1F1F1F] text-white', 'py-3 text-sm bg-[#1F1F1F] text-white')

# 2. Update Icons in Top Bar from size={12} to size={15} for visibility
# Find social icons top bar part which we just placed
import re

# Replace standard Phone/Mail sizes inside the top bar child section
content = content.replace('<Phone size={12} />', '<Phone size={15} />')
content = content.replace('<Facebook size={12} />', '<Facebook size={15} />')
content = content.replace('<Instagram size={12} />', '<Instagram size={15} />')
content = content.replace('<Linkedin size={12} />', '<Linkedin size={15} />')
content = content.replace('<Youtube size={12} />', '<Youtube size={15} />')

# Replace SVG size for X
content = content.replace('width="10"\n              height="10"', 'width="13"\n              height="13"')

# 3. Update Main Header Menu Text from text-sm to text-base
# Locate the desktop sub-items links
# Find links using `text-sm font-medium` inside the Desktop navigation layout
link_pattern = r'rounded-md text-sm font-medium transition-colors'
content = re.sub(link_pattern, 'rounded-md text-base font-medium transition-colors', content)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print("Navbar: Top bar and Main Menu sizes increased.")
