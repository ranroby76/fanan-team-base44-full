import React from "react";
import ProductPage from "../components/ProductPage";

export default function AnyImage() {
  return (
    <ProductPage
      productName="AnyImage"
      productDescription="Image Album Generator"
      productImage="https://fananteam.com/images/anyimage1.jpg"
      packName="Max! Pack"
      packLink="/MaxPack"
    />
  );
}