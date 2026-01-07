import os
import glob
import re

directory = "static/templates/uxbot"
files = glob.glob(os.path.join(directory, "*.html"))

target_script = """
<script>
document.addEventListener("click", function (e) {
  const link = e.target.closest("a");
  if (!link) return;

  const href = link.getAttribute("href");
  if (!href) return;

  // Check if it's a link to an HTML page
  if (href.endsWith(".html") || href.includes(".html")) {
    // Stop other listeners (UXBot interceptors)
    e.stopImmediatePropagation();
    e.preventDefault();
    
    // Force navigation
    window.location.href = href;
  }
}, true); // Capture phase
</script>
"""

new_script = """
<script>
document.addEventListener("click", function (e) {
  const link = e.target.closest("a");
  if (!link) return;

  let href = link.getAttribute("href");
  if (!href) return;

  // FIX: Redirect legacy knowledge base links to the new one
  if (href.includes("knowledge-base-main.html") || href.endsWith("knowledge-base-main.html")) {
      href = href.replace("knowledge-base-main.html", "guru-db-knowledge.html");
  }

  // Check if it's a link to an HTML page
  if (href.endsWith(".html") || href.includes(".html")) {
    e.stopImmediatePropagation();
    e.preventDefault();
    window.location.href = href;
  }
}, true); // Capture phase
</script>
"""

# Normalize whitespace for comparison
def normalize(s):
    return "".join(s.split())

count_script_updates = 0
count_link_updates = 0

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # 1. Update the script block
    # We look for the specific old script and replace it.
    # Since whitespace might vary, let's try a simpler regex replace or just replacing the known block if it matches.
    # Actually, the file I read has exactly the content I put in 'target_script' (ignoring exact whitespace lines).
    
    # Let's try to find the standard block
    if 'window.location.href = href;' in content and 'Redirect legacy' not in content:
        # It has the OLD script.
        # Find the start of the script tag
        pattern = r'<script>\s*document\.addEventListener\("click", function \(e\) \{.*?\}\, true\); // Capture phase\s*</script>'
        
        # Check if regex matches
        match = re.search(pattern, content, re.DOTALL)
        if match:
            # Replace with new script (cleaned up a bit)
             content = content.replace(match.group(0), new_script.strip())
             count_script_updates += 1
        else:
             print(f"Script pattern not matched in {filepath}, manual check needed?")

    # 2. Replace any remaining text links to knowledge-base-main.html
    # (Just in case my previous grep was wrong or I missed cases)
    if "knowledge-base-main.html" in content:
        content = content.replace("knowledge-base-main.html", "guru-db-knowledge.html")
        count_link_updates += 1

    # 3. Replace links to guru-knowledge-main.html ONLY if it's inside an anchor href
    # We want to avoid replacing the filename in other contexts if possible, but honestly,
    # if it's the 'old' file, we probably want to kill all refs to it in the UI.
    # However, we must be careful not to break the file ITSELF if it refers to itself?
    # Actually, safe bet is to replace hrefs.
    content = re.sub(r'href="[^"]*guru-knowledge-main\.html"', 'href="/uxbot/guru-db-knowledge.html"', content)
    content = re.sub(r"href='[^']*guru-knowledge-main\.html'", "href='/uxbot/guru-db-knowledge.html'", content)


    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

print(f"Total script updates: {count_script_updates}")
print(f"Total link cleanups: {count_link_updates}")
