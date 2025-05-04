export default function FavsTab() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="p-6 rounded-lg border bg-card">
            <h2 className="font-semibold mb-2">Store {i + 1}</h2>
            <p className="text-sm text-muted-foreground">
              Placeholder for store card.
            </p>
          </div>
        ))}
      </div>
    )
  }