//import VuePaginator from 'vuejs-paginator';
new Vue({
    el:'#pager',
    data:{
        items: [],
        totalPages: 0,
        totalItems: 0,
        nextPageNumber: 1,
        hasNext:true,
        previousPageNumber: 1,
        hasPrevious: false,
        filter:""
    },
    mounted: function() {
        this.searchItems(10,1);
    },
    methods:{
        getItems: function(pageSize, pageNumber) {
            this.$http.get('http://localhost:8080/user/page/'+pageSize+"/"+pageNumber)
                .then(function(data){
                    this.calculatePage(data, pageNumber);
                });
        },

        searchItems: function(pageSize, pageNumber) {
            this.$http.get('http://localhost:8080/user/search/'+pageSize+"/"+pageNumber+"?query="+this.filter)
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