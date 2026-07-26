import { describe, expect, it } from 'vitest'
import { calculateImageSize } from './size'

describe('calculateImageSize', () => {
  it('uses common 16:9 display resolutions for the built-in tiers', () => {
    expect(calculateImageSize('1K', '16:9')).toBe('1280x720')
    expect(calculateImageSize('2K', '16:9')).toBe('2560x1440')
    expect(calculateImageSize('4K', '16:9')).toBe('3840x2160')
  })

  it('uses matching portrait presets for common ratios', () => {
    expect(calculateImageSize('2K', '9:16')).toBe('1440x2560')
    expect(calculateImageSize('2K', '2:3')).toBe('1440x2160')
    expect(calculateImageSize('2K', '3:4')).toBe('1536x2048')
  })

  it('uses the requested 1.5K resolutions for common ratios', () => {
    expect(calculateImageSize('1.5K', '1:1')).toBe('1536x1536')
    expect(calculateImageSize('1.5K', '2:3')).toBe('1248x1872')
    expect(calculateImageSize('1.5K', '3:2')).toBe('1872x1248')
    expect(calculateImageSize('1.5K', '3:4')).toBe('1296x1728')
    expect(calculateImageSize('1.5K', '4:3')).toBe('1728x1296')
    expect(calculateImageSize('1.5K', '9:16')).toBe('1152x2048')
    expect(calculateImageSize('1.5K', '16:9')).toBe('2048x1152')
    expect(calculateImageSize('1.5K', '21:9')).toBe('2016x864')
  })

  it('falls back to budget-based sizing for custom ratios', () => {
    expect(calculateImageSize('2K', '5:4')).toBe('2288x1824')
  })
})
