const userService = require("../services/user-services");

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(404).send({ error: "Token not found..." });
        }

        console.log("Token found:", token);

        const user = await userService.getUserProfileByToken(token);

        if (!user) {
            return res.status(404).send({ error: "User not found..." });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).send({ error: error.message });
    }
};

module.exports = authenticate;
