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

const Account = () => {
    const [cookies] = useCookies(['auth_token']);
    const accNameRef = useRef();
    const bankName = useRef();
    const accID = useRef();
    const accBalance = useRef();
    const currency_id_ref = useRef(); 
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [userAccounts, setUserAccounts] = useState([]);

    const getAccounts = async () => {
        const response = await fetch(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/account`,
            {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${cookies.auth_token}`,
                },
            }
        );
        const accounts = await response.json(); 
        return accounts; 
    }; 

    const createAccount = async (body) => {
        // same endpoint value but the difference with the get function is the method type, this one is POST 
        const response = await fetch(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/account`,
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
        const name = accNameRef.current.value; 
        const bank_name = bankName.current.value; 
        const account_id = accID.current.value; 
        const account_balance = accBalance.current.value; 
        const currency_id = currency_id_ref.current.value; 

        // validate data provided 
        if (name === '' || bank_name === '' || account_id === '' || account_balance === '' || currency_id === '') return; 

        // disable extra submit 
        setDisableSubmit(true); 

        try {
            await createAccount({ name, bank_name, account_id, account_balance, currency_id});
            const accounts = await getAccounts(); 
            setUserAccounts(accounts.data);

        } catch (error) {
            console.log(error); 
        }

        setDisableSubmit(false); 
        bankName.current.value = ''; 
        accNameRef.current.value = ''; 
        accID.current.value = '';
        accBalance.current.value = ''; 
        currency_id_ref.current.value = ''; 


    };


    useEffect( () => {
        const getAllUserAccounts = async () => {
            const accounts = await getAccounts();
            console.log(accounts);
            setUserAccounts(accounts.data); 
        };
        getAllUserAccounts(); 

    }, []); 


    const userAccountsList = userAccounts.map((account) => {
        return (
            <ListGroup.Item key={account.account_id} action>
                <Card>
                    <Card.Body>
                        <Card.Title>{account.name}</Card.Title>
                        <Card.Text>{account.bank_name}</Card.Text>
                        <Card.Text>{account.account_id}</Card.Text>
                        <Card.Text>{account.account_balance}</Card.Text>
                        <Card.Text>{account.currency_id}</Card.Text>
                    </Card.Body>
                </Card>
            </ListGroup.Item>
        ); 
    }); 

    return (
        <Container fluid className="mt-5">
            <Row className="align-items-center justify-content-center">
                <Col
                md={5}
                className="d-flex align-items-center justify-content-center"
                >
                <Card style={{ width: '25rem' }}>
                    <Card.Body>
                    <Form onSubmit={onSubmitHandler}>
                        <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control placeholder="..." ref={accNameRef} />
                        </Form.Group>
                        </Row>
                        <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Bank name</Form.Label>
                            <Form.Control
                            placeholder="..."
                            as="textarea"
                            rows={3}
                            ref={bankName}
                            />
                        </Form.Group>
                        </Row>
                        <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Account number</Form.Label>
                            <Form.Control placeholder="..." ref={accID} />
                        </Form.Group>
                        </Row>
                        <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Account balance</Form.Label>
                            <Form.Control placeholder="..." ref={accBalance} />
                        </Form.Group>
                        </Row>
                        <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Currency ID</Form.Label>
                            <Form.Control placeholder="..." ref={currency_id_ref} />
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
                            Create account
                            </Button>
                        </Col>
                        </Row>
                    </Form>
                    </Card.Body>
                </Card>
                </Col>
                <Col md={3} className="d-flex align-items-start justify-content-center">
                <ListGroup>{userAccountsList}</ListGroup>
                </Col>
            </Row>
        </Container>
    );


};

export default Account; 