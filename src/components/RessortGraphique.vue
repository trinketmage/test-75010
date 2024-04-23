<template>
    <span class="ressort-graphique">
        <span class="circle" v-for="(item, i) in 4" :key="i"></span>
    </span>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.ressort-graphique {
    display: inline-flex;
    gap: 2px;
    width: 12px;
    height: 12px;
    flex-wrap: wrap;
}
.circle {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: var(--white);
}
</style>
