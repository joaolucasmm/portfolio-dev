import React from 'react';

function Retorno() {

    let mybutton = document.getElementById("myBtn");
    console.log(mybutton);
    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }

    return(
        <div id='myBtn' className='container-return'>
            <a href='#home' className='return'>🔼</a>
        </div>
    );
}

export default Retorno;