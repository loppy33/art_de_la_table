import TestimonialForm from "../TestimonialForm";

export default async function EditTestimonialPage({params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <TestimonialForm id={id} />
}
 