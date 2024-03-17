export default interface BingMapResponse {
  authenticationResultCode: string;
  brandLogoUri: string;
  copyright: string;
  resourceSets?: ResourceSetsEntity[] | null;
  statusCode: number;
  statusDescription: string;
  traceId: string;
}
interface ResourceSetsEntity {
  estimatedTotal: number;
  resources?: ResourcesEntity[] | null;
}
interface ResourcesEntity {
  __type: string;
  bbox?: number[] | null;
  name: string;
  point: Point;
  address: Address;
  confidence: string;
  entityType: string;
  geocodePoints?: GeocodePointsEntity[] | null;
  matchCodes?: string[] | null;
  queryParseValues?: QueryParseValuesEntity[] | null;
}
interface Point {
  type: string;
  coordinates?: number[] | null;
}
interface Address {
  addressLine: string;
  adminDistrict: string;
  adminDistrict2: string;
  countryRegion: string;
  formattedAddress: string;
  locality: string;
  postalCode: string;
}
interface GeocodePointsEntity {
  type: string;
  coordinates?: number[] | null;
  calculationMethod: string;
  usageTypes?: string[] | null;
}
interface QueryParseValuesEntity {
  property: string;
  value: string;
}
