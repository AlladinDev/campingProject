const isValidEmail = (email) => {
    const re = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
    return re.test(email);
};
const removeWhiteSpaces = (data) => {
    for (let key in data) {
        if (key !=='photo') {
           data[key] = data[key].trim()
        }
    }
    console.log('sanitised data is', data)
    return data
}


const validator = (formData) => {
    const newErrors = {};

    // Validate username (allow letters, digits, and spaces)
    const usernameRegex = /^[A-Za-z\s]+$/;
    if (!usernameRegex.test(formData.username)) {
        newErrors.username = 'Invalid username format';
    }

    // Validate age
    if (formData.age === '' || !/^(1[5-9]|[2-6][0-9]|70)$/.test(formData.age)) {
        newErrors.age = '15 to 70 yrs age required';
    }

    // Validate mobile number
    if (formData.mobile === '' || !/^\d{10}$/.test(formData.mobile)) {
        newErrors.mobile = 'Valid 10 digit mobile number required';
    }

    // Validate email
    if (formData.email === '' || !isValidEmail(formData.email)) {
        newErrors.email = 'Invalid email format (must end with @gmail.com)';
    }

    // Validate password (at least 8 characters with mix of characters)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
        newErrors.password =
            'Strong Password use mix(num,chars,uppercase,lowercase)';
    }

    // Validate address (no specific regex needed)

    // Check if photo is provided
    if (formData.photo === null) {
        newErrors.photo = 'Photo is required';
    }

    if (Object.keys(newErrors).length > 0) {
        return { err: true, errors: newErrors, data: formData };
    } else {
        formData = removeWhiteSpaces(formData)
        console.log('Guide validation passed in frontend');
        return { err: false, errors: '', data: formData };
    }
};

export default validator;
