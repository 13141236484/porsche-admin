<template>
    <div>
        <img src="../../../static/loading.gif" class="loading" />
    </div>  
</template>
<style scoped>

.loading_bg {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(90, 90, 90, .3);
    left: 0px;
    bottom: 0px;
}
.loading {
    position: absolute;
    top: 300%;
    left: 50%;
    width: 60px;
    height: 60px;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
}


</style>


