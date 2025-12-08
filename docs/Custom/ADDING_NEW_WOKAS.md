# Adding New Wokas Through Sprite Sheets

This guide covers how to add completely new wokas (avatars) to WorkAdventure using sprite sheets. The documentation is split into **Design** and **Development** sections.

---

## Table of Contents

1. [Design Section](#design-section)
   - [Understanding Woka Structure](#understanding-woka-structure)
   - [Sprite Sheet Specifications](#sprite-sheet-specifications)
   - [Creating Sprite Sheets](#creating-sprite-sheets)
   - [Layer-Based Wokas](#layer-based-wokas)
   - [Complete Wokas](#complete-wokas)
   - [Design Tools & Resources](#design-tools--resources)

2. [Development Section](#development-section)
   - [File Structure](#file-structure)
   - [Adding Complete Wokas](#adding-complete-wokas)
   - [Adding Layer-Based Wokas](#adding-layer-based-wokas)
   - [Updating woka.json](#updating-wokajson)
   - [Testing Your Wokas](#testing-your-wokas)
   - [Troubleshooting](#troubleshooting)

---

# Design Section

## Understanding Woka Structure

WorkAdventure supports two types of wokas:

1. **Complete Wokas** - Single sprite sheet containing the entire character
2. **Layer-Based Wokas** - Modular system with separate layers for different body parts

### Layer-Based System Components

The layer-based system consists of these parts (rendered in this order):

1. **Body** (required) - Base skin color/body shape
2. **Eyes** (required) - Eye styles
3. **Hair** (optional) - Hairstyles
4. **Clothes** (optional) - Clothing items
5. **Hat** (optional) - Headwear
6. **Accessory** (required) - Accessories (can be empty/transparent)

Each layer is a separate sprite sheet that gets composited together.

## Sprite Sheet Specifications

### Technical Requirements

- **Frame Size:** 32x32 pixels per frame
- **Total Frames:** 12 frames per sprite sheet
- **Layout:** 3 columns × 4 rows grid (96×128 pixels total)
- **Format:** PNG with transparency support
- **Color Depth:** 8-bit RGBA (supports transparency)

### Animation Frame Layout

The sprite sheet must be organized in a 3×4 grid as follows:

```
Frame Layout (3 columns × 4 rows):
┌─────┬─────┬─────┐
│  0  │  1  │  2  │  Row 1: Down direction (walking frames)
├─────┼─────┼─────┤
│  3  │  4  │  5  │  Row 2: Left direction (walking frames)
├─────┼─────┼─────┤
│  6  │  7  │  8  │  Row 3: Right direction (walking frames)
├─────┼─────┼─────┤
│  9  │ 10  │ 11  │  Row 4: Up direction (walking frames)
└─────┴─────┴─────┘
```

### Animation Details

- **Down Direction:** Frames 0, 1, 2 (idle uses frame 1)
- **Left Direction:** Frames 3, 4, 5 (idle uses frame 4)
- **Right Direction:** Frames 6, 7, 8 (idle uses frame 7)
- **Up Direction:** Frames 9, 10, 11 (idle uses frame 10)

**Walking Animation:** Loops through [0,1,2,1] for down, [3,4,5,4] for left, etc.
**Idle Animation:** Uses the middle frame of each direction.

## Creating Sprite Sheets

### Step 1: Design Your Character

1. **Art Style Requirements:**
   - **Soft Pixel Style** - Our assets use a soft pixel aesthetic inspired by icograms
   - Not completely soft/realistic, but softer than traditional hard pixel art
   - Smooth color transitions and gentle shading
   - Maintains pixelated structure while using softer edges and gradients
   - Should match the visual style of our icograms assets

2. **Character Design Philosophy:**
   
   **Every avatar must meet ONE of these criteria:**
   
   **Option A: Creative Style & Movement**
   - Unique artistic style that stands out
   - Creative or innovative movement patterns
   - Distinctive visual design that adds variety
   - Experimental or artistic expression
   
   **Option B: Diversity & Inclusivity**
   - Represents diversity in one or more of these areas:
     - **Gender:** Various gender expressions and identities
     - **Sexuality:** LGBTQ+ representation
     - **Caste:** Representation across different social groups
     - **Class:** Economic and social class diversity
     - **Religion:** Various religious and cultural backgrounds
     - **Race & Ethnicity:** Diverse racial and ethnic representation
     - **Disability:** Visible disabilities, mobility aids, assistive devices
   - Should be authentic and respectful representation
   - Avoid stereotypes and tokenism

3. **Design Considerations:**
   - Characters should face the camera (isometric view)
   - Keep details clear at 32×32 resolution
   - Use consistent lighting (top-left light source recommended)
   - Ensure transparency is used for backgrounds
   - Soft pixel style: Use gentle gradients, smooth color transitions
   - Avoid harsh pixel edges - use anti-aliasing where appropriate
   - Match the softer aesthetic of icograms assets

### Step 2: Create the Sprite Sheet Grid

**Using Image Editing Software (Photoshop, GIMP, Aseprite, etc.):**

1. Create a new canvas: **96×128 pixels** (3×4 grid of 32×32 frames)
2. Enable grid overlay: **32×32 pixel grid**
3. Design each frame in its designated position

**Frame-by-Frame Checklist:**

- [ ] Frame 0: Down - step 1
- [ ] Frame 1: Down - idle/center
- [ ] Frame 2: Down - step 2
- [ ] Frame 3: Left - step 1
- [ ] Frame 4: Left - idle/center
- [ ] Frame 5: Left - step 2
- [ ] Frame 6: Right - step 1
- [ ] Frame 7: Right - idle/center
- [ ] Frame 8: Right - step 2
- [ ] Frame 9: Up - step 1
- [ ] Frame 10: Up - idle/center
- [ ] Frame 11: Up - step 2

### Step 3: Export Your Sprite Sheet

**Export Settings:**
- Format: PNG
- Color mode: RGBA (with alpha channel)
- Resolution: 96×128 pixels (exact)
- Compression: None or minimal (for clarity)
- Transparency: Enabled
- **For Soft Pixel Style:** Preserve gradients and smooth transitions

**File Naming Convention:**
- Use descriptive, lowercase names with underscores
- Include diversity indicators when applicable (e.g., `person_wheelchair.png`, `person_hijab.png`)
- Examples: 
  - `character_creative_style_v1.png`
  - `person_wheelchair_red_shirt.png`
  - `person_hijab_blue_dress.png`
  - `person_cane_walking.png`

## Layer-Based Wokas

### Creating Modular Layers

When creating layer-based wokas, each body part is a separate sprite sheet with the same 12-frame layout.

### Layer Alignment Guidelines

**Critical:** All layers must align perfectly. Use these guidelines:

1. **Base Layer (Body):**
   - Defines the character's base shape
   - Should include head, torso, and basic body structure
   - Skin color and basic features

2. **Eyes Layer:**
   - Positioned on the face area (typically upper portion of frames)
   - Should align with the body's head position
   - Can include different eye expressions

3. **Hair Layer:**
   - Positioned above the head
   - Should align with the head position from body layer
   - Can extend beyond body bounds (for long hair, etc.)

4. **Clothes Layer:**
   - Overlays on the body/torso area
   - Should align with body structure
   - Can include shirts, pants, dresses, etc.

5. **Hat Layer:**
   - Positioned above hair (or head if no hair)
   - Should align with head position
   - Can be various headwear types

6. **Accessory Layer:**
   - Can be positioned anywhere
   - Common: glasses, masks, jewelry, held items
   - **Diversity considerations:** Mobility aids (canes, wheelchairs), assistive devices, cultural accessories, religious symbols
   - Can be transparent/empty for no accessory

### Layer Compositing Order

Layers are rendered in this order (bottom to top):
```
1. Body (base)
2. Eyes
3. Hair
4. Clothes
5. Hat
6. Accessory
```

**Important:** Each layer should have proper transparency where it doesn't need to show.

### Diversity in Layer-Based Wokas

When creating layer-based wokas for diversity:

1. **Body Layer:**
   - Include diverse skin tones
   - Various body types and shapes
   - Different body proportions

2. **Hair Layer:**
   - Diverse hair textures (curly, straight, wavy, coily)
   - Various hair lengths and styles
   - Cultural hairstyles (braids, locs, buns, etc.)
   - Hair colors across the spectrum

3. **Clothes Layer:**
   - Cultural and religious clothing (hijabs, turbans, saris, kimonos, etc.)
   - Various styles and fashions
   - Adaptive clothing options
   - Class-representative clothing (avoid stereotypes)

4. **Accessory Layer:**
   - Mobility aids (wheelchairs, canes, walkers, crutches)
   - Assistive devices (hearing aids, prosthetics, service animals)
   - Cultural and religious accessories
   - Glasses and other common accessories

5. **Hat Layer:**
   - Religious headwear (hijabs, turbans, kippahs, etc.)
   - Cultural headwear
   - Various hat styles

**Best Practices:**
- Research authentic representation
- Avoid cultural appropriation
- Consult with communities when possible
- Represent intersectionality (e.g., disabled person of color wearing cultural clothing)
- Ensure mobility aids are functional and realistic

## Complete Wokas

### When to Use Complete Wokas

Complete wokas are single sprite sheets containing the entire character. Use them when:
- You have a pre-made character sprite sheet
- The character doesn't need customization
- You want a unique, fixed appearance
- Creating diverse representations that need specific, integrated features
- Designing characters with unique creative styles or movement patterns

### Creating Complete Wokas

Follow the same sprite sheet specifications (96×128, 12 frames), but include all visual elements in a single sheet.

**Diversity Considerations for Complete Wokas:**
- Perfect for representing specific identities authentically
- Allows for integrated features like mobility aids, cultural clothing, religious symbols
- Can showcase unique creative styles with distinctive movement patterns
- Ideal for characters that need cohesive, non-modular appearance

## Design Tools & Resources

### Recommended Tools

1. **Aseprite** (Paid, ~$20)
   - Professional pixel art editor
   - Built-in animation support
   - Excellent for sprite sheet creation
   - Supports soft pixel techniques (gradients, anti-aliasing)
   - Website: https://www.aseprite.org/

2. **GIMP** (Free)
   - Full-featured image editor
   - Grid and alignment tools
   - Good for compositing layers
   - Excellent gradient and soft shading tools
   - Website: https://www.gimp.org/

3. **Photoshop** (Paid)
   - Industry standard
   - Advanced features
   - Excellent for soft pixel work (gradients, filters, blending)
   - Professional anti-aliasing tools

4. **Krita** (Free)
   - Professional digital painting
   - Great for soft pixel style
   - Excellent gradient and brush tools
   - Website: https://krita.org/

5. **Piskel** (Free, Web-based)
   - Online pixel art editor
   - Simple and accessible
   - Website: https://www.piskelapp.com/

6. **LibreSprite** (Free, Open Source)
   - Aseprite alternative
   - Similar features
   - Website: https://libresprite.github.io/

**Note:** For soft pixel style, tools with gradient and anti-aliasing capabilities (GIMP, Photoshop, Krita) are particularly useful.

### Design Resources

- **Reference Assets:** Study icograms assets for soft pixel style reference
- **Color Palettes:** Use soft, harmonious color schemes
- **Animation Reference:** Study existing wokas for movement patterns
- **Diversity References:** Research authentic representation for diverse characters

### Design Best Practices

1. **Soft Pixel Style:**
   - Use gentle gradients instead of flat colors
   - Apply soft shadows and highlights
   - Smooth color transitions between shades
   - Maintain pixel structure but with softer edges
   - Use anti-aliasing for smoother appearance
   - Avoid harsh, blocky pixel edges

2. **Diversity & Inclusivity:**
   - Research authentic representation before designing
   - Consult with communities when representing specific groups
   - Avoid stereotypes and caricatures
   - Include diverse body types, abilities, and appearances
   - Represent intersectionality (e.g., disabled person of color)
   - Use respectful and accurate cultural/religious symbols
   - Consider mobility aids, assistive devices, and adaptive equipment

3. **Creative Expression:**
   - Experiment with unique movement patterns
   - Try innovative visual styles
   - Create distinctive character designs
   - Push artistic boundaries while maintaining usability

4. **Clarity:**
   - Ensure details are visible at 32×32
   - Use appropriate contrast (not too harsh, not too soft)
   - Balance detail with readability
   - Avoid overly complex designs that lose clarity

5. **Animation:**
   - Keep animations smooth and natural
   - Use soft pixel style in motion
   - Ensure walking animation looks fluid
   - Test animations by viewing frames in sequence
   - Consider unique movement styles for creative avatars

6. **Transparency:**
   - Use proper alpha channels
   - Avoid white/black backgrounds (use transparency)
   - Ensure clean, soft edges
   - Use soft shadows that fade to transparency

## Diversity & Inclusivity Guidelines

### Mandatory Requirements

**Every new woka MUST meet at least ONE of these criteria:**

1. **Creative Style & Movement**
   - Unique artistic expression
   - Innovative visual design
   - Creative movement patterns
   - Distinctive style that adds variety

2. **Diversity Representation**
   - Represents one or more aspects of diversity:
     - Gender diversity (various gender expressions, non-binary, trans)
     - Sexual orientation (LGBTQ+ representation)
     - Caste diversity (various social groups)
     - Economic class (different socioeconomic backgrounds)
     - Religion (various faiths and beliefs)
     - Race & Ethnicity (diverse racial/ethnic backgrounds)
     - Disability (visible disabilities, mobility aids, assistive devices)

### Diversity Design Checklist

When creating diverse avatars, ensure:

- [ ] **Authentic Representation**
  - Research the group/identity you're representing
  - Use accurate and respectful visual elements
  - Avoid stereotypes and caricatures

- [ ] **Intersectionality**
  - Consider multiple aspects of identity (e.g., disabled person of color)
  - Represent diverse combinations
  - Avoid single-dimensional representation

- [ ] **Accessibility**
  - Include mobility aids when representing disability
  - Show assistive devices accurately
  - Consider various types of disabilities (mobility, visual, hearing, etc.)

- [ ] **Cultural Sensitivity**
  - Research cultural and religious symbols
  - Use authentic clothing and accessories
  - Avoid cultural appropriation
  - Consult with community members when possible

- [ ] **Body Diversity**
  - Various body types and sizes
  - Different proportions
  - Avoid body shaming or unrealistic standards

- [ ] **Visual Authenticity**
  - Accurate skin tone representation
  - Diverse hair textures and styles
  - Authentic cultural/religious clothing
  - Realistic mobility aids and assistive devices

### Examples of Diverse Representations

**Gender & Sexuality:**
- Non-binary characters with diverse presentations
- Trans characters with authentic representation
- LGBTQ+ pride elements (when appropriate)
- Various gender expressions

**Race & Ethnicity:**
- Diverse skin tones across the spectrum
- Authentic cultural clothing and accessories
- Various hair textures and styles
- Cultural hairstyles (braids, locs, buns, etc.)

**Disability:**
- Wheelchair users (manual and electric)
- People using canes, walkers, crutches
- Visual aids (canes, guide dogs)
- Hearing aids and other assistive devices
- Prosthetics and adaptive equipment
- Service animals

**Religion:**
- Hijabs, turbans, kippahs, and other religious headwear
- Religious clothing and symbols
- Various faith representations

**Class:**
- Diverse economic backgrounds
- Various clothing styles
- Avoid stereotypes about class

**Caste:**
- Representation across different social groups
- Avoid reinforcing caste hierarchies
- Focus on authentic representation

### Resources for Authentic Representation

- **Disability Representation:**
  - Consult disability advocacy organizations
  - Research accurate mobility aid designs
  - Study how disabilities are represented respectfully

- **Cultural & Religious Representation:**
  - Consult with community members
  - Research authentic clothing and symbols
  - Avoid stereotypes and generalizations

- **Gender & Sexuality:**
  - Consult LGBTQ+ organizations
  - Research authentic representation
  - Avoid stereotypes

### Soft Pixel Style for Diverse Characters

When applying soft pixel style to diverse characters:

- Use soft gradients for skin tones (avoid flat colors)
- Apply gentle shading to cultural clothing
- Use smooth transitions for hair textures
- Maintain soft pixel aesthetic while preserving authentic features
- Ensure mobility aids are clearly visible but styled softly
- Use anti-aliasing for smooth edges on all elements

---

# Development Section

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

