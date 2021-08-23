process.argv.forEach((val, index, array) => {
    const arg = val.split("=");
    if (arg.length > 0) {
        if (arg[0] === "env") {
            module.exports = {
                value: `./env/${arg[1]}.properties`
            };
        }
    }
})