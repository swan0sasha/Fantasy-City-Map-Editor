import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
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


// useEffect(() => {
// const requestOptions = {
//     method: 'POST',
//     headers: {'Content-Type': 'application/json'},
//     credentials : "include",
//     body: JSON.stringify({map_id: "the_lake"})
// };
//
// let loginDone
// fetch(`http://10.244.204.9:8000/login`, requestOptions)
//     .then(response => response.json())
//     .then(data => {
//         loginDone = data.response
//         console.log("Login successful? " + data.response)
//     })
//     .then(
//         () => {
//             root.render(<App/>);
//         }
//     );
// console.log("I'm here!222")
// }, []);
// if (loginDone){
// console.log("I'm here!")

root.render(<App/>);
// }
