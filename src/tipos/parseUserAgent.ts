import { UAParser } from "ua-parser-js";

interface UserAgentInfo {
  os: string;
  browser: string;
  browserVersion: string;
}

export function parseUserAgent(userAgent: string): UserAgentInfo {
  const parser = new UAParser(userAgent);
  const result = parser.getResult();

  return {
    os: result.os.name || "Desconocido",
    browser: result.browser.name || "Desconocido",
    browserVersion: result.browser.version || "Desconocido",
  };
}
