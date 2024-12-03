
import { useEffect, useState } from 'react'
import './BookModal.css'
import { createBook, fetchBook } from '../../../api/booksApi'
import Loader from '../../Loader/Loader'
import { useData } from '../../../context/DataContext'
import { updateBook } from '../../../api/booksApi'
import { showAlertSuccess } from '../../../utils/toastify'

const BookModal = ({ closeModal, id, action, onUpdate }) => {
    
    const { authors, departments }  = useData();
    
    const [edit, setEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({
        name: "",
        edition: "",
        quantity: 0,
        price: 0,
        department_id: "",
        author_id: "",
        status: "",
        author: ""
    });

    const handleSave = (e) => {
        e.preventDefault()

        if (action === 'edit') {
            const updateData = async data => {

                try {
                    setIsLoading(true);
                    const response = await updateBook(data);
                    data.author = updatedName(data.author_id, 'author')
                    data.department = updatedName(data.department_id, 'department')
                    onUpdate(data)
                    showAlertSuccess(response.message)
                } catch (error) {
                    return error
                } finally {
                    setIsLoading(false);
                    closeModal()
                }
            }
            updateData(data)
        } 

        if (action === 'create') 
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
            const department = departments.find(department => department.id == typeId)    
            name = department.name;
        } 
        
        if (type === 'author') {
            const author = authors.find(author => author.id == typeId)    
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
        if (id && action !== 'create') {
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

        if (action === 'show') {
            setEdit(true)
        }

    }, [id, action])

    if (isLoading && action !== 'create') {
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
            <div className='modal'>
                <form onSubmit={handleSave}>
                    <div className='form-group'>
                        <label htmlFor="name">Name / Title</label>
                        <input name="name"
                            onChange={handleChange}
                            value={data.name} 
                            disabled={edit}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="author">Edition</label>
                        <textarea name="edition" 
                            onChange={handleChange}
                            value={data.edition}
                            rows={4} 
                            cols={4} 
                            disabled={edit}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="quantity">Quantity</label>
                        <input name="quantity" 
                            onChange={handleChange}
                            value={data.quantity} 
                            type="number" 
                            disabled={edit}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="price">Price</label>
                        <input name="price" 
                            onChange={handleChange}
                            value={data.price}  
                            disabled={edit}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="department">Department</label>
                        { departments && 
                            <select 
                                onChange={handleChange}
                                name="department_id" 
                                id="department_id" 
                                value={data.department_id}
                            >
                                {
                                    departments.map( department => (
                                        <option value={department.id} key={department.id}>{department.name}</option>
                                    ))
                                }
                            </select>
                        }
                    </div>
                    <div className='form-group'>
                        <label htmlFor="author">Author</label>
                        { authors && 
                            <select 
                                name="author_id" 
                                id="author_id" 
                                onChange={handleChange} 
                                value={data.author_id}
                            >
                                {
                                    authors.map( author => (
                                        <option value={author.id} key={author.id}>{author.first_name} {author.last_name}</option>
                                    ))
                                }
                            </select>
                        }
                    </div>
                    <div className='form-group'>
                        <label htmlFor='status'>Status</label>
                        <select name="status" value={data.status} onChange={handleChange}>Status
                            <option value={0}>Unavailable</option>
                            <option value={1}>Available</option>
                        </select>
                    </div>
                    {   action !== 'show' && 
                        <button 
                            className="btn" 
                            type='submit'
                        >
                            Submit
                        </button>
                    }
                </form>
            </div>
        </div>   
    )
}


export default BookModal;