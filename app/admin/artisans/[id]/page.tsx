import ArtisanForm from "../ArtisanForm";

export default function EditArtisanPage({ params }: { params: { id: string } }) {
  return <ArtisanForm id={params.id} />
}