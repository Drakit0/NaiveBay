document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.register-form'); //get register
  
    form.addEventListener('submit', function (event) {

        const errors = []; // Collect errors

        const password = document.getElementById('Password').value; // trim to remove spaces
        const confirmPassword = document.getElementById('Confirm password').value;
        const mail = document.getElementById('Mail').value.trim();
        const autonomousCommunity = document.getElementById('Autonomous community').value;
        const city = document.getElementById('City').value;
        const birthdate = document.getElementById('birthdate').value;


        // Validate password
        if (password === '') {
            errors.push('Please enter a password.');
        }

        if (confirmPassword === '') {
            errors.push('Please confirm your password.');
        }

        if (password.length < 8) {
            errors.push('Password must be at least 8 characters.');
        }

        if (!/[A-Z]/.test(password)){
            errors.push('Password must contain at least one uppercase letter.');
        }

        if (!/[a-z]/.test(password)){
            errors.push('Password must contain at least one lowercase letter.');
        }

        if (!/[0-9]/.test(password)){
            errors.push('Password must contain at least one number.');
        }

        if (!/[!@#$%^&*_-~#=]/.test(password)){
            errors.push('Password must contain at least one special character.');
        }

        if (password !== confirmPassword) {
            errors.push('Passwords do not match.');
        }
  
        // Validate mail
        if (mail === '') {
            errors.push('Please enter an email address.');
        } else if (!mail.includes('@') || !mail.includes('.')) {
            errors.push('Please enter a valid email address.');
        }

        // Validate autonomous community
        if (autonomousCommunity === '') {
            errors.push('Please select an Autonomous community.');
        }

        // Validate city
        if (city === '') {
            errors.push('Please select a City.');
        }
  
        // Validate birthday is in the past
        if (birthdate === '') {
            errors.push('Please select your birthdate.');
        } else {
            const selectedDate = new Date(birthdate);
            const today = new Date();
            if (selectedDate >= today) {
            errors.push('Birthdate must be in the past.');
            }
        }
  
        // If there are errors, prevent the form from submitting
        if (errors.length > 0) {
            event.preventDefault();
            alert(errors.join('\n'));
        }
        });
    
    // City options
    const communityCities = {
      'Madrid': ['Madrid', 'Buitrago del Lozoya', 'El Escorial'],
      'Valencian Community': ['Valencia', 'Alicante', 'Castellón']
    };
  
    // References
    const autonomousSelect = document.getElementById('Autonomous community');
    const citySelect = document.getElementById('City');
  
    // Update city options
    autonomousSelect.addEventListener('change', function () {
      // Clear coties
      citySelect.innerHTML = '<option value="">City*</option>';
  
      // Add cities
      if (this.value && communityCities[this.value]) {
        communityCities[this.value].forEach(function (cityName) {
          const option = document.createElement('option');
          option.value = cityName;
          option.textContent = cityName;
          citySelect.appendChild(option);
        });
      }
    });
  });
  