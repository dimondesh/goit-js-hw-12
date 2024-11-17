const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageInput = form.elements.message;

const STORAGE_KEY = 'feedback-form-state';

let formData = {
  email: '',
  message: '',
};

const loadFormData = () => {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    try {
      formData = JSON.parse(savedData);
      emailInput.value = formData.email || '';
      messageInput.value = formData.message || '';
    } catch (e) {
      console.error('Failed to parse form data from localStorage', e);
    }
  }
};

const saveFormData = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

const handleInput = event => {
  formData[event.target.name] = event.target.value.trim();
  saveFormData();
};

const handleSubmit = event => {
  event.preventDefault();
  if (!formData.email || !formData.message) {
    alert('Please fill all fields');
    return;
  }

  console.log('Form submitted:', formData);

  form.reset();
  formData = { email: '', message: '' };
  localStorage.removeItem(STORAGE_KEY);
};

loadFormData();
form.addEventListener('input', handleInput);
form.addEventListener('submit', handleSubmit);
