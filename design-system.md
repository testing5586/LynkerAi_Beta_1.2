# UXBOT Design System

This design system is extracted from the UXBOT project to facilitate the replication of the visual style in native HTML/CSS pages without dependencies on React, Tailwind, or other frameworks.

## 1. Color Tokens

The system uses HSL values for colors to allow for easy theming and dark mode support.

### Base Colors (Dark Mode Default)

| Token | CSS Variable | Value (HSL) | Hex (Approx) | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Background** | `--background` | `240 10% 8%` | `#121216` | Page background |
| **Foreground** | `--foreground` | `240 5% 96%` | `#f5f5f6` | Primary text |
| **Card** | `--card` | `240 8% 12%` | `#1c1c21` | Card background |
| **Card Foreground** | `--card-foreground` | `240 5% 96%` | `#f5f5f6` | Text on cards |
| **Primary** | `--primary` | `270 60% 55%` | `#8b5cf6` | Primary brand color (Purple) |
| **Primary Foreground** | `--primary-foreground` | `240 5% 98%` | `#fafafa` | Text on primary color |
| **Secondary** | `--secondary` | `240 50% 25%` | `#202060` | Secondary actions/backgrounds |
| **Secondary Foreground** | `--secondary-foreground` | `240 5% 96%` | `#f5f5f6` | Text on secondary color |
| **Muted** | `--muted` | `240 8% 18%` | `#2a2a31` | Muted backgrounds |
| **Muted Foreground** | `--muted-foreground` | `240 5% 65%` | `#a1a1aa` | Secondary text / placeholders |
| **Accent** | `--accent` | `45 80% 60%` | `#eab308` | Accent color (Gold/Yellow) |
| **Accent Foreground** | `--accent-foreground` | `240 10% 10%` | `#1a1a1c` | Text on accent color |
| **Destructive** | `--destructive` | `0 65% 55%` | `#ef4444` | Error / Delete actions |
| **Border** | `--border` | `240 8% 20%` | `#2f2f35` | Borders |
| **Input** | `--input` | `240 8% 18%` | `#2a2a31` | Input fields background/border |
| **Ring** | `--ring` | `270 60% 55%` | `#8b5cf6` | Focus rings |

### CSS Setup
```css
:root {
  --background: 240 10% 8%;
  --foreground: 240 5% 96%;
  --card: 240 8% 12%;
  --card-foreground: 240 5% 96%;
  --popover: 240 10% 10%;
  --popover-foreground: 240 5% 96%;
  --primary: 270 60% 55%;
  --primary-foreground: 240 5% 98%;
  --secondary: 240 50% 25%;
  --secondary-foreground: 240 5% 96%;
  --muted: 240 8% 18%;
  --muted-foreground: 240 5% 65%;
  --accent: 45 80% 60%;
  --accent-foreground: 240 10% 10%;
  --destructive: 0 65% 55%;
  --destructive-foreground: 0 0% 98%;
  --border: 240 8% 20%;
  --input: 240 8% 18%;
  --ring: 270 60% 55%;
  --radius: 0.75rem;
}

body {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}
```

## 2. Typography

| Token | Value |
| :--- | :--- |
| **Font Family (Sans)** | `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"` |
| **Font Family (Mono)** | `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace` |

### Font Sizes
- **xs**: `0.75rem` (12px) / Line height: `1rem`
- **sm**: `0.875rem` (14px) / Line height: `1.25rem`
- **base**: `1rem` (16px) / Line height: `1.5rem`
- **lg**: `1.125rem` (18px) / Line height: `1.75rem`
- **xl**: `1.25rem` (20px) / Line height: `1.75rem`
- **2xl**: `1.5rem` (24px) / Line height: `2rem`
- **3xl**: `1.875rem` (30px) / Line height: `2.25rem`

## 3. Spacing & Layout

Based on the 4px grid system.

| Class | Value | Pixels |
| :--- | :--- | :--- |
| `p-1` / `m-1` | `0.25rem` | 4px |
| `p-2` / `m-2` | `0.5rem` | 8px |
| `p-3` / `m-3` | `0.75rem` | 12px |
| `p-4` / `m-4` | `1rem` | 16px |
| `p-6` / `m-6` | `1.5rem` | 24px |
| `p-8` / `m-8` | `2rem` | 32px |
| `p-10` / `m-10` | `2.5rem` | 40px |
| `p-12` / `m-12` | `3rem` | 48px |

## 4. Radius & Shadows

### Radius
- **Default**: `var(--radius)` -> `0.75rem` (12px)
- **sm**: `calc(var(--radius) - 4px)` -> `0.5rem` (8px)
- **md**: `calc(var(--radius) - 2px)` -> `0.625rem` (10px)
- **xl**: `0.75rem` (12px)
- **2xl**: `1rem` (16px)
- **full**: `9999px`

### Shadows
- **Soft**: `0 2px 8px rgba(0, 0, 0, .3), 0 0 20px rgba(139, 92, 246, .1)`
- **Card**: `0 4px 16px rgba(0, 0, 0, .4), 0 0 40px rgba(139, 92, 246, .15)`
- **Glow**: `0 0 20px rgba(234, 179, 8, .3)`

## 5. Components & Utilities

### Glassmorphism Card (`.glass-card`)
Used for the main registration container.

```css
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius);
  box-shadow: var(--shadow-card);
}
```

### Mystical Gradient Background
Used for the primary button and accents.

```css
.bg-mystical-gradient {
  background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)));
}

.text-gradient-mystical {
  background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```

### Input Fields
Standard input style.

```css
input {
  height: 2.25rem; /* h-9 */
  width: 100%;
  border-radius: calc(var(--radius) - 2px); /* rounded-md */
  border: 1px solid hsl(var(--input));
  background-color: transparent;
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  color: hsl(var(--foreground));
  transition: all 0.15s ease;
}

input:focus {
  outline: none;
  border-color: hsl(var(--ring));
  box-shadow: 0 0 0 1px hsl(var(--ring));
}

input::placeholder {
  color: hsl(var(--muted-foreground));
}
```

### Primary Button
```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: calc(var(--radius) - 2px);
  font-size: 0.875rem;
  font-weight: 500;
  height: 2.25rem;
  padding: 0 1rem;
  background: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)));
  color: hsl(var(--primary-foreground));
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-primary:hover {
  opacity: 0.9;
}
```

## 6. Page Background Structure

The registration page uses a specific gradient background.

```css
body {
  min-height: 100vh;
  background: linear-gradient(135deg, #121216, #1f1528);
  display: flex;
  align-items: center;
  justify-content: center;
}
```

## 7. Style Principles

1.  **Dark & Mystical**: The UI defaults to a dark theme with deep purples and blacks (`#121216`, `#1f1528`).
2.  **Glassmorphism**: Use semi-transparent backgrounds with `backdrop-filter: blur()` to create depth.
3.  **Gradients**: Use gradients for primary actions and text highlights to add vibrancy.
4.  **Soft Glows**: Use colored shadows (`--shadow-soft`, `--shadow-glow`) to make elements "pop" against the dark background.
5.  **Rounded Corners**: Generous border radius (`0.75rem`) for a friendly, modern feel.
