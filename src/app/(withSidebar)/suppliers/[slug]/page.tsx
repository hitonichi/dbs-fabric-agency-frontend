export default function Page({ params }: { params: { slug: string } }) {
  return <div>Supplier info: ID - {params.slug}</div>;
}
