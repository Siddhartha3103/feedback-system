const API = "http://localhost:5000/api/auth";

document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("regUsername").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  const res = await fetch(`${API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password })
  });

  const data = await res.json();
  alert(data.msg || data.error);
});

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  if (res.ok) {
    localStorage.setItem("token", data.token);
    alert("Login successful!");
  } else {
    alert(data.msg || data.error);
  }
});


document.getElementById("feedbackForm").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const message = document.getElementById("feedbackMessage").value;
    const token = localStorage.getItem("token");
  
    if (!token) {
      alert("Please login first to submit feedback.");
      return;
    }
  
    const res = await fetch("http://localhost:5000/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ message })
    });
  
    const data = await res.json();
    if (res.ok) {
      alert(data.msg);
      document.getElementById("feedbackForm").reset();
    } else {
      alert(data.msg || data.error);
    }
  });
  