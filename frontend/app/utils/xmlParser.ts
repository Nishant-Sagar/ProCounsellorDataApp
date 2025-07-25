import { XMLParser } from 'fast-xml-parser';

export function parseXmlToJson(xmlString: string) {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '',
    parseAttributeValue: true,
    trimValues: true,
    processEntities: true,
    htmlEntities: false
  });
  
  try {
    const json = parser.parse(xmlString);
    console.log('Parsed XML to JSON:', json);
    
    // Extract the main data - could be in HashMap or root level
    const result = json.HashMap || json;
    console.log('Final result:', result);
    
    return result;
  } catch (error) {
    console.error('Error parsing XML:', error);
    throw error;
  }
}
