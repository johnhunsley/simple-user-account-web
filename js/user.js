//import VuePaginator from 'vuejs-paginator';
new Vue({
    el:'#pager',
    data:{
        showModal: false,
        items: [],
        totalPages: 0,
        totalItems: 0,
        nextPageNumber: 1,
        hasNext:true,
        previousPageNumber: 1,
        hasPrevious: false,
        filter:"",
        username: 'johnhunsley',
        password: 'password',
        token: ''
    },
    mounted: function() {
        this.searchItems(10,1);
    },
    methods:{
        addUser: function() {

        },

        getItems: function(pageSize, pageNumber) {
            this.$http.get('http://localhost:8080/user/page/'+pageSize+"/"+pageNumber)
                .then(function(data){
                    this.calculatePage(data, pageNumber);
                });
        },

        authenticate: function(username, password) {
            this.$http.post('http://localhost:8080/auth/login',
                {'username': username, 'password': password},
                {headers: {'X-Requested-With':'XMLHttpRequest', 'Content-Type':'application/json', 'Cache-Control':'no-cache'}})
                .then(function(data) {
                    //if good set the token on the auth object
                    this.token = data.body.token;
                    console.log(this.token);
                });
        },

        searchItems: function(pageSize, pageNumber) {
            if(this.token.length < 1) {
                this.authenticate(this.username, this.password);
            }
            this.$http.get('http://localhost:8080/user/search/'+pageSize+"/"+pageNumber+"?query="+this.filter,
                {headers:{'Cache-Control':'no-cache', 'X-Authorization':'Bearer '+this.token}})
                .then(function(data){
                    this.calculatePage(data, pageNumber);
                });
        },

        calculatePage: function(data, pageNumber) {
            this.items = data.body.pagedItems;
            this.totalItems = data.body.totalItems;
            this.totalPages = data.body.totalPages;

            if(pageNumber < this.totalPages) {
                this.nextPageNumber = pageNumber +1;
                this.hasNext = true;
            } else {
                this.hasNext = false;
            }

            if(pageNumber > 1) {
                this.previousPageNumber = pageNumber -1;
                this.hasPrevious = true;
            } else {
                this.hasPrevious = false;
            }
        }
    }
});
