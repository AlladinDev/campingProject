const isValidEmail = (email) => {
    // Very basic email validation, you might want to use a more robust solution
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};
const validator = (formData) => {

    const newErrors = {};
    // Simple validation
    if (formData.username === '' || formData.username.length < 3) {
        if (formData.username == '')
            newErrors.username = 'name cannot be empty'
        else
            newErrors.username = 'name should not be less than 3 characters '
    }
    if (formData.age === '' || formData.age < 15 || formData.age > 70) {
        if (formData.age == "")
            newErrors.age = 'age cannot be empty'
        else
            newErrors.age = "age should be between 15 and 70 yrs"
    }
    if (formData.experience === '') {
        newErrors.experience = 'enter your experience )'

    }
    if (formData.qualification === '') {
        newErrors.qualification = 'enter your experience )'
    }


    if (formData.gender === '') {
        newErrors.gender = 'Gender is required';
    }
    if (formData.mobile === '' || formData.mobile.length !== 10) {
        if (formData.mobile == "")
            newErrors.mobile = 'mobile number cannot be empty'
        else
            newErrors.mobile = 'mobile number must be 10 digits long'

    }
    if (formData.email === '') {
        newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
        newErrors.email = 'Invalid email format';
    }
    if (formData.password === '' || formData.password.length < 8) {
        if (formData.password == "")
            newErrors.password = 'Password is required';
        else
            newErrors.password = 'password must be atleast 8 digits long'
    }
    if (formData.address === '') {
        newErrors.address = 'Address is required';
    }
    if (formData.photo === null) {
        newErrors.photo = 'Photo is required';
    }

    if (Object.keys(newErrors).length > 0) {
    
        return { err: true, errors: newErrors, data: formData }
    }
    else {
        // Submit form
        console.log('guide validation passed in frontend')
        return { err: false, errors:'', data: formData }

    }
};
export default validator

