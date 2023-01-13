import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.prod.min.js";

const url = `https://vue3-course-api.hexschool.io/`;
const api_path = `blacknwhiterabbit`;

const app = {
    data(){
        return {
            temp:{},
            products:[],
            productsNum:``
        }
    },
    methods:{
        getToken(){
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexschool\s*\=\s*([^;]*).*$)|^.*$/, "$1")
            axios.defaults.headers.common['Authorization'] = token;
            // localStorage.getItem(token);//localStorage
        },
        checkLogin(){
            this.getToken();
            axios.post(`${url}v2/api/user/check`)
            .then(res=>{
                alert("成功登入");
            })
            .catch(err=>{
                console.log(err);
                window.location.replace("./index.html");
            })
        },
        getProductsData(){
            this.getToken();
            axios.get(`${url}v2/api/${api_path}/admin/products/all`)
            .then(res=>{
                this.products = res.data.products;
                this.productsNum = Object.keys(this.products).length;
            })
            .catch(err=>{
                console.log(err);
            })
        }
    },
    mounted(){
        this.checkLogin()
        this.getProductsData();
    }
}

createApp(app)
    .mount("#app");
