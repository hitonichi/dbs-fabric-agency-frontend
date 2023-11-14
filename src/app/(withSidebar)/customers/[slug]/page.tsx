export default function Page({ params }: { params: { slug: string } }) {
  return <div>Customer info: ID - {params.slug}</div>;
}
