export function AdminSoon({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="px-4 py-8 sm:px-8">
      <h1 className="font-serif text-4xl text-cream">{title}</h1>
      <p className="mt-3 max-w-xl text-sm text-cream/70">{detail}</p>
    </div>
  );
}
