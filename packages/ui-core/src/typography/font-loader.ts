import WebFont from 'webfontloader';
import { theme } from '../theme';

const predefinedFonts = [theme.font.GangsterGrotesk, theme.font.Lato];
class FontLoader {
  private static instance: FontLoader;
  private fonts: string[] = [];
  private constructor() {
    if (FontLoader.instance) {
      throw new Error('Error: Use FontLoader.getInstance() instead of new.');
    }
  }
  static getInstance() {
    if (!FontLoader.instance) {
      FontLoader.instance = new FontLoader();
    }
    return FontLoader.instance;
  }

  loadFont(fonts: string[]) {
    const customFamilies = predefinedFonts.filter(
      (font) => !this.fonts.includes(font)
    );
    const googleFamilies = fonts.filter(
      (font) => !this.fonts.includes(font) && !predefinedFonts.includes(font)
    );

    if (customFamilies.length || googleFamilies.length) {
      WebFont.load({
        ...(googleFamilies.length && {
          google: {
            families: googleFamilies,
          },
        }),
        ...(customFamilies.length && {
          custom: {
            families: customFamilies,
          },
        }),
        loading: () => console.log('loading'),
        fontloading: (familyName, fvd) =>
          console.log('fontloading ', familyName, fvd),
        fontactive: (familyName, fvd) => {
          this.fonts.push(familyName);
          console.log('fontactive ', familyName, fvd);
        },
        fontinactive: (familyName, fvd) =>
          console.log('fontinactive ', familyName, fvd),
      });
    }
  }

  getActiveFonts() {
    return this.fonts;
  }
}

const FontLoaderInstance = FontLoader.getInstance();

export default FontLoaderInstance;
