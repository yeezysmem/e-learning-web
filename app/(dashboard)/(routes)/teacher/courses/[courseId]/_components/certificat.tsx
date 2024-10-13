// Import necessary libraries
const fs = require('fs');
const pdf = require('html-pdf');
const User = require('./models/User'); // Assuming you have a User model

// Function to generate a certificate PDF
const generateCertificate = (userData) => {
    const html = `
        <html>
            <head>
                <style>
                    /* CSS styles for the certificate */
                    /* Add your certificate design styles here */
                </style>
            </head>
            <body>
                <h1>Certificate of Completion</h1>
                <p>This is to certify that ${userData.name} has successfully completed the course "${userData.course}" on ${userData.completionDate}.</p>
            </body>
        </html>
    `;
    return html;
};

// Function to save the certificate PDF to the server
const saveCertificate = (html, userId) => {
    const pdfOptions = { format: 'Letter' }; // PDF options
    const pdfPath = `./certificates/certificate_${userId}.pdf`; // Path to save the PDF

    return new Promise((resolve, reject) => {
        pdf.create(html, pdfOptions).toFile(pdfPath, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(pdfPath);
            }
        });
    });
};

// Function to associate the certificate path with the user
const storeCertificatePath = (userId, certificatePath) => {
    return User.findByIdAndUpdate(userId, { certificate: certificatePath });
};

// Example function to handle course completion event and trigger certificate generation
const handleCourseCompletion = async (userId, courseData) => {
    try {
        // Generate certificate HTML
        const certificateHtml = generateCertificate({
            name: courseData.userName,
            course: courseData.title,
            completionDate: new Date().toDateString() // Assuming completion date is current date
        });

        // Save certificate as PDF
        const certificatePath = await saveCertificate(certificateHtml, userId);

        // Store certificate path in user document
        await storeCertificatePath(userId, certificatePath);

        console.log('Certificate generated and stored successfully.');
    } catch (error) {
        console.error('Error generating or storing certificate:', error);
    }
};

// Example usage
const userId = 'user123'; // User ID
const courseData = {
    userName: 'John Doe',
    title: 'Introduction to JavaScript'
};

// Trigger certificate generation on course completion
handleCourseCompletion(userId, courseData);
