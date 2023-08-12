<template>
    <div :class="randomTheme">
      <banners-fan-made/>
        <nav-navbar />
        <div class="container">
            <slot/>
        </div>
        <footer-custom-footer/>
    </div>
</template>
<script setup lang="ts">
const themes:Array<string> = ['midnights_theme', 'speak_now_tv_theme', 'nineteen_eighty_nine_tv_theme']
const randomTheme = computed(() => {
    return themes[Math.floor(Math.random() * themes.length)]
})
</script>
<style lang="scss" scoped>
.container{
    max-width: 1216px;
    margin: 0 auto;
    padding: 20px;
    box-sizing: border-box;
    min-height: 100vh;
}
</style>