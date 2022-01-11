import { extend } from 'vee-validate'
import { required, min, max } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: 'This field is required',
})

extend('min', {
  ...min,
  params: ['length'],
  message: 'This field must contain minimum {length} characters',
})

extend('max', {
  ...max,
  params: ['length'],
  message: 'This field must contain maximum {length} characters',
})

extend('is_unique', {
  validate: (value, { existingValues }) => {
    if (!value || !value.length) {
      return true
    }

    if (existingValues.includes(value.trim())) {
      return false
    }
    return true
  },
  params: ['existingValues'],
  message: 'This field must be unique',
})
