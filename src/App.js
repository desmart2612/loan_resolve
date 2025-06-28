import React, { useState, useEffect } from 'react';
import './App.css';
import Button from './components/Button.jsx';

function App() {

  const [formData, setFormdata] = useState({
    constituency: '',
    openning: 0,
    closing: 0,
    transfer: 0,
    adjust: 0,
    threshold: -100000,
    status: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormdata({
      constituency: e.target.constituency.value,
      openning: e.target.openningBalance.value,
      closing: e.target.closingBalance.value,
      transfer: e.target.transferToBank.value,
      threshold: -100000,
    })
    e.target.reset();
  }

  useEffect(() => {
    if (formData.openning && formData.closing && formData.transfer) {
      const openingBalance = parseFloat(formData.openning);
      const closingBalance = parseFloat(formData.closing);
      const transferAmount = parseFloat(formData.transfer);

      const adjustment = (closingBalance - openingBalance) + transferAmount;

      setFormdata(prevData => ({
        ...prevData,
        adjust: adjustment,
      }));

      if (transferAmount === 0 && closingBalance > openingBalance) {
        setFormdata(prevData => ({
          ...prevData,
          status: 'Ok - Increase is due to loan repayment by constituencies, groups or institutions.'
        }));
      }
      else if (adjustment >= formData.threshold) {
        setFormdata(prevData => ({
          ...prevData,
          status: 'Ok - Within acceptable threshold.'
        }));
      }
      else {
        setFormdata(prevData => ({
          ...prevData,
          status: 'Audit Needed - Difference exceeds acceptable threshold.'
        }));
      }
    }
  }, [formData.openning, formData.closing, formData.transfer]);

  return (
    <div className="App">
      <header className="App-header px-3">
        <h4 className='text-light'>Loan Resolve Application</h4>
      </header>
      <main className='d-flex flex-column align-items-center '>
        <form className='my-5 p-4 rounded-4 shadow d-flex flex-column align-items-start bg-white text-dark gap-2' onSubmit={handleSubmit}>
          <div className='w-100'>
            <label htmlFor="constituency" className='w-50 d-flex align-items-start fw-medium'>Constituency:</label>
            <input className='form-control py-3 px-3' type="text" id="constituency" name="constituency" placeholder="Enter the constituency name" required />
          </div>
          <div className='w-100'>
            <label htmlFor='openningBalance' className='w-50 d-flex align-items-start fw-medium'>Opening Balance:</label>
            <input className='form-control py-3 px-3' type="number" id="openningBalance" name="openningBalance" placeholder="Enter the opening balance" required />
          </div>
          <div className='w-100'>
            <label htmlFor='closingBalance' className='w-50 d-flex align-items-start fw-medium'>Closing Balance:</label>
            <input className='form-control py-3 px-3' type="number" id="closingBalance" name="closingBalance" placeholder="Enter the closing balance" required />
          </div>
          <div className='w-100'>
            <label htmlFor='transferToBank' className='w-50 d-flex align-items-start fw-medium'>Transfered Amount:</label>
            <input className='form-control py-3 px-3' type="number" id="transferToBank" name="transferToBank" placeholder="Enter the amount transfered the bank" required />
          </div>
          <div className='d-flex flex-row-reverse gap-4 mt-3 align-items-center justify-content-between w-100'>
            <Button label="Submit" />
            {/* <Button label="Reset" /> */}
          </div>
        </form>
        <h4 className='text-decoration-underline link-offset-2'>Results.</h4>
        <div className='d-flex flex-column align-items-center results-container'>
          {formData.constituency === "" ? <div className='w-100 fs-4 d-flex align-items-start'>No Results...</div> :
            <>
              <h4 className="w-100 border-bottom border-dark pb-2"><span className='fw-light'>Constituency: </span>{formData.constituency}</h4>
              <div className='mb-5 w-100'>
                <div className="py-3 d-flex flex-row w-100 justify-content-between align-items-center border-bottom border-1 border-dark">
                  <p className="mt-0 w-50 d-flex align-items-start fw-medium text-start">Opening Balance:</p>
                  <span className="w-50 d-flex justify-content-end">{formData.openning}</span>
                </div>
                <div className="py-3 d-flex flex-row w-100 justify-content-between align-items-center border-bottom border-1 border-dark">
                  <p className="mt-0 w-50 d-flex align-items-start fw-medium text-start">Closing Balance:</p>
                  <span className="w-50 d-flex justify-content-end">{formData.closing}</span>
                </div>
                <div className="py-3 d-flex flex-row w-100 justify-content-between align-items-center border-bottom border-1 border-dark">
                  <p className="mt-0 w-50 d-flex align-items-start fw-medium text-start">Transfered Amount:</p>
                  <span className="w-50 d-flex justify-content-end">{formData.transfer}</span>
                </div>
                <div className="py-3 d-flex flex-row w-100 justify-content-between align-items-center border-bottom border-1 border-dark">
                  <p className="mt-0 w-50 d-flex align-items-start fw-medium text-start">Adjusted Difference:</p>
                  <span className="w-50 d-flex justify-content-end">{formData.adjust}</span>
                </div>
                <div className="py-3 d-flex flex-row w-100 justify-content-between align-items-center border-bottom border-1 border-dark">
                  <p className="mt-0 w-50 d-flex align-items-start fw-medium text-start">Status:</p>
                  <span className="w-50 d-flex justify-content-end text-end">{formData.status}</span>
                </div>
              </div>
            </>
          }
        </div>
      </main>
    </div>
  );
}

export default App;
