import React from 'react';
import './ProductDetails.css';
import Spinner from '../Spinner/Spinner';
import CloseIcon from '@material-ui/icons/Close';

const productDetails = props => {
  let product = props && props.productDetails;
  let productId = product[0];
  let productData = product[1];

  return (
    <>
      {productData ? 
        <div>
          <div className="image-body">
            {props.productCount && props.productCount > 1 ? 
              <div className="close-icon" onClick={() => props.removeProduct(productId)}>
                <CloseIcon />
              </div> : null
            }
            <img src={productData.images} alt={productData['title']} className="image-size" />
          </div>
          <div className="height-50">
            <span className="d-flex align-items-center product-name">
              {productData.title}
            </span>
            <div className="mt-2">
              <span className="mr-2"><strong>&#8377;{parseInt(productData.finalPrice)}</strong></span>
              <span className="text-muted"><del>&#8377;{parseInt(productData.price)}</del></span>
              <span className="text-success font-weight-bolder ml-2">{`${productData.discount}% off`}</span>
            </div>
          </div>
          <ul>
            {props && props.isChecked ? 
              props.isDifferent && props.isDifferent.map((data, index) => {
                return <li key={`${data.value}${index}`} className={data.class}>{data.value && data.value === 'No' ? '-' : data.value === '' ? '' : 'Yes'}</li>
              }) :
              productData.property.map((data, index) => (
                <li key={`${data.value}${index}`} className={data.class}>{data.value}</li>
              ))
            }
          </ul>
        </div> : 
        <Spinner />
      }
    </>
  );
};

export default productDetails;