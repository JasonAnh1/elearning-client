<template>
	<section id="pricing" class="pricing-content section-padding">
		<div class="container">
			<div class="section-title text-center">
				<h1>Pricing Plan</h1>
				<p>It is a long established fact that a reader will be distracted by the readable content of a page when
					looking at its layout.</p>
			</div>
			<div class="row text-center">
				<div class="col-lg-4 col-sm-4 col-xs-12 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.1s"
					data-wow-offset="0">
					<div class="single-pricing">
						<div class="price-head">
							<h2>Starter</h2>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
						</div>
						<h1 class="price">đ 2.500.000</h1>
						<h5>Monthly</h5>
						<ul>
							<li>5 Course</li>
							<li>10 account per organization</li>
						</ul>
						<a data-bs-toggle="modal" data-bs-target="#checkOutModal" @click="plan = 'STARTER'">Get
							start</a>
						<!-- Modal -->

					</div>
				</div><!--- END COL -->
				<div class="modal fade" id="checkOutModal" tabindex="-1" aria-labelledby="checkOutModal"
					aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="checkOutModal">{{ plan }} plan</h5>
								<button type="button" class="btn-close" data-bs-dismiss="modal"
									aria-label="Close"></button>
							</div>
							<div class="modal-body">
								<div class="starter-des" v-if="plan === 'STARTER'">
									<p>You are about to subscribe to the <strong><em>Basic Plan</em></strong>. This plan
										provides:</p>
									<ul>
										<li>Access to <strong><em>5 courses</em></strong></li>
										<li>The ability to add up to <strong><em>10 members per
													organization</em></strong></li>
									</ul>
									<p>Please review your selection before proceeding with the payment. If you have any
										questions or need assistance, <a href="contact.html"><em>contact our support
												team</em></a>.</p>
									<p>Once your payment is completed, you will have immediate access to the plan's
										features and benefits.</p>
								</div>

								<div class="popular-des" v-else-if="plan === 'POPULAR'">
									<p>You are about to subscribe to the <strong><em>POPULAR Plan</em></strong>. This
										plan provides:</p>
									<ul>
										<li>Access to <strong><em>10 courses</em></strong></li>
										<li>The ability to add up to <strong><em>20 members per
													organization</em></strong></li>
									</ul>
									<p>Please review your selection before proceeding with the payment. If you have any
										questions or need assistance, <a href="contact.html"><em>contact our support
												team</em></a>.</p>
									<p>Once your payment is completed, you will have immediate access to the plan's
										features and benefits.</p>

								</div>
								<div class="advance-des" v-else>
									<p>You are about to subscribe to the <strong><em>ADVANCE Plan</em></strong>. This
										plan provides:</p>
									<ul>
										<li>Access to <strong><em>unlimited courses</em></strong></li>
										<li>The ability to add up to <strong><em>100 members per
													organization</em></strong></li>
										<li>Dedicated <strong><em>24/7 support</em></strong></li>
									</ul>
									<p>Please review your selection before proceeding with the payment. If you have any
										questions or need assistance, <a href="contact.html"><em>contact our support
												team</em></a>.</p>
									<p>Once your payment is completed, you will have immediate access to the plan's
										features and benefits.</p>

								</div>
								<div class="fw-bold">Chose bank:</div>
								<select id="bankSelect" v-model="bankCode" class="form-select  mb-2 form-control"
									aria-label="Default select example">
									<option value="NCB" class="text-primary" selected>NATIONAL CITIZEN BANK (NCB)
									</option>
									<option value="VISA" class="text-secondary">VISA CREDIT CARD</option>
									<option value="MasterCard" class="text-success">MASTERCARD</option>
									<option value="JCB" class="text-success">Japan Credit Bureau</option>
									<!-- Thêm các option khác tùy theo nhu cầu -->
								</select>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
								<button type="button" class="btn btn-primary" @click="planPayment()">Save changes</button>
							</div>
						</div>
					</div>
				</div>
				<div class="col-lg-4 col-sm-4 col-xs-12 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.2s"
					data-wow-offset="0">
					<div class="single-pricing">
						<div class="price-head">
							<h2>popular</h2>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
						</div>
						<h1 class="price">đ 4.000.000</h1>
						<h5>Monthly</h5>
						<ul>
							<li>10 Course</li>
							<li>20 account per organization</li>
						</ul>
						<a data-bs-toggle="modal" data-bs-target="#checkOutModal" @click="plan = 'POPULAR'">Get
							start</a>
					</div>
				</div><!--- END COL -->
				<div class="col-lg-4 col-sm-4 col-xs-12 wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.3s"
					data-wow-offset="0">
					<div class="single-pricing single-pricing-white">
						<div class="price-head">
							<h2>Advance</h2>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
						</div>
						<span class="price-label">Best</span>
						<h1 class="price mt-3">đ 10.000.000</h1>
						<h5>Monthly</h5>
						<ul>
							<li>Unlimited course</li>
							<li>100 account per organization</li>
							<li>Longterm support</li>
						</ul>
						<a data-bs-toggle="modal" data-bs-target="#checkOutModal" @click="plan = 'ADVANCE'">Get
							start</a>
					</div>
				</div><!--- END COL -->
			</div><!--- END ROW -->
		</div><!--- END CONTAINER -->
	</section>
