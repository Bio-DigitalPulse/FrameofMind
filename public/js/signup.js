async function signupFormHandler(event) {
    event.preventDefault();


    console.log("Signup Started")
    const username = document.querySelector("#name-signup")

    const password = document.querySelector("#password-signup")


    const response = await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify({
            username: username.value,
            password: password.value,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.ok) {
        document.location.replace("/dashboard");
    } else {
        alert('Failed to register user.');
    }


}

document
    .querySelector("#signup-form")
    .addEventListener("submit", signupFormHandler);