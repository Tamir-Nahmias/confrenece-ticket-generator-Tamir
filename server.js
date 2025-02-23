const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

// Add CORS middleware first
app.use(cors());

// Other middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

//the below '/api/send-to-server' זה רק מוסכמה .אפשר להשתמש בכל שם אחר שרוצים העיקר שיהיה דומה בצד של השליחה בטופס סאבמיט וכאן בשרת

app.post('/api/send-to-server', (req, res) => {
    console.log('Form data received:',req.body);
    const formData = (req.body);
    console.log(formData.fullName)
    
    // Process the data
    console.log("Processing ticket generation...");
    //res.render('generate-ticket',{data: formData});
   //res.redirect(`/generate-ticket.html?fullName=${formData.fullName}`)
   res.json({
    success: true,
    redirectUrl: `http://localhost:3000/generate-ticket.html`,  // URL to redirect to
    data: req.body  // Include the form data if needed
});

    
    // res.json({
    //     success: true,
    //     message: 'Form submitted successfully!'
    // });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});