// submitting the form 

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const populateStr = "field can't be empty"
    const emptyFieldFullName = document.getElementById("m-be-pop-fullname")
    const emptyFieldFullemail = document.getElementById("m-be-pop-email")
    const emptyFieldGit = document.getElementById("m-be-pop-git")
    const emptyFieldUser = document.getElementById("m-be-pop-username")
    const emptyFieldPhoto = document.getElementById("photo-empty-filed-pop")
    const emptyfieldArr = [emptyFieldFullName,emptyFieldFullemail,emptyFieldGit,emptyFieldUser]
   

    const inputs = document.querySelectorAll("input")
        inputs.forEach((input, i) => {
        input.addEventListener("input", e => {
          e.preventDefault()
            if(!e.target.value?.trim()){
            emptyfieldArr[i-1].textContent=populateStr;
            throw new Error(populateStr)}
        else{
            emptyfieldArr[i-1].textContent=""
        }
     })
    })

    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        //Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        const fileInput = form.querySelector('input[type="file"]');
        console.log('File input:', fileInput.files[0]); // Add this line
        //console.log(typeof data.photo.size ,data.photo.size)
        if(!data.fullName?.trim()||!data.email?.trim()||!data.github.trim()||!data.username?.trim()||data.photo.size===0){
            if(data.photo.size===0){
                emptyFieldPhoto.textContent=populateStr
            }
            throw new Error(populateStr);
        }
    
        
        // Send to Express server
        fetch('http://localhost:3000/api/send-to-server', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            setTimeout(() => {
                
            }, 500);
            localStorage.setItem("ticketInfo",JSON.stringify(data.data))
            setTimeout(() => {
                
            }, 500);
            window.location.href = data.redirectUrl;
            //alert(data.message); // or handle success in a better way
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error submitting form: ' + error.message);
        });
    });
});