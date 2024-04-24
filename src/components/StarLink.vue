<template>
    <a class="star-link" @click="handleClick" ref="link">
        ⭐️ PICK OF THE MONTH
    </a>
</template>

<script>
import { ref } from "vue";

export default {
    props: {
        label: {
            type: String
        }
    },
    setup() {
        const link = ref(null);
        const handleClick = () => {
            console.log('click');
        }

        return {
            link,
            handleClick
        }
    }
}
</script>

<style lang="scss" scoped>
.star-link {
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
}
</style>