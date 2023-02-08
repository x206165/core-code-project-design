import { useCookies } from 'react-cookie';
import { useState, useEffect, useRef } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
  ListGroup,
} from 'react-bootstrap';

const Transaction = () => {
  const [cookies] = useCookies(['auth_token']);
  
  const debitAccountRef = useRef();
  const creditAccountRef = useRef();
  const descriptionRef = useRef();
  const accountNumberRef = useRef();
  const amountRef = useRef();
  const debitCurrencyRef = useRef();
  const creditCurrencyRef = useRef();

  const [disableSubmit, setDisableSubmit] = useState(false);
  const [userTransactions, setUserTransactions] = useState([]);

  const getTransactions = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/transaction`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.auth_token}`,
        },
      }
    );
    const transactions = await response.json();
    return transactions;
  };

  const createTransaction = async (body) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/transaction`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.auth_token}`,
        },
        body: JSON.stringify(body),
      }
    );
    await response.json();
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    const debitAccount = debitAccountRef.current.value;
    const creditAccount = creditAccountRef.current.value;
    const description = descriptionRef.current.value;
    const accountNumber = accountNumberRef.current.value;
    const amount = amountRef.current.value;
    const debitCurrency = debitCurrencyRef.current.value;
    const creditCurrency = creditCurrencyRef.current.value;
    
    //if (debitAccount === '' || creditAccount === '') return; //TODO
    setDisableSubmit(true);
    try {
      await createTransaction({ debitAccount, creditAccount, description, accountNumber, amount, debitCurrency, creditCurrency });
      const transactions = await getTransactions();
      setUserTransactions(transactions.data);
    } catch (error) {
      console.log(error);
    }
    setDisableSubmit(false);
    debitAccountRef.current.value = '';
    creditAccountRef.current.value = '';
    descriptionRef.current.value = '';
    accountNumberRef.current.value = '';
    amountRef.current.value = '';
    debitCurrencyRef.current.value = '';
    creditCurrencyRef.current.value = '';
    
  };

  useEffect(() => {
    const getAllUserTransactions = async () => {
      const transactions = await getTransactions();
      console.log(transactions);
      setUserTransactions(transactions.data);
    };
    getAllUserTransactions();
  }, []);

  const userTransactionsList = userTransactions.map((transaction) => {
    return (
      <ListGroup.Item key={transaction.transaction} action>
        <Card>
          <Card.Body>
            <Card.Title>{transaction.debitAccount}</Card.Title>
            <Card.Text>{transaction.creditAccount}</Card.Text>
            <Card.Text>{transaction.description}</Card.Text>
            <Card.Text>{transaction.accountNumber}</Card.Text>
            <Card.Text>{transaction.amount}</Card.Text>
            <Card.Text>{transaction.debitCurrency}</Card.Text>
            <Card.Text>{transaction.creditCurrency}</Card.Text>
          </Card.Body>
        </Card>
      </ListGroup.Item>
    );
  });

  return (
    <Container fluid className="mt-5">
      <Row className="align-items-center justify-content-center">
        <Col md={5} className="d-flex align-items-center justify-content-center">
          <Card style={{ width: '25rem' }}>
            <Card.Body>
              <Form onSubmit={onSubmitHandler}>
                <Row className="mb-3">
                  <Form.Group as={Row} controlId="formGridEmail">
                    <Col><Form.Label>Debit Account</Form.Label></Col>
                    <Col><Form.Control placeholder="" ref={debitAccountRef} /></Col>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Row} controlId="formGridEmail">
                    <Col><Form.Label>Credit Account</Form.Label></Col>
                    <Col><Form.Control placeholder="" ref={creditAccountRef} /></Col>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Row} controlId="formGridEmail">
                    <Col><Form.Label>Description</Form.Label></Col>
                    <Col><Form.Control placeholder="" ref={descriptionRef} /></Col>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Row} controlId="formGridEmail">
                    <Col><Form.Label>Account Number</Form.Label></Col>
                    <Col><Form.Control placeholder="" ref={accountNumberRef} /></Col>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Row} controlId="formGridEmail">
                    <Col><Form.Label>Amount</Form.Label></Col>
                    <Col><Form.Control placeholder="" ref={amountRef} /></Col>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Row} controlId="formGridEmail">
                    <Col><Form.Label>Debit Currency</Form.Label></Col>
                    <Col><Form.Control placeholder="" ref={debitCurrencyRef} /></Col>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Row} controlId="formGridEmail">
                    <Col><Form.Label>Credit Currency</Form.Label></Col>
                    <Col><Form.Control placeholder="" ref={creditCurrencyRef} /></Col>
                  </Form.Group>
                </Row>
                <Row className="mb-3 justify-content-end">
                  <Col className="d-flex justify-content-end">
                    <Button
                      disabled={disableSubmit}
                      variant="outline-success"
                      type="submit"
                      style={{ width: '100%' }}
                    >
                      {disableSubmit && (
                        <Spinner
                          as="span"
                          animation="grow"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      )}
                      Create transaction
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="d-flex align-items-start justify-content-center">
          <ListGroup>{userTransactionsList}</ListGroup>
        </Col>
      </Row>
    </Container>
  );
};
export default Transaction;
