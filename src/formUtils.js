/**
 * Form validation and submission utilities
 */

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePropertyName = (name) => {
  return name.trim().length >= 3;
};

export const validatePropertyType = (type) => {
  return ['hostel', 'coliving', 'hotel', 'apartment', 'other'].includes(type);
};

export const validateBedCount = (beds) => {
  const num = parseInt(beds, 10);
  return !isNaN(num) && num > 0 && num <= 500;
};

export const validateCountry = (country) => {
  return country.trim().length >= 2;
};

export const validateForm = (formData) => {
  const errors = {};

  if (!validateEmail(formData.email)) {
    errors.email = 'Email inválido';
  }

  if (!validatePropertyName(formData.propertyName)) {
    errors.propertyName = 'El nombre debe tener al menos 3 caracteres';
  }

  if (!validatePropertyType(formData.propertyType)) {
    errors.propertyType = 'Selecciona un tipo válido';
  }

  if (!validateBedCount(formData.beds)) {
    errors.beds = 'Debe ser entre 1 y 500 camas';
  }

  if (!validateCountry(formData.country)) {
    errors.country = 'País requerido';
  }

  if (formData.phone && formData.phone.trim().length > 0) {
    const phoneRe = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
    if (!phoneRe.test(formData.phone)) {
      errors.phone = 'Teléfono inválido';
    }
  }

  return Object.keys(errors).length === 0 ? null : errors;
};

export const submitEarlyAdopterForm = async (email) => {
  const response = await fetch('/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });

  if (!response.ok) {
    throw new Error('Failed to submit');
  }

  return await response.json();
};

export const submitFreeTrialForm = async (formData) => {
  const response = await fetch('/api/register-free', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: formData.email,
      propertyName: formData.propertyName,
      propertyType: formData.propertyType,
      beds: parseInt(formData.beds, 10),
      country: formData.country,
      phone: formData.phone || null,
      language: formData.language || 'es'
    })
  });

  if (!response.ok) {
    throw new Error('Failed to register');
  }

  return await response.json();
};
