<template>
<div>
    <pcc-why/>
    <pcc-difficult/>
    <pcc-class/>
    <pcc-serve/>
    <pcc-contact/>
</div>
</template>

<script>
import PccWhy from "./main/PccWhy";
import PccDifficult from "./main/PccDifficult";
import PccClass from "./main/PccClass";
import PccServe from "./main/PccServe";
import PccContact from "./main/PccContact";


export default {
    name: "PccMain",
    components: {
        PccWhy,
        PccDifficult,
        PccClass,
        PccServe,
        PccContact
    }
};
</script>

<style>

</style>
