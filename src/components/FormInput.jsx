import React from 'react';

const FormInput = ({ label, name, type, defaultValue }) => {
  return (
    <label className="form-control">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        type={type}
        name={name}
        placeholder={label}
        defaultValue={defaultValue}
        className="input input-bordered "
      />
    </label>
  );
};

export default FormInput;
