export const getGoogleFonts = async () => {
  const GOOGLE_FONTS_API =
    'https://www.googleapis.com/webfonts/v1/webfonts/?key=AIzaSyC529qus-Wu8LEftuMjSSBOt7mKu5lMm2E';

  const fonts = await fetch(GOOGLE_FONTS_API)
    .then((data) => data.json())
    .then((res) => {
      const { items } = res;
      const filteredItems = items
        .filter(
          (item: { category: string; family: string }) =>
            item.category !== 'handwriting' && item.family !== 'Lato'
        )
        .map((item: { family: string }) => item.family);

      return filteredItems;
    })
    .catch((err) => console.error(err));

  return fonts;
};
