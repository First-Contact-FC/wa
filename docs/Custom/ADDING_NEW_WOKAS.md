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
   <img width="96" height="128" alt="su1 Student male 05" src="https://github.com/user-attachments/assets/d0977502-54e6-4a10-a780-217625954bbe" />

3. **Layer-Based Wokas** - Modular system with separate layers for different body parts

   The layer-based system consists of these parts (rendered in this order):
   
   1. **Body** (required) - Base skin color/body shape 
      <img width="96" height="128" alt="character_color5" src="https://github.com/user-attachments/assets/98c19984-d50d-4476-92c3-d3a5fbaf2f2b" />

   2. **Eyes** (required) - Eye styles
      <img width="96" height="128" alt="character_eyes5" src="https://github.com/user-attachments/assets/94f4e0d6-b48f-45ae-ba32-8680b9b5bf9e" />

   3. **Hair** (optional) - Hairstyles
      <img width="96" height="128" alt="character_hairs5" src="https://github.com/user-attachments/assets/0e7d65ba-cdef-4226-9c4f-f2ff33e4ed54" />

   4. **Clothes** (optional) - Clothing items
      <img width="96" height="128" alt="character_clothes5" src="https://github.com/user-attachments/assets/7c6cbc2f-dbe4-4eff-a7c9-b22eeda0f3e4" />

   5. **Hat** (optional) - Headwear
      <img width="96" height="128" alt="character_hats5" src="https://github.com/user-attachments/assets/3a85e1ad-49ff-403a-bbf3-58e3b3068f67" />

   6. **Accessory** (required) - Accessories (can be empty/transparent)
      <img width="96" height="128" alt="character_accessories5" src="https://github.com/user-attachments/assets/a292be70-6ef2-4757-b535-f3d8f0a9abc5" />

Each layer is a separate sprite sheet that gets composited together.

## Sprite Sheet Specifications

### Technical Requirements

- **Frame Size:** 32x32 pixels per frame
- **Total Frames:** 12 frames per sprite sheet
- **Layout:** 3 columns × 4 rows grid (96×128 pixels total)
- **Format:** PNG with transparency support for development but svg for editing
- **Color Depth:** 8-bit RGBA (supports transparency)

### Animation Frame Layout

The sprite sheet must be organized in a 3×4 grid as follows:

<img width="96" height="128" alt="image" src="https://github.com/user-attachments/assets/137c6ce0-4391-44e4-9dfb-3f55d394fca5" />


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
   - **Soft Pixel Style** - Our assets use a soft pixel aesthetic that go with other licensed assets from icograms
   - Not completely soft/realistic because development still require pixel perfect edges, but softer look than traditional hard pixel art that you see in the images
   - Smooth color transitions and gentle shading

2. **Character Design Philosophy:**
   
   **Every avatar must meet ONE of these criteria:**
   
   **Option A: Creative Fantasy Style & Movement**
   - Unique fantasy characters that are not in human form.
   - Creative or innovative movement patterns with walking and running

   **Option B: Diversity & Inclusivity**
   - Represents diversity in one or more of these areas:
     - **Gender:** Various gender expressions and identities including man, woman, and non-binary
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
- Format: PNG and SVG
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

- **Reference Assets:** Study icograms assets to ensure the avatars will feel comfortable in the world
- **Color Palettes:** Use the provided brand color palette only, keeping in mind their associated meaning
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
   - Ensure walking animation looks fluid
   - Test animations by viewing frames in sequence
   - Consider unique movement styles for creative avatars

6. **Transparency:**
   - Use proper alpha channels
   - Do not use colored or white/black backgrounds (use transparency)
   - Ensure clean, soft but pixel perfect edges
   - Use soft shadows that fade to transparency

### Diversity Design Checklist

When creating diverse avatars, ensure:

- [ ] **Authentic Representation**
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


