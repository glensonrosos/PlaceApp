const LoginValidation = (rules,val,password='1234567') =>{
    isValid = false;
    for(const rule in rules){
        switch(rule){
            case 'isEmail' : isValid = checkIsEmail(val); break;
            case 'minLenght' : isValid = checkMinLenght(rules[rule],val); break;
            case 'isSame' : isValid = checkIsSame(val,password);break;
            default : null
        }
    }
    return isValid;
}

const checkIsEmail = val =>{
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(val).toLowerCase());
}

const checkMinLenght = (size,val) => {
    return String(val).length > size;
}

const checkIsSame = (confirmPassword,password) =>{
    return confirmPassword == password;
}

export default LoginValidation;