<template>
  <div>
    <iframe v-if="pdfUrl" :src="pdfUrl" width="100%" height="1000px" :title="pdfTitle"></iframe>
  </div>
</template>

<script>

import axios from "axios";
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';
export default {
  data() {
    return {
      studentName: this.$route.query.userName,
      courseName: this.$route.query.courseName,
      pdfUrl: null,
      pdfTitle: null,
      courseId: this.$route.query.courseId,
      userId: this.$route.query.userId,
    }
  },
  computed: {

  },
  components: {

  },
  name: 'CertificatePage',
  props: {
    msg: String
  },
  async mounted() {
    this.addUserNameToPDF(this.studentName, this.courseName)
  },
  methods: {
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

    async addUserNameToPDF(userName, courseName) {
      // Nạp file PDF sẵn có từ thư mục public
      const existingPdfBytes = await fetch('/certificate.pdf').then(res => res.arrayBuffer());

      // Load the existing PDF
      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      // Get the first page of the document
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
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
        saveAs(signedBlob, fileName);

      } catch (error) {
        this.$message.error("Error signing PDF:", error);
        // Handle errors appropriately (e.g., display error message to user)
      }
    },
  },

}
</script>
<style scoped>
form {
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 0 auto;
}

label {
  margin-top: 10px;
}

button {
  margin-top: 20px;
}

iframe {
  margin-top: 20px;
}
</style>