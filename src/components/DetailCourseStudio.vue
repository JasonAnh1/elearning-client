<template>
    <div>
        <div class="my-learning container-fluid bg-dark " style="height: 200px;">
            <h1 class="t ms-5 pt-5 fw-bold ps-5 text-primary">ElearnCenter Studio</h1>
            <h1 class="btn btn-outline-primary  mt-3" style="margin-left:90px ;" data-bs-toggle="modal"
                data-bs-target="#createCourseModal" v-on:click="updateModel()">Edit course</h1>
            <h1 class="btn btn-outline-warning  mt-3" style="margin-left:13px ;" data-bs-toggle="modal"
                data-bs-target="#promoteCourseModal" v-if="currentCourse.advertise === 'NONE'">
                Promote course</h1>
            <div class="modal fade" id="promoteCourseModal" tabindex="-1" aria-labelledby="promoteCourseModal"
                aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title text-primary" id="promoteCourseModal">Promote course checkout</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="modal-promote-content">
                                <p><em>To enhance your learning experience and unlock exclusive features, we are excited
                                        to offer you the opportunity to promote your course on our platform.</em></p>
                                <p><em>Promoting your course is essential to reach a wider audience, increase your
                                        visibility, and attract more learners. This process involves a nominal promotion
                                        fee that ensures your course gets the attention it deserves.</em></p>
                                <p><em>Once the promotion fee is successfully processed, our team will promptly
                                        highlight your course, giving it a prominent position on our platform and
                                        boosting its exposure to potential learners.</em></p>
                                <p><em>Thank you for choosing to promote your course with us. We are committed to
                                        helping you succeed and look forward to seeing your course thrive on our
                                        platform.</em></p>


                            </div>
                            <div class="fw-bold">Chose bank:</div>
                            <select id="bankSelect" v-model="bankCode" class="form-select  mb-2 form-control"
                                aria-label="Default select example">
                                <option value="NCB" class="text-primary" selected>NATIONAL CITIZEN BANK (NCB)</option>
                                <option value="VISA" class="text-secondary">VISA CREDIT CARD</option>
                                <option value="MasterCard" class="text-success">MASTERCARD</option>
                                <option value="JCB" class="text-success">Japan Credit Bureau</option>
                                <!-- Thêm các option khác tùy theo nhu cầu -->
                            </select>
                            <div class="fw-bold">Fee will be:</div>
                            <p>đ 100.000</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                                @click="checkOutPromote()">Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="createCourseModal" tabindex="-1" aria-labelledby="createCourseModal"
                aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="createCourseModal">Create course</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form class="row g-3">
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label">Id:</label>
                                    <input type="number" class="form-control" id="exampleFormControlInput1" ref="cTitle"
                                        :value=currentCourse.id readonly>
                                </div>
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label">Category</label>
                                    <select v-model="cCategoryId" class="form-select"
                                        aria-label="Default select example">
                                        <option :value="item.id" v-for="item in listCourseCategories"
                                            v-bind:key="item.id">{{ item.title }}
                                        </option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label">Title</label>
                                    <input type="text" class="form-control" id="exampleFormControlInput1"
                                        v-model="cTitle">
                                </div>
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label">Short description</label>
                                    <input type="text" class="form-control" id="exampleFormControlInput1"
                                        v-model="cShortDes">
                                </div>
                                <div class="mb-3">
                                    <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                                    <VueEditor class="form-control" id="exampleFormControlTextarea1" rows="3"
                                        v-model="cDescription">
                                    </VueEditor>
                                </div>
                                <div class="mb-3">
                                    <label for="exampleFormControlTextarea1" class="form-label">Content</label>
                                    <VueEditor class="form-control" id="exampleFormControlTextarea1" rows="3"
                                        v-model="cContent">
                                    </VueEditor>
                                </div>
                                <div class="mb-3">
                                    <label for="exampleFormControlTextarea1" class="form-label">Requirement</label>
                                    <VueEditor class="form-control" id="exampleFormControlTextarea1" rows="3"
                                        v-model="cRequirement">
                                    </VueEditor>
                                </div>
                                <div class="mb-3">
                                    <label for="exampleFormControlTextarea1" class="form-label">Detail</label>
                                    <VueEditor class="form-control" id="exampleFormControlTextarea1" rows="3"
                                        v-model="cDetail">
                                    </VueEditor>
                                </div>
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label">Price</label>
                                    <input type="number" class="form-control" id="exampleFormControlInput1"
                                        v-model="cPrice">
                                </div>
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label">PriceSale</label>
                                    <input type="number" class="form-control" id="exampleFormControlInput1"
                                        v-model="cPriceSale">
                                </div>

                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label">Level</label>
                                    <select v-model="cLevel" class="form-select" aria-label="Default select example">
                                        <option value="BEGINNER">BEGINNER</option>
                                        <option value="ADVANCED">ADVANCED</option>
                                        <option value="INTERMEDIATE">INTERMEDIATE</option>
                                        <option value="EXPERT">EXPERT</option>
                                    </select>
                                </div>
                                <div class="input-group mb-3">
                                    <input v-on:change="changePic()" type="file" class="form-control w-100"
                                        id="inputGroupFile02" accept="image/*" ref="file">

                                    <img :src=imageFile class="img-thumbnail mt-3" alt="..."
                                        style="width: 120px;height: 67px;">
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" v-on:click="editCourse()"
                                data-bs-dismiss="modal">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container mt-5 ">
            <h3 class="fw-bold">{{ currentCourse.title }}:</h3>
            <div class="row row-cols-1 row-cols-md-4 jus">
                <div class="col">
                    <div class="card  ">
                        <a href="" class="text-decoration-none text-reset">
                            <img :src=currentCourse.media.originUrl class="card-img-top " alt="...">

                            <div class="card-body">
                                <h5 class="card-title fw-bold">{{ currentCourse.title }}</h5>
                                <p class="card-text">{{ currentCourse.author.name }}</p>
                            </div>
                            <div class="card-footer">
                                <el-rate class="" :value="currentCourse.rating" disabled show-score text-color="#ff9900"
                                    score-template="{value}">
                                </el-rate>

                                <span class="text-muted text-decoration-none" style="font-size: 11px;">99999 Learner <i
                                        class="fa-solid fa-user"></i></span>
                            </div>
                        </a>
                    </div>

                </div>
                <div class="col-8 position-relative">
                    <div class=" text-white ">
                        <div class="accordion" id="accordionPanelsStayOpenExample">
                            <div class="accordion-item" v-for="(item, index) in currentCourse.sections"
                                v-bind:key="index">

                                <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                                    <button class="accordion-button fw-bold " type="button" data-bs-toggle="collapse"
                                        :data-bs-target="'#target' + index" aria-expanded="true"
                                        aria-controls="panelsStayOpen-collapseOne">
                                        Section:{{ item.partNumber }} {{ item.title }}<br />
                                        1/1

                                    </button>

                                </h2>
                                <div class="btn btn-primary w-100 pt-1" data-bs-toggle="modal"
                                    :data-bs-target="'#editSectionModal' + index">Edit Section</div>
                                <div class="modal fade" :id="'editSectionModal' + index" tabindex="-1"
                                    aria-labelledby="editSectionModal" aria-hidden="true">
                                    <div class="modal-dialog modal-xl">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" :id="'editSectionModal' + index">Edit section
                                                </h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <form class="row g-3">
                                                    <div class="mb-3">
                                                        <label for="exampleFormControlInput1"
                                                            class="form-label text-dark" ref="csTitle">Id:</label>
                                                        <input type="number" class="form-control"
                                                            id="exampleFormControlInput1" :ref="'uId' + item.id"
                                                            :value="item.partNumber" readonly>
                                                    </div>
                                                    <div class="mb-3">
                                                        <label for="exampleFormControlInput1"
                                                            class="form-label text-dark" ref="csTitle">Title</label>
                                                        <input type="text" class="form-control"
                                                            id="exampleFormControlInput1" :ref="'uTitle' + item.id"
                                                            :value="item.title">
                                                    </div>


                                                    <div class="mb-3">
                                                        <label for="exampleFormControlInput1"
                                                            class="form-label text-dark">Section
                                                            part:</label>
                                                        <input type="number" class="form-control"
                                                            id="exampleFormControlInput1" :ref="'uPartNumber' + item.id"
                                                            :value="item.partNumber">
                                                    </div>


                                                </form>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary"
                                                    data-bs-dismiss="modal">Close</button>
                                                <button class="btn btn-primary"
                                                    v-on:click="updateCourseSection(item.id)"
                                                    data-bs-dismiss="modal">Save
                                                    changes</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div :id="'target' + index" class="accordion-collapse collapse show text-dark"
                                    aria-labelledby="panelsStayOpen-headingOne">

                                    <button v-for="lesson in item.lessons" v-bind:key="lesson.id" type="button"
                                        class="list-group-item list-group-item-action " aria-current="true"
                                        v-on:click="goToLesson(lesson.id)">
                                        <span v-if="lesson.type === 'VIDEO'">
                                            <i class="fa-solid fa-video">
                                            </i><span class="fw-bold" style="font-size: 14px;"> Video:</span></span>
                                        <span v-else-if="lesson.type === 'TEXT'">
                                            <i class="fa-solid fa-file-lines"></i><span class="fw-bold"
                                                style="font-size: 14px;"> Reading:</span>
                                        </span>
                                        {{ lesson.title }}
                                    </button>

                                    <div class="btn btn-outline-primary w-100" v-on:click="addLesson(item.id)">Add
                                        lesson</div>

                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="btn btn-outline-primary position-absolute end-0 mt-2 me-2 " data-bs-toggle="modal"
                        data-bs-target="#exampleModal">Add section</div>
                    <!-- Modal -->
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog modal-xl">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">create section</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form class="row g-3">
                                        <div class="mb-3">
                                            <label for="exampleFormControlInput1" class="form-label"
                                                ref="csTitle">Title</label>
                                            <input type="text" class="form-control" id="exampleFormControlInput1"
                                                ref="csTitle">
                                        </div>


                                        <div class="mb-3">
                                            <label for="exampleFormControlInput1" class="form-label">section
                                                part</label>
                                            <input type="number" class="form-control" id="exampleFormControlInput1"
                                                ref="csPartNumber">
                                        </div>


                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary"
                                        data-bs-dismiss="modal">Close</button>
                                    <button class="btn btn-primary" v-on:click="addCourseSection(currentCourse.id)">Save
                                        changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
        <div class="rating container mt-5">
            <h4 class="fw-bold">
                <span class="badge bg-success">4,8</span>
                <span class="text-muted">Course rating • 350 rate</span>
            </h4>
            <hr>
            <div class="row gx-5">
                <div class="col-6 card mb-2 " v-for="item in comments" v-bind:key="item.id">
                    <div class="card-body">
                        <h5 class="card-title"><img :src=item.user.avatar.originUrl alt="Avatar" class="rounded-circle"
                                style="width: 70px;" v-if="item.user.avatar !== null">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRadJ-YmNxJTg6v9iO22fzR_65KenYJHFB5zg&s"
                                alt="Avatar" class="rounded-circle" style="width: 70px;" v-else>
                            {{ item.user.name }}.
                        </h5>
                        <span class="text-muted">{{ timePassed(item.createdAt) }}</span>
                        <p class="card-text">
                            {{ item.content }}
                        </p>
                        <div class="">
                            <button type="button" class="btn btn-sm btn-outline-secondary">Report</button>
                            <i class="fa-solid fa-thumbs-up  btn btn-outline-secondary rounded"></i> <i
                                class="fa-solid fa-thumbs-down  btn btn-outline-secondary rounded"></i>
                        </div>
                    </div>
                </div>

                <button class="btn w-100 btn-outline-secondary " data-bs-toggle="modal"
                    data-bs-target="#exampleModal">Show
                    all
                    rating</button>
            </div>

            <!-- Button trigger modal -->

            <!-- Modal -->
            <div class="modal fade container-fluid" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2 class="mt-4">
                                <span class="badge bg-success">4,8</span>
                                <span class="text-muted">Course rating • 350 rate</span>
                            </h2>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body container">
                            <div class="row">
                                <div class="col-3">
                                    <div class="row 5star">
                                        <div class="col-5">
                                            <div class="progress ">
                                                <div class="progress-bar " role="progressbar" aria-valuenow="0"
                                                    aria-valuemin="0" aria-valuemax="100" style="width: 53%"></div>
                                            </div>
                                        </div>
                                        <div class="col-7 fw-bold">
                                            <i class="fa fa-star text-warning"></i><i
                                                class="fa fa-star text-warning"></i><i
                                                class="fa fa-star text-warning text-warning"></i><i
                                                class="fa fa-star text-warning"></i><i
                                                class="fa fa-star text-warning"></i>
                                            53%
                                        </div>
                                        <div class="col-2">

                                        </div>
                                    </div>

                                    <div class="row 4star">
                                        <div class="col-5">
                                            <div class="progress ">
                                                <div class="progress-bar " role="progressbar" aria-valuenow="0"
                                                    aria-valuemin="0" aria-valuemax="100" style="width: 37%"></div>
                                            </div>
                                        </div>
                                        <div class="col-7  fw-bold">
                                            <i class="fa fa-star text-warning"></i><i
                                                class="fa fa-star text-warning"></i><i
                                                class="fa fa-star text-warning"></i><i
                                                class="fa fa-star text-warning"></i><i class="fa fa-star"></i>
                                            37%
                                        </div>

                                    </div>

                                    <div class="row 3star">
                                        <div class="col-5">
                                            <div class="progress ">
                                                <div class="progress-bar " role="progressbar" aria-valuenow="0"
                                                    aria-valuemin="0" aria-valuemax="100" style="width: 8%"></div>
                                            </div>
                                        </div>
                                        <div class="col-7  fw-bold">
                                            <i class="fa fa-star text-warning"></i><i
                                                class="fa fa-star text-warning"></i><i
                                                class="fa fa-star text-warning"></i><i class="fa fa-star"></i><i
                                                class="fa fa-star"></i>
                                            8%
                                        </div>
                                    </div>

                                    <div class="row 2star">
                                        <div class="col-5">
                                            <div class="progress ">
                                                <div class="progress-bar " role="progressbar" aria-valuenow="0"
                                                    aria-valuemin="0" aria-valuemax="100" style="width: 1%"></div>
                                            </div>
                                        </div>
                                        <div class="col-7  fw-bold">
                                            <i class="fa fa-star text-warning"></i><i
                                                class="fa fa-star text-warning"></i><i class="fa fa-star"></i><i
                                                class="fa fa-star"></i><i class="fa fa-star"></i>
                                            1%
                                        </div>
                                    </div>

                                    <div class="row 1star">
                                        <div class="col-5">
                                            <div class="progress ">
                                                <div class="progress-bar " role="progressbar" aria-valuenow="0"
                                                    aria-valuemin="0" aria-valuemax="100" style="width: 1%"></div>
                                            </div>
                                        </div>
                                        <div class="col-7  fw-bold">
                                            <i class="fa fa-star text-warning"></i><i class="fa fa-star"></i><i
                                                class="fa fa-star"></i><i class="fa fa-star"></i><i
                                                class="fa fa-star"></i>
                                            1%
                                        </div>
                                    </div>

                                </div>
                                <div class="col-9">

                                    <div class=" card mb-2">
                                        <div class="card-body">
                                            <h5 class="card-title"><img
                                                    src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=400&d=mm&r=g"
                                                    alt="Avatar" class="rounded-circle" style="width: 70px;"> Nguyễn
                                                Thành T.</h5>
                                            <span class="text-muted">1 tháng trước</span>
                                            <p class="card-text">
                                                Cách trình bày nội dung dễ hiểu và dễ tiếp cận. Giọng điệu giảng viên rõ
                                                ràng, lôi cuốn
                                                người nghe.
                                            </p>
                                            <div class="">
                                                <button type="button"
                                                    class="btn btn-sm btn-outline-secondary">Report</button>
                                                <i class="fa-solid fa-thumbs-up  btn btn-outline-secondary rounded"></i>
                                                <i
                                                    class="fa-solid fa-thumbs-down  btn btn-outline-secondary rounded"></i>
                                            </div>
                                        </div>
                                    </div>

                                    <div class=" card mb-2">
                                        <div class="card-body">
                                            <h5 class="card-title"><img
                                                    src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=400&d=mm&r=g"
                                                    alt="Avatar" class="rounded-circle" style="width: 70px;"> Nguyễn
                                                Thành T.</h5>
                                            <span class="text-muted">1 tháng trước</span>
                                            <p class="card-text">
                                                Cách trình bày nội dung dễ hiểu và dễ tiếp cận. Giọng điệu giảng viên rõ
                                                ràng, lôi cuốn
                                                người nghe.
                                            </p>
                                            <div class="">
                                                <button type="button"
                                                    class="btn btn-sm btn-outline-secondary">Report</button>
                                                <i class="fa-solid fa-thumbs-up  btn btn-outline-secondary rounded"></i>
                                                <i
                                                    class="fa-solid fa-thumbs-down  btn btn-outline-secondary rounded"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class=" card mb-2">
                                        <div class="card-body">
                                            <h5 class="card-title"><img
                                                    src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=400&d=mm&r=g"
                                                    alt="Avatar" class="rounded-circle" style="width: 70px;"> Nguyễn
                                                Thành T.</h5>
                                            <span class="text-muted">1 tháng trước</span>
                                            <p class="card-text">
                                                Cách trình bày nội dung dễ hiểu và dễ tiếp cận. Giọng điệu giảng viên rõ
                                                ràng, lôi cuốn
                                                người nghe.
                                            </p>
                                            <div class="">
                                                <button type="button"
                                                    class="btn btn-sm btn-outline-secondary">Report</button>
                                                <i class="fa-solid fa-thumbs-up  btn btn-outline-secondary rounded"></i>
                                                <i
                                                    class="fa-solid fa-thumbs-down  btn btn-outline-secondary rounded"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class=" card mb-2">
                                        <div class="card-body">
                                            <h5 class="card-title"><img
                                                    src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=400&d=mm&r=g"
                                                    alt="Avatar" class="rounded-circle" style="width: 70px;"> Nguyễn
                                                Thành T.</h5>
                                            <span class="text-muted">1 tháng trước</span>
                                            <p class="card-text">
                                                Cách trình bày nội dung dễ hiểu và dễ tiếp cận. Giọng điệu giảng viên rõ
                                                ràng, lôi cuốn
                                                người nghe.
                                            </p>
                                            <div class="">
                                                <button type="button"
                                                    class="btn btn-sm btn-outline-secondary">Report</button>
                                                <i class="fa-solid fa-thumbs-up  btn btn-outline-secondary rounded"></i>
                                                <i
                                                    class="fa-solid fa-thumbs-down  btn btn-outline-secondary rounded"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class=" card mb-2">
                                        <div class="card-body">
                                            <h5 class="card-title"><img
                                                    src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=400&d=mm&r=g"
                                                    alt="Avatar" class="rounded-circle" style="width: 70px;"> Nguyễn
                                                Thành T.</h5>
                                            <span class="text-muted">1 tháng trước</span>
                                            <p class="card-text">
                                                Cách trình bày nội dung dễ hiểu và dễ tiếp cận. Giọng điệu giảng viên rõ
                                                ràng, lôi cuốn
                                                người nghe.
                                            </p>
                                            <div class="">
                                                <button type="button"
                                                    class="btn btn-sm btn-outline-secondary">Report</button>
                                                <i class="fa-solid fa-thumbs-up  btn btn-outline-secondary rounded"></i>
                                                <i
                                                    class="fa-solid fa-thumbs-down  btn btn-outline-secondary rounded"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { VueEditor } from "vue2-editor";
