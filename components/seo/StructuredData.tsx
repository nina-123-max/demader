type StructuredDataProps = {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
};

/** Inserta JSON-LD estático sin permitir que el carácter "<" cierre el script. */
export function StructuredData({ data }: StructuredDataProps) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
