import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { items } from './Data';
import Product from './Product';

const SearchItem = ({ cart, setCart }) => {
  const { term } = useParams();
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    const filteredData = items.filter((p) =>
      p.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilterData(filteredData);
  }, [term]);

  return <Product cart={cart} setCart={setCart} items={filterData} />;
};

export default SearchItem;
