export function initLogin(){
    const form = document.getElementById("loginForm");
    if(form){
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            console.log('The user is trying to enter with :', email);

            if(email && password){
                window.navigateTo("/board");
            }
        });
    }
};