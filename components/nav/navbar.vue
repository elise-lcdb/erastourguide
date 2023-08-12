<template>
    <div class="navbar_container">
        <div>
            <div class="flex_column logo">
                <h1 class="eras_tour_guide_logo_top">Eras Tour</h1>
                <h1 class="eras_tour_guide_logo_bottom">Guide</h1>
            </div>
        </div>
        <div class="link_group">
            <nuxt-link class="link" :to="localePath('/')">{{$t('events.title')}}</nuxt-link>
            <nuxt-link class="link" :to="localePath('/chants')">{{$t('chants.title')}}</nuxt-link>          
        </div>
        <nav-lang-selector />
    </div>
</template>
<script setup lang="ts">
const localePath = useLocalePath()
</script>
<style lang="scss" >
.navbar_container{
    box-shadow: 4px 4px 20px 0px rgba(64, 35, 41, 0.10);
    padding: 24px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo{
        .eras_tour_guide_logo_top{
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            text-transform: uppercase;
            font-family: 'Cantarell', sans-serif;
            white-space: nowrap;
        }
        .eras_tour_guide_logo_bottom{
            font-size: 27px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            letter-spacing: -1.62px;
            font-family: 'Archivo Black', sans-serif;
            white-space: nowrap;

        }
    }


    .link_group{
        display: flex;
        align-items: center;
        gap: 40px;

        .link{
            font-family: 'Inter', sans-serif;
            font-size: 16px;
            font-style: normal;
            font-weight: 700;
            line-height: 24px; /* 150% */
            letter-spacing: -0.32px;
            text-decoration: none;

            &.router-link-active{
                text-decoration: underline;
            }
        }
    }
}
</style>