<template>
    <div class="header gabarit">
        <a><RessortGraphique />MENU</a>
        <div class="fast-nav">
            <a>POPULAR</a>
            <a>NOW SHOWING</a>
            <a>WATCHLIST</a>
        </div>
    </div>
</template>

<script>
import RessortGraphique from "@/components/RessortGraphique.vue";
export default {
    components: {RessortGraphique}
}
</script>

<style lang="scss" scoped>
.header {
    height: var(--header-size);
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.ressort-graphique {
    margin-bottom: -0.1em;
    margin-right: 10px;
}
.fast-nav {
    display: flex;
    gap: 40px;
}
a {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
