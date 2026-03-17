import os
import shutil

old_site_dir = r"c:\Users\dell\Desktop\surajwood\surajwoodoldsite"
public_dir = r"c:\Users\dell\Desktop\surajwood\surajwood-frontend\public\images\gallery"

def copy_distinct_images(category_name, source_subfolder, main_file_name_search):
    src_folder = os.path.join(old_site_dir, "img", "products", source_subfolder)
    
    if not os.path.exists(src_folder):
        print(f"Directory missing: {src_folder}")
        return

    # Find main image
    all_files = os.listdir(src_folder)
    main_image = None
    for f in all_files:
        if main_file_name_search in f and f.endswith(".jpg"):
            main_image = f
            break

    if not main_image:
        print(f"Could not find main image for {category_name}")
        return

    shutil.copy(os.path.join(src_folder, main_image), os.path.join(public_dir, f"{category_name}-1.jpg"))
    print(f"Copied {category_name}-1.jpg")

    # Find support images (indices 2, 3, 4) from remaining files
    found_count = 1
    for f in all_files:
        if f != main_image and (f.endswith(".jpg") or f.endswith(".png")) and not f.startswith("."):
            found_count += 1
            shutil.copy(os.path.join(src_folder, f), os.path.join(public_dir, f"{category_name}-{found_count}.jpg"))
            print(f"Copied {category_name}-{found_count}.jpg ({f})")
            if found_count == 4:
                break

    # If count is still under 4, duplicate from first
    while found_count < 4:
        found_count += 1
        shutil.copy(os.path.join(public_dir, f"{category_name}-1.jpg"), os.path.join(public_dir, f"{category_name}-{found_count}.jpg"))
        print(f"Duplicated {category_name}-{found_count}.jpg from primary")

# Run distinct discovery copies
copy_distinct_images("kitchen", "kitchen", "kitchen")
copy_distinct_images("wardrobe", "wardrobe", "wardrobe")
copy_distinct_images("commercial", "living-room", "living-room")

print("Distinct Images Copy Complete!")
