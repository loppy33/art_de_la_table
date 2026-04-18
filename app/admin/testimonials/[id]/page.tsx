import TestimonialForm from "../TestimonialForm";

export default function EditTestimonialPage({ params }: { params: { id: string } }) {
  return <TestimonialForm id={params.id} />
}
 