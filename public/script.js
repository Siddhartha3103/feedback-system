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
  

  document.getElementById("loadFeedbacks").addEventListener("click", async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login as admin to view feedbacks");
  
    const res = await fetch("http://localhost:5000/api/feedback", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  
    const data = await res.json();
    if (!res.ok) return alert(data.msg || "Access denied");
  
    const feedbacks = data.feedbacks;
    const tbody = document.getElementById("feedbackBody");
    const table = document.getElementById("feedbackTable");
    tbody.innerHTML = ""; // clear previous
  
    feedbacks.forEach(fb => {
      const row = document.createElement("tr");
  
      row.innerHTML = `
        <td>${fb.userId?.username || "N/A"}</td>
        <td>${fb.userId?.email || "N/A"}</td>
        <td>${fb.message}</td>
        <td>${new Date(fb.createdAt).toLocaleString()}</td>
      `;
  
      tbody.appendChild(row);
    });
  
    table.style.display = "table";
  });
  

  