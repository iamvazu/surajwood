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
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css" />





    <!--[if lt IE 9]><script src="https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.js"></script><![endif]-->
    <!--[if lt IE 9]><script src="js/respond.js"></script><![endif]-->
</head>



<style>
    .wood-card img {
        width: 100%;
        object-fit: cover;
        border-radius: 6px;
    }

    a .wood-title {
        font-weight: 600;
        text-align: center;
        color: #777;
    }

    .wood-subtitle {
        color: #777;
        font-size: 14px;
    }

    .tabs-range-btn {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: end;
        align-items: flex-end;
    }

    .range-btn {
        padding: 10px 12px;
        border: 1px solid #ddd;
        background: #fff;
        width: 80%;
        text-align: left;
        cursor: pointer;
        border-radius: 6px;
        margin-bottom: 8px;
        font-weight: 500;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .range-btn.active {
        background: #e31e24;
        color: white;
        border-color: #e31e24;
    }

    .wood-card img {
        width: 100%;
        object-fit: cover;
        border-radius: 6px;
        transition: transform 0.4s ease;
        /* added */
    }

    .wood-card:hover img {
        transform: scale(1.06);
        /* added */
    }

    .margin-left-60 {
        margin-left: 60px;
    }

    .product-container {
        padding: 30px 0px 120px;
        background-color: #fff;
    }

    .product-container h2 {
        font-size: 28px;
    }

    .sticky-menu-col {
        position: sticky;
        top: 0px;
        z-index: 10;
        padding: 40px 0;
        background-color: #fff;
    }

    .page-wrapper {
        overflow: unset;
    }

    .acrylux-title {
        font-size: 24px;
        font-weight: 400;
        padding: 24px;
        text-align: right;
    }

    @media only screen and (max-width:991px) {
        .product-container .container {
            max-width: 800px !important;
        }

        .tabs-range-btn {
            width: 100%;
            display: flex;
            flex-direction: row !important;
            gap: 8px;
        }
    }
    @media only screen and (max-width:768px) {
        .range-btn{
            width:auto;
        }
        .tabs-range-btn{
            flex-wrap:wrap;
            justify-content: center;
            padding:0 16px;
        }
        .product-container h2.text-right{
            text-align:center !important;
        }
    }
</style>

<body>

    <div class="page-wrapper">

        <!----- start header section ---->

        <?php require_once 'header.php'; ?>
        <!-- Preloader -->
        <div class="preloader"></div>





        

        <!----- end header section ---->




        <!-- Page Title -->
        <section class="page-title" style="background-image:url(./img/banner/about/about-bg.jpg)">
            <div class="auto-container">
                <div class="content">
                    <h2>Our Products</h2>
                    <!-- <div class="text">Bespoke Interior & Architecture Designing</div> -->
                    <ul class="page-breadcrumb">
                        <li><a href="index.php">Home</a></li>
                        <li>Our Products</li>
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
                        <h2>WHO WE ARE AND WHAT WE DO</h2>
                        <div class="text" style="color: #666666;"> Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Porro enim dolore quis earum nam eum ea. Deleniti consequatur saepe sint amet a rerum
                            nostrum, soluta accusantium numquam exercitationem expedita ipsam aliquid quas hic quasi
                            error voluptas doloremque culpa vitae? Illo?</div>
                    </div>
                </div>



            </div>
        </section>
        <!-- End Services Section Five -->


        <style>

        </style>
        <section class="product-container">
            <div class="container">

                <div class="row align-items-start">
                    <div class="col-12 col-lg-3 sticky-menu-col">
                        <h2 class="fw-bold mb-4 text-right"> Product Range</h2>
                        <div class="tabs-range-btn">
                            <button class="range-btn active" onclick="showCategory('acrylux')">Acrylux</button>
                            <button class="range-btn" onclick="showCategory('acrysilk')">Acrysilk</button>
                            <button class="range-btn" onclick="showCategory('acrymatte')">Acrymatte</button>
                            <button class="range-btn" onclick="showCategory('acryglass')">Acryglass</button>
                            <button class="range-btn" onclick="showCategory('acryglass-matte')">Acryglass Matte</button>

                        </div>
                    </div>
                    <div class="col-12 col-lg-9">
                        <div class="text-right">
                            <h3 id="categoryTitle" class="fw-bold mb-4">Acrylux</h3>
                        </div>
                        <div class="row g-4">
                            <div class="col-lg-4 acrylux product "></div>
                            <div class="col-lg-8 product acrylux sub-filter-bar">
                                <div class="tabs-range-btn justify-content-start flex-row"
                                    style="gap: 10px; width: auto;">
                                    <button class="range-btn sub-btn active"
                                        onclick="showAcryluxSubCategory('acrylux-all')">All Acrylux</button>
                                    <button class="range-btn sub-btn"
                                        onclick="showAcryluxSubCategory('acrylux-metallic')">Metallic</button>
                                    <button class="range-btn sub-btn"
                                        onclick="showAcryluxSubCategory('acrylux-solid')">Solid Colors</button>
                                    <button class="range-btn sub-btn"
                                        onclick="showAcryluxSubCategory('acrylux-wood')">Wood Grains</button>
                                </div>
                            </div>

                            <!-- ------------- acrylux ------------- ===============================================-->
                            <div class=" col-12 product acrylux  acrylux-title acrylux-all acrylux-metallic">
                                <h5>Acrylux | Metallic</h5>
                            </div>
                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 product acrylux acrylux-all acrylux-metallic">
                                <a href="./img/panel/acrylux/acrylux-metallic-1.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acrylux/acrylux-metallic-1.png">
                                        <p class="wood-title">1306 Metallic Grey</p>

                                    </div>
                                </a>
                            </div>

                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 product acrylux acrylux-all acrylux-metallic">
                                <a href="./img/panel/acrylux/acrylux-metallic-2.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acrylux/acrylux-metallic-2.png">
                                        <p class="wood-title">2307 White | Metallic</p>

                                    </div>
                                </a>
                            </div>

                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 product acrylux acrylux-all acrylux-metallic">
                                <a href="./img/panel/acrylux/acrylux-metallic-3.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acrylux/acrylux-metallic-3.png">
                                        <p class="wood-title">1314 Metallic Blue | Metallic</p>

                                    </div>
                                </a>
                            </div>

                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 product acrylux acrylux-all acrylux-metallic">
                                <a href="./img/panel/acrylux/acrylux-metallic-4.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acrylux/acrylux-metallic-4.png">
                                        <p class="wood-title">1322 Anthrasite | Metallic</p>

                                    </div>
                                </a>
                            </div>


                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 product acrylux acrylux-all acrylux-metallic">
                                <a href="./img/panel/acrylux/acrylux-metallic-5.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acrylux/acrylux-metallic-5.png">
                                        <p class="wood-title">1324 Metallic Black | Metallic</p>

                                    </div>
                                </a>
                            </div>

                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 product acrylux acrylux-all acrylux-metallic">
                                <a href="./img/panel/acrylux/acrylux-metallic-7.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acrylux/acrylux-metallic-7.png">
                                        <p class="wood-title">1340 Metallic Basalt | Metallic</p>

                                    </div>
                                </a>
                            </div>
                            <!-- solid colors -->
                            <div class=" col-12 product acrylux  acrylux-title acrylux-all acrylux-solid">
                                <h5>Acrylux | Solid Colors</h5>
                            </div>

                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 product acrylux acrylux-all acrylux-solid">
                                <a href="./img/panel/acrylux/acrylux-solid-1.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acrylux/acrylux-solid-1.png">
                                        <p class="wood-title">1301 Red | Solid</p>

                                    </div>
                                </a>
                            </div>

                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 product acrylux acrylux-all acrylux-solid">
                                <a href="./img/panel/acrylux/acrylux-solid-2.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acrylux/acrylux-solid-2.png">
                                        <p class="wood-title">1302 White | Solid</p>

                                    </div>
                                </a>
                            </div>

                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 product acrylux acrylux-all acrylux-solid">
                                <a href="./img/panel/acrylux/acrylux-solid-3.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acrylux/acrylux-solid-3.png">
                                        <p class="wood-title">1303 Cream | Solid</p>

                                    </div>
                                </a>
                            </div>

                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 product acrylux acrylux-all acrylux-solid">
                                <a href="./img/panel/acrylux/acrylux-solid-4.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acrylux/acrylux-solid-4.png">
                                        <p class="wood-title">2304 Wine Red | Solid</p>

                                    </div>
                                </a>
                            </div>

                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 product acrylux acrylux-all acrylux-solid">
                                <a href="./img/panel/acrylux/acrylux-solid-5.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acrylux/acrylux-solid-5.png">
                                        <p class="wood-title">1305 Black | Solid</p>

                                    </div>
                                </a>
                            </div>

                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 product acrylux acrylux-all acrylux-solid">
                                <a href="./img/panel/acrylux/acrylux-solid-6.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acrylux/acrylux-solid-6.png">
                                        <p class="wood-title">2308 Stone Grey | Solid</p>

                                    </div>
                                </a>
                            </div>

                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 product acrylux acrylux-all acrylux-solid">
                                <a href="./img/panel/acrylux/acrylux-solid-7.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acrylux/acrylux-solid-7.png">
                                        <p class="wood-title">1315 Cappuccino | Solid</p>

                                    </div>
                                </a>
                            </div>


                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 product acrylux acrylux-all acrylux-solid">
                                <a href="./img/panel/acrylux/acrylux-solid-8.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acrylux/acrylux-solid-8.png">
                                        <p class="wood-title">1317 Purple | Solid</p>

                                    </div>
                                </a>
                            </div>


                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 product acrylux acrylux-all acrylux-solid">
                                <a href="./img/panel/acrylux/acrylux-solid-9.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acrylux/acrylux-solid-9.png">
                                        <p class="wood-title">2318 Green | Solid</p>

                                    </div>
                                </a>
                            </div>



                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 product acrylux acrylux-all acrylux-solid">
                                <a href="./img/panel/acrylux/acrylux-solid-10.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acrylux/acrylux-solid-10.png">
                                        <p class="wood-title">1323 Dark Grey | Solid</p>

                                    </div>
                                </a>
                            </div>



                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 product acrylux acrylux-all acrylux-solid">
                                <a href="./img/panel/acrylux/acrylux-solid-11.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acrylux/acrylux-solid-11.png">
                                        <p class="wood-title">1327 Turquoise | Solid</p>

                                    </div>
                                </a>
                            </div>



                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 product acrylux acrylux-all acrylux-solid">
                                <a href="./img/panel/acrylux/acrylux-solid-12.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acrylux/acrylux-solid-12.png">
                                        <p class="wood-title">1330 Designer White | Solid</p>

                                    </div>
                                </a>
                            </div>



                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 product acrylux acrylux-all acrylux-solid">
                                <a href="./img/panel/acrylux/acrylux-solid-13.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acrylux/acrylux-solid-13.png">
                                        <p class="wood-title">1331 Feather Blue | Solid</p>

                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 product acrylux acrylux-all acrylux-solid">
                                <a href="./img/panel/acrylux/acrylux-solid-14.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acrylux/acrylux-solid-14.png">
                                        <p class="wood-title">1332 Cobalt Blue | Solid</p>

                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 product acrylux acrylux-all acrylux-solid">
                                <a href="./img/panel/acrylux/acrylux-solid-15.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acrylux/acrylux-solid-15.png">
                                        <p class="wood-title">1333 Sea Green | Solid</p>

                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 product acrylux acrylux-all acrylux-solid">
                                <a href="./img/panel/acrylux/acrylux-solid-16.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acrylux/acrylux-solid-16.png">
                                        <p class="wood-title">1336 Grey | Solid</p>

                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 product acrylux acrylux-all acrylux-solid">
                                <a href="./img/panel/acrylux/acrylux-solid-17.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acrylux/acrylux-solid-17.png">
                                        <p class="wood-title">1337 Cashmere | Solid</p>

                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 product acrylux acrylux-all acrylux-solid">
                                <a href="./img/panel/acrylux/acrylux-solid-18.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acrylux/acrylux-solid-18.png">
                                        <p class="wood-title">1339 State Grey | Solid</p>

                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 product acrylux acrylux-all acrylux-solid">
                                <a href="./img/panel/acrylux/acrylux-solid-19.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acrylux/acrylux-solid-19.png">
                                        <p class="wood-title">1318 Verde Gloss | Solid</p>

                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 product acrylux acrylux-all acrylux-solid">
                                <a href="./img/panel/acrylux/acrylux-solid-20.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acrylux/acrylux-solid-20.png">
                                        <p class="wood-title">1319 Rosso Gloss | Solid</p>

                                    </div>
                                </a>
                            </div>
                            <div class=" col-12 product acrylux  acrylux-title acrylux-all acrylux-wood">
                                <h5>Acrylux | Wood Grains</h5>
                            </div>
                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 product acrylux acrylux-all acrylux-wood">
                                <a href="./img/panel/acrylux/acrylux-wood-1.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acrylux/acrylux-wood-1.png">
                                        <p class="wood-title">2309 Brushed Aluminium | Design</p>

                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 product acrylux acrylux-all acrylux-wood">
                                <a href="./img/panel/acrylux/acrylux-wood-2.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acrylux/acrylux-wood-2.png">
                                        <p class="wood-title">2311 Textile | Design</p>

                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 product acrylux acrylux-all acrylux-wood">
                                <a href="./img/panel/acrylux/acrylux-wood-3.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acrylux/acrylux-wood-3.png">
                                        <p class="wood-title">2313 Copper Textile | Design</p>

                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 product acrylux acrylux-all acrylux-wood">
                                <a href="./img/panel/acrylux/acrylux-wood-4.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acrylux/acrylux-wood-4.png">
                                        <p class="wood-title">2320 Light Zebrano | Design</p>

                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 product acrylux acrylux-all acrylux-wood">
                                <a href="./img/panel/acrylux/acrylux-wood-5.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acrylux/acrylux-wood-5.png">
                                        <p class="wood-title">2321 Dark Zebrano | Design</p>

                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 product acrylux acrylux-all acrylux-wood">
                                <a href="./img/panel/acrylux/acrylux-wood-6.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acrylux/acrylux-wood-6.png">
                                        <p class="wood-title">2328 ELM/Black | Design</p>
                                    </div>
                                </a>
                            </div>



                            <!-- ------------- Acryglo ------------- -==============================================================-->


                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 product acrysilk d-none">
                                <a href="./img/panel/acrysilk/acrysilk-1.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acrysilk/acrysilk-1.png">
                                        <p class="wood-title">5001 | Patina</p>
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 product acrysilk d-none">
                                <a href="./img/panel/acrysilk/acrysilk-2.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acrysilk/acrysilk-2.png">
                                        <p class="wood-title">5002 | Aurum</p>
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 product acrysilk d-none">
                                <a href="./img/panel/acrysilk/acrysilk-3.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acrysilk/acrysilk-3.png">
                                        <p class="wood-title">5003 | Argenti</p>
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 product acrysilk d-none">
                                <a href="./img/panel/acrysilk/acrysilk-4.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acrysilk/acrysilk-4.png">
                                        <p class="wood-title">5004 | Scandia</p>
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 product acrysilk d-none">
                                <a href="./img/panel/acrysilk/acrysilk-5.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acrysilk/acrysilk-5.png">
                                        <p class="wood-title">5005 | Griseo</p>
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 product acrysilk d-none">
                                <a href="./img/panel/acrysilk/acrysilk-6.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acrysilk/acrysilk-6.png">
                                        <p class="wood-title">5006 | Cuprous</p>
                                    </div>
                                </a>
                            </div>



                            <!-- ------------- Neutral Tones ------------- =============================================================-->


                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 product acrymatte d-none">
                                <a href="./img/panel/acrymatte/acrymatte-1.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acrymatte/acrymatte-1.png">
                                        <p class="wood-title">3302 White | Solid</p>
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 product acrymatte d-none">
                                <a href="./img/panel/acrymatte/acrymatte-1.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acrymatte/acrymatte-2.png">
                                        <p class="wood-title">3303 Cream | Solid</p>
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 product acrymatte d-none">
                                <a href="./img/panel/acrymatte/acrymatte-3.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acrymatte/acrymatte-3.png">
                                        <p class="wood-title">3305 Black | Solid</p>
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 product acrymatte d-none">
                                <a href="./img/panel/acrymatte/acrymatte-4.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acrymatte/acrymatte-4.png">
                                        <p class="wood-title">3315 Cappuccino | Solid</p>
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 product acrymatte d-none">
                                <a href="./img/panel/acrymatte/acrymatte-8.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acrymatte/acrymatte-8.png">
                                        <p class="wood-title">3324 Urban Grey | Solid</p>
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 product acrymatte d-none">
                                <a href="./img/panel/acrymatte/acrymatte-12.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acrymatte/acrymatte-12.png">
                                        <p class="wood-title">3335 Light Grey | Solid</p>
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 product acrymatte d-none">
                                <a href="./img/panel/acrymatte/acrymatte-13.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acrymatte/acrymatte-13.png">
                                        <p class="wood-title">3336 Grey | Solid</p>
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 product acrymatte d-none">
                                <a href="./img/panel/acrymatte/acrymatte-14.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acrymatte/acrymatte-14.png">
                                        <p class="wood-title">3337 Cashmere | Solid </p>
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 product acrymatte d-none">
                                <a href="./img/panel/acrymatte/acrymatte-15.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acrymatte/acrymatte-15.png">
                                        <p class="wood-title">3339 State Grey | Solid</p>
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 product acrymatte d-none">
                                <a href="./img/panel/acrymatte/acrymatte-16.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acrymatte/acrymatte-16.png">
                                        <p class="wood-title">3322 Anthrasite | Metallic</p>
                                    </div>
                                </a>
                            </div>
                            <div class="col-lg-3 col-md-4 col-sm-6 col-6 product acrymatte d-none">
                                <a href="./img/panel/acrymatte/acrymatte-17.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acrymatte/acrymatte-17.png">
                                        <p class="wood-title">3338 Metallic Beige | Metallic</p>
                                    </div>
                                </a>
                            </div>





                            <!-- ------------- Dark Shades ------------- ===============================================================-->


                            <div class="col-xxl-4 col-lg-3 col-md-4 col-sm-6 col-6 product acryglass d-none">
                                <a href="./img/panel/acryglass/acryglass1.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acryglass/acryglass1.png">
                                        <p class="wood-title">402 White</p>
                                    </div>
                                </a>
                            </div>
                            <div class="col-xxl-4 col-lg-3 col-md-4 col-sm-6 col-6 product acryglass d-none">
                                <a href="./img/panel/acryglass/acryglass2.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acryglass/acryglass2.png">
                                        <p class="wood-title">403 Cream</p>
                                    </div>
                                </a>
                            </div>
                            <div class="col-xxl-4 col-lg-3 col-md-4 col-sm-6 col-6 product acryglass d-none">
                                <a href="./img/panel/acryglass/acryglass3.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acryglass/acryglass3.png">
                                        <p class="wood-title">415 Beige</p>
                                    </div>
                                </a>
                            </div>
                            <div class="col-xxl-4 col-lg-3 col-md-4 col-sm-6 col-6 product acryglass d-none">
                                <a href="../img/panel/acryglass/acryglass4.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acryglass/acryglass4.png">
                                        <p class="wood-title">418 Sea Green</p>
                                    </div>
                                </a>
                            </div>
                            <div class="col-xxl-4 col-lg-3 col-md-4 col-sm-6 col-6 product acryglass d-none">
                                <a href="./img/panel/acryglass/acryglass5.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acryglass/acryglass5.png">
                                        <p class="wood-title">423 Dark Grey</p>
                                    </div>
                                </a>
                            </div>
                            <div class="col-xxl-4 col-lg-3 col-md-4 col-sm-6 col-6 product acryglass d-none">
                                <a href="./img/panel/acryglass/acryglass6.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acryglass/acryglass6.png">
                                        <p class="wood-title">439 State Grey</p>
                                    </div>
                                </a>
                            </div>
                            <!-- acryglass matte -->
                            <div class="col-xxl-4 col-lg-3 col-md-4 col-sm-6 col-6 product acryglass-matte d-none">
                                <a href="./img/panel/acryglass-matte/acryglass-matte-1.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acryglass-matte/acryglass-matte-1.png">
                                        <p class="wood-title">302 | White </p>
                                    </div>
                                </a>
                            </div>
                            <div class="col-xxl-4 col-lg-3 col-md-4 col-sm-6 col-6 product acryglass-matte d-none">
                                <a href="./img/panel/acryglass-matte/acryglass-matte-2.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acryglass-matte/acryglass-matte-2.png">
                                        <p class="wood-title">303 | Cream</p>
                                    </div>
                                </a>
                            </div>
                            <div class="col-xxl-4 col-lg-3 col-md-4 col-sm-6 col-6 product acryglass-matte d-none">
                                <a href="./img/panel/acryglass-matte/acryglass-matte-3.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acryglass-matte/acryglass-matte-3.png">
                                        <p class="wood-title">315 | Beige</p>
                                    </div>
                                </a>
                            </div>
                            <div class="col-xxl-4 col-lg-3 col-md-4 col-sm-6 col-6 product acryglass-matte d-none">
                                <a href="./img/panel/acryglass-matte/acryglass-matte-4.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acryglass-matte/acryglass-matte-4.png">
                                        <p class="wood-title">318 | Sea Green</p>
                                    </div>
                                </a>
                            </div>
                            <div class="col-xxl-4 col-lg-3 col-md-4 col-sm-6 col-6 product acryglass-matte d-none">
                                <a href="./img/panel/acryglass-matte/acryglass-matte-5.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acryglass-matte/acryglass-matte-5.png">
                                        <p class="wood-title">323 | Dark Grey</p>
                                    </div>
                                </a>
                            </div>
                            <div class="col-xxl-4 col-lg-3 col-md-4 col-sm-6 col-6 product acryglass-matte d-none">
                                <a href="./img/panel/acryglass-matte/acryglass-matte-6.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acryglass-matte/acryglass-matte-6.png">
                                        <p class="wood-title">339 | State Grey</p>
                                    </div>
                                </a>
                            </div>
                            <div class="col-xxl-4 col-lg-3 col-md-4 col-sm-6 col-6 product acryglass-matte d-none">
                                <a href="./img/panel/acryglass-matte/acryglass-matte-7.png" data-fancybox="gallery">
                                    <div class="wood-card">
                                        <img src="./img/panel/acryglass-matte/acryglass-matte-7.png">
                                        <p class="wood-title">340 Brown | Metallic</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>





        <script>
            // Existing showCategory function remains to handle main categories
            function showCategory(category) {
                // Change title
                document.getElementById("categoryTitle").innerText =
                    category.replace(/^\w/, c => c.toUpperCase()).replace("-", " ");

                // Active button highlight for main buttons
                document.querySelectorAll(".tabs-range-btn .range-btn").forEach(btn => {
                    if (!btn.classList.contains("sub-btn")) { // Ignore sub-category buttons
                        btn.classList.remove("active");
                    }
                });
                event.target.classList.add("active");

                // Hide all products
                document.querySelectorAll(".product").forEach(item => item.classList.add("d-none"));

                // Show selected main category
                document.querySelectorAll("." + category).forEach(item => item.classList.remove("d-none"));

                // If switching to Acrylux, activate the 'All Acrylux' sub-filter by default
                if (category === "acrylux") {
                    showAcryluxSubCategory('acrylux-all');
                    document.querySelector('.sub-filter-bar .range-btn.sub-btn').classList.add('active');
                }
            }

            // **NEW FUNCTION for Acrylux Sub-Category Filtering**
            function showAcryluxSubCategory(subCategory) {
                // Active button highlight for sub-buttons
                document.querySelectorAll(".sub-btn").forEach(btn => btn.classList.remove("active"));

                // Check if the event object exists before trying to access event.target
                if (typeof event !== 'undefined' && event.target) {
                    event.target.classList.add("active");
                } else if (subCategory === 'acrylux-all') {
                    // This handles the case when showCategory calls it, activating the 'All' button
                    document.querySelector('.sub-filter-bar .sub-btn[onclick="showAcryluxSubCategory(\'acrylux-all\')"]').classList.add('active');
                }

                // Hide all Acrylux products (the ones with the 'acrylux-metallic', etc., classes)
                document.querySelectorAll(".acrylux-metallic, .acrylux-solid, .acrylux-wood, .sub-filter-bar").forEach(item => item.classList.add("d-none"));

                // Show selected Acrylux sub-category, or all if 'acrylux-all' is passed
                if (subCategory === 'acrylux-all') {
                    document.querySelectorAll(".acrylux-metallic, .acrylux-solid, .acrylux-wood, .sub-filter-bar").forEach(item => item.classList.remove("d-none"));
                } else {
                    document.querySelectorAll("." + subCategory + ", .sub-filter-bar").forEach(item => item.classList.remove("d-none"));
                }
            }

            // **Initial call to set the default filter state on load**
            // Assuming Acrylux is the default view.
            document.addEventListener("DOMContentLoaded", function () {
                showAcryluxSubCategory('acrylux-all');
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
        <script src="https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.umd.js"></script>
        <script src="js/script.js"></script>
        <script>
            Fancybox.bind('[data-fancybox="gallery"]', {
                Toolbar: {
                    display: [
                        { id: "counter", position: "center" },
                        "slideShow",
                        "thumbs",
                        "zoom",
                        "fullscreen",
                        "download",
                        "close",
                    ],
                },
                loop: false,
                protect: true
            });
        </script>

</body>

</html>