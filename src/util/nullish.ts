export function mapNonNullish(values: any[]) {
  return values.filter((value) => value != null);
}
