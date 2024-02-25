const express = require('express');
const fs = require('fs');
const pdf = require('pdf-parse');
const cors = require('cors'); // Add this line

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors()); // Add this line

// Serve the book.pdf file
app.use(express.static(__dirname));

// Endpoint to handle the request for page number and line number
app.get('/api/readLine', async (req, res) => {
    const { pageNumber, lineNumber } = req.query;
    console.log("page: " + pageNumber + " line " + lineNumber)
    try {
        // Read the PDF file
        const dataBuffer = fs.readFileSync('book.pdf');
        const pdfData = await pdf(dataBuffer);
        // Get the text of the specified page
        const startIndex = pdfData.text.indexOf('\n' + pageNumber + '\n');
        console.log(startIndex)
        const nextPageNumberString = (parseInt(pageNumber) + 1).toString();
        const endIndex = pdfData.text.indexOf('\n' + nextPageNumberString + '\n');
        console.log(endIndex)
        // Extract the desired substring
        const substring = pdfData.text.substring(startIndex, endIndex);
        console.log(substring)
        // Split text into lines
        const lines = substring.split('\n');

        // Get the specified line
        const foundLine = lines[lineNumber - 1];

        res.send(foundLine);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error reading the PDF file');
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
