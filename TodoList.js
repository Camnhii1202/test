
function formatDateToShow(dateString){
    const parts = dateString.split(/[-T]/)

    const year = parts[0]
    const month = parts[1]
    const day = parts[2]
    const hourAndMinute = parts[3]

    return `${day}-${month}-${year} ${hourAndMinute}`
}

function formatDateToPicker(date){
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

//xử lý nút thêm
function handleAddButton(e){
    e.preventDefault()
    const inputText = document.getElementById('to-do-list-input-text')
    const listJob = document.getElementById('to-do-list-listjob')
    const errorMessage = document.getElementById('error-message')
    const datetimePicker = document.getElementById('to-do-list-input-datetime')

    
    if (inputText.value === ''){
        errorMessage.style.display = 'block'
        return
    } else {
        errorMessage.style.display = 'none'
    }


    const listItem = document.createElement('li')
    listItem.classList.add('to-do-list-item');

    listItem.innerHTML = `
        <div class="to-do-list-item-left">
            <label class="custom-checkbox">
                <input type="checkbox" onclick="handleCompleteTask(event)"/>
                <span class="checkmark"></span>
                <div class="to-do-list-item-content-container">
                    <div class="to-do-list-item-content">${inputText.value}</div>
                    <div class="to-do-list-item-datetime">${formatDateToShow(datetimePicker.value)}</div>
                </div>
            </label>
        </div>
        <div class="to-do-list-item-delete">
            <i class="fa-solid fa-xmark" onclick="handleDeleteButton(event)"></i>
        </div>
    `
    listJob.appendChild(listItem)

    inputText.value = ''
    inputText.focus()
    resetPickerToDefault()

}

function handleDeleteButton(e){
    const listItem = e.target.closest('.to-do-list-item')

    if (listItem){
        listItem.remove()
    }
}

function handleCompleteTask(e){
    const completedTask = e.target.closest('.custom-checkbox')

    if (completedTask.classList.contains('checked')){
        completedTask.classList.remove('checked')
    } else {
        completedTask.classList.add('checked')
    }
}

document.querySelector('#to-do-list-input-datetime-label').addEventListener('click', function(){
    document.querySelector('#to-do-list-input-datetime').showPicker()
})

//set default datetime
function resetPickerToDefault(){
    const currentDate = new Date()
    const minDate = formatDateToPicker(currentDate)
    
    currentDate.setHours(23)
    currentDate.setMinutes(59)
    currentDate.setSeconds(0)
    currentDate.setMilliseconds(0)
    
    const formattedDate = formatDateToPicker(currentDate);
    
    const datetimePicker = document.getElementById('to-do-list-input-datetime')
    datetimePicker.value = formattedDate
    datetimePicker.min = minDate
}

resetPickerToDefault()
