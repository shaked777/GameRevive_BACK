import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";

import {
  listRecommendedProducts,
} from "../actions/productActions";

function Recommended() {
  const dispatch = useDispatch();
  const productRecommendedList = useSelector(
    (state) => state.productRecommendedList
  );
  const { error, loading, products } = productRecommendedList;
  const { id } = useParams();

  useEffect(() => {
    dispatch(listRecommendedProducts(id));
  }, [dispatch, id]);

  return (
    <div>
      <h3>Recommended Products</h3>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default Recommended;
