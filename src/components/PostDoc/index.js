import React, {useState, useRef} from 'react';
import NaviBar from '../TopPage/NaviBar';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Document, Page, pdfjs} from 'react-pdf';
import {useMutation} from '@apollo/client';
import * as Graphql from '../../graphql';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PostDoc() {
  // この辺り整理が必要
  const [numPages, setNumPage] = useState(null)
  const [page, setPage] = useState(1)
  const [base64, setBase] = useState(null)
  const [name, setName] = useState(null)
  const [state, setState] = useState({
    titleInput: '',
    tagInput: '',
    description: ''
  })
  const fileInput = useRef()
  const [createDocument, {data, error}] = useMutation(Graphql.CREATEDOCUMENT, {
    onCompleted({createDocument}) {
      console.log(createDocument)
    },
    onError({error}) {
      console.log(error)
    }
  })
    
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
    const tag = state.tagInput.split(' ')
    if (!state.titleInput || !tag || !base64) {
      console.log("failed")
    } else {
      console.log(state.titleInput, state.description, base64)
      createDocument({
        variables: {
          documentInput: {
            "title": state.titleInput,
            "description": state.description,
            "file": base64.split(',')[1],
          }
        }
      })
    }
  }
  const onDocumentLoadSuccess = ({numPages}) =>{
    setNumPage(numPages)
  }
  const handleButtonClick = (page) =>{
    setPage(page)
  }

  const onChange = event => {
    setState({...state, [event.target.name]: event.target.value})
  }
  
  return (
    <div>
      <NaviBar />
      <h2>Document? の投稿ページ</h2>
      <Form>
        <Form.Group>
          <FormControl onChange={onChange} value={state.titleInput} name="titleInput" placeholder="Title" />
          <FormControl onChange={onChange} value={state.tagInput} name="tagInput" placeholder="関連するタグを？個まで登録できまっせ" />
          <FormControl onChange={onChange} value={state.description} name="description" placeholder="概要" type="text" />
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
