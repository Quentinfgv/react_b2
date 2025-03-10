import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // État des champs du formulaire
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    profileImage: '',
    acceptedTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Validation des champs
  useEffect(() => {
    const validateForm = () => {
      const newErrors = {};
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const nameRegex = /^[A-Za-z\s]+$/;

      // Validation du nom
      if (!formData.name || !nameRegex.test(formData.name)) {
        newErrors.name = 'Nom invalide (pas de chiffres)';
      }

      // Validation de l'email
      if (!formData.email || !emailRegex.test(formData.email)) {
        newErrors.email = 'Email invalide';
      }

      // Validation du mot de passe
      if (formData.password.length < 8) {
        newErrors.password = 'Mot de passe trop court (min 8 caractères)';
      }

      // Validation de la confirmation du mot de passe
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
      }

      // Validation de l'URL de l'image
      if (!formData.profileImage || (!formData.profileImage.startsWith('http://') && !formData.profileImage.startsWith('https://'))) {
        newErrors.profileImage = 'L\'URL de l\'image doit commencer par http:// ou https://';
      }

      // Validation des CGU
      if (!formData.acceptedTerms) {
        newErrors.acceptedTerms = 'Vous devez accepter les CGU';
      }

      setErrors(newErrors);
      setIsFormValid(Object.keys(newErrors).length === 0);
    };

    validateForm();
  }, [formData]);

  // Gestion de l'input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Générer le nom d'utilisateur à partir de l'email
  const generateUsername = () => {
    return formData.email.split('@')[0];
  };

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid) {
      const submissionData = {
        name: formData.name,
        email: formData.email,
        profileImage: formData.profileImage,
        acceptedTerms: formData.acceptedTerms,
        username: generateUsername(),
        submittedAt: new Date().toISOString(),
      };

      console.log(submissionData);

      // Afficher le message de succès
      setSuccessMessage('Inscription réussie !');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

      // Réinitialiser le formulaire (optionnel)
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        profileImage: '',
        acceptedTerms: false,
      });
    }
  };

  return (
    <div className="App">
      <div className="profile-card">
        <img src={formData.profileImage || 'https://via.placeholder.com/100'} alt="Profil" />
        <div>
          <h3>{formData.name || '-'}</h3>
          <p>{formData.email || '-'}</p>
          <p>{generateUsername() || '-'}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <label>
          Nom:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'invalid' : ''}
          />
          {errors.name && <div className="error">{errors.name}</div>}
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'invalid' : ''}
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </label>

        <label>
          Mot de passe:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? 'invalid' : ''}
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </label>

        <label>
          Confirmation du mot de passe:
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={errors.confirmPassword ? 'invalid' : ''}
          />
          {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
        </label>

        <label>
          URL de l'image de profil:
          <input
            type="url"
            name="profileImage"
            value={formData.profileImage}
            onChange={handleChange}
            className={errors.profileImage ? 'invalid' : ''}
          />
          {errors.profileImage && <div className="error">{errors.profileImage}</div>}
        </label>

        <label>
          <input
            type="checkbox"
            name="acceptedTerms"
            checked={formData.acceptedTerms}
            onChange={handleChange}
          />
          Accepter les CGU
          {errors.acceptedTerms && <div className="error">{errors.acceptedTerms}</div>}
        </label>

        <button type="submit" disabled={!isFormValid}>Soumettre</button>
      </form>

      {successMessage && <div className="success">{successMessage}</div>}
    </div>
  );
}

export default App;

