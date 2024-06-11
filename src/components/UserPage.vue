<template>
  <div>
    <nav class="navbar navbar-light  sticky-top" style="background-color: rgba(255, 255, 255, 0.797);">
      <div class="container-fluid">
        <a class="navbar-brand text-primary fw-bold text-uppercase" v-on:click="goHome()">
          <img :src="require('@/assets/logo.png')" alt="" width="30" height="24" class="d-inline-block align-text-top">
          ElearnCenter
        </a>

        <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample"
          aria-controls="offcanvasExample">
          <i class="fa-solid fa-bars"></i>
        </button>

        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title text-primary fw-bold text-uppercase" id="offcanvasExampleLabel">ElearnCenter</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <div class="container">
              <img :src="require('@/assets/logo.png')" alt="" class="w-100 rounded" height="135">
              <div class="list-group list-group-flush mt-4 mb-3 pb-3 border-bottom">

                <a href="#" class="list-group-item list-group-item-action" aria-current="true">
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1 fw-bold text-primary" style="font-size: 16px;"> Explore</h5>
                  </div>
                </a>
                <a href="#" class="list-group-item list-group-item-action">
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1 fw-bold " style="font-size: 14px;"> Course</h5>
                  </div>
                </a>
                <a href="#" class="list-group-item list-group-item-action">
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1 fw-bold " style="font-size: 14px;"> Article</h5>
                  </div>
                </a>
                <a href="#" class="list-group-item list-group-item-action">
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1 fw-bold " style="font-size: 14px;">Book</h5>
                  </div>
                </a>
              </div>
              <div class="accordion accordion-flush" id="accordionFlushExample">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="flush-headingOne">
                    <button class="accordion-button collapsed text-primary fw-bold" type="button"
                      data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false"
                      aria-controls="flush-collapseOne">
                      My account
                    </button>
                  </h2>
                  <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne"
                    data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                      <div class="list-group list-group-flush">

                        <a href="#" class="list-group-item list-group-item-action" aria-current="true">
                          <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1" style="font-size: 14px;">Registed Course</h5>
                          </div>
                        </a>
                        <a href="#" class="list-group-item list-group-item-action">
                          <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1 " style="font-size: 14px;">
                              My books</h5>
                          </div>
                        </a>
                        <a href="#" class="list-group-item ">
                          <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1" style="font-size: 14px;">
                              Notification</h5>
                          </div>
                        </a>
                        <a href="#" class="list-group-item ">
                          <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1" style="font-size: 14px;">Logout
                            </h5>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="accordion-item">
                  <h2 class="accordion-header" id="flush-headingThree">
                    <button class="accordion-button collapsed btn-primary text-white bg-primary fw-bold rounded"
                      type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree"
                      aria-expanded="false" aria-controls="flush-collapseThree">
                      Cart
                    </button>
                  </h2>
                  <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree"
                    data-bs-parent="#accordionFlushExample">


                    <a href="#" class="text-decoration-none text-dark">
                      <div class="card border-0 shadow-sm">
                        <div class="row g-0">
                          <div class=" col-lg-4">
                            <img
                              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATIAAAClCAMAAADoDIG4AAABIFBMVEUNBij///8A%0A                  AAANBSgAAB1+i4oAABsAABj///0AABBi2vz+/v8AAB9j3/8AACMAABHo6OkAAAsAABVl4/8AAAjg4OJ/f4Fl5P9hYWXR0dIIAB0KACIGABny8fNi%0A                  2fwLACOpqK40M0JwcHpDka+TkZx+fIbGxcsiQV1by+tn6/9Dk6xKoL0oUmtUuNg1MkZoZ3G7ur9bWmYyaoQgHDaWlpg9hZ4qKThIRlUYJD6fnqQTFzQTEyt2%0A                  gIUkSF0tZHcYMEZf0+oeNk1FlbI2dpNOrc0QFTYxbIIuXXg+hplKpL4mSWYdM1FVvts8f50mIjkQBS0XFSVbyd4RHDTCw8FPsMYVJzpra25MS1M+O04WHDxycH5%0A                  Fm7AQAC45fZFEg6c7QU2dR761AAAQKElEQVR4nO1cC1vayBqGGQ4xgUnIBVOScPHCTeQiNl6PXRVaTivqttutdns8/f//4nwzQyAoCmxh167z9mlLbiTz8n7XGY%0A                  hEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQElgP8dz/ATwd8fP13P8JPBhz7d+zvfoafDDj2L0HZfBCUzQ1B2dwAypJ/9zP8ZBAqm%0A                  xtCZXNDqGxuCJXNDaGyuSFUNjeEyuaGoGxuCMOcG0Jlc0OobG7MpjLsOk5+UvuWHnBfWF93qsow/DG8kzdvfkFyHo+1vbFjGeU3b7Zd40V1w6erDGO5faqYhFT8Cy%0A                  ukKOyi8gYcMMlpW3OX/JjPCTOoDPnAl0n/Kue/6wFnGJ3VFKIQ2E+Ij5b/pM8G01XmbBNF6W6c1xVTIacdgwvKlS4JUcxc17/sAnEfnL/gWZ8JplOmd4m5peuyc7E%0A                  F5ml2Dzy4SjvoA4GKfyDJsrVlk5r1crzZVMN0D4hScfPMd/1SA+vMbVsR1AO+lPNPzLfh44qivMUvhrOpKvPeEXNDZnxgVweqCGmjDniw020rz/ZG5HOT9JyXRNnTKp%0A                  O3TLMXH5yMjYO6qdjntmJ23xqcJBzx2rb5H+0lUfa0ytB7QsqjHMLVaoQGynN9tM/5QMiW/mwpW/SDTVUZqhPlIoiHkMrmUV3JkS4K+S63rJD3zzvN+JO0UU/9wElPVxm%0A                  lbKgojPUOU1lHHz0Gp+zZqozizz4c5hjfN1VlXaqyYQIr92zFrtm5alsbnuIsV2UYq8lYTALEkuqfCMyzX4HZXSQ12FTjmqwBjFj4ttNVVjNDiar3AfLXDQQhkpx4wU7w%0A                  ZebyfBk23MZ+s1kENHf2ZH0hjRdmcQ92quv0LsV9zlne+nW9UCplSq3D5rEcqhSnUaZvEZNmEPQS7B4pillDGHVNkjtyB3f3eiZEzEWMZBJQOhpCtnWD8A/2Tpil5WMP6m%0A                  Ispdg9VuN0tPFYK3Tf1vHwnlMNU7ojdofnEzjv9YnSR5qko75C+ga9NdzYuDTNd96SuhkYpaIrK/y5VxJReNUy1OmXPfmWKgwA7zxYV4elNH1/ShkkVzuJ8EeV1objm6oyK%0A                  DFJTcOOgQAbdk5pdy4vLzudnGKewx5LcrAMRcHJslLZMGXAGX2Z+kEnoF4VW6loIvYgFI4ow/EduCtsBLxtjqzoaZVRAb8lpI/yZf9zX6maOTBMDkVRSFXpv78sYyq5a7xE%0A                  lfGnZ5yxURR+KNaoa4yHbCx//1ZhyrLsdsFHFd0ZCWuKyjD2IA9T+qRKq3BIyIAsmwL+J8AfBIMqAca6yFuiyuhnXVzb22sy75JYiSZ/5GbqWpZT9oTKtEOur/Tmzc36YSaa%0A                  3R1z/0+oLI/c3meFwa7mgLG+73favd6bdx3f71MOqyZhh+ttF7nLEBqjDEbySlLVOGryj547aOpKsareSzww3aXiUHLBIhfOB2cGlCXvx8wRZdjIsFclpCWTcdna/SOkq0d%0A                  Uxu5IWxe0HQuM9GudC3Bq5MDSDM9zHM8zrAvY3r7ovO8rTG1K7QzxULZQ4rhhRqOvqLKwlaExIFrQGGE4jpK7jSuMjMAtqAaKHzUajV0JDZmEY1hCsd1G4+oayVhHv3LKqH%0A                  MeG3uIMi/BVLbPj2M1rMjHVAaBGF10bcjz7YpC6pauXVcUs2MFlMBfvWOSCjYsDeqDCjuze4FwBC+WsxFldEsvMN9SYM44iYqlbCKRyGY2YzF2U7T3upRKrCQSKymajARvo%0A                  Umr7MRENn0oFzIZ5qJWMplM+kt48CHKfuU+rDmp2fCYL8OedA76skntA6oQpeygLZN8RHSaic4qMdbQR8XcQpD7KxVUfk+btqTmeBNyxIVSRgf12oDX8n566KKz+5REqRX4%0A                  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"
                              class="card-img-top
                                  h-100" alt="...">
                          </div>
                          <div class="col-md-8">
                            <div class="card-body">
                              <h5 class="card-title fw-bold" style="font-size: 14px;">React Ultimate - React.JS for
                                Beginners
                              </h5>
                              <span>
                                <p class="card-text fw-bold text-muted" style="font-size: 12px;">đ 320.000</p>

                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                    <a href="#" class="text-decoration-none text-dark">
                      <div class="card border-0 shadow-sm">
                        <div class="row g-0">
                          <div class=" col-lg-4">
                            <img
                              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYVFBcVFBUYGBcaGhcYGhoaGhsbGB0bGxc%0A                  bGhcXFxghJSwkGyEpHhgYJTYlKS4wMzMzGyI5PjkyPSwyMzABCwsLEA4QHRISHj0pJCoyOT0wMjIzOjM9NDIyOzIyMjIyMjA+MjAyOz0y%0A                  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"
                              class="card-img-top
                                  h-100" alt="...">
                          </div>
                          <div class="col-md-8">
                            <div class="card-body">
                              <h5 class="card-title fw-bold" style="font-size: 14px;">Srping boot full course</h5>
                              <span>
                                <p class="card-text fw-bold text-muted" style="font-size: 12px;">đ 320.000</p>

                              </span>
                            </div>
                          </div>

                        </div>
                      </div>
                    </a>


                  </div>
                  <p class="w-100 fw-bold mt-2">Total: <span class="text-muted">đ640.000</span> <i
                      class="fa-solid fa-money-bill" style="color: #095f1d;"></i></p>
                  <a class="btn btn-primary w-100 h-100 pb-0 fw-bold pb-1" href="cart.html">Checkout</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom border-top">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle btn btn-primary text-white me-4" href="#" id="navbarDropdown"
                role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Explore
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">

                <li v-for="item in listCourseCategories" v-bind:key="item.id"><a class="dropdown-item" href="#">{{
                  item.title }}</a></li>

              </ul>
            </li>
            <li class="nav-item">
              <form class="d-flex " style="width: 800px;">
                <input class="form-control   " type="search" placeholder="Search for course" aria-label="Search">
                <button class="btn btn-primary text-white" type="submit"><i
                    class="fa-brands fa-searchengin"></i></button>
              </form>
            </li>
          </ul>
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0 ">
            <li class="nav-item dropdown" style="font-size: 14px;">
              <i class="bi bi-cart-fill"></i>
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                <i class="fa-solid fa-cart-shopping"></i>
              </a>
              <ul class="dropdown-menu pb-0" aria-labelledby="navbarDropdown" style="width: 500px;">
                <a href="#" class="text-decoration-none text-dark" v-for="item in cartItems" v-bind:key="item.id">
                  <div class="card border-0 shadow-sm mt-1" v-if="item.type === 'COURSE'">
                    <div class="row g-0">
                      <div class=" col-lg-4">
                        <img :src=item.media.thumbUrl class="card-img-top
                          h-100" alt="...">
                      </div>
                      <div class="col-md-8">
                        <div class="card-body">
                          <h5 class="card-title fw-bold" style="font-size: 14px;">
                            {{ item.title }}
                          </h5>
                          <span>
                            <p class="card-text fw-bold text-muted" style="font-size: 12px;">đ {{ item.priceSale }}</p>
                          </span>

                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="card border-0 shadow-sm mt-1" v-if="item.type === 'BOOK'">
                    <div class="row g-0">
                      <div class=" col-lg-4">
                        <img :src=item.avatar.thumbUrl class="card-img-top
                          h-100" alt="...">
                      </div>
                      <div class="col-md-8">
                        <div class="card-body">
                          <h5 class="card-title fw-bold" style="font-size: 14px;">
                            {{ item.title }}
                          </h5>
                          <span>
                            <p class="card-text fw-bold text-muted" style="font-size: 12px;">đ {{ item.priceSale }}</p>
                          </span>

                        </div>
                      </div>
                    </div>
                  </div>
                </a>

                <p class="w-100 fw-bold mt-3 ms-2 ">Total: <span class="text-muted">đ {{ total }}</span> <i
                    class="fa-solid fa-money-bill" style="color: #35a04e;"></i></p>
                <a class="btn btn-primary w-100 h-100 pb-0 fw-bold pb-1" v-on:click="goToCart()">Checkout</a>
              </ul>
            </li>
            <li class="nav-item" v-if="role === 'ROLE_LECTURE'">
              <a class="nav-link" style="font-size: 14px;" @click="goLecturePage()">Lecture Studio</a>
            </li>
            <li class="nav-item" v-if="role === 'ROLE_LEARNER'">
              <a class="nav-link pointer-cusor" style="font-size: 14px;" @click="goLearnerPage()">Learner Hub</a>
            </li>
            <li class="nav-item" v-if="role === 'ROLE_ORGANIZATION'">
              <a class="nav-link pointer-cusor" style="font-size: 14px;" @click="goOrganizationPage()">Organization
                Hub</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#signupModal"
                style="font-size: 14px;">Teach on
                ElearnCenter</a>
              <div class="modal fade" id="signupModal" tabindex="-1" aria-labelledby="signupModalLabel"
                aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header bg-purple text-white">
                      <h5 class="modal-title text-dark" id="signupModalLabel">Become a ElearnCenter Instructor</h5>
                    </div>
                    <div class="modal-body">
                      <p>Discover a supportive community of online instructors. Get instant access to all course
                        creation
                        resources.</p>
                      <form>
                        <div class="mb-3">
                          <input type="text" class="form-control" placeholder="user name" ref="lecName">
                        </div>
                        <div class="mb-3">
                          <input type="text" class="form-control" placeholder="Full name" ref="lecFullName">
                        </div>
                        <div class="mb-3">
                          <input type="email" class="form-control" placeholder="Email" ref="lecEmail">
                        </div>
                        <div class="mb-3">
                          <input type="number" class="form-control" placeholder="Email" ref="lecPhone">
                        </div>
                        <div class="mb-3">
                          <input type="password" class="form-control" placeholder="Password" ref="lecPassword">
                        </div>

                        <div class="form-check mb-3">
                          <input type="checkbox" class="form-check-input" id="newsletterCheckbox">
                          <label class="form-check-label" for="newsletterCheckbox">I want to receive emails with insider
                            tips, motivation, special updates, and promotions reserved for instructors.</label>
                        </div>
                        <button class="btn btn-primary" @click="lectureSignUp()" data-bs-dismiss="modal">Sign
                          up</button>
                      </form>
                    </div>
                    <div class="modal-footer">
                      <p>By signing up, you agree to our <a href="#">Terms of Use</a> and <a href="#">Privacy
                          Policy</a>.
                      </p>
                      <p>Already have an account? <a href="#">Log in</a></p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li class="nav-item" v-if="userName === null">
              <a class="nav-link text-primary" href="#" data-bs-toggle="modal" data-bs-target="#loginModel"
                style="font-size: 14px;">Log in</a>
              <div class="modal fade" id="loginModel" tabindex="-1" aria-labelledby="signupModalLabel"
                aria-hidden="false">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header bg-purple text-white">
                      <h5 class="modal-title text-dark" id="loginModel">Login into ElearnCenter</h5>
                    </div>
                    <div class="modal-body">
                      <p>Discover all content of online education. Get instant access to all free content now.</p>
                      <form @submit.prevent="loginIntoSystem">
                        <div class="mb-3">
                          <input type="text" class="form-control" placeholder="Phone" v-model="phone">
                        </div>
                        <div class="mb-3">
                          <input type="password" class="form-control" placeholder="Password" v-model="password">
                        </div>

                        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Log in</button>
                      </form>
                    </div>
                    <div class="modal-footer">
                      <p>By signing up, you agree to our <a href="#">Terms of Use</a> and <a href="#">Privacy
                          Policy</a>.
                      </p>
                      <p>Not have an account? <a href="#">Sign Up</a></p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li class="nav-item" v-if="userName === null" style="font-size: 14px;">
              <a class="nav-link btn btn-primary text-white" data-bs-toggle="modal"
                data-bs-target="#learnerSignupModal">Sign up</a>
              <div class="modal fade" id="learnerSignupModal" tabindex="-1" aria-labelledby="learnerSignupModal"
                aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header bg-purple text-white">
                      <h5 class="modal-title text-dark" id="learnerSignupModal">Become a ElearnCenter Learner</h5>
                    </div>
                    <div class="modal-body">
                      <p>Join a welcoming online community of learners where you'll find instant access to all the
                        resources you need to create courses. Get support and guidance as you embark on your educational
                        journey, whether you're a beginner or looking to refine your skills. Let's build something great
                        together!.</p>
                      <form>
                        <div class="mb-3">
                          <input type="text" class="form-control" placeholder="user name" ref="lName">
                        </div>
                        <div class="mb-3">
                          <input type="text" class="form-control" placeholder="full name" ref="lFullName">
                        </div>
                        <div class="mb-3">
                          <input type="email" class="form-control" placeholder="Email" ref="lEmail">
                        </div>
                        <div class="mb-3">
                          <input type="number" class="form-control" placeholder="phone" ref="lPhone">
                        </div>
                        <div class="mb-3">
                          <input type="password" class="form-control" placeholder="Password" ref="lPassword">
                        </div>

                        <div class="form-check mb-3">
                          <input type="checkbox" class="form-check-input" id="newsletterCheckbox">
                          <label class="form-check-label" for="newsletterCheckbox">I want to receive emails with insider
                            tips, motivation, special updates, and promotions reserved for learner.</label>
                        </div>
                        <button class="btn btn-primary" @click="learnerSignUp()" data-bs-dismiss="modal">Sign
                          up</button>
                      </form>
                    </div>
                    <div class="modal-footer">
                      <p>By signing up, you agree to our <a href="#">Terms of Use</a> and <a href="#">Privacy
                          Policy</a>.
                      </p>
                      <p>Already have an account? <a href="#">Log in</a></p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li class="nav-item" v-if="userName !== null" style="font-size: 14px;">
              <a class="nav-link text-dark btn" v-on:click="logOutOfSystem()" style="font-size: 14px;">Log out</a>
            </li>
            <li class="nav-item mt-2 me-1" v-if="userName !== null" style="font-size: 14px;">
              Hello!
            </li>
            <li class="nav-item fw-bold text-primary mt-2 pointer" data-bs-toggle="modal" data-bs-target="#userInfor"
              @click="fetchUserInfomation()" v-if="userName !== null" style="font-size: 14px;">
              {{ userName }}
            </li>
            <div class="modal fade" id="userInfor" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
              aria-labelledby="userInfor" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="userInfor">User infomation</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <!-- Avatar -->
                    <div class="text-center mb-3"  v-if="user.avatar !== undefined && user.avatar !== null">
                      <img :src=user.avatar.originUrl
                   alt="Avatar" class="rounded-circle" width="100" height="100">
                    </div>
                    <!-- Thông tin người dùng -->
                    <div class="mb-2">
                      <strong>Name:</strong> <span id="userName">{{ user.name }}</span>
                    </div>
                    <div class="mb-2">
                      <strong>Phone:</strong> <span id="userPhone">{{ user.phone }}</span>
                    </div>
                    <div class="mb-2">
                      <strong>Email:</strong> <span id="userEmail">{{ user.email }}</span>
                    </div>
                    <div class="mb-2" v-if="user.roles !== undefined">
                      <strong>Role:</strong> <span id="userRole">{{ user.roles[0].title }}</span>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                      data-bs-target="#updateUserModal">Update</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal fade" id="updateUserModal" data-bs-backdrop="static" data-bs-keyboard="false"
              tabindex="-1" aria-labelledby="updateUserModal" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="updateUserModal">Update User infomation</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <form>
                      <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address:</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                          ref="uEmail"  v-model="user.email" >
                      </div>
                      <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Phone:</label>
                        <input type="number" class="form-control" id="exampleInputPassword1" ref="uPhone" v-model="user.phone">
                      </div>
                      <div class="input-group mb-3">
                        <input v-on:change="changePic()" type="file" class="form-control w-100" id="inputGroupFile02"
                          accept="image/*" ref="file">

                        <img :src=imageFile class="img-thumbnail mt-3" alt="..." style="width: 120px;height: 67px;">
                      </div>

                    </form>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                      data-bs-target="#updateUserModal" v-on:click="updateUser()"
                      data-bs-dismiss="modal">Update</button>
                  </div>
                </div>
              </div>
            </div>
          </ul>

        </div>
      </div>
    </nav>
    <router-view></router-view>
    <footer class="text-center text-lg-start bg-body-tertiary text-muted">
      <!-- Section: Social media -->
      <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <!-- Left -->
        <div class="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>
        <!-- Left -->

        <!-- Right -->
        <div>
          <a href="" class="me-4 text-reset">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="" class="me-4 text-reset">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="" class="me-4 text-reset">
            <i class="fab fa-google"></i>
          </a>
          <a href="" class="me-4 text-reset">
            <i class="fab fa-instagram"></i>
          </a>
          <a href="" class="me-4 text-reset">
            <i class="fab fa-linkedin"></i>
          </a>
          <a href="" class="me-4 text-reset">
            <i class="fab fa-github"></i>
          </a>
        </div>
        <!-- Right -->
      </section>
      <!-- Section: Social media -->

      <!-- Section: Links  -->
      <section class="">
        <div class="container text-center text-md-start mt-5">
          <!-- Grid row -->
          <div class="row mt-3">
            <!-- Grid column -->
            <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <!-- Content -->
              <h6 class="text-uppercase fw-bold mb-4">
                <i class="fas fa-gem me-3"></i>ElearnCenter
              </h6>
              <p>
                Here you can use rows and columns to organize your footer content. Lorem ipsum
                dolor sit amet, consectetur adipisicing elit.
              </p>
            </div>
            <!-- Grid column -->

            <!-- Grid column -->
            <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <!-- Links -->
              <h6 class="text-uppercase fw-bold mb-4">
                Content
              </h6>
              <p>
                <a href="#!" class="text-reset">Course</a>
              </p>
              <p>
                <a href="#!" class="text-reset">Book</a>
              </p>
              <p>
                <a href="#!" class="text-reset">Article</a>
              </p>

            </div>
            <!-- Grid column -->

            <!-- Grid column -->
            <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <!-- Links -->
              <h6 class="text-uppercase fw-bold mb-4">
                Useful links
              </h6>
              <p>
                <a href="#!" class="text-reset">Pricing</a>
              </p>
              <p>
                <a href="#!" class="text-reset">Settings</a>
              </p>
              <p>
                <a href="#!" class="text-reset">Orders</a>
              </p>
              <p>
                <a href="#!" class="text-reset">Help</a>
              </p>
            </div>
            <!-- Grid column -->

            <!-- Grid column -->
            <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <!-- Links -->
              <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
              <p><i class="fas fa-home me-3"></i> Ha Noi, HN 00001, VN</p>
              <p>
                <i class="fas fa-envelope me-3"></i>
                elaerncenter@elearn.com
              </p>
              <p><i class="fas fa-phone me-3"></i> + 01 234 567 88</p>
              <p><i class="fas fa-print me-3"></i> + 01 234 567 89</p>
            </div>

          </div>

        </div>
      </section>

      <div class="text-center p-4" style="background-color: rgba(0, 0, 0, 0.797);">
        © 2024 Copyright:
        <a class="text-reset fw-bold" href="">ElearnCenter.com</a>
      </div>

    </footer>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'UserPage',
  props: {
    msg: String
  },
  data() {
    return {
      phone: '',
      password: '',
      show: true,
      role: localStorage.getItem('role'),
      userName: localStorage.getItem('username'),
      user: new Object(),
      imageFile: null,
      changeUser: new Object(),
    
    }
  },

  computed: {
    listCourseCategories() {
      return this.$store.state.lstCourseCategory;
    },
    userLogined() {
      return this.$store.state.userLogined;
    },
    cartItems() {
      return this.$store.state.cart;
    },
    total() {
      return this.$store.state.totalCartMoney;
    },
  },
 async mounted() {


  },
  methods: {
    async updateUser() {
      try {
        var formData = new FormData();
        formData.append('file', this.$refs.file.files[0]);

        this.changeUser = {
          phone: this.$refs.uPhone.value,
          email: this.$refs.uEmail.value,
          id: this.user.id
        };

        if (formData) {
          try {
            const responseImg = await axios.post(
              "api/v1/file/upload-image",
              formData,
              {
                headers: {
                  Authorization: localStorage.getItem("accessToken"),
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            this.changeUser.avatarId = responseImg.data.body.id;
          } catch (error) {
            this.$message.error("Image upload error:", error.response ? error.response.data : error.message);
            return;
          }
        }

        try {
          await axios.post("api/v1/update-users", this.changeUser, {
            headers: {
              Authorization: localStorage.getItem("accessToken"),
            },
          });
          this.$message({
          message: "User updated successfully!",
          type: 'success'
        });
        } catch (error) {
          this.$message.error("User update error:", error.response ? error.response.data : error.message);
        }

      } catch (error) {
        this.$message.error("Unexpected error:", error);
      }

    },
    changePic() {
      this.imageFile = URL.createObjectURL(this.$refs.file.files[0])
    },
    async fetchUserInfomation() {
      const response = await axios.get("api/v1/info-users", {
        params: { id: localStorage.getItem("ownerId") },
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        }
      });
      this.user = response.data.body;
    },
    goOrganizationPage() {
      this.$router.push({ path: "/organizationPage" })
    },
    goLecturePage() {
      this.$router.push({ path: "/LectureStudio" })
    },
    goLearnerPage() {
      this.$router.push({ path: "/LearnerPage" })
    },
    goToCart() {
      this.$router.push({ path: "/CartPage" })
    },
    goHome() {
      this.$router.push({ path: "/" })
    },
    loginIntoSystem() {
      this.$store.dispatch('fetchLogin', {
        phone: this.phone,
        password: this.password
      }).then(() => {
        this.userName = localStorage.getItem('username')
        this.role = localStorage.getItem('role')
      })
    },

    lectureSignUp() {
      let user = new Object();
      user.email = this.$refs.lecEmail.value;
      user.name = this.$refs.lecName.value;
      user.password = this.$refs.lecPassword.value;
      user.phone = this.$refs.lecPhone.value;
      user.fullName = this.$refs.lecFullName.value;
      try {
        this.$store.dispatch('lectureSignUp', user)
      } catch (error) {
        this.$message.error('some thing when wrong');
      }
    },

    learnerSignUp() {
      let user = new Object();
      user.email = this.$refs.lEmail.value;
      user.name = this.$refs.lName.value;
      user.password = this.$refs.lPassword.value;
      user.phone = this.$refs.lPhone.value;
      user.fullName = this.$refs.lFullName.value;
      try {
        this.$store.dispatch('learnerSignUp', user)
      } catch (error) {
        this.$message.error('some thing when wrong');
      }
    },
    logOutOfSystem() {
      this.userName = null;
      this.role = null;
      this.$store.dispatch('logOut')

    }
  }
}
</script>
<style scoped>
.pointer {
  cursor: pointer;
}
</style>