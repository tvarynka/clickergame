const rules = {
  required: (value) => !!value || 'Поле не може бути пустим',
  minLength: (min) => {
    return (value) =>
      value.length >= min || `Має містити мінімум ${min} символів`;
  },
  isEqualTo: (valueToCompare, errorMessage) => {
    return (value) =>
      value === valueToCompare ||
      errorMessage ||
      'Значення мають бути однаковими';
  },
  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) || 'Введіть валідну адресу';
  },
  uppercase: (value) => {
    const emailRegex = /^(?=.*[A-Z])/;
    return emailRegex.test(value) || 'Має містити хоча б одну букву у верхньому реєстрі';
  },
  lowercase: (value) => {
    const emailRegex = /^(?=.*[a-z])/;
    return (
      emailRegex.test(value) ||
      'Має містити хоча б одну букву у нижньому реєстрі'
    );
  },
  specialSymbol: (value) => {
    const emailRegex = /[!@#$%^&*(),.?":{}|<>]/;
    return (
      emailRegex.test(value) ||
      'Має містити хоча б один спеціальний символ: ! @ # $ % ^ & * ( ) , . ? " : { } | < >'
    );
  },
};

export default rules;