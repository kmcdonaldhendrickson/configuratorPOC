LAYOUT = "import type { Metadata } from \"next\";\nimport \"./globals.css\";\n\nexport const metadata: Metadata = {\n  title: \"Hendrickson APAC POC\",\n  description: \"Hendrickson customer portal\",\n};\n\nexport default function RootLayout({\n  children,\n}: Readonly<{\n  children: React.ReactNode;\n}>) {\n  return (\n    <html lang=\"en\">\n      <body className=\"min-h-screen bg-brand-gray text-brand-black\">\n        {children}\n      </body>\n    </html>\n  );\n}\n"

with open("app/layout.tsx", "w") as f:
    f.write(LAYOUT)
print("Wrote app/layout.tsx with updated title")
