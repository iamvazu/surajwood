import os
import shutil

# Paths
old_site_dir = r"c:\Users\dell\Desktop\surajwood\surajwoodoldsite"
public_dir = r"c:\Users\dell\Desktop\surajwood\surajwood-frontend\public\images\gallery"

# 1. Kitchen
kitchen_src = os.path.join(old_site_dir, "img", "products", "kitchen", "kitchen.jpg")
kitchen_dest = os.path.join(public_dir, "kitchen-1.jpg")

if os.path.exists(kitchen_src):
    shutil.copy(kitchen_src, kitchen_dest)
    print("Copied Kitchen main image.")

# 2. Wardrobe
wardrobe_src = os.path.join(old_site_dir, "img", "products", "wardrobe", "wardrobe.jpg")
wardrobe_dest = os.path.join(public_dir, "wardrobe-1.jpg")

if os.path.exists(wardrobe_src):
    shutil.copy(wardrobe_src, wardrobe_dest)
    print("Copied Wardrobe main image.")

# 3. Commercial (Use living-room for now)
commercial_src = os.path.join(old_site_dir, "img", "products", "living-room", "living-room.jpg")
commercial_dest = os.path.join(public_dir, "commercial-1.jpg")

if os.path.exists(commercial_src):
    shutil.copy(commercial_src, commercial_dest)
    print("Copied Commercial main image.")

# For grid Items (2, 3, 4), find other large images or copy the same one to avoid blanks
shutil.copy(kitchen_src, os.path.join(public_dir, "kitchen-2.jpg"))
shutil.copy(kitchen_src, os.path.join(public_dir, "kitchen-3.jpg"))
shutil.copy(kitchen_src, os.path.join(public_dir, "kitchen-4.jpg"))

shutil.copy(wardrobe_src, os.path.join(public_dir, "wardrobe-2.jpg"))
shutil.copy(wardrobe_src, os.path.join(public_dir, "wardrobe-3.jpg"))
shutil.copy(wardrobe_src, os.path.join(public_dir, "wardrobe-4.jpg"))

if os.path.exists(commercial_src):
    shutil.copy(commercial_src, os.path.join(public_dir, "commercial-2.jpg"))
    shutil.copy(commercial_src, os.path.join(public_dir, "commercial-3.jpg"))
    shutil.copy(commercial_src, os.path.join(public_dir, "commercial-4.jpg"))

print("Grid placeholders duplicated with real images.")

# 4. Now update ApplicationShowcase.tsx to point to these copied nodes
app_showcase_path = r"c:\Users\dell\Desktop\surajwood\surajwood-frontend\components\sections\ApplicationShowcase.tsx"

with open(app_showcase_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Update images arrays statically
kitchen_replace = '''    images: [
      "/images/gallery/kitchen-1.jpg",
      "/images/gallery/kitchen-2.jpg",
      "/images/gallery/kitchen-3.jpg",
      "/images/gallery/kitchen-4.jpg",
    ],'''
content = content.replace('''    images: [
      "/images/gallery/1.jpg",
      "/images/gallery/2.jpg",
      "/images/gallery/3.jpg",
      "/images/gallery/4.jpg",
    ],''', kitchen_replace)

wardrobe_replace = '''    images: [
      "/images/gallery/wardrobe-1.jpg",
      "/images/gallery/wardrobe-2.jpg",
      "/images/gallery/wardrobe-3.jpg",
      "/images/gallery/wardrobe-4.jpg",
    ],'''
content = content.replace('''    images: [
      "/images/gallery/5.jpg",
      "/images/gallery/6.jpg",
      "/images/gallery/7.jpg",
      "/images/gallery/8.jpg",
    ],''', wardrobe_replace)

commercial_replace = '''    images: [
      "/images/gallery/commercial-1.jpg",
      "/images/gallery/commercial-2.jpg",
      "/images/gallery/commercial-3.jpg",
      "/images/gallery/commercial-4.jpg",
    ],'''
content = content.replace('''    images: [
      "/images/gallery/9.jpg",
      "/images/gallery/10.jpg",
      "/images/gallery/11.jpg",
      "/images/gallery/12.jpg",
    ],''', commercial_replace)

with open(app_showcase_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated ApplicationShowcase.tsx paths.")
