export function EmptyState({ title, description }: { title: string; description: string }) {
  return <div className="card text-center"><h3 className="text-lg font-bold">{title}</h3><p className="muted mt-2">{description}</p></div>;
}
