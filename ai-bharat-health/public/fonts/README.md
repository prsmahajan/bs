# Font Files

Place the `clarion.ttf` font file in this directory.

The font is already configured in the project and will be loaded automatically once the file is placed here.

**Required file:**
- `clarion.ttf` - Custom Clarion font for buttons and headings

The font is referenced in `src/index.css` with the following path:
```css
@font-face {
  font-family: 'Clarion';
  src: url('/fonts/clarion.ttf') format('truetype');
}
```
