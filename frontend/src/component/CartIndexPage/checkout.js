import noodleBowl from "../../assets/feature-pics/feature2.png";

const Checkout = () => {

    const closeModal = () => {
        let ele = document.getElementById("checkout-modal");
        ele.style.display = "none";
        let bg = document.getElementById("cart-modal-background");
        bg.style.display = "none";
    }

    return (
        <>
            <div id="close-checkout-modal" className="fa-solid fa-x" onClick={closeModal}></div>
            <h1 id="checkout-title">PEACE, LOVE AND NOODLES.</h1>
            <h2 id="checkout-text"> Thank you for your purchase! We hope these little pots of noodles put a big smile on your face.</h2>
            <img src={noodleBowl} alt="bowl of noodles" id="checkout-pic"/>

        </>
    )
}

export default Checkout;