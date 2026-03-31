export function cn(...values: Array<string | false | undefined | null>) {
  return values.filter(Boolean).join(" ");
}

export function formatDateTime(value?: string | null) {
  if (!value) return "-";
  return new Date(value).toLocaleString();
}
