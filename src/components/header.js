import Button from './Button'

const Header = ({title, onAdd, showAddTask}) => {
    return (
        <header className='header'>
            <h1>{title}
            </h1>
            <Button
                color ={showAddTask ? 'red' : 'green'}
                onClick={onAdd}
                text={showAddTask ? 'Close' : 'Add'}/>
        </header>
    );
};

export default Header;

