document.getElementById("loginForm").addEventListener("submit",async(e)=>{
    e.preventDefault();
    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passwordInput").value;
    const requestBody = {email,password};
    const response = await fetch("http://localhost:3000/login",{
        method:"POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body:JSON.stringify(requestBody)
    });

    const loginNotification=document.getElementById("loginNotification");
    if(response.status === 200){
        const user= await response.json();
        sessionStorage.setItem("userId",user.userId);
        loginNotification.innerHTML="User is logged successfuly.";
        loginNotification.classList.add("alert-success");
        loginNotification.classList.remove("d-none");
    }
    if(response.status === 401){
        loginNotification.innerHTML="User's data is not correct.";
        loginNotification.classList.add("alert-danger");
        loginNotification.classList.remove("d-none");
    }
});

