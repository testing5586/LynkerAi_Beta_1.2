
import os

file_path = r'c:\Users\kingkongOL\VSCODE_LynkerAiBeta\LynkerAi_Beta_1.2\lynker_bazi_engine\templates\bazi_unified.html'

if os.path.exists(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # The garbage content starts with <meta charset="UTF-8">
    # We look for it.
    marker = '<meta charset="UTF-8">'
    idx = content.find(marker)
    
    if idx != -1:
        print(f"Found garbage marker at index {idx}")
        # The content before this marker is what we want, but we need to be careful about where exactly to cut.
        # The inspect output showed:
        # {% endblock %}
        # 
        #     <meta charset="UTF-8">
        
        # So we take everything up to idx, then rstrip() to remove the <meta tag and the whitespace before it.
        # Actually, if we just take content[:idx], it includes the whitespace before <meta.
        # We want to keep the {% endblock %} and remove everything after.
        
        valid_part = content[:idx]
        
        # Find the last {% endblock %} in the valid part
        last_block_end = valid_part.rfind('{% endblock %}')
        
        if last_block_end != -1:
            # Cut right after {% endblock %}
            final_content = valid_part[:last_block_end + len('{% endblock %}')]
            
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(final_content)
            print("Successfully truncated bazi_unified.html to remove duplicate content.")
        else:
            print("Could not find {% endblock %} in the part before <meta>.")
    else:
        print("Could not find <meta charset=\"UTF-8\"> marker. File might be already fixed or different structure.")
else:
    print(f"File not found: {file_path}")
