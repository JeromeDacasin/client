import { faHouse, faBook, faFolderTree, faUserPen, faGraduationCap, faChalkboardTeacher, faBookOpen, faPesoSign, faScroll, faSync, faPencilAlt, faUserGear  } from "@fortawesome/free-solid-svg-icons"

export const adminMenu = [
    {
        title: 'Home',
        icon:  faHouse,
        link: '/home'

    },
    {
        title: 'Books',
        icon: faBook,
        link: '/books'
    },
    {
        title: 'Departments',
        icon: faFolderTree,
        link: '/departments'
    },
    {
        title: 'Authors',
        icon: faUserPen,
        link: '/authors'
    },
    {
        title: 'Students',
        icon: faGraduationCap,
        link: '/students'
    },
    {
        title: 'Teachers',
        icon: faChalkboardTeacher,
        link: '/teachers'
    },
    {
        title: 'Publishers',
        icon: faBookOpen,
        link: '/publishers'
    },
    {
        title: 'Roles',
        icon: faUserGear,
        link: '/roles'
    },
    {
        title: 'Fines',
        icon: faPesoSign,
        link: '/penalties'
    },
    {
        title: 'Requests',
        icon: faPencilAlt,
        link: '/requests'
    },
    {
        title: 'Pendings',
        icon: faSync,
        link: '/pendings'
    },
    {
        title: 'Histories',
        icon: faScroll,
        link: '/histories'
    },  
]


export const userMenu = [
    {
        title: 'Home',
        icon:  faHouse,
        link: '/home'

    },
    {
        title: 'Books',
        icon: faBook,
        link: '/books'
    },
    {
        title: 'Borrowed Books',
        icon: faBookOpen,
        link:  '/my-books'

    }
] 