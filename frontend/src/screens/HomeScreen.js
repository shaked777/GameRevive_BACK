import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProducts } from "../actions/productActions";
import { useLocation } from "react-router-dom";

function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;
  const location = useLocation();
  let keyword = location.search;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <div>
      <div>
        <center>
          <h1>GameRevive</h1>
          <h6>
            Welcome to our online store for used games! <br /> <br /> Our
            selection includes both classic and newer titles, so you're sure to
            find something you love. <br /> <br />
            We pride ourselves on providing high-quality, affordable games that
            you can enjoy for hours on end.
            <br /> <br />
            Explore our collection today and find your next favorite game!
          </h6>
        </center>
      </div>
      <br />
      <br />
      <center>
        <h4>Our Best Seller</h4>
      </center>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map(
            (product) =>
              product._id <= 3 && (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              )
          )}
        </Row>
      )}

      <br />
      <br />
      <center>
        <h4>All Products</h4>
      </center>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map(
            (product) =>
              product._id >= 4 && (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              )
          )}
        </Row>
      )}
    </div>
  );
}

export default HomeScreen;
