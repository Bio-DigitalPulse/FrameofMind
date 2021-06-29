async function signupFormHandler(event) {
    event.preventDefault();


    console.log("Signup Started")
    const name = document.querySelector("#name-signup")
        .value.trim();
    const password = document.querySelector("#password-signup")
        .value.trim();
    if (name && password) {
        const response = await fetch("/api/user", {
            method: "post",
            body: JSON.stringify({
                name: name.value,
                password: password.value,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            document.location.replace("/homepage");
        } else {
            alert('Failed to register user.');
        }

    }
}

document
    .querySelector("#signup-form")
    .addEventListener("submit", signupFormHandler);
