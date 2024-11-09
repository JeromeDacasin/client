import { Outlet } from "react-router-dom"
import BookList from "../components/Books/BookList"
import style from './../styles/books.module.css';

const book = () => {
    return (
        <div id={style.container}>
            <section>
                <BookList/>
            </section>
            <Outlet/>
        </div>
    )
}

export default book