<template>
  <div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-8">
          <div class="card mb-3 shadow-sm">

            <div class="card-body">
              <h5 class="card-title fw-bold">{{ currentCourse.title }} </h5>
              <p class="card-text">{{ currentCourse.shortDes }}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="mb-2">
                  <span class="badge bg-success">top seller</span>
                  <span class="text-muted">4.0 (98,846 rate)</span>
                  <span class="text-muted">415,746 learner</span>
                </div>
                <div class="mb-2">
                  <span class="text-muted">Created By:</span>
                  <a href="#">{{ currentCourse.author.name }}</a>
                </div>
                <div class="mb-2">
                  <div class="btn" @click="openChat( currentCourse.author.name)"> 
                      <img
                      :src=currentCourse.author.avatar.originUrl alt="Avatar"
                      class="rounded-circle" style="width: 70px;" v-if="currentCourse.author.avatar !== null">
                      <img
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEX////b29tra2t4eHje3t7Y2NjV1dVzc3PS0tLNzc1lZWXLy8vg4OBycnJoaGjIyMjCwsK6urpgYGCqqqrw8PD5+fmysrKCgoKZmZno6OicnJy9vb2SkpKMjIympqaioqJ/f38GGKbxAAAIwUlEQVR4nO2diZKjIBBA4xWP4H3GaPT/v3LBI4lGEwWyNFO+qtnZndoqeUPTQEv0dDo4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODg4ODj4b6QjohvClTRB1i2Lm6Kq6zrP8xZ/5XVdVUUTZzdbvyaiW8jE1S9zzXVdk6BN6H7kuqrb1qUvqWUS5qY781oE/6/mKrq1+1Eq1d1gN0p6d8n6UanVLb336qj5ohu9g6TZ60dwC2ly7Fmj8Ou6URfd9G3cVCq/rhsD0Y3fAoOgpqmx6OZ/57wjgy71YiFa4BtpyySIFSvg+SZk60KMWYNWZO5C8IqIJc2MuJVojQ/4zEHaKQLOqCXdXP+mCHWRalEuZt4NM9Eqy2Q8BuEAyE7kKejeRNssYHEU1LQW4IzBJYs+cOHtFm98DbVctNAb+Vsb57Wn8aekANUXp7pvK4aqJdpoxnXaUtPNq6KqSaGtL7P1PlpeV+U9CwPfv2D8IIybql0uV9WilWbYr0Fqmo2t6EhXFMPyw7is6rpq4tC3zgb+MdIJCoZ8R7pxifOFEFeBld+ylzaa1RkpI8RhRFlB14P8rR/di2inKc2zheYdramsoqNmruiGop2mPBekZrlfEIPieVEc2PK7eLSvXQ3GL91YzZJVI9ppyiPI3ButoT8zLEU7TcnG5uWUgjhO66khsJrUuKShSTOj4TTZQDMc50PXp+5DPZsaAotSZZwPz7SCb4bAMg0aDGtqwTdDYLPFsC41C+phqOjTGdEEVslImBONot8nhtC2+YOhm1EnGgXNDIGtS9OhWQE/Q2gbxKFdF2rBeZSqSLTSjJZ1sngzhFZQ7KsYOX2imedSVbTRnJp1spjPh61oozm9IUMqnRlCW5aeTt3uzqRflWLD28QQ2IQ/bPJNej9sGLwawjuW0SXCmmEYKoo9MTREG80hg8i8MwSpohivhtCKif0RBZYVDQZNljTgbs0ExJBhvieG1YshvPsW3SafqQsnU74J77QCOQtVMxoGz8I5tP0v5qpqZslmqOgvfQis4o1JVKbtb2/4rLa5tmihd1S2NVvHc0YEt3c6ke2TG7Ia6vE4EiGeqClMxumwUwyGwjfEkwqZ6TJs8B+KQ2m5PiWGASpS09R2XYvdUEFdscAsE4P8Q7TWE2QolmuyLWl6+lqGG3dpGdDqmzStMA0ehuQejzmUzg04o5E0zdd4GOJYwH1oQDRUjJqLofJyAwtQlJJRgxo+hvUwCAmivZ6QJukhF0O9ei7gAeXSK2mPxceweU46gPb5CZ8A7TAeXWgAWrql/ARfXeGk0j6ZcgfQMOxTDW8gBemQangjWmrCLwwBZdIT32Q6AinP/CSZgsozvzCElWdOP5guAK26e7gbwsqkpx9MiLAy6Ym/IbhhyH1CBLUm7eBtCO/xCrwNwQ1D7obggpTzss2A14WnE1dDYCu2nhRxc4R1w+KF5MrF0VDATYVPUubba4aCAPud2DMqvJXMHOaMKlrgKymjIdQU8wLjQIQ4Dc5gG4jwhyHzQIS3VnuDrV4Db0OxANNOGFxtZgmmgQjwqNc7TGEK73EfS7AYgju9vghDmNpyGNIva/RMinHIEqYltA/krUA76ethKcVscaLtRN1uGvhbix66XHOO740Ua5oT5ZRoZHF8l2Dz1ENRryGCcSyN4f5d4jkjSGS4M53qVtYjj+G+ONUvmXyGuzZRQRb2SGW4XdEKn8hluO3gvuGHtwdyGV5Da0NGtTuzICBf+E+pDJPb7esHTOxgimSGpMmfItXAfj4m6L91f5XKMO0bvXYy2rr4C0hleLKHVl/I8yAnnWdY9qV79uUcyQyti21fLnbXdNu2rXOHZdnrXOQyVD6oEKwn4z9suQyv1n7kMkyGuNyDXIbp2diNXIY05ZrDEBgUt4P/vqEstbYBijuJhyEwaO4Gi27zPmgMJTip8ALN0ZrDEBYUgpDPXS5AY2gAP3s5hcaQfM45kSVUEzpDcoj2KoMjtV8PdMeU/cC3gQA7cvAD7cjJr3OEGKsp7w8HQdsx8uu/Hv0S5ZBOETHmzyVMz4s0H0iwJnebtx8qHFVVvcgMIax0Qifm/UFZFBLBzlGNRTtaWqRy9lN0W33ieI1IR5RHnsfysPJlNE99dYwqUYk1KSPcFIf5sZAzUO2oU7yoFpFYk9jrWhJxzjOomQt2ju1/PwoeqkNDIr5TIcoWBDtHLfyfk4fvPtoR8RW8LQsSR8eL/5fjWYueuSDi8VjIh2CwKtgnneZ/fARMqaPXXBexvDRgLuh7q3ajY/Hr6vG1cqatcJgfIvwUDLxvhsSxPv/QL22ct1Re8ZoP0W2DILmio/0qsaZZtDRMOCXTtSy65Bipt18knUBdbAKndSm6R1sFCZGa8V7NWe1aC3g8glY3ql2C5Dfr3Xkm1us0gU4v1TB3Irpom0P01ZHbijVt1v3IlQI2RR3FzqYc837lKOfycZvA+/IL9myWGQPZLUUHjpeOWubJQ1kdgM/LqD79OzqN+7ZJYt2xZMqrXwL0oRjSKeooM+k7cMAxGe4h+8szxMJVSrQ/UnUUapQjcILn0L4zMcm3p3BHva2/gHtZz4hdHn6EiO71rMG+60f5TdkaqzpS/OJbAtt1cYr30yT13jkYLxjvNvoarTruPb/kEp4vOLsVfZrfMN6ltk2gYMtlTSyHkJ/VpsPZj0Kx2NuBIx5uvFZkgaVjTSLUQ/6uW0FWtt4P7DqcPW/dQ2wp3MMWkeNqdVUUDaEsqrp18c8ctrnvM9H21+7tTDFreB2OQ7y8X6qNRFuLjvv2MYDwNr7DtJRVcGu2ucgriON0y/Mn2v8wYH6H9z1OzzJ3IVkffzUspO5CHKdfSxtydyGpbn4RtGU3VJ0vnSh7kJLC2GdD6QUxH9OpznHLJoroY81/e2UdLl79yTD/C1HqfAjTRHTjuPBp6Sb5gmbg05QY/4FhiIn++DAk50NWh+HfEFSd1XLG3xiGeCC2f3wY4k6c3Kv5B+H/ytpEiEa3AAAAAElFTkSuQmCC" alt="Avatar"
                      class="rounded-circle" style="width: 70px;" v-else>
                    </div>

                </div>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <div class="mb-2" v-if="currentCourse.isEnrolled === false">
                  <span class="text-muted">Price:</span>
                  <span class="text-decoration-line-through">{{ formatCurrency(currentCourse.price) }}</span>
                </div>
                <div class="mb-2" v-if="currentCourse.isEnrolled === false">
                  <span class="text-danger">Discount {{ ((currentCourse.price - currentCourse.priceSale) /
                    currentCourse.price * 100).toFixed(0) }}%</span>
                </div>
              </div>
              <h4 class="card-title" v-if="currentCourse.isEnrolled === false">{{
                formatCurrency(currentCourse.priceSale) }}</h4>
              <div class="d-flex justify-content-between align-items-center" v-if="currentCourse.isEnrolled === false">
                <button type="button" class="btn btn-primary">Add to cart</button>
                <button type="button" class="btn btn-outline-primary">Buy now</button>
              </div>
            </div>
          </div>
          <div class="accordion" id="accordionPanelsStayOpenExample">
            <div class="accordion-item" v-for="(item, index) in currentCourse.sections" v-bind:key="index">

              <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                <button class="accordion-button fw-bold " type="button" data-bs-toggle="collapse"
                  :data-bs-target="'#target' + index" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                  Section:{{ item.partNumber }} {{ item.title }}<br />
                  1/1

                </button>

              </h2>

              <div :id="'target' + index" class="accordion-collapse collapse show text-dark"
                aria-labelledby="panelsStayOpen-headingOne">

                <button v-for="lesson in item.lessons" v-bind:key="lesson.id" type="button"
                  class="list-group-item list-group-item-action " aria-current="true" v-on:click="goToLesson(lesson.id)"
                  :disabled="!lesson.free">
                  <i class="fa-solid fa-video" v-if="lesson.type === 'VIDEO'">

                  </i>
                  <i class="fa-solid fa-file-lines" v-else-if="lesson.type === 'TEXT'"></i><span class="fw-bold"
                    style="font-size: 14px;"> Reading:</span> {{ lesson.title }}
                </button>



              </div>
            </div>

          </div>

          <div class="requirement">
            <h4 class="mt-4 fw-bold">Requirement</h4>
            <div v-html="currentCourse.requirement"></div>
          </div>
          <div class="description">
            <h4 class="mt-4 fw-bold">Description</h4>
            <div class="mt-2">
              <div v-html="currentCourse.description"></div>
            </div>
          </div>
          <div class="lecturers">
            <div class="h4 fw-bold mt-4">Lecturers</div>
            <a class="h3 fw-bold"> {{ currentCourse.author.name }}</a>
            <!-- <div class="short-des">Bestselling Azure & TOGAF® Trainer, Microsoft Azure MVP</div> -->
            <div class="row">
              <div class="col-2">
                <img :src=currentCourse.author.avatar.originUrl alt="Avatar"
                  class="rounded-circle" style="width: 100px;" v-if="currentCourse.author.avatar !== null">
                  <img src="https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg" alt="Avatar"
                  class="rounded-circle" style="width: 100px;" v-else>
              </div>
              </div>
              <!-- <div class="col-5">
                <p><i class="fa fa-star"></i> 4,5 lecturers rate</p>
                <p><i class="fa-solid fa-play"></i>60 video</p>
                <p><i class="fa-solid fa-medal"></i>30210 rate</p>
                <p><i class="fa-solid fa-user-group"></i>60000 learnner</p>
              </div>
            </div>
            <div class="description">
              This has been the basis of my entire career – as a developer, as a development manager, as a software
              architect – over the past 20 years. I spend half my time in the world of business, explaining complex
              technical topics to business owners and stakeholders so that they can understand and agree with my
              approach to solving their business problems with technical solutions. And the other half with developers,
              explaining the business reasons behind decisions and ensuring that any decisions made on the technical
              side don't restrict the business in unexpected ways.
            </div> -->
          </div>
          <div class="top-rating mt-4" v-if="mostLikedComment !== null">
            <div class="row">
              <div class="col-md-12">
                <h4 class="fw-bold">Top comment</h4>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="card">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-10">
                        <h3> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREOsXxqt6pUPiLVs_-PrtV2cM2UHjvDWaU-lvaDuSzKA&s"
                            alt="Avatar" class="rounded-circle" style="width: 70px;"> {{ mostLikedComment.user.name }}.</h3>
                        <p><el-rate v-model="mostLikedComment.rate" disabled text-color="#ff9900">
                    </el-rate></p>
                        <p>{{ timePassed(mostLikedComment.updatedAt) }}</p>
                        <p>{{ mostLikedComment.content }}</p>
                        <p>rating? <i
                            class="fa-solid fa-thumbs-up  btn btn-outline-secondary rounded"  @click="likeComment(mostLikedComment.id)"></i> <i
                            class="fa-solid fa-thumbs-down  btn btn-outline-secondary rounded"></i></p>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="rating container">
            <h4 class="mt-4 fw-bold"  v-if="courseComments.length > 0">
              <span class="badge bg-success">{{ totalRate }}</span>
              <span class="text-muted">Course rating • {{courseComments.length}} rate</span>
            </h4>
            <hr>
            <div class="row gx-5">
              <div class="col-6 card mb-2 " v-for="comment in courseComments" v-bind:key="comment.id">
                <div class="card-body">
                  <h5 class="card-title"><img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREOsXxqt6pUPiLVs_-PrtV2cM2UHjvDWaU-lvaDuSzKA&s" alt="Avatar"
                      class="rounded-circle" style="width: 70px;"> {{ comment.user.name }}.
                    <el-rate v-model="comment.rate" disabled text-color="#ff9900">
                    </el-rate>
                  </h5>
                  <span class="text-muted">{{ timePassed(comment.updatedAt) }}</span>
                  <p class="card-text">
                    {{ comment.content }}
                  </p>
                  <div class="">

                    <i class="fa-solid fa-thumbs-up  btn btn-outline-secondary rounded" @click="likeComment(comment.id)"></i> 
                    <i class="fa-solid fa-thumbs-down  btn btn-outline-secondary rounded"></i>
                  </div>
                </div>
              </div>

              <button class="btn w-100 btn-outline-secondary " data-bs-toggle="modal"
                data-bs-target="#exampleModal">Show
                all
                rating</button>

            </div>

            <!-- comment course -->
            <div class="d-flex flex-start w-100 mt-5" v-if="currentCourse.isEnrolled === true">
              <img class="rounded-circle shadow-1-strong me-3"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREOsXxqt6pUPiLVs_-PrtV2cM2UHjvDWaU-lvaDuSzKA&s"
                alt="avatar" width="60" height="60" />

              <div class="form-outline w-100">
                <el-rate class="mb-2" v-model="rate" :texts="['oops', 'disappointed', 'normal', 'good', 'great']"
                  show-text>
                </el-rate>

                <textarea class="form-control" id="textAreaExample" rows="4" style="background: #fff;"
                  v-model="commentContent"></textarea>

              </div>
            </div>
            <div class="float-end mt-2 pt-1">
              <button type="button" class="btn btn-outline-dark btn-sm" v-if="currentCourse.isEnrolled === true" @click="saveComment()">Post comment</button>

            </div>
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
                              <div class="progress-bar " role="progressbar" aria-valuenow="0" aria-valuemin="0"
                                aria-valuemax="100" style="width: 53%"></div>
                            </div>
                          </div>
                          <div class="col-7 fw-bold">
                            <i class="fa fa-star text-warning"></i><i class="fa fa-star text-warning"></i><i
                              class="fa fa-star text-warning text-warning"></i><i class="fa fa-star text-warning"></i><i
                              class="fa fa-star text-warning"></i>
                            53%
                          </div>
                          <div class="col-2">

                          </div>
                        </div>

                        <div class="row 4star">
                          <div class="col-5">
                            <div class="progress ">
                              <div class="progress-bar " role="progressbar" aria-valuenow="0" aria-valuemin="0"
                                aria-valuemax="100" style="width: 37%"></div>
                            </div>
                          </div>
                          <div class="col-7  fw-bold">
                            <i class="fa fa-star text-warning"></i><i class="fa fa-star text-warning"></i><i
                              class="fa fa-star text-warning"></i><i class="fa fa-star text-warning"></i><i
                              class="fa fa-star"></i>
                            37%
                          </div>

                        </div>

                        <div class="row 3star">
                          <div class="col-5">
                            <div class="progress ">
                              <div class="progress-bar " role="progressbar" aria-valuenow="0" aria-valuemin="0"
                                aria-valuemax="100" style="width: 8%"></div>
                            </div>
                          </div>
                          <div class="col-7  fw-bold">
                            <i class="fa fa-star text-warning"></i><i class="fa fa-star text-warning"></i><i
                              class="fa fa-star text-warning"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>
                            8%
                          </div>
                        </div>

                        <div class="row 2star">
                          <div class="col-5">
                            <div class="progress ">
                              <div class="progress-bar " role="progressbar" aria-valuenow="0" aria-valuemin="0"
                                aria-valuemax="100" style="width: 1%"></div>
                            </div>
                          </div>
                          <div class="col-7  fw-bold">
                            <i class="fa fa-star text-warning"></i><i class="fa fa-star text-warning"></i><i
                              class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>
                            1%
                          </div>
                        </div>

                        <div class="row 1star">
                          <div class="col-5">
                            <div class="progress ">
                              <div class="progress-bar " role="progressbar" aria-valuenow="0" aria-valuemin="0"
                                aria-valuemax="100" style="width: 1%"></div>
                            </div>
                          </div>
                          <div class="col-7  fw-bold">
                            <i class="fa fa-star text-warning"></i><i class="fa fa-star"></i><i
                              class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>
                            1%
                          </div>
                        </div>

                      </div>
                      <div class="col-9">

                        <div class=" card mb-2">
                          <div class="card-body">
                            <h5 class="card-title"><img
                                src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=400&d=mm&r=g"
                                alt="Avatar" class="rounded-circle" style="width: 70px;"> Nguyễn Thành T.</h5>
                            <span class="text-muted">1 tháng trước</span>
                            <p class="card-text">
                              Cách trình bày nội dung dễ hiểu và dễ tiếp cận. Giọng điệu giảng viên rõ ràng, lôi cuốn
                              người nghe.
                            </p>
                            <div class="">
                              <button type="button" class="btn btn-sm btn-outline-secondary">Report</button>
                              <i class="fa-solid fa-thumbs-up  btn btn-outline-secondary rounded"></i> <i
                                class="fa-solid fa-thumbs-down  btn btn-outline-secondary rounded"></i>
                            </div>
                          </div>
                        </div>

                        <div class=" card mb-2">
                          <div class="card-body">
                            <h5 class="card-title"><img
                                src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=400&d=mm&r=g"
                                alt="Avatar" class="rounded-circle" style="width: 70px;"> Nguyễn Thành T.</h5>
                            <span class="text-muted">1 tháng trước</span>
                            <p class="card-text">
                              Cách trình bày nội dung dễ hiểu và dễ tiếp cận. Giọng điệu giảng viên rõ ràng, lôi cuốn
                              người nghe.
                            </p>
                            <div class="">
                              <button type="button" class="btn btn-sm btn-outline-secondary">Report</button>
                              <i class="fa-solid fa-thumbs-up  btn btn-outline-secondary rounded"></i> <i
                                class="fa-solid fa-thumbs-down  btn btn-outline-secondary rounded"></i>
                            </div>
                          </div>
                        </div>
                        <div class=" card mb-2">
                          <div class="card-body">
                            <h5 class="card-title"><img
                                src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=400&d=mm&r=g"
                                alt="Avatar" class="rounded-circle" style="width: 70px;"> Nguyễn Thành T.</h5>
                            <span class="text-muted">1 tháng trước</span>
                            <p class="card-text">
                              Cách trình bày nội dung dễ hiểu và dễ tiếp cận. Giọng điệu giảng viên rõ ràng, lôi cuốn
                              người nghe.
                            </p>
                            <div class="">
                              <button type="button" class="btn btn-sm btn-outline-secondary">Report</button>
                              <i class="fa-solid fa-thumbs-up  btn btn-outline-secondary rounded"></i> <i
                                class="fa-solid fa-thumbs-down  btn btn-outline-secondary rounded"></i>
                            </div>
                          </div>
                        </div>
                        <div class=" card mb-2">
                          <div class="card-body">
                            <h5 class="card-title"><img
                                src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=400&d=mm&r=g"
                                alt="Avatar" class="rounded-circle" style="width: 70px;"> Nguyễn Thành T.</h5>
                            <span class="text-muted">1 tháng trước</span>
                            <p class="card-text">
                              Cách trình bày nội dung dễ hiểu và dễ tiếp cận. Giọng điệu giảng viên rõ ràng, lôi cuốn
                              người nghe.
                            </p>
                            <div class="">
                              <button type="button" class="btn btn-sm btn-outline-secondary">Report</button>
                              <i class="fa-solid fa-thumbs-up  btn btn-outline-secondary rounded"></i> <i
                                class="fa-solid fa-thumbs-down  btn btn-outline-secondary rounded"></i>
                            </div>
                          </div>
                        </div>
                        <div class=" card mb-2">
                          <div class="card-body">
                            <h5 class="card-title"><img
                                src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=400&d=mm&r=g"
                                alt="Avatar" class="rounded-circle" style="width: 70px;"> Nguyễn Thành T.</h5>
                            <span class="text-muted">1 tháng trước</span>
                            <p class="card-text">
                              Cách trình bày nội dung dễ hiểu và dễ tiếp cận. Giọng điệu giảng viên rõ ràng, lôi cuốn
                              người nghe.
                            </p>
                            <div class="">
                              <button type="button" class="btn btn-sm btn-outline-secondary">Report</button>
                              <i class="fa-solid fa-thumbs-up  btn btn-outline-secondary rounded"></i> <i
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
        <div class="col-md-4">
          <div class="card shadow">
            <div class="hovereffect" :class="{ 'promote-border': currentCourse.advertise === 'PROMOTE' }">
              <img class="card-img-top img-responsive"  :src=currentCourse.media.originUrl alt="">
               <!-- Thêm lớp phủ chữ "PROMOTE" nếu khóa học được quảng bá -->
  <span v-if="currentCourse.advertise === 'PROMOTE'" class="promote-overlay">PROMOTE</span>
              <div class="overlay" v-if="currentCourse.isEnrolled === false">
                <h2 class="rounded bg-primary btn" @click="addCourseToCart(currentCourse)"> <i class="fa-solid fa-play ms-1"> Enroll </i></h2>
                <p class="icon-links">
                  <a href="#" class="">
                    <i class="fa-solid fa-cart-shopping"></i>
                  </a>
                  <a href="#">
                    <i class="fa-solid fa-heart text-danger"></i>
                  </a>
                </p>
              </div>
            </div>
            <!-- <img src="https://img-b.udemycdn.com/course/480x270/2420912_0623.jpg" class="card-img-top" alt="..."> -->
            <div class="card-body">
              <h5 class="card-title fw-bold">Course content</h5>
              <ul class="list-unstyled">
                <div v-html="currentCourse.courseContent"></div>
              </ul>
              <h5 class="card-title fw-bold">Details</h5>
              <ul class="list-unstyled">
                <div v-html="currentCourse.detail"></div>
              </ul>
            </div>
          </div>
          <div class="mt-5 d-flex justify-content-center" v-if="currentCourse.isEnrolled === true">
            <el-progress type="circle" :percentage="77.5"></el-progress>
          </div>


        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'DetailCourse',
  data() {
    return {
      courseSection: new Object(),
      courseId: this.$route.query.courseId,
      rate: null,
      mostLikedComment: null,
      commentContent: null,
      courseComments: null,
      totalRate:0,
      clickCount: 0,
      debounceTime: 5000, // Khoảng thời gian giữa các lần click, tính bằng mili giây
      maxClicksAllowed: 1, // Số lần click tối đa cho phép trong khoảng thời gian này
      lastClickTime: 0
    }
  },
  components: {

  },
  computed: {

    currentCourse() {
      return this.$store.state.currentTagetCourse;
    },
    cartItems() {
      return this.$store.state.cart;
    }

  },
  async mounted() {

    this.$store.dispatch('fetchCourse', this.courseId)

    const listCourseComment = await axios.get("api/v1/publish/list-course-comment", {
      params: { request: this.courseId },

    });

    this.courseComments = listCourseComment.data
    this.totalRate 

    // tinh rate cua khoa hoc
    let sumRate = 0;
    for (let i = 0; i < this.courseComments.length; i++) {
      sumRate += this.courseComments[i].rate;
    }

    this.totalRate = sumRate / this.courseComments.length;
    // lay ra comment duoc nhieu like nhat
    let mostlikeCommentRes = await axios.get("api/v1/publish/list-most-like-comment",{
      params: { request: this.courseId },
    });

    this.mostLikedComment = mostlikeCommentRes.data;
  },

  methods: {
    addCourseToCart(item) {
      item.type = "COURSE";

      let itemExists = this.cartItems.some(cartItem => cartItem.id === item.id);
      if (itemExists) {
        // Nếu mục đã tồn tại trong giỏ hàng, hiển thị thông báo và không thực hiện thêm vào giỏ hàng
        this.$swal.fire({
          icon: 'error',
          title: 'Oh no',
          text: 'This item already in cart!',
          footer: '<a href="">Go to cart?</a>'
        });
      } else {
        // Nếu mục chưa tồn tại trong giỏ hàng, thêm vào giỏ hàng và lưu lại vào localStorage
        this.cartItems.push(item);
        // localStorage.setItem('cartItems', JSON.stringify(cartItems));
        this.$store.dispatch('changeCartItems', this.cartItems)
        // Hiển thị thông báo hoặc thực hiện các hành động khác sau khi thêm vào giỏ hàng
        this.$swal.fire({
          icon: 'success',
          title: 'Yes',
          text: 'Add to cart success!',
          footer: '<a href="">Go to cart?</a>'
        });
      }
    },
    async saveComment() {
      const payload = {
        courseId: this.courseId,
        content: this.commentContent,
        rate: this.rate,
        totalRate: 0
      }
      try {
        await axios.post("api/v1/create-course-comment", payload, {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        });
        this.$notify({
          title: 'Success',
          message: 'Your comment saved',
          type: 'success'
        })
        // If the request is successful, clear the commentContent
        this.commentContent = null;
      } catch (error) {
        // Handle errors here
        this.$notify.error({
          title: 'Failed',
          message: error.response.data.message
        })
      }
    },

    async likeComment(id) {
      const currentTime = Date.now();

      // Nếu đã quá debounceTime kể từ lần click cuối cùng, hoặc nếu đã đủ debounceTime nhưng chưa đạt đến số lần click tối đa
      if (currentTime - this.lastClickTime >= this.debounceTime) {
        this.clickCount = 0; // Đặt lại số lần click nếu đã quá debounceTime kể từ lần click cuối cùng
      }

      this.clickCount++;

      // Nếu đã quá 1 giây kể từ lần click cuối cùng, hoặc nếu đã đủ 1 giây nhưng chưa đạt đến số lần click tối đa
      if (currentTime - this.lastClickTime >= this.debounceTime) {
        this.clickCount = 0; // Đặt lại số lần click nếu đã quá 1 giây kể từ lần click cuối cùng
      }
      if (this.clickCount > this.maxClicksAllowed) {
        this.$notify.error({
          title: 'Failed',
          message: 'You clicked too fast'
        })
        return;
      }


      try {

        await axios.get("api/v1/like-course-comment", {
          params: { request: id },
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        });
      } catch (error) {
        // Handle errors here
        this.$notify.error({
          title: 'Failed',
          message: error.response.data.message
        })
      }
    },

    openChat(leactureName){
      this.$router.push({ path: "/LearnerChatPage", query: { leactureName: leactureName} })
    },

    formatCurrency(amount) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    },

    goToLesson(lessonId) {
      this.$router.push({ path: "/LessonPage", query: { lessonId: lessonId ,
        courseId: this.courseId, 
        enrolled:  this.currentCourse.isEnrolled,
        org: this.$route.query.org } })
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
  },
  props: {
    msg: String
  },

}
</script>
<style scoped>
.hovereffect {
  width: 100%;
  height: 100%;
  float: left;
  overflow: hidden;
  position: relative;
  text-align: center;
  cursor: default;
}

