import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  Alert,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";

function CartScreen() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [stripeMessage, setstripeMessage] = useState("");
  const location = useLocation();
  const { id } = useParams();
  const productId = id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [show, setShow] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    setShow(true);

    if (query.get("canceled")) {
      setstripeMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }

    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div>
      {stripeMessage && (
        <>
          <Alert show={show} variant="danger">
            <Alert.Heading>Somthing went worng</Alert.Heading>
            <p>
              Order canceled -- continue to shop around and checkout when you're
              ready.
            </p>
            <hr />
            <div className="d-flex justify-content-end">
              <Button onClick={() => setShow(false)} variant="">
                Close me
              </Button>
            </div>
          </Alert>
        </>
      )}

      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message variant="info">
              Your cart is empty <Link to="/">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>

                    <Col md={2}>${item.price}</Col>

                    <Col md={3}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>

                    <Col md={1}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>

        <Col md={4}>
          <form
            action="/api/stripe/create-checkout-session"
            method="POST"
          >
            <Card>
              <ListGroup variant="flush">
                <center>
                  <ListGroup.Item>
                    <h2>
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)} items
                    </h2>
                    <h5>
                      Total: $
                      {cartItems
                        .reduce((acc, item) => acc + item.qty * item.price, 0)
                        .toFixed(2)}
                    </h5>
                  </ListGroup.Item>
                </center>

                <ListGroup.Item className="d-grid gap-2">
                  {userInfo ? (
                    <Button
                      type="submit"
                      className="btn-block"
                      size="lg"
                      disabled={cartItems.length === 0}
                    >
                      Proceed To Checkout
                    </Button>
                  ) : (
                    <Link to="/login">LOGIN</Link>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </form>
        </Col>
      </Row>
    </div>
  );
}

export default CartScreen;
