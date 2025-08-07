const apikey = ""; // placeholder for OpenAI API key

// Event listener for the reword button
document.getElementById('reword-btn').addEventListener('click', async () => {
  const input = document.getElementById('input-text').value.trim();
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = '';

  // Validate input
  if (!input) {
    outputDiv.innerHTML = '<p>Please enter a sentence.</p>';
    return;
  }

  try {
    // Make API request to OpenAI
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apikey}`
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: "Reword this: " + input,
        max_tokens: 100,
        n: 3,
        stop: null,
        temperature: 0.7
      })
    });

    // Check for response status
    if (!response.ok) {
      throw new Error('API request failed with status ' + response.status);
    }

    const data = await response.json();
    const choices = data.choices || [];

    // Display reworded sentences if available
    if (choices.length > 0) {
      choices.forEach(choice => {
        const p = document.createElement('p');
        p.textContent = choice.text.trim();
        outputDiv.appendChild(p);
      });
    } else {
      outputDiv.innerHTML = '<p>No results found.</p>';
    }
  } catch (error) {
    console.error(error);
    outputDiv.innerHTML = '<p>Error: ' + error.message + '</p>';
  }
});
