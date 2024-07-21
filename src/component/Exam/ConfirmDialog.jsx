import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ConfirmDialog = ({ onConfirm, onCancel, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="confirm-dialog">
      <div className="confirm-dialog-content">
        <p>Are you sure you want to submit exam?</p>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onCancel}>No</button>
      </div>
      <style jsx>{`
        .confirm-dialog {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .confirm-dialog-content {
          background: white;
          padding: 20px;
          border-radius: 5px;
          text-align: center;
        }
        .confirm-dialog-content button {
          margin: 5px;
        }
      `}</style>
    </div>
  );
};

export default ConfirmDialog;
