import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import React from "react";
import Rating from "./Rating";
import { Container } from "react-bootstrap";

function Product({ product }) {
  return (
    <Container>
      <Card
        style={{ width: "17rem", height: "35rem" }}
        className="my-3 p-3 rounded"
      >
        <Link to={`/product/${product._id}`}>
          <Card.Img style={{ height: "20rem" }} src={product.image} />
        </Link>

        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as="div">
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>
          <Card.Text as="div">
            <div className="my-3">
              <Rating
                value={product.rating}
                text={`${product.numReviews} Reviews`}
                color={"#f8e825"}
              />
            </div>
          </Card.Text>
          <Card.Text as="h3">${product.price}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Product;
