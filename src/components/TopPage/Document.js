import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PDFDocument from "../Documents/Document";
import { GET_DOCUMENTS } from "../../graphql";
import { useQuery } from "@apollo/client";

export default function Doc() {
    const { loading, error, data } = useQuery(GET_DOCUMENTS, {
        variables: {
            paginationInput: {
                first: 3,
                offset: 0,
            },
        },
    });

    if (loading) return <Container><h1>loading...</h1></Container>;
    if (error) return <Container><h1>error!</h1></Container>;

    return (
        <div>
            <h3>showing documentation</h3>
            <Container>
                {
                    data.docs.edges.map(edge => {
                        return(
                            <Row key={edge.cursor}>
                                <Col xs={12} md={6}>
                                    <PDFDocument file={edge.node.file} title={edge.node.title} />
                                </Col>
                            </Row>
                        );
                    })
                }
            </Container>
        </div>
    );
}
