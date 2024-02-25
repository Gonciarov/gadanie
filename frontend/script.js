async function readLine() {
    const pageNumber = document.getElementById('pageNumber').value;
    const lineNumber = document.getElementById('lineNumber').value;

    try {
        const response = await fetch(`http://localhost:3000/api/readLine?pageNumber=${pageNumber}&lineNumber=${lineNumber}`);

        if (response.ok) {
            const foundLine = await response.text();
            document.getElementById('result').innerHTML = `<p>Page ${pageNumber}, Line ${lineNumber}: ${foundLine}</p>`;
        } else {
            console.error('Error:', response.statusText);
            document.getElementById('result').innerHTML = 'Error reading the line. Please try again.';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('result').innerHTML = 'Error reading the line. Please try again.';
    }
}
