# Development Section

## Table of Content

   - [File Structure](#file-structure)
   - [Adding Complete Wokas](#adding-complete-wokas)
   - [Adding Layer-Based Wokas](#adding-layer-based-wokas)
   - [Updating woka.json](#updating-wokajson)
   - [Testing Your Wokas](#testing-your-wokas)
   - [Troubleshooting](#troubleshooting)

## File Structure

WorkAdventure stores woka resources in the following locations:

```
play/public/resources/
├── characters/           # Complete woka sprite sheets
│   └── pipoya/         # Example: existing character pack
│       └── *.png
└── customisation/      # Layer-based woka parts
    ├── character_color/      # Body layers
    ├── character_eyes/       # Eye layers
    ├── character_hairs/       # Hair layers
    ├── character_clothes/    # Clothing layers
    ├── character_hats/       # Hat layers
    └── character_accessories/ # Accessory layers
```

**Configuration File:**
- `play/src/pusher/data/woka.json` - Defines all available wokas and their metadata

## Adding Complete Wokas

### Step 1: Add Sprite Sheet Files

1. Place your sprite sheet PNG file in the characters directory:

```bash
# Example: Adding a new character
cp my_new_character.png play/public/resources/characters/custom/
```

**Recommended directory structure:**
```
play/public/resources/characters/
├── pipoya/              # Existing characters
└── custom/              # Your custom characters
    └── my_new_character.png
```

### Step 2: Update woka.json

Edit `play/src/pusher/data/woka.json` and add your woka to the `"woka"` section:

```json
{
  "woka": {
    "collections": [
      {
        "name": "default",
        "position": 0,
        "textures": [
          // ... existing wokas ...
          {
            "id": "my_new_character",
            "name": "My New Character",
            "url": "resources/characters/custom/my_new_character.png",
            "position": 24
          }
        ]
      }
    ]
  }
}
```

**Field Descriptions:**
- `id`: Unique identifier (lowercase, no spaces, use underscores)
- `name`: Display name (can have spaces, will be shown to users)
- `url`: Path relative to `play/public/` directory
- `position`: Order in the selection menu (higher = appears later)

### Step 3: Verify File Path

Ensure the URL path is correct:
- Paths are relative to `play/public/`
- Use forward slashes `/`
- Case-sensitive on Linux/Mac

## Adding Layer-Based Wokas

### Step 1: Add Layer Sprite Sheets

Add your sprite sheets to the appropriate customisation directories:

```bash
# Example: Adding a new body color
cp my_body_color.png play/public/resources/customisation/character_color/

# Example: Adding new hair
cp my_hair_style.png play/public/resources/customisation/character_hairs/

# Example: Adding new clothes
cp my_shirt.png play/public/resources/customisation/character_clothes/
```

### Step 2: Update woka.json for Each Layer

Edit `play/src/pusher/data/woka.json` and add entries to the appropriate sections:

**Adding a Body Color:**
```json
{
  "body": {
    "required": true,
    "collections": [
      {
        "name": "default",
        "position": 0,
        "textures": [
          // ... existing body colors ...
          {
            "id": "body_custom1",
            "name": "Custom Body Color",
            "url": "resources/customisation/character_color/my_body_color.png",
            "position": 33
          }
        ]
      }
    ]
  }
}
```

**Adding Hair:**
```json
{
  "hair": {
    "collections": [
      {
        "name": "default",
        "position": 0,
        "textures": [
          // ... existing hair styles ...
          {
            "id": "hair_custom1",
            "name": "Custom Hair Style",
            "url": "resources/customisation/character_hairs/my_hair_style.png",
            "position": 74
          }
        ]
      }
    ]
  }
}
```

**Similar pattern for:**
- `eyes` → `resources/customisation/character_eyes/`
- `clothes` → `resources/customisation/character_clothes/`
- `hat` → `resources/customisation/character_hats/`
- `accessory` → `resources/customisation/character_accessories/`

## Updating woka.json

### JSON Structure Overview

The `woka.json` file has this structure:

```json
{
  "woka": { /* Complete wokas */ },
  "body": { /* Body layers */ },
  "eyes": { /* Eye layers */ },
  "hair": { /* Hair layers */ },
  "clothes": { /* Clothing layers */ },
  "hat": { /* Hat layers */ },
  "accessory": { /* Accessory layers */ }
}
```

Each section contains:
- `required`: Boolean (true for body, eyes, accessory)
- `collections`: Array of collections (usually just "default")
  - `name`: Collection name
  - `position`: Collection order
  - `textures`: Array of texture definitions
    - `id`: Unique identifier
    - `name`: Display name
    - `url`: File path
    - `position`: Display order

### Best Practices for woka.json

1. **ID Naming:**
   - Use lowercase
   - Use underscores, not spaces
   - Be descriptive: `hair_long_black`, not `hair1`

2. **Position Values:**
   - Increment from existing highest value
   - Leave gaps for future additions
   - Check existing max position before adding

3. **JSON Validation:**
   - Ensure valid JSON syntax
   - No trailing commas
   - Proper quotes (double quotes only)

4. **File Paths:**
   - Always relative to `play/public/`
   - Use forward slashes
   - Match actual file locations exactly

### Example: Complete Addition

Here's a complete example adding a new complete woka:

```json
{
  "woka": {
    "collections": [
      {
        "name": "default",
        "position": 0,
        "textures": [
          {
            "id": "wizard_blue",
            "name": "Blue Wizard",
            "url": "resources/characters/custom/wizard_blue.png",
            "position": 24
          }
        ]
      }
    ]
  }
}
```

## Testing Your Wokas

### Step 1: Restart the Development Server

After adding files and updating `woka.json`:

```bash
# If using docker-compose
docker-compose restart play

# Or if running locally
npm run dev  # in the play directory
```

### Step 2: Clear Browser Cache

- Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
- Or clear browser cache completely

### Step 3: Test in Game

1. Navigate to your WorkAdventure instance
2. Go to the Woka selection screen
3. Look for your new woka in the list
4. Select it and verify:
   - Sprite loads correctly
   - All 4 directions work
   - Walking animation plays
   - Idle animation displays

### Step 4: Test Layer-Based Wokas

For layer-based wokas:
1. Go to Woka customization screen
2. Select your new layers
3. Verify:
   - Layers align correctly
   - No visual glitches
   - All combinations work
   - Transparency works properly

### Debugging Tips

**Check Browser Console:**
- Open Developer Tools (F12)
- Look for 404 errors (missing files)
- Check for CORS issues
- Verify image loading

**Verify File Paths:**
```bash
# Check if file exists
ls -la play/public/resources/characters/custom/my_new_character.png

# Verify path in woka.json matches actual location
```

**Check JSON Syntax:**
```bash
# Validate JSON (if you have jq installed)
jq . play/src/pusher/data/woka.json

# Or use an online JSON validator
```

## Troubleshooting

### Issue: Woka Not Appearing in Selection

**Possible Causes:**
1. **Invalid JSON syntax** - Check for syntax errors
2. **Incorrect file path** - Verify URL matches file location
3. **File not in correct directory** - Ensure file is in `play/public/resources/`
4. **Cache issues** - Clear browser cache and restart server

**Solution:**
```bash
# Validate JSON
cat play/src/pusher/data/woka.json | python -m json.tool

# Check file exists
find play/public/resources -name "my_new_character.png"

# Restart server
docker-compose restart play
```

### Issue: Sprite Sheet Not Loading

**Possible Causes:**
1. **Wrong file format** - Must be PNG
2. **Incorrect dimensions** - Must be exactly 96×128 (or multiples)
3. **File corruption** - Re-export the sprite sheet
4. **Path case sensitivity** - Check case matches exactly

**Solution:**
```bash
# Check file format and dimensions
file play/public/resources/characters/custom/my_new_character.png
identify play/public/resources/characters/custom/my_new_character.png  # if ImageMagick installed
```

### Issue: Animation Not Working

**Possible Causes:**
1. **Incorrect frame layout** - Must be 3×4 grid
2. **Frames in wrong order** - Verify frame positions
3. **Missing frames** - Ensure all 12 frames are present

**Solution:**
- Review the frame layout section in Design documentation
- Verify each frame is 32×32 pixels
- Check frame order matches the specification

### Issue: Layers Not Aligning

**Possible Causes:**
1. **Inconsistent frame positioning** - All layers must align
2. **Different sprite sheet sizes** - All must be 96×128
3. **Transparency issues** - Check alpha channel

**Solution:**
- Use a reference layer (like body) to align others
- Ensure all layers use the same grid system
- Test alignment by overlaying layers in an image editor

### Issue: Performance Problems

**Possible Causes:**
1. **Large file sizes** - Optimize PNG files
2. **Too many wokas** - Consider organizing into collections
3. **Unoptimized images** - Use image optimization tools

**Solution:**
```bash
# Optimize PNG files (using pngquant or similar)
pngquant --quality=65-80 my_new_character.png

# Or use online tools like TinyPNG
```

## Advanced: Creating Collections

You can organize wokas into multiple collections:

```json
{
  "woka": {
    "collections": [
      {
        "name": "default",
        "position": 0,
        "textures": [ /* default wokas */ ]
      },
      {
        "name": "fantasy",
        "position": 1,
        "textures": [
          {
            "id": "wizard",
            "name": "Wizard",
            "url": "resources/characters/fantasy/wizard.png",
            "position": 0
          }
        ]
      }
    ]
  }
}
```

Collections allow you to group related wokas together.

## Summary Checklist

### For Complete Wokas:
- [ ] Sprite sheet is 96×128 pixels (3×4 grid of 32×32 frames)
- [ ] PNG format with transparency
- [ ] All 12 frames are present and correctly positioned
- [ ] **Soft pixel style applied** (gradients, smooth transitions, anti-aliasing)
- [ ] **Meets diversity/creativity requirement:**
  - [ ] Creative style & movement, OR
  - [ ] Represents diversity (gender, sexuality, caste, class, religion, race, disability)
- [ ] **If representing diversity:**
  - [ ] Authentic and respectful representation
  - [ ] Researched the group/identity
  - [ ] Avoided stereotypes
- [ ] File placed in `play/public/resources/characters/`
- [ ] Entry added to `woka.json` in `"woka"` section
- [ ] JSON syntax is valid
- [ ] Server restarted
- [ ] Browser cache cleared
- [ ] Tested in game

### For Layer-Based Wokas:
- [ ] Each layer sprite sheet is 96×128 pixels
- [ ] All layers align properly
- [ ] **Soft pixel style applied** to all layers
- [ ] **Meets diversity/creativity requirement:**
  - [ ] Creative style & movement, OR
  - [ ] Represents diversity through layers
- [ ] **If representing diversity:**
  - [ ] Diverse skin tones in body layer
  - [ ] Diverse hair textures/styles in hair layer
  - [ ] Cultural/religious clothing in clothes/hat layers
  - [ ] Mobility aids/assistive devices in accessory layer
  - [ ] Authentic and respectful representation
- [ ] Files placed in appropriate customisation directories
- [ ] Entries added to `woka.json` for each layer
- [ ] JSON syntax is valid
- [ ] Server restarted
- [ ] Browser cache cleared
- [ ] Tested layer combinations in game

---

## Additional Resources

- **Existing Woka Examples:** `play/public/resources/characters/pipoya/`
- **Woka Configuration:** `play/src/pusher/data/woka.json`
- **Woka Service Code:** `play/src/pusher/services/LocalWokaService.ts`
- **Animation Code:** `play/src/front/Phaser/Player/Animation.ts`
- **Official Documentation:** https://docs.workadventu.re/

---

**Last Updated:** Based on WorkAdventure commit `e630bced4`

