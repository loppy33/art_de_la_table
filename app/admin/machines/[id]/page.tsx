import MachineForm from '../MachineForm'
export default async function EditMachinePage({ params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <MachineForm id={id} />
}