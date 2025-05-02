import React from 'react'

function page() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Stores</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="p-6 rounded-lg border bg-card">
                <h2 className="font-semibold mb-2">Card {i + 1}</h2>
                <p className="text-sm text-muted-foreground">
                  This is some placeholder content for the dashboard.
                </p>
              </div>
            ))}
          </div>
    </div>
  )
}

export default page
