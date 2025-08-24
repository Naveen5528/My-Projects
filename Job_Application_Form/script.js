document.querySelector("form").addEventListener("submit", function (e) {
  const fname = this.fname.value.trim();
  const email = this.mail.value.trim();
  const phone = this.ph.value.trim();
  const age = this.age.value;
  const x = this.X_Marks.value, xii = this.XII_Marks.value, deg = this.Deg_percent.value;

  const nameRegex = /^[A-Za-z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;

  if (!nameRegex.test(fname)) {
    alert("Enter a valid first name.");
    e.preventDefault();
  } else if (!emailRegex.test(email)) {
    alert("Enter a valid email.");
    e.preventDefault();
  } else if (!phoneRegex.test(phone)) {
    alert("Phone must be 10 digits.");
    e.preventDefault();
  } else if (age < 18 || age > 65) {
    alert("Age must be between 18 and 65.");
    e.preventDefault();
  } else if (x < 0 || x > 100 || xii < 0 || xii > 100 || deg < 0 || deg > 100) {
    alert("Marks must be between 0 and 100.");
    e.preventDefault();
  }
});
