import { useState } from "react";

function Filterable(Component, array, key, ...rest) {
  const [search, setSearch] = useState("");

  function filter(array) {
    return array.filter(
      (item) => item.name.toLowerCase().indexOf(search.toLowerCase()) > -1
    );
  }

  return (
    <>
      <input
        type="text"
        value=""
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <Component {...{ ...rest, [key]: filter(array) }} />
    </>
  );
}

export default function FilterableProductTable({ products = [] }) {
  return Filterable(ProductTable, products, "products");
}

function ProductTable({ products }) {
  const categories = [...new Set(products.map((product) => product.category))];

  return (
    <div className="mt-16 flex flex-col gap-3">
      <div className="flex items-center gap-6 font-medium text-lg">
        <div className="w-32">Name</div>
        <div>Price</div>
      </div>

      {categories.map((category) => (
        <div className="">
          <div className="font-medium text-large">{category}</div>
          <div className="font-thin">
            {products
              .filter((product) => product.category === category)
              .map((product) => (
                <div className="flex items-center gap-6">
                  {["name", "price"].map((column, i) => (
                    <div className={i === 0 ? "w-32" : ""}>
                      {product[column]}
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}
