document.getElementById('predictForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const form = e.target;
  const data = {
    age: parseFloat(form.age.value),
    bmi: parseFloat(form.bmi.value),
    glucose_level: parseFloat(form.glucose_level.value),
    family_history: parseInt(form.family_history.value),
    smoker: parseInt(form.smoker.value)
  };

  const res = await fetch('/predict', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });

  const result = await res.json();
  document.getElementById('result').innerHTML = `
    <p><strong>${result.risk_level}</strong></p>
    <p>Probabilitas: ${result.probability}</p>
  `;
});