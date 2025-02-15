
import { useEffect, useState } from 'react'
import './../BookModal/BookModal.css'
import { createBook, fetchBook } from '../../../api/booksApi'
import Loader from '../../Loader/Loader'
import  { useData } from './../../../context/DataContext';
import { updateBook } from '../../../api/booksApi'
import { showAlertError, showAlertSuccess } from '../../../utils/toastify'
import './BookForm.css';

const BookForm = ({ closeModal, id, action, onUpdate }) => {
    
    const { authors, departments, publishers }  = useData();
    const [edit, setEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({
        title: "",
        edition: "",
        total_quantity: 0,
        remaining: 0,
        price: 0,
        department_id: "",
        author_id: "",
        is_active: "",
        author: ""
    });

    const handleSave = (e) => {
        e.preventDefault()

        if (action === 'Edit') {
            const updateData = async data => {

                try {
                    setIsLoading(true);
                    const response = await updateBook(data);
                    data.author = updatedName(data.author_id, 'author')
                    data.department = updatedName(data.department_id, 'department')
                    onUpdate(data)
                    showAlertSuccess(response.message)
                } catch (error) {
                    console.log(error)
                    showAlertError("Something went Wrong")
                    return error
                } finally {
                    setIsLoading(false);
                    closeModal()
                }
            }
            updateData(data)
        } 

        if (action === 'Create') 
        {
            const createData = async data => {
                try {

                    setIsLoading(false)
                    const response = await createBook(data);
                    showAlertSuccess(response.message)

                } catch (error) {
                    return error
                } finally {
                    setIsLoading(false);
                    closeModal()
                }
            }

            createData(data)
        }

    }

    const updatedName = (typeId, type) => {
        let name;
        if (type === 'department') {
            const department = departments.data.find(department => department.id == typeId)    
            name = department.name;
        } 
        
        if (type === 'author') {
            const author = authors.data.find(author => author.id == typeId)    
            name = author.first_name + ' ' + author.last_name;
        }
        return name;
    }

    const handleChange = e => {
        const {name, value} = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    useEffect(() => {
        if (id && action !== 'Create') {
            const fetchData = async () => {

                try {
                  setIsLoading(true)
                  const bookData = await fetchBook(id)
                  const response = bookData.data
                  setData(response)
               
                } catch (error) {
                    return error
                } finally {
                    setIsLoading(false)
                }
            }
            fetchData()
        } 

        if (action === 'Show') {
            setEdit(true)
        }

    }, [id, action])

    if (isLoading && action !== 'Create') {
        return (
            <div className="modal-container">
                <div className="modal">
                    <Loader/>
                </div>
            </div>
        );
    }
   
    return (
        <div className="modal-container" 
            onClick={(e) => {
                if (e.target.className === 'modal-container') closeModal()
            }
            }>
           <div className='book-modal'>
  <form onSubmit={handleSave}>
    <div className='book-form-group'>
      <label htmlFor="title">Name / Title</label>
      <input 
        name="title"
        className="book-input"
        onChange={handleChange}
        value={data.title}
        disabled={edit}
        placeholder="Enter Name or Title"
        required
      />
    </div>

    <div className='book-form-group'>
      <label htmlFor="author">Edition</label>
      <textarea
        className="book-input"
        name="edition"
        onChange={handleChange}
        value={data.edition}
        rows={4}
        cols={4}
        disabled={edit}
        placeholder="Enter Edition"
        required
      />
    </div>

    <div className='book-form-group book-inline-inputs'>
      <div className='book-input-container'>
        <label htmlFor="total_quantity">Quantity</label>
        <input 
          name="total_quantity"
          className="book-input"
          onChange={handleChange}
          value={data.total_quantity}
          type="number"
          disabled={edit}
          placeholder="Enter Quantity"
          required
          min="1"
        />
      </div>
      
      <div className='book-input-container'>
        <label htmlFor="remaining">Remaining</label>
        <input 
          name="remaining"
          className="book-input"
          onChange={handleChange}
          value={data.remaining}
          type="number"
          disabled={edit}
          placeholder="Enter Remaining Quantity"
          required
          min="0"
        />
      </div>
    </div>
    
    <div className='book-form-group book-inline-inputs'>
    <div className='book-input-container'>
      <label htmlFor="acquired_via">Acquired Via</label>
      <input 
        name="acquired_via"
        className="book-input"
        onChange={handleChange}
        value={data.acquired_via}
        type="text"
        disabled={edit}
        placeholder="Enter Acquisition Method"
      />
    </div>

    <div className='book-input-container'>
      <label htmlFor="price">Price</label>
      <input 
        name="price"
        className="book-input"
        onChange={handleChange}
        value={data.price}
        disabled={edit}
        placeholder="Enter Price"
        required
        min="0"
      />
    </div>
    </div>
    

    <div className='book-form-group'>
      <label htmlFor="department">Department</label>
      {departments && 
        <select
          className="book-input"
          onChange={handleChange}
          name="department_id"
          id="department_id"
          value={data.department_id}
          disabled={edit}
          required
        >
          <option value="" disabled>Select Department</option>
          {departments.data.map(department => (
            <option value={department.id} key={department.id}>{department.name}</option>
          ))}
        </select>
      }
    </div>

    <div className='book-form-group'>
      <label htmlFor="author">Author</label>
      {authors && 
        <select
         className="book-input"
          name="author_id"
          id="author_id"
          onChange={handleChange}
          value={data.author_id}
          disabled={edit}
          required
        >
          <option value="" disabled>Select Author</option>
          {authors.data.map(author => (
            <option value={author.id} key={author.id}>{author.first_name} {author.last_name}</option>
          ))}
        </select>
      }
    </div>

    <div className='book-form-group'>
      <label htmlFor="publisher">Publisher</label>
      {publishers && 
        <select
         className="book-input"
          name="publisher_id"
          id="publisher_id"
          onChange={handleChange}
          value={data.publisher_id}
          disabled={edit}
          required
        >
          <option value="" disabled>Select Publisher</option>
          {publishers.data.map(publisher => (
            <option value={publisher.id} key={publisher.id}>{publisher.name}</option>
          ))}
        </select>
      }
    </div>

    <div className='book-form-group'>
  <label htmlFor='is_active'>Status</label>
  <div
    className={`toggle-button ${data.is_active === 1 ? 'on' : 'off'}`}
    onClick={() => handleChange({ target: { name: 'is_active', value: data.is_active === 1 ? 0 : 1 } })}
  >
    <span className={`toggle-indicator`}></span>
  </div>
</div>

    {action !== 'Show' && 
      <button className="book-btn" type='submit'>
        Submit
      </button>
    }
  </form>
</div>

        </div>   
    )
}


export default BookForm;