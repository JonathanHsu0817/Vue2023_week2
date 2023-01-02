import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.prod.min.js";

const url = `https://vue3-course-api.hexschool.io/`;
const api_path = `blacknwhiterabbit`;

const app = {
    data(){
        return {
            user:{
                username:``,
                password:``
            },
            text:`你好呀`
        }
    },
    methods:{
        getData(){
            axios.get(`${url}v2/api/${api_path}/products/all`)
            .then(res=>{
                const data = res.data;
                console.log(data);
            })
        },
        login(){
            axios.post(`${url}v2/admin/signin`,this.user)
            .then(res=>{
                console.log(res);
                const { expired,token } = res.data
                document.cookie = `hexschool=${token}; expires=${expired}`;
                // localStorage.setItem("token",token);//localStorage
                window.location.replace("./products.html")
            })
            .catch(err=>{
                console.log(err);
            })
        },
        getToken(){
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexschool\s*\=\s*([^;]*).*$)|^.*$/, "$1")
            axios.defaults.headers.common['Authorization'] = token;
            // localStorage.getItem(token);//localStorage
        },
        checkLogin(){
            this.getToken();
            axios.post(`${url}v2/api/user/check`)
            .then(res=>{
                console.log(res);
            })
            .catch(err=>{
                console.log(err);
            })
        },
        getProductsData(){
            this.getToken();
            axios.get(`${url}v2/api/${api_path}/admin/products/all`)
            .then(res=>{
                console.log(res.data.products);
            })
            .catch(err=>{
                console.log(err);
            })
        }
    },
    mounted(){
        // this.getData();
    }
}

createApp(app)
    .mount("#app");