import React, { useState } from "react";

const userToken = import.meta.env.VITE_USER_TOKEN;

const FeedbackForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [productService, setProductService] = useState('');
  const [satisfaction, setSatisfaction] = useState('');
  const [reuse, setReuse] = useState('');
  const [improvements, setImprovements] = useState('');
  const [additionalFeedback, setAdditionalFeedback] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      to: "buzj4aqn9",
      data: [
        {
          6: { value: companyName },
          7: { value: address },
          8: { value: email },
          9: { value: phone },
          10: { value: productService },
          11: { value: satisfaction },
          12: { value: reuse },
          13: { value: improvements },
          14: { value: additionalFeedback }
        }
      ]
    };
  
    try {
      const res = await fetch("https://api.quickbase.com/v1/records", {
        method: "POST",
        headers: {
          "QB-Realm-Hostname": "superafulfillm.quickbase.com",
          "User-Agent": "Customer-Feedback-Form",
          "Authorization": `QB-USER-TOKEN ${userToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
  
      if (!res.ok) throw new Error("Submission failed!");
  
      const result = await res.json();
      console.log("🎉 Success!", result);
    } catch (err) {
      console.error("Error submitting feedback:", err);
    }

    setSubmitted(true);
  };

  return (
    <div className="feedback-container">
      <img src="/public/supera.png" className="logo"/>
      <h2 className="feedback-title">Customer Feedback Submissions</h2>
      
      {submitted ? (
        <div className="conf">
          🎉 Thank you! Your feedback is greatly appreciated and helps direct our improvements to our services.
        </div>
        
      ) : (

        <form className="feedback-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="company">Company Name</label>
            <input type="text" id="company"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input type="text" id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="email">Contact Email</label>
            <input type="email" id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Contact Phone</label>
            <input type="tel" id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="product">Product / Service</label>
            <input type="text" id="product"
              value={productService}
              onChange={(e) => setProductService(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Overall Satisfaction of Service</label>
            <div className="star-rating">
              {[5, 4, 3, 2, 1].map((value) => (
                <React.Fragment key={value}>
                  <input type="radio" id={`star${value}`} name="satisfaction" value={value} onChange={(e) => setSatisfaction(e.target.value)} />
                  <label htmlFor={`star${value}`} title={`${value} stars`}>★</label>
                </React.Fragment>
              ))}
            </div>
          </div>


          <div className="form-group">
            <label>Would you use our products / services again in the future?</label>
            <div className="radio-group">
              <label>Yes</label>
              <input className="radio" type="radio" name="reuse" value="yes" onChange={(e) => setReuse(e.target.value)}/>
              <label>No</label>
              <input className="radio" type="radio" name="reuse" value="no" onChange={(e) => setReuse(e.target.value)}/>  
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="improvements">How can we improve our products / services?</label>
            <textarea id="improvements" rows="4"
              value={improvements}
              onChange={(e) => setImprovements(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="additional">Please share any additional feedback or comments:</label>
            <textarea id="additional" rows="4"
              value={additionalFeedback}
              onChange={(e) => setAdditionalFeedback(e.target.value)} />
          </div>

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};


export default FeedbackForm;