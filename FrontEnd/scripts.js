document.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById('submitBtn').addEventListener('click', sendEmail);
});

function sendEmail() {
    console.log('Sending email...');
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // Get the entire HTML content
    const entireDocument = document.documentElement.outerHTML;


    html2pdf().from(entireDocument).outputPdf().then((base64) => {
        Email.send({
            SecureToken: "securetoken",
            To: email,
            From: "email",
            Subject: "This is the subject",
            Body: "Hello " + name + ",\n\nThis is the body of the email.\n\nSincerely,\nName",
            Attachments: [
                {
                    name: "receipt.pdf",
                    data: btoa(base64)
                }]
        }).then(
            message => alert(message)
        );
    });
}