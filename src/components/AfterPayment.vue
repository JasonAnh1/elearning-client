<template>
    <div class="container-fluid ">

        <div class="card" v-if="statusCode === '00'">
            <el-steps :space="200" :active="3" finish-status="success">
                <el-step title="Done"></el-step>
                <el-step title="Done"></el-step>
                <el-step title="Done"></el-step>
            </el-steps>
            <h2 class="card-header fw-bold">
                Payment success
            </h2>
            <div class="card-body">
                <p class="card-text">Thank you for your successful payment!</p>
                <p class="card-text">Amount: {{ totalMoney }}</p>
                <p class="card-text">Bank: {{ bank }}</p>
                <p class="card-text">invoice code: {{ invoiceCode }}</p>
            </div>
            <div class="card-footer" v-if="type === 'verify'" >
                <button class="btn btn-primary" @click="goStudio()">Go back Studio</button>
            </div>

        </div>
        <div class="card" v-else>
            <h2 class="card-header fw-bold">
                Payment failed
            </h2>
            <div class="card-body">
                <p class="card-text text-danger">Some thing wrong!</p>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'AfterPayment',
    data() {
        return {
            totalMoney: this.$route.query.vnp_Amount,
            bank: this.$route.query.vnp_BankCode,
            invoiceCode: this.$route.query.vnp_TxnRef,
            statusCode: this.$route.query.vnp_ResponseCode,
            type: JSON.parse(localStorage.getItem('transactionObj')).type
        }
    },
    components: {

    },
    computed: {

    },
    mounted() {
        if (this.statusCode === '00') {
            let transactionObj = JSON.parse(localStorage.getItem('transactionObj'))
            transactionObj.transCode = this.invoiceCode;
            if (transactionObj.type === 'verify') {
                this.$store.dispatch('submitVerifyPaymentSuccess', transactionObj);
            }else if(transactionObj.type === 'plan'){
                this.$store.dispatch('submitPlanPaymentSuccess', transactionObj);
            } 
             else {
                this.$store.dispatch('submitPaymentSuccess', transactionObj);
            }


        }

    },
    methods: {
        goStudio(){
            this.$router
                 .push({ path: "/LectureStudio"})
        }
    },
}
</script>