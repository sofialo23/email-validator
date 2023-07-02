document.addEventListener('DOMContentLoaded', function(){


            //ELEMENT SELECTORS
    const form = document.querySelector('#form');
    const emailInput = document.querySelector('#email');
    const ccInput = document.querySelector('#cc');
    const subjectInput = document.querySelector('#subject');
    const messageInput = document.querySelector('#message');
    const resetbtn = document.querySelector('#reset-btn');
    const sendbtn = document.querySelector('#send-btn');
    const spinner = document.querySelector('#spinner');
    const email = {
        email: '',
        cc: '',
        subject: '',
        message: ''
    };
    let ccError = false;
    
            //EVENT LISTENERS
    emailInput.addEventListener('blur', validate);
    ccInput.addEventListener('blur', validateCc);
    subjectInput.addEventListener('blur', validate);
    messageInput.addEventListener('blur', validate);
    resetbtn.addEventListener('click',(e)=>{
        e.preventDefault();
        const reset = confirm('Are you sure you want to reset your information?')
        if(reset){
            resetForm();
        }
    });            
    form.addEventListener('submit', sendForm);

        //SIMULATES SENDING THE EMAIL AND RESETS THE FORM ONCE IT'S DONE
    function sendForm(e){
        e.preventDefault();
        spinner.removeAttribute('hidden');

        setTimeout(() => {
            spinner.setAttribute('hidden', 'true');
            resetForm();
            const succ = document.createElement('P');
            succ.textContent = 'Email was successfully sent';
            succ.classList.add('succ-message');
            form.appendChild(succ);
            setTimeout(() => {
                succ.style.display = 'none';
            }, 5000);
        }, 3000);
        
    }
        //IF THE CC FIELD IS NOT EMPTY, IT CHECKS THE EMAIL IS VALID
    function validateCc(e){
        if(e.target.value.trim() !== ''){
            const reference = e.target.parentElement;
            if(!checkEmail(e.target.value.trim())){
                showAlert('Cc is not valid', reference); 
                email[e.target.id] = '';
                ccError = true;
                checkValues();
            }
            else{
                email[e.target.id] = e.target.value.trim();
                removeAlert(reference);
                ccError = false;
                checkValues()
            }
        }
    }
            //IF THE FIELD IS NOT EMPTY VALIDATES THE DATA
    function validate(e){  
        const reference = e.target.parentElement;

        if(e.target.value.trim() === ''){
            const error = `The field ${e.target.id} is required`;
            showAlert(error, reference);   
            email[e.target.id] = '';
            checkValues();
            return;     
        }
        if(e.target.id === 'email' && checkEmail(e.target.value.trim()) === false){ 
                showAlert('Email is not valid', reference); 
                email[e.target.id] = '';
                checkValues();
                return;
            }

        removeAlert(reference);
            //FILL IN THE EMAIL OBJECT WITH THE ENTERED VALUE
        email[e.target.id] = e.target.value.trim();
        checkValues();
        
    }

            //CREATES A MESSAGE AND ATTACHES IT TO THE CORRESPONDING FIELD
    function showAlert(error, reference){
        removeAlert(reference);
        const p = document.createElement('P');
        p.textContent = error;
        p.classList.add('error-message');
        reference.appendChild(p);
    }
            //REMOVES THE ERROR MESSAGE
    function removeAlert(reference){
        const message = reference.querySelector('.error-message');
        if(message){
            message.remove();
        }
    }
            //CHECKS THAT USER ENTERS A VALID EMAIL ADDRESS
    function checkEmail(email){
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const result = regex.test(email);
        return result;
    }

           //CHECKS THAT FORM HAS NO EMPTY FIELDS UNLESS IT'S THE CC
    function checkValues(){

        let tempArray = email;
        delete tempArray.cc;
        if(ccError == false){
            if(!Object.values(tempArray).includes('')){
                sendbtn.removeAttribute('disabled');
                sendbtn.style.opacity = '100%';
                return;
            }
        }
        sendbtn.setAttribute('disabled', '');
        sendbtn.style.opacity = '50%';
    }

    function resetForm(){
        form.reset(); 
            //RESET THE OBJECT
        email.email = '';
        email.cc = '',
        email.subject = '';
        email.message = '';
        checkValues();
    }

});