export default function Page({ params }: { params: { slug: string } }) {
  return <div>Order info: ID - {params.slug}</div>;
}
