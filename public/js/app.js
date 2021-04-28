fetch('http://puzzle.mead.io/puzzle').then(response => {
    response.json().then(data => {
        console.log(data)
    })
})



const form = document.querySelector('form');
const input = document.querySelector('input');
const content = document.getElementById('content');


form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        const query = encodeURIComponent(input.value)
        fetch('http://localhost:4000/weather?address=' + query).then(res => {
            res.json().then(data => {
                console.log(data)
                content.innerHTML = '<pre>' + JSON.stringify(data) + '</pre>';
                
            })
        }) 
    }
    input.value = ""
})
