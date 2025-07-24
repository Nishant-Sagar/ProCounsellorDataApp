import { XMLParser } from 'fast-xml-parser';

export function parseXmlToJson(xmlString: string) {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '',
  });
  const json = parser.parse(xmlString);
  return json.HashMap || json;
}
