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
import PccWhy from "~/pages/why";
import PccDifficult from "~/pages/difficult";
import PccClass from "~/pages/class";
import PccServe from "~/pages/serve";
import PccContact from "~/pages/contact";


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
