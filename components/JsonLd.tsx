/**
 * Renders structured data. Server-rendered into the HTML, so crawlers see it
 * without executing anything — and it costs zero client JavaScript.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          // JSON.stringify output is safe here: it comes from our own build-time
          // data, and we escape the one sequence that can break out of a script tag.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item).replace(/</g, '\\u003c'),
          }}
        />
      ))}
    </>
  );
}
