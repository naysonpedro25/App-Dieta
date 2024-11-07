const nameInput = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const weight = document.querySelector("#weight");
const height = document.querySelector("#height");
const age = document.querySelector("#age");
const sex = document.querySelector("#sex");
const objective = document.querySelector("#objective");
const calories_goals = document.querySelector("#calories_goals");
const calories_consumed = document.querySelector("#calories_consumed");
const calories_burned = document.querySelector("#calories_burned");
async function createUser() {
  try {
    const response = await fetch("http://127.0.0.1:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameInput.value,
        email: email.value,
        password: password.value,
        weight: Number(weight.value),
        height: Number(height.value),
        age: Number(age.value),
        sex: sex.value,
        objective: objective.value,
        calories_goals: Number(calories_goals.value),
        calories_consumed: Number(calories_consumed.value),
        calories_burned: Number(calories_burned.value),
      }),
    });

    if (!response.ok) {
      const resdata = await response.json();
      console.error("Erro fi" + resdata.message);
      return;
    }


  
    const data = await response.json();
    //accessToken, refreshToken;

    if (data.accessToken) {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      window.location.href = "/frontend/principal.html";
    }
  }catch(err){
    console.log(err)
  }
  document.body.innerHTML += `<p>User created successfully: ${data.message}</p>`;
}

document
  .querySelector(".btn-register")
  .addEventListener("click", async (event) => {
    event.preventDefault();
   await createUser();
  });
