import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { remove } from "../store/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartProducts = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const removeToCart = (id) => {
    dispatch(remove(id));
  };

  const cards = cartProducts.map((product) => (
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
            variant="danger"
            onClick={() => {
              removeToCart(product.id);
            }}
          >
            Remove Item
          </Button>
        </Card.Footer>
      </Card>
    </div>
  ));
  if (cartProducts.length === 0)
    return (
      <p className="text-center">
        <Button to="/" as={Link}>
          click
        </Button>
        to add products to cart
      </p>
    );

  return <div className="row m-0">{cards}</div>;
};

export default Cart;
