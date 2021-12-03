import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import BookForm from '../shared/BookForm'
import Layout from '../shared/Layout'

function BookCreate () {
  // constructor (props) {
  //   super(props)
  //   this.state = {
  //     book: {
  //       title: '',
  //       author: ''
  //     },
  //     createdBookId: null
  //   }
  // }
  const [createdBookId, setCreatedBookId] = useState(null)
  const [book, setBook] = useState({ title: '', author: '' })

  const handleChange = event => {
    event.persist()
    // this.setState will turn into setBook
    // to maintain a cohesive syntax, were going to change prevState to prevBook
    setBook(prevBook => {
      const updatedField = { [event.target.name]: event.target.value }

      const editedBook = Object.assign({}, prevBook, updatedField)

      return editedBook
    })
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/books`,
      method: 'POST',
      data: { book }
    })
      .then(res => setCreatedBookId(res.data.book._id))
      .catch(console.error)
  }

  if (createdBookId) {
    return <Redirect to={`/books/${createdBookId}`} />
  }

  return (
    <Layout>
      <BookForm
        book={book}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath="/"
      />
    </Layout>
  )
}

export default BookCreate
