<template>
<div class="container">
    <Tags/>
    <Articles/>
    <paging/>
    <Footerbar/>
</div>
</template>

<script>
import Tags from './tags'
import Articles from './articlesList'
import Paging from './paging'
import Footerbar from './footer'
export default {
    name: 'Home',
    components: {
        Articles,
        Footerbar,
        Paging,
        Tags
    }
}
</script>

<style scoped>
.container {
    width: 80%;
    margin: 0 auto;
    padding-top: 50px;
    min-height: 400px;
}

@media (min-width: 768px) {
    .container {
        padding-top: 10px;
    }
}
</style>
