<script>

    const btnPush = document.createElement("button");
    btnPush.innerHTML = "Push";
    btnPush.setAttribute("id", "sendMessage");
    btnPush.onclick = sendMessage;
    document.body.appendChild(btnPush);
    
    const btnPull = document.createElement("button");
    btnPull.innerHTML = "Pull";
    btnPull.setAttribute("id", "toggleResponse");
    btnPull.onclick = toggleResponse;
    document.body.appendChild(btnPull);
    
    const responseDiv = document.createElement("div");
    responseDiv.setAttribute("id", "response");
    responseDiv.style.display = "none";
    document.body.appendChild(responseDiv);
    
    function toggleResponse() {
        const responseDiv = document.getElementById('response');
        if (responseDiv.style.display === "none") {
            responseDiv.style.display = "block";
        } else {
            responseDiv.style.display = "none";
        }
    }
    
    async function sendMessage() {
        //const input = document.getElementById('userInput').value;
        const input = document.body.innerText;
        const responseDiv = document.getElementById('response');
        if (!btnPush) {
            responseDiv.innerHTML = 'W';
            return;
        }
        responseDiv.innerHTML = 'Loading...';
        try {
            const response = await fetch(
                'https://openrouter.ai/api/v1/chat/completions',
                {
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer <KEY API>',
                        'HTTP-Referer': '<YOUR REFERENC>',
                        'X-Title': '<YOUR TITLE>',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        model: 'deepseek/deepseek-r1:free',
                        messages: [{ role: 'user', content: 'Responda as questoes: ' + input }],
                    }),
                },
            );
            const data = await response.json();
            console.log(data);
            const messageContent =
                data.choices?.[0]?.message?.content || 'No response received.';
            responseDiv.innerHTML = messageContent;
        } catch (error) {
            responseDiv.innerHTML = 'Error: ' + error.message;
        }
    }

    </script>
