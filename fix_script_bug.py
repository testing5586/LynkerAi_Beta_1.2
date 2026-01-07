import os
import glob
import re

directory = "static/templates/uxbot"
files = glob.glob(os.path.join(directory, "*.html"))

# The BROKEN script part we want to find
broken_fragment = 'href = href.replace("guru-db-knowledge.html", "guru-db-knowledge.html");'

# The CORRECT script to put in
correct_script = """
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
  // Also redirect guru-knowledge-main.html if it appears
  if (href.includes("guru-knowledge-main.html") || href.endsWith("guru-knowledge-main.html")) {
      href = href.replace("guru-knowledge-main.html", "guru-db-knowledge.html");
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

count_updates = 0

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We look for the script block I added in the previous step.
    # It starts with <script> and ends with </script>.
    # It contains the broken logic or the previous logic.
    
    # Let's find the script block at the end of the body.
    # Regex to grab the last script block if it contains "addEventListener".
    pattern = r'<script>\s*document\.addEventListener\("click".*?</script>'
    
    match = re.search(pattern, content, re.DOTALL)
    if match:
        # replace it with the correct script
        content = content.replace(match.group(0), correct_script.strip())
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        count_updates += 1
        print(f"Fixed script in {filepath}")
    else:
        print(f"Script pattern not found in {filepath}")

print(f"Total script fixes: {count_updates}")
