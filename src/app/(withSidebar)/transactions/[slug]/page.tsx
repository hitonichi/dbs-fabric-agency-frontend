export default function Page({ params }: { params: { slug: string } }) {
  return <div>Transaction info: ID - {params.slug}</div>;
}
