export function pascalCase(input: string) {
  if (!input) return '';
  let str = input.replace(/[_-]/g, ' ');
  str = str.replace(/([a-z])([A-Z])/g, '$1 $2');

  const shortFormMatch = str.match(/\((.*?)\)/);
  let shortForm = '';
  if (shortFormMatch) {
    shortForm = shortFormMatch[1].toUpperCase();
  }


  const mainPart = str.replace(/\(.*?\)/, '').trim();

  const titled = mainPart
    .toLowerCase()
    .split(' ')
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');


  return shortForm ? `${titled} (${shortForm})` : titled;
}
