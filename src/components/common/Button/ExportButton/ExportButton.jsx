import './ExportButton.css';

const ExportButton = ({onExport}) => {

    return (
        <button onClick={() => onExport()} className='export-btn'>
            Export
        </button>
    )
}

export default ExportButton;