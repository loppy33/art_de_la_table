import ArtisanForm from "../ArtisanForm";

export default async function EditArtisanPage({ params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <ArtisanForm id={id} />
}