// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token === process.env.TOKEN) {
        next(); // Proceed to the next middleware or route handler
    }
    else {
        res.status(401).json({ result: "Unauthorized" });
    }
};
export default authenticateToken;