.hovereffect .overlay {
  width: 100%;
  position: absolute;
  overflow: hidden;
  left: 0;
  top: auto;
  bottom: 0;
  padding: 1em;
  height: 4.75em;
  background: #79FAC4;
  color: #3c4a50;
  -webkit-transition: -webkit-transform 0.35s;
  transition: transform 0.35s;
  -webkit-transform: translate3d(0, 100%, 0);
  transform: translate3d(0, 100%, 0);
  visibility: hidden;

}

.hovereffect img {
  display: block;
  position: relative;
  -webkit-transition: -webkit-transform 0.35s;
  transition: transform 0.35s;
}

.hovereffect:hover img {
  -webkit-transform: translate3d(0, -10%, 0);
  transform: translate3d(0, -10%, 0);
}

.hovereffect h2 {

  color: #fff;
  text-align: center;
  position: relative;
  font-size: 12px;
  padding: 10px;

  float: left;
  margin: 5px;
  display: inline-block;
  cursor: pointer;
}

.hovereffect a.info {
  display: inline-block;
  text-decoration: none;
  padding: 7px 14px;
  text-transform: uppercase;
  color: #fff;
  border: 1px solid #fff;
  margin: 50px 0 0 0;
  background-color: transparent;
}

.hovereffect a.info:hover {
  box-shadow: 0 0 5px #fff;
}


