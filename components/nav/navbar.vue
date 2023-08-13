<template>
    <div class="navbar_container">
        <div class="nav_start">
            <div class="flex_column logo">
                <h1 class="eras_tour_guide_logo_top">Eras Tour</h1>
                <h1 class="eras_tour_guide_logo_bottom">Guide</h1>
            </div>
            <button class="menu_button" @click="isOpen = !isOpen">
                <icon v-if="!isOpen" name="List" size="24"/>
                <icon v-if="isOpen" name="X" size="24"/>
            </button>
        </div>
        
        <div class="nav_group" :class="{'is-visible': isOpen}">
            <div class="link_group">
                <nuxt-link class="link" :to="localePath('/')">{{$t('events.title')}}</nuxt-link>
                <nuxt-link class="link" :to="localePath('/chants')">{{$t('chants.title')}}</nuxt-link>          
            </div>
            <nav-lang-selector />
        </div>
        
    </div>
</template>
<script setup lang="ts">
const localePath = useLocalePath()
const isOpen = ref(false as boolean)
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
    .nav_group{
        display: flex;
        width: 100%;
        
    }
    .menu_button{
        cursor: pointer;
        background: transparent;
        outline: none;
        border: 0px solid transparent;
        display: none;
    }

    .link_group{
        display: flex;
        align-items: center;
        gap: 40px;
        width: 100%;
        justify-content: center;

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

@media screen and (max-width: 768px){
    .navbar_container{
        display: block;

        .nav_start{
            display: flex;
            justify-content: space-between;
        }

        .menu_button{
            display: inline-block;
        }
        .nav_group{
            display: none;
            &.is-visible{
                display: flex;
                flex-direction: column;
                gap: 16px;
                margin-top: 20px;

                .link_group{
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    justify-content: flex-start;
                    align-items: flex-start;
                }
            }
        }
    }
    
}
</style>