<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Suraj Wood | Products</title>
    <link href="css/bootstrap.css" rel="stylesheet">
    <link href="plugins/revolution/css/settings.css" rel="stylesheet" type="text/css">
    <link href="plugins/revolution/css/layers.css" rel="stylesheet" type="text/css">
    <link href="plugins/revolution/css/navigation.css" rel="stylesheet" type="text/css">
    <link href="css/style.css" rel="stylesheet">
    <link href="css/responsive.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">





</head>



<style>
    
    /* pop */
    /* ADDED: Class to disable scrolling on the entire page */
    .no-scroll {
        overflow: hidden !important;
    }

    /* MODIFIED: Initial state of the container (hidden, covers screen) */
    .pop-up-container.hidden-popup {
        opacity: 0;
        visibility: hidden;
        /* Ensures elements aren't tabbable when hidden */
        transition: opacity 0.3s ease, visibility 0.3s ease;
    }

    /* MODIFIED: Active state of the container (visible) */
    .pop-up-container {
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        /* Changed from absolute to fixed to cover the viewport even on scroll */
        bottom: 0;
        z-index: 1000;
        /* Ensure it's above all other content */
    }

    /* MODIFIED: Initial state of the form (scaled down and slightly off-screen) */
    .pop-up-container.hidden-popup .pop-up-form {
        transform: scale(0.95) translateY(20px);
        transition: transform 0.3s ease;
    }

    /* MODIFIED: Active state of the form (original size) */
    .pop-up-container:not(.hidden-popup) .pop-up-form {
        transform: scale(1) translateY(0);
    }

    .pop-up-container {
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.4);
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        inset: 0;
    }

    .pop-up-form {
        width: 25%;
        background-color: #fff;
        border-radius: 12px;
        padding: 20px 24px;

    }

    form .form-item {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-bottom: 16px;
    }

    .form-item label {
        font-size: 12px;
        font-weight: 500;
        margin: 0;
    }

    .form-item label span {
        color: #e31e24 !important;
    }

    .form-item input,
    .form-item textarea {
        padding: 8px;
        border-radius: 6px;
        border: 1px solid #ccc;
        font-size: 14px;
        color: #777;
    }

    input::placeholder,
    textarea::placeholder {
        color: #777;
        opacity: 0.6;
    }

    .form-heading {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .form-item .form-btn {
        width: 100%;
        background-color: #e31e24;
        color: #fff;
        padding: 12px;
        border-radius: 6px;
        transition: background-color 0.4s ease-in-out;
    }

    .form-item .close-btn i {
        font-size: 24px;
        transition: all 0.4s ease-in-out;
        color: #007bff;
    }

    .pop-up-form .form-heading .close-btn:hover i {
        color: #e31e24;
        transform: rotate('180deg');
    }
    

</style>

<body>
    <div class="pop-up-container hidden-popup">
                <div class="pop-up-form">
                    <div class="form">
                        <form action="">
                            <div class="form-heading">
                                <h3>Get In Touch</h3>
                                <div class="close-btn">
                                    <i class="fa-solid fa-x"></i>
                                </div>
                            </div>
                            <div class=form-item>
                                <label for="name">Name <span>*</span></label>
                                <input name="name" id="name" type="text" placeholder="Enter your name">
                            </div>
                            <div class=form-item>
                                <label for="email">Email <span>*</span></label>
                                <input name="email" id="email" type="text" placeholder="Enter your email">
                            </div>
                            <div class=form-item>
                                <label for="mobile">Mobile <span>*</span></label>
                                <input name="mobile" id="mobile" type="text" placeholder="Enter your phone number">
                            </div>
                            <div class=form-item>
                                <label for="message">Message <span>*</span></label>
                                <textarea name="message" id="message" rows="3" placeholder="Message"></textarea>
                            </div>
                            <div class="form-item">
                                <button class="form-btn">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        


        <script>
            document.addEventListener("DOMContentLoaded", ()={

            })
        </script>

</body>

</html>