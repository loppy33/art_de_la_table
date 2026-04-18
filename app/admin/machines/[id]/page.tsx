import MachineForm from '../MachineForm'
export default function EditMachinePage({ params }: { params: { id: string } }) {
  return <MachineForm id={params.id} />
}