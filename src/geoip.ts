import maxmind, { CityResponse, Reader } from "maxmind";
import path from "path";

let lookup: Reader<CityResponse>;

export const initGeoIP = async () => {
  const dbPath = path.join(__dirname, "..", "GeoLite2-City.mmdb");
  lookup = await maxmind.open<CityResponse>(dbPath);
};

export const getGeoData = (ip: string): CityResponse | null => {
  return lookup.get(ip);
};
