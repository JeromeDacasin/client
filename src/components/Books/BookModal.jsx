
import { useEffect, useState } from 'react'
import './BookModal.css'
import { fetchBook } from '../../api/booksApi'
import Loader from '../Loader/Loader'


const BookModal = ({ closeModal, id, action }) => {
    const [data, setData] = useState(null);
    const [edit, setEdit] = useState(action === 'edit');
    
    useEffect(() => {
        if (id) {
            setEdit(action === 'edit')
            const fetchData = async () => {

                try {
                  const bookData = await fetchBook(id)
                  const response = bookData.data
                 
                  setData(response)
               
                } catch (error) {
                    return error
                }
            }
            fetchData()
        } 
    }, [id, action])

    if (data === null && action !== 'create') {
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
                <form action="">
                    <div className='form-group'>
                        <label htmlFor="name">Name / Title</label>
                        <input name="name" defaultValue={data?.name} disabled={!edit}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="author">Edition</label>
                        <textarea name="edition" defaultValue={data?.edition} rows={4} cols={4} disabled={!edit}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="quantity">Quantity</label>
                        <input name="quantity" defaultValue={data?.quantity} type="number" disabled={!edit}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="price">Price</label>
                        <input name="price" defaultValue={data?.price}  disabled={!edit}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="author">Author</label>
                        <input name="author" disabled={!edit} />
                    </div>
                    <div className='form-group'>
                        <select name="status">Status
                            <option value="0">Available</option>
                            <option value="1">Unavailable</option>
                        </select>
                    </div>
                    {(edit || action === 'create') && <button className="btn" type='submit'>Submit</button>}
                </form>
            </div>
        </div>   
    )
}


export default BookModal;