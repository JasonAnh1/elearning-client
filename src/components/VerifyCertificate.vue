<template>
    <div class="container mt-5">

        <h1 class="mb-4 fw-bold text-primary" style="font-size: 30px;">VERIFY CERTIFICATE</h1>
        <div class="mb-3">
            <input type="file" class="form-control" @change="handleFileUpload" accept=".pdf" />
        </div>
        <div v-if="selectedFile" class="mb-3">
            <p>File selected: {{ selectedFile.name }}
                <span v-if="verifyStatus === 'VERIFY'" class="text-success fw-bold" style="font-size: 18;"> This
                    certificate is verify</span>
                <span v-if="verifyStatus === 'UNVERIFY'" class="text-danger" style="font-size: 18;"> This certificate is
                    unverify</span>
            </p>
        </div>
        <button class="btn btn-primary mb-3" @click="submitFile" :disabled="!selectedFile">Submit</button>
        <h1 class="mb-4 fw-bold text-primary" style="font-size: 30px;">Find certificate</h1>
        <div class="mb-3">
            <input type="text" class="form-control" v-model="certCode">
        </div>
        <button class="btn btn-primary" @click="findCert">Find certificate</button>
        <iframe v-if="pdfUrl" :src="pdfUrl" width="100%" height="800" :title="pdfTitle"></iframe>
    </div>
</template>

<script>
import axios from "axios";
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
export default {
    data() {
        return {
            selectedFile: null,
            verifyStatus: null,
            certCode: null,
            pdfUrl: null,
            pdfTitle: null,
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
        async findCert() {
            if (this.certCode !== null) {
                const response = await axios.get("api/v1/publish/check-cert", {
                    params: { code: this.certCode },
                    headers: {
                        Authorization: localStorage.getItem("accessToken"),
                    },
                });
                if (response.data.body === null || response.data.body === undefined) {
                    this.$message.error('Oops, Cannot find certificate.');
                    this.verifyStatus = "UNVERIFY"
                } else {
                    this.generatePdf(response.data.body.user.name, response.data.body.course.title, this.certCode);
                }
            } else {
                this.$message.error('Oops, Please input certificate code.');
                this.verifyStatus = "UNVERIFY"
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
        },
        async generatePdf(userName, courseName, certCode) {
            // Nạp file PDF sẵn có từ thư mục public
            const existingPdfBytes = await fetch('/certificate.pdf').then(res => res.arrayBuffer());

            // Load the existing PDF
            const pdfDoc = await PDFDocument.load(existingPdfBytes);

            // Get the first page of the document
            const pages = pdfDoc.getPages();
            const firstPage = pages[0];
            const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
            const timesRomanBoldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
            const textWidth = timesRomanFont.widthOfTextAtSize(userName, 40);
            const pageWidth = firstPage.getWidth();
            const x = (pageWidth - textWidth) / 2;
            // Draw user name on the first page
            firstPage.drawText(`${userName}`, {
                x: x,
                y: 387,
                size: 40,
                font: timesRomanFont,
                color: rgb(0, 0, 0),
            });


            firstPage.drawText(`Certificate code: ${certCode}`, {
                x: 370,
                y: 100,
                size: 10,
                font: timesRomanBoldFont,
                color: rgb(0, 0, 0),
            });



            const lines = this.splitTextToLines(courseName, 14, 300, timesRomanFont);
            let y = 280;

            // Draw each line of the course name
            for (const line of lines) {
                const lineWidth = timesRomanFont.widthOfTextAtSize(line, 14);
                const lineX = (pageWidth - lineWidth) / 2;
                firstPage.drawText(line, {
                    x: lineX,
                    y: y,
                    size: 14,
                    font: timesRomanFont,
                    color: rgb(0, 0, 0),
                });
                y -= 28; // Adjust this value based on line height
            }



            try {
                // Save the PDF document and create a Blob
                const pdfBytes = await pdfDoc.save();
                // Create Binary Large Objects
                const blob = new Blob([pdfBytes], { type: 'application/pdf' });
                // Create file name
                const fileName = `${userName}-${courseName}-cert.pdf`
                // Create a FormData object with the Blob and filename
                const formData = new FormData();
                formData.append('pdf', blob, fileName);

                // Send an API POST request with the FormData
                const responsePdf = await axios.post(
                    "api/sign-pdf",
                    formData,
                    {
                        headers: {
                            Authorization: localStorage.getItem("accessToken"),
                            "Content-Type": "multipart/form-data",
                        },
                        responseType: 'blob'
                    }
                );

                // Validate response status code and data structure
                if (responsePdf.status !== 200) {
                    this.$message.error(`Error signing PDF: ${responsePdf.statusText}`);
                }

                const signedBlob = new Blob([responsePdf.data], { type: 'application/pdf' });
                const url = window.URL.createObjectURL(signedBlob);
                this.pdfUrl = url;
                this.pdfTitle = fileName


            } catch (error) {
                this.$message.error("Error signing PDF:", error);
                // Handle errors appropriately (e.g., display error message to user)
            }
        },
        splitTextToLines(text, fontSize, maxWidth, font) {
            const words = text.split(' ');
            const lines = [];
            let currentLine = '';

            for (const word of words) {
                const testLine = currentLine ? `${currentLine} ${word}` : word;
                const testLineWidth = font.widthOfTextAtSize(testLine, fontSize);
                if (testLineWidth > maxWidth && currentLine) {
                    lines.push(currentLine);
                    currentLine = word;
                } else {
                    currentLine = testLine;
                }
            }

            if (currentLine) {
                lines.push(currentLine);
            }

            return lines;
        },
    }
};
</script>

<style scoped>
/* Add your styles here */
</style>