import router from '@/router';
export default {
    name: 'DetailCourseStudio',
    data() {
        return {
            bankCode: 'NCB',
            courseSection: new Object(),
            courseId: this.$route.query.courseId,
            imageFile: null,
            cLevel: null,
            cDescription: null,
            course: new Object(),
            cContent: null,
            cDetail: null,
            cCategoryId: 0,
            cRequirement: null,
            cPrice: 0,
            cPriceSale: 0,
            cTitle: null,
            cShortDes: null,
            uSectionTitle: null,
            uSectionPartNumber: 0,
            comments: null
        }
    },
    components: {
        VueEditor
    },
    computed: {
        listCourseCategories() {
            return this.$store.state.lstCourseCategory;
        },
        currentCourse() {
            return this.$store.state.currentTagetCourse;
        },
    },
    mounted() {
        this.$store.dispatch('fetchCourse', this.courseId)
        this.getCourseComment()
    },

    methods: {
        goToLesson(lessonId) {
            router.push({ path: "/LessonStudio", query: { lessonId: lessonId, courseId: this.courseId } });
        },
        changePic() {
            this.imageFile = URL.createObjectURL(this.$refs.file.files[0])
        },
        timePassed(createdAt) {
            // Thời điểm đã lưu
            const savedMoment = new Date(createdAt);

            // Thời điểm hiện tại
            const currentMoment = new Date();

            // Tính toán thời gian đã trôi qua (tính bằng milliseconds)
            const timeDifference = currentMoment - savedMoment;

            // Chuyển đổi thời gian từ milliseconds sang giờ, phút, giây
            const seconds = Math.floor(timeDifference / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);

            if (minutes < 3) {
                return `just now`;
            }

            if (hours < 1) {
                return `${minutes} minutes ago`;
            } else if (hours < 24) {
                return `${hours} hours ago`;
            } else if (days < 30) {
                return `${days} days ago`;
            }
            else {
                const months = Math.floor(days / 30);
                return `${months} months ago`;
            }
        },
        async getCourseComment() {

            const listCourseComment = await axios.get("api/v1/publish/list-course-comment", {
                params: { request: this.courseId },
            });

            this.comments = listCourseComment.data;

        },
        updateModel() {
            this.cTitle = this.currentCourse.title,
                this.cLevel = this.currentCourse.level,
                this.cDescription = this.currentCourse.description,
                this.cContent = this.currentCourse.courseContent,
                this.cDetail = this.currentCourse.detail,
                this.cCategoryId = this.currentCourse.categoryId,
                this.cRequirement = this.currentCourse.requirement,
                this.cPrice = this.currentCourse.price,
                this.cPriceSale = this.currentCourse.priceSale,
                this.cShortDes = this.currentCourse.shortDes
        },
        updateCourseSection(sectionId) {

            const updateSection = new Object({
                id: sectionId,
                title: this.$refs['uTitle' + sectionId][0].value,
                partNumber: this.$refs['uPartNumber' + sectionId][0].value,
                courseId: this.courseId
            })

            this.$store.dispatch('fetchUpdateCourseSection', { 'courseId': this.courseId, 'request': updateSection });
        },
        addCourseSection(courseIds) {
            const courseid = courseIds
            this.courseSection = new Object({
                title: this.$refs.csTitle.value,
                partNumber: this.$refs.csPartNumber.value,
                courseId: courseid
            })
            this.$store.dispatch('fetchAddCourseSection', { 'request': this.courseSection });
        },
        editCourse() {
            if (this.$refs.file.files[0]) {
                var formData = new FormData();
                formData.append('file', this.$refs.file.files[0]);
            }

            this.course = new Object({
                id: this.courseId,
                title: this.cTitle,
                categoryId: this.cCategoryId,
                shortDes: this.cShortDes,
                requirement: this.cRequirement,
                detail: this.cDetail,
                price: this.cPrice,
                priceSale: this.cPriceSale,
                courseContent: this.cContent,
                level: this.cLevel,
                description: this.cDescription
            })
            this.$store.dispatch('fetchUpdateCourse', { 'img': formData, 'request': this.course })
                .then(() => {
                    router
                        .push({ path: "/LectureStudio" })
                        .catch(() => { })
                        .then(() => {
                            router.go();
                        });
                });
        },
        addLesson(courseStId) {
            router.push({ path: 'CreateLesson', query: { courseSectionId: courseStId } })
        },
        checkOutPromote() {
            if (this.bankCode) {
                let payload = {
                    bankCode: this.bankCode,
                    total: 100000
                }
                let transactionObj = new Object();
                transactionObj.type = 'promote'
                transactionObj.amount = 100000;
                transactionObj.courseId = this.currentCourse.id;
                localStorage.setItem('transactionObj', JSON.stringify(transactionObj));
                this.$store.dispatch('goPaidPage', payload);
            } else {
                this.$swal.fire({
                    icon: 'error',
                    title: 'Oh no',
                    text: 'Some thing wrong!',
                    footer: '<a href="">Go to cart?</a>'
                });
            }
        },
    },
    props: {
        msg: String
    },

}
</script>
<style scoped>
.modal-promote-content {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
}

.modal-promote-content p {
    margin-bottom: 10px;
}

.modal-promote-content em {
    font-style: italic;
    color: #333;
}
</style>