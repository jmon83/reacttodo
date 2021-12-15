import {useState} from "react";

const AddTask = ({onAdd}) => {
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        //If no Task when added
        if(!text) {
            alert("Please Add Task")
            return
        }

        //Pass items on submit
        onAdd({text, day, reminder})

        //Clear Form
        setText('')
        setDay('')
        setReminder(false)
    }
    return (
        <form className='add-form' onSubmit={onSubmit}>
    <div className='form-control'>
    <label>Task</label>
    <input type='text'
           placeholder='Add a Task'
    value = {text} onChange={(e) =>
        setText(e.target.value)}/></div>
        <div className='form-control'>
            <label>Day and Time</label>
            <input type='text'
                   placeholder='Add Day and Time'
                   value = {day} onChange={(e) =>
                setDay(e.target.value)}/>
        </div>
            <div className='form-control form-control-check'>
                <label>Set Reminder</label>
                <input type='checkbox'
                       checked={reminder}
                       value = {reminder} onChange={(e) =>
                    setReminder(e.currentTarget.checked)}/></div>
            <input className='btn btn-block' type = 'submit' value = 'Save Task'/>

        </form>
    );
};

export default AddTask;
