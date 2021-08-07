const sendEmails = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("hello");
            console.log("hello")
        }, 100)
    });
}

module.exports = sendEmails;
