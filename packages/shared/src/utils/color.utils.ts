export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

export const rgbToHex = (r: number, g: number, b: number): string => {
  return '#' + [r, g, b].map((x) => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('')
}

export const getColorName = (hex: string): string => {
  // Simplified color name mapping
  const colorMap: Record<string, string> = {
    '#000000': 'Black',
    '#FFFFFF': 'White',
    '#FF0000': 'Red',
    '#00FF00': 'Green',
    '#0000FF': 'Blue',
    '#FFFF00': 'Yellow',
    '#FF00FF': 'Magenta',
    '#00FFFF': 'Cyan',
    '#FFA500': 'Orange',
    '#800080': 'Purple',
    '#FFC0CB': 'Pink',
    '#A52A2A': 'Brown',
    '#808080': 'Gray',
    '#FFD700': 'Gold',
    '#C0C0C0': 'Silver',
  }

  const rgb = hexToRgb(hex)
  if (!rgb) return 'Unknown'

  // Find closest color
  let minDistance = Infinity
  let closestColor = 'Unknown'

  for (const [colorHex, colorName] of Object.entries(colorMap)) {
    const targetRgb = hexToRgb(colorHex)
    if (targetRgb) {
      const distance = Math.sqrt(
        Math.pow(rgb.r - targetRgb.r, 2) +
          Math.pow(rgb.g - targetRgb.g, 2) +
          Math.pow(rgb.b - targetRgb.b, 2)
      )
      if (distance < minDistance) {
        minDistance = distance
        closestColor = colorName
      }
    }
  }

  return closestColor
}

export const getComplementaryColor = (hex: string): string => {
  const rgb = hexToRgb(hex)
  if (!rgb) return hex

  return rgbToHex(255 - rgb.r, 255 - rgb.g, 255 - rgb.b)
}

export const getAnalogousColors = (hex: string): string[] => {
  const rgb = hexToRgb(hex)
  if (!rgb) return [hex]

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
  const colors = []

  for (let i = -2; i <= 2; i++) {
    if (i === 0) continue
    const newHue = (hsl.h + i * 30 + 360) % 360
    const newRgb = hslToRgb(newHue, hsl.s, hsl.l)
    colors.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b))
  }

  return colors
}

const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return { h: h * 360, s, l }
}

const hslToRgb = (h: number, s: number, l: number) => {
  h /= 360
  let r = 0
  let g = 0
  let b = 0

  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q

    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  }
}
