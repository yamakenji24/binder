import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import PDFDocument from "../Documents/Document";
import { GET_DOCUMENTS } from "../../graphql";
import { useQuery } from "@apollo/client";

const DEFAULT_DISPLAYED = 2;

export default function Doc() {
    const [page, setPage] = useState(0)
    const { loading, error, data, fetchMore } = useQuery(GET_DOCUMENTS, {
        variables: {
            paginationInput: {
                first: DEFAULT_DISPLAYED,
                offset: 0,
            },
        },
    });

    const fetchNext = () => {
        fetchMore({
            variables: {
                paginationInput: {
                    first: DEFAULT_DISPLAYED,
                    offset: DEFAULT_DISPLAYED * (page+1),
                }
            }
        });
        setPage(page+1);
    };

    const fetchPrev = () => {
        fetchMore({
            variables: {
                paginationInput: {
                    first: DEFAULT_DISPLAYED,
                    offset: DEFAULT_DISPLAYED * (page-1),
                }
            }
        });
        setPage(page-1);
    };

    if (loading) return <Container><h1>loading...</h1></Container>;
    if (error) return <Container><h1>error!</h1></Container>;

    return (
        <div>
        <p>{page}ページ</p>
        <h3>showing documentation</h3>
        <Container>
        <p>{data.docs.edges.length}</p>
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
        { 0 < page ? <Button variant="success" onClick={fetchPrev} >prev</Button> : <Button variant="secondary" onClick={fetchPrev} disabled>prev</Button>}
        { (page+1) * DEFAULT_DISPLAYED < data.docs.total ? <Button variant="primary" onClick={fetchNext}>next</Button> : <Button variant="secondary" onClick={fetchNext} disabled>next</Button>}

        </div>
    );
}
