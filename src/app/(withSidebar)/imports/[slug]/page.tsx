import BackButton from '../../../../components/BackButton';

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <>
      {/* <BackButton /> */}
      <div>Import info: ID - {params.slug}</div>
    </>
  );
}
