console.log(window.screen.height)

const regex = /\/(png|jpg|jpeg)$/i
const userAvatar = document.createElement("img")
userAvatar.id="user-avatar"
userAvatar.style.width="25vh"
userAvatar.style.zIndex="4"


const uploadBox = document.getElementById("drag-and-drop-area");
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    uploadBox.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}



// Handle the actual drop
// uploadBox.addEventListener("drop", function(e) {
//     const files = e.dataTransfer.files;
//     const reader = new FileReader();

//     const readFile = new Promise((resolve,reject) => {
//         reader.onload = () => {
//             localStorage.setItem("image-avatar",reader.result)
//             resolve(reader.result);
//             }
//         reader.onerror=reject
//     })

//     readFile
//             .then( imgSrc => {
//                 document.getElementById("drag-and-drop-area").style.backgroundImage= `url(${imgSrc})`}
//     )
//             .catch( error =>
//                 console.log("error reading file: ",error)
//             )
    
//         reader.readAsDataURL(files[0])


    
//     //setTimeout(()=>{userAvatar.src = localStorage.getItem("image-avatar")},500)

    
//     // document.getElementById("showable").appendChild(userAvatar)
// });

// Drop handler

//explanation on the below : 
// Yes, exactly! That was the crucial missing piece. The drop event was successfully handling the visual part (showing the image) and storing in localStorage, but it wasn't actually setting the file in the hidden input element.
// The DataTransfer API is what connects the dropped file to the actual form input. Without that, when the form was submitted after a drop operation, the file input remained empty (which explains the size being 0).
// So the flow is now complete:

// File is dropped
// Visual feedback is shown (background image updates)
// File is stored in localStorage
// Most importantly, file is properly attached to the form input using DataTransfer

uploadBox.addEventListener('drop', function(e) {
    const files = e.dataTransfer.files;
    const file = files[0];

    // Add the same validation as in click handler
    if (!file || !regex.test(file.type)) {
        console.error('Invalid file type or no file selected');
        return;
    }

    const reader = new FileReader();
    
    const readFile = new Promise((resolve, reject) => {
        reader.onload = () => {
            localStorage.setItem("image-avatar", reader.result)
            resolve(reader.result)
        }
        reader.onerror = reject
    });

    readFile
        .then(imgSrc => {
            document.getElementById("drag-and-drop-area").style.backgroundImage = `url(${imgSrc})`;
            // Add file to hidden input for form submission
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            hiddenInput.files = dataTransfer.files;
        })
        .catch(error => {
            console.log("error reading file: ", error)
        });

    reader.readAsDataURL(file);
});

//onclick eventlistener 

const hiddenInput =  document.getElementById("hidden-input-file");

uploadBox.addEventListener("click",(e)=>{

    e.preventDefault();
    e.stopPropagation();
    hiddenInput.click()
})
// Handle the actual file selection
hiddenInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    
    // Check if file exists and matches regex before proceeding
    if (!file || !regex.test(file.type)) {
        console.error('Invalid file type or no file selected');
        return;
    }

    const reader = new FileReader();
    
    // Promise wrapper around FileReader
    const readFile = new Promise((resolve, reject) => {
        reader.onload = () => {
            localStorage.setItem('image-avatar', reader.result);
            resolve(reader.result);
        };
        reader.onerror = reject;
    });

    // Read the file and update the background
    readFile
        .then(imgSrc => {
            const dragDropArea = document.getElementById("drag-and-drop-area");
            dragDropArea.style.backgroundImage = `url(${imgSrc})`;
        })
        .catch(error => {
            console.error('Error reading file:', error);
        });

    reader.readAsDataURL(file);
});

// window.open("./")


