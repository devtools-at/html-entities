/**
 * HTML Entities
 * Encode/decode HTML entities
 *
 * Online tool: https://devtools.at/tools/html-entities
 *
 * @packageDocumentation
 */

function encodeHtmlEntities(text: string, useNumeric = false): string {
  const entityMap = useNumeric ? NUMERIC_ENTITY_MAP : NAMED_ENTITY_MAP;
  return text.replace(/[&<>"'©®™€£¥¢§°±×÷←→↑↓ ]/g, (char) => {
    return entityMap[char] || `&#${char.charCodeAt(0)};`;
  });
}

function decodeHtmlEntities(text: string): string {
  // Safe HTML entity decoding without innerHTML XSS risk
  // Single-pass replacement for named entities using pre-built map and regex
  return text
    // Named entities - single pass with lookup
    .replace(NAMED_ENTITY_REGEX, (match) => DECODE_MAP[match.toLowerCase()] || match)
    // Decimal numeric entities
    .replace(/&#(\d+);/g, (match, code) => {
      const num = parseInt(code, 10);
      return num > 0 && num <= 0x10FFFF ? String.fromCodePoint(num) : match;
    })
    // Hexadecimal numeric entities
    .replace(/&#x([0-9a-fA-F]+);/gi, (match, code) => {
      const num = parseInt(code, 16);
      return num > 0 && num <= 0x10FFFF ? String.fromCodePoint(num) : match;
    });
}

// Export for convenience
export default { encode, decode };
