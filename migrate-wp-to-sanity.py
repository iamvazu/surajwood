import os

workspace_root = r"c:\Users\dell\Desktop\surajwood\surajwood-frontend"
search_dirs = [
    os.path.join(workspace_root, "app"), 
    os.path.join(workspace_root, "components"),
    os.path.join(workspace_root, "lib")   # Added lib/
]

replacements = {
    "@/lib/wordpress": "@/lib/sanity",
    "@/types/wordpress": "@/types/sanity",
    "WPProduct": "SanityProduct",
    "WPApplication": "SanityApplication",
    "WPTestimonial": "SanityTestimonial",
    "WPFAQ": "SanityFAQ",
    "WPPost": "SanityPost",
    "WPMedia": "SanityImage",
    "WPHomepageData": "HomepageData"
}

def migrate_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except UnicodeDecodeError:
        with open(file_path, 'r', encoding='latin-1') as f:
            content = f.read()
            
    modified = False
    new_content = content
    for old_text, new_text in replacements.items():
        if old_text in new_content:
            new_content = new_content.replace(old_text, new_text)
            modified = True
            
    if modified:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Migrated: {file_path}")

for directory in search_dirs:
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(('.ts', '.tsx')):
                file_path = os.path.join(root, file)
                migrate_file(file_path)

print("Python Migration Complete!")