.hovereffect p.icon-links a {
  float: right;
  color: #3c4a50;
  font-size: 1.4em;
}

.hovereffect:hover p.icon-links a:hover,
.hovereffect:hover p.icon-links a:focus {
  color: #252d31;
}

.hovereffect h2,
.hovereffect p.icon-links a {
  -webkit-transition: -webkit-transform 0.35s;
  transition: transform 0.35s;
  -webkit-transform: translate3d(0, 200%, 0);
  transform: translate3d(0, 200%, 0);
  visibility: visible;
}

.hovereffect p.icon-links a span:before {
  display: inline-block;
  padding: 8px 10px;
  speak: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}


.hovereffect:hover .overlay,
.hovereffect:hover h2,
.hovereffect:hover p.icon-links a {
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

.hovereffect:hover h2 {
  -webkit-transition-delay: 0.05s;
  transition-delay: 0.05s;
}

.hovereffect:hover p.icon-links a:nth-child(3) {
  -webkit-transition-delay: 0.1s;
  transition-delay: 0.1s;
}

.hovereffect:hover p.icon-links a:nth-child(2) {
  -webkit-transition-delay: 0.15s;
  transition-delay: 0.15s;
}

.hovereffect:hover p.icon-links a:first-child {
  -webkit-transition-delay: 0.2s;
  transition-delay: 0.2s;
}
/* Lớp CSS cho viền promote */
.promote-border {
  border: 2px solid #ff9900; /* Bạn có thể thay đổi màu sắc và độ rộng của viền theo ý muốn */
  border-radius: 10px; /* Nếu bạn muốn các góc của viền được bo tròn */
}

/* Lớp CSS cho lớp phủ chữ "PROMOTE" */
.promote-overlay {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: rgba(255, 153, 0, 0.8); /* Màu nền với độ trong suốt */
  color: white; /* Màu chữ */
  padding: 5px 10px; /* Khoảng cách giữa chữ và khung */
  border-radius: 5px; /* Bo tròn các góc */
  font-size: 12px; /* Kích thước chữ */
  font-weight: bold; /* Chữ đậm */
  z-index: 10; /* Đảm bảo lớp phủ nằm trên các phần tử khác */
}
</style>