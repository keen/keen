const invertColor = (hexTripletColor: string) => {
  let color: string | number = hexTripletColor;
  color = color.substring(1);
  color = parseInt(color, 16);
  color = 0xffffff ^ color;
  color = color.toString(16);
  color = ('000000' + color).slice(-6);
  color = '#' + color;
  return color;
};
export default invertColor;
