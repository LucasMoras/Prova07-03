import { useEffect, useState } from "react";
import "./pagina.css";

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => {
        const gymProducts = data.products.filter((product) =>
          product.category.toLowerCase().includes("fitness")
        );
        const translatedProducts = gymProducts.map((product) => ({
          ...product,
          title: translateTitle(product.title),
        }));

        setProducts(translatedProducts);
      });
  }, []);

  if (products.length === 0) return <div>Carregando...</div>;

  return (
    <div className="grid-container">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <div className="product-header">
            <h2>{product.title}</h2>
          </div>
          <img
            src={product.thumbnail}
            alt={product.title}
            className="product-image"
          />
          <p className="description">{product.description}</p>
          <p className="price">R$ {product.price.toFixed(2)}</p>
          <button className="buy-button">Comprar</button>
        </div>
      ))}
    </div>
  );
};

const translateTitle = (title) => {
  const translations = {
    "Dumbbell Set": "Conjunto de Halteres",
    Treadmill: "Esteira",
    "Resistance Bands": "Faixas de Resistência",
    "Yoga Mat": "Tapete de Yoga",
    Kettlebell: "Kettlebell",
    "Protein Powder": "Pó de Proteína",
    "Pull-up Bar": "Barra Fixa",
    "Jump Rope": "Corda de Pular",
    "Bench Press": "Banco de Supino",
    "Exercise Bike": "Bicicleta Ergométrica",
  };
  return translations[title] || title;
};

export default ProductsList;
