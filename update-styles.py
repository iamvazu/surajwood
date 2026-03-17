import os

workspace_root = r"c:\Users\dell\Desktop\surajwood\surajwood-frontend"

def update_navbar():
    navbar_path = os.path.join(workspace_root, "components", "layout", "Navbar.tsx")
    with open(navbar_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Remove the text fallback logo
    # Find the <span aria-hidden="true"> block
    target = '''            {/* Text fallback shown alongside in case image fails */}
            <span
              className={`text-xl font-bold tracking-tight font-[family-name:var(--font-inter)] transition-colors duration-300 ${
                scrolled ? "text-[#1B2A4A]" : "text-white"
              }`}
              aria-hidden="true"
            >
              Suraj<span className="text-[#B87333]">Wood</span>
            </span>'''
    
    if target in content:
        content = content.replace(target, "")
        print("Navbar: Removed text fallback logo with exact string match.")
    else:
        # Try variation with less space on lines
        import re
        pattern = r'{\s*/\*\s*Text fallback shown alongside in case image fails\s*\*/\s*}\s*<span\s+className={`text-xl[^`]+`}\s*aria-hidden="true"\s*>\s*Suraj<span\s+className="text-\[#B87333\]"\s*>\s*Wood\s*<\/span>\s*<\/span>'
        new_content = re.sub(pattern, '', content)
        if new_content != content:
            content = new_content
            print("Navbar: Removed text fallback logo with regex.")
        else:
            print("Navbar: Text fallback logo match failed!")

    # 1.1 Also update the mobile view header "SurajWood" text
    content = content.replace('Suraj<span className="text-[#B87333]">Wood</span>', 'SurajWood')

    # 2. Update hardcoded colors in Navbar to RED
    content = content.replace("#B87333", "#DC2626")  # Copper to Red
    content = content.replace("#1B2A4A", "#1F1F1F")  # Navy to Dark Gray
    content = content.replace("#a06529", "#B91C1C")  # Darker Copper to Darker Red

    with open(navbar_path, 'w', encoding='utf-8') as f:
        f.write(content)

def update_hero():
    hero_path = os.path.join(workspace_root, "components", "sections", "Hero.tsx")
    with open(hero_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Remove overlay with exact string replace (less risky than regex)
    overlay_block = '''      {/* Gradient overlay: navy 80% → transparent */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(27,42,74,0.85) 40%, rgba(27,42,74,0.45) 100%)",
        }}
      />'''
      
    if overlay_block in content:
        content = content.replace(overlay_block, "")
        print("Hero: Removed gradient overlay with exact string.")
    else:
        # Fallback to general replace on the linear-gradient part
        import re
        pattern = r'<div\s+className="absolute inset-0 z-10"\s+style={{\s*background:\s*"linear-gradient\([^)]+\)",\s*}}\s*\/>'
        new_content = re.sub(pattern, '', content)
        if new_content != content:
            content = new_content
            # Remove the comment too if it's there
            content = content.replace('{/* Gradient overlay: navy 80% → transparent */}', '')
            print("Hero: Removed gradient overlay with regex.")
        else:
            print("Hero: Overlay match failed!")

    # 2. Add text shadow for readability since overlay is gone
    content = content.replace('className="font-heading font-bold text-4xl md:text-6xl text-white leading-tight"', 'className="font-heading font-bold text-4xl md:text-6xl text-white leading-tight drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)]"')
    content = content.replace('className="text-xl text-white/80 max-w-2xl leading-relaxed"', 'className="text-xl text-white max-w-2xl leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"')
    content = content.replace('className="text-white/70 text-sm mt-0.5"', 'className="text-white text-sm mt-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"')

    with open(hero_path, 'w', encoding='utf-8') as f:
        f.write(content)

def update_config():
    config_path = os.path.join(workspace_root, "tailwind.config.ts")
    with open(config_path, 'r', encoding='utf-8') as f:
        content = f.read()

    content = content.replace('"#1B2A4A"', '"#1F1F1F"')
    content = content.replace('"#2C3E6B"', '"#374151"')
    content = content.replace('"#0F1A30"', '"#111827"')

    content = content.replace('"#B87333"', '"#DC2626"')
    content = content.replace('"#C8A96E"', '"#EF4444"')
    content = content.replace('"#8B5522"', '"#991B1B"')

    with open(config_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated tailwind.config.ts.")

def update_globals_css():
    css_path = os.path.join(workspace_root, "app", "globals.css")
    with open(css_path, 'r', encoding='utf-8') as f:
        content = f.read()

    content = content.replace("#1B2A4A", "#1F1F1F")
    content = content.replace("#B87333", "#DC2626")

    with open(css_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("Updated globals.css.")

# Run
update_navbar()
update_hero()
update_config()
update_globals_css()

print("Brand Update Complete!")
