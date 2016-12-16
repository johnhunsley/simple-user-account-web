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
        hasPrevious: false
    },
    mounted: function() {
        this.getItems(10,1);
    },
    methods:{
        getItems: function(pageSize, pageNumber) {
            this.$http.get('http://localhost:8080/user/page/'+pageSize+"/"+pageNumber)
                .then(function(data) {
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

                });
        }
    }
});