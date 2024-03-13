<template>
    <div class="container-fluid ">
 
        <div class="card" v-if="statusCode === '00'">
            <h2 class="card-header fw-bold">
                Payment success
            </h2>
            <div class="card-body">
                <p class="card-text">Thank you for your successful payment!</p>
                <p class="card-text">Amount: {{ totalMoney }}</p>
                <p class="card-text">Bank: {{ bank }}</p>
                <p class="card-text">invoice code: {{ invoiceCode }}</p>
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
            statusCode: this.$route.query.vnp_ResponseCode
        }
    },
    components: {

    },
    computed: {
      
    },
    mounted() {
        if(this.statusCode === '00'){
            let transactionObj = JSON.parse(localStorage.getItem('transactionObj'))
            transactionObj.transCode =  this.invoiceCode; 
            this.$store.dispatch('submitPaymentSuccess', transactionObj);
        }
    
    },
    methods: {
   
    },
}
</script>