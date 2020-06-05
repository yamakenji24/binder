import React, {useState, useRef} from 'react';
import NaviBar from '../TopPage/NaviBar';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Document, Page, pdfjs} from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PostDoc() {
  // この辺り整理が必要
  const [numPages, setNumPage] = useState(null)
  const [page, setPage] = useState(1)
  const [base64, setBase] = useState(null)
  const [name, setName] = useState(null)
  const fileInput = useRef()
  const titleInput = useRef()
  const tagInput = useRef()
  
  const handleChange = () => {
    const file = fileInput.current.files[0]
    
    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        setBase(reader.result)
        setName(file.name)
      }
    }
  }
  
  const submitPostData = () => {
    // DB に登録したい
    const title = titleInput.current._valueTracker.getValue()
    const tag = tagInput.current._valueTracker.getValue().split(' ')
    const file = fileInput.current.files[0]
    if (!title || !tag || !file) {
      console.log("failed")
    } else {
      console.log("success")
    }
  }
  const onDocumentLoadSuccess = ({numPages}) =>{
    setNumPage(numPages)
  }
  const handleButtonClick = (page) =>{
    setPage(page)
  }
  
  return (
    <div>
      <NaviBar />
      <h2>Document? の投稿ページ</h2>
      <Form>
        <Form.Group>
          <FormControl ref={titleInput} placeholder="Title" aria-label="Title" />
          <FormControl ref={tagInput} placeholder="関連するタグを？個まで登録できまっせ" aria-label="tag" />
        </Form.Group>
      </Form>
      <div className='pdfcomponent'>
        PDFを添付してください；
        <input type='file' ref={fileInput} onChange={handleChange}/>
        <Document 
          file={base64} style={{border: 'dotted 1px #aaa'}}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page 
            pageNumber={page}
            style={{border: 'solid 2px #000', height: 300}}
          />
        </Document>
        <div>{name}</div>
        <button disabled={page <= 1} onClick={() => handleButtonClick(page - 1)}>
          Prev
        </button>
        {page || 1} / {numPages || '-'}
        <button disabled={page >= numPages || !numPages} onClick={() => handleButtonClick(page + 1)}>
          Next
        </button>
        <br /> <br />

        <Button variant="success" onClick={submitPostData}>投稿する</Button>
      </div>
    </div>
  )
}
