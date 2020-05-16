import React from 'react';
import './NoProductComponent.css';

const noProductComponent = props => {
  let productData = props && props.productDetails && props.productDetails[1];

  return (
    <>
      <div className="image-body">
        <div className="image-dummy"></div>
      </div>
      <div className="height-50 pl-4">
        <p className="m-0"><strong>Add a product</strong></p>
        <select 
          className="w-75 mt-2" 
          onChange={(event) => props.handleChange(event)}
        >
          <option value="">Choose A Product...</option>
          {props && props.productTitles.map(title => (
            <option key={title['id']} value={title['id']}>{title['title']}</option>
          ))}
        </select>
      </div>
      <ul>
        {productData && productData.property.map((data, index) => {
         return <li key={`${data.value}${index}`} className={data.class}></li>
        })}
      </ul>
    </>
  )
};

export default noProductComponent;
