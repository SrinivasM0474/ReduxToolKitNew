import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/cartSlice";
import { getProducts } from "../store/productSlice";
import Alert from "react-bootstrap/Alert";
import StatusCode from "../utils/StatusCode";

const Product = () => {
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  if (status === StatusCode.LOADING) {
    return <p>Loading...</p>;
  }
  if (status === StatusCode.ERROR) {
    return (
      <Alert variant="danger" key="danger">
        Something went wrong...
      </Alert>
    );
  }

  const addToCart = (product) => {
    dispatch(add(product));
  };

  const cards = products?.map((product) => (
    <div className="col-md-3 mb-3" key={product.id}>
      <Card style={{ width: "18rem" }} className="h-100">
        <div className="text-center">
          <Card.Img
            variant="top"
            src={product.image}
            style={{ width: "100px", height: "130px" }}
          />
        </div>
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>INR. {product.price}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-center">
          <Button
            variant="primary"
            onClick={() => {
              addToCart(product);
            }}
          >
            Add To Cart
          </Button>
        </Card.Footer>
      </Card>
    </div>
  ));
  return (
    <>
      <div className="row m-0">{cards}</div>
    </>
  );
};

export default Product;
