export default  {
    data() {
        return {
            paging: {
                data: {
                    currentPage: 0,
                    maxPerPage: 5,
                    totalResults: 0,
                },
                showLoader: false,
                fetchCallback: () => {},
            }
        }
    },
    computed: {
        pageCount() {
            return Math.ceil(this.paging.data.totalResults / this.paging.data.maxPerPage)
        },
        pageOffset() {
            return this.paging.data.maxPerPage * this.paging.data.currentPage;
        }
    },
    mounted() {
        this.scrollTrigger()
        this.fetchPagingData()
    },
    methods: {
        async fetchPagingData() {
            this.paging.showLoader = true;
            setTimeout(() => {
                this.paging.fetchCallback();
                this.paging.showLoader = false;
            }, 1000);
        },
        scrollTrigger() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.intersectionRatio > 0 && this.paging.data.currentPage < this.pageCount) { 
                        this.fetchPagingData()
                    }
                });
            });
            observer.observe(this.$refs.infiniteScrollTrigger);
        },
    }
}