import ProductTable from "@/features/products/table";

export default function Homepage({ products }) {
  return (
    <div className="mt-16 container mx-auto">
      <ProductTable {...{ products }} />
    </div>
  );
}

export function getServerSideProps(req) {
  const products = require("@/data/products.json");
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
