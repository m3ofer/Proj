import React from "react";

function OtherInfo({ formData, setFormData }) {
   const handleChange = (e) => {
   };
  return (
    <div className="personal-info-container">
        <input
        type="text"
        placeholder="topic..."
        value={formData.topic}
        onChange={(e) => {
          setFormData({ ...formData, topic: e.target.value });
        }}
      />
      <div className="personal-info-container">
        <input
        type="text"
        placeholder="Mac address..."
        value={formData.macAddress}
        onChange={(e) => {
          setFormData({ ...formData, macAddress: e.target.value });
        }}
      />
    </div>
    </div>
  );
}

export default OtherInfo;
