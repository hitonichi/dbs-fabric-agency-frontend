export default function Page({ params }: { params: { slug: string } }) {
  return <div>Fabric info: ID - {params.slug}</div>;
}
