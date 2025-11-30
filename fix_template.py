
import os

file_path = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\templates\bazi_unified.html'

if os.path.exists(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Find the first occurrence of {% endblock %} that closes the content block
    # Based on the structure, it should be the one before the second <!DOCTYPE html> or <meta> tags appear
    
    # Let's look for the split point
    split_marker = "{% endblock %}"
    parts = content.split(split_marker)
    
    if len(parts) > 1:
        # The valid part is likely everything up to the end of the content block
        # But we need to be careful. The file has multiple blocks.
        # Let's assume the file is corrupted by appending a new file to the end.
        
        # We'll search for the second <!DOCTYPE html> which indicates the start of the appended file
        duplicate_start = content.find('<!DOCTYPE html>', 20) # Skip the first one
        
        if duplicate_start != -1:
            print(f"Found duplicate content starting at index {duplicate_start}")
            fixed_content = content[:duplicate_start].strip()
            
            # Write back
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(fixed_content)
            print("Fixed bazi_unified.html by removing appended content.")
        else:
            print("Could not find duplicate <!DOCTYPE html> tag. Manual inspection needed.")
            
    else:
        print("File structure seems different than expected.")

else:
    print(f"File not found: {file_path}")
