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

           <meta name="robots" content=" noindex,  nofollow">
    
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">


<link rel="icon" type="image/png" href="favicon/favicon-96x96.png" sizes="96x96" />
<link rel="icon" type="image/svg+xml" href="favicon/favicon.svg" />
<link rel="shortcut icon" href="favicon/favicon.ico" />
<link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-touch-icon.png" />
<meta name="apple-mobile-web-app-title" content="MyWebSite" />
<link rel="manifest" href="favicon/site.webmanifest" />


</head>



<style>
    .wood-card img {
        width: 100%;
        height: 320px;
        object-fit: cover;
        border-radius: 6px;
    }

    .wood-title {
        font-weight: 600;
        text-align: center;
    }

    .wood-subtitle {
        color: #777;
        font-size: 14px;
    }

    /* Sticky Sidebar */
    .sticky-sidebar {
        position: sticky;
        top: 20px;
    }

    .range-btn {
        padding: 10px 12px;
        border: 1px solid #ddd;
        background: #fff;
        width: 100%;
        text-align: left;
        cursor: pointer;
        border-radius: 6px;
        margin-bottom: 8px;
        font-weight: 500;
    }

    .range-btn.active {
        background: #e31e24;
        color: white;
        border-color: #e31e24;
    }

    .wood-card img {
        width: 100%;
        height: 320px;
        object-fit: cover;
        border-radius: 6px;
        transition: transform 0.4s ease;
        /* added */
    }

    .wood-card:hover img {
        transform: scale(1.06);
        /* added */
    }

    .sticky-sidebar {
        position: sticky;
        top: 20px;
        z-index: 10;
    }

    .page-wrapper {
        overflow: unset;
    }

    /* --- Custom Layout Styles (MODIFIED) --- */

    /* 1. Only the viewer starts hidden now */
    .layout-viewer {
        display: none;
        padding-top: 100px;
    }

    /* 2. Style the inner row for transitions. All inner rows start collapsed/hidden */
    .area>.row,
    .layout-viewer>.row {
        opacity: 0;
        max-height: 0;
        overflow: hidden;
        transition: opacity 0.5s ease-in-out, max-height 0.8s ease-in-out;
    }

    /* 3. The class applied by JS (.is-active-step) targets the PARENT to enable display... */
    .is-active-step {
        display: block !important;
    }

    /* 4. ...and then target the INNER ROW to trigger the smooth transition. */
    .is-active-step>.row {
        opacity: 1;
        max-height: 1000px;
        /* Must be a fixed large value */
    }

    /* 5. INITIAL SETUP: The area section should start active/visible. */
    .area {
        display: block;
        padding-top: 100px;
        padding-bottom:100px;
    }

    /* Ensure the inner row of .area starts fully visible by applying the 'active' properties */
    .area>.row {
        opacity: 1;
        max-height: none;
    }

    /* --- End Custom Layout Styles --- */

    .layout-card {
        width: 100%;
        height: 400px;
        margin: 16px;
        box-sizing: border-box;
        overflow: hidden;
        position: relative;
    }

    .layout-card img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all .3s ease;
    }

    .layout-card:hover img {
        transform: scale(1.1);
        filter: grayscale(0.1);
    }

    .layout-card .layout-title {
        width: 100%;
        position: absolute;
        z-index: 10;
        bottom: 0;
        left: 0;
        padding: 16px 24px;
        color: #fff;
        text-shadow: 1px 1px 2px #ccc;
        text-align: center;
        font-weight: 400;
        font-size: 24px;
        transform: translateY(16px);
        transition: transform 0.4s ease-in;

    }

    .layout-title::before {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(rgba(0, 0, 0, 0.2), transparent, rgba(0, 0, 0, 0.2));
        opacity: 0.4;
        transform: translateY(100%);
        transition: transform 0.3s ease-in-out;
    }

    .layout-card:hover .layout-title,
    .layout-card:hover .layout-title::before {
        transform: translateY(0);
    }

    .layout-viewer .row>.col-lg-3 {
        min-height: 560px;
        max-height: 600px;
    }

    .layout-viewer .row>.col-lg-9 {
        min-height: 300px;
        max-height: 640px;

    }

    /* ADDED: Apply consistent vertical padding to all columns within the viewer */
    .layout-viewer .row>[class*="col-lg-"] {
        padding-top: 12px;
        padding-bottom: 12px;
    }

    .layout-sidebar {
        height: 100%;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        padding: 16px 24px;
        /* Inner padding for sidebar content */
        border: 1px solid rgba(0, 0, 0, 0.1);

    }

    .layout-item {
        display: flex;
        flex-direction: column;
        margin-bottom: 12px;
    }

    .layout-item h3 {
        font-size: 18px;
        font-weight: 400;
        white-space-collapse: preserve-breaks;
    }

    .layout-item .radio-container {
        margin-top: 8px;

    }

    .radio-container .radio-item {
        padding-right: 12px;
        border: 1px solid rgba(128, 128, 128, 0.2);
        text-align: center;
        padding: 8px 16px;
        margin: 8px;
    }


    /* Update the active style for the new finish-item div */
    .radio-container .finish-item {
        cursor: pointer;
        /* Ensure it looks clickable */
        /* Padding/styling inherited from .radio-item */
    }

    .radio-container .finish-item.is-selected {
        background: #e31e24;
        /* Primary brand color from .range-btn.active */
        color: white;
        border-color: #e31e24;
        font-weight: 500;
    }

    .product-color {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        margin-top: 24px;
        padding: 0 20px;
    }

    .layout-viewer {
        height: fit-content;
        padding: 80px 36px;
        /* Padding for the entire layout container */
        background-color: rgba(128, 128, 128, 0.1);
        overflow: hidden;
        position: relative;

    }

    .layout-viewer-img {
        width: 100%;
        height: 100%;
        background-color: #ccc;
        border: 1px solid rgba(128, 128, 128, 0.4);
    }

    .layout-viewer-img img {
        width: 100%;
        height: 100%;
        object-fit: fill;
    }

    .border.is-selected {
        /* Example: Add a thicker border to indicate selection */
        outline: 3px solid #007bff;
        outline-offset: 1px;
    }

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
    .product-code{
        text-align:center;
        padding:16px 24px;
        background-color:rgba(255, 255, 255);
        transform:translateY(-50%);
        width:96%;
        margin:0 auto;
        z-index: 10;

    }
    @media only screen and (max-width:991px) {
        .layout-card{
            height:250px;
            margin:0;
            margin-bottom:16px;
        }
        .layout-sidebar{
            height:auto;
        }
        .radio-container{
            display: flex;
        }
        .pop-up-form{
            width:64%;
        }
        .layout-viewer-img{
            margin-bottom:24px;
        }
        .layout-viewer .row>[class*="col-lg-"] {
            padding-top: 24px;
            padding-bottom: 24px;
        }
    }
    @media only screen and (max-width:768px) {
        .pop-up-form{
            width:90%;
        }
        .layout-viewer{
            padding-right:0;
            padding-left:0;
        }
        .radio-container{
            flex-wrap:wrap;
        }
        .layout-viewer .row>[class*="col-lg-"] {
            padding-top: 24px;
            padding-bottom: 24px;
        }
    }
