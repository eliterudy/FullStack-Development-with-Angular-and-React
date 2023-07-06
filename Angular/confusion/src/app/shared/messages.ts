const formErrorMessages: any = {
  firstname: {
    required: 'First Name is required.',
    minlength: 'First Name must be at least 2 characters long.',
    maxlength: 'FirstName cannot be more than 25 characters long.',
  },
  lastname: {
    required: 'Last Name is required.',
    minlength: 'Last Name must be at least 2 characters long.',
    maxlength: 'Last Name cannot be more than 25 characters long.',
  },
  telnum: {
    required: 'Tel. number is required.',
    pattern: 'Tel. number must contain only numbers.',
  },
  email: {
    required: 'Email is required.',
    email: 'Email not in valid format.',
  },
  rating: {
    range: 'Rating should be between {{min}} and {{max}}',
  },
  author: {
    required: 'Author is required.',
    minlength: 'Author must be at least 2 characters long.',
    maxlength: 'Author cannot be more than 25 characters long.',
  },
};

export default {
  formErrorMessages,
};
