import './CreateButton.css';


const CreateButton = ({title, onCreate}) => {
    return (
        <button onClick={() => onCreate('Create')} className="create-btn">
            Create New {title}
        </button>
    )
};

export default CreateButton;