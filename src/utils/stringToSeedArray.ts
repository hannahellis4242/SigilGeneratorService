const stringToSeedArray = (str: string) =>
  new Array(str.length).fill(0).map((_, i) => str.charCodeAt(i));
export default stringToSeedArray;
