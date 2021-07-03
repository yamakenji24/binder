import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PDFDocument({ file, title }) {
    const [numPages, setNumPage] = useState(null);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPage(numPages);
    };
    return (
        <div>
            <h2>{title}</h2>
            <div style={{ border: "1px solid gray" }}>
                <Document
                    file={file}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    <Page
                        pageNumber={1}
                        width={300}
                    />
                </Document>
            </div>
        </div>
    );
}

