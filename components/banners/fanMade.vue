<template>
    <div class="fan_made_banner" :class="{'hidden': hidden}">
        <p>{{$t('banners.fanMade.description')}} <a href="https://www.tiktok.com/@elise.codes">{{$t('banners.fanMade.offerCookie')}}</a> </p>
        <button @click="hidden = true"><icon name="X" size="24"/></button>
    </div>
</template>
<script setup lang="ts">
const hidden = ref(false as boolean)
</script>
<style lang="scss" scoped>
.fan_made_banner{
    display: flex;
    padding: 8px 16px;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;

    p, a{
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
    }
   button{
    cursor: pointer;
    outline: none;
    background: transparent;
    border: 0px solid transparent;
   }
   &.hidden{
    display: none;
   }
}
</style>