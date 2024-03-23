<template>
    <div>
        <h1 class=" w-25 mt-2 ms-2 fw-bold">Profit revenue:</h1>
   
        <div class="row">
            <Bar :data="data" :options="options" class="w-50 h-50" />
            <Bar :data="dataDay" :options="options" class="w-50 h-50" />
        </div>
        <div class="row">
            <div class="col-6">
                selectedYeah
                <select class="form-select" aria-label="Default select example" v-model="selectedYear"
                    @change="fetchData">
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                </select>
            </div>
            <div class="col-6">
                selectedMonth
                <select class="form-select" aria-label="Default select example" v-model="selectedMonth"
                    @change="fetchDataByMonth">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                </select>
            </div>
        </div>
        <div class="row mt-5">
            <div class="col-md-6">
                <table class="table" >
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Reveneu</th>
                        <th scope="col">Total</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Gross profit</td>
                        <td>{{ formatCurrency(grossProfit) }}</td>

                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Net profit</td>
                        <td>{{ formatCurrency(netProfit) }}</td>

                    </tr>

                </tbody>
            </table>
            </div>
           <div class="col-md-6" style="width: 300px;">
            <Pie :data="chartData"  :options="chartOptions" v-if="loaded"/>
           </div>
         
        </div>


    </div>
</template>

<script>
import {
    Chart as ChartJS,
    Title,
    ArcElement,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js'
import { Pie } from 'vue-chartjs'
import { Bar } from 'vue-chartjs'
import axios from "axios";
ChartJS.register(CategoryScale, LinearScale, BarElement,ArcElement, Title, Tooltip, Legend)

export default {
    name: 'RevenueChart',
    components: {
        Bar,
        Pie
    },
    
    data() {
        return {
            chartData: {
                labels: ['Gross profit', 'Net profit'],
                datasets: [
                    {
                        backgroundColor: ['#41B883', '#E46651'],
                        data: [100,100]
                    }
                ]
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false
            },
            grossProfit: 0,
            netProfit: 0,
            revenueType: 'YEAR',
            selectedYear: 2024,
            selectedMonth: 1,
            data: {
                labels: [],
                datasets: []
            },
            options: {
                responsive: true
            },
            dataDay: {
                labels: [],
                datasets: []
            },
            optionsDay: {
                responsive: true
            },
            loaded: false,
        }
    },
    methods: {
        formatCurrency(amount) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
        },
        async fetchDataByMonth() {
            try {
                const response = await axios.get("api/v1/revenue/month", {
                    params: {
                        year: this.selectedYear,
                        month: this.selectedMonth, // Sử dụng năm được chọn từ dropdown
                    },
                    headers: {
                        Authorization: localStorage.getItem("accessToken"),
                    },
                });

                const labels = response.data.map(item => `days ${item.days}`);
                const data = response.data.map(item => item.totalAmount);

                // Cập nhật dữ liệu
                this.dataDay = {
                    labels: labels,
                    datasets: [{
                        label: 'Revenue',
                        backgroundColor: '#25cdd9',
                        data: data
                    }]
                };

                console.log(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        },
        async fetchData() {
            try {
                const response = await axios.get("api/v1/publish/test", {
                    params: {
                        year: this.selectedYear // Sử dụng năm được chọn từ dropdown
                    },
                    headers: {
                        Authorization: localStorage.getItem("accessToken"),
                    },
                });

                const labels = response.data.map(item => `Month ${item.months}`);
                const data = response.data.map(item => item.totalAmount);

                // Cập nhật dữ liệu
                this.data = {
                    labels: labels,
                    datasets: [{
                        label: 'Revenue',
                        backgroundColor: 'blue',
                        data: data
                    }]
                };

                console.log(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        },
        fetchGrossProfit() {
    // Gọi API để lấy dữ liệu về gross profit
    return axios.get('url_gross_profit');
  },
  fetchNetProfit() {
    // Gọi API để lấy dữ liệu về net profit
    return axios.get('url_net_profit');
  }
    },
    async mounted() {
        try {
                const response = await axios.get("api/v1/revenue/month", {
                    params: {
                        year: this.selectedYear,
                        month: this.selectedMonth, // Sử dụng năm được chọn từ dropdown
                    },
                    headers: {
                        Authorization: localStorage.getItem("accessToken"),
                    },
                });

                const labels = response.data.map(item => `days ${item.days}`);
                const data = response.data.map(item => item.totalAmount);

                // Cập nhật dữ liệu
                this.dataDay = {
                    labels: labels,
                    datasets: [{
                        label: 'Revenue',
                        backgroundColor: '#25cdd9',
                        data: data
                    }]
                };

                console.log(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        try {
            const response = await axios.get("api/v1/publish/test", {
                params: {
                    year: 2024
                },
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                },
            });// Gọi API để lấy dữ liệu
            const labels = response.data.map(item => `Month ${item.months}`);
            const data = response.data.map(item => item.totalAmount);
            this.data = {
                labels: labels,
                datasets: [{
                    label: 'Revenue',
                    backgroundColor: 'blue', // Màu nền của cột
                    data: data
                }]
            };
        } catch (error) {
            console.error('Error:', error);
        }
        try {
            
            const response = await axios.get("api/v1/revenue/grossProfit", {
                params: {
                    year: this.selectedYear
                },
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                },
            })
            const response2= await axios.get("api/v1/revenue/netProfit", {
                params: {
                    year: this.selectedYear
                },
                headers: {
                    Authorization: localStorage.getItem("accessToken"),
                },})
          
            this.grossProfit = response.data
            this.netProfit = response2.data
            this.chartData.datasets[0].data = [ response.data, response2.data];
            this.loaded = true
            console.log(   this.chartData)
        } catch (error) {
            console.error('Error:', error);
        }
    },
};
</script>