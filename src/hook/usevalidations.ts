// @ts-ignore
// @ts-nocheck
export const getRequiredMessage = (fieldName: any) => `${fieldName} is required`

export const getValidationRules = (watch: any) => ({
  userName: {
    required: getRequiredMessage('User Name'),
    minLength: {
      value: 3,
      message: 'Username must be at least 3 characters long',
    },
    maxLength: {
      value: 20,
      message: 'Username must not exceed 20 characters',
    },
    pattern: {
      value: /^[a-zA-Z0-9_]+$/,
      message: 'Username can only contain letters, numbers and underscores',
    },
  },
  email: {
    required: getRequiredMessage('Email'),
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address',
    },
  },
  password: {
    required: getRequiredMessage('Password'),
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters long',
    },
    pattern: {
      value:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
    },
  },
  confirmPassword: {
    required: getRequiredMessage('Confirm Password'),
    validate: (value: any) =>
      value === watch('password') || 'Passwords do not match',
  },
  phoneNumber: {
    required: getRequiredMessage('Phone Number'),
    pattern: {
      value: /^[0-9]{10,15}$/,
      message: 'Phone number must be between 10 and 15 digits',
    },
  },
  country: {
    required: getRequiredMessage('Country'),
    minLength: {
      value: 2,
      message: 'Country name must be at least 2 characters long',
    },
  },
  Title: {
    required: getRequiredMessage('Title'),
    minLength: {
      value: 2,
      message: 'title must be at more than 2 characters long',
    },
    maxLength: {
      value: 8,
      message: 'title must be at least 8 characters long',
    },
  },
  Description: {
    required: getRequiredMessage('Description'),
    minLength: {
      value: 4,
      message: 'title must be at more than 4 characters long',
    },
    maxLength: {
      value: 200,
      message: 'title must be at least 200 characters long',
    },
  },
  difficulty: {
    required: getRequiredMessage('difficulty'),
  },
  type: {
    required: getRequiredMessage('type'),
  },
  RightAnswer: {
    required: getRequiredMessage('RightAnswer'),
    pattern: {
      value: /^[A-D]$/,
      message: 'Must be a single capital letter (A, B, C, or D)',
    },
  },
  OptionA: {
    required: getRequiredMessage('OptionA'),
  },
  OptionB: {
    required: getRequiredMessage('OptionB'),
  },
  OptionC: {
    required: getRequiredMessage('OptionC'),
  },
  OptionD: {
    required: getRequiredMessage('OptionD'),
  },
})
