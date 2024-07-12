<template>
  <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="item in books" :key="item.id">
      <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <img :src=item.avatar.originUrl class="img-fluid rounded-start" alt="..." style="height: 250px;">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{{ item.title }}</h5>
              <p class="card-text">Author: {{ item.author.name }}</p>
              <p class="card-text"><small class="text-muted">{{ formattedDate(item.updatedAt) }}</small></p>
              <button class="btn btn-outline-primary me-1" @click="viewBook(item.id)">View</button>
              <button class="btn btn-primary" @click="addBookToCart(item)"><i class="fa-solid fa-cart-shopping"></i></button>
            </div>
          </div>
        </div>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import { formatDistanceToNow } from 'date-fns';
import axios from "axios";
export default {
  name: 'BookCarousel',
  data() {
    return {
      books: [],
    }
  },
  async mounted() {
    const response = await axios.get("api/v1/publish/get-books", {
      params: { page: 0, authorId: 0, categoryId: 0, startPrice: 0, endPrice: 0 },
    });
    this.books = response.data;
  },
  computed: {
    cartItems() {
      return this.$store.state.cart;
    }
  },
  methods: {
    viewBook(id){
      this.$router.push({ path: "/ViewBook", query: { bookId: id } });
    },
    addBookToCart(item) {
      item.type = "BOOK";

      // let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      // let itemExists = cartItems.some(cartItem => cartItem.id === item.id);
      let itemExists = this.cartItems.some(cartItem => cartItem.id === item.id && cartItem.type === item.type);
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
    formattedDate(inputDate) {
      // Chuyển đổi chuỗi ngày giờ sang đối tượng Date
      const date = new Date(inputDate);
      // Tính khoảng cách thời gian từ ngày giờ đó đến hiện tại
      const distance = formatDistanceToNow(date, { addSuffix: true });
      // Trả về chuỗi đã định dạng
      return `publish at ${distance}`;
    },
  },
}

</script>
<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>