</template>

<script>

export default {
	name: 'PricingTable',
	props: {
		msg: String
	},
	data() {
		return {
			plan:'',
			bankCode: 'NCB',
		}
	},

	computed: {

	},
	mounted() {


	},
	methods: {
		planPayment() {
			let cost = 0
			if (this.plan === 'STARTER'){
				cost = 2500000
			}else if(this.plan === 'POPULAR'){
				cost = 4000000
			}else {
				cost = 10000000
			}
				let payload = {
					bankCode: this.bankCode,
					total: cost
				}
			let transactionObj = new Object();
			transactionObj.type = 'plan'
			transactionObj.amount = cost;
			transactionObj.plan = this.plan;
			localStorage.setItem('transactionObj', JSON.stringify(transactionObj));
			this.$store.dispatch('goPaidPage', payload);
		}
	}
}
</script>
<style scoped>
body {
	margin-top: 20px;
}

.pricing-content {}

.single-pricing {
	background: #fff;
	padding: 40px 20px;
	border-radius: 5px;
	position: relative;
	z-index: 2;
	border: 1px solid #eee;
	box-shadow: 0 10px 40px -10px rgba(0, 64, 128, .09);
	transition: 0.3s;
}

@media only screen and (max-width:480px) {
	.single-pricing {
		margin-bottom: 30px;
	}
}

.single-pricing:hover {
	box-shadow: 0px 60px 60px rgba(0, 0, 0, 0.1);
	z-index: 100;
	transform: translate(0, -10px);
}

.price-label {
	color: #fff;
	background: #ffaa17;
	font-size: 16px;
	width: 100px;
	margin-bottom: 15px;
	display: block;
	-webkit-clip-path: polygon(100% 0%, 90% 50%, 100% 100%, 0% 100%, 0 50%, 0% 0%);
	clip-path: polygon(100% 0%, 90% 50%, 100% 100%, 0% 100%, 0 50%, 0% 0%);
	margin-left: -20px;
	position: absolute;
}

.price-head h2 {
	font-weight: 600;
	margin-bottom: 0px;
	text-transform: capitalize;
	font-size: 26px;
}

.price-head span {
	display: inline-block;
	background: #ffaa17;
	width: 6px;
	height: 6px;
	border-radius: 30px;
	margin-bottom: 20px;
	margin-top: 15px;
}

.price {
	font-weight: 500;
	font-size: 50px;
	margin-bottom: 0px;
}

.single-pricing {}

.single-pricing h5 {
	font-size: 14px;
	margin-bottom: 0px;
	text-transform: uppercase;
}

.single-pricing ul {
	list-style: none;
	margin-bottom: 20px;
	margin-top: 30px;
}

.single-pricing ul li {
	line-height: 35px;
}

.single-pricing a {
	background: none;
	border: 2px solid #ffaa17;
	border-radius: 5000px;
	color: #ffaa17;
	display: inline-block;
	font-size: 16px;
	overflow: hidden;
	padding: 10px 45px;
	text-transform: capitalize;
	transition: all 0.3s ease 0s;
}

.single-pricing a:hover,
.single-pricing a:focus {
	background: #ffaa17;
	color: #fff;
	border: 2px solid #ffaa17;
}

.single-pricing-white {
	background: #232434
}

.single-pricing-white ul li {
	color: #fff;
}

.single-pricing-white h2 {
	color: #fff;
}

.single-pricing-white h1 {
	color: #fff;
}

.single-pricing-white h5 {
	color: #fff;
}
</style>