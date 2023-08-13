<template>
    <div class="carousel_container flex_column gap_24">

        <div class="filters_grid">
            <div class="flex_row h_right">
                <button @click="currentPage = previousPage" class="chant_filter_button previous flex_row gap_8 v_center">
                    <icon name="ArrowLeft" size="24"/>
                    {{ $t('chants.filters.previous') }}
                </button>
            </div>
            
            <h1 class="chant">{{ currentChant.chant }}</h1>
            <div class="flex_row">
                <button @click="currentPage = nextPage" class="chant_filter_button flex_row gap_8 v_center">
                    {{ $t('chants.filters.next') }}
                    <icon name="ArrowRight" size="24"/>
                </button>
            </div>
        </div>
        <div class="flex_column gap_40 ">
            <div class="flex_row h_center">
                <iframe :src="`https://www.tiktok.com/embed/v2/${currentChant.tiktokId}?lang=${locale}&referrer=${encodeURIComponent(url)}`" frameborder="0" style="height: 738px; width: 323px"></iframe>
            </div>
            <div class="flex_row h_center">
                <iframe style="border-radius:12px" :src="`https://open.spotify.com/embed/track/${currentChant.spotifyId}?utm_source=generator&theme=0`" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const { locale } = useI18n();
const url = useRequestURL()
const props = defineProps({
    chants: {
        type: Array<any>,
        required: true
    }
})
const currentPage = ref(0 as number)
const previousPage = computed(() => {
    let itemIndex
    if(currentPage.value === 0){
        itemIndex = props.chants.length - 1
    }else{
        itemIndex = currentPage.value - 1
    }
    return itemIndex
})
const nextPage = computed(() => {
    let itemIndex
    if(currentPage.value === props.chants.length - 1){
        itemIndex = 0
    }else{
        itemIndex = currentPage.value + 1
    }
    return itemIndex
})
const currentChant = computed(() => {
    return props.chants[currentPage.value]
})
</script>
<style scoped lang="scss">
.chant_filter_button{
    outline: none;
    cursor: pointer;
    border: 0px solid transparent;
    background: transparent;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px; /* 150% */
    letter-spacing: -0.32px;
    padding: 0px;
}
.chant{
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 36px; /* 150% */
    letter-spacing: -0.48px;
    text-align: center;
    width: 323px;
}
.filters_grid { 
display: grid; 
grid-template-columns: 1fr 323px 1fr; 
grid-template-rows: 1fr; 
grid-column-gap: 16px;

}

@media screen and (max-width:650px){
    .filters_grid{
        grid-template-columns: 1fr 1fr; 
        grid-template-rows: 2fr; 
        grid-row-gap: 8px;

        div:first-child{
            grid-row-start: 2;
            
        }
        div:last-child{
            grid-row-start: 2;
            
        }
    }
    .chant{
        grid-column: 1 / span 2;
        order: 1;
        text-align: center;
        width: 100%;
    }
}
</style>