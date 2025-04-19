import './ImportButton.css';

const ImportButton = ({ onCreate }) => {
    return (
        <button onClick={() => onCreate('Import')} className="import-btn">
            Import
        </button>
    )
}

export default ImportButton;