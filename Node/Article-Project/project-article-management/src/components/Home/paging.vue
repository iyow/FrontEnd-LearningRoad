<template>
<div class="paging-container">
    <nav class="pagination-outer">
        <ul class="pagination">
            <li class="page-item">
                <a href="#" class="page-link">
                    <span>&laquo;</span>
                </a>
            </li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">4</a></li>
            <li class="page-item"><a class="page-link" href="#">5</a></li>
            <li class="page-item">
                <a href="#" class="page-link">
                    <span>&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
</div>
</template>

<script>
export default {
    name: 'Paging'
}
</script>

<style scoped>
.paging-container {
    box-sizing: border-box;
    width: 100%;
}

.pagination-outer {
    text-align: center;
}

.pagination {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    overflow: hidden;
    position: relative;
}
.pagination li{
    width: 50px;
    height: 50px;
}

.pagination li a.page-link {
    display: inline-block;
    position: relative;
    width: 40px;
    height: 40px;
    line-height: 40px;
    background: #ff095c;
    border-radius: 0;
    border: none;
    outline: 2px solid #fff;
    outline-offset: -6px;
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    letter-spacing: 1px;
    margin: 0 8px 0 0;
    transition: all 0.4s ease 0s;
}

.pagination li:first-child a.page-link,
.pagination li:last-child a.page-link {
    line-height: 36px;
}

.pagination li:last-child a.page-link {
    margin-right: 0;
}

.pagination li.active a.page-link,
.pagination li a.page-link:hover,
.pagination li.active a.page-link:hover {
    background: #ff095c;
    color: #fff;
    outline: thin dotted;
    outline-offset: -2px;
}

.pagination li a.page-link:before {
    content: "";
    width: 0;
    height: 0;
    background: rgba(0, 0, 0, 0) linear-gradient(135deg, #081f3c 45%, #aaa 50%, #ccc 56%, #fff 80%);
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4);
    position: absolute;
    top: 0;
    left: 0;
    transition: all 0.3s ease 0s;
}

.pagination li a.page-link:hover:before,
.pagination li.active a.page-link:before {
    width: 17px;
    height: 17px;
}

</style>
