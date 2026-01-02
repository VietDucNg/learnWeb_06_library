const asideBtns = document.querySelectorAll('aside button');

asideBtns.forEach(button => {
    button.addEventListener('click', ()=>{
        asideBtns.forEach(btn => btn.classList.remove('clicked'));
        button.classList.add('clicked');
    })
})

