export default function Product({ params }: { params: { id: string } }) {
  return <h1>Product: {JSON.stringify(params)}</h1>;
}
