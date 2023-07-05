const form = document.querySelector('form');
const titleElement = document.querySelector('input[type=text]');
const dateElement = document.querySelector('input[type=date]');
const descriptElement = document.querySelector('textarea');
const msg = document.getElementById('msg');

const card = window.opener.card;
if(card) {
    titleElement.value = card.text;
    dateElement.value = card.date;
    descriptElement.value = card.description;
}


function validateForm() {
    if(titleElement.value===''
    ||dateElement.value===''
    ||descriptElement.value===''){
        msg.innerHTML = "No field can be empty";
        return false;
    } else{
        msg.innerHTML='';
        return true;
    }
}

form.addEventListener('submit',(event)=> {
    event.preventDefault();
    if(validateForm()){
        if(!card) {
            value = {
                text : titleElement.value,
                date : dateElement.value,
                description : descriptElement.value
            };
            

            window.opener.addTask(value);
        } else {
            value = 
            window.opener.postEditedTask({id: card.id,
                                        text: titleElement.value,
                                        date: dateElement.value,
                                        description: descriptElement.value});
            window.opener.card = null;
        }

        window.close();
    }

})



