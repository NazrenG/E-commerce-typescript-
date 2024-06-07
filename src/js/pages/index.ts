import loginData from "../../../public/json/login.json";

const signInBtn = document.querySelector<HTMLButtonElement>(".sign_button");
const mediaBtn = document.querySelector<HTMLButtonElement>(".btn_media");
const emailInput = document.querySelector<HTMLInputElement>(".sign_email");
const passInput = document.querySelector<HTMLInputElement>(".sign_password");

interface Login {
  id: number;
  name: string;
  email: string;
  password: string;
}

interface ApiResponse {
  users: Login[];
}

const json: ApiResponse = loginData;

json.users.map((data: Login) => {
  console.log(data.name);
});

mediaBtn?.addEventListener("click", () => {
  if (emailInput && passInput) {
    emailInput.value = json.users[0].email;
    passInput.value = json.users[0].password;
  }
});

signInBtn?.addEventListener("click", () => {
  const emailValue = emailInput?.value;
  const passwordValue = passInput?.value;

  json.users.find((data: Login) => {
    console.log(data.email);
    console.log(emailValue);
    if (data.email === emailValue && data.password === passwordValue) {
      window.location.href = "about.html";
    }
  });
});
