import React, { Component } from 'react';
import './CompareTable.css';
import NoProductComponent from '../EmptyImage/NoProductComponent';
import ProductDetails from '../ProductDetails/ProductDetails';
import Checkbox from '@material-ui/core/Checkbox';

class CompareTable extends Component {

  state = {
    isChecked: false,
    products: [],
    productTitles: [],
    propertyHeaders: [],
    activeProduct: [],
    isDifferentArray: []
  }

  componentDidMount() {
    this.getProductTitles();
    this.getMainColumnHeaders();
    this.reformatData();
  }
  
  // Setting main headings of products
  getMainColumnHeaders = () => {
    let propertyArray = [];

    this.props.featuresData && this.props.featuresData.forEach((data, index) => {
      propertyArray.push(
        <li key={`${data.title}${index}`} className="header"><strong>{data.title.toUpperCase()}</strong></li>
      );

      data.features.forEach((el, ind) => {
        propertyArray.push(
          <li key={`${el.featureName}${ind}`}><strong>{el.featureName}</strong></li>
        );
      })
    });
    
    this.setState({ propertyHeaders: propertyArray })
  }

  reformatData = () => {
    const { compareData, featuresData } = this.props;
    let products = compareData && compareData.titles;
    let differentData = [];
    
		for (let keys in products) {
      products[keys].images = compareData.images[keys];
      products[keys].price = compareData.productPricingSummary[keys].price;
      products[keys].finalPrice = compareData.productPricingSummary[keys].finalPrice;
      products[keys].discount = compareData.productPricingSummary[keys].totalDiscount;
			products[keys].property = [];
    }
    
    featuresData && featuresData.forEach(i => {
			for (let values in products) {
				products[values].property.push({ value: '', class: 'header' })
      }

      differentData.push({ value: '', class: 'header' });

			i.features.forEach(j => {
        if(j.hasOwnProperty('properties') && j.properties.isDifferent) {// setting isDifferent values
          differentData.push({value: j.featureName});
        } else {
          differentData.push({ value: 'No' });
        }

				for (let keys in j.values) {
					products[keys].property.push({ value: j.values[keys]})
				}
			})
    });

    let finalData = products && Object.entries(products);
    
		this.setState({ products: finalData, isDifferentArray: differentData }, () => {
      let firstProduct = finalData[0];
      this.getDefaultProduct(firstProduct);
    });
  }

  // Setting a default product on first render
  getDefaultProduct = product => {
    this.setState({ activeProduct : [product] }, () => {
      this.getProductTitles()
    })
  }

  // Preparing dropdown product list
  getProductTitles = () => {
    const { products, activeProduct } = this.state;

    let productData = [];
    products && products.map(data => (
      productData.push(data)
    ));

    let activeProductList = [...activeProduct];
    productData = productData.filter(val => !activeProductList.includes(val));
    
    let arr = [];
    productData.map(data => (
      arr.push({
        id: data[0],
        title: data[1].title
      })
    ));

    this.setState({ productTitles: arr });
  }

  // Remove a product
  handleRemoveProduct = productId => {
    const { activeProduct } = this.state;
    let activeProductList = [...activeProduct];
    let newArray = activeProductList.filter(id => id[0] !== productId);

    this.setState({ activeProduct: newArray }, () => {
      this.getProductTitles();
    })

  }

  // Selecting a product from dropdown
  handleSelectChange = event => {
    let id = event.target.value;
    const { activeProduct, products } = this.state;
    const oldProductList = [...activeProduct];
    const newProduct = products.filter(data => data[0] === id);
    let finalArray = oldProductList.concat(newProduct);

    this.setState({ activeProduct: finalArray}, () => {
      this.getProductTitles()
    });
  }

  handleCheckbox = (event) => {
    this.setState({ isChecked: event.target.checked });
  }

  render() {
    const { 
      propertyHeaders, 
      productTitles, 
      isChecked, 
      activeProduct,
      isDifferentArray
    } = this.state;
    let productData = [];

    activeProduct && activeProduct.map((data, index) => (
      productData.push(
        <div className="col" key={`${data[index]}${index}`}>
          <ProductDetails 
            productDetails={data}
            removeProduct={this.handleRemoveProduct}
            productCount={activeProduct.length}
            isDifferent={isDifferentArray}
            isChecked={isChecked}
          />
        </div>
      )
    ));

    return (
      <div>
        <div className="row no-gutters">
          <div className="col">
            <div className="image-block ml-2">
              <h2>Compare</h2>
              { activeProduct && activeProduct.length > 1 ? `${activeProduct.length} items selected` : '1 item selected'  }
            </div>
            <div className="height-50 show-difference">
              <Checkbox
                onChange={this.handleCheckbox}
                className="mb-2"
                checked={isChecked}
                color="primary"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
              />
              <h5>Show only differences</h5>
            </div>
            <div>
              <ul>
                {propertyHeaders}
              </ul>
            </div>
          </div>
          {productData}
          {activeProduct && activeProduct.length < 4 ?
            <div className="col">
              <NoProductComponent 
                productDetails={activeProduct[0]}
                productTitles={productTitles}
                handleChange={this.handleSelectChange}
              /> 
            </div> : null 
          }
        </div>
      </div>
    );
  }
}

export default CompareTable;
