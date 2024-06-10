<template>
    <div class="container mt-5">

        <h1 class="mb-4 fw-bold text-primary" style="font-size: 30px;">VERIFY CERTIFICATE</h1>
        <div class="mb-3">
            <input type="file" class="form-control" @change="handleFileUpload" accept=".pdf" />
        </div>
        <div v-if="selectedFile" class="mb-3">
            <p>File selected: {{ selectedFile.name }} 
                <span v-if="verifyStatus === 'VERIFY'" class="text-success fw-bold" style="font-size: 18;"> This certificate is verify</span>
                <span v-if="verifyStatus === 'UNVERIFY'" class="text-danger" style="font-size: 18;"> This certificate is unverify</span>
            </p>
            
            <iframe v-if="pdfUrl" :src="pdfUrl" width="100%" height="800"></iframe>
        </div>
        <button class="btn btn-primary" @click="submitFile" :disabled="!selectedFile">Submit</button>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            selectedFile: null,
            verifyStatus: null
        };
    },
    name: 'VerifyCertificate',
    props: {
        msg: String
    },
    methods: {
        handleFileUpload(event) {
            this.selectedFile = event.target.files[0];
            if (this.selectedFile) {
                this.pdfUrl = URL.createObjectURL(this.selectedFile);
            }
        },
        async submitFile() {
            if (this.selectedFile) {
                let formData = new FormData();
                formData.append("pdf", this.selectedFile);

                try {
                    const response = await axios.post("api/verify-signature", formData, {
                        headers: {
                            Authorization: localStorage.getItem("accessToken"),
                            "Content-Type": "multipart/form-data",
                        }
                    });
                    if (response.data === true) {
                        this.$message({
                            message: 'Congrats, this certificate is verify.',
                            type: 'success'
                        });
                        this.verifyStatus = "VERIFY"
                    } else {

                        this.$message.error('Oops, this certificate is unverify.');
                        this.verifyStatus = "UNVERIFY"
                    }

                } catch (error) {
                    this.$message({
                        message: 'Warning,' + error,
                        type: 'warning'
                    });
                    console.error("There was an error!", error);
                }
            } else {
                alert("Please select a file first");
            }
        }
    }
};
</script>

<style scoped>
/* Add your styles here */
</style>