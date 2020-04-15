import WebFont from 'webfontloader';
import { theme } from '../theme';

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
  loadFont(font: string) {
    if (font && !this.fonts.includes(font)) {
      this.fonts.push(font);
      WebFont.load({
        google: {
          families: [font],
        },
        custom: {
          families: [
            theme.font.GangsterGroteskLight,
            theme.font.GangsterGroteskRegular,
            theme.font.GangsterGroteskBold,
            theme.font.LatoLight,
            theme.font.LatoRegular,
            theme.font.LatoBold,
          ],
        },
      });
    }
  }
}

const FontLoaderInstance = FontLoader.getInstance();

export default FontLoaderInstance;
