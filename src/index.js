import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
document.addEventListener("keydown", function (e) {
    if (
        e.ctrlKey &&
        (e.key === "=" ||
            e.key === "+" ||
            e.key === "-")
    ) {
        e.preventDefault();
    }
});
document.addEventListener(
    "wheel",
    function (e) {
        if (e.ctrlKey) {
            e.preventDefault();
        }
    },
    {
        passive: false
    }
);
root.render(
    <App />
);