</style>

<body>

    <div class="page-wrapper">

        <?php require_once 'header.php'; ?>

        <section class="page-title" style="background-image:url(./img/banner/about/about-bg.jpg)">
            <div class="auto-container">
                <div class="content">
                    <h2>Design Your Own Interior</h2>
                    <ul class="page-breadcrumb">
                        <li><a href="index.php">Home</a></li>
                        <li>Design Your Own Interior</li>
                    </ul>
                </div>
            </div>
        </section>
        <section class="layout">
            <div class="container">

                <div class="area">
                    <div class="row">
                        <div class="col-12 sec-title style-two centered">
                            <div class="inner-title">
                                <h2>Create Your Perfect Living Space</h2>
                                <div class="text" style="color: #666666;">Design your own interior by exploring styles,
                                    customizing layouts, and selecting finishes that help you turn your ideas into a
                                    personalized, real-world living space.</div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6">
                            <div class="layout-card" data-target="layout-viewer" data-area-id="kitchen"
                                data-area-name="Kitchen" style="cursor: pointer;">
                                <img src="./img/products/kitchen/kitchen.jpg" alt="">
                                <div class="layout-title">
                                    <h4>Kitchen</h4>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6">
                            <div class="layout-card" data-target="layout-viewer" data-area-id="wardrobe"
                                data-area-name="Wardrobe" style="cursor: pointer;">
                                <img src="./img/products/wardrobe/wardrobe.jpg" alt="">
                                <div class="layout-title">
                                    <h4>Wardrobe</h4>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6">
                            <div class="layout-card" data-target="layout-viewer" data-area-id="tv-unit"
                                data-area-name="tv-unit" style="cursor: pointer;">
                                <img src="./img/products/tv-unit/tv.jpg" alt="">
                                <div class="layout-title">
                                    <h4>TV Units</h4>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6">
                            <div class="layout-card" data-target="layout-viewer" data-area-id="vanity"
                                data-area-name="vanity" style="cursor: pointer;">
                                <img src="./img/products/vanity/vanity.jpg" alt=""
                                    style="object-position: left center;">
                                <div class="layout-title">
                                    <h4>Vanity</h4>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4 col-md-6">
                            <div class="layout-card" data-target="layout-viewer" data-area-id="living-room"
                                data-area-name="living-room" style="cursor: pointer;">
                                <img src="./img/products/living-room/living-room.jpg" alt="">
                                <div class="layout-title">
                                    <h4>Living Room</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
        <section class="layout-viewer">
            <div class="max-layout-width">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-12 sec-title style-two centered">
                            <h2>Area Customization</h2>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-9">
                            <div class="layout-viewer-img">
                                <img src="" alt="Product Viewer">
                                <div class="product-code">
                                    <h4  id="product-code">1301 Red | Solid</h4>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3">
                            <div class="layout-sidebar material-selection">
                                <h3>Product Finish</h3>
                                <div class="radio-container finish-selector">
                                    <div class="radio-item finish-item is-selected" data-finish-id="acrylux">
                                        Acrylux
                                    </div>
                                    <div class="radio-item finish-item" data-finish-id="acrysilk">
                                        Acrysilk
                                    </div>
                                    <div class="radio-item finish-item" data-finish-id="acrymatte">
                                        Acrymatte
                                    </div>
                                    <div class="radio-item finish-item" data-finish-id="acryglass">
                                        Acryglass
                                    </div>
                                    <div class="radio-item finish-item" data-finish-id="acryglass-matte">
                                        Acryglass-Matte
                                    </div>
                                </div>

                                <div class="layout-item" id="color-palettes">
                                    <div class="acrylux">
                                        <div class="product-color">
                                            <div class="border"
                                                style="width:50px; height:50px; background-color: #a90427; border-radius:12px; cursor: pointer;"
                                                data-color="#a90427" data-productCode="1301 Red | Solid">

                                            </div>
                                            <div class="border"
                                                style="width:50px; height:50px; background-color: #ffffff; border-radius:12px; cursor: pointer;"
                                                data-color="#ffffff" data-productCode="1302 White | Solid">

                                            </div>
                                            <div class="border"
                                                style="width:50px; height:50px; background-color: #f5f1de; border-radius:12px; cursor: pointer;"
                                                data-color="#f5f1de" data-productCode="1303 Cream | Solid">

                                            </div>
                                            <div class="border"
                                                style="width:50px; height:50px; background-color: #a0001a; border-radius:12px; cursor: pointer;"
                                                data-color="#a0001a" data-productCode="2304 Wine Red | Solid">

                                            </div>
                                            <div class="border"
                                                style="width:50px; height:50px; background-color: #000000; border-radius:12px; cursor: pointer;"
                                                data-color="#000000" data-productCode="1305 Black | Solid">

                                            </div>
                                            <div class="border"
                                                style="width:50px; height:50px; background-color: #beb3a5; border-radius:12px; cursor: pointer;"
                                                data-color="#beb3a5" data-productCode="2308 Stone Grey | Solid">

                                            </div>
                                            <div class="border"
                                                style="width:50px; height:50px; background-color: #d9a788; border-radius:12px; cursor: pointer;"
                                                data-color="#d9a788" data-productCode="1315 Cappucinno | Solid">

                                            </div>
                                            <div class="border"
                                                style="width:50px; height:50px; background-color: #461340; border-radius:12px; cursor: pointer;"
                                                data-color="#461340" data-productCode="1317 Purple | Solid">

                                            </div>
                                            <div class="border"
                                                style="width:50px; height:50px; background-color: #c4ad29; border-radius:12px; cursor: pointer;"
                                                data-color="#c4ad29" data-productCode="2318 Green | Solid">

                                            </div>
                                            <div class="border"
                                                style="width:50px; height:50px; background-color: #373142; border-radius:12px; cursor: pointer;"
                                                data-color="#373142" data-productCode="1323 Dark Grey | Solid">

                                            </div>
                                            <div class="border"
                                                style="width:50px; height:50px; background-color: #007c84; border-radius:12px; cursor: pointer;"
                                                data-color="#007c84" data-productCode="1327 Turquoise | Solid">

                                            </div>
                                            <div class="border"
                                                style="width:50px; height:50px; background-color: #fffcf3; border-radius:12px; cursor: pointer;"
                                                data-color="#fffcf3" data-productCode="1330 Designer White | Solid">

                                            </div>
                                            <div class="border"
                                                style="width:50px; height:50px; background-color: #afcbd8; border-radius:12px; cursor: pointer;"
                                                data-color="#afcbd8" data-productCode="1331 Feather Blue | Solid">

                                            </div>
                                            <div class="border"
                                                style="width:50px; height:50px; background-color: #005e92; border-radius:12px; cursor: pointer;"
                                                data-color="#005e92" data-productCode="1332 Cobalt Blue | Solid">

                                            </div>
                                            <div class="border"
                                                style="width:50px; height:50px; background-color: #93a398; border-radius:12px; cursor: pointer;"
                                                data-color="#93a398" data-productCode="1333 Sea Green | Solid">

                                            </div>
                                            <div class="border"
                                                style="width:50px; height:50px; background-color: #efe9e1; border-radius:12px; cursor: pointer;"
                                                data-color="#efe9e1" data-productCode="1336 Grey | Solid">

                                            </div>
                                            <div class="border"
                                                style="width:50px; height:50px; background-color: #ded5cf; border-radius:12px; cursor: pointer;"
                                                data-color="#ded5cf" data-productCode="1337 Cashmere | Solid">

                                            </div>
                                            <div class="border"
                                                style="width:50px; height:50px; background-color: #64696e; border-radius:12px; cursor: pointer;"
                                                data-color="#64696e" data-productCode="1339 State Grey | Solid">

                                            </div>
                                            <div class="border"
                                                style="width:50px; height:50px; background-color: #4a6158; border-radius:12px; cursor: pointer;"
                                                data-color="#4a6158" data-productCode="1318 Verde Gloss | Solid">

                                            </div>
                                            <div class="border"
                                                style="width:50px; height:50px; background-color: #734d4e; border-radius:12px; cursor: pointer;"
                                                data-color="#734d4e" data-productCode="1319 Rosso Gloss | Solid">

                                            </div>
                                            <div class="border"
                                                style="width:50px; height:50px; background-color: #aab8b9; border-radius:12px; cursor: pointer;"
                                                data-color="#aab8b9" data-productCode="1306 Metallic Grey">

                                            </div>
                                            <div class="border"
                                                style="width:50px; height:50px; background-color: #f2f3f4; border-radius:12px; cursor: pointer;"
                                                data-color="#f2f3f4" data-productCode="2307 White | Metallic">

                                            </div>
                                            <div class="border"
                                                style="width:50px; height:50px; background-color: #759ba8; border-radius:12px; cursor: pointer;"
                                                data-color="#759ba8" data-productCode="1314 Metallic Blue | Metallic">

                                            </div>
                                            <div class="border"
                                                style="width:50px; height:50px; background-color: #6a7178; border-radius:12px; cursor: pointer;"
                                                data-color="#6a7178" data-productCode="1322 Anthrasite | Metallic">

                                            </div>
                                            <div class="border"
                                                style="width:50px; height:50px; background-color: #1d1d27; border-radius:12px; cursor: pointer;"
                                                data-color="#1d1d27" data-productCode="1324 Metallic Black | Metallic">

                                            </div>
                                            <div class="border"
                                                style="width:50px; height:50px; background-color: #aa9c99; border-radius:12px; cursor: pointer;"
                                                data-color="#aa9c99" data-productCode="1338 Metallic Beige | Metallic">

                                            </div>
                                            <div class="border"
                                                style="width:50px; height:50px; background-color: #b1b1a7; border-radius:12px; cursor: pointer;"
                                                data-color="#b1b1a7" data-productCode="1340 Metallic Basalt | Metallic">

                                            </div>
                                        </div>
                                    </div>
                                    <div class="acrymatte">
                                        <div class="product-color">
                                            <div class="border" data-color="#ffffff" data-productCode="3302 White | Solid"
                                                style="width:50px; height:50px; background-color: #ffffff; border-radius:12px; cursor: pointer;">
                                            </div>

                                            <div class="border" data-color="#f1edd6" data-productCode="3303 Cream | Solid"
                                                style="width:50px; height:50px; background-color: #f1edd6; border-radius:12px; cursor: pointer;">
                                            </div>

                                            <div class="border" data-color="#1a1b2a" data-productCode="3305 Black | Solid"
                                                style="width:50px; height:50px; background-color: #1a1b2a; border-radius:12px; cursor: pointer;">
                                            </div>

                                            <div class="border" data-color="#c6b5a3" data-productCode="3315 cappucinno | Solid"
                                                style="width:50px; height:50px; background-color: #c6b5a3; border-radius:12px; cursor: pointer;">
                                            </div>

                                            <div class="border" data-color="#4a6158" data-productCode="3318 Verde | Solid"
                                                style="width:50px; height:50px; background-color: #4a6158; border-radius:12px; cursor: pointer;">
                                            </div>

                                            <div class="border" data-color="#734d4e" data-productCode="3319 Rosso | Solid"
                                                style="width:50px; height:50px; background-color: #734d4e; border-radius:12px; cursor: pointer;">
                                            </div>

                                            <div class="border" data-color="#5b5b5b" data-productCode="3323 Dark Grey | Solid"
                                                style="width:50px; height:50px; background-color: #5b5b5b; border-radius:12px; cursor: pointer;">
                                            </div>

                                            <div class="border" data-color="#5b5b5b" data-productCode="3325  Urban Grey | Solid"
                                                style="width:50px; height:50px; background-color: #5b5b5b; border-radius:12px; cursor: pointer;">
                                            </div>

                                            <div class="border" data-color="#719ca9" data-productCode="3331 Feather Blue | Solid"
                                                style="width:50px; height:50px; background-color: #719ca9; border-radius:12px; cursor: pointer;">
                                            </div>
                                            <div class="border" data-color="#a9bdc3" data-productCode="3333 Sea Green | Solid"
                                                style="width:50px; height:50px; background-color: #a9bdc3; border-radius:12px; cursor: pointer;">
                                            </div>
                                            <div class="border" data-color="#29304d" data-productCode="3334 Royal Blue | Solid"
                                                style="width:50px; height:50px; background-color: #29304d; border-radius:12px; cursor: pointer;">
                                            </div>
                                            <div class="border" data-color="#e6e6e1" data-productCode="3335 Light Grey | Solid"
                                                style="width:50px; height:50px; background-color: #e6e6e1; border-radius:12px; cursor: pointer;">
                                            </div>
                                            <div class="border" data-color="#6c6c74" data-productCode="3336 Grey | Solid"
                                                style="width:50px; height:50px; background-color: #6c6c74; border-radius:12px; cursor: pointer;">
                                            </div>
                                            <div class="border" data-color="#dbd6d0" data-productCode="3337 Cashmere | Solid"
                                                style="width:50px; height:50px; background-color: #dbd6d0; border-radius:12px; cursor: pointer;">
                                            </div>
                                            <div class="border" data-color="#8b8b81" data-productCode="3339 State Grey | Solid"
                                                style="width:50px; height:50px; background-color: #8b8b81; border-radius:12px; cursor: pointer;">
                                            </div>
                                            <div class="border" data-color="#4f4c49" data-productCode="3322 Anthrasite | Solid"
                                                style="width:50px; height:50px; background-color: #4f4c49; border-radius:12px; cursor: pointer;">
                                            </div>
                                            <div class="border" data-color="#b69d85" data-productCode="3338 Metallic Beige | Solid"
                                                style="width:50px; height:50px; background-color: #b69d85; border-radius:12px; cursor: pointer;">
                                            </div>
                                        </div>

                                    </div>
                                    <div class="acryglass">
                                        <div class="product-color">
                                            <div class="border" data-color="#ffffff" data-productCode="402 White"
                                                style="width:50px; height:50px; background-color: #ffffff; border-radius:12px; cursor: pointer;">
                                            </div>

                                            <div class="border" data-color="#f4f1de" data-productCode="403 Cream"
                                                style="width:50px; height:50px; background-color: #f4f1de; border-radius:12px; cursor: pointer;">
                                            </div>

                                            <div class="border" data-color="#c8b8a3" data-productCode="415 Beige"
                                                style="width:50px; height:50px; background-color: #c8b8a3; border-radius:12px; cursor: pointer;">
                                            </div>

                                            <div class="border" data-color="#bbd2c8" data-productCode="418 Sea Green"
                                                style="width:50px; height:50px; background-color: #bbd2c8; border-radius:12px; cursor: pointer;">
                                            </div>

                                            <div class="border" data-color="#7f7b7a" data-productCode="423 Dark Grey"
                                                style="width:50px; height:50px; background-color: #7f7b7a; border-radius:12px; cursor: pointer;">
                                            </div>

                                            <div class="border" data-color="#bec3ba" data-productCode="439 State Grey"
                                                style="width:50px; height:50px; background-color: #bec3ba; border-radius:12px; cursor: pointer;">
                                            </div>
                                        </div>

                                    </div>
                                    <div class="acrysilk" style="display: none;">
                                        <div class="product-color">
                                            <div class="border" data-color="#c5bbbb" data-productCode="5001 | Patine"
                                                style="width:50px; height:50px; background-color: #c5bbbb; border-radius:12px; cursor: pointer;">
                                            </div>
                                             <div class="border" data-color="#c7a69a" data-productCode="5002 | Aurum"
                                                style="width:50px; height:50px; background-color: #c7a69a; border-radius:12px; cursor: pointer;">
                                            </div>
                                             <div class="border" data-color="#a1a9ad" data-productCode="5003 | Argenti"
                                                style="width:50px; height:50px; background-color: #a1a9ad; border-radius:12px; cursor: pointer;">
                                            </div>
                                             <div class="border" data-color="#9a9a9d" data-productCode="5004 | Scandia"
                                                style="width:50px; height:50px; background-color: #9a9a9d; border-radius:12px; cursor: pointer;">
                                            </div>
                                             <div class="border" data-color="#666767" data-productCode="5005 | Griseo"
                                                style="width:50px; height:50px; background-color: #666767; border-radius:12px; cursor: pointer;">
                                            </div>
                                              <div class="border" data-color="#334734" data-productCode="5006 | Cuprous"
                                                style="width:50px; height:50px; background-color: #334734; border-radius:12px; cursor: pointer;">
                                            </div>

                                        </div>
                                    </div>
                                    <div class="acryglass-matte" style="display: none;">
                                        <div class="product-color">
                                            <div class="border" data-color="#ffffff" data-productCode="302 White"
                                                style="width:50px; height:50px; background-color: #ffffff; border-radius:12px; cursor: pointer;">
                                            </div>
                                            <div class="border" data-color="#f8f4e4" data-productCode="303 Cream"
                                                style="width:50px; height:50px; background-color: #f8f4e4; border-radius:12px; cursor: pointer;">
                                            </div>
                                              <div class="border" data-color="#d1c0ac" data-productCode="315 Beige"
                                                style="width:50px; height:50px; background-color: #d1c0ac; border-radius:12px; cursor: pointer;">
                                            </div>
                                              <div class="border" data-color="#c5ded6" data-productCode="318 Sea Green"
                                                style="width:50px; height:50px; background-color: #c5ded6; border-radius:12px; cursor: pointer;">
                                            </div>
                                              <div class="border" data-color="#63615d" data-productCode="323 Dark Grey"
                                                style="width:50px; height:50px; background-color: #63615d; border-radius:12px; cursor: pointer;">
                                            </div>
                                              <div class="border" data-color="#bfc5bc" data-productCode="339 State Grey"
                                                style="width:50px; height:50px; background-color: #bfc5bc; border-radius:12px; cursor: pointer;">
                                            </div>
                                                <div class="border" data-color="#bc8a69" data-productCode="340 Brown | Metallic"
                                                style="width:50px; height:50px; background-color: #bc8a69; border-radius:12px; cursor: pointer;">
                                            </div>
                                                <div class="border" data-color="#525158" data-productCode="341 Titanio | Metallic"
                                                style="width:50px; height:50px; background-color: #525158; border-radius:12px; cursor: pointer;">
                                            </div>

                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
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
        </section>





        <script>
            document.addEventListener('DOMContentLoaded', () => {
                
                // --- 1. Element References & State Variables ---
                const finishItems = document.querySelectorAll('.finish-selector .finish-item');
                const colorPalettesContainer = document.getElementById('color-palettes');
                const imageElement = document.querySelector('.layout-viewer-img img');
                const colorPalettes = document.querySelectorAll('.layout-item > div');
                let currentFinish = null;
                let currentArea = null; // Stores the identifier for the selected area (e.g., 'kitchen')

                // Navigation Elements
                const areaCards = document.querySelectorAll('.area .layout-card');
                const areaSection = document.querySelector('.area');
                const viewerSection = document.querySelector('.layout-viewer');
                const productCode = document.getElementById('product-code');
                const viewerTitle = viewerSection.querySelector('.sec-title h2');
                // ADDED: Reference to the popup container
                const popupContainer = document.querySelector('.pop-up-container');
                // ADDED: Reference to the close button
                const closePopupButton = popupContainer.querySelector('.close-btn');


                // --- 2. Helper Functions for Smooth Navigation (UNCHANGED) ---

                /** Activates a section, ensuring inline 'display: none' is removed before applying active class. */
                function setActive(element) {
                    element.style.display = 'block';
                    requestAnimationFrame(() => {
                        element.classList.add('is-active-step');
                    });
                }

                /** Deactivates a section and sets 'display: none' only after the transition completes. */
                function setInactive(element, callback) {
                    const innerRow = element.querySelector('.row');
                    element.classList.remove('is-active-step');

                    if (!innerRow || element.style.display === 'none') {
                        element.style.display = 'none';
                        if (callback) callback();
                        return;
                    }

                    let transitionHandled = false;
                    const handleTransitionEnd = (event) => {
                        // Check event property name to ensure we are listening to the correct transition (e.g., max-height)
                        if (event.propertyName === 'max-height') {
                            if (!element.classList.contains('is-active-step')) {
                                element.style.display = 'none';
                                transitionHandled = true;
                                if (callback) callback();
                            }
                            innerRow.removeEventListener('transitionend', handleTransitionEnd);
                        }
                    };
                    innerRow.addEventListener('transitionend', handleTransitionEnd);

                    // Fallback timeout
                    setTimeout(() => {
                        if (!transitionHandled && element.style.display !== 'none' && !element.classList.contains('is-active-step')) {
                            element.style.display = 'none';
                            if (callback) callback();
                        }
                    }, 900);
                }

                // --- 3. Area Selection Handler (Step 1) ---
                areaCards.forEach(card => {
                    card.addEventListener('click', () => {
                        const targetClass = card.getAttribute('data-target');

                        // 1. Get Area Info & Set State
                        const areaName = card.getAttribute('data-area-name') || card.querySelector('h4').textContent;
                        currentArea = card.getAttribute('data-area-id') || areaName.toLowerCase().replace(/\s/g, '-');

                        if (targetClass === 'layout-viewer') {

                            // 2. Hide Area Section
                            setInactive(areaSection, () => {
                                // 3. Show Viewer Section (Callback executes after areaSection is hidden)
                                viewerTitle.textContent = areaName + ' Customization';
                                setActive(viewerSection);

                                // 4. Force image update based on the currently selected finish/color and the NEW area.
                                const selectedFinishItem = document.querySelector('.finish-selector .finish-item.is-selected');
                                if (selectedFinishItem) {
                                    const selectedId = selectedFinishItem.getAttribute('data-finish-id');
                                    // Use the currently selected color swatch, or the first one if none is selected
                                    const activePalette = document.querySelector(`.layout-item > .${selectedId}`);
                                    let selectedColorSwatch = activePalette ? activePalette.querySelector('.border.is-selected') : null;
                                    if (!selectedColorSwatch) {
                                        selectedColorSwatch = activePalette ? activePalette.querySelector('.border') : null;
                                    }

                                    if (selectedColorSwatch) {
                                        updateImageSource(selectedId, selectedColorSwatch.dataset.color);
                                    }
                                }
                                viewerSection.scrollIntoView({ behavior: 'smooth' });
                                setTimeout(() => {
                                    showPopup();
                                }, 1000);
                            });
                        } else {
                            console.error(`Unexpected target: ${targetClass}. Expected 'layout-viewer'.`);
                        }
                    });
                });
                // ADDED: Function to show the popup
                function showPopup() {
                    // Remove the class to start the transition
                    popupContainer.classList.remove("hidden-popup");
                    // Disable scroll on the body
                    document.body.classList.add('no-scroll');
                }

                // ADDED: Function to hide the popup
                function hidePopup() {
                    // Add the class to start the transition
                    popupContainer.classList.add("hidden-popup");
                    setTimeout(() => {
                        document.body.classList.remove('no-scroll');
                    }, 300);
                }
                // ADDED: Close button listener
                closePopupButton.addEventListener('click', hidePopup);
                popupContainer.addEventListener('click', (event) => {
                    // Check if the clicked element is the container itself, not any of its children (the form)
                    if (event.target === popupContainer) {
                        hidePopup();
                    }
                });

                // --- 4. Image Source Generation Function (PRIMARY & FALLBACK) ---
                function generateImagePath(finishId, hexColor) {
                    if (!currentArea) {
                        return 'https://via.placeholder.com/800x400/f00?text=Select+Area+First';
                    }
                    const sanitizedColor = hexColor.replace('#', '');
                    // Path structure: /img/products/[area]/[finish]_[color].png
                    return `./img/products/${currentArea}/${finishId}_${sanitizedColor}.jpg`;
                }

                function generateFallbackPath() {
                    if (!currentArea) {
                        return 'https://via.placeholder.com/800x400/f00?text=Select+Area+First';
                    }
                    // Fallback path: /img/products/[area]/default.png
                    return `./img/products/${currentArea}/default.jpg`;
                }

                /**
                 * Central function to update the image source with built-in fallback.
                 */
                function updateImageSource(finishId, hexColor) {
                    const primarySrc = generateImagePath(finishId, hexColor);
                    const fallbackSrc = generateFallbackPath();

                    // Set the onerror handler on the image element
                    imageElement.onerror = function () {
                        // This check prevents an infinite loop if the fallback image itself is missing.
                        if (imageElement.src.includes(fallbackSrc)) {
                            console.warn("Fallback image is also missing. Stopping.");
                            // Set a simple placeholder if even the fallback fails
                            imageElement.src = 'https://via.placeholder.com/800x400/ccc?text=Image+Unavailable';
                        } else {
                            console.warn(`Image not found at ${primarySrc}. Loading fallback image: ${fallbackSrc}`);
                            // Load the fallback image for the current area
                            imageElement.src = fallbackSrc;
                        }
                        // Important: Remove the onerror handler to prevent it from firing unnecessarily on subsequent successful loads
                        imageElement.onerror = null;
                    };

                    // 3. Update the image source (which triggers the load attempt and the onerror check)
                    console.log(`Attempting to load image: ${primarySrc}`);
                    imageElement.src = primarySrc;
                }


                // --- 5. Handle Color Swatch Click ---
                function handleColorSelection(event) {
                    const target = event.target.closest('.border');

                    if (target && currentFinish && currentArea) {
                        const hexColor = target.dataset.color;
                        const productCoded = target.dataset.productcode;
                        // console.log(productCoded);
                        if (!hexColor) {
                            console.error("Color swatch is missing the 'data-color' attribute.");
                            return;
                        }
                        if (!productCoded) {
                            console.error("Color swatch is missing the 'data-productcolor' attribute.");
                            return;
                        }
                        // 1. Remove selection from all swatches in the *current* active palette
                        const activePalette = document.querySelector(`.layout-item > .${currentFinish}`);
                        if (activePalette) {
                            activePalette.querySelectorAll('.border').forEach(swatch => {
                                swatch.classList.remove('is-selected');
                            });
                        }
                        productCode.innerText = productCoded;
                        // 2. Add selection to the clicked swatch
                        target.classList.add('is-selected');
                        // 3. Update the displayed image using the centralized function
                        updateImageSource(currentFinish, hexColor);
                    }
                }

                // --- 6. Handle Finish (DIV Click) Change ---
                function updateProductFinish(selectedId, clickedElement) {
                    currentFinish = selectedId;

                    // 1. Update active class on the finish item divs
                    finishItems.forEach(item => item.classList.remove('is-selected'));
                    if (clickedElement) {
                        clickedElement.classList.add('is-selected');
                    }

                    // 2. Hide all palettes and show the active one
                    colorPalettes.forEach(palette => {
                        palette.style.display = 'none';
                    });
                    const activePalette = document.querySelector(`.layout-item > .${selectedId}`);

                    if (activePalette) {
                        activePalette.style.display = 'flex';

                        // 3. ***ALWAYS SELECT THE FIRST COLOR AND UPDATE IMAGE***
                        const firstColorSwatch = activePalette.querySelector('.border');

                        if (firstColorSwatch) {
                            // Ensure only the first swatch is selected
                            activePalette.querySelectorAll('.border').forEach(swatch => swatch.classList.remove('is-selected'));
                            firstColorSwatch.classList.add('is-selected');

                            const hexColor = firstColorSwatch.dataset.color;

                            // Only attempt to update the image if the area has been selected (currentArea is set)
                            if (currentArea && hexColor) {
                                updateImageSource(selectedId, hexColor); // Use centralized function
                            } else if (!currentArea) {
                                console.log("Finish changed, but area not yet selected. Image update deferred.");
                            }
                        } else {
                            console.warn(`No colors found for finish ID: ${selectedId}`);
                        }
                    } else {
                        console.warn(`No color palette found for finish ID: ${selectedId}`);
                    }
                }


                // --- 7. Attach Event Listeners ---
                finishItems.forEach(item => {
                    item.addEventListener('click', (event) => {
                        const selectedId = event.currentTarget.getAttribute('data-finish-id');
                        updateProductFinish(selectedId, event.currentTarget);
                    });
                });
                colorPalettesContainer.addEventListener('click', handleColorSelection);

                // --- 8. Initial Setup on Page Load ---
                viewerSection.style.display = 'none';

                const defaultSelectedFinish = document.querySelector('.finish-selector .finish-item.is-selected');

                if (defaultSelectedFinish) {
                    updateProductFinish(defaultSelectedFinish.getAttribute('data-finish-id'), defaultSelectedFinish);
                } else if (finishItems.length > 0) {
                    finishItems[0].classList.add('is-selected');
                    updateProductFinish(finishItems[0].getAttribute('data-finish-id'), finishItems[0]);
                }
            });
        </script>

        <?php include_once 'footer.php'; ?>


        <script src="js/jquery.js"></script>
        <script src="js/popper.min.js"></script>
        <script src="js/bootstrap.min.js"></script>

        <script src="plugins/revolution/js/jquery.themepunch.revolution.min.js"></script>
        <script src="plugins/revolution/js/jquery.themepunch.tools.min.js"></script>
        <script src="plugins/revolution/js/extensions/revolution.extension.actions.min.js"></script>
        <script src="plugins/revolution/js/extensions/revolution.extension.carousel.min.js"></script>
        <script src="plugins/revolution/js/extensions/revolution.extension.kenburn.min.js"></script>
        <script src="plugins/revolution/js/extensions/revolution.extension.layeranimation.min.js"></script>
        <script src="plugins/revolution/js/extensions/revolution.extension.migration.min.js"></script>
        <script src="plugins/revolution/js/extensions/revolution.extension.navigation.min.js"></script>
        <script src="plugins/revolution/js/extensions/revolution.extension.parallax.min.js"></script>
        <script src="plugins/revolution/js/extensions/revolution.extension.slideanims.min.js"></script>
        <script src="plugins/revolution/js/extensions/revolution.extension.video.min.js"></script>
        <script src="js/main-slider-script.js"></script>

        <script src="js/jquery.scrollTo.js"></script>
        <script src="js/appear.js"></script>
        <script src="js/jquery.mCustomScrollbar.concat.min.js"></script>
        <script src="js/jquery.fancybox.js"></script>
        <script src="js/owl.js"></script>
        <script src="js/wow.js"></script>
        <script src="js/jquery-ui.js"></script>
        <script src="js/paroller.js"></script>
        <script src="js/script.js"></script>

</body>

</html>