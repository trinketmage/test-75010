<template>
    <div class="header gabarit">
        <a class="main-link"><RessortGraphique /><span class="copy">MENU</span></a>
        <div class="fast-nav">
            <a class="underline">POPULAR</a>
            <a class="underline">NOW SHOWING</a>
            <a class="underline">WATCHLIST</a>
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
    padding-top: 4px;
    padding-bottom: 4px;
}
.main-link {
    .copy {
        transition: transform .3s ease;
        position: relative;
        z-index: 10;
    }
    .ressort-graphique :deep(.circle) {
        transition: transform .3s ease;
        &:nth-child(3) {
            transform: scaleY(-1);
        }
    }
    &:hover {
        .copy {
            transform: translateX(-7px);
        }
        .ressort-graphique :deep(.circle) {
            &:nth-child(1) {
                transform: rotate(260deg) translateY(65px) rotate(-0deg);
            }
            &:nth-child(2) {
                transform: translateX(-9px) translateY(-10px);
            }
            &:nth-child(3) {
                transform: scaleY(-1) rotate(260deg) translateY(65px) rotate(-0deg) ;
            }
            &:nth-child(4) {
                transform: translateX(-9px) translateY(10px);
            }
        }
    }
}

  
@keyframes GFG { 
    0% { 
        transform: rotate(0deg) translateY(100px) rotate(0deg); 
    } 

    100% { 
        transform: rotate(360deg) translateY(100px) rotate(-360deg); 
    } 
} 
</style>
