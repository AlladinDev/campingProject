const validateAndSanitize = (req, res, next) => {
    req.body.photo = req?.files?.photo?.tempFilePath
    const { destination, date, tripDuration, guideAlloted,pickUpPlace, photo, price, tripServices, description } = req.body;
    // Check if all required fields are present
    const requiredFields = ['destination', 'date','pickUpPlace', 'guideAllotted', 'price', 'tripDuration', 'tripServices', 'photo', 'description'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    if (missingFields.length > 0) {
        return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
    }

    // Validate date format (assuming ISO 8601)
    if (!isValidISODate(date)) {
        return res.status(400).json({ error: "Invalid date format" });
    }
    // Validate totalStays is an integer
    if (!Number.isInteger(parseInt(tripDuration))) {
        return res.status(400).json({ error: "Total stays must be an integer" });
    }

    // Validate price is a number
    if (isNaN(parseFloat(price))) {
        return res.status(400).json({ error: "Price must be a number" });
    }


    // Validate photo is a string
    if (photo && typeof photo !== 'string') {
        return res.status(400).json({ error: "Photo must be a string" });
    }

    // Sanitize input fields
    req.body.destination = sanitizeInput(destination);
    req.body.date = sanitizeInput(date);
    req.body.tripDuration = parseInt(sanitizeInput(tripDuration), 10);
    req.body.price = parseFloat(sanitizeInput(price));
    req.body.tripServices = sanitizeInput(tripServices);
    req.body.description = sanitizeInput(description);
    req.body.photo = photo ? sanitizeInput(photo) : '';

    console.log('final sanitised input is', req.body)
    next()
};

const isValidISODate = (date) => {
    return /^\d{4}-\d{2}-\d{2}$/.test(date);
};

const sanitizeInput = (input) => {
    console.log(input)
    return input.replace(/[<>&'"]/g, ''); // Replace special characters
};
module.exports = validateAndSanitize