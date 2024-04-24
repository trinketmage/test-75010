<template>
    <a class="call-to-action">
        <span class="label">{{ label }}</span>

        <span class="ghost">
            <span class="label">{{ label }}</span>
        </span>
    </a>
</template>

<script>
export default {
    props: {
        label: {
            type: String
        }
    }
}
</script>

<style lang="scss" scoped>
.call-to-action {
    font-size: 16px;
    background-color: var(--white);
    color: var(--midnight);
    font-weight: bold;
    letter-spacing: 0.1em;
    height: 46px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    border-radius: 40px;
    margin-top: 35px;
    cursor: pointer;
    overflow: hidden;
    position: relative;

    &:hover {
        .ghost {
            transform: translateY(0%);
            .label {
                transform: translateY(0%);
            }
        }
    }
}
.ghost {
    background-color: var(--midnight);
    color: var(--white);
    position: absolute;
    inset: 0;
    overflow: hidden;

    transition: transform .3s ease;
    transform: translateY(100.5%);

    .label {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        inset: 0;

        transition: transform .3s ease;
        transform: translateY(-100.5%);
    }
}
</style>
