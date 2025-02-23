document.addEventListener("DOMContentLoaded" , () => {
    const ticketData = JSON.parse(localStorage.getItem('ticketInfo'));
    const userImage = document.querySelector("#users-img")
    document.getElementById("congrats").innerHTML= `Congrats, <span id="gradient-name">${ticketData.fullName}</span> !<br>Your ticket is ready.`
    document.getElementById("secondary").innerHTML= `We've emailed your ticket to <br><span id="orange-email">${ticketData.email}</span> and will send updates in <br>the run up to the event.`
    document.getElementById("my-user-name").textContent= ticketData.username
    document.getElementById("git-hub-user").innerHTML= `<span><img src="./assets/images/icon-github.svg"></span> ${ticketData.github}`
    // document.getElementById("").textContent= ticketData.fullName
    //photo loading from local host
    if(localStorage.getItem("image-avatar")){
    setTimeout(()=>{userImage.src = localStorage.getItem("image-avatar")},500)
    }
  })