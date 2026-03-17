<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Suraj Wood | Products</title>
    <!-- Stylesheets -->
    <link href="css/bootstrap.css" rel="stylesheet">
    <link href="plugins/revolution/css/settings.css" rel="stylesheet" type="text/css">
    <!-- REVOLUTION SETTINGS STYLES -->
    <link href="plugins/revolution/css/layers.css" rel="stylesheet" type="text/css"><!-- REVOLUTION LAYERS STYLES -->
    <link href="plugins/revolution/css/navigation.css" rel="stylesheet" type="text/css">
    <!-- REVOLUTION NAVIGATION STYLES -->

    <link href="css/style.css" rel="stylesheet">
    <link href="css/responsive.css" rel="stylesheet">


    <!-- Responsive -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">





    <!--[if lt IE 9]><script src="https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.js"></script><![endif]-->
    <!--[if lt IE 9]><script src="js/respond.js"></script><![endif]-->
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
</style>

<body>

    <div class="page-wrapper">

        <!----- start header section ---->

        <?php require_once 'header.php'; ?>

        <!----- end header section ---->




        <!-- Page Title -->
        <section class="page-title" style="background-image:url(./img/banner/about/about-bg.jpg)">
            <div class="auto-container">
                <div class="content">
                    <h2>Design Your Own Interior</h2>
                    <!-- <div class="text">Bespoke Interior & Architecture Designing</div> -->
                    <ul class="page-breadcrumb">
                        <li><a href="index.php">Home</a></li>
                        <li>Design Your Own Interior</li>
                    </ul>
                </div>
            </div>
        </section>
        <!-- End Page Title -->



        <!-- Services Section Five -->
        <section class="services-section-five">
            <div class="pattern-layer" style="background-image:url(images/background/pattern-17.png)"></div>
            <div class="auto-container">
                <!-- Sec Title -->
                <div class="sec-title style-two centered">
                    <div class="inner-title">
                        <h2>Create Your Perfect Living Space</h2>
                        <div class="text" style="color: #666666;">Design your own interior by exploring styles,
                            customizing layouts, and selecting finishes that help you turn your ideas into a
                            personalized, real-world living space.</div>
                    </div>
                </div>



            </div>
        </section>
        <!-- End Services Section Five -->




        <section class="layout">
            <div class="container">
                
                <style>
                    /* 1. Set the Parent sections to be hidden until activated (except the initial .area) */
                    .kitchen-layout,
                    .wardrobe-layout,
                    .vanity-layout,
                    .tv-units,
                    .layout-viewer {
                        display: none;
                    }

                    /* 2. Style the inner row for transitions. All inner rows start collapsed/hidden */
                    .area>.row,
                    .kitchen-layout>.row,
                    .wardrobe-layout>.row,
                    .vanity-layout>.row,
                    .tv-units>.row,
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
                    }

                    /* Ensure the inner row of .area starts fully visible by applying the 'active' properties */
                    .area>.row {
                        opacity: 1;
                        max-height: none;
                    }

                    .layout-card {
                        width: 100%;
                        height: 360px;
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
                        filter: grayscale(0.75);
                    }

                    .layout-card .layout-title {
                        width: 100%;
                        position: absolute;
                        z-index: 10;
                        bottom: 0;
                        left: 0;
                        padding: 16px 24px;
                        color: #ccc;
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
                        max-height: 560px;
                    }

                    .layout-viewer .row>.col-lg-9 {
                        max-height: 560px;
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
                        font-size: 22px;
                        font-weight: 400;
                        white-space-collapse: preserve-breaks;
                    }

                    .layout-item .radio-container {
                        margin-top: 8px;
                        display: flex;
                        flex-wrap: wrap;
                        padding-left: 12px;
                    }

                    .radio-container .radio-item {
                        padding-right: 12px;
                    }

                    .radio-container .radio-item label {
                        font-size: 18px;
                    }

                    .product-color {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 12px;
                    }

                    .layout-viewer {
                        height: fit-content;
                        padding: 24px 36px;
                        /* Padding for the entire layout container */
                        background-color: rgba(128, 128, 128, 0.1);
                        overflow: hidden;

                    }

                    .layout-viewer-img {
                        width: 100%;
                        height: 100%;
                        background-color: #ccc;
                        border: 1px solid rgba(128, 128, 128, 0.4);
                    }

                    .border.is-selected {
                        /* Example: Add a thicker border to indicate selection */
                        outline: 3px solid #007bff;
                        outline-offset: 1px;
                    }
                </style>
                <div class="area">
                    <div class="row">
                        <div class="col-12 sec-title style-two centered">
                            <h2 class="text-center">Select Your Area to Design</h2>
                        </div>
                        <div class="col-lg-4">
                            <div class="layout-card" data-target="kitchen-layout">
                                <img src="" alt="">
                                <div class="layout-title">
                                    <h4>Kitchen</h4>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="layout-card" data-target="wardrobe-layout">
                                <img src="" alt="">
                                <div class="layout-title">
                                    <h4>Wardrobe</h4>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="layout-card" data-target="tv-layout">
                                <img src="" alt="">
                                <div class="layout-title">
                                    <h4>TV Units</h4>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="layout-card" data-target="vanity-layout">
                                <img src="" alt="">
                                <div class="layout-title">
                                    <h4>Vanity</h4>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="layout-card" data-target="kitchen-layout">
                                <img src="" alt="">
                                <div class="layout-title">
                                    <h4>Living Room</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="kitchen kitchen-layout">
                    <div class="row">
                        <div class="col-12 sec-title style-two centered">
                            <h2 class="text-center">Choose Your Kitchen Layout</h2>
                        </div>
                        <div class="col-lg-4">
                            <div class="layout-card">
                                <img src="" alt="">
                                <div class="layout-title">
                                    <h4>Parallel Kitchen</h4>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="layout-card">
                                <img src="" alt="">
                                <div class="layout-title">
                                    <h4>Straight Kitchen</h4>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="layout-card">
                                <img src="" alt="">
                                <div class="layout-title">
                                    <h4>U-Shape Kitchen</h4>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="layout-card">
                                <img src="" alt="">
                                <div class="layout-title">
                                    <h4>L-Shape Kitchen</h4>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="layout-card">
                                <img src="" alt="">
                                <div class="layout-title">
                                    <h4>Island Kitchen</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="wardrobe wardrobe-layout">
                    <div class="row">
                        <div class="col-12 sec-title style-two centered">
                            <h2 class="text-center">Choose Your Wardrobe Layout</h2>
                        </div>
                        <div class="col-lg-4">
                            <div class="layout-card">
                                <img src="" alt="">
                                <div class="layout-title">
                                    <h4>Walk-In Wardrobe</h4>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="layout-card">
                                <img src="" alt="">
                                <div class="layout-title">
                                    <h4>Sliding Wardrobe</h4>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="layout-card">
                                <img src="" alt="">
                                <div class="layout-title">
                                    <h4>Hinged Wardrobe</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="vanity vanity-layout">
                    <div class="row">
                        <div class="col-12 sec-title style-two centered">
                            <h2 class="text-center">Choose Your Vanity Layout</h2>
                        </div>
                        <div class="col-lg-4">
                            <div class="layout-card">
                                <img src="" alt="">
                                <div class="layout-title">
                                    <h4>Freestanding Vanity</h4>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="layout-card">
                                <img src="" alt="">
                                <div class="layout-title">
                                    <h4>Floating Vanity</h4>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="layout-card">
                                <img src="" alt="">
                                <div class="layout-title">
                                    <h4>Corner Vanity</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tv-units tv-layout">
                    <div class="row">
                        <div class="col-12 sec-title style-two centered">
                            <h2 class="text-center">Choose Your TV Unit Layout</h2>
                        </div>
                        <div class="col-lg-4">
                            <div class="layout-card">
                                <img src="" alt="">
                                <div class="layout-title">
                                    <h4>Wall-Mounted</h4>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="layout-card">
                                <img src="" alt="">
                                <div class="layout-title">
                                    <h4>Floating Shelves</h4>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="layout-card">
                                <img src="" alt="">
                                <div class="layout-title">
                                    <h4>Corner Units</h4>
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
                            <h2>Lorem ipsum dolor sit amet.</h2>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-9">
                            <div class="layout-viewer-img">
                                <img src="" alt="">
                            </div>
                        </div>
                        <div class="col-lg-3">
                            <div class="layout-sidebar material-selection">
                                <h3 style="">Select Product Finish</h3>
                                <div class="radio-container">
                                    <div class="radio-item">
                                        <input type="radio" name="product-type" id="acrylux">
                                        <label for="acrylux">Acrylux</label>
                                    </div>
                                    <div class="radio-item">
                                        <input type="radio" name="product-type" id="acrysilk">
                                        <label for="acrysilk">Acrysilk</label>
                                    </div>
                                    <div class="radio-item">
                                        <input type="radio" name="product-type" id="acrymatte">
                                        <label for="acrymatte">Acrymatte</label>
                                    </div>
                                    <div class="radio-item">
                                        <input type="radio" name="product-type" id="acryglass">
                                        <label for="acryglass">Acryglass</label>
                                    </div>
                                    <div class="radio-item">
                                        <input type="radio" name="product-type" id="acryglass-matte">
                                        <label for="acryglass-matte">Acryglass-Matte</label>
                                    </div>
                                </div>

                                <div class="layout-item" id="color-palettes">
                                    <div class="acrylux">
                                        <div class="product-color">
                                            <div class="border"
                                                style="width:50px; height:50px; background-color: #5a5a5a; border-radius:12px;"
                                                data-color="#5a5a5a">

                                            </div>
                                            <div class="border"
                                                style="width:50px; height:50px; background-color: #40e0d0; border-radius:12px;"
                                                data-color="#40e0d0">

                                            </div>
                                            <div class="border"
                                                style="width:50px; height:50px; background-color: #AA336A; border-radius:12px;"
                                                data-color="#AA336A">

                                            </div>
                                            <div class="border"
                                                style="width:50px; height:50px; background-color: #b6c9d8; border-radius:12px;"
                                                data-color="#b6c9d8">

                                            </div>
                                            <div class="border"
                                                style="width:50px; height:50px; background-color: #0047AB; border-radius:12px;"
                                                data-color="#0047AB">

                                            </div>
                                            <div class="border"
                                                style="width:50px; height:50px; background-color: #2E8B57; border-radius:12px;"
                                                data-color="#2E8B57">

                                            </div>
                                            <div class="border"
                                                style="width:50px; height:50px; background-color: #808080; border-radius:12px;"
                                                data-color="#808080">

                                            </div>
                                            <div class="border"
                                                style="width:50px; height:50px; background-color: #F1E6DD; border-radius:12px;"
                                                data-color="#F1E6DD">

                                            </div>
                                            <div class="border"
                                                style="width:50px; height:50px; background-color: #bdb8b0; border-radius:12px;"
                                                data-color="#bdb8b0">

                                            </div>
                                            <div class="border"
                                                style="width:50px; height:50px; background-color: #979797; border-radius:12px;"
                                                data-color="#979797">

                                            </div>
                                            <div class="border"
                                                style="width:50px; height:50px; background-color: #403c54; border-radius:12px;"
                                                data-color="#403c54">

                                            </div>
                                            <div class="border"
                                                style="width:50px; height:50px; background-color: #2C2C2C; border-radius:12px;"
                                                data-color="#2C2C2C">

                                            </div>
                                            <div class="border"
                                                style="width:50px; height:50px; background-color: #FF0000; border-radius:12px;"
                                                data-color="#FF0000">

                                            </div>
                                            <div class="border"
                                                style="width:50px; height:50px; background-color: #FFFFFF; border-radius:12px;"
                                                data-color="#FFFFFF">

                                            </div>
                                            <div class="border"
                                                style="width:50px; height:50px; background-color: #FFFDD0; border-radius:12px;"
                                                data-color="#FFFDD0">

                                            </div>
                                            <div class="border"
                                                style="width:50px; height:50px; background-color: #000000; border-radius:12px;"
                                                data-color="#000000">

                                            </div>
                                            <div class="border"
                                                style="width:50px; height:50px; background-color: #8D918D; border-radius:12px;"
                                                data-color="#8D918D">

                                            </div>
                                            <div class="border"
                                                style="width:50px; height:50px; background-color: #32325b; border-radius:12px;"
                                                data-color="#32325b">

                                            </div>
                                            <div class="border"
                                                style="width:50px; height:50px; background-color: #C5AB9F; border-radius:12px;"
                                                data-color="#C5AB9F">

                                            </div>
                                            <div class="border"
                                                style="width:50px; height:50px; background-color: #A020F0; border-radius:12px;"
                                                data-color="#A020F0">

                                            </div>
                                            <div class="border"
                                                style="width:50px; height:50px; background-color: #FFA500; border-radius:12px;"
                                                data-color="#FFA500">

                                            </div>
                                        </div>
                                    </div>
                                    <div class="acrymatte">
                                        <div class="product-color">
                                            <div class="border" data-color="#383e42"
                                                style="width:50px; height:50px; background-color: #383e42; border-radius:12px;">
                                            </div>

                                            <div class="border" data-color="#C5AB9F"
                                                style="width:50px; height:50px; background-color: #C5AB9F; border-radius:12px;">
                                            </div>

                                            <div class="border" data-color="#000000"
                                                style="width:50px; height:50px; background-color: #000000; border-radius:12px;">
                                            </div>

                                            <div class="border" data-color="#FFFDD0"
                                                style="width:50px; height:50px; background-color: #FFFDD0; border-radius:12px;">
                                            </div>

                                            <div class="border" data-color="#FFFFFF"
                                                style="width:50px; height:50px; background-color: #FFFFFF; border-radius:12px;">
                                            </div>

                                            <div class="border" data-color="#708090"
                                                style="width:50px; height:50px; background-color: #708090; border-radius:12px;">
                                            </div>

                                            <div class="border" data-color="#AD9276"
                                                style="width:50px; height:50px; background-color: #AD9276; border-radius:12px;">
                                            </div>

                                            <div class="border" data-color="#F1E6DD"
                                                style="width:50px; height:50px; background-color: #F1E6DD; border-radius:12px;">
                                            </div>

                                            <div class="border" data-color="#808080"
                                                style="width:50px; height:50px; background-color: #808080; border-radius:12px;">
                                            </div>
                                        </div>

                                    </div>
                                    <div class="acryglass">
                                        <div class="product-color">
                                            <div class="border" data-color="#FFFF00"
                                                style="width:50px; height:50px; background-color: #FFFF00; border-radius:12px;">
                                            </div>

                                            <div class="border" data-color="#FF0000"
                                                style="width:50px; height:50px; background-color: #FF0000; border-radius:12px;">
                                            </div>

                                            <div class="border" data-color="#D3D3D3"
                                                style="width:50px; height:50px; background-color: #D3D3D3; border-radius:12px;">
                                            </div>

                                            <div class="border" data-color="#FFFFFF"
                                                style="width:50px; height:50px; background-color: #FFFFFF; border-radius:12px;">
                                            </div>

                                            <div class="border" data-color="#F6F0BC"
                                                style="width:50px; height:50px; background-color: #F6F0BC; border-radius:12px;">
                                            </div>

                                            <div class="border" data-color="#AC9362"
                                                style="width:50px; height:50px; background-color: #AC9362; border-radius:12px;">
                                            </div>

                                            <div class="border" data-color="#93E9BE"
                                                style="width:50px; height:50px; background-color: #93E9BE; border-radius:12px;">
                                            </div>

                                            <div class="border" data-color="#5A5A5A"
                                                style="width:50px; height:50px; background-color: #5A5A5A; border-radius:12px;">
                                            </div>

                                            <div class="border" data-color="#808080"
                                                style="width:50px; height:50px; background-color: #808080; border-radius:12px;">
                                            </div>

                                            <div class="border" data-color="#FFFFFF"
                                                style="width:50px; height:50px; background-color: #FFFFFF; border-radius:12px;">
                                            </div>

                                            <div class="border" data-color="#FFFDD0"
                                                style="width:50px; height:50px; background-color: #FFFDD0; border-radius:12px;">
                                            </div>

                                            <div class="border" data-color="#F5F5DC"
                                                style="width:50px; height:50px; background-color: #F5F5DC; border-radius:12px;">
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>





        <script>
            document.addEventListener('DOMContentLoaded', () => {
                // --- 1. Element References ---
                const radioButtons = document.querySelectorAll('input[name="product-type"]');
                const colorPalettesContainer = document.getElementById('color-palettes');
                const imageElement = document.querySelector('.layout-viewer-img img');
                const colorPalettes = document.querySelectorAll('.layout-item > div');
                let currentFinish = null;

                // For Step-by-Step Navigation
                const areaCards = document.querySelectorAll('.area .layout-card');
                const layoutCards = document.querySelectorAll('.kitchen-layout .layout-card, .wardrobe-layout .layout-card, .vanity-layout .layout-card, .tv-layout .layout-card');
                const areaSection = document.querySelector('.area');
                const layoutSections = document.querySelectorAll('.kitchen-layout, .wardrobe-layout, .vanity-layout, .tv-layout');
                const viewerSection = document.querySelector('.layout-viewer');
                const viewerTitle = viewerSection.querySelector('.sec-title h2');


                // --- 2. Helper Functions for Smooth Navigation (FIXED WITH CALLBACK) ---

                /** Activates a section, ensuring inline 'display: none' is removed before applying active class. */
                function setActive(element) {
                    // 1. Set display: block instantly.
                    element.style.display = 'block';

                    // 2. Add the active class in the next animation frame to ensure the transition starts correctly.
                    requestAnimationFrame(() => {
                        element.classList.add('is-active-step');
                    });
                }

                /** * Deactivates a section and sets 'display: none' only after the transition completes. 
                 * @param {HTMLElement} element The section to hide.
                 * @param {function} [callback] Function to execute after the element is hidden (display: none).
                 */
                function setInactive(element, callback) {
                    const innerRow = element.querySelector('.row');

                    // 1. Remove the active class to start the collapse transition
                    element.classList.remove('is-active-step');

                    // Handle cases with no inner row or where no transition is expected
                    if (!innerRow || element.style.display === 'none') {
                        element.style.display = 'none';
                        if (callback) callback();
                        return;
                    }

                    // 2. Define a function to execute when the transition ends
                    const handleTransitionEnd = (event) => {
                        // IMPORTANT: Only act on the 'max-height' transition to ensure it's the collapse animation
                        if (event.propertyName === 'max-height') {
                            // Only set display: none if the element is still inactive
                            if (!element.classList.contains('is-active-step')) {
                                element.style.display = 'none';
                                if (callback) callback(); // Execute callback *after* hiding
                            }

                            // IMPORTANT: Remove the listener to prevent memory leaks
                            innerRow.removeEventListener('transitionend', handleTransitionEnd);
                        }
                    };

                    // 3. Add the listener to wait for the hiding animation to complete
                    innerRow.addEventListener('transitionend', handleTransitionEnd);

                    // Fallback: If for some reason the transitionend doesn't fire (e.g., element was forced hidden), 
                    // use a timeout. Match the CSS 800ms duration with a small buffer.
                    setTimeout(() => {
                        if (element.style.display !== 'none' && !element.classList.contains('is-active-step')) {
                            element.style.display = 'none';
                            if (callback) callback();
                        }
                    }, 900);
                }

                // --- 3. Step 1: Area Selection Handler (FIXED ASYNCHRONOUSLY) ---
                areaCards.forEach(card => {
                    card.addEventListener('click', () => {
                        const targetClass = card.getAttribute('data-target');
                        const targetLayoutSection = document.querySelector(`.${targetClass}`);

                        if (!targetLayoutSection) {
                            console.error(`Target section for ${targetClass} not found.`);
                            return;
                        }

                        // 1. Hide ALL other layout sections instantly 
                        layoutSections.forEach(sec => {
                            if (sec !== targetLayoutSection) {
                                sec.style.display = 'none';
                                sec.classList.remove('is-active-step');
                            }
                        });

                        // 2. Hide Area Section smoothly, and pass a callback to show the new section.
                        setInactive(areaSection, () => {
                            // This callback executes ONLY AFTER areaSection is hidden (display: none)

                            // 3. Show Target Layout Section smoothly
                            setActive(targetLayoutSection);
                        });
                    });
                });

                // --- 4. Step 2: Layout Selection Handler (FIXED ASYNCHRONOUSLY) ---
                layoutCards.forEach(card => {
                    card.addEventListener('click', () => {
                        const layoutName = card.querySelector('h4').textContent;
                        // Find the parent section (e.g., .kitchen-layout) that is currently active
                        const activeLayoutSection = card.closest('.kitchen-layout, .wardrobe-layout, .vanity-layout, .tv-layout');

                        // a. Hide Current Layout Section smoothly
                        if (activeLayoutSection) {
                            setInactive(activeLayoutSection, () => {
                                // This callback executes ONLY AFTER activeLayoutSection is hidden

                                // b. Show Viewer Section smoothly
                                if (viewerSection) {
                                    viewerTitle.textContent = layoutName + ' Customization';
                                    setActive(viewerSection);
                                }
                            });
                        }
                    });
                });

                // --- 5. Image Source Generation Function (Color Logic) ---
                function generateImagePath(finishId, hexColor) {
                    const sanitizedColor = hexColor.replace('#', '').toLowerCase();
                    return `/assets/images/products/${finishId}_${sanitizedColor}.jpg`;
                }

                // --- 6. Handle Color Swatch Click (Color Logic) ---
                function handleColorSelection(event) {
                    if (event.target.classList.contains('border') && currentFinish) {
                        const hexColor = event.target.dataset.color;

                        if (!hexColor) {
                            console.error("Color swatch is missing the 'data-color' attribute.");
                            return;
                        }

                        const activePalette = document.querySelector(`.layout-item > .${currentFinish}`);
                        if (activePalette) {
                            activePalette.querySelectorAll('.border').forEach(swatch => {
                                swatch.classList.remove('is-selected');
                            });
                        }
                        event.target.classList.add('is-selected');

                        const newSrc = generateImagePath(currentFinish, hexColor);
                        console.log(newSrc)
                        imageElement.src = newSrc;
                    }
                }

                // --- 7. Handle Finish (Radio Button) Change (Color Logic) ---
                function updateProductFinish(selectedId) {
                    currentFinish = selectedId;

                    colorPalettes.forEach(palette => {
                        palette.style.display = 'none';
                    });

                    const activePalette = document.querySelector(`.layout-item > .${selectedId}`);
                    if (activePalette) {
                        activePalette.style.display = 'flex';

                        const firstColorSwatch = activePalette.querySelector('.border');
                        if (firstColorSwatch) {
                            handleColorSelection({ target: firstColorSwatch });
                        }
                    }
                }

                // --- 8. Attach Event Listeners ---
                radioButtons.forEach(radio => {
                    radio.addEventListener('change', (event) => {
                        updateProductFinish(event.target.id);
                    });
                });
                colorPalettesContainer.addEventListener('click', handleColorSelection);

                // --- 9. Initial Setup on Page Load ---

                layoutSections.forEach(sec => sec.style.display = 'none');
                viewerSection.style.display = 'none';

                const defaultCheckedRadio = document.querySelector('input[name="product-type"]:checked');
                if (defaultCheckedRadio) {
                    updateProductFinish(defaultCheckedRadio.id);
                } else if (radioButtons.length > 0) {
                    radioButtons[0].checked = true;
                    updateProductFinish(radioButtons[0].id);
                }
            });
        </script>

        <!----- start footer section ---->

        <?php include_once 'footer.php'; ?>


        <!----- end footer section ---->




        <script src="js/jquery.js"></script>
        <script src="js/popper.min.js"></script>
        <script src="js/bootstrap.min.js"></script>

        <!--Revolution Slider-->
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